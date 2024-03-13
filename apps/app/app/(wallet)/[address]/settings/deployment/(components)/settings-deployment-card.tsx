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

import {
  PROXY_IMPLEMENTAION_VERSION_MAPPING,
  WALLET_FACTORY_ENTRYPOINT_MAPPING,
} from "@lightdotso/const";
import { userOperationsParser } from "@lightdotso/nuqs";
import {
  useQueryUserOperations,
  useQueryWallet,
  useQueryWalletSettings,
} from "@lightdotso/query";
import { calculateInitCode } from "@lightdotso/sequence";
import { Button } from "@lightdotso/ui";
import {
  findContractAddressByAddress,
  getEtherscanUrl,
} from "@lightdotso/utils";
import { useStorageAt } from "@lightdotso/wagmi";
import Link from "next/link";
import { useMemo, type FC } from "react";
import { getAddress, type Address, type Chain, type Hex } from "viem";
import { SettingsCard } from "@/components/settings/settings-card";
import { TITLES } from "@/const";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type SettingsDeploymentCardProps = {
  address: Address;
  chain: string;
  image_hash: Hex;
  salt: Hex;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const SettingsDeploymentCard: FC<SettingsDeploymentCardProps> = ({
  address,
  chain: chain_JSON,
  image_hash,
  salt,
}) => {
  // ---------------------------------------------------------------------------
  // Parse
  // ---------------------------------------------------------------------------

  const chain = JSON.parse(chain_JSON) as Chain;

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { wallet } = useQueryWallet({
    address,
  });

  const { walletSettings } = useQueryWalletSettings({
    address,
  });

  const { userOperations } = useQueryUserOperations({
    address,
    status: "history",
    order: "asc",
    offset: 0,
    limit: Number.MAX_SAFE_INTEGER,
    is_testnet: walletSettings?.is_enabled_testnet ?? false,
  });

  // ---------------------------------------------------------------------------
  // Wagmi
  // ---------------------------------------------------------------------------

  const { data: implAddressBytes32, isSuccess: isImplAddressBytes32Success } =
    useStorageAt({
      address: address,
      chainId: chain.id,
      // The logic address as defined in the 1967 EIP
      // From: https://eips.ethereum.org/EIPS/eip-1967
      slot: "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc",
    });

  // ---------------------------------------------------------------------------
  // Local Variables
  // ---------------------------------------------------------------------------

  // Try to extract a matching operation w/ the current chain id
  const deployed_op = userOperations?.find(op => op.chain_id === chain.id);

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const implAddress = useMemo(() => {
    // Don't continue if the impl address is not available or the call failed
    if (!implAddressBytes32 || !isImplAddressBytes32Success) {
      return;
    }

    // Don't continue if the impl address is not the correct length
    if (implAddressBytes32.length !== 66) {
      return;
    }

    // Convert the bytes32 impl address to an address
    return getAddress(`0x${implAddressBytes32.slice(26)}`);
  }, [implAddressBytes32, isImplAddressBytes32Success]);

  const implVersion = useMemo(() => {
    if (!implAddress) {
      return;
    }

    // Get the version of the implementation
    return (
      PROXY_IMPLEMENTAION_VERSION_MAPPING[implAddress as Address] ?? "Unknown"
    );
  }, [implAddress]);

  const initCode = useMemo(() => {
    if (!wallet) {
      return;
    }
    return calculateInitCode(
      WALLET_FACTORY_ENTRYPOINT_MAPPING[
        findContractAddressByAddress(wallet.factory_address as Address)!
      ],
      image_hash,
      salt,
    );
  }, [image_hash, salt, wallet]);

  // ---------------------------------------------------------------------------
  // Submit Button
  // ---------------------------------------------------------------------------

  const SettingsDeploymentCardSubmitButton: FC = () => {
    return (
      <Button
        type="submit"
        form="settings-deployment-card-form"
        disabled={typeof deployed_op !== "undefined"}
      >
        <Link
          href={`/${address}/create?userOperations=${userOperationsParser.serialize([{ chainId: BigInt(chain.id), initCode: initCode }])}`}
        >
          {typeof deployed_op !== "undefined" ? "Already Deployed" : "Deploy"}
        </Link>
      </Button>
    );
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <SettingsCard
      title={chain.name}
      subtitle={
        TITLES.WalletSettings.subcategories["Deployment"].subcategories["Chain"]
          .description
      }
      footerContent={<SettingsDeploymentCardSubmitButton />}
    >
      {implAddress}
      {implVersion}
      {deployed_op && (
        <Button asChild variant="link">
          <a
            target="_blank"
            rel="noreferrer"
            href={`${getEtherscanUrl(chain)}/tx/${deployed_op.transaction?.hash}`}
          >
            {deployed_op.transaction?.hash}
          </a>
        </Button>
      )}
      {!deployed_op && (
        <p className="text-sm text-text-weak">
          No deployment found. <br />
        </p>
      )}
    </SettingsCard>
  );
};
