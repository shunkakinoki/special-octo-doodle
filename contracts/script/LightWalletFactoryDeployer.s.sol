// Copyright 2023-2024 Light, Inc.
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

pragma solidity ^0.8.18;

import {EntryPoint} from "@/contracts/core/EntryPoint.sol";
import {LightWalletFactory} from "@/contracts/LightWalletFactory.sol";
import {BaseLightDeployer} from "@/script/base/BaseLightDeployer.s.sol";
// solhint-disable-next-line no-console
import {console} from "forge-std/console.sol";
import {Script} from "forge-std/Script.sol";

// LightWalletFactoryDeployer -- Deploys the LightWalletFactory contract
contract LightWalletFactoryDeployer is BaseLightDeployer, Script {
    // -------------------------------------------------------------------------
    // Bytecode
    // -------------------------------------------------------------------------

    // bytes private byteCode = type(LightWalletFactory).creationCode;
    bytes private byteCode =
        hex"60c0604052306080523480156200001557600080fd5b506040516200374e3803806200374e833981016040819052620000389162000117565b6001600160a01b03811660a0526200004f62000056565b5062000149565b600054610100900460ff1615620000c35760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff9081161462000115576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b6000602082840312156200012a57600080fd5b81516001600160a01b03811681146200014257600080fd5b9392505050565b60805160a0516135ae620001a06000396000818161047a015281816111250152818161163b0152611cb90152600081816106a60152818161075601528181610a7d01528181610b2d0152610ca501526135ae6000f3fe6080604052600436106101785760003560e01c806352d1902d116100cb578063b0d691fe1161007f578063d087d28811610059578063d087d2881461050c578063f23a6e6114610521578063ffa1ad741461056757600080fd5b8063b0d691fe14610453578063b61d27f6146104a4578063bc197c81146104c457600080fd5b8063853c5068116100b0578063853c5068146103955780639498bd71146103dd578063a3f4df7e146103fd57600080fd5b806352d1902d1461034c57806357c56d6b1461036157600080fd5b8063295614261161012d57806347e1da2a1161010757806347e1da2a146103045780634f1ef2861461032457806351605d801461033757600080fd5b806329561426146102965780633659cfe6146102b65780633a871cdd146102d657600080fd5b8063150b7a021161015e578063150b7a02146101e05780631626ba7e1461025657806320c13b0b1461027657600080fd5b806223de291461018457806301ffc9a7146101ab57600080fd5b3661017f57005b600080fd5b34801561019057600080fd5b506101a961019f366004612aee565b5050505050505050565b005b3480156101b757600080fd5b506101cb6101c6366004612bc7565b6105b0565b60405190151581526020015b60405180910390f35b3480156101ec57600080fd5b506102256101fb366004612be4565b7f150b7a020000000000000000000000000000000000000000000000000000000095945050505050565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016101d7565b34801561026257600080fd5b50610225610271366004612c53565b6105c1565b34801561028257600080fd5b50610225610291366004612c9f565b6105d8565b3480156102a257600080fd5b506101a96102b1366004612d0b565b61063d565b3480156102c257600080fd5b506101a96102d1366004612d24565b61068f565b3480156102e257600080fd5b506102f66102f1366004612d3f565b610891565b6040519081526020016101d7565b34801561031057600080fd5b506101a961031f366004612dd8565b6108b0565b6101a9610332366004612f7e565b610a66565b34801561034357600080fd5b506102f6610c5c565b34801561035857600080fd5b506102f6610c8b565b34801561036d57600080fd5b506102f67f8713a7c4465f6fbee2b6e9d6646d1d9f83fec929edfc4baf661f3c865bdd04d181565b3480156103a157600080fd5b506103b56103b0366004612c53565b610d77565b604080519586526020860194909452928401919091526060830152608082015260a0016101d7565b3480156103e957600080fd5b506101a96103f8366004612d0b565b610f3f565b34801561040957600080fd5b506104466040518060400160405280600b81526020017f4c6967687457616c6c657400000000000000000000000000000000000000000081525081565b6040516101d79190612ff0565b34801561045f57600080fd5b5060405173ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001681526020016101d7565b3480156104b057600080fd5b506101a96104bf366004613041565b6110d2565b3480156104d057600080fd5b506102256104df36600461308f565b7fbc197c810000000000000000000000000000000000000000000000000000000098975050505050505050565b34801561051857600080fd5b506102f6611121565b34801561052d57600080fd5b5061022561053c366004613129565b7ff23a6e61000000000000000000000000000000000000000000000000000000009695505050505050565b34801561057357600080fd5b506104466040518060400160405280600581526020017f302e322e3000000000000000000000000000000000000000000000000000000081525081565b60006105bb826111db565b92915050565b60006105ce8484846112bf565b90505b9392505050565b6000806105fd86866040516105ee92919061318f565b6040518091039020858561130a565b509050801561062f57507f20c13b0b000000000000000000000000000000000000000000000000000000009050610635565b50600090505b949350505050565b333014610683576040517fe12588940000000000000000000000000000000000000000000000000000000081523360048201523060248201526044015b60405180910390fd5b61068c81611348565b50565b73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163003610754576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c0000000000000000000000000000000000000000606482015260840161067a565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166107c97f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff161461086c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f78790000000000000000000000000000000000000000606482015260840161067a565b610875816113de565b6040805160008082526020820190925261068c9183919061141f565b600061089b611623565b6108a584846116c4565b90506105d1826118b4565b6108b8611623565b84811480156108ce57508215806108ce57508281145b610934576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f77726f6e67206172726179206c656e6774687300000000000000000000000000604482015260640161067a565b60008390036109ea5760005b858110156109e4576109d287878381811061095d5761095d61319f565b90506020020160208101906109729190612d24565b60008585858181106109865761098661319f565b905060200281019061099891906131ce565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061192b92505050565b806109dc81613262565b915050610940565b50610a5e565b60005b85811015610a5c57610a4a878783818110610a0a57610a0a61319f565b9050602002016020810190610a1f9190612d24565b868684818110610a3157610a3161319f565b905060200201358585858181106109865761098661319f565b80610a5481613262565b9150506109ed565b505b505050505050565b73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163003610b2b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c0000000000000000000000000000000000000000606482015260840161067a565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16610ba07f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff1614610c43576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f78790000000000000000000000000000000000000000606482015260840161067a565b610c4c826113de565b610c588282600161141f565b5050565b6000610c867fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf85490565b905090565b60003073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614610d52576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000606482015260840161067a565b507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc90565b60008060008060008087876000818110610d9357610d9361319f565b909101357fff00000000000000000000000000000000000000000000000000000000000000169150819050610de957610dcb896119a8565b9250610dd8838989611a2d565b92985090965094509150610f349050565b7fff0000000000000000000000000000000000000000000000000000000000000081811601610e2857610e1b896119a8565b9250610dd8838989611a7e565b7ffe000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821601610e7a57610e1b89611aaa565b7ffd000000000000000000000000000000000000000000000000000000000000007fff00000000000000000000000000000000000000000000000000000000000000821601610ede57610ece898989611b17565b9550955095509550955050610f34565b6040517f6085cd820000000000000000000000000000000000000000000000000000000081527fff000000000000000000000000000000000000000000000000000000000000008216600482015260240161067a565b939792965093509350565b600054610100900460ff1615808015610f5f5750600054600160ff909116105b80610f795750303b158015610f79575060005460ff166001145b611005576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a6564000000000000000000000000000000000000606482015260840161067a565b600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055801561106357600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff166101001790555b61106c82611c94565b8015610c5857600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b6110da611623565b61111b848484848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061192b92505050565b50505050565b60007f00000000000000000000000000000000000000000000000000000000000000006040517f35567e1a0000000000000000000000000000000000000000000000000000000081523060048201526000602482015273ffffffffffffffffffffffffffffffffffffffff91909116906335567e1a90604401602060405180830381865afa1580156111b7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c86919061329a565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f150b7a0200000000000000000000000000000000000000000000000000000000148061126e57507fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000145b806105bb57507fffffffff0000000000000000000000000000000000000000000000000000000082167f01ffc9a7000000000000000000000000000000000000000000000000000000001492915050565b6000806112cd85858561130a565b50905080156112ff57507f1626ba7e0000000000000000000000000000000000000000000000000000000090506105d1565b506000949350505050565b600080600080600061131d888888610d77565b5096509194509250905082821080159061133b575061133b81611d03565b9450505050935093915050565b8061137f576040517f4294d12700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6113a87fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf8829055565b6040518181527f307ed6bd941ee9fc80f369c94af5fa11e25bab5102a6140191756c5474a30bfa9060200160405180910390a150565b33301461068c576040517fe125889400000000000000000000000000000000000000000000000000000000815233600482015230602482015260440161067a565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156114575761145283611d36565b505050565b8273ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156114dc575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682019092526114d99181019061329a565b60015b611568576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f742055555053000000000000000000000000000000000000606482015260840161067a565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc8114611617576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f7860448201527f6961626c65555549440000000000000000000000000000000000000000000000606482015260840161067a565b50611452838383611e40565b3373ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016146116c2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f6163636f756e743a206e6f742066726f6d20456e747279506f696e7400000000604482015260640161067a565b565b6000806116d56101408501856131ce565b60008181106116e6576116e661319f565b7fff000000000000000000000000000000000000000000000000000000000000009201359182169250507f0300000000000000000000000000000000000000000000000000000000000000168190036117705760006117528461174d6101408801886131ce565b61130a565b50905080611765576001925050506105bb565b6000925050506105bb565b7fff0000000000000000000000000000000000000000000000000000000000000081167f0400000000000000000000000000000000000000000000000000000000000000036118aa57600080806117cb6101408801886131ce565b6117d99160019082906132b3565b8101906117e691906132dd565b9250925092506117f7828488611e65565b611837576040517faab788dc000000000000000000000000000000000000000000000000000000008152600481018490526024810187905260440161067a565b60008251602061184791906133b0565b6118529060a16133c7565b90506000611884856118686101408c018c6131ce565b859087518761187791906133c7565b9261174d939291906132b3565b5090508061189b57600196505050505050506105bb565b600096505050505050506105bb565b5060019392505050565b801561068c5760405160009033907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90849084818181858888f193505050503d806000811461191f576040519150601f19603f3d011682016040523d82523d6000602084013e611924565b606091505b5050505050565b6000808473ffffffffffffffffffffffffffffffffffffffff16848460405161195491906133da565b60006040518083038185875af1925050503d8060008114611991576040519150601f19603f3d011682016040523d82523d6000602084013e611996565b606091505b50915091508161192457805160208201fd5b6040517f190100000000000000000000000000000000000000000000000000000000000060208201524660228201527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b166042820152605681018290526000906076015b604051602081830303815290604052805190602001209050919050565b6000808080611a4887611a43876006818b6132b3565b611e7b565b6000908152873560f01c6020818152604080842084526002909a013560e01c908190529890912090999198509695509350505050565b6000808080611a9987611a94876001818b6132b3565b611a2d565b935093509350935093509350935093565b6040517f190100000000000000000000000000000000000000000000000000000000000060208201526000602282018190527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003060601b1660428301526056820183905290607601611a10565b6000808080806004600188013560e81c82611b3283836133c7565b9050611b448b6103b083868d8f6132b3565b939b5091995097509550935087871015611b9c57611b6481848b8d6132b3565b89896040517fb006aba000000000000000000000000000000000000000000000000000000000815260040161067a949392919061343f565b8092505b88831015611c865760038301928a013560e81c9150611bbf83836133c7565b90506000611be1611bcf88612311565b8c8c879086926103b0939291906132b3565b939c50919a5098509091505088881015611c3957611c0182858c8e6132b3565b8a8a6040517fb006aba000000000000000000000000000000000000000000000000000000000815260040161067a949392919061343f565b848110611c7c576040517f37daf62b000000000000000000000000000000000000000000000000000000008152600481018290526024810186905260440161067a565b9350915081611ba0565b505050939792965093509350565b611c9d81611348565b604051819073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016907f6f2a6aac3f1c9fc5bb4eec9d305f0036888047b27e7ca599572afe083d9879e890600090a350565b600081158015906105bb5750507fea7157fa25e3aa17d0ae2d5280fa4e24d421c61842aa85e45194e1145aa72bf8541490565b73ffffffffffffffffffffffffffffffffffffffff81163b611dda576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201527f6f74206120636f6e747261637400000000000000000000000000000000000000606482015260840161067a565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b611e4983612345565b600082511180611e565750805b156114525761111b8383612392565b600082611e7285846123b7565b14949350505050565b60008060005b8381101561230857600181019085013560f81c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8101611f2257601582019186013560f881901c9060581c73ffffffffffffffffffffffffffffffffffffffff81169074ff000000000000000000000000000000000000000016811785611f085780611f17565b60008681526020829052604090205b955050505050611e81565b80611fb85760018201918681013560f81c906043016000611f4e8a611f4984888c8e6132b3565b612404565b60ff841697909701969194508491905060a083901b74ff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff82161786611f9d5780611fac565b60008781526020829052604090205b96505050505050611e81565b600281036120e0576000808784013560f881901c9060581c73ffffffffffffffffffffffffffffffffffffffff16601586019550909250905060008885013560e81c600386018162ffffff1691508096508192505050600081860190506120318b848c8c8a90869261202c939291906132b3565b6126c7565b612079578a8361204383898d8f6132b3565b6040517f9a94623200000000000000000000000000000000000000000000000000000000815260040161067a9493929190613466565b60ff8416979097019694508460a084901b74ff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff841617876120c457806120d3565b60008881526020829052604090205b9750505050505050611e81565b60038103612113576020820191860135836120fb578061210a565b60008481526020829052604090205b93505050611e81565b6004810361215f576003808301928781013560e81c91908201016000806121408b611a4385898d8f6132b3565b60009889526020526040909720969097019650909350611e8192505050565b600681036122675760008287013560f81c60018401935060ff16905060008784013560f01c60028501945061ffff16905060008885013560e81c600386018162ffffff1691508096508192505050600081860190506000806121cd8d8d8d8b908792611a43939291906132b3565b939850889390925090508482106121e357988501985b604080517f53657175656e6365206e657374656420636f6e6669673a0a0000000000000000602080830191909152603882018490526058820188905260788083018a90528351808403909101815260989092019092528051910120896122495780612258565b60008a81526020829052604090205b99505050505050505050611e81565b600581036122d35760208201918601358781036122a2577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff94505b60006122ad826128ae565b9050846122ba57806122c9565b60008581526020829052604090205b9450505050611e81565b6040517fb2505f7c0000000000000000000000000000000000000000000000000000000081526004810182905260240161067a565b50935093915050565b7f8713a7c4465f6fbee2b6e9d6646d1d9f83fec929edfc4baf661f3c865bdd04d160009081526020829052604081206105bb565b61234e81611d36565b60405173ffffffffffffffffffffffffffffffffffffffff8216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606105d1838360405180606001604052806027815260200161357b602791396128e9565b600081815b84518110156123fc576123e8828683815181106123db576123db61319f565b602002602001015161296e565b9150806123f481613262565b9150506123bc565b509392505050565b6000604282146124445782826040517f2ee17a3d00000000000000000000000000000000000000000000000000000000815260040161067a92919061349c565b600061245d6124546001856134b0565b85013560f81c90565b60ff169050604084013560f81c843560208601357f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08111156124d1578686826040517fad4aac7600000000000000000000000000000000000000000000000000000000815260040161067a939291906134c3565b8260ff16601b141580156124e957508260ff16601c14155b15612526578686846040517fe578897e00000000000000000000000000000000000000000000000000000000815260040161067a939291906134e7565b60018403612593576040805160008152602081018083528a905260ff851691810191909152606081018390526080810182905260019060a0015b6020604051602081039080840390855afa158015612582573d6000803e3d6000fd5b50505060206040510351945061266b565b60028403612630576040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101899052600190605c01604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181528282528051602091820120600084529083018083525260ff861690820152606081018490526080810183905260a001612560565b86868560016040517f9dfba85200000000000000000000000000000000000000000000000000000000815260040161067a949392919061350e565b73ffffffffffffffffffffffffffffffffffffffff85166126bc5786866040517f6c1719d200000000000000000000000000000000000000000000000000000000815260040161067a92919061349c565b505050509392505050565b6000818103612702576040517fac241e1100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600083836127116001826134b0565b8181106127205761272061319f565b919091013560f81c915050600181148061273a5750600281145b1561277f578473ffffffffffffffffffffffffffffffffffffffff16612761878686612404565b73ffffffffffffffffffffffffffffffffffffffff161491506128a5565b6003810361286a5773ffffffffffffffffffffffffffffffffffffffff8516631626ba7e87866000876127b36001826134b0565b926127c0939291906132b3565b6040518463ffffffff1660e01b81526004016127de9392919061353a565b602060405180830381865afa1580156127fb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061281f919061355d565b7fffffffff00000000000000000000000000000000000000000000000000000000167f1626ba7e000000000000000000000000000000000000000000000000000000001491506128a5565b83838260006040517f9dfba85200000000000000000000000000000000000000000000000000000000815260040161067a949392919061350e565b50949350505050565b6040517f53657175656e636520737461746963206469676573743a0a0000000000000000602082015260388101829052600090605801611a10565b60606000808573ffffffffffffffffffffffffffffffffffffffff168560405161291391906133da565b600060405180830381855af49150503d806000811461294e576040519150601f19603f3d011682016040523d82523d6000602084013e612953565b606091505b50915091506129648683838761299d565b9695505050505050565b600081831061298a5760008281526020849052604090206105d1565b60008381526020839052604090206105d1565b60608315612a33578251600003612a2c5773ffffffffffffffffffffffffffffffffffffffff85163b612a2c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161067a565b5081610635565b6106358383815115612a485781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067a9190612ff0565b803573ffffffffffffffffffffffffffffffffffffffff81168114612aa057600080fd5b919050565b60008083601f840112612ab757600080fd5b50813567ffffffffffffffff811115612acf57600080fd5b602083019150836020828501011115612ae757600080fd5b9250929050565b60008060008060008060008060c0898b031215612b0a57600080fd5b612b1389612a7c565b9750612b2160208a01612a7c565b9650612b2f60408a01612a7c565b955060608901359450608089013567ffffffffffffffff80821115612b5357600080fd5b612b5f8c838d01612aa5565b909650945060a08b0135915080821115612b7857600080fd5b50612b858b828c01612aa5565b999c989b5096995094979396929594505050565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461068c57600080fd5b600060208284031215612bd957600080fd5b81356105d181612b99565b600080600080600060808688031215612bfc57600080fd5b612c0586612a7c565b9450612c1360208701612a7c565b935060408601359250606086013567ffffffffffffffff811115612c3657600080fd5b612c4288828901612aa5565b969995985093965092949392505050565b600080600060408486031215612c6857600080fd5b83359250602084013567ffffffffffffffff811115612c8657600080fd5b612c9286828701612aa5565b9497909650939450505050565b60008060008060408587031215612cb557600080fd5b843567ffffffffffffffff80821115612ccd57600080fd5b612cd988838901612aa5565b90965094506020870135915080821115612cf257600080fd5b50612cff87828801612aa5565b95989497509550505050565b600060208284031215612d1d57600080fd5b5035919050565b600060208284031215612d3657600080fd5b6105d182612a7c565b600080600060608486031215612d5457600080fd5b833567ffffffffffffffff811115612d6b57600080fd5b84016101608187031215612d7e57600080fd5b95602085013595506040909401359392505050565b60008083601f840112612da557600080fd5b50813567ffffffffffffffff811115612dbd57600080fd5b6020830191508360208260051b8501011115612ae757600080fd5b60008060008060008060608789031215612df157600080fd5b863567ffffffffffffffff80821115612e0957600080fd5b612e158a838b01612d93565b90985096506020890135915080821115612e2e57600080fd5b612e3a8a838b01612d93565b90965094506040890135915080821115612e5357600080fd5b50612e6089828a01612d93565b979a9699509497509295939492505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715612ee857612ee8612e72565b604052919050565b600082601f830112612f0157600080fd5b813567ffffffffffffffff811115612f1b57612f1b612e72565b612f4c60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601612ea1565b818152846020838601011115612f6157600080fd5b816020850160208301376000918101602001919091529392505050565b60008060408385031215612f9157600080fd5b612f9a83612a7c565b9150602083013567ffffffffffffffff811115612fb657600080fd5b612fc285828601612ef0565b9150509250929050565b60005b83811015612fe7578181015183820152602001612fcf565b50506000910152565b602081526000825180602084015261300f816040850160208701612fcc565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b6000806000806060858703121561305757600080fd5b61306085612a7c565b935060208501359250604085013567ffffffffffffffff81111561308357600080fd5b612cff87828801612aa5565b60008060008060008060008060a0898b0312156130ab57600080fd5b6130b489612a7c565b97506130c260208a01612a7c565b9650604089013567ffffffffffffffff808211156130df57600080fd5b6130eb8c838d01612d93565b909850965060608b013591508082111561310457600080fd5b6131108c838d01612d93565b909650945060808b0135915080821115612b7857600080fd5b60008060008060008060a0878903121561314257600080fd5b61314b87612a7c565b955061315960208801612a7c565b94506040870135935060608701359250608087013567ffffffffffffffff81111561318357600080fd5b612e6089828a01612aa5565b8183823760009101908152919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261320357600080fd5b83018035915067ffffffffffffffff82111561321e57600080fd5b602001915036819003821315612ae757600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361329357613293613233565b5060010190565b6000602082840312156132ac57600080fd5b5051919050565b600080858511156132c357600080fd5b838611156132d057600080fd5b5050820193919092039150565b6000806000606084860312156132f257600080fd5b8335925060208085013567ffffffffffffffff8082111561331257600080fd5b818701915087601f83011261332657600080fd5b81358181111561333857613338612e72565b8060051b613347858201612ea1565b918252838101850191858101908b84111561336157600080fd5b948601945b8386101561337f57853582529486019490860190613366565b9750505050604087013592508083111561339857600080fd5b50506133a686828701612ef0565b9150509250925092565b80820281158282048414176105bb576105bb613233565b808201808211156105bb576105bb613233565b600082516133ec818460208701612fcc565b9190910192915050565b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b6060815260006134536060830186886133f6565b6020830194909452506040015292915050565b84815273ffffffffffffffffffffffffffffffffffffffff841660208201526060604082015260006129646060830184866133f6565b6020815260006105ce6020830184866133f6565b818103818111156105bb576105bb613233565b6040815260006134d76040830185876133f6565b9050826020830152949350505050565b6040815260006134fb6040830185876133f6565b905060ff83166020830152949350505050565b6060815260006135226060830186886133f6565b60208301949094525090151560409091015292915050565b8381526040602082015260006135546040830184866133f6565b95945050505050565b60006020828403121561356f57600080fd5b81516105d181612b9956fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a164736f6c6343000812000a0000000000000000000000007fa9385be102ac3eac297483dd6233d62b3e1496";
    bytes private initCode = abi.encodePacked(byteCode, abi.encode(address(ENTRY_POINT_ADDRESS)));

    // -------------------------------------------------------------------------
    // Run
    // -------------------------------------------------------------------------

    function run() public {
        // Log the byte code hash
        // solhint-disable-next-line no-console
        console.logBytes32(keccak256(initCode));
        // The init code hash of the LightWalletFactory
        bytes32 initCodeHash = 0x6c1d0a1e8ebde3a6cb3d027c3cc36ddbeaa6624775948eba317b62474bd00073;
        // Assert that the init code is the expected value
        assert(keccak256(initCode) == initCodeHash);

        // Salt for deterministic deployment
        bytes32 salt = 0x0000000000000000000000000000000000000000416826cdcc13c902574c316d;

        // If testing on a local chain, use without a safe create2
        if (block.chainid == 0x7a69) {
            // Use private key
            vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

            // Construct the entrypoint
            entryPoint = new EntryPoint();

            // Create the factory
            factory = new LightWalletFactory(entryPoint);
        } else {
            // Use regular broadcast
            vm.startBroadcast();

            // Create LightWalletFactory
            factory = LightWalletFactory(IMMUTABLE_CREATE2_FACTORY.safeCreate2(salt, initCode));

            // Assert that the factory is the expected address
            assert(address(factory) == LIGHT_FACTORY_ADDRESS);
        }

        // Stop the broadcast
        vm.stopBroadcast();
    }
}
