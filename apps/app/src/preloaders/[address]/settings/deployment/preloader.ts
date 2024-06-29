// Copyright 2023-2024 Light.
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

import {
  preloadGetUserOperations,
  preloadGetUserOperationsCount,
} from "@lightdotso/services";
import type { Address } from "viem";
import { preloader as addressPreloader } from "@/preloaders/[address]/preloader";

// -----------------------------------------------------------------------------
// Preloader
// -----------------------------------------------------------------------------

export const preloader = async (params: { address: string }) => {
  // ---------------------------------------------------------------------------
  // Preload
  // ---------------------------------------------------------------------------

  addressPreloader(params);
  preloadGetUserOperations({
    address: params.address as Address,
    offset: 0,
    limit: Number.MAX_SAFE_INTEGER,
    order: "asc",
    status: "history",
    is_testnet: false,
  });
  preloadGetUserOperationsCount({
    address: params.address as Address,
    status: "history",
    is_testnet: false,
  });
};
