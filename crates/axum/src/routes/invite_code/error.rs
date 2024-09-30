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

use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

// -----------------------------------------------------------------------------
// Error
// -----------------------------------------------------------------------------

/// InviteCode error
#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub(crate) enum InviteCodeError {
    /// InviteCode query error.
    #[schema(example = "Bad request")]
    BadRequest(String),
    /// InviteCode not found by id.
    #[schema(example = "id = 1")]
    NotFound(String),
    /// Not Authorized.
    #[schema(example = "Not authorized")]
    Unauthorized(String),
}
