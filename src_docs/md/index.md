# vexy-stax-js

vexy-stax-js draws a stack of images as a deck of 3D glass plates in the
browser. It reads the vexy-stax scene format, the same JSON file that the
Python package [vexy-stax-py](https://vexy.dev/vexy-stax-py/) renders, and
shows the deck in two views:

- **expanded**: the plates stand apart, seen from an angle, so each layer is
  visible on its own;
- **compact**: the plates close up into one flat picture, seen head-on.

The deck can morph between the two views as an animation, on a click, or as
the page scrolls. It can export the current view as a PNG image and the
transition as a video. Rendering uses [three.js](https://threejs.org/).

## Three ways to use it

| Entry point | File | Use it when |
| --- | --- | --- |
| `<vexy-stax>` Web Component | `vexy-stax.element.js` | You want markup only, no JavaScript |
| ES module: `createStax`, `VexyStax` | `vexy-stax.element.js` or the npm package | You script the deck |
| Global script: `window.VexyStax` | `vexy-stax.global.js` | You load a classic `<script>` without modules |

The smallest working page needs one script tag and one element:

```html
<script type="module" src="https://vexy.dev/vexy-stax-js/vexy-stax.element.js"></script>

<vexy-stax slides="layer-0.png layer-1.png layer-2.png" view="compact"></vexy-stax>
```

The element builds a scene from the image list, renders it in the compact
view, and toggles between compact and expanded when you click it. See the
[Quickstart](quickstart.md).

## Live demos

| Demo | What it shows |
| --- | --- |
| [Demo overview](demos.html) | All demos with install snippets |
| [Animated demo](playable.html) | Play the compact ↔ expanded transition or switch views with buttons |
| [Scrollspy demo](scrollable.html) | The deck unfolds as the page scrolls |
| [Web Component how-to](demo-component.html) | Minimal `<vexy-stax>` markup next to the live result |
| [ES module how-to](demo-module.html) | `createStax` calls next to the live result |
| [Global script how-to](demo-library.html) | `window.VexyStax.create` next to the live result |

The demos are described in [Live demos](live-demos.md).

## Documentation

- [Installation](installation.md): npm, hosted bundles and building from
  source
- [Quickstart](quickstart.md): one deck, three ways
- [Web Component](web-component.md): attributes, properties and events of
  `<vexy-stax>`
- [ESM API](api.md): `createStax`, the `VexyStax` class and the scene helpers
- [Scene format](scene-format.md): every field of a `.scene.json` file
- [Architecture](architecture.md): source layout and how a frame is drawn
- [Contributing](contributing.md): tests, render checks and rebuilding the
  demos

## License

Apache-2.0. Copyright 2026 Fontlab Ltd.
