---
title: vexy-stax-js
---
<!-- this_file: src_docs/md/index.md -->

# vexy-stax-js

A stack of PNGs becomes a glass tower. One scene file drives both Python and the browser.

Browser renderer for the [vexy-stax](https://github.com/vexyart/vexy-stax-dev) shared scene
format: a deck of layered PNG slides drawn as 3D glass plates in two views (`expanded` /
`compact`) with morphable per-slide opacity. Built on [three.js](https://threejs.org/). Ships
three ways — an ESM module, a `<vexy-stax>` Web Component, and a classic-script global.

## Install

```bash
npm install vexy-stax-js
```

Or use from CDN — no build step needed:

```html
<!-- Web Component + ESM bundle -->
<script type="module" src="https://cdn.jsdelivr.net/npm/vexy-stax-js/dist/vexy-stax.element.js"></script>
<!-- Global script (window.VexyStax) -->
<script src="https://cdn.jsdelivr.net/npm/vexy-stax-js/dist/vexy-stax.global.js"></script>
```

## Quickest path

```html
<vexy-stax
  slides="layer-0.png layer-1.png layer-2.png"
  view="compact"
  mode="playable">
</vexy-stax>
```

That is all it takes. The element builds a scene from the slide list, mounts a three.js stage,
and plays the transition once when ready.

## Navigation

| Page | Contents |
|---|---|
| [ESM API](api.md) | `VexyStax` class, `createStax`, `toImage`, `toVideo`, `transition`, `scrollspy` |
| [Web Component](web-component.md) | All `<vexy-stax>` HTML attributes and JS properties |
| [Scene Format](scene-format.md) | JSON schema reference for `.scene.json` files |

## Architecture

```
src/
├── index.js       — ESM public API (VexyStax class + createStax factory)
├── element.js     — <vexy-stax> custom element (auto-registers on import)
├── global.js      — window.VexyStax IIFE entry
├── scene.js       — strict scene parser (mirrors vexy_stax/scene.py)
├── geometry.js    — view math (mirrors vexy_stax/geometry.py) + frameStateAt
├── stage.js       — three.js plates + floor + reflections + captions + camera
├── transition.js  — rAF morph driver + timeline / progress math (pure, testable)
├── scrollspy.js   — scroll→progress mapping (IntersectionObserver + reduced-motion)
└── export.js      — canvas→PNG; WebCodecs / MediaRecorder video capture
```

The numeric outputs of `geometry.js` are tested against fixture vectors from the Python package
(`vexy-stax-py`) to guarantee both renderers produce the same camera / spacing math.

## License

Apache-2.0 — Copyright 2026 Fontlab Ltd.
