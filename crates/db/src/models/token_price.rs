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

use alloy::primitives::Address;
use autometrics::autometrics;
use eyre::Result;
use lightdotso_sqlx::{
    sqlx::{query, query_as, Error as SqlxError, FromRow, QueryBuilder},
    PostgresPool,
};
use prisma_client_rust::chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

// -----------------------------------------------------------------------------
// Params
// -----------------------------------------------------------------------------

pub struct TokenPriceInputParams {
    pub chain_id: i64,
    pub token_address: Address,
    pub price: f64,
}

// -----------------------------------------------------------------------------
// Create
// -----------------------------------------------------------------------------

/// Create a new token price
#[autometrics]
pub async fn create_token_price(pool: &PostgresPool, params: TokenPriceInputParams) -> Result<()> {
    query(r#"INSERT INTO "TokenPrice" ("chainId", "tokenAddress", "price") VALUES ($1, $2, $3)"#)
        .bind(params.chain_id)
        .bind(params.token_address.to_checksum(None))
        .bind(params.price)
        .execute(pool)
        .await?;

    Ok(())
}

/// Create many token prices
#[autometrics]
pub async fn create_token_prices(
    pool: &PostgresPool,
    params: Vec<TokenPriceInputParams>,
) -> Result<()> {
    let mut query_builder = QueryBuilder::new(
        r#"INSERT INTO "TokenPrice" ("chainId", "tokenAddress", "price") VALUES "#,
    );

    for price in params {
        query_builder.push_bind(price.chain_id);
        query_builder.push_bind(price.token_address.to_checksum(None));
        query_builder.push_bind(price.price);
    }

    query_builder.build().execute(pool).await?;

    Ok(())
}

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

#[derive(Clone, Debug, Serialize, Deserialize, FromRow)]
pub struct TokenPriceAggregate {
    #[serde(rename = "price")]
    #[sqlx(rename = "price")]
    pub price: f64,
    #[serde(rename = "date")]
    #[sqlx(rename = "date")]
    pub date: DateTime<Utc>,
}

// -----------------------------------------------------------------------------
// Get
// -----------------------------------------------------------------------------

#[autometrics]
pub async fn get_token_prices(
    pool: &PostgresPool,
    token_id: String,
    interval: &str,
    limit: i32,
) -> Result<Vec<TokenPriceAggregate>, SqlxError> {
    let query = format!(
        r#"SELECT AVG(price) as price, time_bucket('{}', timestamp) as date
           FROM "TokenPrice"
           WHERE "tokenId" = $1
           GROUP BY time_bucket('{}', timestamp)
           ORDER BY date DESC
           LIMIT $2"#,
        interval, interval
    );

    query_as::<_, TokenPriceAggregate>(&query).bind(token_id).bind(limit).fetch_all(pool).await
}