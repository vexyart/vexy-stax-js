# Installation

vexy-stax-js runs in the browser. It needs WebGL for rendering. Video export
uses WebCodecs where the browser has it and falls back to `MediaRecorder`.

There are two ways to get it: load a prebuilt bundle with a `<script>` tag,
or install the npm package and let your bundler include it.

## Prebuilt bundles

The build produces two self-contained bundles. three.js and the MP4 muxer are
compiled in, so a page needs nothing else.

| Bundle | Format | Provides |
| --- | --- | --- |
| `vexy-stax.element.js` | ES module | Registers `<vexy-stax>` and exports `createStax`, `VexyStax`, `makeScene`, `loadScene`, `parseScene` |
| `vexy-stax.global.js` | Classic script (IIFE) | Registers `<vexy-stax>` and sets `window.VexyStax` |

### Use the hosted copy

This site serves the current bundles next to the demos. GitHub Pages sends
`Access-Control-Allow-Origin: *`, so other sites can load them:

```html
<!-- Web Component and ES module -->
<script type="module" src="https://vexy.dev/vexy-stax-js/vexy-stax.element.js"></script>

<!-- Global script -->
<script src="https://vexy.dev/vexy-stax-js/vexy-stax.global.js"></script>
```

The hosted copy changes when the site is rebuilt. For a fixed version, copy
the file into your own project.

### Build the bundles yourself

Prerequisites: Git and Node.js 18 or later (the repository's `.nvmrc` pins
Node 20).

1. Clone the repository and install the development dependencies:

    ```bash
    git clone https://github.com/vexyart/vexy-stax-js.git
    cd vexy-stax-js
    npm ci
    ```

2. Build:

    ```bash
    npm run build
    ```

    Vite writes `dist/vexy-stax.element.js` and `dist/vexy-stax.global.js`,
    each with a source map.

3. Copy the bundle you need into your site and load it with a `<script>` tag.

## npm package

```bash
npm install vexy-stax-js
```

The package's `exports` entry points to `src/index.js`, the unbundled ES
module source, with `three` and `mp4-muxer` as dependencies. A bundler such
as Vite, Rollup or webpack resolves them:

```js
import { createStax, makeScene, VexyStax, loadScene } from "vexy-stax-js";
```

The `src/index.js` entry does not register the `<vexy-stax>` element, and
the package's `exports` map exposes only that entry (and `package.json`). For
the Web Component, load the prebuilt `vexy-stax.element.js` bundle.

!!! note "jsDelivr URLs"
    The npm package ships `src/` and `schema/` but not `dist/`. URLs of the
    form `https://cdn.jsdelivr.net/npm/vexy-stax-js@<version>/dist/…`, which
    the demo pages mention, return 404 for the published versions. Use the
    hosted copy above instead.

## JSON Schema

The package includes `schema/vexy-stax-scene.schema.json`, a JSON Schema for
scene files. Point your editor at it to get completion and validation while
you write a scene. See [Scene format](scene-format.md).

## Browser requirements

| Feature | Needed for |
| --- | --- |
| WebGL | All rendering (three.js `WebGLRenderer`) |
| Custom elements | `<vexy-stax>` |
| `ResizeObserver` | Refitting the camera when the element changes size |
| `IntersectionObserver` | Scroll-driven mode (`mode="scrollspy"`) |
| WebCodecs `VideoEncoder` | Seekable MP4 or WebM export with `toVideo()` |
| `MediaRecorder` | The `toVideo()` fallback when WebCodecs is missing |
