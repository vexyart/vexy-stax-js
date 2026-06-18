<!-- this_file: CHANGELOG.md -->

# Changelog

All notable changes to this project are documented here.

## [3.0.11] — issues 335, 336, 337

### Added

- **`video` scene section** (335 / 336): `scene.js` `parseVideo()` + the JSON schema now accept and
  validate the `video` section (`width`/`height`/`fps`/`frames`/`first_hold`/`last_hold`), mirroring
  `vexy_stax.scene.Video`. Previously the strict parser rejected the key with "Unknown key 'video' in
  scene", which broke the Python `playwright` engine (it mounts the scene in `<vexy-stax>`) — issue
  336. The element now accepts a scene carrying `video`.
- **Held first/last still frames in `toVideo()`** (335 §2): the video export now bookends the clip
  with held stills — it renders the start endpoint and captures it `video.first_hold` times (default
  10), plays the transition, then captures the end endpoint `video.last_hold` times (still →
  transition → still). Mirrors `geometry.py`'s `frame_plan` holds. Verified: the exported
  `airbl-transition.mp4` first/last frames are static.

### Fixed

- **Compact view reserved empty caption space** (337): `compactCamera` now fits ONLY the frontmost
  slide plate (height `H`, aimed at the slide center `Y = lift`) instead of the slide+caption
  composite, so the compact view fills the frame with no caption padding. Mirrors `geometry.py`
  (issue 337). Verified: the playwright-rendered compact still fills the frame; geometry test updated.

## [3.0.10] — issues 331

### Fixed

- **Seekable mp4 video export** (331): `src/export.js` `recordVideo()` now uses a
  deterministic WebCodecs + `mp4-muxer` primary path instead of the broken
  `captureStream`/MediaRecorder approach. The new `recordViaMuxer()` function:
  - Checks H.264 (`avc1.640028`) support via `VideoEncoder.isConfigSupported()`; falls
    back to VP9 (`vp09.00.10.08`) if H.264 is unavailable.
  - Feeds each `VideoFrame(canvas, {timestamp, duration})` into a `VideoEncoder` whose
    output chunks are piped directly to a `mp4-muxer` `Muxer` with
    `fastStart: "in-memory"` and an `ArrayBufferTarget`.
  - Calls `muxer.finalize()` after `encoder.flush()`, producing a `Blob([target.buffer],
    {type:"video/mp4"})` with correct per-stream `duration` and `nb_frames` metadata —
    verified seekable by ffprobe.
  - `MediaRecorder` (live `captureStream`) is retained as a last-resort fallback for
    environments entirely without `VideoEncoder`.
- **`verify/example.mjs` extension logic** (331): the `ext` variable already derived the
  extension from `blob.type` (`mp4` vs `webm`), so the primary path now writes
  `airbl-transition.mp4` automatically.

### Added

- **Deployable `docs/` site for GitHub Pages** (331 part 2):
  - `scripts/build-docs.mjs` copies the built `dist/` bundles (element + global + source
    maps), the `airbl-lores` scene JSON + slide PNGs, writes a self-contained
    `docs/index.html` landing page with a playable `<vexy-stax>` demo and usage snippets
    for all three entry points (Web Component, ESM import, global script), and a short
    `docs/README.md`.
  - `package.json` gains a `build:docs` script (`node scripts/build-docs.mjs`).
  - `build.sh` calls `npm run build:docs` after `npm run build`, so the docs site is
    regenerated on every full build.
  - Base path is `/vexy-stax-js/` (GitHub Pages subdirectory), set via a `<base>` tag
    in `index.html`.

## [3.0.9] — issue 332

### Added

- **Global `captions` on/off toggle** (332): a new top-level boolean scene field (default `true`,
  preserving prior behavior) parsed + validated in `src/scene.js` and
  `schema/vexy-stax-scene.schema.json` (strict — a non-bool throws). When `false`, no caption plates
  are built (`stage.js`) and `captionOpacities` returns all-zero, and the slide plates drop directly
  onto the floor.

### Changed

- **New stacked caption layout** (332): when captions are ON, each caption plate sits RIGHT ON the
  floor (bottom edge on the floor line) and its slide plate sits directly ON TOP of it, LEFT-aligned
  with the slide (caption left edge == slide left edge at `X = -width/2`). This replaces the previous
  "caption to the LEFT of the plate" layout. Mirrors `vexy-stax-py` exactly.
  - `geometry.js`: added `slideLift(scene)` (one caption-plate height when captions on, else 0); every
    slide plate is lifted by it in `stage.js`. `captionAnchorX` now means the caption plate's LEFT edge
    (numerically unchanged since `CAPTION_GAP_EM == 0`). `captionOpacities` returns all-zero when
    `captions` is off.
  - **Crop-free camera framing for the full composite**: `compactCamera` fits the frontmost COMPOSITE
    (width `W`, height `H + lift`) and aims at its center (`Y = lift/2`); `expandedCamera` includes the
    lifted slide corners AND the on-floor caption-plate bottom row in its bounding fit, so the
    caption+slide stack is framed with no crop.
  - `stage.js`: lifts plates/borders/reflections by `slideLift`, anchors each caption plate by its LEFT
    edge on the floor, and skips caption plates entirely when the toggle is off.

## [3.0.8] — issues 328, 329, 330

### Changed

- **Static Zalando Sans `<link>` in the generated demos** (328): `verify/example.mjs` now emits the
  Google Fonts preconnect + `Zalando+Sans:wdth,wght@125,500` stylesheet directly in the `<head>` of
  both `playable.html` and `scrollable.html`, so the caption face is available before first paint.
  (The element's runtime `_ensureCaptionFonts` injection from 3.0.7 still awaits `document.fonts`,
  so this just removes the first-frame fallback flash.)

### Verified (no code change needed)

- **`scrollable.html` reflects current src** (329): the demo HTML is regenerated from the live
  `src/` on every `example.sh` / `example.mjs` run (and now also when the Python `example.py`
  rebuilds the JS demos — issue 330), so there is no stale checked-in copy to "port" changes into.
- **`outputs/` cleanup** (330): `example.sh` already `rm -rf outputs` before regenerating, so stale
  artifacts are removed on every rebuild.

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
