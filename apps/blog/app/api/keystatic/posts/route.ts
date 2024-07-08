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

import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "~/keystatic.config";

// -----------------------------------------------------------------------------
// Reader
// -----------------------------------------------------------------------------

const reader = createReader(process.cwd(), keystaticConfig);

// -----------------------------------------------------------------------------
// Route
// -----------------------------------------------------------------------------

export async function GET() {
  // ---------------------------------------------------------------------------
  // Reader
  // ---------------------------------------------------------------------------

  const posts = await reader.collections.posts.all();

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return Response.json({ proposals: posts });
}
