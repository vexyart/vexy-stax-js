// SPDX-License-Identifier: Apache-2.0
// this_file: src/global.js
//
// Classic-script global entry (SPEC.md §6.3). Importing this auto-registers the
// <vexy-stax> element (via element.js) and exposes window.VexyStax.

import { VexyStax, loadScene } from "./index.js";
import "./element.js";

const api = { VexyStax, loadScene };

if (typeof window !== "undefined") {
  window.VexyStax = api;
}

export { VexyStax, loadScene };
