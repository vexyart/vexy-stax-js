// SPDX-License-Identifier: Apache-2.0
// this_file: tests/e2e/render-ops.spec.js
//
// End-to-end render ops (SPEC.md §6.1) in real chromium against the built
// <vexy-stax> element + airbl example scene: mount, switch views, export an
// image, play a transition, and run a scrollspy step. Served over http from the
// package root so three.js loads the PNG textures without file:// CORS.

import { test, expect } from "@playwright/test";
import { startServer } from "../../verify/server.mjs";

// Lazily start the static package-root server once (tests must be registered
// synchronously, so no top-level await / beforeAll hook here — Playwright's
// loader rejected both with this pnpm layout). First test to call openHarness
// boots it; it lives for the process and is closed on exit.
let _serverPromise = null;
function getServer() {
  if (!_serverPromise) {
    _serverPromise = startServer().then((s) => {
      process.on("exit", () => s.server.close());
      return s;
    });
  }
  return _serverPromise;
}

async function openHarness(page) {
  const { base } = await getServer();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(`${base}/vexy-stax-js/verify/harness.html`, { waitUntil: "load" });
  await page.waitForFunction(() => window.__vexyStatus?.().ready || window.__vexyStatus?.().phase === "error", null, {
    timeout: 30_000,
  });
  const status = await page.evaluate(() => window.__vexyStatus());
  expect(status.phase, status.error || "harness should be ready").toBe("ready");
  return errors;
}

// Decode a canvas data URL in-page to a coarse colour-count + std so we can
// assert the render is non-blank without shipping image libs into the test.
const statsExpr = `(() => {
  const c = window.__stax.stage.renderer.domElement;
  const off = document.createElement("canvas");
  off.width = 320; off.height = 207;
  const ctx = off.getContext("2d");
  ctx.drawImage(c, 0, 0, off.width, off.height);
  const { data } = ctx.getImageData(0, 0, off.width, off.height);
  const seen = new Set();
  let sum = 0, sum2 = 0, n = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2];
    seen.add((r << 16) | (g << 8) | b);
    const lum = 0.2126*r + 0.7152*g + 0.0722*b;
    sum += lum; sum2 += lum*lum; n++;
  }
  const mean = sum / n;
  const std = Math.sqrt(Math.max(0, sum2/n - mean*mean));
  return { uniq: seen.size, std };
})()`;

test("mounts and renders a non-blank compact view", async ({ page }) => {
  const errors = await openHarness(page);
  await page.evaluate(() => window.__setView("compact"));
  const stats = await page.evaluate(statsExpr);
  expect(stats.uniq).toBeGreaterThan(500);
  expect(stats.std).toBeGreaterThan(30);
  expect(errors).toEqual([]);
});

test("switches to expanded and stays non-blank", async ({ page }) => {
  await openHarness(page);
  await page.evaluate(() => window.__setView("expanded"));
  const stats = await page.evaluate(statsExpr);
  expect(stats.uniq).toBeGreaterThan(500);
});

test("toImage produces a PNG blob", async ({ page }) => {
  await openHarness(page);
  const info = await page.evaluate(async () => {
    const blob = await window.__stax.toImage({ scale: 1 });
    return { type: blob.type, size: blob.size };
  });
  expect(info.type).toBe("image/png");
  expect(info.size).toBeGreaterThan(1000);
});

test("plays a transition and resolves", async ({ page }) => {
  await openHarness(page);
  const result = await page.evaluate(async () => {
    let progressSeen = 0;
    const stax = window.__stax;
    await stax.transition("expand", { onProgress: (p) => { progressSeen = Math.max(progressSeen, p); } });
    return { progressSeen };
  });
  expect(result.progressSeen).toBeGreaterThan(0.9);
  const stats = await page.evaluate(statsExpr);
  expect(stats.uniq).toBeGreaterThan(500);
});

test("toVideo records the transition to a video blob", async ({ page }) => {
  await openHarness(page);
  const info = await page.evaluate(async () => {
    const blob = await window.__stax.toVideo({ kind: "expand" });
    return { type: blob.type, size: blob.size };
  });
  expect(info.size).toBeGreaterThan(0);
  expect(info.type).toMatch(/video\//);
});

test("scrollspy maps scroll progress to morph endpoints", async ({ page }) => {
  await openHarness(page);
  // Exercise the scrollspy progress→morph mapping directly (no physical scroll):
  // p=0 ⇒ compact morph (t≈0), p=1 ⇒ fully expanded (t≈1) for an "expand" story.
  const out = await page.evaluate(() => {
    const stax = window.__stax;
    return {
      t0: stax._scrollMorph("expand", 0, "easeInOutCubic", 3.0, 1.0),
      tMid: stax._scrollMorph("expand", 0.375, "easeInOutCubic", 3.0, 1.0),
      t1: stax._scrollMorph("expand", 1, "easeInOutCubic", 3.0, 1.0),
    };
  });
  expect(out.t0).toBeCloseTo(0, 5);
  expect(out.tMid).toBeCloseTo(0.5, 5); // move segment spans [0,0.75]; local 0.5 → eased 0.5
  expect(out.t1).toBeCloseTo(1, 5);
});
