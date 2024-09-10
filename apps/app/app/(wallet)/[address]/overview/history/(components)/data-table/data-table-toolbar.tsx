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

import type { TransactionData } from "@lightdotso/data";
import { usePaginationQueryState } from "@lightdotso/nuqs";
import {
  useQueryTransactions,
  useQueryWalletSettings,
} from "@lightdotso/query";
import { useAuth, useTables } from "@lightdotso/stores";
import {
  DataTableFacetedFilter,
  DataTableViewOptions,
} from "@lightdotso/templates/data-table";
import { Button } from "@lightdotso/ui/components/button";
import { getChainNameWithChainId } from "@lightdotso/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import type { Address } from "viem";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface DataTableToolbarProps {
  table: Table<TransactionData>;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function DataTableToolbar({ table }: DataTableToolbarProps) {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { wallet } = useAuth();
  const { transactionColumnFilters } = useTables();

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

  const { walletSettings } = useQueryWalletSettings({
    address: wallet as Address,
  });

  const { transactions } = useQueryTransactions({
    address: wallet as Address,
    limit: paginationState.pageSize,
    offset: offsetCount,
    // biome-ignore lint/style/useNamingConvention: <explanation>
    is_testnet: walletSettings?.is_enabled_testnet ?? false,
  });

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const uniqueChainValues = useMemo(() => {
    // Get all unique weight values from current data
    const uniqueChainValues = new Set<number>();
    // biome-ignore lint/complexity/noForEach: <explanation>
    transactions?.forEach((transaction) => {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      uniqueChainValues.add(transaction.chain_id!);
    });
    return uniqueChainValues;
  }, [transactions]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (
    !table ||
    typeof table.getColumn !== "function" ||
    typeof table.resetColumnFilters !== "function"
  ) {
    return null;
  }

  return (
    <>
      <div className="flex flex-1 items-center space-x-2">
        {table?.getColumn("chain_id") && (
          <DataTableFacetedFilter
            column={table?.getColumn("chain_id")}
            title="Chain"
            options={Array.from(uniqueChainValues).map((chain) => ({
              value: chain.toString(),
              label: getChainNameWithChainId(chain),
            }))}
          />
        )}
        {transactionColumnFilters.length > 0 && (
          <Button
            variant="outline"
            className="h-8 px-2 lg:px-3"
            onClick={() => table?.resetColumnFilters()}
          >
            Reset
            <Cross2Icon className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions
        table={table}
        columnMapping={{
          // biome-ignore lint/style/useNamingConvention: <explanation>
          chain_id: "Chain",
          hash: "Tx Hash",
          timestamp: "Timestamp",
        }}
      />
    </>
  );
}
