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

import { expect, test } from "vitest";
import { getEnsDomains } from "../src"; // Replace with your actual file path

test("getEnsDomains", async () => {
  const result = await getEnsDomains(
    "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
    { name: "kaki", amount: 3 },
  );

  // expect(result._unsafeUnwrap()).toBe("0x1");
  console.log(JSON.stringify(result));
});
