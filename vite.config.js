// this_file: vite.config.js
//
// Two library outputs, one per build pass (selected by VEXY_BUILD env var so we
// can give each its own format without fighting Vite's single-format lib mode):
//   - VEXY_BUILD=element -> dist/vexy-stax.element.js (ESM, auto-registers
//     <vexy-stax> on import)
//   - VEXY_BUILD=global  -> dist/vexy-stax.global.js  (IIFE, exposes window.VexyStax)
// `three` and `gsap` are bundled in so a demo can load a single file.
//
// `npm run build` runs both passes (see package.json). Default (no env) builds
// the element so a bare `vite build` still produces something useful.

import { defineConfig } from "vite";

const TARGETS = {
  element: { entry: "src/element.js", format: "es", file: "vexy-stax.element.js" },
  global: { entry: "src/global.js", format: "iife", file: "vexy-stax.global.js" },
};

export default defineConfig(() => {
  const which = process.env.VEXY_BUILD === "global" ? "global" : "element";
  const t = TARGETS[which];
  return {
    build: {
      outDir: "dist",
      // Only the first pass clears dist; the second appends its file.
      emptyOutDir: which === "element",
      sourcemap: true,
      lib: {
        entry: t.entry,
        name: "VexyStax",
        formats: [t.format],
        fileName: () => t.file,
      },
    },
  };
});
