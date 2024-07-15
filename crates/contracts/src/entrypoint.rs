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

use ethers::{
    contract::abigen,
    providers::{Http, Provider},
    types::Address,
};
use eyre::Result;

use crate::provider::get_provider;

abigen!(EntryPoint, "abi/EntryPoint.json",);

pub async fn get_entrypoint(
    chain_id: u64,
    entry_point_address: Address,
) -> Result<EntryPoint<Provider<Http>>> {
    // Get the provider.
    let provider = get_provider(chain_id).await?;

    // Get the contract.
    let contract = EntryPoint::new(entry_point_address, provider.into());

    // Return the contract.
    Ok(contract)
}
