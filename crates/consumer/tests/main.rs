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

#![recursion_limit = "512"]

use dotenvy::dotenv;
use eyre::Result;
use lightdotso_consumer::{config::ConsumerArgs, consumer::Consumer};
use lightdotso_kafka::get_producer;
use lightdotso_tracing::init_test_tracing;
use rdkafka::producer::FutureRecord;
use rustls::crypto::{ring, CryptoProvider};
use std::{sync::Arc, time::Duration};

#[tokio::test(flavor = "multi_thread")]
async fn test_integration_consumer_run() -> Result<()> {
    // Load the environment variables.
    let _ = dotenv();

    // Init test tracing
    init_test_tracing();

    // Install the default crypto provider
    let _ = CryptoProvider::install_default(ring::default_provider());

    // Construct the consumer
    let consumer_args = ConsumerArgs {
        group: "test".to_string(),
        topics: vec!["test".to_string()],
        cpu_multiplier: 1,
    };

    // Create the consumer
    let consumer = Consumer::new(&consumer_args).await?;

    // Spawn the consumer in a separate task
    tokio::spawn(async move { consumer.run().await });

    // Construct the producer
    let producer = Arc::new(get_producer().unwrap());

    // Produce a test message
    let test_message = "test message";
    let produce_future = producer.send(
        FutureRecord::to("test").payload(test_message).key("test-key"),
        Duration::from_secs(0),
    );
    let _ = produce_future.await.unwrap();

    // Wait for a short time to allow the consumer to process the message
    tokio::time::sleep(Duration::from_secs(12)).await;

    Ok(())
}
