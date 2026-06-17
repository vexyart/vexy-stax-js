<!-- this_file: CHANGELOG.md -->

# Changelog

All notable changes to this project are documented here.

## [Unreleased]

### Added

- Initial vexy-stax-js browser package (mirrors `vexy-stax-py` phase 2):
  - `scene.js` — strict JSON scene parser matching `schema/vexy-stax-scene.schema.json`; mirrors `vexy_stax/scene.py` exactly.
  - `geometry.js` — pure view math (SPEC.md §3): compact/expanded camera poses, per-slide opacity, easing curves, and `frameStateAt()` for transition progress; numeric outputs verified against Python fixture vectors.
  - `stage.js` — three.js 3D stage: glass plates, floor with reflections, per-slide captions, dual camera rigs for expanded/compact views.
  - `transition.js` — rAF morph driver and timeline/progress math; pure and testable.
  - `scrollspy.js` — scroll-driven view transitions via IntersectionObserver; respects `prefers-reduced-motion`.
  - `export.js` — canvas-to-PNG (toImage) and WebCodecs/MediaRecorder video capture (toVideo).
  - ESM API (`index.js`): VexyStax class with `setView()`, `toImage()`, `transition()`, `toVideo()`, `scrollspy()`.
  - `<vexy-stax>` Web Component (`element.js`): three entry modes (static, playable, scrollspy); auto-registers as custom element.
  - Classic-script global (`global.js`): window.VexyStax IIFE for non-module usage.
  - Vite build emitting `dist/vexy-stax.element.js` (ESM + Web Component) and `dist/vexy-stax.global.js` (IIFE).
  - Unit tests (`node --test`) for scene, geometry, transition, and scrollspy math.
  - Playwright E2E suite: mount/view/image/video/transition/scrollspy verification in headless Chromium.
  - Render verification gate (`verify/`): headless Chromium render + PIL pixel variance assertion.
