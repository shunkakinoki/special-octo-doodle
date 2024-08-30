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

import { handler } from "@/handlers/[address]/settings/handler";
import { preloader } from "@/preloaders/[address]/settings/preloader";
import { queryKeys } from "@lightdotso/query-keys";
import { getQueryClient } from "@lightdotso/services";
import { SettingsSectionWrapper } from "@lightdotso/ui/wrappers";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import type { Address } from "viem";

// -----------------------------------------------------------------------------
// Dynamic
// -----------------------------------------------------------------------------

const SettingsNameCard = dynamic(
  () =>
    import(
      "@/app/(wallet)/[address]/settings/(components)/settings-name-card"
    ).then((mod) => mod.SettingsNameCard),
  {
    ssr: false,
  },
);

const SettingsDevCard = dynamic(
  () =>
    import(
      "@/app/(wallet)/[address]/settings/(components)/settings-dev-card"
    ).then((mod) => mod.SettingsDevCard),
  {
    ssr: false,
  },
);

const SettingsTestnetCard = dynamic(
  () =>
    import(
      "@/app/(wallet)/[address]/settings/(components)/settings-testnet-card"
    ).then((mod) => mod.SettingsTestnetCard),
  {
    ssr: false,
  },
);

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PageProps = {
  params: { address: string };
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params }: PageProps) {
  // ---------------------------------------------------------------------------
  // Preloaders
  // ---------------------------------------------------------------------------

  preloader(params);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const { walletSettings } = await handler(params);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = getQueryClient();

  queryClient.setQueryData(
    queryKeys.wallet.settings({ address: params.address as Address }).queryKey,
    walletSettings,
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingsSectionWrapper>
        <SettingsNameCard address={params.address as Address} />
        <SettingsDevCard address={params.address as Address} />
        <SettingsTestnetCard address={params.address as Address} />
      </SettingsSectionWrapper>
    </HydrationBoundary>
  );
}
