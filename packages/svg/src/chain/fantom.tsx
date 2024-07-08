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

import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  SVGProps,
} from "react";
import { forwardRef } from "react";

export const FantomLogo: ForwardRefExoticComponent<
  PropsWithoutRef<SVGProps<SVGSVGElement>> & RefAttributes<SVGSVGElement>
> = forwardRef((props, ref) => (
  <svg
    {...props}
    ref={ref}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="6" fill="#1969FF" />
    <g clip-path="url(#clip0_10113_10194)">
      <path
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="#1969FF"
      />
      <path
        d="M11.2723 3.8161C11.6766 3.60297 12.2918 3.60297 12.6961 3.8161L16.8215 5.99099C17.0649 6.11934 17.1987 6.31062 17.2226 6.50808H17.2266V17.4401C17.2212 17.6555 17.0862 17.8694 16.8215 18.009L12.6961 20.1839C12.2918 20.397 11.6766 20.397 11.2723 20.1839L7.14695 18.009C6.8833 17.87 6.75677 17.6546 6.75051 17.4401C6.74986 17.4181 6.74981 17.3999 6.75049 17.385L6.75051 6.58169C6.74989 6.56649 6.74988 6.55136 6.75049 6.53629L6.75051 6.50808H6.75235C6.77067 6.30844 6.89833 6.12204 7.14695 5.99099L11.2723 3.8161ZM16.5703 12.5859L12.6948 14.6358C12.2911 14.8493 11.6768 14.8493 11.2731 14.6358L7.40625 12.5905V17.4063L11.2731 19.4407C11.5016 19.563 11.7393 19.6821 11.9706 19.6873L11.984 19.6875C12.2149 19.6883 12.4391 19.5708 12.6664 19.4597L16.5703 17.3888V12.5859ZM6.10368 17.2031C6.10368 17.6222 6.15196 17.8976 6.24781 18.0917C6.32725 18.2525 6.44645 18.3754 6.66411 18.525L6.67653 18.5335C6.7243 18.566 6.77691 18.6 6.84097 18.64L6.9165 18.6867L7.14844 18.8279L6.81577 19.3828L6.55617 19.2246L6.51254 19.1976C6.43748 19.1508 6.37526 19.1107 6.31723 19.0712C5.69692 18.6493 5.46557 18.1893 5.46101 17.2323L5.46094 17.2031H6.10368ZM11.6719 9.67969C11.6419 9.69001 11.6137 9.70198 11.5881 9.71556L7.46898 11.8974C7.46466 11.8997 7.46054 11.902 7.45661 11.9042L7.45312 11.9062L7.45959 11.91L7.46898 11.9151L11.5881 14.0969C11.6137 14.1105 11.6419 14.1225 11.6719 14.1328V9.67969ZM12.3281 9.67969V14.1328C12.3582 14.1225 12.3863 14.1105 12.4119 14.0969L16.531 11.9151C16.5353 11.9128 16.5395 11.9105 16.5434 11.9083L16.5469 11.9062L16.5404 11.9025L16.531 11.8974L12.4119 9.71556C12.3863 9.70198 12.3582 9.69001 12.3281 9.67969ZM16.5703 7.28906L12.8672 9.23438L16.5703 11.1797V7.28906ZM7.40625 7.28906V11.1797L11.1094 9.23438L7.40625 7.28906ZM12.4083 4.39751C12.1939 4.28416 11.8061 4.28416 11.5917 4.39751L7.469 6.57712C7.46467 6.57941 7.46054 6.58167 7.45662 6.58392L7.45312 6.58594L7.4596 6.58964L7.469 6.59475L11.5917 8.77435C11.8061 8.88772 12.1939 8.88772 12.4083 8.77435L16.531 6.59475C16.5353 6.59246 16.5395 6.5902 16.5434 6.58797L16.5469 6.58594L16.5404 6.58223L16.531 6.57712L12.4083 4.39751ZM17.1842 4.61719L17.4438 4.77537L17.4875 4.8024C17.5625 4.84915 17.6247 4.88931 17.6828 4.92878C18.3031 5.35072 18.5344 5.81075 18.539 6.76772L18.5391 6.79688H17.8963C17.8963 6.37778 17.848 6.10235 17.7522 5.90829C17.6728 5.74746 17.5536 5.62454 17.3359 5.47498L17.3235 5.46649C17.2757 5.434 17.2231 5.39996 17.159 5.35996L17.0835 5.31328L16.8516 5.17206L17.1842 4.61719Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_10113_10194">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
));

FantomLogo.displayName = "FantomLogo";
