// SPDX-License-Identifier: Apache-2.0
// this_file: tests/e2e/inline-aspect.spec.js
//
// Issue 701 E2E: load the generated demo-component.html in real chromium and assert the two
// new paths work end-to-end — (1) a scene declared as an inline <script type="application/json">
// child mounts and renders a non-blank canvas, and (2) the `aspect` attribute applies a CSS
// aspect-ratio to the host box. Served over http from the repo root (same infra as render-ops).

import { test, expect } from "@playwright/test";
import { startServer } from "../../verify/server.mjs";

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

test("inline <script> scene mounts and the aspect attribute shapes the box", async ({ page }) => {
  const { base } = await getServer();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(`${base}/vexy-stax-js/docs/demo-component.html`, { waitUntil: "load" });

  // Wait until every deck has mounted its three.js <canvas> (the element appends it to light DOM).
  await page.waitForFunction(
    () => {
      const els = [...document.querySelectorAll("vexy-stax")];
      return els.length > 0 && els.every((el) => el.querySelector("canvas"));
    },
    null,
    { timeout: 30_000 }
  );

  const result = await page.evaluate(() => {
    const els = [...document.querySelectorAll("vexy-stax")];
    // The inline-scene deck: no `scene`/`slides` attribute, but a <script type="application/json"> child.
    const inline = els.find(
      (el) => el.querySelector('script[type="application/json"]') && !el.getAttribute("scene")
    );
    // The aspect deck: aspect="3".
    const aspectEl = els.find((el) => el.getAttribute("aspect") === "3");
    const canvasSize = (el) => {
      const c = el?.querySelector("canvas");
      return c ? { w: c.width, h: c.height } : null;
    };
    return {
      inlineHasCanvas: !!inline?.querySelector("canvas"),
      inlineSlides: inline?.instance?.scene?.slides?.length ?? 0,
      aspectRatio: aspectEl ? getComputedStyle(aspectEl).aspectRatio : "",
      aspectCanvas: canvasSize(aspectEl),
    };
  });

  expect(result.inlineHasCanvas).toBe(true);
  expect(result.inlineSlides).toBe(4); // the inline scene declares 4 slides
  // CSS aspect-ratio resolves to "3 / 1" (or "3 / 1" normalized) on the host element.
  expect(result.aspectRatio.replace(/\s/g, "")).toBe("3/1");
  // The aspect box renders wider than tall.
  expect(result.aspectCanvas.w).toBeGreaterThan(result.aspectCanvas.h);
  expect(errors).toEqual([]);
});
