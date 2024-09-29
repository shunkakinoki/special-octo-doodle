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

//@ts-expect-error
import { LightVault } from "@/contracts/LightVault.sol";
import { expect, test } from "vitest";

test("LightVault: Correct humanReadableAbi", () => {
  expect(Object.values(LightVault.humanReadableAbi)).toMatchInlineSnapshot(`
    [
      "constructor()",
      "error AddressEmptyCode(address target)",
      "error AddressInsufficientBalance(address account)",
      "error ECDSAInvalidSignature()",
      "error ECDSAInvalidSignatureLength(uint256 length)",
      "error ECDSAInvalidSignatureS(bytes32 s)",
      "error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed)",
      "error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed)",
      "error ERC20InvalidApprover(address approver)",
      "error ERC20InvalidReceiver(address receiver)",
      "error ERC20InvalidSender(address sender)",
      "error ERC20InvalidSpender(address spender)",
      "error ERC2612ExpiredSignature(uint256 deadline)",
      "error ERC2612InvalidSigner(address signer, address owner)",
      "error ERC4626ExceededMaxDeposit(address receiver, uint256 assets, uint256 max)",
      "error ERC4626ExceededMaxMint(address receiver, uint256 shares, uint256 max)",
      "error ERC4626ExceededMaxRedeem(address owner, uint256 shares, uint256 max)",
      "error ERC4626ExceededMaxWithdraw(address owner, uint256 assets, uint256 max)",
      "error ERC7540CantRequestDepositOnBehalfOf()",
      "error EnforcedPause()",
      "error ExceededMaxDepositRequest(address receiver, uint256 assets, uint256 maxDeposit)",
      "error ExceededMaxRedeemRequest(address receiver, uint256 shares, uint256 maxShares)",
      "error ExpectedPause()",
      "error FailedInnerCall()",
      "error FeesTooHigh()",
      "error InvalidAccountNonce(address account, uint256 currentNonce)",
      "error InvalidInitialization()",
      "error InvalidTreasury()",
      "error MathOverflowedMulDiv()",
      "error MaxDrawdownReached()",
      "error NoClaimAvailable(address owner)",
      "error NotInitializing()",
      "error OwnableInvalidOwner(address owner)",
      "error OwnableUnauthorizedAccount(address account)",
      "error PermitFailed()",
      "error ReceiverFailed()",
      "error SafeERC20FailedOperation(address token)",
      "error VaultIsClosed()",
      "error VaultIsEmpty()",
      "error VaultIsOpen()",
      "event Approval(address indexed owner, address indexed spender, uint256 value)",
      "event ClaimDeposit(uint256 indexed requestId, address indexed owner, address indexed receiver, uint256 assets, uint256 shares)",
      "event ClaimRedeem(uint256 indexed requestId, address indexed owner, address indexed receiver, uint256 assets, uint256 shares)",
      "event DecreaseDepositRequest(uint256 indexed requestId, address indexed owner, uint256 indexed previousRequestedAssets, uint256 newRequestedAssets)",
      "event DecreaseRedeemRequest(uint256 indexed requestId, address indexed owner, uint256 indexed previousRequestedShares, uint256 newRequestedShares)",
      "event Deposit(address indexed sender, address indexed owner, uint256 assets, uint256 shares)",
      "event DepositRequest(address indexed receiver, address indexed owner, uint256 indexed requestId, address sender, uint256 assets)",
      "event EIP712DomainChanged()",
      "event EpochEnd(uint256 indexed timestamp, uint256 lastSavedBalance, uint256 returnedAssets, uint256 fees, uint256 totalShares)",
      "event EpochStart(uint256 indexed timestamp, uint256 lastSavedBalance, uint256 totalShares)",
      "event FeesChanged(uint16 oldFees, uint16 newFees)",
      "event Initialized(uint64 version)",
      "event OwnershipTransferStarted(address indexed previousOwner, address indexed newOwner)",
      "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
      "event Paused(address account)",
      "event RedeemRequest(address indexed receiver, address indexed owner, uint256 indexed requestId, address sender, uint256 shares)",
      "event Transfer(address indexed from, address indexed to, uint256 value)",
      "event Unpaused(address account)",
      "event Withdraw(address indexed sender, address indexed receiver, address indexed owner, uint256 assets, uint256 shares)",
      "function DOMAIN_SEPARATOR() view returns (bytes32)",
      "function NAME() view returns (string)",
      "function VERSION() view returns (string)",
      "function acceptOwnership()",
      "function allowance(address owner, address spender) view returns (uint256)",
      "function approve(address spender, uint256 value) returns (bool)",
      "function asset() view returns (address)",
      "function balanceOf(address account) view returns (uint256)",
      "function claimDeposit(address receiver) returns (uint256 shares)",
      "function claimRedeem(address receiver) returns (uint256 assets)",
      "function claimableDepositBalanceInAsset(address owner) view returns (uint256)",
      "function claimableDepositRequest(address owner) view returns (uint256 assets)",
      "function claimableRedeemRequest(address owner) view returns (uint256)",
      "function claimableSilo() view returns (address)",
      "function close()",
      "function convertToAssets(uint256 shares) view returns (uint256)",
      "function convertToAssets(uint256 shares, uint256 _epochId) view returns (uint256)",
      "function convertToShares(uint256 assets) view returns (uint256)",
      "function convertToShares(uint256 assets, uint256 _epochId) view returns (uint256)",
      "function decimals() view returns (uint8)",
      "function decreaseDepositRequest(uint256 assets)",
      "function decreaseRedeemRequest(uint256 shares)",
      "function deposit(uint256 assets, address receiver) returns (uint256)",
      "function depositWithPermit(uint256 assets, address receiver, (uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) permitParams) returns (uint256)",
      "function eip712Domain() view returns (bytes1 fields, string name, string version, uint256 chainId, address verifyingContract, bytes32 salt, uint256[] extensions)",
      "function epochId() view returns (uint256)",
      "function epochs(uint256 epochId) view returns (uint256 totalSupplySnapshot, uint256 totalAssetsSnapshot)",
      "function feesInBps() view returns (uint16)",
      "function initialize(uint16 fees, address owner, address underlying, uint256 bootstrapAmount, string name, string symbol)",
      "function initialize(uint16 fees, address owner, address _treasury, address underlying, uint256 bootstrapAmount, string name, string symbol)",
      "function lastDepositRequestId(address user) view returns (uint256 epochId)",
      "function lastRedeemRequestId(address user) view returns (uint256 epochId)",
      "function lastSavedBalance() view returns (uint256)",
      "function maxDeposit(address) view returns (uint256)",
      "function maxDepositRequest(address) view returns (uint256)",
      "function maxMint(address) view returns (uint256)",
      "function maxRedeem(address owner) view returns (uint256)",
      "function maxRedeemRequest(address owner) view returns (uint256)",
      "function maxWithdraw(address owner) view returns (uint256)",
      "function mint(uint256 shares, address receiver) returns (uint256)",
      "function name() view returns (string)",
      "function nonces(address owner) view returns (uint256)",
      "function open(uint256 assetReturned)",
      "function owner() view returns (address)",
      "function pause()",
      "function paused() view returns (bool)",
      "function pendingDepositRequest(address owner) view returns (uint256 assets)",
      "function pendingOwner() view returns (address)",
      "function pendingRedeemRequest(address owner) view returns (uint256)",
      "function pendingSilo() view returns (address)",
      "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)",
      "function previewClaimDeposit(address owner) view returns (uint256)",
      "function previewClaimRedeem(address owner) view returns (uint256)",
      "function previewDeposit(uint256 assets) view returns (uint256)",
      "function previewMint(uint256 shares) view returns (uint256)",
      "function previewRedeem(uint256 shares) view returns (uint256)",
      "function previewSettle(uint256 newSavedBalance) view returns (uint256 assetsToOwner, uint256 assetsToVault, uint256 expectedAssetFromOwner, (uint256 lastSavedBalance, uint256 fees, uint256 pendingRedeem, uint256 sharesToMint, uint256 pendingDeposit, uint256 assetsToWithdraw, uint256 totalAssetsSnapshot, uint256 totalSupplySnapshot) settleValues)",
      "function previewWithdraw(uint256 assets) view returns (uint256)",
      "function redeem(uint256 shares, address receiver, address owner) returns (uint256)",
      "function renounceOwnership()",
      "function requestDeposit(uint256 assets, address receiver, address owner, bytes data)",
      "function requestDepositWithPermit(uint256 assets, address receiver, bytes data, (uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) permitParams)",
      "function requestRedeem(uint256 shares, address receiver, address owner, bytes data)",
      "function setFee(uint16 newFee)",
      "function setMaxDrawdown(uint16 newMaxDrawdown)",
      "function setTreasury(address _treasury)",
      "function settle(uint256 newSavedBalance)",
      "function sharesBalanceInAsset(address owner) view returns (uint256)",
      "function supportsInterface(bytes4 interfaceId) pure returns (bool)",
      "function symbol() view returns (string)",
      "function totalAssets() view returns (uint256)",
      "function totalClaimableAssets() view returns (uint256)",
      "function totalClaimableShares() view returns (uint256)",
      "function totalPendingDeposits() view returns (uint256)",
      "function totalPendingRedeems() view returns (uint256)",
      "function totalSupply() view returns (uint256)",
      "function transfer(address to, uint256 value) returns (bool)",
      "function transferFrom(address from, address to, uint256 value) returns (bool)",
      "function transferOwnership(address newOwner)",
      "function treasury() view returns (address)",
      "function unpause()",
      "function vaultIsOpen() view returns (bool)",
      "function withdraw(uint256 assets, address receiver, address owner) returns (uint256)",
    ]
  `);
});