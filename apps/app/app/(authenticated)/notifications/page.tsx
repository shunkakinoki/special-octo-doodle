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
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { NotificationsDataTable } from "@/app/(authenticated)/notifications/(components)/notifications-data-table";
import { NotificationsDataTablePagination } from "@/app/(authenticated)/notifications/(components)/notifications-data-table-pagination";
import { NotificationsDataTableToolbar } from "@/app/(authenticated)/notifications/(components)/notifications-data-table-toolbar";
import { handler } from "@/handlers/paths/notifications/handler";
import { preloader } from "@/preloaders/paths/notifications/preloader";
import type { Address } from "viem";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PageProps = {
  searchParams: {
    pagination?: string;
  };
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ searchParams }: PageProps) {
  // ---------------------------------------------------------------------------
  // Preloaders
  // ---------------------------------------------------------------------------

  preloader(searchParams);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const { paginationState, user, notifications, notificationsCount } =
    await handler(searchParams);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = getQueryClient();

  queryClient.setQueryData(
    queryKeys.notification.list({
      address: user.id === "" ? null : (user.address as Address),
      limit: paginationState.pageSize,
      offset: paginationState.pageIndex * paginationState.pageSize,
      user_id: null,
    }).queryKey,
    notifications,
  );
  queryClient.setQueryData(
    queryKeys.notification.listCount({
      address: user.id === "" ? null : (user.address as Address),
      user_id: null,
    }).queryKey,
    notificationsCount,
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotificationsDataTableToolbar />
      <NotificationsDataTable />
      <NotificationsDataTablePagination />
    </HydrationBoundary>
  );
}
