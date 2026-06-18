<!-- this_file: CHANGELOG.md -->

# Changelog

All notable changes to this project are documented here.

## [3.0.17] — control-button + docs-scene follow-ups

### Fixed

- **Control-button label was stale during scrollspy** (343/344): the single toggle button only
  refreshed on a click-toggle's `transitionend`, so while the deck morphed by SCROLL (`seek`) the
  label lagged (said "Explain" while already expanded). `VexyStax` now emits a **`viewchange`**
  CustomEvent whenever `_currentView` flips — from `seek` (scroll), `setView`, or a transition — and
  the buttons listen to it, so the label always reflects the current view (and thus the action a
  click will perform). Verified: `seek(0.7)` → "Preview", `seek(0.2)` → "Explain".
- **Demo scene edits were silently overwritten** (build): `docs/airbl-demo.scene.json` and
  `docs/airbl-scrollable.scene.json` were REGENERATED from the shared py testdata on every
  `build:docs`, clobbering hand edits. The demos now have **editable source files** under
  `vexy-stax-js/demo-scenes/` that the build merely COPIES into `docs/` (seeding them once from the
  testdata + default floor if absent). Edit `demo-scenes/airbl-scrollable.scene.json` to customize
  the scrollable demo — it persists. (The slide PNGs are still copied from the py testdata.)

## [3.0.16] — issue 344

### Fixed

- **Back slides' caption plates painted over front slides** (344): in the expanded view a caption
  attached to a slide behind the front (e.g. "Halftone fill: Dots") drew ON TOP OF the frontmost
  slide. The three.js plates use `depthWrite:false` and the captions `depthTest:false`, so DRAW
  ORDER — not depth — decides compositing, but every plate shared `renderOrder 0` and every caption
  `renderOrder 2`, so all captions painted over all plates. Each slide now owns a **per-slide
  render-order block** `i*4` (index 0 = backmost): plate `i*4`, border `i*4+1`, caption `i*4+2`. A
  front slide's plate (`(i+1)*4`) therefore paints AFTER — and its opaque pixels cover — a back
  slide's caption (`i*4+2`), while transparent areas still let it show through. Mirrors the pygfx
  engine's issue-327 ordering. (The pygfx + Blender engines occlude correctly via the depth buffer /
  real 3D depth and were unaffected.) Verified: the frontmost slide is no longer overdrawn by the
  caption of the slide behind it.

## [3.0.15] — issue 343

### Added

- **Built-in control buttons** (343): an opt-in overlay over the deck that switches views via the
  smooth click-toggle. Two layouts: `buttons="toggle"` — ONE relabeling button ("Explain" while
  compact → expand, then "Preview" while expanded → collapse); `buttons="pair"` — two side-by-side
  buttons ("Explain" / "Preview"). Default placement is just above the bottom, horizontally
  centered; default styling is black text on a barely-there (5 %) blurred black pill. Fully
  customizable: labels via `explain-label`/`preview-label`, placement via `buttons-position`
  (`bottom`|`top`|`bottom-left`|…|`center`), and every visual via `--vexy-btn-*` CSS custom
  properties (`--vexy-btn-color`/`-bg`/`-blur`/`-radius`/`-pad`/…). Exposed three ways:
  the `<vexy-stax buttons="…">` attributes, `createStax(el, { buttons, explainLabel, previewLabel,
  buttonsPosition, buttonStyle })`, and the `VexyStax.controls(opts)` method. New `src/controls.js`
  (`attachControls`). Showcased on the scrollable demo + demo-component. Verified headless: the
  toggle relabels Explain⇄Preview across clicks, the pair renders with custom labels, no errors.

## [3.0.14] — issue 342 (scrollspy polish)

### Fixed

- **Click-toggle on the scrollspy demo snapped back to expanded** (342): after a click collapsed
  the deck, the next scroll event re-seeked it to the scroll-position-derived value (expanded). The
  `scrollable.html` scroll handler now uses a **manual-hold** model — a click-toggled state is held
  until the scroll position naturally reaches the matching endpoint, then control hands back to
  scroll seamlessly. The deck no longer snaps back.
- **Post-toggle compact view was framed "too close" (plates cropped)** (342): `playTransition` ran
  `frameStateAt(scene, t)` **without** the live container aspect, so animated transition frames fell
  back to the scene aspect and the compact endpoint was framed closer than `setView`/`seek` (which
  pass the live aspect). `transition()` now threads `this.stage.camera.aspect` through to
  `playTransition` → `frameStateAt`. Verified: the post-toggle compact camera matches the initial
  compact camera exactly on a wide container.
- **Click-toggle transition was too slow** (342): a toggle reused the scene's `transition.duration`
  (up to 3 s for scroll-story scenes). `toggleView()` now plays a snappy fixed **0.7 s** leg via a
  new `opts.duration` override on `transition()`/`playTransition()`, independent of the scene timing.

### Changed

- **Scrollable demo stage is `100vw × 60vh`** (user request): shorter and wider than the previous
  2:1 box. The camera fits the deck to this live aspect (see the aspect fix above).

## [3.0.13] — issues 341, 342

### Added

- **`makeScene(slides, opts)`** (341): the "extremely easy to use" entry point — build a valid scene
  from a bare list of slide image URLs (or `{src, caption, opacity, gap}` objects) plus a flat
  options bag (`size`, `camera`, `gap`, `transition`, `view`, `background`, `captions`, `floor`,
  `edge`, …). Defaults are filled so `makeScene(["a.png", "b.png"])` renders. Goes through the same
  strict `parseScene` (illegal scenes still throw) and resolves slide srcs against `opts.baseUrl`.
  Exported from `vexy-stax-js`, the element bundle, and the global build.
- **`createStax(elOrSelector, opts)`** (341): an ESM factory mirroring lines-nano's `createNano`.
  Resolves the element, builds the scene (from `slides` via `makeScene`, or `scene` via `loadScene`
  — a URL **or** an inline object), mounts a `VexyStax`, waits for `ready`, optionally starts a mode
  (`playable`/`scrollspy`), and returns the ready instance. Re-exported from the element bundle so a
  single CDN `<script>` import gives `createStax`/`makeScene`/`loadScene`/`VexyStax`.
- **`slides` + `captions` attributes on `<vexy-stax>`** (341): `<vexy-stax slides="a.png b.png c.png"
  view="compact" mode="playable">` builds a scene from a space/newline-separated URL list (no scene
  JSON needed). `captions` toggles caption plates. The existing `scene`/`config` paths are unchanged.
- **Remote slide images** (341): the three.js `TextureLoader` now sets `crossOrigin="anonymous"`, so
  slide `src` may be a remote `http(s)` URL — the image loads cross-origin **and** the canvas stays
  exportable (`toImage`/`toVideo`) when the server sends CORS headers. `resolveSrc` already preserved
  absolute URLs; this is the last piece. Verified headless (a slide referenced by an absolute http
  URL loads and exports a non-trivial PNG).
- **Click-to-toggle** (342): clicking anywhere inside an interactive container fluently transitions
  between views — not-compact → collapse to compact, compact → expand. It reuses the morph driver (a
  smooth `expand`/`collapse` leg — never a snap) and is **ON by default** for the `<vexy-stax>`
  element and every `createStax` instance, layered **on top of** scrollspy (scroll drives the morph;
  a click still toggles). New methods: `VexyStax.toggleView()` / `.enableClickToggle()` /
  `.disableClickToggle()` and `el.toggleView()`. Opt out via `click-toggle="false"` (attribute) or
  `createStax(el, { clickToggle: false })`.
- **Scene-in-init** (342): pass a full inline scene **object** at initialization — `createStax(el,
  { scene: {…} })` and the `<vexy-stax>` `el.scene = {…}` property (alongside the existing `config`
  property). No URL / fetch required.
- **Step-by-step how-to demos in `docs/`** (341): `scripts/build-docs.mjs` now also emits
  `demo-component.html` (declarative `<vexy-stax>`), `demo-module.html` (ESM `createStax`/inline scene
  /click-to-toggle), and `demo-library.html` (global `window.VexyStax.create`) — each a side-by-side
  "minimal code + live element" page modeled on i.vexy.art/dev/lines-nano. The landing page gains a
  "Use it — three ways" section linking to them, and every page documents **both** the co-located
  local bundle and the **jsDelivr CDN** URL (`https://cdn.jsdelivr.net/npm/vexy-stax-js@<version>/…`,
  version read from `package.json`). The existing `playable.html` / `scrollable.html` are unchanged
  except the scrollspy demo now lets a click toggle on top of the scroll.

### Changed

- **Default floor → invisible white pane with faint reflections** (`#ffffff` / opacity `0.0` /
  reflectivity `0.1`): `scene.js` `parseFloor`, the JSON schema, and the docs demos now default to a
  floor with **no visible grey rectangle** (opacity 0) and only a whisper of mirror (reflectivity
  0.1). Kept in exact lockstep with `vexy_stax.scene.Floor` (PY↔JS parity). The previous default was
  a smoked-glass dark tint (`#1a1a1a` / `0.04` / `0.5`).

### Notes

- The package version is `3.1.2` (the next patch after the published `3.1.1`); this CHANGELOG entry
  follows the repo's `3.0.x` issue-tracking heading convention for issues 341/342. CDN URLs in the
  docs/README pin to `3.1.2`.

## [3.0.12] — issue 341

### Changed

- **`docs/` is now a proper landing page** (341): https://vexy.dev/vexy-stax-js/ used to embed the
  playable animation directly (with the dated grey-reflection floor) and linked to nothing.
  `scripts/build-docs.mjs` now emits `index.html` as a LANDING PAGE — a hero + three cards linking
  to the **Animated demo** (`playable.html`), the **Scrollspy demo** (`scrollable.html`), and the
  **Documentation** at https://vexy.dev/vexy-stax-py/ — plus install/usage snippets, and no embedded
  animation. The two demos are emitted as their own pages using clean-floor scene variants
  (`airbl-demo.scene.json` / `airbl-scrollable.scene.json`, reflectivity 0) so neither shows the grey
  reflection "shadows". All paths are relative so the site works both locally and under
  `/vexy-stax-js/`. Verified headless: both demos mount without errors and the landing cards resolve.

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
