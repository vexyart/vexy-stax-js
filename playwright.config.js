// this_file: playwright.config.js
//
// E2E config for the browser render ops (component mount, view switch, image
// export, playable transition, scrollspy). The spec serves the repo root over
// its own http server (so three.js loads the airbl PNG textures and the example
// scene without file:// CORS), so no external webServer is needed here.

import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  timeout: 60_000,
  use: {
    headless: true,
  },
});
