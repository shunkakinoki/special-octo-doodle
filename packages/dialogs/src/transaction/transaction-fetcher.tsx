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

"use client";

import {
  CONTRACT_ADDRESSES,
  ContractAddress,
  LIGHT_WALLET_FACTORY_ENTRYPOINT_MAPPING,
} from "@lightdotso/const";
import { useDebouncedValue } from "@lightdotso/hooks";
import { useEntryPointVersion } from "@lightdotso/hooks/src/useEntryPointVersion";
import {
  useQueryConfiguration,
  useQueryPaymasterGasAndPaymasterAndDataV06,
  useQueryPaymasterGasAndPaymasterAndDataV07,
  useQueryPaymasterOperation,
  useQueryUserOperationEstimateFeesPerGas,
  useQueryUserOperationEstimateGasV06,
  useQueryUserOperationEstimateGasV07,
  useQueryUserOperationNonce,
  useQueryUserOperations,
  useQueryWallet,
} from "@lightdotso/query";
import type { PackedUserOperation, UserOperation } from "@lightdotso/schemas";
import {
  decodeInitCodeToFactoryAndFactoryData,
  decodePaymasterAndData,
  encodeFactoryAndFactoryDataToInitCode,
  encodePackedPaymasterAndData,
} from "@lightdotso/sdk";
import { calculateInitCode } from "@lightdotso/sequence";
import { useFormRef, useUserOperations } from "@lightdotso/stores";
import { findContractAddressByAddress } from "@lightdotso/utils";
import {
  useReadEntryPointv060GetNonce,
  useReadLightWalletImageHash,
} from "@lightdotso/wagmi/generated";
import { useBytecode } from "@lightdotso/wagmi/wagmi";
import { type FC, useEffect, useMemo, useState } from "react";
import { type Address, type Hex, fromHex } from "viem";
import {
  type UserOperation as ViemUserOperation,
  getUserOperationHash,
} from "viem/account-abstraction";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type TransactionFetcherProps = {
  address: Address;
  initialUserOperation: Partial<UserOperation>;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const TransactionFetcher: FC<TransactionFetcherProps> = ({
  address,
  initialUserOperation,
}) => {
  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [userOperationWithHash, setUserOperationWithHash] =
    useState<UserOperation>();
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("userOperationWithHash", userOperationWithHash);

  const [packedUserOperationWithHash, setPackedUserOperationWithHash] =
    useState<PackedUserOperation>();
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("packedUserOperationWithHash", packedUserOperationWithHash);

  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { setIsFormLoading } = useFormRef();
  const {
    setBillingOperationByHash,
    setPartialUserOperationByChainIdAndNonce,
    setUserOperationByChainIdAndNonce,
  } = useUserOperations();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { configuration: genesisConfiguration } = useQueryConfiguration({
    address: address as Address,
    checkpoint: 0,
  });

  const { configuration: currentConfiguration } = useQueryConfiguration({
    address: address as Address,
  });

  const { wallet } = useQueryWallet({
    address: address as Address,
  });

  // ---------------------------------------------------------------------------
  // Wagmi
  // ---------------------------------------------------------------------------

  // Get the image hash for the light wallet
  const { data: imageHash } = useReadLightWalletImageHash({
    address: address as Address,
    chainId: Number(initialUserOperation.chainId),
  });

  // Get the nonce for the entry point
  const { data: entryPointNonce, isFetched: isEntryPointNonceFetched } =
    useReadEntryPointv060GetNonce({
      address:
        LIGHT_WALLET_FACTORY_ENTRYPOINT_MAPPING[
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          findContractAddressByAddress(wallet?.factory_address as Address)!
        ],
      chainId: Number(initialUserOperation.chainId),
      args: [address as Address, 0n],
    });

  // Get the bytecode for the light wallet
  const { data: walletBytecode } = useBytecode({
    address: address as Address,
    chainId: Number(initialUserOperation.chainId),
  });

  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const { isEntryPointV06, isEntryPointV07 } = useEntryPointVersion({
    address: address as Address,
    chainId: Number(initialUserOperation.chainId),
  });

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  // Also, get the wallet billing
  // const { walletBilling, isWalletBillingLoading } = useQueryWalletBilling({
  //   address: address as Address,
  // });

  // Gets the configuration for the chain w/ the image hash

  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  const { configuration } = useQueryConfiguration({
    address: address as Address,
    // biome-ignore lint/style/useNamingConvention: <explanation>
    image_hash: imageHash,
  });

  // Gets the user operation nonce
  const { userOperationNonce, isUserOperationNonceFetched } =
    useQueryUserOperationNonce({
      address: address as Address,
      // biome-ignore lint/style/useNamingConvention: <explanation>
      chain_id: Number(initialUserOperation.chainId),
    });

  // Gets the history of user operations
  const { userOperations: historyUserOperations } = useQueryUserOperations({
    address: address as Address,
    status: "history",
    offset: 0,
    limit: 1,
    order: "asc",
    // biome-ignore lint/style/useNamingConvention: <explanation>
    is_testnet: true,
    // biome-ignore lint/style/useNamingConvention: <explanation>
    chain_id: Number(initialUserOperation.chainId) as number,
  });

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  /// This is the initial boolean to check if the initial fetch is done
  /// The `entryPointNonce` and `userOperationNonce` are required to compute the `updatedMinimumNonce`
  const isInitialFetched = useMemo(() => {
    return isEntryPointNonceFetched && isUserOperationNonceFetched;
  }, [isEntryPointNonceFetched, isUserOperationNonceFetched]);

  // Turns the partial userOperation into an userOperation w/ default values
  // Should not change from the initial user operation
  const targetUserOperation: Partial<
    Omit<UserOperation, "hash" | "paymasterAndData" | "signature">
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
  > = useMemo(() => {
    // Get the minimum nonce from the user operation nonce and the partial user operation
    const updatedMinimumNonce =
      entryPointNonce !== undefined
        ? BigInt(entryPointNonce)
        : userOperationNonce?.nonce !== undefined
          ? BigInt(userOperationNonce?.nonce)
          : undefined;

    // Get the init code from the executed user operations or the partial user operation
    const updatedInitCode =
      ((historyUserOperations && historyUserOperations?.length === 0) ||
        typeof walletBytecode === "undefined") &&
      wallet?.factory_address &&
      genesisConfiguration?.image_hash &&
      wallet?.salt
        ? calculateInitCode(
            wallet?.factory_address as Address,
            // Compute w/ the genesis configuration image hash
            genesisConfiguration?.image_hash as Hex,
            wallet?.salt as Hex,
          )
        : (initialUserOperation.initCode ?? "0x");

    // If the initial user operation nonce is provided, make sure it is same or greater
    // In the case that it is not, update the nonce to the minimum nonce
    const updatedNonce =
      typeof initialUserOperation.nonce === "undefined" ||
      (initialUserOperation.nonce !== undefined &&
        updatedMinimumNonce !== undefined &&
        initialUserOperation.nonce < updatedMinimumNonce)
        ? updatedMinimumNonce
        : updatedInitCode !== "0x"
          ? BigInt(0)
          : initialUserOperation.nonce;

    // Allow the callData to be empty if the init code is provided
    // This is to allow for the creation of a new contract
    const updatedCallData =
      typeof initialUserOperation.callData === "undefined" &&
      updatedInitCode !== undefined
        ? "0x"
        : initialUserOperation.callData;

    // Return the user operation
    return {
      sender: initialUserOperation?.sender ?? address,
      chainId: initialUserOperation?.chainId ?? undefined,
      // Init code should be computed automatically
      initCode: updatedInitCode ?? "0x",
      nonce: updatedNonce ?? undefined,
      callData: updatedCallData ?? undefined,
      callGasLimit: initialUserOperation?.callGasLimit ?? undefined,
      verificationGasLimit:
        initialUserOperation?.verificationGasLimit ?? undefined,
      preVerificationGas: initialUserOperation?.preVerificationGas ?? undefined,
      maxFeePerGas: initialUserOperation?.maxFeePerGas ?? undefined,
      maxPriorityFeePerGas:
        initialUserOperation?.maxPriorityFeePerGas ?? undefined,
    };
  }, [
    // The wallet is required to compute the init code
    wallet,
    // The genesis configuration is static
    genesisConfiguration,
    // Should recompute if the bytecode changes
    walletBytecode,
    // Should recompute if the executed user operations change, for init code
    historyUserOperations,
    // Should recompute if the entry point nonce changes
    entryPointNonce,
    // Should recompute if the user operation nonce changes
    userOperationNonce?.nonce,
  ]);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("targetUserOperation", targetUserOperation);

  // Decode the init code to factory and factory data
  const { factory, factoryData } = useMemo(() => {
    return decodeInitCodeToFactoryAndFactoryData(
      targetUserOperation?.initCode as Hex,
    );
  }, [targetUserOperation?.initCode]);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  // Get the gas estimate for the user operation
  const {
    maxFeePerGas,
    maxPriorityFeePerGas,
    isUserOperationEstimateFeesPerGasLoading,
  } = useQueryUserOperationEstimateFeesPerGas({
    address: address as Address,
    chainId: Number(targetUserOperation?.chainId),
    callData: targetUserOperation?.callData as Hex,
  });
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("maxFeePerGas", maxFeePerGas);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("maxPriorityFeePerGas", maxPriorityFeePerGas);

  // Gets the gas estimate for the user operation
  const {
    callGasLimitV06,
    preVerificationGasV06,
    verificationGasLimitV06,
    isEstimateUserOperationGasDataLoadingV06,
  } = useQueryUserOperationEstimateGasV06(
    {
      sender: address as Address,
      chainId: targetUserOperation?.chainId,
      nonce: targetUserOperation?.nonce,
      initCode: targetUserOperation?.initCode,
      callData: targetUserOperation?.callData,
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: maxPriorityFeePerGas,
    },
    isEntryPointV06,
  );

  // Get the gas estimate for the user operation v07
  const {
    callGasLimitV07,
    preVerificationGasV07,
    verificationGasLimitV07,
    paymasterVerificationGasLimitV07,
    isEstimateUserOperationGasDataLoadingV07,
  } = useQueryUserOperationEstimateGasV07(
    {
      sender: address as Address,
      chainId: targetUserOperation?.chainId,
      nonce: targetUserOperation?.nonce,
      factory: factory ?? "0x",
      factoryData: factoryData ?? "0x",
      callData: targetUserOperation?.callData,
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: maxPriorityFeePerGas,
    },
    true,
    isEntryPointV07,
  );

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const callGasLimit = useMemo(() => {
    return isEntryPointV06
      ? callGasLimitV06
      : isEntryPointV07
        ? callGasLimitV07
        : null;
  }, [isEntryPointV06, isEntryPointV07, callGasLimitV06, callGasLimitV07]);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("callGasLimit", callGasLimit);

  const preVerificationGas = useMemo(() => {
    return isEntryPointV06
      ? preVerificationGasV06
      : isEntryPointV07
        ? preVerificationGasV07
        : null;
  }, [
    isEntryPointV06,
    isEntryPointV07,
    preVerificationGasV06,
    preVerificationGasV07,
  ]);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("preVerificationGas", preVerificationGas);

  const verificationGasLimit = useMemo(() => {
    return isEntryPointV06
      ? verificationGasLimitV06
      : isEntryPointV07
        ? verificationGasLimitV07
        : null;
  }, [
    isEntryPointV06,
    isEntryPointV07,
    verificationGasLimitV06,
    verificationGasLimitV07,
  ]);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("verificationGasLimit", verificationGasLimit);

  const paymasterVerificationGasLimit = useMemo(() => {
    return isEntryPointV07 ? paymasterVerificationGasLimitV07 : null;
  }, [isEntryPointV07, paymasterVerificationGasLimitV07]);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("paymasterVerificationGasLimit", paymasterVerificationGasLimit);

  // Construct the updated user operation
  // This is the final layer of computation until getting the hash for paymaster and data
  const updatedUserOperation: Omit<
    UserOperation,
    "hash" | "signature" | "paymasterAndData"
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  > | null = useMemo(() => {
    if (!isEntryPointV06) {
      return null;
    }

    if (
      !(
        targetUserOperation?.sender &&
        targetUserOperation?.chainId &&
        targetUserOperation?.initCode
      ) ||
      typeof targetUserOperation?.nonce === "undefined" ||
      targetUserOperation?.nonce === null ||
      !targetUserOperation?.callData ||
      !maxFeePerGas ||
      !maxPriorityFeePerGas ||
      typeof callGasLimit === "undefined" ||
      callGasLimit === null ||
      !preVerificationGas ||
      !verificationGasLimit
    ) {
      return null;
    }

    // Bump the verification gas limit depending on the configuration threshold
    const updatedVerificationGasLimit =
      currentConfiguration?.threshold && verificationGasLimit
        ? verificationGasLimit * BigInt(currentConfiguration?.threshold)
        : verificationGasLimit;

    // Bump the pre-verification gas limit to handle lesser used chains
    const updatedPreVerificationGas = preVerificationGas
      ? (preVerificationGas * BigInt(120)) / BigInt(100)
      : preVerificationGas;

    return {
      sender: targetUserOperation?.sender,
      chainId: targetUserOperation?.chainId,
      initCode: targetUserOperation?.initCode,
      nonce: targetUserOperation?.nonce,
      callData: targetUserOperation?.callData,
      callGasLimit: callGasLimit,
      preVerificationGas: updatedPreVerificationGas,
      verificationGasLimit: updatedVerificationGasLimit,
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: maxPriorityFeePerGas,
    };
  }, [
    // Only gas limits and fees are required to compute the gas limits
    // The rest of the values are dependencies of the gas limits
    // As it is the final layer of computation
    maxFeePerGas,
    maxPriorityFeePerGas,
    callGasLimit,
    preVerificationGas,
    verificationGasLimit,
  ]);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("updatedUserOperation", updatedUserOperation);

  // Construct the packed user operation
  const updatedPackedUserOperation: Omit<
    PackedUserOperation,
    | "hash"
    | "signature"
    | "paymaster"
    // | "paymasterVerificationGasLimit"
    | "paymasterPostOpGasLimit"
    | "paymasterData"
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  > | null = useMemo(() => {
    if (!isEntryPointV07) {
      return null;
    }

    if (
      !(
        targetUserOperation?.sender &&
        targetUserOperation?.chainId &&
        targetUserOperation?.initCode
      ) ||
      typeof targetUserOperation?.nonce === "undefined" ||
      targetUserOperation?.nonce === null ||
      !targetUserOperation?.callData ||
      !maxFeePerGas ||
      !maxPriorityFeePerGas ||
      typeof callGasLimit === "undefined" ||
      callGasLimit === null ||
      !preVerificationGas ||
      !verificationGasLimit
    ) {
      return null;
    }

    // Bump the verification gas limit depending on the configuration threshold
    const updatedVerificationGasLimit =
      currentConfiguration?.threshold && verificationGasLimit
        ? verificationGasLimit * BigInt(currentConfiguration?.threshold)
        : verificationGasLimit;

    // Bump the pre-verification gas limit to handle lesser used chains
    const updatedPreVerificationGas = preVerificationGas
      ? (preVerificationGas * BigInt(120)) / BigInt(100)
      : preVerificationGas;

    // Decode the init code to factory and factory data
    const { factory, factoryData } = decodeInitCodeToFactoryAndFactoryData(
      targetUserOperation?.initCode as Hex,
    );

    return {
      sender: targetUserOperation?.sender,
      chainId: targetUserOperation?.chainId,
      nonce: targetUserOperation?.nonce,
      factory: factory ?? "0x",
      factoryData: factoryData ?? "0x",
      callData: targetUserOperation?.callData,
      callGasLimit: callGasLimit,
      preVerificationGas: updatedPreVerificationGas,
      verificationGasLimit: updatedVerificationGasLimit,
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      paymasterVerificationGasLimit: paymasterVerificationGasLimit ?? 0n,
    };
  }, [
    maxFeePerGas,
    maxPriorityFeePerGas,
    callGasLimit,
    preVerificationGas,
    verificationGasLimit,
    paymasterVerificationGasLimit,
  ]);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("updatedPackedUserOperation", updatedPackedUserOperation);

  // ---------------------------------------------------------------------------
  // Debounce
  // ---------------------------------------------------------------------------

  const [debouncedUserOperation, isDebouncingUserOperation] = useDebouncedValue(
    updatedUserOperation,
    300,
  );
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("debouncedUserOperation", debouncedUserOperation);

  const [debouncedPackedUserOperation, isDebouncingPackedUserOperation] =
    useDebouncedValue(updatedPackedUserOperation, 300);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("debouncedPackedUserOperation", debouncedPackedUserOperation);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  // Get the paymaster and data from the target user operation
  const {
    paymasterAndDataV06,
    gasAndPaymasterAndDataV06,
    callGasLimitV06: gasAndPaymasterCallGasLimitV06,
    preVerificationGasV06: gasAndPaymasterPreVerificationGasV06,
    verificationGasLimitV06: gasAndPaymasterVerificationGasLimitV06,
    isGasAndPaymasterAndDataLoadingV06,
  } = useQueryPaymasterGasAndPaymasterAndDataV06(
    {
      sender: address as Address,
      chainId: debouncedUserOperation?.chainId,
      nonce: debouncedUserOperation?.nonce,
      initCode: debouncedUserOperation?.initCode,
      callData: debouncedUserOperation?.callData,
      callGasLimit: debouncedUserOperation?.callGasLimit,
      preVerificationGas: debouncedUserOperation?.preVerificationGas,
      verificationGasLimit: debouncedUserOperation?.verificationGasLimit,
      maxFeePerGas: debouncedUserOperation?.maxFeePerGas,
      maxPriorityFeePerGas: debouncedUserOperation?.maxPriorityFeePerGas,
    },
    isEntryPointV06,
  );
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("gasAndPaymasterAndDataV06", gasAndPaymasterAndDataV06);

  // Get the paymaster and data from the target user operation v07
  const {
    gasAndPaymasterAndDataV07,
    callGasLimitV07: gasAndPaymasterCallGasLimitV07,
    preVerificationGasV07: gasAndPaymasterPreVerificationGasV07,
    verificationGasLimitV07: gasAndPaymasterVerificationGasLimitV07,
    paymasterV07: gasAndPaymasterPaymasterV07,
    paymasterVerificationGasLimitV07:
      gasAndPaymasterPaymasterVerificationGasLimitV07,
    paymasterPostOpGasLimitV07: gasAndPaymasterPostOpGasLimitV07,
    paymasterDataV07: gasAndPaymasterPaymasterDataV07,
    isGasAndPaymasterAndDataLoadingV07,
  } = useQueryPaymasterGasAndPaymasterAndDataV07(
    {
      sender: address as Address,
      chainId: debouncedPackedUserOperation?.chainId,
      nonce: debouncedPackedUserOperation?.nonce,
      factory: debouncedPackedUserOperation?.factory,
      factoryData: debouncedPackedUserOperation?.factoryData,
      callData: debouncedPackedUserOperation?.callData,
      callGasLimit: debouncedPackedUserOperation?.callGasLimit,
      preVerificationGas: debouncedPackedUserOperation?.preVerificationGas,
      verificationGasLimit: debouncedPackedUserOperation?.verificationGasLimit,
      maxFeePerGas: debouncedPackedUserOperation?.maxFeePerGas,
      maxPriorityFeePerGas: debouncedPackedUserOperation?.maxPriorityFeePerGas,
      paymasterVerificationGasLimit:
        debouncedPackedUserOperation?.paymasterVerificationGasLimit,
    },
    isEntryPointV07,
  );
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("gasAndPaymasterAndDataV07", gasAndPaymasterAndDataV07);

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  // Construct the updated user operation
  const finalizedUserOperation: Omit<
    UserOperation,
    "hash" | "signature"
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  > | null = useMemo(() => {
    if (!isEntryPointV06) {
      return null;
    }

    if (
      // biome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
      !debouncedUserOperation?.sender ||
      !debouncedUserOperation?.chainId ||
      typeof debouncedUserOperation?.nonce === "undefined" ||
      debouncedUserOperation?.nonce === null ||
      !debouncedUserOperation?.callData ||
      !debouncedUserOperation?.maxFeePerGas ||
      !debouncedUserOperation?.maxPriorityFeePerGas ||
      typeof debouncedUserOperation?.callGasLimit === "undefined" ||
      debouncedUserOperation?.callGasLimit === null ||
      !debouncedUserOperation?.preVerificationGas ||
      !debouncedUserOperation?.verificationGasLimit
    ) {
      return null;
    }

    return {
      sender: debouncedUserOperation?.sender,
      chainId: debouncedUserOperation?.chainId,
      nonce: debouncedUserOperation?.nonce,
      initCode: debouncedUserOperation?.initCode,
      callData: debouncedUserOperation?.callData,
      callGasLimit:
        gasAndPaymasterCallGasLimitV06 ?? debouncedUserOperation?.callGasLimit,
      preVerificationGas:
        gasAndPaymasterPreVerificationGasV06 ??
        debouncedUserOperation?.preVerificationGas,
      verificationGasLimit:
        gasAndPaymasterVerificationGasLimitV06 ??
        debouncedUserOperation?.verificationGasLimit,
      maxFeePerGas: debouncedUserOperation?.maxFeePerGas,
      maxPriorityFeePerGas: debouncedUserOperation?.maxPriorityFeePerGas,
      paymasterAndData: paymasterAndDataV06 ?? "0x",
    };
  }, [
    // Entry point version
    isEntryPointV06,
    // Debounced values
    debouncedUserOperation,
    debouncedUserOperation?.sender,
    debouncedUserOperation?.chainId,
    debouncedUserOperation?.nonce,
    debouncedUserOperation?.initCode,
    debouncedUserOperation?.callData,
    debouncedUserOperation?.callGasLimit,
    debouncedUserOperation?.verificationGasLimit,
    debouncedUserOperation?.preVerificationGas,
    debouncedUserOperation?.maxFeePerGas,
    debouncedUserOperation?.maxPriorityFeePerGas,
    // Gas and paymaster values
    gasAndPaymasterAndDataV06,
    gasAndPaymasterCallGasLimitV06,
    gasAndPaymasterPreVerificationGasV06,
    gasAndPaymasterVerificationGasLimitV06,
    paymasterAndDataV06,
  ]);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("finalizedUserOperation", finalizedUserOperation);

  // Construct the finalized packed user operation
  const finalizedPackedUserOperation: Omit<
    PackedUserOperation,
    "hash" | "signature"
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  > | null = useMemo(() => {
    if (!isEntryPointV07) {
      return null;
    }

    if (
      // biome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
      !debouncedPackedUserOperation?.sender ||
      !debouncedPackedUserOperation?.chainId ||
      typeof debouncedPackedUserOperation?.nonce === "undefined" ||
      debouncedPackedUserOperation?.nonce === null ||
      !debouncedPackedUserOperation?.callData ||
      typeof debouncedUserOperation?.callGasLimit === "undefined" ||
      debouncedUserOperation?.callGasLimit === null ||
      !debouncedPackedUserOperation?.preVerificationGas ||
      !debouncedPackedUserOperation?.verificationGasLimit ||
      !debouncedPackedUserOperation?.maxFeePerGas ||
      !debouncedPackedUserOperation?.maxPriorityFeePerGas
    ) {
      return null;
    }

    return {
      sender: debouncedPackedUserOperation?.sender,
      chainId: debouncedPackedUserOperation?.chainId,
      nonce: debouncedPackedUserOperation?.nonce,
      factory: debouncedPackedUserOperation?.factory ?? undefined,
      factoryData: debouncedPackedUserOperation?.factoryData ?? undefined,
      callData: debouncedPackedUserOperation?.callData,
      callGasLimit:
        gasAndPaymasterCallGasLimitV07 ??
        debouncedPackedUserOperation?.callGasLimit,
      preVerificationGas:
        gasAndPaymasterPreVerificationGasV07 ??
        debouncedPackedUserOperation?.preVerificationGas,
      verificationGasLimit:
        gasAndPaymasterVerificationGasLimitV07 ??
        debouncedPackedUserOperation?.verificationGasLimit,
      maxFeePerGas: debouncedPackedUserOperation?.maxFeePerGas,
      maxPriorityFeePerGas: debouncedPackedUserOperation?.maxPriorityFeePerGas,
      paymaster: gasAndPaymasterPaymasterV07 ?? undefined,
      paymasterVerificationGasLimit:
        gasAndPaymasterPaymasterVerificationGasLimitV07 ?? undefined,
      paymasterPostOpGasLimit: gasAndPaymasterPostOpGasLimitV07 ?? undefined,
      paymasterData: gasAndPaymasterPaymasterDataV07 ?? undefined,
    };
  }, [
    // Entry point version
    isEntryPointV07,
    // Debounced values
    debouncedPackedUserOperation,
    debouncedUserOperation?.sender,
    debouncedUserOperation?.chainId,
    debouncedUserOperation?.nonce,
    debouncedUserOperation?.initCode,
    debouncedUserOperation?.callData,
    debouncedUserOperation?.callGasLimit,
    debouncedUserOperation?.verificationGasLimit,
    debouncedUserOperation?.preVerificationGas,
    debouncedUserOperation?.maxFeePerGas,
    debouncedUserOperation?.maxPriorityFeePerGas,
    // Gas and paymaster values
    gasAndPaymasterPaymasterDataV07,
    gasAndPaymasterCallGasLimitV07,
    gasAndPaymasterPreVerificationGasV07,
    gasAndPaymasterVerificationGasLimitV07,
    gasAndPaymasterPaymasterV07,
    gasAndPaymasterPaymasterVerificationGasLimitV07,
    gasAndPaymasterPostOpGasLimitV07,
    gasAndPaymasterPaymasterDataV07,
  ]);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("finalizedPackedUserOperation", finalizedPackedUserOperation);

  // Decode the paymaster and data
  const decodedPaymasterAndData = useMemo(() => {
    if (
      finalizedUserOperation?.paymasterAndData &&
      finalizedUserOperation?.paymasterAndData !== "0x"
    ) {
      return decodePaymasterAndData(
        fromHex(finalizedUserOperation?.paymasterAndData as Hex, "bytes"),
      ).unwrapOr(null);
    }
  }, [finalizedUserOperation?.paymasterAndData]);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("decodedPaymasterAndData", decodedPaymasterAndData);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  // Decode the paymaster operation
  const { paymasterOperation } = useQueryPaymasterOperation({
    address: decodedPaymasterAndData ? decodedPaymasterAndData[0] : undefined,
    // biome-ignore lint/style/useNamingConvention: <explanation>
    chain_id: finalizedUserOperation?.chainId
      ? Number(finalizedUserOperation?.chainId)
      : undefined,
    // biome-ignore lint/style/useNamingConvention: <explanation>
    valid_until: decodedPaymasterAndData ? decodedPaymasterAndData[1] : 0,
    // biome-ignore lint/style/useNamingConvention: <explanation>
    valid_after: decodedPaymasterAndData ? decodedPaymasterAndData[2] : 0,
  });
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("paymasterOperation", paymasterOperation);

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchHashAndUpdateOperation = async () => {
      if (!(finalizedUserOperation && isEntryPointV06)) {
        return;
      }

      // Don't update the user operation if the below required fields are empty
      // `callGasLimit` can potentially be 0n if the user operation is a factory user operation
      if (
        finalizedUserOperation.verificationGasLimit === 0n ||
        finalizedUserOperation.preVerificationGas === 0n ||
        finalizedUserOperation.maxFeePerGas === 0n ||
        finalizedUserOperation.maxPriorityFeePerGas === 0n
      ) {
        return;
      }

      // Add the dummy signature to get the hash for the user operation
      const userOperation = {
        ...finalizedUserOperation,
        signature: "0x",
      };

      // Get the hash for the user operation w/ the corresponding entry point
      const hash = await getUserOperationHash({
        userOperation: userOperation as ViemUserOperation<"0.6">,
        chainId: Number(finalizedUserOperation.chainId) as number,
        entryPointAddress:
          CONTRACT_ADDRESSES[ContractAddress.ENTRYPOINT_V060_ADDRESS],
        entryPointVersion: "0.6",
      });
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.info("v0.6 getUserOperationHash: ", hash);

      // Don't update the user operation if the hash is same as the previous one
      if (hash === userOperationWithHash?.hash) {
        return;
      }

      // Update the user operation hash state for computation
      setUserOperationWithHash({
        ...userOperation,
        hash: hash,
      });
    };

    // Run the async function
    fetchHashAndUpdateOperation();
  }, [
    // Sole dependency is the updated user operation w/ paymaster and data values
    finalizedUserOperation,
  ]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchHashAndUpdatePackedOperation = async () => {
      if (!(finalizedPackedUserOperation && isEntryPointV07)) {
        return;
      }

      // Don't update the user operation if the below required fields are empty
      // `callGasLimit` can potentially be 0n if the user operation is a factory user operation
      if (
        finalizedPackedUserOperation.verificationGasLimit === 0n ||
        finalizedPackedUserOperation.preVerificationGas === 0n ||
        finalizedPackedUserOperation.maxFeePerGas === 0n ||
        finalizedPackedUserOperation.maxPriorityFeePerGas === 0n
      ) {
        return;
      }

      // Add the dummy signature to get the hash for the user operation
      const packedUserOperation = {
        ...finalizedPackedUserOperation,
        signature: "0x",
      };

      // Get the hash for the user operation w/ the corresponding entry point
      const hash = await getUserOperationHash({
        userOperation: packedUserOperation as ViemUserOperation<"0.7">,
        chainId: Number(finalizedPackedUserOperation.chainId) as number,
        entryPointAddress:
          CONTRACT_ADDRESSES[ContractAddress.ENTRYPOINT_V070_ADDRESS],
        entryPointVersion: "0.7",
      });
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.info("v0.7 getUserOperationHash: ", hash);

      // Don't update the user operation if the hash is same as the previous one
      if (hash === packedUserOperationWithHash?.hash) {
        return;
      }

      // Update the user operation hash state for computation
      setPackedUserOperationWithHash({
        ...packedUserOperation,
        hash: hash,
      });
    };

    // Run the async function
    fetchHashAndUpdatePackedOperation();
  }, [
    // Sole dependency is the updated user operation w/ paymaster and data values
    finalizedPackedUserOperation,
  ]);

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const isTransactionFetcherLoading = useMemo(() => {
    return (
      isDebouncingUserOperation ||
      isDebouncingPackedUserOperation ||
      isUserOperationEstimateFeesPerGasLoading ||
      isEstimateUserOperationGasDataLoadingV06 ||
      isEstimateUserOperationGasDataLoadingV07 ||
      isGasAndPaymasterAndDataLoadingV06 ||
      isGasAndPaymasterAndDataLoadingV07
    );
  }, [
    isDebouncingUserOperation,
    isDebouncingPackedUserOperation,
    isUserOperationEstimateFeesPerGasLoading,
    isEstimateUserOperationGasDataLoadingV06,
    isEstimateUserOperationGasDataLoadingV07,
    isGasAndPaymasterAndDataLoadingV06,
    isGasAndPaymasterAndDataLoadingV07,
  ]);
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.info("isTransactionFetcherLoading", isTransactionFetcherLoading);

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsFormLoading(isTransactionFetcherLoading);
  }, [isTransactionFetcherLoading]);

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  // Sync `targetUserOperation` to the store
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (
      !(isInitialFetched && targetUserOperation?.chainId) ||
      typeof targetUserOperation?.nonce === "undefined" ||
      targetUserOperation?.nonce === null
    ) {
      return;
    }
    setPartialUserOperationByChainIdAndNonce(
      targetUserOperation?.chainId,
      targetUserOperation?.nonce,
      targetUserOperation,
    );
  }, [
    targetUserOperation?.chainId,
    setUserOperationByChainIdAndNonce,
    targetUserOperation,
  ]);

  // Sync `debouncedUserOperation` to the store
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (
      !debouncedUserOperation?.chainId ||
      typeof debouncedUserOperation?.nonce === "undefined" ||
      debouncedUserOperation?.nonce === null
    ) {
      return;
    }

    setPartialUserOperationByChainIdAndNonce(
      debouncedUserOperation?.chainId,
      debouncedUserOperation?.nonce,
      debouncedUserOperation,
    );
  }, [
    debouncedUserOperation?.chainId,
    setUserOperationByChainIdAndNonce,
    debouncedUserOperation,
  ]);

  // Sync `debouncedPackedUserOperation` to the store
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (
      !debouncedPackedUserOperation?.chainId ||
      typeof debouncedPackedUserOperation?.nonce === "undefined" ||
      debouncedPackedUserOperation?.nonce === null
    ) {
      return;
    }

    const initCode = encodeFactoryAndFactoryDataToInitCode(
      debouncedPackedUserOperation?.factory as Hex,
      debouncedPackedUserOperation?.factoryData as Hex,
    );

    // Set the partial user operation to the store
    setPartialUserOperationByChainIdAndNonce(
      debouncedPackedUserOperation?.chainId,
      debouncedPackedUserOperation?.nonce,
      {
        sender: debouncedPackedUserOperation?.sender,
        chainId: debouncedPackedUserOperation?.chainId,
        initCode: initCode,
        nonce: debouncedPackedUserOperation?.nonce,
        callData: debouncedPackedUserOperation?.callData,
        maxFeePerGas: debouncedPackedUserOperation?.maxFeePerGas,
        maxPriorityFeePerGas:
          debouncedPackedUserOperation?.maxPriorityFeePerGas,
        callGasLimit: debouncedPackedUserOperation?.callGasLimit,
        verificationGasLimit:
          debouncedPackedUserOperation?.verificationGasLimit,
        preVerificationGas: debouncedPackedUserOperation?.preVerificationGas,
      },
    );
  }, [
    debouncedPackedUserOperation?.chainId,
    setUserOperationByChainIdAndNonce,
    debouncedPackedUserOperation,
  ]);

  // Sync `userOperationWithHash` to the store
  useEffect(() => {
    if (!userOperationWithHash) {
      return;
    }

    // Set the user operation to the store
    setUserOperationByChainIdAndNonce(
      userOperationWithHash?.chainId,
      userOperationWithHash?.nonce,
      userOperationWithHash,
    );
  }, [
    userOperationWithHash?.chainId,
    setUserOperationByChainIdAndNonce,
    userOperationWithHash,
  ]);

  // Sync `packedUserOperationWithHash` to the store
  useEffect(() => {
    if (!packedUserOperationWithHash) {
      return;
    }

    // Encode the factory and factory data to init code
    const initCode = encodeFactoryAndFactoryDataToInitCode(
      packedUserOperationWithHash?.factory as Hex,
      packedUserOperationWithHash?.factoryData as Hex,
    );

    // Encode the paymaster and data to the packed paymaster and data
    const paymasterAndData = encodePackedPaymasterAndData(
      packedUserOperationWithHash?.paymaster as Hex,
      packedUserOperationWithHash?.paymasterVerificationGasLimit as bigint,
      packedUserOperationWithHash?.paymasterPostOpGasLimit as bigint,
      packedUserOperationWithHash?.paymasterData as Hex,
    );

    // Set the packed user operation to the store
    setUserOperationByChainIdAndNonce(
      packedUserOperationWithHash?.chainId,
      packedUserOperationWithHash?.nonce,
      {
        hash: packedUserOperationWithHash?.hash,
        chainId: packedUserOperationWithHash?.chainId,
        sender: packedUserOperationWithHash?.sender,
        nonce: packedUserOperationWithHash?.nonce,
        initCode: initCode,
        callData: packedUserOperationWithHash?.callData,
        maxFeePerGas: packedUserOperationWithHash?.maxFeePerGas,
        maxPriorityFeePerGas: packedUserOperationWithHash?.maxPriorityFeePerGas,
        callGasLimit: packedUserOperationWithHash?.callGasLimit,
        verificationGasLimit: packedUserOperationWithHash?.verificationGasLimit,
        preVerificationGas: packedUserOperationWithHash?.preVerificationGas,
        paymasterAndData: paymasterAndData,
        signature: packedUserOperationWithHash?.signature,
      },
    );
  }, [
    packedUserOperationWithHash?.chainId,
    setUserOperationByChainIdAndNonce,
    packedUserOperationWithHash,
  ]);

  // Sync `userOperationWithHash` to the `billingOperation` store
  useEffect(() => {
    if (userOperationWithHash?.hash && paymasterOperation?.billing_operation) {
      setBillingOperationByHash(
        userOperationWithHash?.hash as Hex,
        paymasterOperation?.billing_operation,
      );
    }
  }, [
    paymasterOperation?.billing_operation,
    userOperationWithHash?.hash,
    setBillingOperationByHash,
  ]);

  // Sync `packedUserOperationWithHash` to the `billingOperation` store
  useEffect(() => {
    if (
      packedUserOperationWithHash?.hash &&
      paymasterOperation?.billing_operation
    ) {
      setBillingOperationByHash(
        packedUserOperationWithHash?.hash as Hex,
        paymasterOperation?.billing_operation,
      );
    }
  }, [
    paymasterOperation?.billing_operation,
    packedUserOperationWithHash?.hash,
    setBillingOperationByHash,
  ]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return null;
};
