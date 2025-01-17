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

use super::{error::AuthError, types::AuthSuccess};
use crate::{cookies::CookieUtility, result::AppJsonResult, tags::AUTH_TAG};
use axum::Json;
use lightdotso_tracing::tracing::info;
use tower_cookies::Cookies;
use tower_sessions::Session;

// -----------------------------------------------------------------------------
// Handler
// -----------------------------------------------------------------------------

/// Logout a session
///
/// Logs out a session and clears the cookies.
#[utoipa::path(
        post,
        path = "/auth/logout",
        responses(
            (status = 200, description = "Auth logout returned successfully", body = AuthSuccess),
            (status = 404, description = "Auth logout not succeeded", body = AuthError),
        ),
        tag = AUTH_TAG.as_str()
    )]
pub(crate) async fn v1_auth_logout_handler(
    cookies: Cookies,
    session: Session,
) -> AppJsonResult<AuthSuccess> {
    info!(?session);

    cookies.remove_wallet_cookie().await;

    session.clear().await;
    let _ = session.delete().await;

    Ok(Json::from(AuthSuccess::Logout("Logout Success".to_string())))
}
