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

import { SIMPLEHASH_MAX_COUNT } from "@lightdotso/const";
import { queryKeys } from "@lightdotso/query-keys";
import { getQueryClient } from "@lightdotso/services";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Address } from "viem";
import { handler } from "@/handlers/[address]/swap/handler";
import { preloader } from "@/preloaders/[address]/swap/preloader";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PageProps = {
  params: { address: string };
  searchParams: {
    transfers?: string;
  };
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params, searchParams }: PageProps) {
  // ---------------------------------------------------------------------------
  // Preloaders
  // ---------------------------------------------------------------------------

  preloader(params);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const { tokens, nfts, walletSettings } = await handler(params, searchParams);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = getQueryClient();

  queryClient.setQueryData(
    queryKeys.wallet.settings({ address: params.address as Address }).queryKey,
    walletSettings,
  );

  queryClient.setQueryData(
    queryKeys.token.list({
      address: params.address as Address,
      limit: Number.MAX_SAFE_INTEGER,
      offset: 0,
      is_testnet: walletSettings?.is_enabled_testnet,
      group: false,
      chain_ids: null,
    }).queryKey,
    tokens,
  );

  queryClient.setQueryData(
    queryKeys.nft.list({
      address: params.address as Address,
      is_testnet: walletSettings?.is_enabled_testnet,
      limit: SIMPLEHASH_MAX_COUNT,
      cursor: null,
    }).queryKey,
    nfts,
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="h-40" />
    </HydrationBoundary>
  );
}
