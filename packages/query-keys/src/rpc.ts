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
    queryKey: [{ params }],
  }),
  get_paymaster_gas_and_paymaster_and_data: (
    params: Omit<UserOperation, "hash" | "paymasterAndData" | "signature">,
  ) => ({
    queryKey: [{ params }],
  }),
});

// -----------------------------------------------------------------------------
// Infer
// -----------------------------------------------------------------------------

export type RpcKeys = inferQueryKeys<typeof rpc>;
