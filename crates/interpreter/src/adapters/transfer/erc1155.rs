// Copyright 2023-2024 LightDotSo.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use crate::{
    adapter::Adapter,
    constants::{
        InterpretationActionType, ERC1155_ABI, TRANSFER_BATCH_EVENT_TOPIC,
        TRANSFER_SINGLE_EVENT_TOPIC,
    },
    types::{
        AdapterResponse, AssetChange, AssetToken, AssetTokenType, InterpretationAction,
        InterpretationRequest,
    },
};
use async_trait::async_trait;
use ethers_main::{
    abi::Address,
    contract::BaseContract,
    types::{H160, U256},
};
use eyre::Result;
use lightdotso_simulator::evm::Evm;

#[derive(Clone)]
pub(crate) struct ERC1155Adapter {
    abi: BaseContract,
}

impl ERC1155Adapter {
    pub fn new() -> Self {
        let erc1155_abi: BaseContract = ERC1155_ABI.clone();
        ERC1155Adapter { abi: erc1155_abi }
    }
    pub async fn get_erc1155_balance(
        &self,
        evm: &mut Evm,
        address: H160,
        token_id: U256,
        token_address: H160,
    ) -> Result<U256> {
        // Encode the method and parameters to call
        let calldata = self.abi.encode("balanceOf", (address, token_id))?;

        // Call the contract method
        let res = evm.call_raw(address, token_address, Some(0.into()), Some(calldata)).await?;

        // Decode the output
        let balance: U256 = self.abi.decode_output("balanceOf", res.return_data)?;

        // Return the balance
        Ok(balance)
    }
}

#[async_trait]
impl Adapter for ERC1155Adapter {
    fn matches(&self, request: InterpretationRequest) -> bool {
        request.logs.iter().any(|log| {
            log.topics.len() == 4 &&
                (log.topics[0] == *TRANSFER_SINGLE_EVENT_TOPIC ||
                    log.topics[0] == *TRANSFER_BATCH_EVENT_TOPIC)
        })
    }

    async fn query(
        &self,
        evm: &mut Evm,
        _request: InterpretationRequest,
    ) -> Result<AdapterResponse> {
        // Get all the logs that match the transfer event
        let single_logs = _request
            .logs
            .iter()
            .filter(|log| log.topics.len() == 4 && log.topics[0] == *TRANSFER_SINGLE_EVENT_TOPIC)
            .collect::<Vec<_>>();
        // Get all the logs that match the transfer event
        let batch_logs = _request
            .logs
            .iter()
            .filter(|log| log.topics.len() == 4 && log.topics[0] == *TRANSFER_BATCH_EVENT_TOPIC)
            .collect::<Vec<_>>();

        let mut actions = Vec::new();
        let mut asset_changes = Vec::new();

        // Iterate over the logs
        for log in single_logs {
            // Get the `from` and `to` addresses from the log
            let (_operator, from, to, id, value): (Address, Address, Address, U256, U256) =
                self.abi.decode_event("TransferSingle", log.clone().topics, log.clone().data)?;

            // Get the asset token
            let token_address = log.address;

            // Get the asset token
            let asset_token = AssetToken {
                address: token_address,
                token_id: Some(id),
                token_type: AssetTokenType::Erc1155,
            };

            // Get the actions for the `from` address
            let from_action_type = if from == Address::zero() {
                InterpretationActionType::ERC1155Mint
            } else {
                InterpretationActionType::ERC1155Send
            };

            let from_action =
                InterpretationAction { action_type: from_action_type, address: Some(from) };

            // Get the actions for the `to` address
            let to_action_type = if to == Address::zero() {
                InterpretationActionType::ERC1155Burn
            } else {
                InterpretationActionType::ERC1155Receive
            };

            // Get the actions for the `to` address
            let to_action = InterpretationAction { action_type: to_action_type, address: Some(to) };

            // Get the asset changes for the `from` address
            let mut before_from_balance =
                self.get_erc1155_balance(evm, from, id, token_address).await.ok();

            // Get the asset changes for the `to` address
            let mut before_to_balance =
                self.get_erc1155_balance(evm, to, id, token_address).await.ok();

            // Check if the value does not overflow
            let (after_from_balance, after_to_balance) = before_from_balance
                .and_then(|before_balance| {
                    if value <= before_balance {
                        Some((Some(before_balance - value), before_to_balance.map(|b| b + value)))
                    } else {
                        // If the value overflows, set the before balances to `None`
                        before_from_balance = None;
                        before_to_balance = None;

                        None
                    }
                })
                .unwrap_or((None, None));

            // Get the asset changes for the `from` address
            let from_asset_change = AssetChange {
                address: from,
                action: from_action.clone(),
                token: asset_token.clone(),
                before_amount: before_from_balance,
                after_amount: after_from_balance,
                amount: value,
            };

            // Get the asset changes for the `to` address
            let to_asset_change = AssetChange {
                address: to,
                action: to_action.clone(),
                token: asset_token.clone(),
                before_amount: before_to_balance,
                after_amount: after_to_balance,
                amount: value,
            };

            // Add the actions and asset changes to the vectors
            actions.push(from_action);
            actions.push(to_action);

            // Add the asset changes to the vector
            asset_changes.push(from_asset_change);
            asset_changes.push(to_asset_change);
        }

        // Iterate over the logs
        for log in batch_logs {
            // Get the `from` and `to` addresses from the log
            let (_operator, from, to, ids, values): (
                Address,
                Address,
                Address,
                Vec<U256>,
                Vec<U256>,
            ) = self.abi.decode_event("TransferBatch", log.clone().topics, log.clone().data)?;

            // Get the asset token
            let token_address = log.address;

            // Get the asset token
            let asset_token = AssetToken {
                address: token_address,
                token_id: None,
                token_type: AssetTokenType::Erc1155,
            };

            // Get the actions for the `from` address
            let from_action_type = if from == Address::zero() {
                InterpretationActionType::ERC1155Mint
            } else {
                InterpretationActionType::ERC1155Send
            };

            //  Get the actions for the `from` address
            let from_action =
                InterpretationAction { action_type: from_action_type, address: Some(from) };

            // Get the actions for the `to` address
            let to_action_type = if to == Address::zero() {
                InterpretationActionType::ERC1155Burn
            } else {
                InterpretationActionType::ERC1155Receive
            };

            // Get the actions for the `to` address
            let to_action = InterpretationAction { action_type: to_action_type, address: Some(to) };

            // Get the asset changes for the `from` address
            let mut from_asset_changes = Vec::new();

            // Get the asset changes for the `to` address
            let mut to_asset_changes = Vec::new();

            for (id, value) in ids.iter().zip(values.iter()) {
                // Get the before balances
                let mut before_from_balance =
                    self.get_erc1155_balance(evm, from, *id, token_address).await.ok();
                let mut before_to_balance =
                    self.get_erc1155_balance(evm, to, *id, token_address).await.ok();

                // Check if the value does not overflow
                let (after_from_balance, after_to_balance) = before_from_balance
                    .and_then(|before_balance| {
                        if *value <= before_balance {
                            Some((
                                Some(before_balance - value),
                                before_to_balance.map(|b| b + value),
                            ))
                        } else {
                            // If the value overflows, set the before balances to `None`
                            before_from_balance = None;
                            before_to_balance = None;

                            None
                        }
                    })
                    .unwrap_or((None, None));

                // Get the asset changes for the `from` address
                let from_asset_change = AssetChange {
                    address: from,
                    action: from_action.clone(),
                    token: asset_token.clone(),
                    before_amount: before_from_balance,
                    after_amount: after_from_balance,
                    amount: *value,
                };

                // Get the asset changes for the `to` address
                let to_asset_change = AssetChange {
                    address: to,
                    action: to_action.clone(),
                    token: asset_token.clone(),
                    before_amount: before_to_balance,
                    after_amount: after_to_balance,
                    amount: *value,
                };

                // Add the asset changes to the vector
                from_asset_changes.push(from_asset_change);
                to_asset_changes.push(to_asset_change);

                // Add the actions and asset changes to the vectors
                actions.push(from_action.clone());
                actions.push(to_action.clone());
            }
        }

        Ok(AdapterResponse { actions, asset_changes })
    }
}
