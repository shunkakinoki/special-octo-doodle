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

// SPDX-License-Identifier: Apache-2.0

// Interface for IERC1271
// From: https://eips.ethereum.org/EIPS/eip-1271
// License: CC-BY-SA-4.0

pragma solidity ^0.8.27;

interface ILightValidator {
    // -------------------------------------------------------------------------
    // Errors
    // -------------------------------------------------------------------------

    error InvalidMerkleProof(bytes32 root, bytes32 leaf);

    // -------------------------------------------------------------------------
    // Events
    // -------------------------------------------------------------------------

    event ModuleInitialized(address indexed account);
    event ModuleUninitialized(address indexed account);
}