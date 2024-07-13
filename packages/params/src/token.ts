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

import type { Address } from "viem";

// -----------------------------------------------------------------------------
// Params
// -----------------------------------------------------------------------------

export type TokenGetParams = {
  address: Address | null | undefined;
  chain_id: number | null | undefined;
  wallet?: Address | null | undefined;
};

export type TokenListParams = {
  address: Address | null | undefined;
  is_testnet: boolean;
  limit: number;
  offset: number;
  group: boolean;
  chain_ids: number[] | null;
};

export type TokenListCountParams = Omit<
  TokenListParams,
  "group" | "limit" | "offset"
>;
