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

import { getNonce, postAuthVerify } from "@lightdotso/client";
import { useQueryAuthSession } from "@lightdotso/query";
import { useAuth, useModals } from "@lightdotso/stores";
import { Modal } from "@lightdotso/templates";
import { Button, DialogDescription, DialogTitle, toast } from "@lightdotso/ui";
import { useCallback } from "react";
import { SiweMessage } from "siwe";
import type { Address } from "viem";
import { useSignMessage, useAccount } from "@lightdotso/wagmi";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function AuthModal() {
  // ---------------------------------------------------------------------------
  // Wagmi Hooks
  // ---------------------------------------------------------------------------

  const { isPending, signMessageAsync } = useSignMessage();
  const { chain } = useAccount();

  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { address, clientType, sessionId } = useAuth();
  const { isAuthModalVisible, hideAuthModal } = useModals();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { refetchAuthSession } = useQueryAuthSession({
    address: address as Address,
  });

  // ---------------------------------------------------------------------------
  // Callback Hooks
  // ---------------------------------------------------------------------------

  const handleSignIn = useCallback(async () => {
    if (!address || !chain || sessionId) {
      return;
    }

    const res = await getNonce();

    res.match(
      _ => {
        const message = new SiweMessage({
          domain: window.location.host,
          address,
          statement: "Sign in with Ethereum to light.so",
          uri: window.location.origin,
          version: "1",
          chainId: chain.id,
          nonce: res._unsafeUnwrap().nonce!,
        });
        const messageToSign = message.prepareMessage();

        signMessageAsync({
          message: message.prepareMessage(),
        }).then(signature => {
          const loadingToast = toast.loading("Signing in...");

          postAuthVerify(
            {
              params: { query: { user_address: address } },
              body: { message: messageToSign, signature },
            },
            clientType,
          )
            .then(res => {
              toast.dismiss(loadingToast);
              res.match(
                _ => {
                  toast.success("Successfully signed in!");
                  hideAuthModal();
                  refetchAuthSession();
                },
                _ => {
                  toast.error("Failed to sign in!");
                },
              );
            })
            .catch(err => {
              toast.dismiss(loadingToast);
              if (err instanceof Error) {
                toast.error(err.message);
              } else {
                toast.error("Failed to sign in!");
              }
            });
        });
      },
      err => {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Failed to sign in!");
        }
      },
    );
  }, [address, chain, clientType, sessionId, signMessageAsync]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (isAuthModalVisible) {
    return (
      <Modal
        open
        size="sm"
        footerContent={
          <Button
            disabled={isPending}
            isLoading={isPending}
            type="submit"
            size="sm"
            className="px-3"
            onClick={handleSignIn}
          >
            <span className="sr-only">Login</span>
            Login
          </Button>
        }
        onClose={hideAuthModal}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          Login with your wallet to access your account.
        </DialogDescription>
      </Modal>
    );
  }

  return null;
}

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

export default AuthModal;
