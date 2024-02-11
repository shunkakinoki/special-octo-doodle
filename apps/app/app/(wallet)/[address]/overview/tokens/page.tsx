/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
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

import { queryKeys } from "@lightdotso/query-keys";
import { getQueryClient } from "@lightdotso/services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Address } from "viem";
import { TokensDataTable } from "@/app/(wallet)/[address]/overview/tokens/(components)/tokens-data-table";
import { TokensDataTablePagination } from "@/app/(wallet)/[address]/overview/tokens/(components)/tokens-data-table-pagination";
import { PortfolioSection } from "@/components/section/portfolio-section";
import { TokenPortfolio } from "@/components/token/token-portfolio";
import { handler } from "@/handlers/paths/[address]/overview/tokens/handler";
import { preloader } from "@/preloaders/paths/[address]/overview/tokens/preloader";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface PageProps {
  params: { address: Address };
  searchParams: {
    pagination?: string;
  };
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params, searchParams }: PageProps) {
  // ---------------------------------------------------------------------------
  // Preloaders
  // ---------------------------------------------------------------------------

  preloader(params, searchParams);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const { paginationState, walletSettings, tokens, tokensCount, portfolio } =
    await handler(params, searchParams);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = getQueryClient();

  queryClient.setQueryData(
    queryKeys.wallet.settings({ address: params.address as Address }).queryKey,
    walletSettings,
  );
  queryClient.setQueryData(
    queryKeys.portfolio.get({ address: params.address as Address }).queryKey,
    portfolio,
  );
  queryClient.setQueryData(
    queryKeys.token.list({
      address: params.address as Address,
      limit: paginationState.pageSize,
      offset: paginationState.pageIndex * paginationState.pageSize,
      is_testnet: walletSettings?.is_enabled_testnet,
      group: true,
      chain_ids: null,
    }).queryKey,
    tokens,
  );
  queryClient.setQueryData(
    queryKeys.token.listCount({
      address: params.address as Address,
      is_testnet: walletSettings?.is_enabled_testnet,
      chain_ids: null,
    }).queryKey,
    tokensCount,
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PortfolioSection title="Total Token Value">
        <TokenPortfolio address={params.address as Address} />
      </PortfolioSection>
      <TokensDataTable address={params.address as Address} />
      <TokensDataTablePagination />
    </HydrationBoundary>
  );
}
