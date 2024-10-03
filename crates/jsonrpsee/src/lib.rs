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

use crate::types::{ErrorResponse, Response};
use eyre::{Error, Result};
use lightdotso_tracing::tracing::{info, warn};
use serde_json::Value;

pub mod error;
pub mod rpc;
pub mod types;

/// From: https://github.com/qi-protocol/ethers-userop/blob/50cb1b18a551a681786f1a766d11215c80afa7cf/src/userop_middleware.rs#L222
/// License: MIT
///
/// Helper function to handle the response from the bundler
///
/// # Arguments
/// * `response` - The response from the bundler
///
/// # Returns
/// * `Response<R>` - The success response if no error
pub async fn handle_response<R>(response: reqwest::Response) -> Result<Response<R>>
where
    R: std::fmt::Debug + serde::de::DeserializeOwned,
{
    // Log the full response
    info!("response: {:?}", response);

    // Log the response headers
    info!("response headers: {:?}", response.headers());

    // Log the response status
    info!("response status: {:?}", response.status());

    // Get the response body as text
    let body_text = response.text().await?;

    // Log the response body
    info!("Response body: {}", body_text);

    // Try to parse the body as JSON for prettier logging
    if let Ok(parsed_response_body) = serde_json::from_str::<Value>(&body_text) {
        info!("Response parsed body: {}", serde_json::to_string_pretty(&parsed_response_body)?);
    }

    // Parse the response
    let parsed_response: Result<Response<R>> =
        serde_json::from_str(&body_text).map_err(Error::from);

    match parsed_response {
        Ok(success_response) => {
            info!("Success {:?}", success_response);
            Ok(success_response)
        }
        Err(_) => {
            let error_response: ErrorResponse = serde_json::from_str(&body_text)?;
            let error_message = error_response.error.message.clone();
            warn!("Error: {:?}", error_response);
            Err(Error::msg(error_message))
        }
    }
}
