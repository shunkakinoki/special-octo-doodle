// Copyright 2023-2024 Light.
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

export const PolygonLogo: ForwardRefExoticComponent<
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
    <rect x="1" y="1" width="22" height="22" rx="6" fill="#A177FA" />
    <path
      d="M15.086 9.92701C14.9705 9.86461 14.8413 9.83193 14.71 9.83193C14.5787 9.83193 14.4495 9.86461 14.334 9.92701L12.58 10.97L11.389 11.635L9.66598 12.68C9.55048 12.7424 9.42126 12.7751 9.28998 12.7751C9.1587 12.7751 9.02948 12.7424 8.91398 12.68L7.56698 11.857C7.45208 11.7882 7.35701 11.6908 7.29109 11.5742C7.22518 11.4576 7.19068 11.3259 7.19098 11.192V9.61001C7.19098 9.35701 7.31598 9.10401 7.56698 8.94601L8.91398 8.15401C9.02948 8.09161 9.1587 8.05893 9.28998 8.05893C9.42126 8.05893 9.55048 8.09161 9.66598 8.15401L11.013 8.97701C11.233 9.10401 11.389 9.35701 11.389 9.64201V10.687L12.579 9.99001V8.91401C12.5785 8.78036 12.5438 8.64906 12.4781 8.53264C12.4125 8.41622 12.3181 8.31857 12.204 8.24901L9.69698 6.76201C9.58148 6.69961 9.45227 6.66693 9.32098 6.66693C9.1897 6.66693 9.06048 6.69961 8.94498 6.76201L6.37598 8.28001C6.26032 8.33998 6.16378 8.43118 6.09732 8.54324C6.03086 8.6553 5.99714 8.78375 5.99998 8.91401V11.889C5.99998 12.143 6.12498 12.396 6.37598 12.554L8.91398 14.042C9.13398 14.168 9.41498 14.168 9.66598 14.042L11.389 13.029L12.579 12.332L14.303 11.32C14.4185 11.2576 14.5477 11.2249 14.679 11.2249C14.8103 11.2249 14.9395 11.2576 15.055 11.32L16.402 12.11C16.622 12.238 16.778 12.49 16.778 12.776V14.358C16.7774 14.4918 16.7425 14.6231 16.6767 14.7395C16.6109 14.856 16.5163 14.9536 16.402 15.023L15.086 15.814C14.9705 15.8764 14.8413 15.9091 14.71 15.9091C14.5787 15.9091 14.4495 15.8764 14.334 15.814L12.987 15.023C12.8721 14.9542 12.777 14.8568 12.7111 14.7402C12.6452 14.6236 12.6107 14.4919 12.611 14.358V13.345L11.421 14.042V15.086C11.421 15.339 11.546 15.593 11.796 15.751L14.334 17.238C14.554 17.365 14.836 17.365 15.086 17.238L17.624 15.751C17.7389 15.6822 17.834 15.5848 17.8999 15.4682C17.9658 15.3516 18.0003 15.2199 18 15.086V12.08C17.9994 11.9463 17.9645 11.8149 17.8987 11.6985C17.8329 11.582 17.7383 11.4844 17.624 11.415L15.086 9.92801V9.92701Z"
      fill="white"
    />
  </svg>
));

PolygonLogo.displayName = "PolygonLogo";
