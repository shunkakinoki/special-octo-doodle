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

bytes constant byteCode =
    hex"0000000000000000000000000000000000000000d7f995ff1ea60f02e52877f761014060405234801561001157600080fd5b5060405161001e90610106565b604051809103906000f08015801561003a573d6000803e3d6000fd5b506001600160a01b03166080523060a0524660c05260608061009c60408051808201825260128152715268696e6573746f6e65526567697374727960701b60208083019190915282518084019093526004835263076312e360e41b9083015291565b815160209283012081519183019190912060e0829052610100819052604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f8152938401929092529082015246606082015230608082015260a0902061012052506101139050565b6101d9806149bc83390190565b60805160a05160c05160e051610100516101205161485a610162600039600061213d015260006121f7015260006121d1015260006121810152600061215e01526000611b8b015261485a6000f3fe6080604052600436106102045760003560e01c80637cb2afd811610118578063b65d1012116100a0578063dd0fd2781161006f578063dd0fd2781461069e578063e14f3d32146106cb578063f05c04e1146106eb578063f095ec1b1461070b578063f190e2b11461072b57600080fd5b8063b65d101214610604578063b6b791a114610624578063c23697a814610651578063d90486241461067157600080fd5b8063945e3641116100e7578063945e36411461054a57806396fb72171461056a5780639f3e1b531461058a578063b060cb1e146105aa578063b50b706b146105d757600080fd5b80637cb2afd8146104c257806384b0196e146104e257806388dc678d1461050a5780638e6ec8241461052a57600080fd5b80634990a6821161019b57806355f47dde1161016a57806355f47dde146103b6578063617734d0146103d657806370d2af24146103f657806371c61a2b1461041657806377efcab4146104a257600080fd5b80634990a682146103365780634c13560c146103565780634ece78ca14610376578063529562a11461039657600080fd5b80631d4d9810116101d75780631d4d98101461029b57806329757d37146102c95780632b30c899146102e95780632ed944671461031657600080fd5b806303b79c841461020957806304a1f298146102395780630bb30abc1461025b5780631896f70a1461027b575b600080fd5b61021c610217366004613836565b61073e565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561024557600080fd5b5061025961025436600461393b565b6107b8565b005b34801561026757600080fd5b506102596102763660046139c6565b610875565b34801561028757600080fd5b50610259610296366004613a21565b61098c565b3480156102a757600080fd5b506102bb6102b6366004613a51565b610acf565b604051908152602001610230565b3480156102d557600080fd5b506102596102e4366004613ab9565b610cc2565b3480156102f557600080fd5b50610309610304366004613b3f565b610d77565b6040516102309190613c11565b34801561032257600080fd5b50610259610331366004613c60565b610eb9565b34801561034257600080fd5b50610259610351366004613cc3565b610fb0565b34801561036257600080fd5b50610259610371366004613d04565b610fbf565b34801561038257600080fd5b50610259610391366004613d32565b610fcb565b3480156103a257600080fd5b506102596103b1366004613d96565b611077565b3480156103c257600080fd5b506102bb6103d1366004613dd7565b611087565b3480156103e257600080fd5b506102bb6103f1366004613e1d565b6110c1565b34801561040257600080fd5b506102bb610411366004613e66565b6110fe565b34801561042257600080fd5b5061047b610431366004613e83565b60408051808201909152600080825260208201525060009081526020818152604091829020825180840190935280546001600160a01b039081168452600190910154169082015290565b6040805182516001600160a01b039081168252602093840151169281019290925201610230565b3480156104ae57600080fd5b506102596104bd366004613e9c565b611131565b3480156104ce57600080fd5b506102596104dd366004613a21565b61113e565b3480156104ee57600080fd5b506104f76111e0565b6040516102309796959493929190613f08565b34801561051657600080fd5b50610259610525366004613fa1565b611249565b34801561053657600080fd5b50610259610545366004613ff4565b6112a4565b34801561055657600080fd5b50610259610565366004614057565b611357565b34801561057657600080fd5b5061025961058536600461409d565b611362565b34801561059657600080fd5b506102bb6105a53660046140c9565b61136d565b3480156105b657600080fd5b506105ca6105c5366004613e83565b6114f0565b60405161023091906140e6565b3480156105e357600080fd5b506102bb6105f23660046140c9565b60056020526000908152604090205481565b34801561061057600080fd5b5061025961061f366004614125565b6115ea565b34801561063057600080fd5b5061064461063f3660046140c9565b6115f6565b6040516102309190614188565b34801561065d57600080fd5b5061025961066c3660046140c9565b611656565b34801561067d57600080fd5b5061069161068c366004613d04565b611662565b604051610230919061419b565b3480156106aa57600080fd5b506106be6106b93660046140c9565b6116fb565b60405161023091906141aa565b3480156106d757600080fd5b506102bb6106e6366004613e1d565b61184d565b3480156106f757600080fd5b506102596107063660046141eb565b611882565b34801561071757600080fd5b5061021c610726366004614211565b611af7565b61021c61073936600461424f565b611b04565b600087815260208190526040812060018101546001600160a01b031661077f5760405163f184406b60e01b8152600481018a90526024015b60405180910390fd5b61078a88888c611c1b565b9150600061079b83338c8a8a611cee565b90506107aa8184848888611e6c565b505098975050505050505050565b6001600160a01b0385166000908152600560205260408120805482906107dd906142f9565b9182905550905060006107f96107f4878785611f20565b61213b565b9050600061083e888387878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061225392505050565b90508061085e57604051638baa579f60e01b815260040160405180910390fd5b61086a888a8989612358565b505050505050505050565b81801580610881575081155b1561089f576040516305a74e6160e01b815260040160405180910390fd5b818110156108c0576040516339093e6560e21b815260040160405180910390fd5b6000805b8281101561096c5760008686838181106108e0576108e0614312565b90506020020160208101906108f591906140c9565b9050826001600160a01b0316816001600160a01b0316116109295760405163cd0ecff160e01b815260040160405180910390fd5b809250610941600061093b8a84612478565b906124a2565b156109525761094f85614328565b94505b846000036109635750505050610986565b506001016108c4565b506040516339093e6560e21b815260040160405180910390fd5b50505050565b806001600160a01b0381161580610a0f57506040516301ffc9a760e01b81526314f0f87d60e21b60048201526001600160a01b038216906301ffc9a790602401602060405180830381865afa1580156109e9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a0d919061433f565b155b15610a385760405163f9492e7560e01b81526001600160a01b0382166004820152602401610776565b60008381526020819052604090206001015483906001600160a01b03163314610a7457604051634ca8886760e01b815260040160405180910390fd5b60008481526020819052604080822080546001600160a01b0319166001600160a01b03871690811782559151909287917f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a09190a35050505050565b6000816001600160a01b03811615801590610b5657506040516301ffc9a760e01b815263b2275fa960e01b60048201526001600160a01b038216906301ffc9a790602401602060405180830381865afa158015610b30573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b54919061433f565b155b15610b7f57604051630f09140760e01b81526001600160a01b0382166004820152602401610776565b60006040518060600160405280610b934290565b65ffffffffffff168152602001856001600160a01b0316815260200187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050509152509050610bf28161254a565b60008181526002602052604090205490935065ffffffffffff1615610c2d57604051635988c65560e11b815260048101849052602401610776565b60008381526002602090815260409182902083518154928501516001600160a01b0316600160301b026001600160d01b031990931665ffffffffffff90911617919091178155908201518291906001820190610c8990826143f3565b505060405133915084907fd16733fb8c2a502f4e1d1d63970cbab355e37ff6d6d12a215b7d0197ea5535f490600090a350509392505050565b6001600160a01b038416600090815260056020526040812080548290610ce7906142f9565b918290555090506000610cfd6107f48684612586565b90506000610d42878387878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061225392505050565b905080610d6257604051638baa579f60e01b815260040160405180910390fd5b610d6d8789886126c8565b5050505050505050565b606081806001600160401b03811115610d9257610d92614361565b604051908082528060200260200182016040528015610dcb57816020015b610db86137aa565b815260200190600190039081610db05790505b50915060005b81811015610eb057610e0986868684818110610def57610def614312565b9050602002016020810190610e0491906140c9565b612478565b6040805161010081018252825465ffffffffffff8082168352600160301b820481166020840152600160601b82041692820192909252600160901b90910463ffffffff16606082015260018201546001600160a01b0390811660808301526002830154811660a083015260038301541660c082015260049091015460e08201528351849083908110610e9d57610e9d614312565b6020908102919091010152600101610dd1565b50509392505050565b81801580610ec5575081155b15610ee3576040516305a74e6160e01b815260040160405180910390fd5b81811015610f04576040516339093e6560e21b815260040160405180910390fd5b6000805b8281101561096c576000868683818110610f2457610f24614312565b9050602002016020810190610f3991906140c9565b9050826001600160a01b0316816001600160a01b031611610f6d5760405163cd0ecff160e01b815260040160405180910390fd5b809250610f7e8861093b8b84612478565b15610f8f57610f8c85614328565b94505b84600003610fa05750505050610fa9565b50600101610f08565b5050505050565b610fbb33838361270d565b5050565b610fbb82826000612807565b6001600160a01b038516600090815260056020526040812080548290610ff0906142f9565b9182905550905060006110076107f48787856129c0565b9050600061104c888387878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061225392505050565b90508061106c57604051638baa579f60e01b815260040160405180910390fd5b610d6d88888861270d565b611082838383612807565b505050565b6001600160a01b0381166000908152600560205260408120546110ba906107f4906110b39060016144b2565b8590612586565b9392505050565b6001600160a01b0381166000908152600560205260408120546110f6906107f4906110ed9060016144b2565b869086906129c0565b949350505050565b6001600160a01b0381166000908152600560205260408120546110ba906107f49061112a9060016144b2565b8590612ac5565b61113b3382612b39565b50565b60008281526020819052604090206001015482906001600160a01b0316331461117a57604051634ca8886760e01b815260040160405180910390fd5b6000838152602081815260409182902060010180546001600160a01b0319166001600160a01b038616908117909155915191825284917f7a2c54badf601a71ed23c3ec8c070bac418dfd4fb160e0351861983746662d77910160405180910390a2505050565b600f60f81b606080600080808361123760408051808201825260128152715268696e6573746f6e65526567697374727960701b60208083019190915282518084019093526004835263076312e360e41b9083015291565b97989097965046955030945091925090565b600086815260208190526040902060018101546001600160a01b03166112855760405163f184406b60e01b815260048101889052602401610776565b60006112958760008a8989611cee565b9050610d6d8188848787611e6c565b6001600160a01b0384166000908152600560205260408120805482906112c9906142f9565b9182905550905060006112df6107f48684612ac5565b90506000611324878387878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061225392505050565b90508061134457604051638baa579f60e01b815260040160405180910390fd5b61134e8787612b39565b50505050505050565b610fbb3383836126c8565b610fbb338383612807565b6000816001600160a01b03811615806113f257506040516301ffc9a760e01b81526314f0f87d60e21b60048201526001600160a01b038216906301ffc9a790602401602060405180830381865afa1580156113cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113f0919061433f565b155b1561141b5760405163f9492e7560e01b81526001600160a01b0382166004820152602401610776565b604080518082019091526001600160a01b038416815233602082015261144081612b64565b6000818152602081905260409020549093506001600160a01b03161561147957604051630f5f2ba160e21b815260040160405180910390fd5b600083815260208181526040808320845181546001600160a01b03199081166001600160a01b03928316178355938601516001909201805490941691811691909117909255519086169185917f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a09190a35050919050565b604080516060808201835260008083526020830152918101919091526000828152600260209081526040918290208251606081018452815465ffffffffffff81168252600160301b90046001600160a01b031692810192909252600181018054929391929184019161156190614377565b80601f016020809104026020016040519081016040528092919081815260200182805461158d90614377565b80156115da5780601f106115af576101008083540402835291602001916115da565b820191906000526020600020905b8154815290600101906020018083116115bd57829003601f168201915b5050505050815250509050919050565b61108233848484612358565b6040805160608082018352600080835260208084018290528385018390526001600160a01b038681168352600180835292869020865194850187528054855292830154169083015260028101805493949293919284019161156190614377565b61113b33826000612807565b61166a6137aa565b6116748383612478565b6040805161010081018252825465ffffffffffff8082168352600160301b820481166020840152600160601b82041692820192909252600160901b90910463ffffffff16606082015260018201546001600160a01b0390811660808301526002830154811660a083015260038301541660c082015260049091015460e08201529392505050565b6001600160a01b0380821660009081526003602052604081208054606093919260ff821692620100009092049091169082900361173a57505050919050565b816001600160401b0381111561175257611752614361565b60405190808252806020026020018201604052801561177b578160200160208202803683370190505b509350808460008151811061179257611792614312565b6001600160a01b039092166020928302919091019091015260015b8281101561184457836001016000866001846117c991906144c5565b815181106117d9576117d9614312565b6020908102919091018101516001600160a01b03908116835282820193909352604091820160009081208a851682529091522054865191169086908390811061182457611824614312565b6001600160a01b03909216602092830291909101909101526001016117ad565b50505050919050565b6001600160a01b0381166000908152600560205260408120546110f6906107f4906118799060016144b2565b86908690611f20565b604080516020808402828101820190935283825283926118bf929186918591829190850190849080828437600092019190915250612b9692505050565b6118dc5760405163cd0ecff160e01b815260040160405180910390fd5b8015806118e9575060ff81115b156119075760405163cd0ecff160e01b815260040160405180910390fd5b8181146119275760405163cd0ecff160e01b815260040160405180910390fd5b60008383828161193957611939614312565b905060200201602081019061194e91906140c9565b6001600160a01b0316036119755760405163cd0ecff160e01b815260040160405180910390fd5b33600090815260036020526040902060ff85168210156119a85760405163aabd5a0960e01b815260040160405180910390fd5b805460ff8681166101000261ffff199092169084161717815583836000816119d2576119d2614312565b90506020020160208101906119e791906140c9565b81546001600160a01b0391909116620100000262010000600160b01b031990911617815581611a1581614328565b92505060005b82811015611ac4576000858583818110611a3757611a37614312565b9050602002016020810190611a4c91906140c9565b90508585611a5b8460016144b2565b818110611a6a57611a6a614312565b9050602002016020810190611a7f91906140c9565b6001600160a01b03918216600090815260018581016020908152604080842033855290915290912080546001600160a01b031916929093169190911790915501611a1b565b5060405133907ff689fb4afceb60ac48a5ca8113a5a57cb15e51d317f0ec57e07340192d9fb45990600090a25050505050565b60006110f6838386612ba1565b600083815260208190526040812060018101546001600160a01b0316611b405760405163f184406b60e01b815260048101869052602401610776565b306001600160a01b038b1603611b74576040516301b3a38360e21b81526001600160a01b038b166004820152602401610776565b604051630d84daa960e31b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690636c26d548903490611bc6908e908e908e90600401614501565b60206040518083038185885af1158015611be4573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190611c09919061452f565b9150600061079b836000888b8b611cee565b600081606081901c3314801590611c3b57506001600160601b0319811615155b15611c59576040516381e69d9b60e01b815260040160405180910390fd5b600085858080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920182905250939450611ca1925089915088905087612ba1565b905081602001825186818334f595505050806001600160a01b0316846001600160a01b031614611ce45760405163e6c4247b60e01b815260040160405180910390fd5b5050509392505050565b604080516060808201835260008083526020830152918101919091526001600160a01b038616600090815260016020526040812054611d2c91141590565b15611d55576040516345ed80e960e01b81526001600160a01b0387166004820152602401610776565b6001600160a01b0386163b611d7d57604051637483e90760e01b815260040160405180910390fd5b6040518060600160405280858152602001866001600160a01b0316815260200184848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052509390945250506001600160a01b03898116825260016020818152604093849020865181559086015191810180546001600160a01b03191692909316919091179091559083015192935083929091506002820190611e2c90826143f3565b50506040516001600160a01b03881691507fbc854169953f463b8509327459b9a9785beb45f6cdafdad8e75b9a33f401676890600090a295945050505050565b82546001600160a01b03168015801590611efa5750604051633da3df8760e21b81526001600160a01b0382169063f68f7e1c90611eb590339089908b908990899060040161454c565b6020604051808303816000875af1158015611ed4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ef8919061433f565b155b15611f1857604051633b0cfdad60e01b815260040160405180910390fd5b505050505050565b6000606083825b818110156120d457827fe78ff87b9693fc54b8a43c3b84702ae7bfbb7fc6235105790033913428381e1f888884818110611f6357611f63614312565b9050602002810190611f759190614597565b611f839060208101906140c9565b898985818110611f9557611f95614312565b9050602002810190611fa79190614597565b611fb89060408101906020016145b7565b8a8a86818110611fca57611fca614312565b9050602002810190611fdc9190614597565b611fea9060408101906145df565b604051611ff8929190614625565b60405180910390208b8b8781811061201257612012614312565b90506020028101906120249190614597565b612032906060810190614635565b60405160200161204392919061467e565b60408051601f198184030181528282528051602091820120908301969096526001600160a01b039094169381019390935265ffffffffffff9091166060830152608082015260a081019190915260c001604051602081830303815290604052805190602001206040516020016120ba9291906146ad565b60408051601f198184030181529190529250600101611f27565b508151602080840191909120604080517f432f54a02ff5e7b0998295a12eea6e09f826e00e15ebb49cdb5dd6914e7eadf793810193909352820152606081018590526080015b60405160208183030381529060405280519060200120925050509392505050565b7f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000030147f000000000000000000000000000000000000000000000000000000000000000046141661222e5750604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81527f000000000000000000000000000000000000000000000000000000000000000060208201527f00000000000000000000000000000000000000000000000000000000000000009181019190915246606082015230608082015260a090205b67190100000000000060005280601a5281603a52604260182090506000603a52919050565b6001600160a01b0390921691600083156110ba5760405183600052602083015160405260408351036122c3576040830151601b8160ff1c016020528060011b60011c60605250602060016080600060015afa805186183d15176122c1575060006060526040525060016110ba565b505b604183510361230957606083015160001a6020526040830151606052602060016080600060015afa805186183d1517612307575060006060526040525060016110ba565b505b600060605280604052631626ba7e60e01b808252846004830152602482016040815284516020018060448501828860045afa505060208160443d01858a5afa9051909114169150509392505050565b806000816001600160401b0381111561237357612373614361565b6040519080825280602002602001820160405280156123ac57816020015b6123996137aa565b8152602001906001900390816123915790505b5090506000805b838110156124455760006123eb888a8989868181106123d4576123d4614312565b90506020028101906123e69190614597565b612c2e565b8584815181106123fd576123fd614312565b6020026020010181935082905250508160000361241c5780925061243c565b82811461243c57604051631ac80ea760e01b815260040160405180910390fd5b506001016123b3565b50600086815260026020526040902061245f908390613047565b600081815260208190526040902061134e908390613119565b6001600160a01b039182166000908152600460209081526040808320939094168252919091522090565b815460009063ffffffff81811691603081901c821691606082901c81169160901c16836124d6576000945050505050612544565b82158015906124e457508242115b156124f6576000945050505050612544565b8115612509576000945050505050612544565b8515158015612529575061252763ffffffff8083169088906131bf16565b155b1561253b576000945050505050612544565b60019450505050505b92915050565b60003382604001518360200151604051602001612569939291906146cf565b604051602081830303815290604052805190602001209050919050565b60007fe6fb0252edfa0719f65bc4b7ff11df181a55bbef752d6bacaff6f4a369160b757fe78ff87b9693fc54b8a43c3b84702ae7bfbb7fc6235105790033913428381e1f6125d760208601866140c9565b6125e760408701602088016145b7565b6125f460408801886145df565b604051612602929190614625565b6040519081900390206126186060890189614635565b60405160200161262992919061467e565b60408051601f198184030181528282528051602091820120908301969096526001600160a01b039094169381019390935265ffffffffffff9091166060830152608082015260a081019190915260c0015b60408051601f19818403018152828252805160209182012090830193909352810191909152606081018390526080015b60405160208183030381529060405280519060200120905092915050565b6000806126d6848685612c2e565b600086815260026020526040902091935091506126f49083906131de565b6000818152602081905260409020610fa990839061324d565b806000816001600160401b0381111561272857612728614361565b60405190808252806020026020018201604052801561276157816020015b61274e6137aa565b8152602001906001900390816127465790505b5090506000805b838110156127ed5760006127938888888581811061278857612788614312565b9050602002016132f1565b8584815181106127a5576127a5614312565b602002602001018193508290525050816000036127c4578092506127e4565b8281146127e457604051631ac80ea760e01b815260040160405180910390fd5b50600101612768565b50600081815260208190526040902061134e9083906134e7565b6001600160a01b0380841660009081526003602052604090208054909160ff808316926101008104909116916201000090910416801580612846575081155b15612864576040516305a74e6160e01b815260040160405180910390fd5b816001036128f95760006128788783612478565b905061288481876124a2565b15612893575050505050505050565b60015b8481101561096c576001600160a01b03928316600090815260018701602090815260408083208c87168452909152902054909216916128d58884612478565b91506128e182886124a2565b156128f157505050505050505050565b600101612896565b60006129058783612478565b905061291181876124a2565b15612924578261292081614328565b9350505b60015b848110156129a0576001600160a01b03928316600090815260018701602090815260408083208c87168452909152902054909216916129668884612478565b915061297282886124a2565b15612985578361298181614328565b9450505b8360000361299857505050505050505050565b600101612927565b508215610d6d576040516339093e6560e21b815260040160405180910390fd5b6000606083825b81811015612a7b57827fe772c71320d83e91a3076e1414875f1affb9dbb84c39717315b34b38b9b4ef8e888884818110612a0357612a03614312565b612a179260209182020190810191506140c9565b604051602001612a3a9291909182526001600160a01b0316602082015260400190565b60405160208183030381529060405280519060200120604051602001612a619291906146ad565b60408051601f1981840301815291905292506001016129c7565b508151602080840191909120604080517f7d1efebd1edb795fc2fef1b96025f39b311dd4c4481a7f726342969d70b423c8938101939093528201526060810185905260800161211a565b60007f0c087e39c84c32f053f4f3e0086d64914296a605bd371cfe0bdca1d506aed4707fe772c71320d83e91a3076e1414875f1affb9dbb84c39717315b34b38b9b4ef8e612b1660208601866140c9565b60405160200161267a9291909182526001600160a01b0316602082015260400190565b600080612b4684846132f1565b60008181526020819052604090209193509150610fa99083906135cf565b80516040516001600160601b031933606090811b821660208401529290921b9091166034820152600090604801612569565b600061254482613618565b600030828585604051602001612bb8929190614625565b60405160208183030381529060405280519060200120604051602001612c0e939291906001600160f81b0319815260609390931b6001600160601b03191660018401526015830191909152603582015260550190565b60408051601f198184030181529190528051602090910120949350505050565b612c366137aa565b60008481526002602052604081205465ffffffffffff16612c6a57604051635f9bd90760e11b815260040160405180910390fd5b426000612c7d60408601602087016145b7565b65ffffffffffff1614158015612cb2575065ffffffffffff8116612ca760408601602087016145b7565b65ffffffffffff1611155b15612cd0576040516308e8b93760e01b815260040160405180910390fd5b6000612cdf60208601866140c9565b90506000612ced8288612478565b805490915065ffffffffffff1615801590612d1657508054600160601b900465ffffffffffff16155b15612d34576040516335d9080560e01b815260040160405180910390fd5b6001600160a01b038216600090815260016020526040902054935083612d7857604051634eb2dcd760e01b81526001600160a01b0383166004820152602401610776565b6000612d97612d906001600160a01b038a1685613651565b8890613689565b90506040518061010001604052808565ffffffffffff168152602001886020016020810190612dc691906145b7565b65ffffffffffff16815260006020820152604001612e21612dea60608b018b614635565b808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152506136d792505050565b63ffffffff168152602001846001600160a01b03168152602001896001600160a01b03168152602001826001600160a01b031681526020018a81525095508560046000856001600160a01b03166001600160a01b0316815260200190815260200160002060008a6001600160a01b03166001600160a01b0316815260200190815260200160002060008201518160000160006101000a81548165ffffffffffff021916908365ffffffffffff16021790555060208201518160000160066101000a81548165ffffffffffff021916908365ffffffffffff160217905550604082015181600001600c6101000a81548165ffffffffffff021916908365ffffffffffff16021790555060608201518160000160126101000a81548163ffffffff021916908363ffffffff16021790555060808201518160010160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555060a08201518160020160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555060c08201518160030160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555060e08201518160040155905050806001600160a01b0316886001600160a01b0316846001600160a01b03167ff68f1df3d74509783e9300e8637b046836c091fd39cdcd33b14b0ffdf6940d628c60405161303391815260200190565b60405180910390a450505050935093915050565b805465ffffffffffff1661306e57604051635f9bd90760e11b815260040160405180910390fd5b8054600160301b90046001600160a01b031680158015906130fb57506040516365b7641360e11b81526001600160a01b0382169063cb6ec826906130b6908690600401613c11565b6020604051808303816000875af11580156130d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906130f9919061433f565b155b1561108257604051635e1d867960e01b815260040160405180910390fd5b80546001600160a01b03168061312e57505050565b6040516367b14e7760e11b81526001600160a01b0382169063cf629cee9061315a908690600401613c11565b6020604051808303816000875af1158015613179573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061319d919061433f565b151560000361108257604051635b0ae41f60e01b815260040160405180910390fd5b60006131cc8260026147fb565b831663ffffffff161515905092915050565b805465ffffffffffff1661320557604051635f9bd90760e11b815260040160405180910390fd5b8054600160301b90046001600160a01b031680158015906130fb5750604051637949978f60e01b81526001600160a01b03821690637949978f906130b690869060040161419b565b80546001600160a01b031680158015906132d357506040516334c85d0760e01b81526001600160a01b038216906334c85d079061328e90869060040161419b565b6020604051808303816000875af11580156132ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906132d1919061433f565b155b1561108257604051635b0ae41f60e01b815260040160405180910390fd5b6132f96137aa565b60008060048161330c60208701876140c9565b6001600160a01b0390811682526020808301939093526040918201600090812089831682528452828120835161010081018552815465ffffffffffff8082168352600160301b8204811683890152600160601b82041695820195909552600160901b90940463ffffffff166060850152600180820154841660808601526002820154841660a0860152600382015490931660c0850152600481015460e0850152929650919350916133bf908701876140c9565b6001600160a01b03908116825260208201929092526040016000205460c0850151909350166134015760405163120a2e7760e01b815260040160405180910390fd5b846001600160a01b03168360a001516001600160a01b03161461343757604051634ca8886760e01b815260040160405180910390fd5b604083015165ffffffffffff16156134625760405163905e710760e01b815260040160405180910390fd5b805465ffffffffffff60601b1916600160601b65ffffffffffff4216021781556001600160a01b03851661349960208601866140c9565b6001600160a01b03167feee7de70b290c411a060d8bb9b1cba152a40d74147fef0974d7c2b25ac9b718a8560e001516040516134d791815260200190565b60405180910390a3509250929050565b80546000906001600160a01b031680613504576001915050612544565b604051636ac403ff60e11b81526001600160a01b0382169063d58807fe90613530908790600401613c11565b6020604051808303816000875af192505050801561356b575060408051601f3d908101601f191682019092526135689181019061433f565b60015b6135b5576040516001600160a01b03821681527fbab8c8262d5baeb21d73c5944504fb6c26d6eb88d29af8653bd3382ad8fe56a99060200160405180910390a16000915050612544565b80156135c657600192505050612544565b505b5092915050565b80546000906001600160a01b0316806135ec576001915050612544565b604051638b6e59ff60e01b81526001600160a01b03821690638b6e59ff9061353090879060040161419b565b805160019060021161364c57815160051b82016020830192505b82516020909301805190931091508083188202613632575b505b919050565b6040516001600160601b0319606084811b8216602084015283901b1660348201524260488201524660688201526000906088016126aa565b60006110ba61369b60408501856145df565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525086925061375f915050565b80516000908180805b83811015613755578581815181106136fa576136fa614312565b60200260200101519150601f821180613718575061371883836131bf565b1561373657604051631092ef5760e11b815260040160405180910390fd5b6137418260026147fb565b61374b9084614807565b92506001016136e0565b5090949350505050565b60008251600181018060401b6bfd61000080600a3d393df3001761ffff821186015283600a8201601587016000f5925050816137a35763301164256000526004601cfd5b9092525090565b6040805161010081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e081019190915290565b60008083601f84011261380057600080fd5b5081356001600160401b0381111561381757600080fd5b60208301915083602082850101111561382f57600080fd5b9250929050565b60008060008060008060008060a0898b03121561385257600080fd5b883597506020890135965060408901356001600160401b038082111561387757600080fd5b6138838c838d016137ee565b909850965060608b013591508082111561389c57600080fd5b6138a88c838d016137ee565b909650945060808b01359150808211156138c157600080fd5b506138ce8b828c016137ee565b999c989b5096995094979396929594505050565b6001600160a01b038116811461113b57600080fd5b60008083601f84011261390957600080fd5b5081356001600160401b0381111561392057600080fd5b6020830191508360208260051b850101111561382f57600080fd5b6000806000806000806080878903121561395457600080fd5b863595506020870135613966816138e2565b945060408701356001600160401b038082111561398257600080fd5b61398e8a838b016138f7565b909650945060608901359150808211156139a757600080fd5b506139b489828a016137ee565b979a9699509497509295939492505050565b600080600080606085870312156139dc57600080fd5b84356139e7816138e2565b935060208501356001600160401b03811115613a0257600080fd5b613a0e878288016138f7565b9598909750949560400135949350505050565b60008060408385031215613a3457600080fd5b823591506020830135613a46816138e2565b809150509250929050565b600080600060408486031215613a6657600080fd5b83356001600160401b03811115613a7c57600080fd5b613a88868287016137ee565b9094509250506020840135613a9c816138e2565b809150509250925092565b60006080828403121561364a57600080fd5b600080600080600060808688031215613ad157600080fd5b853594506020860135613ae3816138e2565b935060408601356001600160401b0380821115613aff57600080fd5b613b0b89838a01613aa7565b94506060880135915080821115613b2157600080fd5b50613b2e888289016137ee565b969995985093965092949392505050565b600080600060408486031215613b5457600080fd5b8335613b5f816138e2565b925060208401356001600160401b03811115613b7a57600080fd5b613b86868287016138f7565b9497909650939450505050565b65ffffffffffff8082511683528060208301511660208401528060408301511660408401525063ffffffff6060820151166060830152608081015160018060a01b0380821660808501528060a08401511660a0850152505060c0810151613c0560c08401826001600160a01b03169052565b5060e090810151910152565b6020808252825182820181905260009190848201906040850190845b81811015613c5457613c40838551613b93565b928401926101009290920191600101613c2d565b50909695505050505050565b600080600080600060808688031215613c7857600080fd5b8535613c83816138e2565b94506020860135935060408601356001600160401b03811115613ca557600080fd5b613cb1888289016138f7565b96999598509660600135949350505050565b60008060208385031215613cd657600080fd5b82356001600160401b03811115613cec57600080fd5b613cf8858286016138f7565b90969095509350505050565b60008060408385031215613d1757600080fd5b8235613d22816138e2565b91506020830135613a46816138e2565b600080600080600060608688031215613d4a57600080fd5b8535613d55816138e2565b945060208601356001600160401b0380821115613d7157600080fd5b613d7d89838a016138f7565b90965094506040880135915080821115613b2157600080fd5b600080600060608486031215613dab57600080fd5b8335613db6816138e2565b92506020840135613dc6816138e2565b929592945050506040919091013590565b60008060408385031215613dea57600080fd5b82356001600160401b03811115613e0057600080fd5b613e0c85828601613aa7565b9250506020830135613a46816138e2565b600080600060408486031215613e3257600080fd5b83356001600160401b03811115613e4857600080fd5b613a88868287016138f7565b60006020828403121561364a57600080fd5b60008060408385031215613e7957600080fd5b613d228484613e54565b600060208284031215613e9557600080fd5b5035919050565b600060208284031215613eae57600080fd5b6110ba8383613e54565b60005b83811015613ed3578181015183820152602001613ebb565b50506000910152565b60008151808452613ef4816020860160208601613eb8565b601f01601f19169290920160200192915050565b60ff60f81b881681526000602060e06020840152613f2960e084018a613edc565b8381036040850152613f3b818a613edc565b606085018990526001600160a01b038816608086015260a0850187905284810360c08601528551808252602080880193509091019060005b81811015613f8f57835183529284019291840191600101613f73565b50909c9b505050505050505050505050565b60008060008060008060808789031215613fba57600080fd5b863595506020870135613fcc816138e2565b945060408701356001600160401b0380821115613fe857600080fd5b61398e8a838b016137ee565b6000806000806060858703121561400a57600080fd5b8435614015816138e2565b93506140248660208701613e54565b925060408501356001600160401b0381111561403f57600080fd5b61404b878288016137ee565b95989497509550505050565b6000806040838503121561406a57600080fd5b8235915060208301356001600160401b0381111561408757600080fd5b61409385828601613aa7565b9150509250929050565b600080604083850312156140b057600080fd5b82356140bb816138e2565b946020939093013593505050565b6000602082840312156140db57600080fd5b81356110ba816138e2565b6020815265ffffffffffff825116602082015260018060a01b036020830151166040820152600060408301516060808401526110f66080840182613edc565b60008060006040848603121561413a57600080fd5b8335925060208401356001600160401b03811115613b7a57600080fd5b8051825260018060a01b03602082015116602083015260006040820151606060408501526110f66060850182613edc565b6020815260006110ba6020830184614157565b61010081016125448284613b93565b6020808252825182820181905260009190848201906040850190845b81811015613c545783516001600160a01b0316835292840192918401916001016141c6565b60008060006040848603121561420057600080fd5b833560ff81168114613b5f57600080fd5b60008060006040848603121561422657600080fd5b8335925060208401356001600160401b0381111561424357600080fd5b613b86868287016137ee565b60008060008060008060008060a0898b03121561426b57600080fd5b8835614276816138e2565b975060208901356001600160401b038082111561429257600080fd5b61429e8c838d016137ee565b909950975060408b01359150808211156142b757600080fd5b6142c38c838d016137ee565b909750955060608b0135945060808b01359150808211156138c157600080fd5b634e487b7160e01b600052601160045260246000fd5b60006001820161430b5761430b6142e3565b5060010190565b634e487b7160e01b600052603260045260246000fd5b600081614337576143376142e3565b506000190190565b60006020828403121561435157600080fd5b815180151581146110ba57600080fd5b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061438b57607f821691505b60208210810361364a57634e487b7160e01b600052602260045260246000fd5b601f821115611082576000816000526020600020601f850160051c810160208610156143d45750805b601f850160051c820191505b81811015611f18578281556001016143e0565b81516001600160401b0381111561440c5761440c614361565b6144208161441a8454614377565b846143ab565b602080601f831160018114614455576000841561443d5750858301515b600019600386901b1c1916600185901b178555611f18565b600085815260208120601f198616915b8281101561448457888601518255948401946001909101908401614465565b50858210156144a25787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b80820180821115612544576125446142e3565b81810381811115612544576125446142e3565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6001600160a01b038416815260406020820181905260009061452690830184866144d8565b95945050505050565b60006020828403121561454157600080fd5b81516110ba816138e2565b6001600160a01b0386811682528516602082015260806040820181905260009061457890830186614157565b828103606084015261458b8185876144d8565b98975050505050505050565b60008235607e198336030181126145ad57600080fd5b9190910192915050565b6000602082840312156145c957600080fd5b813565ffffffffffff811681146110ba57600080fd5b6000808335601e198436030181126145f657600080fd5b8301803591506001600160401b0382111561461057600080fd5b60200191503681900382131561382f57600080fd5b8183823760009101908152919050565b6000808335601e1984360301811261464c57600080fd5b8301803591506001600160401b0382111561466657600080fd5b6020019150600581901b360382131561382f57600080fd5b60008184825b858110156146a2578135835260209283019290910190600101614684565b509095945050505050565b600083516146bf818460208801613eb8565b9190910191825250602001919050565b60006bffffffffffffffffffffffff19808660601b16835284516146fa816014860160208901613eb8565b60609490941b169190920160148101919091526028019392505050565b600181815b80851115614752578160001904821115614738576147386142e3565b8085161561474557918102915b93841c939080029061471c565b509250929050565b60008261476957506001612544565b8161477657506000612544565b816001811461478c5760028114614796576147b2565b6001915050612544565b60ff8411156147a7576147a76142e3565b50506001821b612544565b5060208310610133831016604e8410600b84101617156147d5575081810a612544565b6147df8383614717565b80600019048211156147f3576147f36142e3565b029392505050565b60006110ba838361475a565b63ffffffff8181168382160190808211156135c8576135c86142e356fea2646970667358221220807a0dcf2c6cec2c89009e31067a7ecb222a220b82380e3501b0be4d5c970b7a64736f6c634300081900336080604052348015600f57600080fd5b506101ba8061001f6000396000f3fe60806040526004361061001e5760003560e01c80636c26d54814610023575b600080fd5b6100366100313660046100b4565b610052565b6040516001600160a01b03909116815260200160405180910390f35b6000806020600084516020860134885af19050600051915080610097576040516301b3a38360e21b81526001600160a01b038516600482015260240160405180910390fd5b5092915050565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156100c757600080fd5b82356001600160a01b03811681146100de57600080fd5b9150602083013567ffffffffffffffff808211156100fb57600080fd5b818501915085601f83011261010f57600080fd5b8135818111156101215761012161009e565b604051601f8201601f19908116603f011681019083821181831017156101495761014961009e565b8160405282815288602084870101111561016257600080fd5b826020860160208301376000602084830101528095505050505050925092905056fea264697066735822122082f36f23f015ada9d664f10f5d27ddc7546765cf8fc5e39ce6bf9a4c41ed5a7564736f6c63430008190033";

bytes constant initCode = byteCode;
