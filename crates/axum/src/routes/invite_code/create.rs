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

use super::types::InviteCode;
use crate::{
    constants::KAKI_USER_ID,
    error::RouteError,
    result::AppJsonResult,
    routes::invite_code::{error::InviteCodeError, types::GenerateInviteCode},
    sessions::get_user_id,
    state::AppState,
};
use autometrics::autometrics;
use axum::{extract::State, Json};
use lightdotso_db::models::activity::CustomParams;
use lightdotso_kafka::{
    topics::activity::produce_activity_message, types::activity::ActivityMessage,
};
use lightdotso_prisma::{ActivityEntity, ActivityOperation};
use lightdotso_tracing::tracing::info;
use tower_sessions_core::Session;

// -----------------------------------------------------------------------------
// Handler
// -----------------------------------------------------------------------------

/// Create an invite code
#[utoipa::path(
        post,
        path = "/invite_code/create",
        responses(
            (status = 200, description = "Invite code created successfully", body = InviteCode),
            (status = 500, description = "Invite code internal error", body = InviteCodeError),
        )
    )]
#[autometrics]
pub(crate) async fn v1_invite_code_create_handler(
    State(state): State<AppState>,
    mut session: Session,
) -> AppJsonResult<InviteCode> {
    // -------------------------------------------------------------------------
    // Session
    // -------------------------------------------------------------------------

    // Get the authenticated user id.
    let auth_user_id = get_user_id(&mut session)?;
    info!(?auth_user_id);

    // -------------------------------------------------------------------------
    // Authorization
    // -------------------------------------------------------------------------

    // If the authenticated user id is not `KAKI_USER_ID`, return an error.
    if auth_user_id != KAKI_USER_ID.to_string() {
        return Err(RouteError::InviteCodeError(InviteCodeError::Unauthorized(format!(
            "Not authorized for {}",
            auth_user_id
        )))
        .into());
    }

    // -------------------------------------------------------------------------
    // DB
    // -------------------------------------------------------------------------

    // Generate a new invite_code w/ the format AAA-ZZZ.
    let code = InviteCode::generate_invite_code();

    // Create the invite_code the database.
    let invite_code = state
        .client
        .invite_code()
        .create(code, lightdotso_prisma::user::id::equals(auth_user_id.clone()), vec![])
        .exec()
        .await?;
    info!(?invite_code);

    // -------------------------------------------------------------------------
    // Kafka
    // -------------------------------------------------------------------------

    // Produce an activity message.
    produce_activity_message(
        state.producer.clone(),
        ActivityEntity::InviteCode,
        &ActivityMessage {
            operation: ActivityOperation::Create,
            log: serde_json::to_value(&invite_code)?,
            params: CustomParams {
                invite_code_id: Some(invite_code.id.clone()),
                user_id: Some(auth_user_id),
                ..Default::default()
            },
        },
    )
    .await?;

    // -------------------------------------------------------------------------
    // Return
    // -------------------------------------------------------------------------

    // Change the invite_codes to the format that the API expects.
    let invite_code: InviteCode = invite_code.into();

    Ok(Json::from(invite_code))
}
