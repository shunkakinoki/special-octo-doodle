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

import type { InterpretationData } from "@lightdotso/data";
import { AssetChange } from "@lightdotso/elements";
import { cn } from "@lightdotso/utils";
import type { FC } from "react";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type InterpretationCardProps = {
  interpretation?: InterpretationData | null;
  className?: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const InterpretationCard: FC<InterpretationCardProps> = ({
  interpretation,
  className,
}) => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!interpretation) {
    return <div className={cn("min-w-32 grow", className)} />;
  }

  return (
    <div
      className={cn(
        "min-w-32 flex grow items-center space-x-2 md:space-x-3",
        className,
      )}
    >
      {interpretation?.asset_changes &&
        interpretation.asset_changes
          .slice(0, 1)
          .map((assetChange, index) => (
            <AssetChange key={index} assetChange={assetChange} />
          ))}
    </div>
  );
};
