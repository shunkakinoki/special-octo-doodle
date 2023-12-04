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

use std::sync::Arc;

use async_trait::async_trait;
use lightdotso_redis::redis::{Client, Commands};
use time::OffsetDateTime;
use tower_sessions_core::{session::Id, Session, SessionStore};

// Redis implementation of https://github.dev/maxcountryman/tower-sessions/tree/3db1504b3f0adb41612b1b12d9d843986ddd4b72
// License: MIT
// This is a copy of the original code, with the only difference being the use of `redis` instead of
// `fred`.

/// An error type for `RedisStore`.
#[derive(thiserror::Error, Debug)]
pub enum RedisStoreError {
    /// A variant to map to `redis::RedisError` errors.
    #[error("Redis error: {0}")]
    Redis(#[from] lightdotso_redis::redis::RedisError),

    /// A variant to map `serde_json` encode errors.
    #[error("Serde JSON encode error: {0}")]
    SerdeEncode(#[from] serde_json::Error),
}

/// A Redis session store.
#[derive(Debug, Clone)]
pub struct RedisStore {
    client: Arc<Client>,
}

impl RedisStore {
    /// Create a new Redis store with the provided client.
    ///
    /// # Examples
    ///
    /// ```rust,no_run
    /// use tower_sessions::RedisStore;
    ///
    /// # tokio_test::block_on(async {
    /// let client = RedisClient::default();
    ///
    /// let _ = client.connect();
    /// client.wait_for_connect().await.unwrap();
    ///
    /// let session_store = RedisStore::new(client);
    /// })
    /// ```
    pub fn new(client: Client) -> Self {
        Self { client: Arc::new(client) }
    }
}

#[async_trait]
impl SessionStore for RedisStore {
    type Error = RedisStoreError;

    async fn save(&self, session: &Session) -> Result<(), Self::Error> {
        let session_data = serde_json::to_string(&session)?;
        let expire_at = OffsetDateTime::unix_timestamp(session.expiry_date()) as usize;

        let mut conn = self.client.get_connection()?;
        let _: () = conn.set_ex(session.id().to_string(), session_data, expire_at)?;
        Ok(())
    }

    async fn load(&self, session_id: &Id) -> Result<Option<Session>, Self::Error> {
        let mut conn = self.client.get_connection()?;
        let data: Option<String> = conn.get(session_id.to_string())?;

        match data {
            Some(data) => {
                let session: Session = serde_json::from_str(&data)?;
                Ok(Some(session))
            }
            None => Ok(None),
        }
    }

    async fn delete(&self, session_id: &Id) -> Result<(), Self::Error> {
        let mut conn = self.client.get_connection()?;
        conn.del(session_id.to_string())?;

        Ok(())
    }
}
