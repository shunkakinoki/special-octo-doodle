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

pub mod consumer;
pub mod custom;

use opentelemetry::sdk::metrics::{controllers, processors, selectors};
pub use opentelemetry_prometheus;
use opentelemetry_prometheus::PrometheusExporter;
use opentelemetry_sdk::export::metrics::aggregation;
pub use prometheus;
use std::time::Duration;

/// Initialize the Prometheus exporter.
pub fn init_prometheus() -> PrometheusExporter {
    let controller = controllers::basic(processors::factory(
        selectors::simple::histogram([1.0, 2.0, 5.0, 10.0, 20.0, 50.0]),
        aggregation::cumulative_temporality_selector(),
    ))
    .with_collect_period(Duration::from_secs(10))
    .build();

    opentelemetry_prometheus::exporter(controller).init()
}
