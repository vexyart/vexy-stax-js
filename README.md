# vexy-stax-js

Browser renderer for the [vexy-stax](../SPEC.md) shared scene format: a deck of
layered PNG slides drawn as 3D glass plates in two views (`expanded` / `compact`)
with morphable per-slide opacity. Built on three.js. Ships three ways — an ESM
module, a `<vexy-stax>` Web Component, and a classic-script global.

Scene parser, view geometry (mirrors the Python package exactly), a working
three.js stage (plates + floor + reflections + captions), and the three entry
points. Render ops: a static view, image export (`toImage`), a playable
`transition`, video export (`toVideo`, WebCodecs with a MediaRecorder fallback),
and a scroll-driven `scrollspy` (IntersectionObserver + scroll, honouring
`prefers-reduced-motion`).

## Quick start

```bash
npm install
npm run dev          # vite dev server
npm run build        # -> dist/vexy-stax.element.js + dist/vexy-stax.global.js
npm run test:unit    # node --test (scene.js + geometry.js + transition/scrollspy math)
npm test             # unit + playwright E2E (mount, views, image/video, transition, scrollspy)

# HARD render gate: render compact + expanded stills of the airbl example in
# headless chromium and assert real pixel variance (not a blank canvas):
node verify/run.mjs && python3 verify/gate.py
```

## Usage

Three ways to drop a deck on a page, easiest first (issues 341 / 342).

### Web Component — just a list of slides

```html
<script type="module" src="./dist/vexy-stax.element.js"></script>

<!-- The `slides` attribute: a space/newline-separated list of image URLs (local, data:, or
     remote http(s)). Captions off by default; mode="playable" plays the transition once. -->
<vexy-stax
  slides="layer-0.png layer-1.png https://example.com/layer-2.png"
  view="compact" mode="playable">
</vexy-stax>

<!-- …or point at a full scene JSON (with captions, camera, transition, …): -->
<vexy-stax scene="scene.json" view="expanded"></vexy-stax>

<!-- …or drop the WHOLE scene inline, right where you load the component (issue 701) —
     a `<script type="application/json">` child, no external URL: -->
<vexy-stax view="compact" mode="playable" aspect="3">
  <script type="application/json">
  { "version": 1, "transition": { "kind": "expand_collapse" },
    "slides": [ { "src": "https://example.com/layer-0.png" },
                { "src": "https://example.com/layer-1.png" } ] }
  </script>
</vexy-stax>
```

**Click-to-toggle is on by default** (issue 342): clicking anywhere inside a `<vexy-stax>` fluently
toggles compact↔expanded. Opt out with `click-toggle="false"`.

**Scene-in-init** (issue 342/701): supply an inline scene **without a URL** three ways — assign a
JS object (`el.scene = { version: 1, slides: [{ src: "a.png" }, …] }` or the `config` property), a
JSON-string `config` attribute, or a child **`<script type="application/json">`** holding the whole
scene (shown above; the no-escaping way to "specify the full scene right where you load the
component"). Inline slide `src` paths resolve against the host page, so use absolute URLs when the
images live elsewhere.

**Aspect / size** (issue 701): the `aspect` attribute shapes the box via CSS `aspect-ratio` so a
deck is easy to make short and wide — `aspect="3"` (or `"3/1"`, `"3:1"`, `"16:9"`) gives a 3:1 box;
the camera reframes the deck to fit. `width`/`height` still set an explicit CSS size, and the
scene's own `size` controls the internal plate aspect. `createStax(el, { aspect: "3" })` is the ESM
equivalent.

### ES Module — `createStax`

```js
import { createStax, makeScene, VexyStax, loadScene } from "vexy-stax-js";

// One call: build a scene from a URL list, mount, wait for ready.
const stax = await createStax("#stage", {
  slides: ["layer-0.png", "https://example.com/layer-1.png"],
  gap: 480, transition: "expand_collapse", mode: "playable",
});

await stax.toggleView();          // fluent compact↔expanded (the default click behavior)
const mp4 = await stax.toVideo(); // seekable mp4

// createStax also accepts an inline scene object (scene-in-init):
await createStax("#hero", { scene: { version: 1, slides: [{ src: "a.png" }] }, view: "expanded" });

// makeScene builds a valid scene from a bare URL list, filling sensible defaults:
const scene = makeScene(["a.png", "b.png", "c.png"], { gap: 480, transition: "expand_collapse" });
const low  = new VexyStax(container, scene); // the low-level path is still available
```

`createStax(elOrSelector, opts)` — `opts` accepts `{ slides | scene, view, mode, trigger, width,
height, aspect, clickToggle, baseUrl, …sceneOverrides }`. Any remaining key (`size`, `camera`, `gap`,
`transition`, `background`, `captions`, `floor`, `edge`, …) is forwarded to `makeScene`.

### Global script — `window.VexyStax`

```html
<script src="./dist/vexy-stax.global.js"></script>
<script>
  VexyStax.create("#stage", { slides: ["a.png", "b.png", "c.png"] });
</script>
```

### CDN (no build step)

Every snippet above also works verbatim from the jsDelivr CDN — swap the local bundle path for:

```html
<!-- Web Component / ESM -->
<script type="module" src="https://cdn.jsdelivr.net/npm/vexy-stax-js@3.1.6/dist/vexy-stax.element.js"></script>
<!-- Global script -->
<script src="https://cdn.jsdelivr.net/npm/vexy-stax-js@3.1.6/dist/vexy-stax.global.js"></script>
```

### Remote slide images

Slide `src` may be a local path, a `data:` URI, **or a remote `http(s)` URL**. The texture loader
requests cross-origin images with `crossOrigin="anonymous"`, so a server that sends CORS headers
lets the image load **and** keeps the canvas exportable (`toImage` / `toVideo`).

### Live demos & how-to pages

`npm run build:docs` emits a [docs site](https://vexy.dev/vexy-stax-js/): a landing page, the
**Animated** (`playable.html`) and **Scrollspy** (`scrollable.html`) demos, plus three side-by-side
"how to use" pages — `demo-component.html`, `demo-module.html`, `demo-library.html` — each showing
the minimal code beside the live result (modeled on i.vexy.art/dev/lines-nano).

## Layout

```
src/
├── index.js       # ESM public API (VexyStax: setView/toImage/transition/toVideo/scrollspy)
├── element.js     # <vexy-stax> custom element (auto-registers; mode=static|playable|scrollspy)
├── global.js      # window.VexyStax IIFE entry
├── scene.js       # strict scene parser (mirrors vexy_stax/scene.py)
├── geometry.js    # view math (mirrors vexy_stax/geometry.py exactly) + frameStateAt
├── stage.js       # three.js plates + floor + reflections + captions + camera (two views)
├── transition.js  # rAF morph driver + timeline/progress math (pure, testable)
├── scrollspy.js   # scroll→progress mapping (IntersectionObserver; reduced-motion)
└── export.js      # canvas→PNG; WebCodecs/MediaRecorder video capture
src_docs/          # MaterialX docs pipeline → https://vexy.dev/vexy-stax-js/
├── mkdocs.yaml    #   build: vexy-mkdocs-tools build
└── md/            #   api.md · web-component.md · scene-format.md
tests/             # node --test (scene/geometry/transition/scrollspy) + playwright E2E
verify/            # HARD render gate: harness.html + run.mjs (chromium) + gate.py (PIL)
```

The numeric outputs of `geometry.js` match `vexy-stax-py/src/vexy_stax/geometry.py`
for the same scene; both are tested against the same fixture vectors.

## License

Apache-2.0 — Copyright 2026 Fontlab Ltd.
