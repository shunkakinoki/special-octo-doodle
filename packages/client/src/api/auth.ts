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

import type { NonceData } from "@lightdotso/data";
import { type Result, ResultAsync, err, ok } from "neverthrow";
import type { ClientType } from "../client";
import { getClient } from "../client";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type GetNonceResponse = Promise<
  Result<
    NonceData,
    | Error
    | { BadRequest: string }
    | { NotFound: string }
    | { InternalError: string }
    | { Unauthorized: string }
    | undefined
  >
>;

// -----------------------------------------------------------------------------
// GET
// -----------------------------------------------------------------------------

export const getNonce = async (
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  params?: {},
  clientType?: ClientType,
): GetNonceResponse => {
  const client = getClient(clientType);

  return ResultAsync.fromPromise(
    client.GET("/auth/nonce", {
      params: params,
    }),
    () => new Error("Database error"),
  ).andThen(({ data, response, error }) => {
    return response.status === 200 && data ? ok(data) : err(error);
  });
};

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const getAuthSession = async (params?: {}, clientType?: ClientType) => {
  const client = getClient(clientType);

  return ResultAsync.fromPromise(
    client.GET("/auth/session", {
      params: params,
    }),
    () => new Error("Database error"),
  ).andThen(({ data, response, error }) => {
    return response.status === 200 && data ? ok(data) : err(error);
  });
};

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type PostAuthLogoutResponse = Promise<
  Result<
    { Logout: string },
    | Error
    | { BadRequest: string }
    | { NotFound: string }
    | { InternalError: string }
    | { Unauthorized: string }
    | undefined
  >
>;

// -----------------------------------------------------------------------------
// POST
// -----------------------------------------------------------------------------

export const authLogout = async (
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  params?: {},
  clientType?: ClientType,
): PostAuthLogoutResponse => {
  const client = getClient(clientType);

  return ResultAsync.fromPromise(
    client.POST("/auth/logout", {
      params: params,
    }),
    () => new Error("Database error"),
  ).andThen(({ data, response, error }) => {
    return response.status === 200 && data ? ok(data) : err(error);
  });
};

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type PostAuthVerifyResponse = Promise<
  Result<
    { nonce: string },
    | Error
    | { BadRequest: string }
    | { NotFound: string }
    | { InternalError: string }
    | { Unauthorized: string }
    | undefined
  >
>;

// -----------------------------------------------------------------------------
// POST
// -----------------------------------------------------------------------------

export const authVerify = async (
  {
    params,
    body,
  }: {
    params: {
      query: { user_address: string };
    };
    body: {
      message: string;
      signature: string;
    };
  },
  clientType?: ClientType,
): PostAuthVerifyResponse => {
  const client = getClient(clientType);

  return ResultAsync.fromPromise(
    client.POST("/auth/verify", {
      params: params,
      body: body,
    }),
    () => new Error("Database error"),
  ).andThen(({ data, response, error }) => {
    return response.status === 200 && data ? ok(data) : err(error);
  });
};
