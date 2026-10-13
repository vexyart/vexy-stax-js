# Architecture

This page explains how vexy-stax-js turns a scene into frames, and where each
part lives in the source.

## Source layout

```text
src/
├── index.js       public ESM API: VexyStax class and createStax
├── element.js     <vexy-stax> custom element; registers itself on import
├── global.js      entry of the classic-script bundle (window.VexyStax)
├── scene.js       scene parser and validator, makeScene, loadScene
├── geometry.js    view math: plate gaps, stack depth, cameras, easing, frame states
├── stage.js       three.js scene: plates, captions, floor, reflections, camera
├── transition.js  timeline of a transition and the requestAnimationFrame driver
├── scrollspy.js   scroll position → progress, with reduced-motion handling
├── controls.js    the Explain / Preview buttons
└── export.js      PNG export and video recording
schema/            JSON Schema of the scene format
demo-scenes/       editable scene files for the live demos
scripts/           build-docs.mjs, which writes the live demos
tests/             node --test unit tests and Playwright end-to-end tests
verify/            render checks that fail on blank output
src_docs/          this documentation site (ProperDocs)
```

`vite.config.js` builds two bundles from two entries: `src/element.js` as an
ES module (`dist/vexy-stax.element.js`) and `src/global.js` as an IIFE
(`dist/vexy-stax.global.js`). Each bundle includes three.js and mp4-muxer.

## From scene to frame

Take a scene with three slides, the default `camera.gap` of 1920 and the
`expand` transition, mounted in the compact view.

### 1. Parsing

`parseScene` checks the raw object against the scene rules and fills in every
default, so later code never sees a missing field. `loadScene` then resolves
each slide's `src` to an absolute URL. The result is a plain object.

### 2. Geometry

`geometry.js` computes everything about a view as numbers, without three.js:

- **Gaps.** In the expanded view, the space in front of each plate is the
  slide's own `gap` or `camera.gap` (1920 here). In the compact view every gap
  becomes `MIN_GAP` (3 scene units), so the plates almost touch.
- **Depth.** The front plate sits at Z = 0 and the backmost (slide 0) at
  Z = −depth. With three slides the expanded depth is 2 × 1920 = 3840 and the
  compact depth is 2 × 3 = 6.
- **Cameras.** `compactCamera` looks straight down the Z axis at the front
  slide and fits it to the frame. `expandedCamera` orbits by `camera.angle`
  degrees and rises by `camera.elevation` degrees, and fits the whole deck.
  A `distance` such as `"100%"` is solved from the field of view and the
  aspect ratio of the element.
- **Morph.** `frameStateAt(scene, t, aspect)` mixes the two views for a morph
  factor `t` between 0 (compact) and 1 (expanded): camera pose, gaps, slide
  opacities and caption opacities.

The same formulas exist in vexy-stax-py. `tests/geometry.test.js` checks the
JavaScript results against fixture values from the Python test suite.

### 3. Stage

`stage.js` builds the three.js objects once: a textured plane per slide, an
optional border, caption plates, a floor with reflections and a perspective
camera. For each frame it applies a frame state (positions, opacities, camera)
and renders it with the WebGL renderer.

### 4. Motion

Each transition kind is a list of legs between the two views:

| Kind | Legs |
| --- | --- |
| `expand` | compact → expanded |
| `collapse` | expanded → compact |
| `expand_collapse` | compact → expanded, then expanded → compact |
| `collapse_expand` | expanded → compact, then compact → expanded |

`buildTimeline` lays the legs out in time: each leg moves for `duration`
seconds and then holds its end view for `wait` seconds. With the defaults
(3 and 1), `expand_collapse` lasts 8 seconds. Three drivers then move along the timeline:

- `transition()` follows the clock with `requestAnimationFrame`;
- `scrollspy()` follows the scroll position, via `morphAtProgress`;
- `toVideo()` follows the clock while it records each frame, with held frames
  before and after.

In each case the driver computes `t`, asks `frameStateAt` for the state and
renders it.

## Events and state

`VexyStax` remembers the current view. `setView`, `seek`, `transition` and
`toggleView` update it, and every change fires a `viewchange` event on the
container. The buttons from `controls.js` listen to that event to update their
labels.

## Building the documentation site

```text
dist/ ─┐
demo-scenes/ ─┼─ scripts/build-docs.mjs ──> src_docs/md/  (demo pages, bundles, scenes, slides)
vexy-stax-py/testdata ─┘                       │
src_docs/md/*.md ──────────────────────────────┤
                                               └─ src_docs/build.sh (ProperDocs) ──> docs/
```

GitHub Pages serves `docs/` from the `main` branch at
`https://vexy.dev/vexy-stax-js/`. The workflow `.github/workflows/docs.yml`
rebuilds `docs/` when `src_docs/` changes.
