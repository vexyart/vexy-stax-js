// SPDX-License-Identifier: Apache-2.0
// this_file: src/global.js
//
// Classic-script global entry (SPEC.md §6.3). Importing this auto-registers the
// <vexy-stax> element (via element.js) and exposes window.VexyStax.

import { VexyStax, loadScene, makeScene, createStax } from "./index.js";
import "./element.js";

// Issue 341: expose the easy entry points on the global too. `window.VexyStax.create(el, opts)`
// mirrors lines-nano's `VexyLinesNano.create`, and makeScene builds a scene from a URL list.
const api = { VexyStax, loadScene, makeScene, createStax, create: createStax };

if (typeof window !== "undefined") {
  window.VexyStax = api;
}

// Also export `create` as a NAMED binding (alias of createStax): Vite's IIFE lib mode assigns
// `window.VexyStax = <module exports namespace>` AFTER this file runs, overwriting the `api`
// object above — so `create` must be a real export to survive on `window.VexyStax.create`
// (the lines-nano-style entry point used by the global demo).
export { VexyStax, loadScene, makeScene, createStax, createStax as create };
