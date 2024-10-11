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

use crate::{entrypoint_v060::EntryPointV060::UserOperation, provider::get_provider};
use alloy::{primitives::Address, providers::RootProvider, sol, transports::BoxTransport};
use eyre::Result;
use EntryPointV060::EntryPointV060Instance;

// -----------------------------------------------------------------------------
// Contract
// -----------------------------------------------------------------------------

sol!(
    #[sol(rpc)]
    EntryPointV060,
    "abi/EntryPointv0.6.json"
);

pub async fn get_entrypoint_v060(
    chain_id: u64,
    entry_point_address: Address,
) -> Result<EntryPointV060Instance<BoxTransport, RootProvider<BoxTransport>>> {
    // Get the provider.
    let (provider, _) = get_provider(chain_id).await?;

    // Get the contract.
    let contract = EntryPointV060::new(entry_point_address, provider);

    // Return the contract.
    Ok(contract)
}