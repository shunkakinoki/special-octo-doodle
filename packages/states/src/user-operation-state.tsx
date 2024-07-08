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

import { useQueryUserOperations } from "@lightdotso/query";
import { useAuth } from "@lightdotso/stores";
import { useEffect, type FC } from "react";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const UserOperationState: FC = () => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { wallet } = useAuth();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const {
    // userOperations: pendingUserOperations,
    // isUserOperationsLoading: isPendingUserOperationsLoading,
    refetchUserOperations: refetchPendingUserOperations,
  } = useQueryUserOperations({
    address: wallet,
    status: "pending",
    order: "desc",
    limit: Number.MAX_SAFE_INTEGER,
    offset: 0,
    is_testnet: true,
  });

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  // Refetch pending user operation every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetchPendingUserOperations();
    }, 30000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return null;
};
