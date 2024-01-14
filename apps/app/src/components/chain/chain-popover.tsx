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

import { CHAINS, MAINNET_CHAINS } from "@lightdotso/const";
import { useSuspenseQueryWalletSettings } from "@lightdotso/query";
import { useAuth } from "@lightdotso/stores";
import { ChainLogo } from "@lightdotso/svg";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
} from "@lightdotso/ui";
import { ArrowUpRight, Globe } from "lucide-react";
import { useMemo, useState } from "react";
import type { FC } from "react";
import type { Address } from "viem";
import { useIsMounted } from "@/hooks";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const ChainPopover: FC = () => {
  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const isMounted = useIsMounted();

  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [open, setOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { wallet } = useAuth();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { walletSettings } = useSuspenseQueryWalletSettings({
    address: wallet as Address,
  });

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const chains = useMemo(() => {
    return walletSettings?.is_enabled_testnet ? CHAINS : MAINNET_CHAINS;
  }, [walletSettings?.is_enabled_testnet]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // If the address is empty, return null
  if (!isMounted || !wallet) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="h-9 px-2 py-1"
          size="unsized"
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          <Globe className="mr-1 h-4 w-4 shrink-0" />
          <div className="flex -space-x-1.5 overflow-hidden">
            {chains.slice(0, 3).map(chain => (
              <ChainLogo
                key={chain.id}
                chainId={chain.id}
                className="h-6 w-6 rounded-lg bg-border"
              />
            ))}
            <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-border bg-background-strongest text-xs text-text">
              {chains.length > 3 ? `+${chains.length - 3}` : null}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search chain..." />
          <CommandEmpty>No chain found.</CommandEmpty>
          <CommandGroup>
            {chains.map(chain => (
              <a
                key={chain.id}
                target="_blank"
                rel="noreferrer"
                href={`${chain?.blockExplorers?.default.url}/address/${wallet}`}
              >
                <CommandItem
                  className="flex items-center space-x-2"
                  value={chain.name.toString()}
                >
                  <ChainLogo chainId={chain.id} className="h-5 w-5" />
                  <span>{chain.name}</span>
                  <ArrowUpRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </CommandItem>
              </a>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
