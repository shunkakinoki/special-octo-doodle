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

import { ButtonIcon } from "@lightdotso/ui";
import { ChevronDown } from "lucide-react";
import type { FC } from "react";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const UserOperationCardToggle: FC = () => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="flex-initial pl-4">
      <div className="flex items-center justify-end">
        <ButtonIcon className="bg-background-strong" variant="ghost" size="sm">
          <ChevronDown className="size-4 transition-all duration-200" />
        </ButtonIcon>
      </div>
    </div>
  );
};
