// Copyright 2023-2024 Light, Inc.
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

import type { UserOperation } from "@lightdotso/schemas";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import type { inferQueryKeys } from "@lukemorales/query-key-factory";

// -----------------------------------------------------------------------------
// Keys
// -----------------------------------------------------------------------------

export const rpc = createQueryKeys("rpc", {
  estimate_user_operation_gas: (
    params: Omit<
      UserOperation,
      | "hash"
      | "signature"
      | "paymasterAndData"
      | "callGasLimit"
      | "verificationGasLimit"
      | "preVerificationGas"
      | "maxFeePerGas"
      | "maxPriorityFeePerGas"
    >,
  ) => ({
    queryKey: [{ params: params }],
  }),
  get_gas_estimation: (params: { chainId: number }) => ({
    queryKey: [{ params: params }],
  }),
  get_paymaster_gas_and_paymaster_and_data: (
    params: Omit<UserOperation, "hash" | "paymasterAndData" | "signature">,
  ) => ({
    queryKey: [{ params: params }],
  }),
  get_user_operation_receipt: (
    params: Pick<UserOperation, "hash"> & { chainId: number },
  ) => ({
    queryKey: [{ params: params }],
  }),
});

// -----------------------------------------------------------------------------
// Infer
// -----------------------------------------------------------------------------

export type RpcKeys = inferQueryKeys<typeof rpc>;
