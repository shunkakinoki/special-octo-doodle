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

import { useModal } from "connectkit";
import { useCallback, useMemo } from "react";
import { useAuth, useModals } from "@/stores";

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

export const useAuthModal = () => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { address, sessionId } = useAuth();

  // ---------------------------------------------------------------------------
  // ConnectKit
  // ---------------------------------------------------------------------------

  const { openProfile } = useModal();
  const { showAuthModal } = useModals();

  // ---------------------------------------------------------------------------
  // Callback Hooks
  // ---------------------------------------------------------------------------

  const openAuthModal = useCallback(() => {
    if (!address) {
      openProfile();
    } else if (typeof sessionId !== "string") {
      showAuthModal();
    }
  }, [address, openProfile, sessionId, showAuthModal]);

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const isAuthValid = useMemo(() => {
    return typeof sessionId === "string" && !!address;
  }, [sessionId, address]);

  return { isAuthValid, openAuthModal };
};
