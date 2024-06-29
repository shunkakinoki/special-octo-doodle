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

import { parseAsString, useQueryState } from "nuqs";

// -----------------------------------------------------------------------------
// Parser
// -----------------------------------------------------------------------------

export const inviteCodeParser = parseAsString.withDefault("");

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

export const useInviteCodeQueryState = () => {
  return useQueryState("inviteCode", inviteCodeParser);
};
