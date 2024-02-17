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

import { getUserOperation } from "@lightdotso/services";
import {
  validateAddress,
  validateUserOperationHash,
} from "@lightdotso/validators";
import { notFound } from "next/navigation";
import type { Hex } from "viem";
import { handler as addressHandler } from "@/handlers/paths/[address]/handler";

// -----------------------------------------------------------------------------
// Handler
// -----------------------------------------------------------------------------

export const handler = async (params: {
  address: string;
  userOperationHash: string;
}) => {
  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const { config, walletSettings } = await addressHandler(params);

  // ---------------------------------------------------------------------------
  // Validators
  // ---------------------------------------------------------------------------

  validateAddress(params.address);

  validateUserOperationHash(params.userOperationHash);

  // ---------------------------------------------------------------------------
  // Fetch
  // ---------------------------------------------------------------------------

  const userOperation = await getUserOperation({
    hash: params.userOperationHash as Hex,
  });

  // ---------------------------------------------------------------------------
  // Parse
  // ---------------------------------------------------------------------------

  return userOperation.match(
    userOperation => {
      return {
        config: config,
        userOperation: userOperation,
        walletSettings: walletSettings,
      };
    },
    () => {
      notFound();
    },
  );
};
