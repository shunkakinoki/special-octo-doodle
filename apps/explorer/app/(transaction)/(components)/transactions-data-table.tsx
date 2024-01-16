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

import type { WalletSettingsData } from "@lightdotso/data";
import {
  useQueryTransactions,
  useQueryTransactionsCount,
} from "@lightdotso/query";
import { queryKeys } from "@lightdotso/query-keys";
import { transactionColumns } from "@lightdotso/table";
import { TableSectionWrapper } from "@lightdotso/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, type FC } from "react";
import type { Address } from "viem";
import { DataTable } from "@/app/(transaction)/(components)/data-table/data-table";
import { usePaginationQueryState } from "@/queryStates";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface TransactionsDataTableProps {
  address: Address;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const TransactionsDataTable: FC<TransactionsDataTableProps> = ({
  address,
}) => {
  // ---------------------------------------------------------------------------
  // Query State Hooks
  // ---------------------------------------------------------------------------

  const [paginationState] = usePaginationQueryState();

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const offsetCount = useMemo(() => {
    return paginationState.pageSize * paginationState.pageIndex;
  }, [paginationState.pageSize, paginationState.pageIndex]);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = useQueryClient();

  const walletSettings: WalletSettingsData | undefined =
    queryClient.getQueryData(queryKeys.wallet.settings({ address }).queryKey);

  const { transactions } = useQueryTransactions({
    address: address,
    limit: paginationState.pageSize,
    offset: offsetCount,
    is_testnet: walletSettings?.is_enabled_testnet ?? false,
  });

  const { transactionsCount } = useQueryTransactionsCount({
    address: address,
    is_testnet: walletSettings?.is_enabled_testnet ?? false,
  });

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const pageCount = useMemo(() => {
    if (!transactionsCount || !transactionsCount?.count) {
      return null;
    }
    return Math.ceil(transactionsCount.count / paginationState.pageSize);
  }, [transactionsCount, paginationState.pageSize]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <TableSectionWrapper>
      <DataTable
        data={transactions ?? []}
        columns={transactionColumns}
        pageCount={pageCount ?? 0}
      />
    </TableSectionWrapper>
  );
};
