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

import { useModals } from "@lightdotso/stores";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import type { FC, ReactNode } from "react";
import { Modal } from "../modal";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface ModalInterceptionProps {
  children: ReactNode;
  type: "create" | "op" | "notifications" | "send";
  footerContent?: ReactNode;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const ModalInterception: FC<ModalInterceptionProps> = ({
  children,
  footerContent,
  type,
}) => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const {
    isCreateModalBackground,
    isNotificationsModalBackground,
    isOpModalBackground,
    isSendModalBackground,
    isCreateModalVisible,
    isNotificationsModalVisible,
    isOpModalVisible,
    isSendModalVisible,
    showCreateModal,
    showNotificationsModal,
    showOpModal,
    showSendModal,
    hideCreateModal,
    hideNotificationsModal,
    hideOpModal,
    hideSendModal,
  } = useModals();

  // ---------------------------------------------------------------------------
  // Next Hooks
  // ---------------------------------------------------------------------------

  const router = useRouter();
  const pathname = usePathname();

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const isBackground = useMemo(() => {
    switch (type) {
      case "create":
        return isCreateModalBackground;
      case "op":
        return isOpModalBackground;
      case "notifications":
        return isNotificationsModalBackground;
      case "send":
        return isSendModalBackground;
    }
  }, [
    isCreateModalBackground,
    isNotificationsModalBackground,
    isOpModalBackground,
    isSendModalBackground,
    type,
  ]);

  const isOpen = useMemo(() => {
    switch (type) {
      case "create":
        return isCreateModalVisible;
      case "op":
        return isOpModalVisible;
      case "notifications":
        return isNotificationsModalVisible;
      case "send":
        return isSendModalVisible;
    }
  }, [
    isCreateModalVisible,
    isNotificationsModalVisible,
    isOpModalVisible,
    isSendModalVisible,
    type,
  ]);

  // ---------------------------------------------------------------------------
  // Callback Hooks
  // ---------------------------------------------------------------------------

  const onDismiss = useCallback(() => {
    switch (type) {
      case "create":
        hideCreateModal();
        router.back();
        break;
      case "op":
        hideOpModal();
        router.back();
        break;
      case "notifications":
        hideNotificationsModal();
        router.back();
        break;
      case "send":
        hideSendModal();
        router.back();
        break;
    }
  }, [
    hideCreateModal,
    hideNotificationsModal,
    hideOpModal,
    hideSendModal,
    router,
    type,
  ]);

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (isOpen) {
      return;
    }

    switch (type) {
      case "create":
        if (pathname.includes("create")) {
          showCreateModal();
        }
        break;
      case "op":
        if (pathname.includes("op")) {
          showOpModal();
        }
        break;
      case "notifications":
        if (pathname.includes("notifications")) {
          showNotificationsModal();
        }
        break;
      case "send":
        if (pathname.includes("send")) {
          showSendModal();
        }
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, type]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      isHidden={isBackground}
      footerContent={footerContent}
      size={type === "op" ? "lg" : "default"}
      open={isOpen}
      onClose={onDismiss}
    >
      {children}
    </Modal>
  );
};
