---
title: ESM API
---
<!-- this_file: src_docs/md/api.md -->

# ESM API

Import from `vexy-stax-js` (or the built `dist/vexy-stax.element.js`):

```js
import {
  VexyStax,    // low-level class
  createStax,  // high-level factory (recommended)
  loadScene,   // fetch + parse a scene JSON URL
  makeScene,   // build a scene from a bare URL list
  parseScene,  // parse + validate a raw scene object
} from "vexy-stax-js";
```

---

## `createStax(elOrSelector, opts)` — recommended entry point

Resolve the mount element, build or fetch the scene, mount a `VexyStax`, wait
until it is ready, and optionally start a mode. Returns the ready instance.

```js
const stax = await createStax("#stage", {
  slides: ["layer-0.png", "layer-1.png"],
  gap: 480,
  transition: "expand_collapse",
  mode: "playable",
});
```

### `opts` reference

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `slides` | `string[] \| object[]` | — | Slide image URLs or slide objects (easy path via `makeScene`). Mutually exclusive with `scene`. |
| `scene` | `string \| object` | — | Scene URL to fetch, or an inline scene object (via `loadScene`). |
| `view` | `"expanded" \| "compact"` | scene default | Initial view override. |
| `mode` | `"static" \| "playable" \| "scrollspy"` | `"static"` | `"playable"` plays the transition once when ready; `"scrollspy"` attaches a scroll story. |
| `trigger` | `Element \| string` | the element | Scrollspy trigger (default: the mount element). |
| `width` | `string \| number` | — | CSS width override on the element (bare numbers get `px`). |
| `height` | `string \| number` | — | CSS height override. |
| `aspect` | `string \| number` | — | CSS `aspect-ratio` (e.g. `3`, `"3/1"`, `"16:9"`). |
| `clickToggle` | `boolean` | `true` | Click-to-toggle compact↔expanded. Pass `false` to opt out. |
| `baseUrl` | `string` | `document.baseURI` | Base URL for resolving relative slide/scene paths. |
| _any other key_ | — | — | Forwarded to `makeScene` as a flat scene override (`size`, `camera`, `gap`, `transition`, `background`, `captions`, `floor`, `edge`, …). |

---

## `VexyStax` class

Low-level API — use when you need full control. `createStax` wraps this.

```js
const scene = await loadScene("scene.json");
const stax  = new VexyStax(container, scene);
await stax.ready;
```

### Constructor

```js
new VexyStax(container: HTMLElement, scene: object)
```

- `container` — the DOM element to mount the three.js canvas into.
- `scene` — a **parsed** scene object (from `loadScene` / `parseScene` / `makeScene`).

### `ready`

```js
await stax.ready;
```

`Promise<this>` — resolves once textures are loaded and the initial view is rendered.

---

### `toImage({ scale? })`

```js
const blob = await stax.toImage({ scale: 2 });
```

Render the current view to a PNG `Blob`. `scale` re-renders at a higher pixel
density (e.g. `2` for 2× HiDPI export). The canvas must remain tainted-free —
all slide images must be served with CORS headers when remote.

**Returns:** `Promise<Blob>` (PNG)

---

### `toVideo(opts?)`

```js
const blob = await stax.toVideo();
const mp4  = await stax.toVideo({ kind: "expand" });
```

Record the full transition (held-still intro → animation → held-still outro) to
an encoded video `Blob`.

**Encoding path** (automatic selection, no configuration needed):

1. **PRIMARY — WebCodecs + mp4-muxer** (Chrome 94+, Edge 94+, recent Safari):
   `VideoEncoder` encodes each rendered frame frame-accurately into H.264/mp4
   (preferred) or VP9/webm. Output is a fully seekable container with correct
   duration and per-stream frame-count metadata.
2. **FALLBACK — MediaRecorder** (`canvas.captureStream`): used when
   `VideoEncoder` is unavailable (older browsers, some WebViews). The codec is
   selected from the first supported type in `[vp9, vp8, webm, mp4]`. The
   resulting blob is a live-capture webm stream; it may lack seekable duration
   metadata.

Held stills flank the clip: `scene.video.first_hold` copies of the start frame
and `scene.video.last_hold` copies of the end frame (default 10 each).

| Option | Type | Description |
|--------|------|-------------|
| `kind` | `string` | Override `scene.transition.kind` (`expand`, `collapse`, `expand_collapse`, `collapse_expand`). |

**Returns:** `Promise<Blob>` — mp4 (WebCodecs path) or webm (MediaRecorder fallback)

---

### `transition(kind?, opts?)`

```js
await stax.transition();
await stax.transition("expand", { onProgress: (p) => console.log(p) });
```

Play the transition as a real-time animation. Renders each frame via
`requestAnimationFrame`. Resolves when the animation finishes. Emits
`transitionstart` and `transitionend` `CustomEvent`s on the container.

| Option | Type | Description |
|--------|------|-------------|
| `kind` | `string` | Override `scene.transition.kind`. |
| `onProgress` | `(p: number) => void` | Called each frame with progress [0,1]. |
| `duration` | `number` | Override the animation duration in seconds. |

**Returns:** `Promise<this>`

---

### `scrollspy(opts)`

```js
const handle = stax.scrollspy({
  trigger: "#scroll-region",
  kind: "expand_collapse",
});
// later:
handle.disconnect();
```

Drive the transition from scroll position over a trigger element.
`IntersectionObserver` activates the `scroll`+`rAF` loop only while the trigger
is visible, mapping scroll progress [0,1] to a morph factor via the scene's
transition timeline.

**`prefers-reduced-motion` handling**: when the OS/browser reports reduced
motion (or `opts.reducedMotion: true`), no per-frame interpolation occurs.
Instead, a lightweight scroll listener snaps to the nearest endpoint (0 or 1)
based on whether the trigger's center has passed the middle of the viewport.

| Option | Type | Description |
|--------|------|-------------|
| `trigger` | `Element \| string` | The scroll region (element or CSS selector). Required. |
| `kind` | `string` | Override `scene.transition.kind`. |
| `reducedMotion` | `boolean` | Override `prefers-reduced-motion` detection. |
| `map` | `(p: number) => number` | Custom progress→morph mapping. Use for non-linear stories such as tent functions (compact at edges, expanded when centered). |

**Returns:** `{ disconnect(): void }` — call `.disconnect()` to stop observing.

---

### Other instance methods

| Method | Description |
|--------|-------------|
| `setView(view)` | Position the deck for `"compact"` or `"expanded"` and render a frame. Returns `Promise<this>`. |
| `seek(t)` | Apply morph factor `t ∈ [0,1]` (0 = compact, 1 = expanded) and render. The low-level scrub primitive used by scrollspy. |
| `toggleView()` | Fluently transition between the two views (click-to-toggle logic). Returns `Promise<"expand"|"collapse">`. |
| `enableClickToggle()` | Wire a click handler on the container that calls `toggleView()`. ON by default from `createStax`. |
| `disableClickToggle()` | Remove the click-to-toggle handler. |
| `controls(opts)` | Add built-in toggle/pair overlay buttons (issue 343). Pass `false` to remove. |
| `resize(w?, h?)` | Resize renderer/camera (defaults to container `clientWidth/Height`). |
| `destroy()` | Tear down the three.js stage, stop rAF loops, remove the canvas. |

---

## Scene construction helpers

### `loadScene(urlOrObject, options?)`

Fetch and parse a scene from a URL string, or parse an inline object.

```js
const scene = await loadScene("scene.json");
const scene = await loadScene("scene.json", { baseUrl: "https://example.com/" });
const scene = await loadScene({ version: 1, slides: [{ src: "a.png" }] });
```

Slide `src` paths are resolved relative to the scene URL (or `options.baseUrl`).
`data:` URIs pass through unchanged.

### `makeScene(slides, overrides?)`

Build a valid scene from a bare list of image URLs or slide objects, filling
sensible defaults.

```js
const scene = makeScene(["a.png", "b.png"], {
  gap: 480,
  transition: "expand_collapse",
  background: "#f5f5f5",
});
```

Any key that appears in the JSON schema (`size`, `camera`, `gap`, `transition`,
`background`, `captions`, `floor`, `edge`, `caption_defaults`, …) is accepted
as a flat override. `gap` is a shortcut for `camera.gap`; `transition` as a
string is expanded to `{ kind: value }`.

### `parseScene(raw)`

Strict parser and validator for a raw scene object. Throws a descriptive error
for unknown keys, bad enum values, out-of-range numbers, or a missing `slides`
array. Fills defaults from the JSON schema.

```js
const scene = parseScene(JSON.parse(jsonString));
```
