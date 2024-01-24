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

import { CHAINS } from "@lightdotso/const";
import type { State } from "@lightdotso/wagmi";
import { WagmiProvider } from "@lightdotso/wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { useTheme } from "next-themes";
import { useState, type ReactNode, useEffect, useMemo } from "react";
import { projectId, wagmiConfig } from "@/components/web3/wagmi";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

function Web3Provider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [web3Modal, setWeb3Modal] = useState<any | null>(null);

  // ---------------------------------------------------------------------------
  // Operation Hooks
  // ---------------------------------------------------------------------------

  const { theme } = useTheme();

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const modal = useMemo(() => {
    const modal = createWeb3Modal({
      // @ts-expect-error
      chains: CHAINS,
      wagmiConfig,
      projectId,
      themeMode: theme === "light" ? "light" : "dark",
    });
    return modal;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------------------------------------------------------
  // Web3Modal
  // ---------------------------------------------------------------------------

  useEffect(() => {
    setWeb3Modal(modal);
  }, [modal]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!web3Modal) {
    return null;
  }

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      {children}
    </WagmiProvider>
  );
}

export { Web3Provider };
