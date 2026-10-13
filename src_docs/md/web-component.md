# Web Component

`<vexy-stax>` puts a deck on a page with markup only. Load the element bundle
once; the element registers itself under the tag name `vexy-stax`.

```html
<script type="module" src="https://vexy.dev/vexy-stax-js/vexy-stax.element.js"></script>

<!-- a deck from a list of images -->
<vexy-stax slides="layer-0.png layer-1.png layer-2.png"></vexy-stax>

<!-- a deck from a scene file -->
<vexy-stax scene="deck.scene.json" view="compact" aspect="16/9" buttons></vexy-stax>
```

The global bundle `vexy-stax.global.js` registers the same element.

## How the element mounts

When the element is added to the page, it:

1. sets `display: block` and `position: relative` unless they are already set,
   and applies `width`, `height` and `aspect`;
2. finds the scene, in this order of precedence:
    1. the `config` property or `config` attribute (an inline scene),
    2. a child `<script type="application/json">` or
       `<script type="application/vexy-scene+json">` (an inline scene),
    3. the `scene` attribute (a URL to fetch),
    4. the `slides` attribute (a list of image URLs);
3. creates a `VexyStax` instance inside itself and waits until the textures
   are loaded;
4. starts scroll tracking if `mode="scrollspy"`;
5. turns on click-to-toggle unless `click-toggle="false"`;
6. adds control buttons if `buttons` is present;
7. fires `ready`.

If none of the four scene sources is present, the element renders nothing.
Relative slide paths in an inline scene or in `slides` resolve against the
page URL; in a scene file they resolve against the scene file's URL.

## Attributes

### Scene source

| Attribute | Value | Effect |
| --- | --- | --- |
| `slides` | Image URLs separated by spaces or newlines | Builds a scene with `makeScene`. The first URL is the backmost plate. |
| `captions` | `true` or `false` | With `slides` only: the global `captions` setting of the built scene |
| `scene` | URL of a `.scene.json` file | Fetches and parses the scene |
| `config` | Scene as a JSON string | Inline scene; read once when the element connects |

A child `<script>` holds a full scene without attribute escaping:

```html
<vexy-stax view="compact" aspect="3">
  <script type="application/json">
  {
    "version": 1,
    "transition": { "kind": "expand_collapse" },
    "slides": [
      { "src": "https://example.com/layer-0.png", "caption": { "text": "First layer" } },
      { "src": "https://example.com/layer-1.png" }
    ]
  }
  </script>
</vexy-stax>
```

Invalid JSON in that child fails the mount with
`<vexy-stax>: inline <script> scene is not valid JSON (…)`.

### View and size

| Attribute | Value | Default | Effect |
| --- | --- | --- | --- |
| `view` | `expanded` or `compact` | the scene's `view`, else `expanded` | Initial view. Changing it later calls `setView`. |
| `width` | CSS length; a bare number means pixels | — | CSS width of the element |
| `height` | CSS length; a bare number means pixels | — | CSS height of the element |
| `aspect` | `3`, `3/1`, `3:1`, `16x9`, … | — | CSS `aspect-ratio`; `:` and `x` become `/` |

The camera fits the deck to the element's box whenever its size changes.

### Playback mode

| Attribute | Value | Default | Effect |
| --- | --- | --- | --- |
| `mode` | `static`, `playable` or `scrollspy` | `static` | See below |
| `trigger` | CSS selector | the element | The element whose scroll position drives `scrollspy` |

- `static` renders the initial view.
- `playable` also renders the initial view. The element does not start the
  transition itself; call `el.transition()` from your script, for example from
  a button or the `ready` event. (`createStax` with `mode: "playable"` does play
  the transition once.)
- `scrollspy` maps the scroll position of the trigger to the morph between
  compact and expanded. See [`scrollspy`](api.md#scrollspyopts).

### Interaction

| Attribute | Value | Default | Effect |
| --- | --- | --- | --- |
| `click-toggle` | `false` to turn off | on | A click inside the element animates to the other view |
| `buttons` | `toggle`, `pair`, or empty | no buttons | `toggle`: one button whose label follows the view. `pair`: two buttons. An empty `buttons` attribute means `toggle`. `false` means no buttons. |
| `explain-label` | text | `Explain` | Label of the button that expands the deck |
| `preview-label` | text | `Preview` | Label of the button that collapses the deck |
| `buttons-position` | `bottom`, `top`, `bottom-left`, `bottom-right`, `top-left`, `top-right`, `center` | `bottom` | Position of the buttons inside the element |

Changing `width`, `height`, `aspect`, `view` or `click-toggle` updates the
mounted deck in place. Changing any other observed attribute mounts the deck
again.

## Properties

| Property | Type | Effect |
| --- | --- | --- |
| `config` | object, JSON string or `null` | Inline scene; setting it mounts the deck again |
| `scene` | string or object | Setting an object, or a string that starts with `{`, sets `config`. Setting another string sets the `scene` attribute. Reading returns `config`, else the `scene` attribute. |
| `instance` | `VexyStax` or `null` | The underlying instance, `null` until mounted |

## Methods

The element forwards these calls to its `VexyStax` instance. Before the
instance exists they return `undefined`.

| Method | See |
| --- | --- |
| `setView(view)` | [`setView`](api.md#other-instance-methods) |
| `seek(t)` | [`seek`](api.md#other-instance-methods) |
| `transition(kind, opts)` | [`transition`](api.md#transitionkind-opts) |
| `toggleView()` | [`toggleView`](api.md#other-instance-methods) |
| `toImage(opts)` | [`toImage`](api.md#toimage-scale) |
| `toVideo(opts)` | [`toVideo`](api.md#tovideoopts) |
| `scrollspy(opts)` | [`scrollspy`](api.md#scrollspyopts) |

## Events

All events are `CustomEvent`s dispatched on the element.

| Event | `detail` | Fired when |
| --- | --- | --- |
| `ready` | `{ instance }` | The deck is mounted and its first view is rendered |
| `error` | `{ error }` | Mounting failed, for example because the scene is invalid |
| `transitionstart` | `{ kind }` | A transition animation starts |
| `transitionend` | `{ kind }` | A transition animation finishes |
| `viewchange` | `{ view }` | The current view changes between `compact` and `expanded`, including when a scroll-driven `seek` crosses the halfway point |

```js
const el = document.querySelector("vexy-stax");
el.addEventListener("ready", (e) => {
  e.detail.instance.transition("expand");
});
```

## Styling the buttons

The buttons read these CSS custom properties from the element:

| Property | Default |
| --- | --- |
| `--vexy-btn-color` | `#000` |
| `--vexy-btn-bg` | `rgba(0,0,0,0.05)` |
| `--vexy-btn-blur` | `10px` |
| `--vexy-btn-border` | `1px solid rgba(0,0,0,0.08)` |
| `--vexy-btn-radius` | `999px` |
| `--vexy-btn-pad` | `9px 18px` |
| `--vexy-btn-font` | `14px` (font size) |
| `--vexy-btn-weight` | `600` |
| `--vexy-btn-shadow` | `0 2px 10px rgba(0,0,0,0.06)` |
| `--vexy-btn-bg-solid` | `rgba(255,255,255,0.92)` (Safari) |
| `--vexy-btn-bg-solid-hover` | `rgba(255,255,255,0.97)` (Safari, hover) |

Safari ignores `backdrop-filter` over a canvas, so it uses the two `-solid`
backgrounds instead of the blurred one.

```css
vexy-stax {
  --vexy-btn-color: #fff;
  --vexy-btn-bg: rgba(0, 0, 0, 0.4);
  --vexy-btn-blur: 14px;
}
```

## Exports of the element bundle

`vexy-stax.element.js` is also an ES module. Besides registering the
element, it exports `VexyStax`, `createStax`, `makeScene`, `loadScene`,
`parseScene` and the element class `VexyStaxElement`:

```js
import { createStax, makeScene } from "https://vexy.dev/vexy-stax-js/vexy-stax.element.js";
```
