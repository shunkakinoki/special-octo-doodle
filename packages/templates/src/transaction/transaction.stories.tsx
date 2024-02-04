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

import {
  configurationGetData,
  userOperationCreateData,
} from "@lightdotso/demo";
import { handlers } from "@lightdotso/msw";
import type { Meta, StoryObj } from "@storybook/react";
import { Transaction } from "./transaction";

// -----------------------------------------------------------------------------
// Meta
// -----------------------------------------------------------------------------

const meta: Meta<typeof Transaction> = {
  title: "template/Transaction",
  component: Transaction,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type Story = StoryObj<typeof Transaction>;

// -----------------------------------------------------------------------------
// Story
// -----------------------------------------------------------------------------

export const Base: Story = {
  render: args => (
    <Transaction
      address="0xFbd80Fe5cE1ECe895845Fd131bd621e2B6A1345F"
      configuration={configurationGetData}
      initialUserOperation={userOperationCreateData}
      userOperationIndex={0}
      isDev={true}
    />
  ),
  args: {},
  parameters: {
    msw: {
      handlers: handlers,
    },
  },
};
