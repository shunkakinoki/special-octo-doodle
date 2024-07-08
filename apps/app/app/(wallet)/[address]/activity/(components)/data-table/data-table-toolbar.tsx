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

import type { ActivityData } from "@lightdotso/data";
import { usePaginationQueryState } from "@lightdotso/nuqs";
import { useQueryActivities } from "@lightdotso/query";
import { useAuth, useTables } from "@lightdotso/stores";
import {
  DataTableFacetedFilter,
  DataTableViewOptions,
} from "@lightdotso/templates";
import { Button, ToolbarSectionWrapper } from "@lightdotso/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import type { Address } from "viem";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface DataTableToolbarProps {
  table: Table<ActivityData>;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function DataTableToolbar({ table }: DataTableToolbarProps) {
  const { wallet } = useAuth();
  const { activityColumnFilters } = useTables();

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

  const { activities } = useQueryActivities({
    address: wallet as Address,
    offset: offsetCount,
    limit: paginationState.pageSize,
  });

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const uniqueEntityValues = useMemo(() => {
    // Get all unique weight values from current data
    const uniqueEntityValues = new Set<string>();
    activities?.forEach(activity => {
      uniqueEntityValues.add(activity.entity);
    });
    return uniqueEntityValues;
  }, [activities]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (table.options.data.length === 0) {
    return null;
  }

  return (
    <ToolbarSectionWrapper>
      <div className="flex flex-1 items-center space-x-2">
        {table?.getColumn("entity") && (
          <DataTableFacetedFilter
            column={table?.getColumn("entity")}
            title="Entity"
            options={Array.from(uniqueEntityValues).map(entity => ({
              value: entity,
              label: `${entity
                .split("_")
                .map(
                  word =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
                )
                .join(" ")}`,
            }))}
          />
        )}
        {activityColumnFilters.length > 0 && (
          <Button
            variant="outline"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <Cross2Icon className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions
        table={table}
        columnMapping={{
          entity: "Entity",
          operation: "Operation",
          timestamp: "Timestamp",
        }}
      />
    </ToolbarSectionWrapper>
  );
}
