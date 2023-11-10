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

import { Button } from "@lightdotso/ui";
import type { Address } from "viem";
import { splitAddress } from "@lightdotso/utils";
import { useCopy } from "@/hooks/useCopy";
import {
  ClipboardDocumentCheckIcon,
  InboxStackIcon,
} from "@heroicons/react/24/outline";
import { Send, Share } from "lucide-react";
import { useEnsName } from "wagmi";

export function WalletOverviewCard({ address }: { address: Address }) {
  const [isCopied, copy] = useCopy();
  const { data } = useEnsName({
    address: address,
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
      <div className="flex flex-row items-center space-x-5">
        <div className="space-y-5 sm:mx-0 sm:max-w-xl sm:space-y-4">
          <h2 className="flex justify-start overflow-hidden text-ellipsis text-left text-2xl font-extrabold tracking-tight text-contrast-higher sm:text-3xl">
            {data ?? (typeof address === "string" && splitAddress(address))}
          </h2>
          <div className="mx-auto flex flex-row justify-center space-x-3 sm:justify-start">
            <div className="flex rounded-md bg-bg-dark px-3 py-1.5">
              <p className="mr-2 text-base text-contrast-low">
                {splitAddress(address)}
              </p>
              <button
                onClick={() => {
                  return copy(address);
                }}
              >
                {!isCopied ? (
                  <InboxStackIcon className="h-6 w-6 text-contrast-low hover:text-contrast-medium" />
                ) : (
                  <ClipboardDocumentCheckIcon className="h-6 w-6 text-contrast-low hover:text-contrast-medium" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-4 lg:mt-0 lg:shrink-0">
        <Button
          className="mt-6 hidden rounded-full p-3 md:block"
          variant="outline"
        >
          <Share className="h-4 w-4" />
          <span className="sr-only">Open share modal</span>
        </Button>
        <Button
          className="mt-6 hidden rounded-full p-3 md:block"
          variant="outline"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Open send modal</span>
        </Button>
        <Button type="button" className="mt-6" onClick={() => {}}>
          Deposit
        </Button>
      </div>
    </div>
  );
}
