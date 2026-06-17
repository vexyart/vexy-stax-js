// SPDX-License-Identifier: Apache-2.0
// this_file: vexy-stax-js/verify/run.mjs
//
// HARD VERIFICATION GATE for the JS render ops (G008). Serves the repo root over
// HTTP (so three.js loads the airbl PNG textures without file:// CORS), opens the
// harness in Playwright chromium, renders the compact + expanded views, screenshots
// the WebGL canvas to PNG, and saves them. A separate PIL/numpy step decodes the
// PNGs and asserts pixel std > 30 AND unique-color count > 500 (a blank render
// fails). This script only produces the PNGs + canvas data; the gate assertion is
// done by verify/gate.py.

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { chromium } from "@playwright/test";
import { startServer, REPO_ROOT } from "./server.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(HERE, "out");
mkdirSync(OUT_DIR, { recursive: true });

function dataUrlToBuffer(dataUrl) {
  const comma = dataUrl.indexOf(",");
  return Buffer.from(dataUrl.slice(comma + 1), "base64");
}

async function main() {
  const { server, base } = await startServer(REPO_ROOT);
  const harnessUrl = `${base}/vexy-stax-js/verify/harness.html`;

  const browser = await chromium.launch({ headless: true });
  const results = {};
  try {
    const page = await browser.newPage({ viewport: { width: 800, height: 600 }, deviceScaleFactor: 1 });
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(String(err)));

    await page.goto(harnessUrl, { waitUntil: "load" });
    // Wait for textures to decode + initial render.
    await page.waitForFunction(() => {
      const s = window.__vexyStatus?.();
      return s && (s.ready || s.phase === "error");
    }, { timeout: 30_000 });

    const status = await page.evaluate(() => window.__vexyStatus());
    if (status.phase === "error") {
      throw new Error(`harness error: ${status.error}\nconsole: ${consoleErrors.join("\n")}`);
    }

    const size = await page.evaluate(() => window.__canvasSize());
    results.canvasSize = size;

    for (const view of ["compact", "expanded"]) {
      await page.evaluate((v) => window.__setView(v), view);
      // Give the GPU a tick to flush the frame into the preserved drawing buffer.
      await page.waitForTimeout(150);
      const dataUrl = await page.evaluate(() => window.__canvasDataUrl());
      const buf = dataUrlToBuffer(dataUrl);
      const outPath = join(OUT_DIR, `airbl-${view}.png`);
      writeFileSync(outPath, buf);
      results[view] = { path: outPath, bytes: buf.length };
      console.log(`saved ${view}: ${outPath} (${buf.length} bytes, canvas ${size.w}x${size.h})`);
    }

    // Orientation probe: render the colorful front art plate (index 0) head-on
    // and save it next to its source PNG path so the gate can compare un-flipped
    // vs flipped (proves the rendered text is not mirrored).
    const probeIndex = 0;
    const probeUrl = await page.evaluate((i) => window.__renderPlateProbe(i), probeIndex);
    const probeSrc = await page.evaluate((i) => window.__plateSrc(i), probeIndex);
    const probeBuf = dataUrlToBuffer(probeUrl);
    const probePath = join(OUT_DIR, "plate-probe.png");
    writeFileSync(probePath, probeBuf);
    // Map the served URL back to the local file path for the gate.
    const srcLocal = join(REPO_ROOT, new URL(probeSrc).pathname);
    results.probe = { path: probePath, srcUrl: probeSrc, srcLocal, index: probeIndex };
    console.log(`saved plate probe: ${probePath} (source: ${srcLocal})`);

    if (consoleErrors.length) {
      console.log("NOTE: console errors during render:\n" + consoleErrors.join("\n"));
    }
  } finally {
    await browser.close();
    server.close();
  }

  writeFileSync(join(OUT_DIR, "results.json"), JSON.stringify(results, null, 2));
  console.log("DONE");
}

main().catch((err) => {
  console.error("VERIFY FAILED:", err);
  process.exit(1);
});
