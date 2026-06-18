// SPDX-License-Identifier: Apache-2.0
// this_file: vexy-stax-js/verify/smoke-341.mjs
//
// Headless smoke test for the issue-341 + 342 demos/features. Serves docs/ over http and, in
// real chromium, loads each how-to demo (+ the playable/scrollable demos) and asserts every
// <vexy-stax> (or createStax instance) reaches "ready" with NO console errors. Also covers:
//   - remote-url-slide : a slide referenced by an ABSOLUTE http URL loads + stays exportable (341)
//   - click-toggle     : a click inside the element fluently toggles compact↔expanded (342)
//   - scene-in-init    : an inline scene OBJECT mounts (Web Component + createStax) (342)
// Run: node verify/smoke-341.mjs

import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const HERE = dirname(fileURLToPath(import.meta.url));
const DOCS = resolve(HERE, "../docs");

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".css": "text/css",
  ".map": "application/json",
};

function startServer(root) {
  const server = http.createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
      const filePath = join(root, safe);
      const data = await readFile(filePath);
      // Send permissive CORS so a slide referenced by an ABSOLUTE http URL loads cross-origin
      // and the canvas stays un-tainted (the crossOrigin="anonymous" path in stage.js).
      res.writeHead(200, {
        "Content-Type": MIME[extname(filePath)] || "application/octet-stream",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  });
  return new Promise((r) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      r({ server, base: `http://127.0.0.1:${port}` });
    });
  });
}

// Each page: how many <vexy-stax> instances must reach ready, and how to verify.
const PAGES = [
  { file: "demo-component.html", min: 3 },
  { file: "demo-module.html", min: 3 },
  { file: "demo-library.html", min: 1 },
  { file: "playable.html", min: 1 },
  { file: "scrollable.html", min: 1 },
];

// In-page probe: wait until every <vexy-stax> on the page has a mounted instance with a
// <canvas>, then return the count. (createStax-based pages still render into <vexy-stax>?
// No — demo-module uses plain <div> stages; so we also count canvases as a fallback.)
const READY_PROBE = `(async () => {
  const deadline = Date.now() + 20000;
  const elements = Array.from(document.querySelectorAll('vexy-stax'));
  const stages = Array.from(document.querySelectorAll('.stage'));
  const targets = elements.length ? elements : stages;
  while (Date.now() < deadline) {
    const canvases = document.querySelectorAll('canvas');
    // Ready when at least one canvas exists per target stage and all <vexy-stax> have instances.
    const elemsReady = elements.every((e) => e.instance && e.querySelector('canvas'));
    const enoughCanvas = canvases.length >= targets.length;
    if ((elements.length ? elemsReady : true) && enoughCanvas) {
      return { canvases: canvases.length, elements: elements.length, stages: stages.length };
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  return { timeout: true, canvases: document.querySelectorAll('canvas').length,
           elements: elements.length, stages: stages.length };
})()`;

async function run() {
  const { server, base } = await startServer(DOCS);
  const browser = await chromium.launch({ headless: true });
  let failures = 0;
  const results = [];

  for (const { file, min } of PAGES) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(`console.error: ${m.text()}`);
    });
    let status;
    try {
      await page.goto(`${base}/${file}`, { waitUntil: "load", timeout: 30000 });
      status = await page.evaluate(READY_PROBE);
    } catch (e) {
      status = { error: String(e) };
    }
    const ok = !status.error && !status.timeout && status.canvases >= min && errors.length === 0;
    if (!ok) failures++;
    results.push({ file, ok, min, status, errors: errors.slice(0, 5) });
    console.log(`${ok ? "PASS" : "FAIL"}  ${file}  canvases=${status.canvases ?? "?"} (need ≥${min})` +
      (errors.length ? `  errors=${errors.length}` : "") +
      (status.timeout ? "  TIMEOUT" : "") + (status.error ? `  ${status.error}` : ""));
    if (errors.length) errors.slice(0, 5).forEach((e) => console.log(`        ${e}`));
    await ctx.close();
  }

  // Remote-URL slide test: build a page in-memory that references a slide by an ABSOLUTE http
  // URL (served with CORS) and assert it loads + renders a canvas with no errors.
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errors.push(`console.error: ${m.text()}`); });
    const remote = `${base}/airbl-lores/airbl-020-source.png`;
    const remote2 = `${base}/airbl-lores/airbl-030-pink.png`;
    const html = `<!doctype html><html><head><meta charset="utf-8"></head><body>
      <div id="stage" style="width:600px;height:400px"></div>
      <script type="module">
        import { createStax } from "${base}/vexy-stax.element.js";
        window.__done = (async () => {
          const stax = await createStax("#stage", {
            slides: ["${remote}", "${remote2}"],
            size: { width: 1246, height: 806 },
            view: "expanded",
          });
          const canvas = document.querySelector("#stage canvas");
          // Read a pixel to prove the canvas is not tainted (remote CORS image is exportable).
          const url = await stax.toImage({ scale: 1 }).then((b) => b.size).catch((e) => "EXPORT_FAIL:" + e);
          return { hasCanvas: !!canvas, slides: stax.scene.slides.length, exportBytes: url };
        })();
      </script>
    </body></html>`;
    let status;
    try {
      await page.goto(`${base}/demo-component.html`); // any same-origin doc to allow module import
      await page.setContent(html, { waitUntil: "load" });
      status = await page.evaluate(() => window.__done);
    } catch (e) {
      status = { error: String(e) };
    }
    status = status ?? { error: "module did not resolve (window.__done undefined)" };
    const ok = !status.error && status.hasCanvas && status.slides === 2 &&
      typeof status.exportBytes === "number" && status.exportBytes > 1000 && errors.length === 0;
    if (!ok) failures++;
    results.push({ file: "remote-url-slide", ok, status, errors: errors.slice(0, 5) });
    console.log(`${ok ? "PASS" : "FAIL"}  remote-url-slide  ` +
      `canvas=${status.hasCanvas} slides=${status.slides} exportBytes=${status.exportBytes}` +
      (errors.length ? `  errors=${errors.length}` : "") + (status.error ? `  ${status.error}` : ""));
    if (errors.length) errors.slice(0, 5).forEach((e) => console.log(`        ${e}`));
    await ctx.close();
  }

  // ── Issue 342 (a): CLICK-TO-TOGGLE — a click inside the element fluently toggles views. ──
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errors.push(`console.error: ${m.text()}`); });
    let status;
    try {
      // demo-component.html's first example is a slides-only <vexy-stax view="compact">.
      await page.goto(`${base}/demo-component.html`, { waitUntil: "load" });
      status = await page.evaluate(async () => {
        const el = document.querySelector("vexy-stax");
        // Wait for the instance + click-toggle wiring.
        const deadline = Date.now() + 20000;
        while (Date.now() < deadline && !(el.instance && el.instance._clickToggle)) {
          await new Promise((r) => setTimeout(r, 100));
        }
        const inst = el.instance;
        if (!inst) return { error: "no instance" };
        const before = inst._currentView;
        // Click the element (center) to toggle; wait for the transition to settle.
        const settle = new Promise((res) => el.addEventListener("transitionend", res, { once: true }));
        el.click();
        await Promise.race([settle, new Promise((r) => setTimeout(r, 8000))]);
        // Give the morph a beat to commit the tracked view.
        await new Promise((r) => setTimeout(r, 100));
        const after = inst._currentView;
        return { before, after, wired: !!inst._clickToggle, cursor: el.style.cursor };
      });
    } catch (e) {
      status = { error: String(e) };
    }
    status = status ?? { error: "evaluate returned undefined" };
    const ok = !status.error && status.wired && status.before !== status.after &&
      ["compact", "expanded"].includes(status.after) && errors.length === 0;
    if (!ok) failures++;
    results.push({ file: "click-toggle", ok, status, errors: errors.slice(0, 5) });
    console.log(`${ok ? "PASS" : "FAIL"}  click-toggle  ${status.before} → ${status.after} ` +
      `(wired=${status.wired}, cursor=${status.cursor})` +
      (errors.length ? `  errors=${errors.length}` : "") + (status.error ? `  ${status.error}` : ""));
    if (errors.length) errors.slice(0, 5).forEach((e) => console.log(`        ${e}`));
    await ctx.close();
  }

  // ── Issue 342 (b): SCENE-IN-INIT — mount with an inline scene OBJECT (element + createStax). ──
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errors.push(`console.error: ${m.text()}`); });
    const a = `${base}/airbl-lores/airbl-020-source.png`;
    const b = `${base}/airbl-lores/airbl-030-pink.png`;
    const html = `<!doctype html><html><head><meta charset="utf-8"></head><body>
      <vexy-stax id="el" style="width:600px;height:400px"></vexy-stax>
      <div id="stage" style="width:600px;height:400px"></div>
      <script type="module">
        import { createStax } from "${base}/vexy-stax.element.js";
        window.__done = (async () => {
          const SCENE = { version: 1, size: { width: 1246, height: 806 },
            slides: [{ src: "${a}" }, { src: "${b}" }] };
          // (1) Web Component: assign an inline scene OBJECT via the property.
          const el = document.getElementById("el");
          el.scene = SCENE;
          await new Promise((res) => el.addEventListener("ready", res, { once: true }));
          const elCanvas = !!el.querySelector("canvas");
          // (2) createStax with { scene: <object> }.
          const stax = await createStax("#stage", { scene: SCENE, view: "expanded" });
          const stageCanvas = !!document.querySelector("#stage canvas");
          return { elCanvas, stageCanvas, elSlides: el.instance.scene.slides.length,
                   staxSlides: stax.scene.slides.length };
        })();
      </script>
    </body></html>`;
    let status;
    try {
      await page.goto(`${base}/demo-component.html`);
      await page.setContent(html, { waitUntil: "load" });
      status = await page.evaluate(() => window.__done);
    } catch (e) {
      status = { error: String(e) };
    }
    status = status ?? { error: "scene-in-init did not resolve" };
    const ok = !status.error && status.elCanvas && status.stageCanvas &&
      status.elSlides === 2 && status.staxSlides === 2 && errors.length === 0;
    if (!ok) failures++;
    results.push({ file: "scene-in-init", ok, status, errors: errors.slice(0, 5) });
    console.log(`${ok ? "PASS" : "FAIL"}  scene-in-init  ` +
      `elCanvas=${status.elCanvas} stageCanvas=${status.stageCanvas} ` +
      `elSlides=${status.elSlides} staxSlides=${status.staxSlides}` +
      (errors.length ? `  errors=${errors.length}` : "") + (status.error ? `  ${status.error}` : ""));
    if (errors.length) errors.slice(0, 5).forEach((e) => console.log(`        ${e}`));
    await ctx.close();
  }

  await browser.close();
  server.close();
  console.log(`\n${failures === 0 ? "ALL SMOKE TESTS PASSED" : `${failures} SMOKE TEST(S) FAILED`}`);
  process.exit(failures === 0 ? 0 : 1);
}

run().catch((e) => { console.error(e); process.exit(1); });
