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

use lightdotso_billing::billing::Billing;
use lightdotso_hyper::HyperClient;
use lightdotso_indexer::indexer::Indexer;
use lightdotso_kafka::rdkafka::producer::FutureProducer;
use lightdotso_node::node::Node;
use lightdotso_notifier::notifier::Notifier;
use lightdotso_polling::polling::Polling;
use lightdotso_prisma::PrismaClient;
use lightdotso_redis::redis::Client;
use lightdotso_sqlx::PostgresPool;
use std::sync::Arc;

#[derive(Clone)]
pub struct ConsumerState {
    // Client services
    pub hyper: Arc<HyperClient>,
    pub pool: Arc<PostgresPool>,
    pub producer: Arc<FutureProducer>,
    pub redis: Arc<Client>,

    // Internal services
    pub billing: Arc<Billing>,
    pub client: Arc<PrismaClient>,
    pub indexer: Arc<Indexer>,
    pub notifier: Arc<Notifier>,
    pub polling: Arc<Polling>,
    pub node: Arc<Node>,
}

pub type SharedConsumerState = Arc<ConsumerState>;
