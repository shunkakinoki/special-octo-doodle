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

"use client";

import { PlaceholderOrb } from "@lightdotso/elements";
import { useCopy } from "@lightdotso/hooks";
import { useSuspenseQueryWallet } from "@lightdotso/query";
import {
  Avatar,
  Button,
  ButtonIcon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
  toast,
} from "@lightdotso/ui";
import { shortenAddress } from "@lightdotso/utils";
import { useEnsName } from "@lightdotso/wagmi";
import { ChevronDown, Copy } from "lucide-react";
import { useCallback, type FC } from "react";
import type { Address } from "viem";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface WalletOverviewBannerAddressProps {
  address: Address;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const WalletOverviewBannerAddress: FC<
  WalletOverviewBannerAddressProps
> = ({ address }) => {
  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const [, copy] = useCopy();

  // ---------------------------------------------------------------------------
  // Wagmi Hooks
  // ---------------------------------------------------------------------------

  const { data: ens } = useEnsName({
    address: address,
  });

  // ---------------------------------------------------------------------------
  // Callback Hooks
  // ---------------------------------------------------------------------------

  const handleAddressClick = useCallback(() => {
    copy(address);
    toast.success("Copied to clipboard");
  }, [address, copy]);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { wallet } = useSuspenseQueryWallet({ address: address });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <TooltipProvider>
      <Avatar className="size-10 sm:size-12 md:size-16">
        <PlaceholderOrb address={address ?? "0x"} />
      </Avatar>
      <div className="flex items-center space-x-3 overflow-hidden text-ellipsis p-1 text-left text-sm md:text-base">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="unstyled"
              size="unsized"
              className="text-lg font-extrabold tracking-tight md:text-2xl"
              onClick={handleAddressClick}
            >
              {wallet
                ? wallet.name
                : ens ??
                  (typeof address === "string" && shortenAddress(address))}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy Address {shortenAddress(address)}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ButtonIcon variant="outline" size="xs">
              <ChevronDown className="size-3" />
            </ButtonIcon>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleAddressClick}>
                <Copy className="mr-2 size-4" />
                <span>Copy Address</span>
                <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TooltipProvider>
  );
};
