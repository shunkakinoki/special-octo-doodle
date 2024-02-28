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

"use client";

import { useQueryConfiguration } from "@lightdotso/query";
// import { useMutationConfigurationOperationCreate } from "@lightdotso/query";
// import { hashSetImageHash, subdigestOf } from "@lightdotso/sequence";
import { useAuth } from "@lightdotso/stores";
import { useSignMessage } from "@lightdotso/wagmi";
import { useCallback, useEffect, useMemo } from "react";
import type { Address, Hex } from "viem";
import {
  isAddressEqual,
  toBytes,
  // hexToBytes,
  // // fromHex,
  // decodeFunctionData,
} from "viem";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ConfigurationOperationCreateProps = {
  address: Address;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const useConfigurationOperationCreate = ({
  address,
}: ConfigurationOperationCreateProps) => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { address: userAddress } = useAuth();
  // const { setPageIndex } = useModalSwiper();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { configuration } = useQueryConfiguration({
    address,
  });

  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  // const [isUserOperationLoading, setIsUserOperationLoading] = useState(false);
  // const [signedData, setSignedData] = useState<Hex>();

  // ---------------------------------------------------------------------------
  // Local Variables
  // ---------------------------------------------------------------------------

  const subdigest = useMemo(() => {
    // return subdigestOf(
    //   address,
    //   hashSetImageHash(
    //     calculateImageHash()
    //   )
    // );
    return "0x";
  }, [address]);

  // ---------------------------------------------------------------------------
  // Wagmi
  // ---------------------------------------------------------------------------

  const { data, signMessage, isPending: isSignLoading } = useSignMessage();

  // const { data: paymasterNonce } = useReadLightVerifyingPaymasterSenderNonce({
  //   address: userOperation.paymasterAndData.slice(0, 42) as Address,
  //   chainId: Number(userOperation.chainId),
  //   args: [userOperation.sender as Address],
  // });

  // const { data: paymasterHash } = useReadLightVerifyingPaymasterGetHash({
  //   address: userOperation.paymasterAndData.slice(0, 42) as Address,
  //   chainId: Number(userOperation.chainId),
  //   args: [
  //     {
  //       sender: userOperation.sender as Address,
  //       nonce: userOperation.nonce,
  //       initCode: userOperation.initCode as Hex,
  //       callData: userOperation.callData as Hex,
  //       callGasLimit: userOperation.callGasLimit,
  //       verificationGasLimit: userOperation.verificationGasLimit,
  //       preVerificationGas: userOperation.preVerificationGas,
  //       maxFeePerGas: userOperation.maxFeePerGas,
  //       maxPriorityFeePerGas: userOperation.maxPriorityFeePerGas,
  //       paymasterAndData: userOperation.paymasterAndData as Hex,
  //       signature: toHex(new Uint8Array([2])),
  //     },
  //     fromHex(`0x${userOperation.paymasterAndData.slice(154, 162)}`, "number"),
  //     fromHex(`0x${userOperation.paymasterAndData.slice(162, 170)}`, "number"),
  //   ],
  // });

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const owner = useMemo(() => {
    if (!userAddress) {
      return;
    }

    return configuration?.owners?.find(owner =>
      isAddressEqual(owner.address as Address, userAddress),
    );
  }, [configuration?.owners, userAddress]);

  // const decodedInitCode = useMemo(() => {
  //   // If the initCode is `0x`, return
  //   if (
  //     !userOperation?.callData ||
  //     !userOperation?.initCode ||
  //     userOperation?.initCode === "0x"
  //   ) {
  //     return;
  //   }

  //   // Parse the initCode of the userOperation
  //   return decodeFunctionData({
  //     abi: lightWalletFactoryAbi,
  //     data: `0x${userOperation?.initCode.slice(42)}` as Hex,
  //   }).args;
  // }, [userOperation?.initCode, userOperation?.callData]);

  // const decodedCallData = useMemo(() => {
  //   // If the callData is `0x`, return
  //   if (!userOperation?.callData || userOperation?.callData === "0x") {
  //     return;
  //   }

  //   // Parse the callData of tha args depending on the args type
  //   switch (userOperation?.callData.slice(0, 10)) {
  //     // If the function selector is `execute` or `executeBatch`
  //     case "0xb61d27f6":
  //     case "0x47e1da2a":
  //       return decodeFunctionData({
  //         abi: lightWalletAbi,
  //         data: userOperation?.callData as Hex,
  //       }).args;
  //     default:
  //       return userOperation?.callData;
  //   }
  // }, [userOperation?.callData]);

  // const isValidUserOperation = useMemo(() => {
  //   return !!(
  //     typeof owner !== "undefined" &&
  //     userOperation &&
  //     userOperation.chainId &&
  //     userOperation.hash &&
  //     userOperation.nonce !== undefined &&
  //     userOperation.nonce !== null &&
  //     userOperation.initCode &&
  //     userOperation.sender &&
  //     userOperation.callData &&
  //     userOperation.callGasLimit &&
  //     userOperation.verificationGasLimit &&
  //     userOperation.preVerificationGas &&
  //     userOperation.maxFeePerGas &&
  //     userOperation.maxPriorityFeePerGas &&
  //     userOperation.paymasterAndData
  //   );
  // }, [owner, userOperation]);

  // ---------------------------------------------------------------------------
  // Callback Hooks
  // ---------------------------------------------------------------------------

  const signConfigurationOperation = useCallback(() => {
    if (!subdigest) {
      return;
    }

    signMessage({ message: { raw: toBytes(subdigest) } });
  }, [subdigest, signMessage]);

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  // // Sync the loading state
  // useEffect(() => {
  //   setIsUserOperationLoading(isSignLoading);
  // }, [isSignLoading]);

  // // Sync the signed data
  // useEffect(() => {
  //   if (!data) {
  //     return;
  //   }

  //   setSignedData(data);
  // }, [data]);

  // useEffect(() => {
  //   const createUserOp = async () => {
  //     if (!owner || !signedData || !userOperation) {
  //       return;
  //     }

  //     configurationOperationCreate({
  //       ownerId: owner.id,
  //       signedData: signedData as Hex,
  //       userOperation: userOperation,
  //     });

  //     setSignedData(undefined);
  //   };

  //   createUserOp();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [signedData, owner, userOperation, configuration?.threshold, address]);

  // // ---------------------------------------------------------------------------
  // // Memoized Hooks
  // // ---------------------------------------------------------------------------

  const isConfigurationOperationCreatable = useMemo(() => {
    return typeof owner !== "undefined";
  }, [owner]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return {
    isConfigurationOperationCreatable,
    // isUserOperationLoading,
    // isValidUserOperation,
    // decodedCallData,
    // decodedInitCode,
    // // paymasterHash,
    // // paymasterNonce,
    signConfigurationOperation,
    // subdigest,
    owner,
    threshold: configuration?.threshold,
  };
};
