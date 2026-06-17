// SPDX-License-Identifier: Apache-2.0
// this_file: vexy-stax-js/verify/example.mjs
//
// Example/demo driver for example.sh. Headless (installed chromium via Playwright)
// it serves the package root over HTTP (so three.js loads the airbl PNG textures +
// the scene JSON without file:// CORS), opens verify/example-harness.html, and exercises
// ALL implemented JS render technologies against the built <vexy-stax> element +
// this repo's testdata scene, writing artifacts into vexy-stax-js/outputs/:
//
//   1. IMAGE     toImage() PNG of compact AND expanded (+ a single side-by-side PNG)
//   2. VIDEO     toVideo() of the transition, saved to a .webm file
//   3. PLAYABLE  self-contained playable.html (built element + scene + slides copied
//                in) that plays the transition on a button when served
//   4. SCROLLSPY top (compact) + bottom (expanded) frames captured by driving the
//                REAL scrollspy with page scroll, saved as PNGs
//
// A separate PIL/numpy gate (verify/example_gate.py) decodes the PNGs and asserts
// non-blank (std > 30) and scrollspy top ≠ bottom. This driver only produces the
// artifacts and prints a size summary.

import { writeFileSync, mkdirSync, copyFileSync, readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { startServer, REPO_ROOT } from "./server.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const JS_ROOT = resolve(HERE, ".."); // vexy-stax-js
const PY_TESTDATA = resolve(HERE, "../../vexy-stax-py/testdata"); // shared testdata (issue 320)
const OUT_DIR = resolve(JS_ROOT, "outputs");
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

function b64ToBuffer(b64) {
  return Buffer.from(b64, "base64");
}
function dataUrlToBuffer(dataUrl) {
  return Buffer.from(dataUrl.slice(dataUrl.indexOf(",") + 1), "base64");
}

/** Copy the built element bundle, scene, and slides into outputs/ for playable.html. */
function buildPlayableArtifact() {
  const slidesDir = join(OUT_DIR, "airbl-lores");
  mkdirSync(slidesDir, { recursive: true });

  // Built element bundle (bundles three.js + gsap → single file, no bare specifiers).
  copyFileSync(
    join(JS_ROOT, "dist", "vexy-stax.element.js"),
    join(OUT_DIR, "vexy-stax.element.js")
  );

  // Scene JSON — use the shared py testdata lores scene (issue 320).
  copyFileSync(
    join(PY_TESTDATA, "airbl-lores.scene.json"),
    join(OUT_DIR, "airbl.scene.json")
  );

  // Slides (copy the in-repo PNG bytes into the playable bundle).
  for (const name of SLIDES) {
    const src = join(PY_TESTDATA, "airbl-lores", name);
    writeFileSync(join(slidesDir, name), readFileSync(src));
  }

  const html = `<!doctype html>
<!-- this_file: vexy-stax-js/outputs/playable.html
     Self-contained playable demo: loads the built <vexy-stax> element + the airbl
     scene (slides copied alongside) and plays the deck transition. Responsive — the
     stage is locked to the scene's aspect ratio so the 3D framing never distorts.
     Serve this folder over HTTP (e.g. \`python3 -m http.server\`) to avoid file://
     texture CORS, then open playable.html. -->
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>vexy-stax — playable demo</title>
    <style>
      :root { color-scheme: light dark; }
      * { box-sizing: border-box; }
      html, body { height: 100%; }
      body {
        margin: 0; min-height: 100%; display: flex; flex-direction: column;
        font: 15px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #1c1c1e;
        background: radial-gradient(120% 120% at 50% 0%, #ffffff 0%, #e9ecf2 100%);
      }
      header { padding: 22px 24px 6px; text-align: center; }
      h1 { margin: 0 0 4px; font-size: 19px; letter-spacing: -0.01em; }
      header p { margin: 0; color: #6b7280; font-size: 13px; }
      main { flex: 1; display: flex; align-items: center; justify-content: center; padding: 16px; }
      /* aspect-ratio (and the height-fit cap) are refined from the scene size on load;
         these 1246:806 (~1.546) fallbacks fit the box within BOTH the available width
         and height while preserving the scene aspect, so the canvas never distorts. */
      #stax {
        width: min(92vw, 880px, calc((100vh - 200px) * 1.546)); aspect-ratio: 1246 / 806; height: auto;
        border-radius: 12px; background: #fff; overflow: hidden;
        box-shadow: 0 8px 36px rgba(17, 24, 39, 0.16);
      }
      .controls { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; padding: 14px 16px 26px; }
      button {
        font: inherit; padding: 9px 18px; border: 1px solid #d1d5db; border-radius: 9px;
        background: #fff; color: #111; cursor: pointer; transition: background .15s, border-color .15s, color .15s;
      }
      button:hover { background: #f3f4f6; }
      button[aria-pressed="true"] { background: #111; color: #fff; border-color: #111; }
    </style>
  </head>
  <body>
    <header>
      <h1>vexy-stax — playable demo</h1>
      <p>Morph the layered deck between its <strong>compact</strong> and <strong>expanded</strong> views.</p>
    </header>
    <main>
      <vexy-stax id="stax" scene="airbl.scene.json" view="compact" mode="playable"></vexy-stax>
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
      // Lock the stage box to the scene's aspect ratio so the canvas (and thus the
      // camera framing) is never letterboxed/stretched, whatever the viewport size.
      fetch("airbl.scene.json")
        .then((r) => r.json())
        .then((s) => {
          if (!s?.size?.width || !s?.size?.height) return;
          const ar = s.size.width / s.size.height;
          el.style.aspectRatio = s.size.width + " / " + s.size.height;
          el.style.width = "min(92vw, 880px, calc((100vh - 200px) * " + ar + "))";
        })
        .catch(() => {});
      play.addEventListener("click", () => { mark(null); el.transition("expand_collapse"); });
      compact.addEventListener("click", () => { el.setView("compact"); mark("compact"); });
      expanded.addEventListener("click", () => { el.setView("expanded"); mark("expanded"); });
      // Lively first impression: expand once when the deck is ready.
      el.addEventListener("ready", () => {
        mark(null);
        setTimeout(() => el.transition("expand"), 450);
        el.addEventListener("transitionend", () => mark("expanded"), { once: true });
      });
    </script>
  </body>
</html>
`;
  writeFileSync(join(OUT_DIR, "playable.html"), html);
}

/** Write outputs/scrollable.html — a scroll-driven story (issues 304.2 + 314). Reuses the
 *  bundle/scene/slides already copied by buildPlayableArtifact. */
function buildScrollableArtifact() {
  // The scrollable uses a scene variant with a clean floor: NO reflections (the soft blurry
  // reflections under the plates read as "little shadows") and a faint floor pane. (The
  // playable + engine renders keep their own floor / the 303 §1 reflections.)
  const scrollScene = JSON.parse(readFileSync(join(OUT_DIR, "airbl.scene.json"), "utf8"));
  scrollScene.floor = { color: "#f2f2f2", opacity: 0.2, reflectivity: 0 };
  writeFileSync(join(OUT_DIR, "airbl-scrollable.scene.json"), JSON.stringify(scrollScene, null, 2));

  const html = `<!doctype html>
<!-- this_file: vexy-stax-js/outputs/scrollable.html
     Scroll-driven demo (issues 304.2 + 314): a full-viewport intro, then the deck as a
     FULL-WIDTH 2:1 white scene, then a full-viewport outro. The deck starts COMPACT
     (frontmost plate centered with side padding). The transition STARTS when 75% of the
     scene height is in view (scrolling in from the bottom) and reaches fully EXPANDED when
     the scene's CENTER is at the TOP of the viewport — a long, eased ramp so it is not
     abrupt. Once expanded it LATCHES (further scrolling does not collapse it). The scene
     uses no floor reflections (clean floor). Serve over HTTP for textures. -->
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>vexy-stax — scrollable demo</title>
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; background: #ffffff; } /* white page bg (issue 314 §1) */
      body { font: 16px/1.6 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #1c1c1e; }
      .copy { min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
              align-items: center; text-align: center; gap: 12px; padding: 0 24px; }
      .copy h1 { font-size: clamp(28px, 6vw, 64px); margin: 0; letter-spacing: -0.02em; }
      .copy p { max-width: 46ch; margin: 0; color: #555; }
      .hint { font-size: 13px; color: #8a8a8a; }
      /* Full-width 2:1 white scene — no rounded corners, no box shadow (issue 314 §1/§2). */
      #stax { display: block; width: 100vw; aspect-ratio: 2 / 1; height: auto; background: #ffffff; }
    </style>
  </head>
  <body>
    <section class="copy">
      <h1>Scroll down</h1>
      <p>A layered deck of glass plates. Keep scrolling — it will rise into view and unfold.</p>
      <p class="hint">↓</p>
    </section>

    <vexy-stax id="stax" scene="airbl-scrollable.scene.json" view="compact" mode="static"></vexy-stax>

    <section class="copy">
      <h1>Layer by layer</h1>
      <p>Once unfolded the deck stays expanded — keep scrolling to read on.</p>
    </section>

    <script type="module" src="vexy-stax.element.js"></script>
    <script type="module">
      const el = document.getElementById("stax");
      const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
      let ready = false; // seek is unsafe until the deck has mounted
      let tMax = 0; // latch: the morph only ever advances toward expanded
      const update = () => {
        if (!ready) return;
        const r = el.getBoundingClientRect();
        const h = r.height;
        const vh = window.innerHeight;
        if (h <= 0) return;
        // Transition STARTS when 75% of the scene height is in view (scrolling in from the
        // bottom: r.top = vh - 0.75h) and reaches fully EXPANDED when the scene's CENTER is
        // at the TOP of the viewport (r.top = -h/2). The long, eased ramp keeps it smooth.
        const startTop = vh - 0.75 * h;
        const endTop = -h / 2;
        const p = (startTop - r.top) / (startTop - endTop);
        const t = ease(Math.max(0, Math.min(1, p)));
        if (t > tMax) { tMax = t; el.seek(tMax); } // never reverse once expanded
      };
      // Listeners attach immediately and no-op until ready (no ready/attach race).
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update, { passive: true });
      const go = () => { ready = true; update(); };
      el.addEventListener("ready", go, { once: true });
      setTimeout(go, 1500); // fallback if "ready" fired before this handler attached
    </script>
  </body>
</html>
`;
  writeFileSync(join(OUT_DIR, "scrollable.html"), html);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const { server, base } = await startServer(REPO_ROOT);
  const harnessUrl = `${base}/vexy-stax-js/verify/example-harness.html`;
  const browser = await chromium.launch({ headless: true });
  const summary = {};

  try {
    const page = await browser.newPage({
      viewport: { width: 900, height: 700 },
      deviceScaleFactor: 1,
    });
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(String(err)));

    await page.goto(harnessUrl, { waitUntil: "load" });
    await page.waitForFunction(
      () => {
        const s = window.__vexyStatus?.();
        return s && (s.ready || s.phase === "error");
      },
      { timeout: 30_000 }
    );
    const status = await page.evaluate(() => window.__vexyStatus());
    if (status.phase === "error") {
      throw new Error(`harness error: ${status.error}\nconsole: ${consoleErrors.join("\n")}`);
    }
    const size = await page.evaluate(() => window.__canvasSize());
    summary.canvasSize = size;

    // --- 1. IMAGE: toImage() compact AND expanded ------------------------
    const imgFiles = {};
    for (const view of ["compact", "expanded"]) {
      const r = await page.evaluate((v) => window.__toImageB64(v), view);
      const buf = b64ToBuffer(r.b64);
      const p = join(OUT_DIR, `airbl-${view}.png`);
      writeFileSync(p, buf);
      imgFiles[view] = { path: p, bytes: buf.length, type: r.type };
      console.log(`[image] toImage ${view}: ${p} (${buf.length} bytes, ${r.type})`);
    }
    // A single combined PNG showing compact AND expanded side-by-side.
    const combined = await page.evaluate(() => window.__combineImagesB64());
    const combinedBuf = b64ToBuffer(combined.b64);
    const combinedPath = join(OUT_DIR, "airbl-combined.png");
    writeFileSync(combinedPath, combinedBuf);
    imgFiles.combined = { path: combinedPath, bytes: combinedBuf.length, type: combined.type };
    console.log(`[image] combined compact+expanded: ${combinedPath} (${combinedBuf.length} bytes)`);
    summary.image = imgFiles;

    // --- 2. VIDEO: toVideo() of the transition ---------------------------
    const vid = await page.evaluate(() => window.__toVideoB64("expand_collapse"));
    const vidBuf = b64ToBuffer(vid.b64);
    // Container is WebM (MediaRecorder VP8/VP9 in chromium). Save with that extension.
    const ext = vid.type.includes("mp4") ? "mp4" : "webm";
    const vidPath = join(OUT_DIR, `airbl-transition.${ext}`);
    writeFileSync(vidPath, vidBuf);
    summary.video = { path: vidPath, bytes: vidBuf.length, type: vid.type, container: ext };
    console.log(`[video] toVideo: ${vidPath} (${vidBuf.length} bytes, ${vid.type})`);

    // --- 3. PLAYABLE: self-contained playable.html -----------------------
    buildPlayableArtifact();
    summary.playable = {
      html: join(OUT_DIR, "playable.html"),
      element: join(OUT_DIR, "vexy-stax.element.js"),
      scene: join(OUT_DIR, "airbl.scene.json"),
      slides: SLIDES.length,
    };
    console.log(`[playable] ${summary.playable.html} (+ element + scene + ${SLIDES.length} slides)`);

    // --- 3b. SCROLLABLE: scroll-driven story (issue 304.2) ----------------
    buildScrollableArtifact();
    summary.scrollable = join(OUT_DIR, "scrollable.html");
    console.log(`[scrollable] ${summary.scrollable} (reuses the playable assets)`);

    // --- 4. SCROLLSPY: top (compact) + bottom (expanded) frames ----------
    // Attach the REAL production scrollspy to the tall scroll region, then drive
    // the page scroll to top and bottom and capture the canvas at each end.
    await page.evaluate(() => window.__attachScrollspy("expand"));
    const scrollMax = await page.evaluate(() => window.__scrollMaxY());

    const captureAt = async (y, name) => {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      // Let the scrollspy rAF loop + IntersectionObserver settle, then render.
      await page.waitForTimeout(400);
      const dataUrl = await page.evaluate(() => window.__canvasDataUrl());
      const buf = dataUrlToBuffer(dataUrl);
      const p = join(OUT_DIR, `scrollspy-${name}.png`);
      writeFileSync(p, buf);
      console.log(`[scrollspy] ${name} (scrollY=${y}): ${p} (${buf.length} bytes)`);
      return { path: p, bytes: buf.length };
    };

    const top = await captureAt(0, "top");
    const bottom = await captureAt(scrollMax, "bottom");
    summary.scrollspy = { top, bottom, scrollMax };

    if (consoleErrors.length) {
      console.log("NOTE: console errors during example run:\n" + consoleErrors.join("\n"));
    }
  } finally {
    await browser.close();
    server.close();
  }

  writeFileSync(join(OUT_DIR, "summary.json"), JSON.stringify(summary, null, 2));
  console.log("EXAMPLE DRIVER DONE");
}

main().catch((err) => {
  console.error("EXAMPLE FAILED:", err);
  process.exit(1);
});
