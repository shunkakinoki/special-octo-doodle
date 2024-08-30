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

import { TooltipProvider } from "@lightdotso/ui/components/tooltip";
import { ReactQueryProvider } from "@lightdotso/ui/providers/react-query";
import { ThemeProvider } from "@lightdotso/ui/providers/theme";
import { Inter } from "next/font/google";
import Script from "next/script";
import type { FC, ReactNode } from "react";
import { RootDevWrapper } from "./root-dev-wrapper";
import { RootWrapper } from "./root-wrapper";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface RootProps {
  children: ReactNode;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const Root: FC<RootProps> = ({ children }) => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.variable} font-sans`}
    >
      <body className="min-h-dvh bg-background-body">
        <ThemeProvider attribute="class">
          <ReactQueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ReactQueryProvider>
        </ThemeProvider>
        <RootWrapper />
        <RootDevWrapper />
      </body>
      <Script async src="https://data.light.so/p.js" />
    </html>
  );
};