# Project Overview
- Purpose: Vexy Stax JS is a browser-based Three.js application that lets users load 2D artwork, arrange it in a 3D stack with lighting/material presets, and export the scene as PNG renders or JSON configs.
- Scope: Maintain the web studio experience with accurate rendering, modular code, and comprehensive docs/tests while progressively decomposing `src/main.js` into focused modules.
- Tech stack: JavaScript/ESM with Three.js r181, Tweakpane 4.x, GSAP for camera animation, Vite 7.x tooling, Node-based unit + integration tests, Apache-2.0 license.
- Repo structure: `src/` holds main.js plus subfolders (`core`, `camera`, `scene`, `utils`), `tests/` has 16 suites (227 tests), `docs/` hosts the static build, numerous markdown guides document architecture and process.