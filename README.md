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

ESM:

```js
import { VexyStax, loadScene } from "vexy-stax-js";
const scene = await loadScene("scene.json");
const stax = new VexyStax(container, scene);
await stax.setView("compact");
const blob = await stax.toImage({ scale: 2 });
```

Web Component:

```html
<script type="module" src="./dist/vexy-stax.element.js"></script>
<vexy-stax scene="scene.json" view="expanded"></vexy-stax>
```

Global:

```html
<script src="./dist/vexy-stax.global.js"></script>
<script>const stax = new VexyStax.VexyStax(el, scene);</script>
```

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
tests/             # node --test (scene/geometry/transition/scrollspy) + playwright E2E
verify/            # HARD render gate: harness.html + run.mjs (chromium) + gate.py (PIL)
```

The numeric outputs of `geometry.js` match `vexy-stax-py/src/vexy_stax/geometry.py`
for the same scene; both are tested against the same fixture vectors.

## License

Apache-2.0 — Copyright 2026 Adam Twardoch / VexyArt
