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

use ethers::types::Address;

// Derived from: https://github.com/0xsequence/go-sequence/blob/eabca0c348b5d87dd943a551908c80f61c347899/config.go#L17
// License: Apache-2.0
#[derive(Debug)]
pub struct Signer {
    pub weight: u8,
    pub address: Address,
}

// Derived from: https://github.com/0xsequence/go-sequence/blob/eabca0c348b5d87dd943a551908c80f61c347899/config.go#L12
// License: Apache-2.0
#[derive(Debug)]
pub struct WalletConfig {
    // Bytes32 hash of the checkpoint
    pub checkpoint: [u8; 32],
    // Uint16 threshold
    pub threshold: u16,
    // Uint256 weight
    pub weight: u16,
    // Image hash of the wallet config
    pub image_hash: [u8; 32],
    // Signers of the wallet
    pub signers: Vec<Signer>,
}
