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

import { useBaseSlug } from "@lightdotso/hooks";
import type { Tab } from "@lightdotso/types";
import { Badge } from "@lightdotso/ui/components/badge";
import { Button } from "@lightdotso/ui/components/button";
import { ButtonIcon } from "@lightdotso/ui/components/button-icon";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@lightdotso/ui/components/drawer";
import { AlignRight, ArrowUpRight, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { FC, ReactNode } from "react";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface MobileAppDrawerProps {
  children?: ReactNode;
  triggerChildren?: ReactNode;
  tabs: Tab[];
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const MobileAppDrawer: FC<MobileAppDrawerProps> = ({
  tabs,
  children,
  triggerChildren,
}) => {
  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const baseSlug = useBaseSlug();

  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [isOpen, setIsOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // Next Hooks
  // ---------------------------------------------------------------------------

  const pathname = usePathname();

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {triggerChildren ? (
        <DrawerTrigger asChild onClick={() => setIsOpen(true)}>
          {triggerChildren}
        </DrawerTrigger>
      ) : (
        <div className="ml-auto">
          <DrawerTrigger asChild onClick={() => setIsOpen(true)}>
            <ButtonIcon variant="outline" size="sm">
              <AlignRight className="size-4" />
            </ButtonIcon>
          </DrawerTrigger>
        </div>
      )}
      <DrawerContent>
        <DrawerHeader>{children}</DrawerHeader>
        <DrawerBody>
          {tabs.map((tab) => {
            if (
              !(
                tab.href.startsWith("https://light.so") ||
                tab.href.startsWith("/")
              )
            ) {
              return (
                <div key={tab.id} className="border-border border-b py-1.5">
                  <Button asChild className="w-full" variant="link">
                    <a className="flex justify-between" href={tab.href}>
                      <span className="flex">
                        {tab.icon && <tab.icon className="mr-2 size-4" />}
                        {tab.title}
                      </span>
                      <ArrowUpRight className="size-4 text-text-weak" />
                    </a>
                  </Button>
                </div>
              );
            }
            return (
              <div
                key={tab.id}
                className="border-border border-b py-1.5 first:border-t"
              >
                <Button asChild className="w-full justify-start" variant="link">
                  <Link href={`${baseSlug}${tab.href}`}>
                    {tab.icon && <tab.icon className="mr-2 size-4" />}
                    {tab.title}
                    {tab?.number && tab?.number > 0 && (
                      <Badge
                        type="number"
                        variant="outline"
                        className="ml-2 rounded-full border-0 bg-background-strong font-sm text-text-weak no-underline"
                      >
                        {tab?.number}
                      </Badge>
                    )}
                  </Link>
                </Button>
              </div>
            );
          })}
        </DrawerBody>
        <DrawerFooter className="flex items-center">
          <DrawerClose asChild>
            <ButtonIcon size="sm" className="rounded-full" variant="outline">
              <XIcon className="text-text-weak" />
            </ButtonIcon>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
