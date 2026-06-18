#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
// this_file: vexy-stax-js/scripts/build-docs.mjs
//
// Build the deployable docs/ site for GitHub Pages at https://vexy.dev/vexy-stax-js/
// (issues 331 part 2, 341). Produces:
//   - index.html         a LANDING PAGE → the live demos + the "how to use" demos + the docs
//   - playable.html      the animated demo (play/compact/expanded buttons)
//   - scrollable.html    the scroll-driven (scrollspy) demo
//   - demo-component.html the declarative <vexy-stax> element (attributes incl. `slides`)
//   - demo-module.html    the ESM `createStax(el, opts)` factory + makeScene
//   - demo-library.html   the global-script build (`window.VexyStax`)
//   - the dist bundles (+ maps), the demo scene JSONs and slide PNGs (co-located)
// The how-to demos (issue 341) are modeled on i.vexy.art/dev/lines-nano's side-by-side layout:
// the MINIMAL code on the left, the LIVE result on the right. Each documents BOTH the
// co-located local bundle AND the jsDelivr CDN URL (so users can drop it in without npm).
// All paths are relative so the site works both locally (serve docs/) and deployed
// under /vexy-stax-js/. The landing page links to the Python docs at vexy.dev/vexy-stax-py/.
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
const PY_DOCS_URL = "https://vexy.dev/vexy-stax-py/";
const REPO_URL = "https://github.com/vexyart/vexy-stax-js";

// Issue 341: read the published version from package.json so the documented jsDelivr CDN URLs
// always point at THIS release (no hard-coded version to drift). jsDelivr serves npm packages
// at cdn.jsdelivr.net/npm/<pkg>@<version>/<path>. The deployed docs keep loading the LOCAL
// co-located bundle (works offline + under /vexy-stax-js/); the CDN path is documented so a
// user can paste a single <script> tag with no build step.
const PKG = JSON.parse(readFileSync(join(JS_ROOT, "package.json"), "utf8"));
const VERSION = PKG.version;
const CDN_BASE = `https://cdn.jsdelivr.net/npm/vexy-stax-js@${VERSION}/dist`;
const CDN_ELEMENT = `${CDN_BASE}/vexy-stax.element.js`;
const CDN_GLOBAL = `${CDN_BASE}/vexy-stax.global.js`;

// highlight.js (atom-one-light) for the side-by-side code panes, matching the lines-nano demos.
const HLJS_CSS = `    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/atom-one-light.min.css" />`;
const HLJS_JS = `    <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>`;

// Shared side-by-side "minimal code + live element" demo CSS (modeled on lines-nano).
const DEMO_CSS = `      :root { color-scheme: light dark; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font: 15px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #202226; background: #f4f4f5; }
      header { padding: 20px 24px; }
      header h1 { font-size: 18px; font-weight: 700; }
      header p { color: #6b7280; font-size: 13px; }
      header a { color: #2563eb; text-decoration: none; }
      .cdn { margin: 0 24px 14px; padding: 10px 14px; background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 10px; font-size: 12.5px; color: #3730a3; }
      .cdn code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; word-break: break-all; }
      .example { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); margin: 0 24px 18px; background: #fff; border-radius: 14px; box-shadow: 0 8px 28px rgba(15,23,42,.08); overflow: hidden; }
      .example .head { grid-column: 1 / -1; padding: 11px 16px; font-size: 13px; font-weight: 600; border-bottom: 1px solid #eef0f2; }
      .example .code { overflow: auto; border-right: 1px solid #eef0f2; background: #fafafa; }
      .example pre { margin: 0; }
      .example pre code { font: 12px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace; padding: 16px !important; display: block; }
      .example .stage { position: relative; min-height: 320px; background: #fff; }
      .example vexy-stax, .example .stage > * { display: block; width: 100%; height: 100%; min-height: 320px; }
      @media (max-width: 760px) { .example { grid-template-columns: 1fr; } .example .code { border-right: 0; border-bottom: 1px solid #eef0f2; } }`;

/** HTML-escape a code snippet for a <code> block. */
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

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

// Shared Google-Fonts head snippet for the caption face (issue 328).
const FONT_LINK = `    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Zalando+Sans:wdth,wght@125,500&display=swap"
      rel="stylesheet"
    />`;

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

// ── 2. Create docs/ structure ───────────────────────────────────────────────
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

// ── 4. Scene JSONs + slides ──────────────────────────────────────────────────
// The demo scenes are EDITABLE SOURCE files committed under `demo-scenes/`. build-docs COPIES
// them into docs/ — it does NOT regenerate them — so HAND EDITS PERSIST across builds. (They were
// previously generated from the shared py testdata on every build, which silently overwrote edits.)
// On a fresh checkout where a source is missing, it is SEEDED once from the py testdata with the
// default clean floor (invisible white pane + faint reflections), then copied. Edit the files in
// `vexy-stax-js/demo-scenes/` to customize a demo scene; the slides are still copied from testdata.
const SCENES_DIR = join(JS_ROOT, "demo-scenes");
mkdirSync(SCENES_DIR, { recursive: true });
const cleanFloor = { color: "#ffffff", opacity: 0.0, reflectivity: 0.1 };
for (const sceneName of ["airbl-demo.scene.json", "airbl-scrollable.scene.json"]) {
  const srcScene = join(SCENES_DIR, sceneName);
  if (!existsSync(srcScene)) {
    const base = JSON.parse(readFileSync(join(PY_TESTDATA, "airbl-lores.scene.json"), "utf8"));
    write(srcScene, JSON.stringify({ ...base, floor: { ...cleanFloor } }, null, 2));
  }
  cp(srcScene, join(DOCS, sceneName)); // copy the editable source → docs/ (never clobbers edits)
}

for (const name of SLIDES) {
  cp(join(PY_TESTDATA, "airbl-lores", name), join(slidesDir, name));
}

// ── 5. index.html — the LANDING PAGE (issue 341) ─────────────────────────────
const landingHtml = `<!doctype html>
<!-- this_file: vexy-stax-js/docs/index.html
     GitHub Pages LANDING PAGE for https://vexy.dev/vexy-stax-js/ (issue 341).
     Points at the two live demos (animated + scrollspy) and the Python docs, with
     install/usage snippets. The demos live on their own pages (playable.html,
     scrollable.html) so the landing page itself stays light. Static — all assets
     are co-located; paths are relative so it works locally and under /vexy-stax-js/. -->
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>vexy-stax-js — browser renderer for layered 3D glass plates</title>
${FONT_LINK}
    <style>
      :root { color-scheme: light dark; }
      *, *::before, *::after { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; }
      body {
        display: flex; flex-direction: column; min-height: 100vh;
        font: 16px/1.6 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        color: #1c1c1e;
        background: radial-gradient(120% 120% at 50% 0%, #ffffff 0%, #eef1f6 100%);
      }
      header { padding: 56px 24px 8px; text-align: center; }
      header h1 {
        margin: 0 0 10px; font-size: clamp(28px, 6vw, 52px); letter-spacing: -0.02em; font-weight: 800;
      }
      header p { margin: 0 auto; max-width: 56ch; color: #5b616e; font-size: clamp(15px, 2.4vw, 18px); }
      main { flex: 1; width: 100%; max-width: 980px; margin: 0 auto; padding: 28px 24px 8px; }
      .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; }
      .card {
        display: flex; flex-direction: column; gap: 8px; padding: 22px 22px 20px;
        background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; text-decoration: none;
        color: inherit; box-shadow: 0 6px 24px rgba(17, 24, 39, 0.06);
        transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
      }
      .card:hover { transform: translateY(-3px); box-shadow: 0 12px 34px rgba(17, 24, 39, 0.12); border-color: #c7cdd6; }
      .card .ico { font-size: 26px; }
      .card h2 { margin: 2px 0 0; font-size: 18px; letter-spacing: -0.01em; }
      .card p { margin: 0; color: #6b7280; font-size: 14px; }
      .card .go { margin-top: auto; padding-top: 8px; font-size: 13px; color: #2563eb; font-weight: 600; }
      .usage { max-width: 980px; margin: 0 auto; padding: 8px 24px 36px; }
      .usage h2 { font-size: 16px; letter-spacing: -0.01em; margin: 26px 0 8px; }
      pre { background: #0f172a; color: #e2e8f0; border-radius: 10px; padding: 14px 16px; font-size: 13px; overflow-x: auto; margin: 0; }
      code { font-family: ui-monospace, "Cascadia Code", "Fira Mono", monospace; }
      footer { padding: 22px 24px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
      footer a { color: inherit; text-decoration: underline; }
    </style>
  </head>
  <body>
    <header>
      <h1>vexy-stax-js</h1>
      <p>Browser renderer for layered artwork as a deck of 3D glass plates — compact ↔ expanded morph, scroll-driven, exportable. ESM module · Web Component · Global script.</p>
    </header>

    <main>
      <div class="cards">
        <a class="card" href="playable.html">
          <div class="ico">▶</div>
          <h2>Animated demo</h2>
          <p>Play the compact ↔ expanded transition, or toggle the two views by hand.</p>
          <span class="go">Open demo →</span>
        </a>
        <a class="card" href="scrollable.html">
          <div class="ico">↓</div>
          <h2>Scrollspy demo</h2>
          <p>A scroll-driven story — the deck rises into view and unfolds as you scroll.</p>
          <span class="go">Open demo →</span>
        </a>
        <a class="card" href="${PY_DOCS_URL}">
          <div class="ico">📖</div>
          <h2>Documentation</h2>
          <p>Concept, the shared scene format, the CLI, the engines and the JS/Python APIs.</p>
          <span class="go">Read the docs →</span>
        </a>
      </div>

      <h2 style="margin:34px 0 12px; font-size:16px; letter-spacing:-0.01em;">Use it — three ways</h2>
      <div class="cards">
        <a class="card" href="demo-component.html">
          <div class="ico">&lt;/&gt;</div>
          <h2>Web Component</h2>
          <p><code>&lt;vexy-stax slides="a.png b.png"&gt;</code> — pure markup, no JS. Minimal code beside the live element.</p>
          <span class="go">Open demo →</span>
        </a>
        <a class="card" href="demo-module.html">
          <div class="ico">📦</div>
          <h2>ES Module</h2>
          <p><code>createStax(el, { slides })</code> — one call mounts a ready instance from a URL list.</p>
          <span class="go">Open demo →</span>
        </a>
        <a class="card" href="demo-library.html">
          <div class="ico">🌐</div>
          <h2>Global script</h2>
          <p>One classic <code>&lt;script&gt;</code> → <code>window.VexyStax.create(...)</code>. No bundler.</p>
          <span class="go">Open demo →</span>
        </a>
      </div>
    </main>

    <section class="usage">
      <h2>Install</h2>
      <pre><code>npm install vexy-stax-js
# …or skip the build step entirely — load it from the jsDelivr CDN:
# &lt;script type="module" src="${CDN_ELEMENT}"&gt;&lt;/script&gt;</code></pre>

      <h2>Web Component — just a list of slides</h2>
      <pre><code>&lt;script type="module" src="${CDN_ELEMENT}"&gt;&lt;/script&gt;
&lt;vexy-stax
  slides="layer-0.png layer-1.png https://example.com/layer-2.png"
  view="compact" mode="playable"&gt;&lt;/vexy-stax&gt;</code></pre>

      <h2>ES Module — createStax</h2>
      <pre><code>import { createStax } from "${CDN_ELEMENT}";

// One call: build a scene from a URL list, mount, wait for ready.
const stax = await createStax("#stage", {
  slides: ["layer-0.png", "https://example.com/layer-1.png"],
  gap: 480, transition: "expand_collapse", mode: "playable",
});
const mp4 = await stax.toVideo(); // seekable mp4</code></pre>

      <h2>Global script — window.VexyStax</h2>
      <pre><code>&lt;script src="${CDN_GLOBAL}"&gt;&lt;/script&gt;
&lt;script&gt;
  VexyStax.create("#stage", { slides: ["a.png", "b.png", "c.png"] });
&lt;/script&gt;</code></pre>
    </section>

    <footer>
      <a href="${REPO_URL}">GitHub</a> ·
      <a href="${PY_DOCS_URL}">Docs</a> ·
      Apache-2.0 © 2026 Adam Twardoch / VexyArt
    </footer>
  </body>
</html>
`;
write(join(DOCS, "index.html"), landingHtml);

// ── 6. playable.html — the ANIMATED demo ─────────────────────────────────────
const playableHtml = `<!doctype html>
<!-- this_file: vexy-stax-js/docs/playable.html
     Animated demo (issue 341): loads the <vexy-stax> element and plays the compact↔expanded
     transition. Uses a clean-floor scene variant. Static; relative paths. -->
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>vexy-stax-js — animated demo</title>
${FONT_LINK}
    <style>
      :root { color-scheme: light dark; }
      *, *::before, *::after { box-sizing: border-box; }
      html, body { height: 100%; margin: 0; }
      body {
        display: flex; flex-direction: column; min-height: 100vh;
        font: 15px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #1c1c1e;
        background: radial-gradient(120% 120% at 50% 0%, #ffffff 0%, #e9ecf2 100%);
      }
      header { padding: 18px 24px 6px; text-align: center; }
      header a { color: #2563eb; text-decoration: none; font-size: 13px; }
      h1 { margin: 6px 0 4px; font-size: 19px; letter-spacing: -0.01em; }
      header p { margin: 0; color: #6b7280; font-size: 13px; }
      main { flex: 1; display: flex; align-items: center; justify-content: center; padding: 16px; }
      #stax {
        width: min(92vw, 880px, calc((100vh - 220px) * 1.546)); aspect-ratio: 1246 / 806; height: auto;
        border-radius: 14px; background: #fff; overflow: hidden; box-shadow: 0 8px 36px rgba(17, 24, 39, 0.16);
      }
      .controls { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; padding: 14px 16px 26px; }
      button {
        font: inherit; padding: 9px 18px; border: 1px solid #d1d5db; border-radius: 10px;
        background: #fff; color: #111; cursor: pointer; transition: background .15s, border-color .15s, color .15s;
      }
      button:hover { background: #f3f4f6; }
      button[aria-pressed="true"] { background: #111; color: #fff; border-color: #111; }
    </style>
  </head>
  <body>
    <header>
      <a href="index.html">← vexy-stax-js</a>
      <h1>Animated demo</h1>
      <p>Morph the layered deck between its <strong>compact</strong> and <strong>expanded</strong> views.</p>
    </header>
    <main>
      <vexy-stax id="stax" scene="airbl-demo.scene.json" view="compact" mode="playable"></vexy-stax>
    </main>
    <div class="controls">
      <button id="play">▶ Play transition</button>
      <button id="compact" aria-pressed="true">Compact</button>
      <button id="expanded">Expanded</button>
    </div>
    <script type="module" src="vexy-stax.element.js"></script>
    <script type="module">
      const el = document.getElementById("stax");
      const play = document.getElementById("play");
      const compact = document.getElementById("compact");
      const expanded = document.getElementById("expanded");
      const mark = (view) => {
        compact.setAttribute("aria-pressed", String(view === "compact"));
        expanded.setAttribute("aria-pressed", String(view === "expanded"));
      };
      fetch("airbl-demo.scene.json").then((r) => r.json()).then((s) => {
        if (!s?.size?.width || !s?.size?.height) return;
        const ar = s.size.width / s.size.height;
        el.style.aspectRatio = s.size.width + " / " + s.size.height;
        el.style.width = "min(92vw, 880px, calc((100vh - 220px) * " + ar + "))";
      }).catch(() => {});
      play.addEventListener("click", () => { mark(null); el.transition("expand_collapse"); });
      compact.addEventListener("click", () => { el.setView("compact"); mark("compact"); });
      expanded.addEventListener("click", () => { el.setView("expanded"); mark("expanded"); });
      el.addEventListener("ready", () => {
        mark(null);
        setTimeout(() => el.transition("expand"), 450);
        el.addEventListener("transitionend", () => mark("expanded"), { once: true });
      });
    </script>
  </body>
</html>
`;
write(join(DOCS, "playable.html"), playableHtml);

// ── 7. scrollable.html — the SCROLLSPY demo (mirrors verify/example.mjs) ──────
const scrollableHtml = `<!doctype html>
<!-- this_file: vexy-stax-js/docs/scrollable.html
     Scroll-driven (scrollspy) demo (issues 304.2 + 314 + 341): a full-viewport intro, the
     deck as a FULL-WIDTH 2:1 white scene, then an outro. The deck starts COMPACT; the
     transition starts when 75% of the scene is in view and reaches fully EXPANDED when the
     scene CENTER hits the TOP of the viewport, then LATCHES. Clean floor. Static; relative. -->
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>vexy-stax-js — scrollspy demo</title>
${FONT_LINK}
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; background: #ffffff; }
      body { font: 16px/1.6 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #1c1c1e; }
      .back { position: fixed; top: 14px; left: 16px; z-index: 10; color: #2563eb; text-decoration: none; font-size: 13px; }
      .copy { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; gap: 12px; padding: 0 24px; }
      .copy h1 { font-size: clamp(28px, 6vw, 64px); margin: 0; letter-spacing: -0.02em; }
      .copy p { max-width: 46ch; margin: 0; color: #555; }
      .hint { font-size: 13px; color: #8a8a8a; }
      /* Full-width, 60vh-tall stage (user request) — short + wide; the camera fits the deck to
         this live aspect, so the morph framing follows the container, not the scene aspect. */
      #stax { display: block; width: 100vw; height: 60vh; background: #ffffff; }
    </style>
  </head>
  <body>
    <a class="back" href="index.html">← vexy-stax-js</a>
    <section class="copy">
      <h1>Scroll down</h1>
      <p>A layered deck of glass plates. Keep scrolling — it will rise into view and unfold.</p>
      <p class="hint">↓</p>
    </section>

    <!-- Issue 343: built-in control buttons (single relabeling toggle) — bottom-centered frosted pill. -->
    <vexy-stax id="stax" scene="airbl-scrollable.scene.json" view="compact" mode="static" buttons="toggle"></vexy-stax>

    <section class="copy">
      <h1>Layer by layer</h1>
      <p>Once unfolded the deck stays expanded — keep scrolling to read on.</p>
      <p class="hint">Tip: click the deck to fluently toggle compact↔expanded — it works on top of the scroll (issue 342).</p>
    </section>

    <script type="module" src="vexy-stax.element.js"></script>
    <script type="module">
      const el = document.getElementById("stax");
      const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
      let ready = false;
      let animating = false; // true while a click-toggle leg is playing
      let hold = null;       // 0|1 when a click set a manual state; null = scroll drives
      // Absolute scroll→morph: the deck starts unfolding when 75% of the scene is in view and is
      // fully expanded when the scene CENTER reaches the top of the viewport.
      const scrollT = () => {
        const r = el.getBoundingClientRect();
        const h = r.height, vh = window.innerHeight;
        if (h <= 0) return 0;
        const startTop = vh - 0.75 * h, endTop = -h / 2;
        return ease(Math.max(0, Math.min(1, (startTop - r.top) / (startTop - endTop))));
      };
      const update = () => {
        if (!ready || animating) return; // never fight the click-toggle animation
        const t = scrollT();
        if (hold !== null) {
          // Issue 342: a click toggled the deck; KEEP that state until the scroll position
          // reaches the same endpoint, then hand control back to scroll seamlessly — so the deck
          // does NOT snap back to the scroll-derived value right after a click.
          if (hold === 1 ? t >= 0.999 : t <= 0.001) hold = null;
          else return;
        }
        el.seek(t);
      };
      // A click fluently toggles compact↔expanded ON TOP of the scroll. Suppress the scroll seek
      // while the toggle plays, then hold the toggled state (see update()).
      el.addEventListener("transitionstart", () => { animating = true; });
      el.addEventListener("transitionend", () => {
        animating = false;
        hold = (el.instance && el.instance._currentView === "compact") ? 0 : 1;
      });
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update, { passive: true });
      const go = () => { ready = true; update(); };
      el.addEventListener("ready", go, { once: true });
      setTimeout(go, 1500);
    </script>
  </body>
</html>
`;
write(join(DOCS, "scrollable.html"), scrollableHtml);

// ── 7b. The three "how to use" demos (issue 341, modeled on lines-nano) ───────
// A 4-slide subset (small + fast) drives the how-to demos, referenced by relative path
// (airbl-lores/…). One example per page also references a slide by an ABSOLUTE URL to show
// the remote-URL path, but kept relative-safe (the absolute build of the same co-located
// file) so the demos still pass headless offline. The CDN banner documents the drop-in URL.
const DEMO_SLIDES = SLIDES.slice(0, 4).map((n) => `airbl-lores/${n}`);
const DEMO_SIZE = { width: 1246, height: 806 }; // matches the airbl scene aspect

const cdnBanner = (file) =>
  `    <div class="cdn">Drop-in CDN (no build step): <code>${file}</code> — these pages load the co-located local bundle, but the same code works verbatim from jsDelivr.</div>`;

// — demo-component.html : declarative <vexy-stax> with attributes (incl. `slides`) —
const componentSlides = DEMO_SLIDES.join(" ");
const componentDemoHtml = `<!doctype html>
<!-- this_file: vexy-stax-js/docs/demo-component.html
     Declarative Web Component demo (issue 341): minimal markup on the left, the live
     <vexy-stax> element on the right (modeled on i.vexy.art/dev/lines-nano/demo-component.html).
     Shows the issue-341 \`slides\` attribute (a bare URL list) plus \`scene\`, \`view\`, \`mode\`.
     Loads the co-located local bundle; the same markup works from the jsDelivr CDN. -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vexy-stax-js — Web Component demo</title>
${HLJS_CSS}
${FONT_LINK}
    <style>
${DEMO_CSS}
    </style>
    <script type="module" src="vexy-stax.element.js"></script>
  </head>
  <body>
    <header>
      <h1>vexy-stax-js — &lt;vexy-stax&gt;</h1>
      <p>Declarative custom element — minimal markup on the left, the live element on the right. <strong>Tip:</strong> click any deck to fluently toggle compact↔expanded (on by default; opt out with <code>click-toggle="false"</code>). <a href="index.html">← all demos</a></p>
    </header>
${cdnBanner(`&lt;script type="module" src="${CDN_ELEMENT}"&gt;&lt;/script&gt;`)}

    <div class="example">
      <div class="head">Easiest: a list of slide URLs (the <code>slides</code> attribute)</div>
      <div class="code"><pre><code class="language-html">${esc(`<vexy-stax
  slides="${DEMO_SLIDES.join("\n          ")}"
  view="compact"
  mode="playable">
</vexy-stax>`)}</code></pre></div>
      <div class="stage">
        <vexy-stax slides="${componentSlides}" view="compact" mode="playable"></vexy-stax>
      </div>
    </div>

    <div class="example">
      <div class="head">Captions on, expanded view (static)</div>
      <div class="code"><pre><code class="language-html">${esc(`<vexy-stax
  scene="airbl-demo.scene.json"
  view="expanded"
  mode="static">
</vexy-stax>`)}</code></pre></div>
      <div class="stage">
        <vexy-stax scene="airbl-demo.scene.json" view="expanded" mode="static"></vexy-stax>
      </div>
    </div>

    <div class="example">
      <div class="head">Scene URL + playable transition</div>
      <div class="code"><pre><code class="language-html">${esc(`<vexy-stax
  scene="airbl-demo.scene.json"
  view="compact"
  mode="playable">
</vexy-stax>`)}</code></pre></div>
      <div class="stage">
        <vexy-stax scene="airbl-demo.scene.json" view="compact" mode="playable"></vexy-stax>
      </div>
    </div>

    <div class="example">
      <div class="head">Issue 343: a built-in toggle button (relabels Explain ⇄ Preview)</div>
      <div class="code"><pre><code class="language-html">${esc(`<vexy-stax
  scene="airbl-demo.scene.json"
  view="compact"
  buttons="toggle">
</vexy-stax>`)}</code></pre></div>
      <div class="stage">
        <vexy-stax scene="airbl-demo.scene.json" view="compact" buttons="toggle"></vexy-stax>
      </div>
    </div>

    <div class="example">
      <div class="head">A pair of buttons, custom labels + position + theme (<code>--vexy-btn-*</code>)</div>
      <div class="code"><pre><code class="language-html">${esc(`<vexy-stax
  scene="airbl-demo.scene.json" view="compact"
  buttons="pair"
  explain-label="Break apart" preview-label="Reassemble"
  buttons-position="top"
  style="--vexy-btn-color:#fff;
         --vexy-btn-bg:rgba(0,0,0,0.45);
         --vexy-btn-blur:14px">
</vexy-stax>`)}</code></pre></div>
      <div class="stage">
        <vexy-stax scene="airbl-demo.scene.json" view="compact"
          buttons="pair" explain-label="Break apart" preview-label="Reassemble" buttons-position="top"
          style="--vexy-btn-color:#fff;--vexy-btn-bg:rgba(0,0,0,0.45);--vexy-btn-blur:14px"></vexy-stax>
      </div>
    </div>
${HLJS_JS}
  </body>
</html>
`;
write(join(DOCS, "demo-component.html"), componentDemoHtml);

// — demo-module.html : ESM createStax(el, opts) + makeScene —
const moduleDemoHtml = `<!doctype html>
<!-- this_file: vexy-stax-js/docs/demo-module.html
     ESM factory demo (issue 341): \`createStax(el, opts)\` — one call builds a scene from a
     URL list (via makeScene), mounts a VexyStax, and returns the ready instance. Modeled on
     i.vexy.art/dev/lines-nano/demo-module.html (createNano). Minimal source on the left, the
     live result on the right. Imports the co-located bundle; the import works from the CDN. -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vexy-stax-js — ES Module demo</title>
${HLJS_CSS}
${FONT_LINK}
    <style>
${DEMO_CSS}
    </style>
  </head>
  <body>
    <header>
      <h1>vexy-stax-js — ES Module</h1>
      <p><code>import { createStax }</code> — each example shows its minimal source on the left and the live result on the right. <a href="index.html">← all demos</a></p>
    </header>
${cdnBanner(`import { createStax } from "${CDN_ELEMENT}";`)}

    <div class="example">
      <div class="head">Minimal — a list of slides</div>
      <div class="code"><pre><code class="language-javascript">${esc(`import { createStax } from
  "${CDN_ELEMENT}";

await createStax(el, {
  slides: [
    "${DEMO_SLIDES[0]}",
    "${DEMO_SLIDES[1]}",
    "${DEMO_SLIDES[2]}",
    "${DEMO_SLIDES[3]}",
  ],
  view: "compact",
});`)}</code></pre></div>
      <div class="stage" id="stage-min"></div>
    </div>

    <div class="example">
      <div class="head">Playable — gap + transition kind</div>
      <div class="code"><pre><code class="language-javascript">${esc(`const stax = await createStax(el, {
  slides: [/* … */],
  gap: 480,
  transition: "expand_collapse",
  mode: "playable",     // plays the transition once when ready
});`)}</code></pre></div>
      <div class="stage" id="stage-play"></div>
    </div>

    <div class="example">
      <div class="head">Inline scene OBJECT — no URL, no fetch (issue 342)</div>
      <div class="code"><pre><code class="language-javascript">${esc(`// Pass a full scene object straight into createStax (scene-in-init):
await createStax(el, {
  scene: {
    version: 1,
    size: { width: 1246, height: 806 },
    slides: [
      { src: "${DEMO_SLIDES[0]}", caption: { text: "Source" } },
      { src: "${DEMO_SLIDES[1]}" },
    ],
  },
  view: "expanded",
});`)}</code></pre></div>
      <div class="stage" id="stage-scene"></div>
    </div>

    <div class="example">
      <div class="head">Click to toggle + imperative API</div>
      <div class="code"><pre><code class="language-javascript">${esc(`// Click-to-toggle is ON by default — clicking the deck fluently
// toggles compact↔expanded. (Opt out with clickToggle: false.)
const stax = await createStax(el, { slides: [/* … */] });

// …or drive it by hand:
await stax.toggleView();          // fluent compact↔expanded
await stax.transition("collapse_expand");`)}</code></pre></div>
      <div class="stage" id="stage-api"></div>
    </div>

    <script type="module">
      import { createStax } from "./vexy-stax.element.js";
      const SLIDES = ${JSON.stringify(DEMO_SLIDES)};
      const SIZE = ${JSON.stringify(DEMO_SIZE)};

      await createStax(document.getElementById("stage-min"), {
        slides: SLIDES, size: SIZE, view: "compact",
      });

      await createStax(document.getElementById("stage-play"), {
        slides: SLIDES, size: SIZE, gap: 480, transition: "expand_collapse", mode: "playable",
      });

      // Inline scene OBJECT (scene-in-init): no URL, built straight from the object.
      await createStax(document.getElementById("stage-scene"), {
        scene: {
          version: 1,
          size: SIZE,
          slides: [{ src: SLIDES[0] }, { src: SLIDES[1] }, { src: SLIDES[2] }],
        },
        view: "expanded",
      });

      // Click-to-toggle is on by default here — click the deck to fold/unfold it.
      await createStax(document.getElementById("stage-api"), {
        slides: SLIDES, size: SIZE, view: "compact",
      });
    </script>
${HLJS_JS}
  </body>
</html>
`;
write(join(DOCS, "demo-module.html"), moduleDemoHtml);

// — demo-library.html : the global-script build (window.VexyStax) —
const libraryDemoHtml = `<!doctype html>
<!-- this_file: vexy-stax-js/docs/demo-library.html
     Global-script demo (issue 341): one classic <script> exposes window.VexyStax, and
     \`VexyStax.create(el, opts)\` mounts a deck from a slide-URL list. Modeled on
     i.vexy.art/dev/lines-nano/demo-library.html. Loads the co-located IIFE bundle; the same
     tag works from the jsDelivr CDN. -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vexy-stax-js — global library demo</title>
${HLJS_CSS}
${FONT_LINK}
    <style>
${DEMO_CSS}
    </style>
    <!-- Traditional global script: one classic <script> tag, no module type. -->
    <script src="vexy-stax.global.js"></script>
  </head>
  <body>
    <header>
      <h1>vexy-stax-js — traditional library</h1>
      <p>One classic <code>&lt;script&gt;</code> exposes <code>window.VexyStax</code>. <a href="index.html">← all demos</a></p>
    </header>
${cdnBanner(`&lt;script src="${CDN_GLOBAL}"&gt;&lt;/script&gt;`)}

    <div class="example">
      <div class="head">Global script → window.VexyStax.create</div>
      <div class="code"><pre><code class="language-html">${esc(`<script src="${CDN_GLOBAL}"></script>

<div id="stage"></div>

<script>
  VexyStax.create(stage, {
    slides: [
      "${DEMO_SLIDES[0]}",
      "${DEMO_SLIDES[1]}",
      "${DEMO_SLIDES[2]}",
      "${DEMO_SLIDES[3]}",
    ],
    view: "compact",
    mode: "playable",
  }).then(function (stax) {
    console.log("ready", stax.scene.slides.length);
  });
</script>`)}</code></pre></div>
      <div class="stage" id="stage"></div>
    </div>

    <script>
      VexyStax.create(document.getElementById("stage"), {
        slides: ${JSON.stringify(DEMO_SLIDES)},
        size: ${JSON.stringify(DEMO_SIZE)},
        view: "compact",
        mode: "playable",
      }).then(function (stax) {
        console.log("[demo-library] ready", stax.scene.slides.length);
      }).catch(function (e) { console.error(e); });
    </script>
${HLJS_JS}
  </body>
</html>
`;
write(join(DOCS, "demo-library.html"), libraryDemoHtml);

// ── 8. README ────────────────────────────────────────────────────────────────
write(
  join(DOCS, "README.md"),
  `# vexy-stax-js — docs/

GitHub Pages deployment root for https://vexy.dev/vexy-stax-js/ (issue 341).
Generated by \`npm run build:docs\` (or \`build.sh\`). Do not edit directly — re-run the build.

| File | Description |
|------|-------------|
| \`index.html\` | Landing page → links to the demos + the Python docs |
| \`playable.html\` | Animated demo (compact ↔ expanded) |
| \`scrollable.html\` | Scroll-driven (scrollspy) demo |
| \`demo-component.html\` | How-to: the declarative \`<vexy-stax>\` element (incl. the \`slides\` attribute) |
| \`demo-module.html\` | How-to: the ESM \`createStax(el, opts)\` factory |
| \`demo-library.html\` | How-to: the global-script build (\`window.VexyStax.create\`) |
| \`vexy-stax.element.js\` (+ \`.map\`) | Built Web Component bundle (three.js + gsap) |
| \`vexy-stax.global.js\` (+ \`.map\`) | Built global/IIFE bundle (\`window.VexyStax\`) |
| \`airbl-demo.scene.json\` / \`airbl-scrollable.scene.json\` | Demo scenes (clean floor) |
| \`airbl-lores/\` | Slide PNGs |

The demos load the **co-located** bundle, but each also documents the **jsDelivr CDN** drop-in:
\`${CDN_ELEMENT}\` (Web Component / ESM) and \`${CDN_GLOBAL}\` (global script) — pinned to v${VERSION}.
`
);

console.log(
  "\ndocs/ build complete (landing + playable + scrollable + demo-component/module/library).\n" +
    `  CDN documented: ${CDN_ELEMENT}`
);
