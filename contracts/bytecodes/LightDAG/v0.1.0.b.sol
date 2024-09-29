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

pragma solidity ^0.8.27;

// bytes constant byteCode = type(LightDAG).creationCode;
bytes constant byteCode =
    hex"6080604052348015600f57600080fd5b5061081b8061001f6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806376a9140814610046578063a3f4df7e1461005b578063ffa1ad74146100ad575b600080fd5b6100596100543660046103f7565b6100e9565b005b6100976040518060400160405280600881526020017f4c6967687444414700000000000000000000000000000000000000000000000081525081565b6040516100a491906106fb565b60405180910390f35b6100976040518060400160405280600581526020017f302e312e3000000000000000000000000000000000000000000000000000000081525081565b805161017b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4c696768744441473a204f7065726174696f6e20726f6f7420697320656d707460448201527f7900000000000000000000000000000000000000000000000000000000000000606482015260840160405180910390fd5b80516040513391907ff95dd2a06a22e482ba3fe223c3feffb28e2e77786e4908143fb6c04f7059540490600090a360005b816020015151811015610298573373ffffffffffffffffffffffffffffffffffffffff16826020015182815181106101e6576101e6610715565b6020026020010151600001517f374a0b1be17c1252cdb48db98472ffe0646a4557067d3b6a29ff740c380497c58460200151848151811061022957610229610715565b6020026020010151602001518560200151858151811061024b5761024b610715565b6020026020010151604001518660200151868151811061026d5761026d610715565b60200260200101516060015160405161028893929190610744565b60405180910390a36001016101ac565b5050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156102ee576102ee61029c565b60405290565b6040516080810167ffffffffffffffff811182821017156102ee576102ee61029c565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561035e5761035e61029c565b604052919050565b600067ffffffffffffffff8211156103805761038061029c565b5060051b60200190565b600082601f83011261039b57600080fd5b81356103ae6103a982610366565b610317565b8082825260208201915060208360051b8601019250858311156103d057600080fd5b602085015b838110156103ed5780358352602092830192016103d5565b5095945050505050565b60006020828403121561040957600080fd5b67ffffffffffffffff8235111561041f57600080fd5b813582016040818503121561043357600080fd5b61043b6102cb565b8135815267ffffffffffffffff6020830135111561045857600080fd5b60208201358201915084601f83011261047057600080fd5b61047d6103a98335610366565b82358082526020808301929160051b85010187101561049b57600080fd5b602084015b6020853560051b8601018110156106885767ffffffffffffffff813511156104c757600080fd5b8035850160807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0828b030112156104fd57600080fd5b6105056102f4565b6020820135815267ffffffffffffffff6040830135111561052557600080fd5b602060408301358301018a601f82011261053e57600080fd5b61054b6103a98235610366565b81358082526020808301929160051b8401018d101561056957600080fd5b602083015b6020843560051b8501018110156106355767ffffffffffffffff8135111561059557600080fd5b8d603f8235860101126105a757600080fd5b602081358501013567ffffffffffffffff8111156105c7576105c761029c565b6105f860207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610317565b8181528f6020808486358a01010101111561061257600080fd5b81604084358801016020830137600060209282018301528452928301920161056e565b506020840152505067ffffffffffffffff6060830135111561065657600080fd5b6106698a6020606085013585010161038a565b60408201526080919091013560608201528352602092830192016104a0565b50602083015250949350505050565b6000815180845260005b818110156106bd576020818501810151868301820152016106a1565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b60208152600061070e6020830184610697565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000606082016060835280865180835260808501915060808160051b86010192506020880160005b828110156107bb577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff808786030184526107a6858351610697565b9450602093840193919091019060010161076c565b50505050828103602084015280855180835260208301915060208701925060005b818110156107fa5783518352602093840193909201916001016107dc565b50506040939093019390935250939250505056fea164736f6c634300081b000a";
bytes constant initCode = byteCode;
bytes32 constant initCodeHash = 0x31a8cb463ff0f1b17f97a5b665b7b1e26f4965cad0b31d74928c4f199f94d9f7;
bytes32 constant salt = 0x0000000000000000000000000000000000000000e518dc21f381b8e76fbe1a45;
