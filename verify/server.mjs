// SPDX-License-Identifier: Apache-2.0
// this_file: vexy-stax-js/verify/server.mjs
//
// Tiny static file server rooted at the vexy-stax-js package root, shared by the
// HARD-GATE harness runner (verify/run.mjs) and the Playwright E2E spec. Serving
// over http (not file://) lets three.js load the airbl PNG textures and the
// example scene JSON without CORS errors. Read-only, with basic traversal guard.
// Rooting at the package itself keeps everything self-contained: the harness,
// dist bundles, scene, and slides all resolve under repo-relative paths.

import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, normalize, join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(HERE, "../.."); // vexy-stax-dev root (serves both vexy-stax-js and vexy-stax-py/testdata — issue 320)

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".css": "text/css",
  ".map": "application/json",
};

/** Start a static server rooted at the repo root; resolves to { server, port, base }. */
export async function startServer(rootDir = REPO_ROOT) {
  const server = http.createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
      const filePath = join(rootDir, safe);
      const data = await readFile(filePath);
      res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const { port } = server.address();
  return { server, port, base: `http://127.0.0.1:${port}` };
}
