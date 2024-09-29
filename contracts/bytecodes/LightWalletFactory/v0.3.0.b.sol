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

import {ENTRY_POINT_V070_ADDRESS} from "@/constants/address.sol";

// bytes memory byteCode = type(LightWalletFactory).creationCode;
bytes constant byteCode =
    hex"60a060405234801561001057600080fd5b50604051613c29380380613c2983398101604081905261002f916100af565b6001600160a01b038116610056576040516370063fa360e01b815260040160405180910390fd5b80604051610063906100a2565b6001600160a01b039091168152602001604051809103906000f08015801561008f573d6000803e3d6000fd5b506001600160a01b0316608052506100df565b6131f880610a3183390190565b6000602082840312156100c157600080fd5b81516001600160a01b03811681146100d857600080fd5b9392505050565b60805161092a610107600039600081816071015281816101a001526102db015261092a6000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c8063a3f4df7e11610050578063a3f4df7e146100d0578063d3a3968614610119578063ffa1ad741461012c57600080fd5b806311464fbe1461006c578063183815c8146100bd575b600080fd5b6100937f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6100936100cb366004610420565b610168565b61010c6040518060400160405280601281526020017f4c6967687457616c6c6574466163746f7279000000000000000000000000000081525081565b6040516100b491906104b0565b610093610127366004610420565b610289565b61010c6040518060400160405280600581526020017f302e332e3000000000000000000000000000000000000000000000000000000081525081565b6000806101758484610289565b905073ffffffffffffffffffffffffffffffffffffffff81163b801561019d57509050610283565b837f0000000000000000000000000000000000000000000000000000000000000000866040516024016101d291815260200190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f9498bd71000000000000000000000000000000000000000000000000000000001790525161025290610413565b61025d9291906104c3565b8190604051809103906000f590508015801561027d573d6000803e3d6000fd5b50925050505b92915050565b60006103da826040518060200161029f90610413565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe082820381018352601f909101166040819052602481018790527f000000000000000000000000000000000000000000000000000000000000000090604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152918152602080830180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f9498bd71000000000000000000000000000000000000000000000000000000001790529051610383939291016104c3565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152908290526103bf92916020016104fa565b604051602081830303815290604052805190602001206103e1565b9392505050565b60006103da8383306000604051836040820152846020820152828152600b8101905060ff815360559020949350505050565b6103f48061052a83390190565b6000806040838503121561043357600080fd5b50508035926020909101359150565b60005b8381101561045d578181015183820152602001610445565b50506000910152565b6000815180845261047e816020860160208601610442565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006103da6020830184610466565b73ffffffffffffffffffffffffffffffffffffffff831681526040602082015260006104f26040830184610466565b949350505050565b6000835161050c818460208801610442565b835190830190610520818360208801610442565b0194935050505056fe60806040526040516103f43803806103f483398101604081905261002291610268565b61002c8282610033565b5050610358565b61003c82610092565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a280511561008657610081828261010e565b505050565b61008e610185565b5050565b806001600160a01b03163b6000036100cd57604051634c9c8ce360e01b81526001600160a01b03821660048201526024015b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b0319166001600160a01b0392909216919091179055565b6060600080846001600160a01b03168460405161012b919061033c565b600060405180830381855af49150503d8060008114610166576040519150601f19603f3d011682016040523d82523d6000602084013e61016b565b606091505b50909250905061017c8583836101a6565b95945050505050565b34156101a45760405163b398979f60e01b815260040160405180910390fd5b565b6060826101bb576101b682610205565b6101fe565b81511580156101d257506001600160a01b0384163b155b156101fb57604051639996b31560e01b81526001600160a01b03851660048201526024016100c4565b50805b9392505050565b8051156102155780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b634e487b7160e01b600052604160045260246000fd5b60005b8381101561025f578181015183820152602001610247565b50506000910152565b6000806040838503121561027b57600080fd5b82516001600160a01b038116811461029257600080fd5b60208401519092506001600160401b038111156102ae57600080fd5b8301601f810185136102bf57600080fd5b80516001600160401b038111156102d8576102d861022e565b604051601f8201601f19908116603f011681016001600160401b03811182821017156103065761030661022e565b60405281815282820160200187101561031e57600080fd5b61032f826020830160208601610244565b8093505050509250929050565b6000825161034e818460208701610244565b9190910192915050565b608e806103666000396000f3fe6080604052600a600c565b005b60186014601a565b605e565b565b600060597f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b3660008037600080366000845af43d6000803e808015607c573d6000f35b3d6000fdfea164736f6c634300081b000aa164736f6c634300081b000a60c06040523060805234801561001457600080fd5b506040516131f83803806131f883398101604081905261003391610100565b6001600160a01b03811660a05261004861004e565b50610130565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00805468010000000000000000900460ff161561009e5760405163f92ee8a960e01b815260040160405180910390fd5b80546001600160401b03908116146100fd5780546001600160401b0319166001600160401b0390811782556040519081527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b50565b60006020828403121561011257600080fd5b81516001600160a01b038116811461012957600080fd5b9392505050565b60805160a0516130806101786000396000818161047401528181610c6101528181610e5e01526118a20152600081816112b7015281816112e0015261153a01526130806000f3fe60806040526004361061016e5760003560e01c806357c56d6b116100cb578063b0d691fe1161007f578063d087d28811610059578063d087d28814610506578063f23a6e611461051b578063ffa1ad741461056157600080fd5b8063b0d691fe1461044d578063b61d27f61461049e578063bc197c81146104be57600080fd5b80639498bd71116100b05780639498bd711461038e578063a3f4df7e146103ae578063ad3cb1cc1461040457600080fd5b806357c56d6b14610312578063853c50681461034657600080fd5b806329561426116101225780634f1ef286116101075780634f1ef286146102d557806351605d80146102e857806352d1902d146102fd57600080fd5b8063295614261461029357806347e1da2a146102b557600080fd5b80631626ba7e116101535780631626ba7e1461022557806319822f7c1461024557806320c13b0b1461027357600080fd5b806301ffc9a71461017a578063150b7a02146101af57600080fd5b3661017557005b600080fd5b34801561018657600080fd5b5061019a61019536600461263f565b6105aa565b60405190151581526020015b60405180910390f35b3480156101bb57600080fd5b506101f46101ca3660046126ce565b7f150b7a020000000000000000000000000000000000000000000000000000000095945050505050565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016101a6565b34801561023157600080fd5b506101f461024036600461273d565b6105bb565b34801561025157600080fd5b50610265610260366004612789565b6105d2565b6040519081526020016101a6565b34801561027f57600080fd5b506101f461028e3660046127dd565b6105f1565b34801561029f57600080fd5b506102b36102ae36600461284e565b610656565b005b3480156102c157600080fd5b506102b36102d03660046128ac565b6106a8565b6102b36102e3366004612a5e565b61084a565b3480156102f457600080fd5b50610265610869565b34801561030957600080fd5b50610265610898565b34801561031e57600080fd5b506102657f8713a7c4465f6fbee2b6e9d6646d1d9f83fec929edfc4baf661f3c865bdd04d181565b34801561035257600080fd5b5061036661036136600461273d565b6108c7565b604080519586526020860194909452928401919091526060830152608082015260a0016101a6565b34801561039a57600080fd5b506102b36103a936600461284e565b610a8f565b3480156103ba57600080fd5b506103f76040518060400160405280600b81526020017f4c6967687457616c6c657400000000000000000000000000000000000000000081525081565b6040516101a69190612ad0565b34801561041057600080fd5b506103f76040518060400160405280600581526020017f352e302e3000000000000000000000000000000000000000000000000000000081525081565b34801561045957600080fd5b5060405173ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001681526020016101a6565b3480156104aa57600080fd5b506102b36104b9366004612b21565b610c0e565b3480156104ca57600080fd5b506101f46104d9366004612b63565b7fbc197c810000000000000000000000000000000000000000000000000000000098975050505050505050565b34801561051257600080fd5b50610265610c5d565b34801561052757600080fd5b506101f4610536366004612c2a565b7ff23a6e61000000000000000000000000000000000000000000000000000000009695505050505050565b34801561056d57600080fd5b506103f76040518060400160405280600581526020017f302e332e3000000000000000000000000000000000000000000000000000000081525081565b60006105b582610d17565b92915050565b60006105c8848484610dfb565b90505b9392505050565b60006105dc610e46565b6105e68484610ee7565b90506105cb826110d7565b6000806106168686604051610607929190612c90565b6040518091039020858561114e565b509050801561064857507f20c13b0b00000000000000000000000000000000000000000000000000000000905061064e565b50600090505b949350505050565b33301461069c576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044015b60405180910390fd5b6106a58161118c565b50565b6106b0610e46565b84811480156106c657508215806106c657508281145b61072c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f77726f6e67206172726179206c656e67746873000000000000000000000000006044820152606401610693565b60008390036107d85760005b858110156107d2576107ca87878381811061075557610755612ca0565b905060200201602081019061076a9190612ccf565b600085858581811061077e5761077e612ca0565b90506020028101906107909190612cea565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061122292505050565b600101610738565b50610842565b60005b85811015610840576108388787838181106107f8576107f8612ca0565b905060200201602081019061080d9190612ccf565b86868481811061081f5761081f612ca0565b9050602002013585858581811061077e5761077e612ca0565b6001016107db565b505b505050505050565b61085261129f565b61085b826113a3565b61086582826113e4565b5050565b60006108937fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85490565b905090565b60006108a2611522565b507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc90565b600080600080600080878760008181106108e3576108e3612ca0565b909101357fff000000000000000000000000000000000000000000000000000000000000001691508190506109395761091b89611591565b9250610928838989611616565b92985090965094509150610a849050565b7fff00000000000000000000000000000000000000000000000000000000000000818116016109785761096b89611591565b9250610928838989611667565b7ffe000000000000000000000000000000000000000000000000000000000000007fff000000000000000000000000000000000000000000000000000000000000008216016109ca5761096b89611693565b7ffd000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821601610a2e57610a1e898989611700565b9550955095509550955050610a84565b6040517f6085cd820000000000000000000000000000000000000000000000000000000081527fff0000000000000000000000000000000000000000000000000000000000000082166004820152602401610693565b939792965093509350565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00805468010000000000000000810460ff16159067ffffffffffffffff16600081158015610ada5750825b905060008267ffffffffffffffff166001148015610af75750303b155b905081158015610b05575080155b15610b3c576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b84547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001660011785558315610b9d5784547fffffffffffffffffffffffffffffffffffffffffffffff00ffffffffffffffff16680100000000000000001785555b610ba68661187d565b83156108425784547fffffffffffffffffffffffffffffffffffffffffffffff00ffffffffffffffff168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a1505050505050565b610c16610e46565b610c57848484848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061122292505050565b50505050565b60007f00000000000000000000000000000000000000000000000000000000000000006040517f35567e1a0000000000000000000000000000000000000000000000000000000081523060048201526000602482015273ffffffffffffffffffffffffffffffffffffffff91909116906335567e1a90604401602060405180830381865afa158015610cf3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108939190612d4f565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f150b7a02000000000000000000000000000000000000000000000000000000001480610daa57507fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000145b806105b557507fffffffff0000000000000000000000000000000000000000000000000000000082167f01ffc9a7000000000000000000000000000000000000000000000000000000001492915050565b600080610e0985858561114e565b5090508015610e3b57507f1626ba7e0000000000000000000000000000000000000000000000000000000090506105cb565b506000949350505050565b3373ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614610ee5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f6163636f756e743a206e6f742066726f6d20456e747279506f696e74000000006044820152606401610693565b565b600080610ef8610100850185612cea565b6000818110610f0957610f09612ca0565b7fff000000000000000000000000000000000000000000000000000000000000009201359182169250507f030000000000000000000000000000000000000000000000000000000000000016819003610f93576000610f7584610f70610100880188612cea565b61114e565b50905080610f88576001925050506105b5565b6000925050506105b5565b7fff0000000000000000000000000000000000000000000000000000000000000081167f0400000000000000000000000000000000000000000000000000000000000000036110cd5760008080610fee610100880188612cea565b610ffc916001908290612d68565b8101906110099190612d92565b92509250925061101a8284886118ec565b61105a576040517faab788dc0000000000000000000000000000000000000000000000000000000081526004810184905260248101879052604401610693565b60008251602061106a9190612ea8565b6110759060a1612ebf565b905060006110a78561108b6101008c018c612cea565b859087518761109a9190612ebf565b92610f7093929190612d68565b509050806110be57600196505050505050506105b5565b600096505050505050506105b5565b5060019392505050565b80156106a55760405160009033907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90849084818181858888f193505050503d8060008114611142576040519150601f19603f3d011682016040523d82523d6000602084013e611147565b606091505b5050505050565b60008060008060006111618888886108c7565b5096509194509250905082821080159061117f575061117f81611902565b9450505050935093915050565b806111c3576040517f4294d12700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6111ec7fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf8829055565b6040518181527f307ed6bd941ee9fc80f369c94af5fa11e25bab5102a6140191756c5474a30bfa9060200160405180910390a150565b6000808473ffffffffffffffffffffffffffffffffffffffff16848460405161124b9190612ed2565b60006040518083038185875af1925050503d8060008114611288576040519150601f19603f3d011682016040523d82523d6000602084013e61128d565b606091505b50915091508161114757805160208201fd5b3073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016148061136c57507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166113537f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff1614155b15610ee5576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3330146106a5576040517fe1258894000000000000000000000000000000000000000000000000000000008152336004820152306024820152604401610693565b8173ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611469575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261146691810190612d4f565b60015b6114b7576040517f4c9c8ce300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff83166004820152602401610693565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc8114611513576040517faa1d49a400000000000000000000000000000000000000000000000000000000815260048101829052602401610693565b61151d8383611935565b505050565b3073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614610ee5576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517f190100000000000000000000000000000000000000000000000000000000000060208201524660228201527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b166042820152605681018290526000906076015b604051602081830303815290604052805190602001209050919050565b60008080806116318761162c876006818b612d68565b611998565b6000908152873560f01c6020818152604080842084526002909a013560e01c908190529890912090999198509695509350505050565b60008080806116828761167d876001818b612d68565b611616565b935093509350935093509350935093565b6040517f190100000000000000000000000000000000000000000000000000000000000060208201526000602282018190527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b16604283015260568201839052906076016115f9565b6000808080806004600188013560e81c8261171b8383612ebf565b905061172d8b61036183868d8f612d68565b939b50919950975095509350878710156117855761174d81848b8d612d68565b89896040517fb006aba00000000000000000000000000000000000000000000000000000000081526004016106939493929190612f37565b8092505b8883101561186f5760038301928a013560e81c91506117a88383612ebf565b905060006117ca6117b888611e2e565b8c8c8790869261036193929190612d68565b939c50919a5098509091505088881015611822576117ea82858c8e612d68565b8a8a6040517fb006aba00000000000000000000000000000000000000000000000000000000081526004016106939493929190612f37565b848110611865576040517f37daf62b0000000000000000000000000000000000000000000000000000000081526004810182905260248101869052604401610693565b9350915081611789565b505050939792965093509350565b6118868161118c565b604051819073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016907f6f2a6aac3f1c9fc5bb4eec9d305f0036888047b27e7ca599572afe083d9879e890600090a350565b6000826118f98584611e62565b14949350505050565b600081158015906105b55750507fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf8541490565b61193e82611ea5565b60405173ffffffffffffffffffffffffffffffffffffffff8316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a28051156119905761151d8282611f74565b610865611ff7565b60008060005b83811015611e2557600181019085013560f81c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8101611a3f57601582019186013560f881901c9060581c73ffffffffffffffffffffffffffffffffffffffff81169074ff000000000000000000000000000000000000000016811785611a255780611a34565b60008681526020829052604090205b95505050505061199e565b80611ad55760018201918681013560f81c906043016000611a6b8a611a6684888c8e612d68565b61202f565b60ff841697909701969194508491905060a083901b74ff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff82161786611aba5780611ac9565b60008781526020829052604090205b9650505050505061199e565b60028103611bfd576000808784013560f881901c9060581c73ffffffffffffffffffffffffffffffffffffffff16601586019550909250905060008885013560e81c600386018162ffffff169150809650819250505060008186019050611b4e8b848c8c8a908692611b4993929190612d68565b6122f2565b611b96578a83611b6083898d8f612d68565b6040517f9a9462320000000000000000000000000000000000000000000000000000000081526004016106939493929190612f5e565b60ff8416979097019694508460a084901b74ff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff84161787611be15780611bf0565b60008881526020829052604090205b975050505050505061199e565b60038103611c3057602082019186013583611c185780611c27565b60008481526020829052604090205b9350505061199e565b60048103611c7c576003808301928781013560e81c9190820101600080611c5d8b61162c85898d8f612d68565b6000988952602052604090972096909701965090935061199e92505050565b60068103611d845760008287013560f81c60018401935060ff16905060008784013560f01c60028501945061ffff16905060008885013560e81c600386018162ffffff169150809650819250505060008186019050600080611cea8d8d8d8b90879261162c93929190612d68565b93985088939092509050848210611d0057988501985b604080517f53657175656e6365206e657374656420636f6e6669673a0a0000000000000000602080830191909152603882018490526058820188905260788083018a9052835180840390910181526098909201909252805191012089611d665780611d75565b60008a81526020829052604090205b9950505050505050505061199e565b60058103611df0576020820191860135878103611dbf577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff94505b6000611dca826124d9565b905084611dd75780611de6565b60008581526020829052604090205b945050505061199e565b6040517fb2505f7c00000000000000000000000000000000000000000000000000000000815260048101829052602401610693565b50935093915050565b7f8713a7c4465f6fbee2b6e9d6646d1d9f83fec929edfc4baf661f3c865bdd04d160009081526020829052604081206105b5565b600081815b8451811015611e9d57611e9382868381518110611e8657611e86612ca0565b6020026020010151612514565b9150600101611e67565b509392505050565b8073ffffffffffffffffffffffffffffffffffffffff163b600003611f0e576040517f4c9c8ce300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff82166004820152602401610693565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60606000808473ffffffffffffffffffffffffffffffffffffffff1684604051611f9e9190612ed2565b600060405180830381855af49150503d8060008114611fd9576040519150601f19603f3d011682016040523d82523d6000602084013e611fde565b606091505b5091509150611fee858383612540565b95945050505050565b3415610ee5576040517fb398979f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006042821461206f5782826040517f2ee17a3d000000000000000000000000000000000000000000000000000000008152600401610693929190612f9e565b600061208861207f600185612fb2565b85013560f81c90565b60ff169050604084013560f81c843560208601357f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08111156120fc578686826040517fad4aac7600000000000000000000000000000000000000000000000000000000815260040161069393929190612fc5565b8260ff16601b1415801561211457508260ff16601c14155b15612151578686846040517fe578897e00000000000000000000000000000000000000000000000000000000815260040161069393929190612fe9565b600184036121be576040805160008152602081018083528a905260ff851691810191909152606081018390526080810182905260019060a0015b6020604051602081039080840390855afa1580156121ad573d6000803e3d6000fd5b505050602060405103519450612296565b6002840361225b576040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101899052600190605c01604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181528282528051602091820120600084529083018083525260ff861690820152606081018490526080810183905260a00161218b565b86868560016040517f9dfba8520000000000000000000000000000000000000000000000000000000081526004016106939493929190613010565b73ffffffffffffffffffffffffffffffffffffffff85166122e75786866040517f6c1719d2000000000000000000000000000000000000000000000000000000008152600401610693929190612f9e565b505050509392505050565b600081810361232d576040517fac241e1100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000838361233c600182612fb2565b81811061234b5761234b612ca0565b919091013560f81c91505060018114806123655750600281145b156123aa578473ffffffffffffffffffffffffffffffffffffffff1661238c87868661202f565b73ffffffffffffffffffffffffffffffffffffffff161491506124d0565b600381036124955773ffffffffffffffffffffffffffffffffffffffff8516631626ba7e87866000876123de600182612fb2565b926123eb93929190612d68565b6040518463ffffffff1660e01b81526004016124099392919061303c565b602060405180830381865afa158015612426573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061244a9190613056565b7fffffffff00000000000000000000000000000000000000000000000000000000167f1626ba7e000000000000000000000000000000000000000000000000000000001491506124d0565b83838260006040517f9dfba8520000000000000000000000000000000000000000000000000000000081526004016106939493929190613010565b50949350505050565b6040517f53657175656e636520737461746963206469676573743a0a00000000000000006020820152603881018290526000906058016115f9565b60008183106125305760008281526020849052604090206105cb565b5060009182526020526040902090565b60608261255557612550826125cf565b6105cb565b8151158015612579575073ffffffffffffffffffffffffffffffffffffffff84163b155b156125c8576040517f9996b31500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85166004820152602401610693565b50806105cb565b8051156125df5780518082602001fd5b6040517f1425ea4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b7fffffffff00000000000000000000000000000000000000000000000000000000811681146106a557600080fd5b60006020828403121561265157600080fd5b81356105cb81612611565b803573ffffffffffffffffffffffffffffffffffffffff8116811461268057600080fd5b919050565b60008083601f84011261269757600080fd5b50813567ffffffffffffffff8111156126af57600080fd5b6020830191508360208285010111156126c757600080fd5b9250929050565b6000806000806000608086880312156126e657600080fd5b6126ef8661265c565b94506126fd6020870161265c565b935060408601359250606086013567ffffffffffffffff81111561272057600080fd5b61272c88828901612685565b969995985093965092949392505050565b60008060006040848603121561275257600080fd5b83359250602084013567ffffffffffffffff81111561277057600080fd5b61277c86828701612685565b9497909650939450505050565b60008060006060848603121561279e57600080fd5b833567ffffffffffffffff8111156127b557600080fd5b840161012081870312156127c857600080fd5b95602085013595506040909401359392505050565b600080600080604085870312156127f357600080fd5b843567ffffffffffffffff81111561280a57600080fd5b61281687828801612685565b909550935050602085013567ffffffffffffffff81111561283657600080fd5b61284287828801612685565b95989497509550505050565b60006020828403121561286057600080fd5b5035919050565b60008083601f84011261287957600080fd5b50813567ffffffffffffffff81111561289157600080fd5b6020830191508360208260051b85010111156126c757600080fd5b600080600080600080606087890312156128c557600080fd5b863567ffffffffffffffff8111156128dc57600080fd5b6128e889828a01612867565b909750955050602087013567ffffffffffffffff81111561290857600080fd5b61291489828a01612867565b909550935050604087013567ffffffffffffffff81111561293457600080fd5b61294089828a01612867565b979a9699509497509295939492505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156129c8576129c8612952565b604052919050565b600082601f8301126129e157600080fd5b813567ffffffffffffffff8111156129fb576129fb612952565b612a2c60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601612981565b818152846020838601011115612a4157600080fd5b816020850160208301376000918101602001919091529392505050565b60008060408385031215612a7157600080fd5b612a7a8361265c565b9150602083013567ffffffffffffffff811115612a9657600080fd5b612aa2858286016129d0565b9150509250929050565b60005b83811015612ac7578181015183820152602001612aaf565b50506000910152565b6020815260008251806020840152612aef816040850160208701612aac565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b60008060008060608587031215612b3757600080fd5b612b408561265c565b935060208501359250604085013567ffffffffffffffff81111561283657600080fd5b60008060008060008060008060a0898b031215612b7f57600080fd5b612b888961265c565b9750612b9660208a0161265c565b9650604089013567ffffffffffffffff811115612bb257600080fd5b612bbe8b828c01612867565b909750955050606089013567ffffffffffffffff811115612bde57600080fd5b612bea8b828c01612867565b909550935050608089013567ffffffffffffffff811115612c0a57600080fd5b612c168b828c01612685565b999c989b5096995094979396929594505050565b60008060008060008060a08789031215612c4357600080fd5b612c4c8761265c565b9550612c5a6020880161265c565b94506040870135935060608701359250608087013567ffffffffffffffff811115612c8457600080fd5b61294089828a01612685565b8183823760009101908152919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215612ce157600080fd5b6105cb8261265c565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112612d1f57600080fd5b83018035915067ffffffffffffffff821115612d3a57600080fd5b6020019150368190038213156126c757600080fd5b600060208284031215612d6157600080fd5b5051919050565b60008085851115612d7857600080fd5b83861115612d8557600080fd5b5050820193919092039150565b600080600060608486031215612da757600080fd5b83359250602084013567ffffffffffffffff811115612dc557600080fd5b8401601f81018613612dd657600080fd5b803567ffffffffffffffff811115612df057612df0612952565b8060051b612e0060208201612981565b91825260208184018101929081019089841115612e1c57600080fd5b6020850194505b83851015612e4257843580835260209586019590935090910190612e23565b95505050506040850135905067ffffffffffffffff811115612e6357600080fd5b612e6f868287016129d0565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820281158282048414176105b5576105b5612e79565b808201808211156105b5576105b5612e79565b60008251612ee4818460208701612aac565b9190910192915050565b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b606081526000612f4b606083018688612eee565b6020830194909452506040015292915050565b84815273ffffffffffffffffffffffffffffffffffffffff84166020820152606060408201526000612f94606083018486612eee565b9695505050505050565b6020815260006105c8602083018486612eee565b818103818111156105b5576105b5612e79565b604081526000612fd9604083018587612eee565b9050826020830152949350505050565b604081526000612ffd604083018587612eee565b905060ff83166020830152949350505050565b606081526000613024606083018688612eee565b60208301949094525090151560409091015292915050565b838152604060208201526000611fee604083018486612eee565b60006020828403121561306857600080fd5b81516105cb8161261156fea164736f6c634300081b000a";
bytes constant initCode = abi.encodePacked(byteCode, abi.encode(ENTRY_POINT_V070_ADDRESS));
bytes32 constant initCodeHash = 0x26ea88331570592b617d5ab7a98bafeb430dea46f2b8e73e3aaf0c37f521c4e4;
bytes32 constant salt = 0x0000000000000000000000000000000000000000c52bdf9cf402082fac745118;
