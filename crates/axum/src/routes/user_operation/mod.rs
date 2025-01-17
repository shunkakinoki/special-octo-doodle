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

pub(crate) mod create;
pub(crate) mod error;
pub(crate) mod get;
pub(crate) mod list;
pub(crate) mod nonce;
pub(crate) mod signature;
pub(crate) mod types;
pub(crate) mod update;

use autometrics::autometrics;
use axum::{
    routing::{get, post, put},
    Router,
};
use lightdotso_state::ClientState;

pub(crate) use create::{
    __path_v1_user_operation_create_batch_handler, __path_v1_user_operation_create_handler,
    v1_user_operation_create_batch_handler, v1_user_operation_create_handler,
};
pub(crate) use get::{__path_v1_user_operation_get_handler, v1_user_operation_get_handler};
pub(crate) use list::{
    __path_v1_user_operation_list_count_handler, __path_v1_user_operation_list_handler,
    v1_user_operation_list_count_handler, v1_user_operation_list_handler,
};
pub(crate) use nonce::{__path_v1_user_operation_nonce_handler, v1_user_operation_nonce_handler};
pub(crate) use signature::{
    __path_v1_user_operation_signature_handler, v1_user_operation_signature_handler,
};
pub(crate) use update::{
    __path_v1_user_operation_update_handler, v1_user_operation_update_handler,
};

// -----------------------------------------------------------------------------
// Router
// -----------------------------------------------------------------------------

#[autometrics]
pub(crate) fn router() -> Router<ClientState> {
    Router::new()
        .route("/user_operation/get", get(v1_user_operation_get_handler))
        .route("/user_operation/update", put(v1_user_operation_update_handler))
        .route("/user_operation/nonce", get(v1_user_operation_nonce_handler))
        .route("/user_operation/list", get(v1_user_operation_list_handler))
        .route("/user_operation/list/count", get(v1_user_operation_list_count_handler))
        .route("/user_operation/create", post(v1_user_operation_create_handler))
        .route("/user_operation/create/batch", post(v1_user_operation_create_batch_handler))
        .route("/user_operation/signature", get(v1_user_operation_signature_handler))
}
