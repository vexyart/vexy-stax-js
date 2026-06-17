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

  // Scene JSON (slide src already relative: airbl-lores/...).
  copyFileSync(
    join(JS_ROOT, "testdata", "airbl.scene.json"),
    join(OUT_DIR, "airbl.scene.json")
  );

  // Slides (copy the in-repo PNG bytes into the playable bundle).
  for (const name of SLIDES) {
    const src = join(JS_ROOT, "testdata", "airbl-lores", name);
    writeFileSync(join(slidesDir, name), readFileSync(src));
  }

  const html = `<!doctype html>
<!-- this_file: vexy-stax-js/outputs/playable.html
     Self-contained playable demo: loads the built <vexy-stax> element + the airbl
     scene (slides copied alongside) and plays the deck transition on a button.
     Serve this folder over HTTP (e.g. \`python3 -m http.server\`) to avoid file://
     texture CORS, then open playable.html and press Play. -->
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>vexy-stax playable demo</title>
    <style>
      body { margin: 0; font: 15px/1.4 system-ui, sans-serif; background: #fafafa; color: #222; }
      header { padding: 16px 20px; }
      h1 { margin: 0 0 4px; font-size: 18px; }
      p { margin: 0; color: #666; }
      #stage { display: flex; justify-content: center; padding: 16px; }
      vexy-stax { width: 720px; height: 466px; box-shadow: 0 2px 18px rgba(0,0,0,.12); }
      .controls { display: flex; gap: 8px; justify-content: center; padding: 8px 0 24px; }
      button { font: inherit; padding: 8px 16px; border: 1px solid #ccc; border-radius: 8px;
               background: #fff; cursor: pointer; }
      button:hover { background: #f0f0f0; }
    </style>
  </head>
  <body>
    <header>
      <h1>vexy-stax — playable demo</h1>
      <p>Press <strong>Play transition</strong> to morph the deck between compact and expanded.</p>
    </header>
    <div id="stage">
      <vexy-stax id="stax" scene="airbl.scene.json" view="compact" mode="playable"></vexy-stax>
    </div>
    <div class="controls">
      <button id="play">Play transition</button>
      <button id="compact">Compact</button>
      <button id="expanded">Expanded</button>
    </div>
    <script type="module" src="vexy-stax.element.js"></script>
    <script type="module">
      const el = document.getElementById("stax");
      document.getElementById("play").addEventListener("click", () => el.transition("expand_collapse"));
      document.getElementById("compact").addEventListener("click", () => el.setView("compact"));
      document.getElementById("expanded").addEventListener("click", () => el.setView("expanded"));
    </script>
  </body>
</html>
`;
  writeFileSync(join(OUT_DIR, "playable.html"), html);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const { server, base } = await startServer(REPO_ROOT);
  const harnessUrl = `${base}/verify/example-harness.html`;
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
