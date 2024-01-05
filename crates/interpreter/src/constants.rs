// Copyright (C) 2023 Light, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

use crate::{
    adapter::Adapter,
    adapters::transfer::{
        erc1155::ERC1155Adapter, erc20::ERC20Adapter, erc721::ERC721Adapter, eth::EthAdapter,
    },
};
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use strum_macros::EnumVariantNames;

lazy_static! {
    #[derive(Clone)]
    pub static ref ADAPTERS: Vec<Box<dyn Adapter + Sync + Send>> =
        vec![Box::new(EthAdapter::new()), Box::new(ERC20Adapter::new()), Box::new(ERC721Adapter::new()), Box::new(ERC1155Adapter::new())];
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, EnumVariantNames)]
pub enum InterpretationActionType {
    #[strum(serialize = "NATIVE_RECEIVE")]
    NativeReceive,
    #[strum(serialize = "NATIVE_SEND")]
    NativeSend,
}
