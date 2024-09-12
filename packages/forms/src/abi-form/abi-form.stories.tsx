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

import { zodResolver } from "@hookform/resolvers/zod";
import { useRefinement } from "@lightdotso/hooks";
import { addressOrEns } from "@lightdotso/schemas";
import { Form } from "@lightdotso/ui/components/form";
import { publicClient } from "@lightdotso/wagmi";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { isAddress } from "viem";
import { normalize } from "viem/ens";
import { z } from "zod";
import { AbiForm } from "./abi-form";

// -----------------------------------------------------------------------------
// Meta
// -----------------------------------------------------------------------------

const meta: Meta<typeof AbiForm> = {
  title: "form/AbiForm",
  component: AbiForm,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type Story = StoryObj<typeof AbiForm>;

// -----------------------------------------------------------------------------
// Schema
// -----------------------------------------------------------------------------

const walletNameFormSchema = z.object({
  addressOrEns: addressOrEns,
});

// -----------------------------------------------------------------------------
// Story
// -----------------------------------------------------------------------------

export const Base: Story = {
  render: (args) => {
    const getEns = async ({ name }: { name: string }) =>
      publicClient.getEnsAddress({ name: normalize(name) }).then((addr) => {
        // console.log(addr);
        return !!addr;
      });

    const validEns = useRefinement(getEns, {
      debounce: 300,
    });

    const methods = useForm({
      mode: "all",
      reValidateMode: "onBlur",
      resolver: zodResolver(
        walletNameFormSchema.refine(
          ({ addressOrEns }) => {
            if (addressOrEns.length === 0 || isAddress(addressOrEns)) {
              return true;
            }
            return validEns({ name: addressOrEns });
          },
          {
            path: ["addressOrEns"],
            message: "Ens name is not valid",
          },
        ),
      ),
    });

    return (
      <Form {...methods}>
        <AbiForm onKeyDown={validEns.invalidate} {...args} />
      </Form>
    );
  },
  args: {
    name: "addressOrEns",
  },
};
