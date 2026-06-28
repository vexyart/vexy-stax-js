---
title: Web Component
---
<!-- this_file: src_docs/md/web-component.md -->

# `<vexy-stax>` Web Component

The easiest way to drop a deck on a page. Import the element bundle once; use
the tag anywhere.

```html
<script type="module" src="dist/vexy-stax.element.js"></script>

<!-- minimal: a list of slides -->
<vexy-stax slides="layer-0.png layer-1.png layer-2.png"></vexy-stax>

<!-- full example -->
<vexy-stax
  scene="my-scene.json"
  view="compact"
  mode="playable"
  aspect="16/9"
  click-toggle="true">
</vexy-stax>
```

---

## HTML Attributes

All attributes are observed: changing them after mount re-mounts the deck.

### Scene source — pick one

| Attribute | Type | Description |
|-----------|------|-------------|
| `slides` | `string` | Space- or newline-separated list of image URLs. Builds a scene via `makeScene`. Quick path when you don't need captions, custom camera, or per-slide settings. |
| `scene` | `string` | URL of a `.scene.json` file to fetch and parse. Use this for full control over captions, camera, transition, etc. |

A third path: embed the **entire scene JSON** as a child `<script type="application/json">` (no URL, no attribute escaping):

```html
<vexy-stax view="compact" mode="playable" aspect="3">
  <script type="application/json">
  {
    "version": 1,
    "transition": { "kind": "expand_collapse" },
    "slides": [
      { "src": "https://example.com/layer-0.png", "caption": { "text": "First slide" } },
      { "src": "https://example.com/layer-1.png" }
    ]
  }
  </script>
</vexy-stax>
```

### View and layout

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `view` | `"expanded" \| "compact"` | `"expanded"` | Initial view. |
| `width` | `string \| number` | — | CSS width of the element (bare integers get `px`). |
| `height` | `string \| number` | — | CSS height of the element. |
| `aspect` | `string \| number` | — | CSS `aspect-ratio`. `"3"`, `"3/1"`, `"3:1"`, `"16:9"` all work. The camera reframes the deck to fit the resolved box. |

### Playback mode

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `mode` | `"static" \| "playable" \| "scrollspy"` | `"static"` | `"playable"` plays `scene.transition` once when ready. `"scrollspy"` attaches scroll-driven morphing. |
| `trigger` | `string` (CSS selector) | the element itself | Scrollspy trigger when `mode="scrollspy"`. |

### Interaction

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `click-toggle` | `"true" \| "false"` | `"true"` | Click anywhere inside the element to fluently toggle compact↔expanded. Pass `"false"` to disable. |
| `buttons` | `"toggle" \| "pair" \| "false"` | — | Add built-in control buttons: a single relabeling toggle (`"toggle"`) or a side-by-side pair (`"pair"`). |
| `explain-label` | `string` | `"Explain"` | Label on the expand-to-expanded button (used with `buttons`). |
| `preview-label` | `string` | `"Preview"` | Label on the collapse-to-compact button. |
| `buttons-position` | `string` | `"bottom-center"` | Position of the buttons overlay. |

### Other

| Attribute | Type | Description |
|-----------|------|-------------|
| `captions` | `"true" \| "false"` | Override `scene.captions` (global captions toggle). Provided here for convenience when using `slides=`. |
| `config` | JSON string | Inline scene as a JSON string attribute. For small scenes. The child `<script type="application/json">` is the unescaped alternative. |

---

## JavaScript Properties

All attributes have matching JS properties (camelCase). Additional properties:

| Property | Type | Description |
|----------|------|-------------|
| `config` | `object \| null` | Get or set the inline scene object. Setting it re-mounts the deck. |
| `scene` | `string \| object \| null` | Setting a string URL sets the `scene` attribute. Setting an object sets `config` (inline scene). Getting returns `config ?? getAttribute("scene")`. |
| `instance` | `VexyStax \| null` | The underlying `VexyStax` instance (null until mounted). Access render ops directly: `el.instance.toImage()`, `el.instance.toVideo()`, etc. |

---

## Events

Events bubble from the element. Listen on the element itself or any ancestor.

| Event | `detail` | Fired when |
|-------|----------|-----------|
| `ready` | `{ stax: VexyStax }` | Textures loaded and the initial view is rendered. |
| `transitionstart` | `{ kind: string }` | A `transition()` call begins. |
| `transitionend` | `{ kind: string }` | A `transition()` call resolves. |
| `viewchange` | `{ view: "compact" \| "expanded" }` | The active view flips (from scroll, click-toggle, or `setView`). |

```js
document.querySelector("vexy-stax").addEventListener("ready", (e) => {
  console.log("mounted", e.detail.stax);
});
```

---

## CSS Custom Properties

Theming the built-in control buttons (when `buttons` is set):

| Property | Default | Description |
|----------|---------|-------------|
| `--vexy-btn-bg` | `rgba(255,255,255,0.85)` | Button background. |
| `--vexy-btn-color` | `#222` | Button text color. |
| `--vexy-btn-radius` | `6px` | Border radius. |
| `--vexy-btn-padding` | `6px 14px` | Padding. |
| `--vexy-btn-font-size` | `0.875rem` | Font size. |

---

## Re-exported ESM API

The element bundle (`dist/vexy-stax.element.js`) also exports the full ESM API,
so a single `<script type="module">` import covers both the Web Component and
programmatic use:

```js
import {
  createStax, VexyStax, makeScene, loadScene, parseScene,
} from "./dist/vexy-stax.element.js";
```
