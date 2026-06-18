#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
// this_file: vexy-stax-js/scripts/build-docs.mjs
//
// Build the deployable docs/ site for GitHub Pages at https://vexy.dev/vexy-stax-js/
// (issue 331 part 2). Copies the built dist bundles + source maps into docs/, copies
// the airbl-lores scene + slides, and writes a self-contained index.html demo that
// loads the <vexy-stax> element from the local bundle.
//
// Run via: npm run build:docs  (or directly: node scripts/build-docs.mjs)
// This is called by build.sh after `npm run build`.

import { mkdirSync, copyFileSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const JS_ROOT = resolve(HERE, ".."); // vexy-stax-js
const DIST = join(JS_ROOT, "dist");
const DOCS = join(JS_ROOT, "docs");
// GitHub Pages base path for this repo (used for the <base> tag in index.html)
const BASE_PATH = "/vexy-stax-js/";

// Shared testdata lives in the sibling py package (issue 320)
const PY_TESTDATA = resolve(JS_ROOT, "../vexy-stax-py/testdata");

const SLIDES = [
  "airbl-020-source.png",
  "airbl-030-pink.png",
  "airbl-040-stars.png",
  "airbl-050-backdrop.png",
  "airbl-060-outline.png",
  "airbl-070-inline.png",
  "airbl-080-halftone.png",
  "airbl-090-ui.png",
];

function cp(src, dst) {
  copyFileSync(src, dst);
  console.log(`  copy  ${dst.replace(JS_ROOT + "/", "")}`);
}

function write(dst, content) {
  writeFileSync(dst, content, "utf8");
  console.log(`  write ${dst.replace(JS_ROOT + "/", "")}`);
}

// ── 1. Ensure dist bundles exist ────────────────────────────────────────────
const elementBundle = join(DIST, "vexy-stax.element.js");
const globalBundle = join(DIST, "vexy-stax.global.js");
if (!existsSync(elementBundle) || !existsSync(globalBundle)) {
  console.error(
    "ERROR: dist bundles not found. Run `npm run build` first.\n" +
      `  expected: ${elementBundle}\n  expected: ${globalBundle}`
  );
  process.exit(1);
}

// ── 2. Create docs/ directory structure ─────────────────────────────────────
const slidesDir = join(DOCS, "airbl-lores");
mkdirSync(slidesDir, { recursive: true });
console.log("Building docs/ …");

// ── 3. Copy bundles + source maps ────────────────────────────────────────────
for (const f of [
  "vexy-stax.element.js",
  "vexy-stax.element.js.map",
  "vexy-stax.global.js",
  "vexy-stax.global.js.map",
]) {
  const src = join(DIST, f);
  if (existsSync(src)) cp(src, join(DOCS, f));
}

// ── 4. Copy scene JSON + slides ──────────────────────────────────────────────
cp(join(PY_TESTDATA, "airbl-lores.scene.json"), join(DOCS, "airbl-lores.scene.json"));
for (const name of SLIDES) {
  cp(join(PY_TESTDATA, "airbl-lores", name), join(slidesDir, name));
}

// ── 5. Write index.html ──────────────────────────────────────────────────────
const indexHtml = `<!doctype html>
<!-- this_file: vexy-stax-js/docs/index.html
     GitHub Pages landing page for https://vexy.dev/vexy-stax-js/
     Loads the built <vexy-stax> web component from the local bundle and shows
     a playable demo of the airbl example scene. Served as a static site —
     all assets (bundles, scene JSON, slides) are co-located in docs/. -->
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>vexy-stax-js — browser renderer for layered 3D glass plates</title>
    <base href="${BASE_PATH}" />
    <!-- Caption font: Zalando Sans Expanded wdth 125 / wght 500 (issue 328) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Zalando+Sans:wdth,wght@125,500&display=swap"
      rel="stylesheet"
    />
    <style>
      :root { color-scheme: light dark; }
      *, *::before, *::after { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; }
      body {
        display: flex; flex-direction: column; min-height: 100vh;
        font: 15px/1.6 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        color: #1c1c1e;
        background: radial-gradient(120% 120% at 50% 0%, #ffffff 0%, #e9ecf2 100%);
      }
      header {
        padding: 32px 24px 8px; text-align: center;
      }
      header h1 {
        margin: 0 0 6px; font-size: clamp(20px, 4vw, 32px); letter-spacing: -0.02em;
        font-weight: 700;
      }
      header p { margin: 0; color: #6b7280; font-size: 14px; }
      main {
        flex: 1; display: flex; align-items: center; justify-content: center;
        padding: 16px;
      }
      #stax {
        width: min(92vw, 880px, calc((100vh - 260px) * 1.546));
        aspect-ratio: 1246 / 806;
        height: auto;
        border-radius: 14px;
        background: #fff;
        overflow: hidden;
        box-shadow: 0 8px 40px rgba(17, 24, 39, 0.14);
      }
      .controls {
        display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;
        padding: 12px 16px 20px;
      }
      button {
        font: inherit; padding: 9px 20px; border: 1px solid #d1d5db; border-radius: 10px;
        background: #fff; color: #111; cursor: pointer;
        transition: background 0.15s, border-color 0.15s, color 0.15s;
      }
      button:hover { background: #f3f4f6; }
      button[aria-pressed="true"] { background: #111; color: #fff; border-color: #111; }
      footer {
        padding: 20px 24px; text-align: center; font-size: 12px; color: #9ca3af;
        border-top: 1px solid #e5e7eb;
      }
      footer a { color: inherit; text-decoration: underline; }
      .usage {
        max-width: 860px; margin: 0 auto; padding: 0 24px 32px;
      }
      .usage h2 { font-size: 16px; letter-spacing: -0.01em; margin: 24px 0 8px; }
      pre {
        background: #f3f4f6; border-radius: 8px; padding: 14px 16px;
        font-size: 13px; overflow-x: auto; margin: 0;
      }
      code { font-family: ui-monospace, "Cascadia Code", "Fira Mono", monospace; }
    </style>
  </head>
  <body>
    <header>
      <h1>vexy-stax-js</h1>
      <p>Browser renderer for layered 3D glass plates — ESM module · Web Component · Global script</p>
    </header>

    <main>
      <vexy-stax id="stax" scene="airbl-lores.scene.json" view="compact" mode="playable"></vexy-stax>
    </main>

    <div class="controls">
      <button id="play">▶ Play transition</button>
      <button id="compact" aria-pressed="true">Compact</button>
      <button id="expanded">Expanded</button>
    </div>

    <section class="usage">
      <h2>Web Component usage</h2>
      <pre><code>&lt;!-- Load the self-contained bundle (bundles three.js + gsap) --&gt;
&lt;script type="module" src="vexy-stax.element.js"&gt;&lt;/script&gt;

&lt;!-- Point at your scene JSON; view = "compact" | "expanded" --&gt;
&lt;vexy-stax scene="scene.json" view="compact" mode="playable"&gt;&lt;/vexy-stax&gt;</code></pre>

      <h2>ESM import usage</h2>
      <pre><code>import { VexyStax, loadScene } from "vexy-stax-js";

const scene = await loadScene("scene.json");
const stax = new VexyStax(container, scene);
await stax.setView("compact");

// Export a PNG
const png = await stax.toImage({ scale: 2 });

// Export a seekable mp4 (WebCodecs + mp4-muxer; issue 331)
const mp4 = await stax.toVideo({ kind: "expand_collapse" });</code></pre>

      <h2>Global script usage</h2>
      <pre><code>&lt;script src="vexy-stax.global.js"&gt;&lt;/script&gt;
&lt;script&gt;
  const stax = new VexyStax.VexyStax(el, scene);
&lt;/script&gt;</code></pre>
    </section>

    <footer>
      <a href="https://github.com/vexyart/vexy-stax-js">GitHub</a> ·
      Apache-2.0 © 2026 Adam Twardoch / VexyArt
    </footer>

    <!-- Load the web component from the co-located bundle -->
    <script type="module" src="vexy-stax.element.js"></script>
    <script type="module">
      const el = document.getElementById("stax");
      const playBtn = document.getElementById("play");
      const compactBtn = document.getElementById("compact");
      const expandedBtn = document.getElementById("expanded");

      const mark = (view) => {
        compactBtn.setAttribute("aria-pressed", String(view === "compact"));
        expandedBtn.setAttribute("aria-pressed", String(view === "expanded"));
      };

      // Adjust the stage box aspect ratio to match the loaded scene dimensions.
      fetch("airbl-lores.scene.json")
        .then((r) => r.json())
        .then((s) => {
          if (!s?.size?.width || !s?.size?.height) return;
          const ar = s.size.width / s.size.height;
          el.style.aspectRatio = s.size.width + " / " + s.size.height;
          el.style.width = "min(92vw, 880px, calc((100vh - 260px) * " + ar + "))";
        })
        .catch(() => {});

      playBtn.addEventListener("click", () => {
        mark(null);
        el.transition("expand_collapse");
      });
      compactBtn.addEventListener("click", () => {
        el.setView("compact");
        mark("compact");
      });
      expandedBtn.addEventListener("click", () => {
        el.setView("expanded");
        mark("expanded");
      });

      // Auto-expand once on first ready.
      el.addEventListener("ready", () => {
        mark(null);
        setTimeout(() => el.transition("expand"), 500);
        el.addEventListener("transitionend", () => mark("expanded"), { once: true });
      });
    </script>
  </body>
</html>
`;

write(join(DOCS, "index.html"), indexHtml);

// ── 6. Write a minimal README snippet in docs/ ───────────────────────────────
const readmeSnippet = `# vexy-stax-js — docs/

This directory is the GitHub Pages deployment root for https://vexy.dev/vexy-stax-js/

It is generated automatically by \`npm run build:docs\` (or \`build.sh\`).
Do not edit files here directly — re-run the build script instead.

## Contents

| File | Description |
|------|-------------|
| \`index.html\` | Landing page + playable demo (loads the local element bundle) |
| \`vexy-stax.element.js\` | Built Web Component bundle (bundles three.js + gsap) |
| \`vexy-stax.element.js.map\` | Source map for the element bundle |
| \`vexy-stax.global.js\` | Built global/IIFE bundle (window.VexyStax) |
| \`vexy-stax.global.js.map\` | Source map for the global bundle |
| \`airbl-lores.scene.json\` | Example scene (airbl demo, lores variant) |
| \`airbl-lores/\` | Slide PNGs for the airbl demo scene |
`;

write(join(DOCS, "README.md"), readmeSnippet);

console.log("\ndocs/ build complete.");
console.log("  Deploy docs/ to GitHub Pages with base path: " + BASE_PATH);
