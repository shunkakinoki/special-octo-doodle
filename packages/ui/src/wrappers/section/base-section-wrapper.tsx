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

import { cn } from "@lightdotso/utils";
import type { ReactNode } from "react";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface BaseSectionWrapperProps {
  children: ReactNode;
  className?: string;
}

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export function BaseSectionWrapper({
  children,
  className,
}: BaseSectionWrapperProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-background p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}