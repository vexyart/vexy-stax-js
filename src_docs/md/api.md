# ESM API

Import the API from the element bundle, or from the npm package when you use
a bundler:

```js
import { createStax, VexyStax, loadScene, makeScene, parseScene }
  from "https://vexy.dev/vexy-stax-js/vexy-stax.element.js";

// or, with npm and a bundler
import { createStax, VexyStax, loadScene, makeScene, parseScene } from "vexy-stax-js";
```

The global bundle exposes `VexyStax`, `createStax`, `loadScene`, `makeScene`
and `create` (an alias of `createStax`) on `window.VexyStax`.

## createStax

```js
const stax = await createStax(elOrSelector, opts);
```

`createStax` is the shortest way to a working deck. It:

1. finds the mount element (an element or a CSS selector) and throws
   `createStax: element not found (…)` if there is none;
2. applies `width`, `height` and `aspect` to the element's style;
3. builds the scene: from `slides` with `makeScene`, or from `scene` with
   `loadScene`;
4. overrides the scene's view with `view`, if given;
5. creates a `VexyStax` and waits for `ready`;
6. starts the mode: `playable` plays the scene's transition once (if the scene
   has one); `scrollspy` attaches scroll tracking to `trigger`;
7. turns on click-to-toggle unless `clickToggle` is `false`;
8. adds control buttons if `buttons` is set.

It resolves with the ready `VexyStax` instance.

```js
const stax = await createStax("#stage", {
  slides: ["layer-0.png", "layer-1.png"],
  gap: 480,
  transition: "expand_collapse",
  mode: "playable",
});
```

### Options

| Key | Type | Default | Effect |
| --- | --- | --- | --- |
| `slides` | `string[]` or slide objects | — | Images, back to front. Takes precedence over `scene`. |
| `scene` | URL string or scene object | — | Used when `slides` is absent |
| `view` | `"expanded"` or `"compact"` | the scene's view | Initial view |
| `mode` | `"static"`, `"playable"` or `"scrollspy"` | `"static"` | Start mode |
| `trigger` | element or CSS selector | the mount element | Scroll trigger for `scrollspy` |
| `width`, `height` | CSS length; a bare number means pixels | — | Element size |
| `aspect` | number or string such as `"3/1"` | — | CSS `aspect-ratio` of the element |
| `clickToggle` | boolean | `true` | `false` turns click-to-toggle off |
| `baseUrl` | string | `document.baseURI` | Base for relative slide and scene URLs |
| `buttons` | `true`, `"toggle"`, `"pair"` or an options object | — | Control buttons; see [`controls`](#controlsopts) |
| `explainLabel`, `previewLabel` | string | `"Explain"`, `"Preview"` | Button labels |
| `buttonsPosition` | string | `"bottom"` | Button position |
| `buttonStyle` | string | — | Extra inline CSS for the button bar |

When `slides` is given, every other key that is not in the table above
except the button keys is passed to `makeScene` as a scene override: `size`,
`camera`, `gap`, `transition`, `background`, `captions`, `floor`, `edge`,
`juicy`, `caption_defaults`, `caption_fade` and `video`.

!!! warning "Buttons with `slides`"
    In version 3.1.9 the button keys (`buttons`, `explainLabel`,
    `previewLabel`, `buttonsPosition`, `buttonStyle`) are also forwarded to
    `makeScene`, which rejects them with `makeScene: unknown option "buttons"`.
    With `slides`, call `stax.controls()` after `createStax` instead. With
    `scene`, the button keys work.

## VexyStax

The class behind the element and `createStax`.

```js
const scene = await loadScene("deck.scene.json");
const stax = new VexyStax(document.querySelector("#stage"), scene);
await stax.ready;
```

`new VexyStax(container, scene)` needs a mount element and a parsed scene
(from `loadScene`, `parseScene` or `makeScene`). It throws
`VexyStax: container is required` or
`VexyStax: scene must be a parsed scene object (use loadScene first)`
otherwise. The constructor adds a canvas to the container and starts loading
the slide textures.

### ready

`stax.ready` is a promise that resolves to the instance once the textures are
loaded and the first frame is drawn. The render methods wait for it
themselves.

### toImage({ scale })

```js
const blob = await stax.toImage({ scale: 2 });
```

Renders the current frame and returns it as a PNG `Blob`. With `scale` other
than `1`, it renders once at that multiple of the current pixel ratio, then
restores the canvas. Remote images must be served with CORS headers, or the
canvas cannot be exported.

### toVideo(opts)

```js
const blob = await stax.toVideo();
const blob2 = await stax.toVideo({ kind: "expand" });
```

Records a clip of the transition and returns it as a `Blob`. The clip has
three parts: the start frame repeated `video.first_hold` times (default 10),
the animated transition, and the end frame repeated `video.last_hold` times
(default 10). The frame rate is `video.fps`, else `transition.fps`, else 30.

`opts.kind` overrides the scene's transition kind. Without a kind in either
place, the method throws.

The encoder is chosen automatically:

1. **WebCodecs**: when `VideoEncoder` exists, frames are encoded one by one
   as H.264 (or VP9 when the browser cannot encode H.264) and muxed with
   [mp4-muxer](https://github.com/Vanilagy/mp4-muxer). The file has correct
   duration metadata and can be seeked.
2. **MediaRecorder**: otherwise the canvas stream is recorded live with the
   first supported type among VP9, VP8, WebM and MP4. The result may lack
   duration metadata.

### transition(kind, opts)

```js
await stax.transition();
await stax.transition("expand", { onProgress: (p) => console.log(p) });
```

Plays a transition as an animation and resolves when it ends. `kind` is one
of `expand`, `collapse`, `expand_collapse` and `collapse_expand`; it defaults
to the scene's `transition.kind`. Without either, the method throws.

| Option | Type | Effect |
| --- | --- | --- |
| `onProgress` | `(p) => void` | Called each frame with the overall progress from 0 to 1 |
| `duration` | number (seconds) | Overrides the scene's `transition.duration` |

The container receives `transitionstart` and `transitionend` events, each with
`detail.kind`.

### scrollspy(opts)

```js
const handle = stax.scrollspy({ trigger: "#story", kind: "expand" });
// later
handle.disconnect();
```

Drives the morph from the scroll position of a trigger element. An
`IntersectionObserver` starts the scroll tracking only while the trigger is
visible. The scroll progress from 0 to 1 goes through the same timeline as
the animation (including the `wait` hold), unless you pass `map`.

| Option | Type | Default | Effect |
| --- | --- | --- | --- |
| `trigger` | element or CSS selector | — | Required. Throws `VexyStax.scrollspy: trigger element not found` if missing. |
| `kind` | string | scene transition kind, else `expand` | Timeline to follow |
| `reducedMotion` | boolean | the `prefers-reduced-motion` setting | When true, the deck snaps between compact and expanded instead of morphing |
| `map` | `(p) => t` | — | Your own mapping from scroll progress to morph factor; the result is clamped to 0–1 |

It returns `{ disconnect() }`. Calling `scrollspy` again replaces the previous
tracking.

### controls(opts)

```js
stax.controls({ type: "pair", explainLabel: "Open", previewLabel: "Close", position: "top-right" });
stax.controls(false); // remove the buttons
```

Adds buttons over the deck and replaces any previous ones.

| Option | Values | Default |
| --- | --- | --- |
| `type` | `"toggle"` (one button whose label follows the view) or `"pair"` | `"toggle"` |
| `explainLabel` | text of the expand action | `"Explain"` |
| `previewLabel` | text of the collapse action | `"Preview"` |
| `position` | `bottom`, `top`, `bottom-left`, `bottom-right`, `top-left`, `top-right`, `center` | `bottom` |
| `style` | extra inline CSS for the button bar | — |

The buttons are themed with `--vexy-btn-*` custom properties; see
[Web Component](web-component.md#styling-the-buttons).

### Other instance methods

| Method | Effect |
| --- | --- |
| `setView(view)` | Renders the compact or expanded view without animation. Resolves with the instance. |
| `seek(t)` | Renders the morph at `t` (0 = compact, 1 = expanded, clamped). Emits `viewchange` when `t` crosses 0.5. |
| `toggleView()` | Animates to the other view in 0.7 seconds and resolves with the kind it played (`"expand"` or `"collapse"`), or `null` if a toggle was already running |
| `enableClickToggle()` | Calls `toggleView()` on clicks inside the container, except on buttons, links and form fields |
| `disableClickToggle()` | Removes that click handler |
| `resize(width, height)` | Resizes the renderer and camera; without arguments it uses the container size |
| `destroy()` | Stops animations and scroll tracking, removes buttons and the click handler, and disposes of the three.js stage |

## Scene helpers

### loadScene(urlOrObject, options)

```js
const a = await loadScene("deck.scene.json");
const b = await loadScene("deck.scene.json", { baseUrl: "https://example.com/decks/" });
const c = await loadScene({ version: 1, slides: [{ src: "a.png" }] });
```

With a string, fetches the JSON (relative to `options.baseUrl` or the page)
and throws `Failed to fetch scene <url>: <status>` on an HTTP error. With an
object, uses it directly. In both cases it runs `parseScene` and then resolves
each slide's `src` against the scene URL or `baseUrl`. `data:` URIs are kept
as they are.

### makeScene(slides, opts)

```js
const scene = makeScene(["a.png", "b.png"], { gap: 480, transition: "expand_collapse" });
```

Builds a parsed scene from a list of image URLs or slide objects
(`{ src, caption, opacity, gap }`). Options:

- `baseUrl` resolves relative slide URLs;
- `gap` is a shortcut for `camera.gap`;
- `transition` may be a kind string, which becomes `{ kind: "…" }`;
- `size`, `camera`, `view`, `background`, `captions`, `floor`, `edge`,
  `juicy`, `caption_defaults`, `caption_fade` and `video` map to the scene
  fields of the same name.

Any other option throws `makeScene: unknown option "…"`. An empty slide list
throws too.

### parseScene(raw)

Validates a raw scene object, fills in the defaults and returns the
normalized scene. It rejects anything the schema does not allow, with
messages such as:

```text
slides is required
version must be 1 (got 2)
Unknown key "bogus" in scene
slides[0].opacity must be <= 1
transition.kind must be one of expand, collapse, expand_collapse, collapse_expand (got "spin")
```

## Lower-level exports

`src/index.js` also exports the pure functions that the renderer is built on.
They have no DOM dependencies and are covered by the unit tests:

- geometry: `MIN_GAP`, `FILL`, `plateGaps`, `stackDepth`, `compactCamera`,
  `expandedCamera`, `ease`, `interpolateOpacity`, `framePlan`, `frameStateAt`;
- timing: `buildTimeline`, `morphAtProgress`, `transitionEndpoints`;
- scroll: `computeScrollProgress`, `prefersReducedMotion`;
- scene: `resolvedOpacity`;
- export: `canvasToPngBlob`.

These are exported from the npm entry (`src/index.js`), not from the element
bundle.
