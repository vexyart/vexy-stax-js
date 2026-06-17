<!-- this_file: CHANGELOG.md -->

# Changelog

All notable changes to this project are documented here.

## [3.0.7] — issue 328

### Changed

- **Default caption font → "Zalando Sans"** (328): the default caption font is now "Zalando Sans"
  pulled from Google Fonts at wdth 125 / wght 500 (matching the bundled Python `vexy-stax.ttf` =
  Zalando Sans Expanded). `makeCaptionSprite` renders the default at `500 expanded` with 0.02em
  tracking (an explicit family is still used plainly, with a `system-ui, sans-serif` fallback).
  `_ensureCaptionFonts` injects the Google Fonts preconnect links + the Zalando Sans stylesheet
  and preloads the face by default whenever a caption uses the default font.

## [3.0.6] — issue 327

### Fixed

- **Caption font fell back to serif (Times New Roman) in the playwright render**
  (327.1): `makeCaptionSprite` now builds the canvas font as
  `"<family>", system-ui, sans-serif`, so an unloaded/unknown family never falls
  back to the canvas default serif. `_ensureCaptionFonts` now awaits the Google
  Fonts `<link>` `onload` BEFORE calling `document.fonts.load`, so REM's
  `@font-face` rules exist when the load is requested (previously a race resolved
  the load against the system fallback, leaving captions in a serif font).

## [3.0.5] — issue 326

### Changed

- **Plate + caption borders OFF by default** (326): `parseEdge` width default
  `0.004 → 0.0` (and schema default). A border (around both the slide plates and
  the caption plates, which share `edge.width`) now draws only when `width > 0`.
  Border color default is unchanged and applies only when a border is enabled.

## [3.0.4] — issues 324–325

### Changed

- **Caption + border colors default `#f2f2f2`, each overridable** (324):
  `scene.edge.color` default `#cccccc → #f2f2f2` (the slide-plate border and, by
  default, the caption-plate fill + border). New `caption_defaults.fill_color` and
  `caption_defaults.border_color` (each defaulting to `scene.edge.color`) make the
  caption plate fill and border independently overridable; `caption_defaults.color`
  still sets the caption text color. New `geometry.captionFillColor()` /
  `captionBorderColor()` helpers; `makeCaptionSprite` now takes separate
  `fillColor` / `borderColor` (each falling back to `edgeColor`) and the stage
  passes the resolved colors. Schema gained the `edge.color` default and
  `captionStyle.fill_color` / `border_color`.
- **Caption font 1/3 larger by default** (324): `CAPTION_PLATE_HEIGHT_FRAC`
  `0.10 → 0.10·4/3 ≈ 0.1333`, so `CAPTION_DEFAULT_SIZE_FRAC` `0.075 → 0.10` of the
  scene height.

### Fixed

- **Blender compact view rendered black / transition translucent** (325):
  fixed in the Python `blender` engine (Cycles `transparent_max_bounces` was
  exhausted by the dense head-on plate stack). No changes to the browser package;
  the JS/three.js engine was already correct (it draws single planes with
  `depthWrite:false` + explicit render orders).

## [3.0.3] — issues 321–323

### Changed

- **Caption plate touches slide plate** (321/323): `CAPTION_GAP_EM` reduced from
  `2.0` to `0.0` in `geometry.js` so the caption plate right edge aligns exactly
  with the slide plate left edge — no visual gap.

## [3.0.2] — issue 320

### Changed

- **Caption plate fill = border color** (320.7): caption plate background is now
  `edgeColor` (= `scene.edge.color`, default `#cccccc`) instead of white, so the
  caption plate matches the slide-plate border.
- **Plate/reflection `depthWrite: false`** (320.9): THREE.js plate and reflection
  materials set `depthWrite: false` to eliminate z-fighting flicker at the bottom
  of each slide during Playwright-recorded transitions.
- **JS outputs use py testdata** (320.5–6): `verify/example.mjs`, harness HTML
  files, and `verify/server.mjs` now read scene + slides from
  `vexy-stax-py/testdata/` instead of the removed `vexy-stax-js/testdata/`.
- **Testdata removed** (320.6): `vexy-stax-js/testdata/` directory deleted; the
  shared source of truth is `vexy-stax-py/testdata/`.

## [3.0.1] — issues 303–318

### Added

- **Smoked-glass floor + blurry reflections** (303 §1): floor defaults to ~4%
  smoked glass; the mirror reflection texture is Gaussian-blurred (`ctx.filter`)
  so it reads soft, not crisp.
- **Plate edge border** (305): `Edge` scene model (`width` fraction of plate
  height, `color`), default-on; 4 thin perimeter quads per plate in `stage.js`.
- **Caption plates** (311, typography revised by 315): captions render as small
  **white opaque bordered plates** (same edge as the slide plates), text centered;
  plate height = 10% of plate height, text = 75% of that (→ 7.5%), width = text +
  0.75em padding each side.
- **`seek(t)`** on `VexyStax` + `<vexy-stax>`: apply an arbitrary morph factor
  (0 compact → 1 expanded). `scrollspy({map})` accepts a custom progress→morph map.
  `compactCamera`/`expandedCamera` accept an optional viewport aspect (issue 314).
- **`outputs/scrollable.html`** (304.2 + 314): a **full-width 2:1 white** scene
  (no rounding/box-shadow) between intro and outro copy. Compact = plate centered
  with side padding; it morphs to expanded once **80% of the scene is visible**
  scrolling in, then **latches** expanded (further scrolling does not collapse it).

### Fixed

- **playable.html scale at HiDPI** (304.1): `renderer.setSize(w, h)` (updateStyle
  default) so the canvas displays at its CSS size, not the 2× backing size.
- **npm publish version conflict** (318): bumped package version to `3.0.1` since
  `3.0.0` was already published on npm.

### Changed

- Default `camera.distance` is `"100%"` (compact fit-tight); default caption size
  is 7.5% of plate height (75% of the caption-plate height — issues 311/315, supersede
  308's 5%); `caption_fade.stagger_frames` for frame-based stagger.

### Removed

- **Floor shadows** (312): the short pale plate shadows on the floor were eliminated.

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
