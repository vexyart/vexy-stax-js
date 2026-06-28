---
title: Scene Format
---
<!-- this_file: src_docs/md/scene-format.md -->

# Scene Format

The vexy-stax **shared scene format** is a JSON object understood by both
`vexy-stax-js` (browser / Node) and `vexy-stax-py` (Python CLI). One file
drives the Three.js renderer and the pygfx / Blender / Playwright backends
identically.

JSON Schema: [`schema/vexy-stax-scene.schema.json`](https://github.com/vexyart/vexy-stax-js/blob/main/schema/vexy-stax-scene.schema.json)

---

## Minimal example

```json
{
  "version": 1,
  "slides": [
    { "src": "layer-0.png" },
    { "src": "layer-1.png" },
    { "src": "https://example.com/layer-2.png" }
  ]
}
```

`version` and `slides` are the only required fields. Everything else fills
sensible defaults.

---

## Top-level fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `version` | `1` | — | **Required.** Must be the integer `1`. |
| `slides` | `Slide[]` | — | **Required.** Ordered back-to-front: index 0 is farthest from camera. At least one slide. |
| `view` | `"expanded" \| "compact"` | `"expanded"` | Initial view to render. |
| `size` | `{ width, height }` | `{ width: 1920, height: 1080 }` | Plate pixel dimensions (controls the internal plate aspect ratio). |
| `background` | `string` (hex color) | `"#ffffff"` | Canvas background color. |
| `captions` | `boolean` | `true` | Global captions toggle. `false` removes all caption plates and lowers slide plates to the floor. |
| `camera` | [Camera](#camera) | see below | Camera / spacing settings. |
| `transition` | [Transition](#transition) \| `null` | `null` | Animation definition. Required for `toVideo` / `transition()` / `mode="playable"`. |
| `video` | [Video](#video) | see below | Video export framing settings (overrides `transition` fps, adds holds). |
| `floor` | [Floor](#floor) | see below | Reflective floor plane. |
| `edge` | [Edge](#edge) | `{ width: 0, color: "#f2f2f2" }` | Slide-plate border. |
| `caption_defaults` | [CaptionStyle](#captionstyle) | inherited from edge | Default style for all captions. |
| `caption_fade` | [CaptionFade](#captionfade) | see below | Caption fade-in timing during transitions. |
| `juicy` | `boolean` | `false` | Python-only per-channel color match (ignored in JS). |
| `$schema` | `string` | — | Optional: `"https://vexy.art/schema/vexy-stax-scene.schema.json"` for editor autocomplete. |

---

## Slide

```json
{
  "src": "layer-0.png",
  "gap": 960,
  "opacity": { "expanded": 1.0, "compact": 0.6 },
  "caption": {
    "text": "Halftone fill: Dots",
    "show_in": "expanded",
    "style": { "color": "#222222", "size": 48 }
  }
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `src` | `string` | — | **Required.** Path relative to the scene file, an absolute `http(s)` URL, or a `data:` URI. `data:` URIs carry base64-encoded image bytes inline — no network request, no URL resolution. |
| `gap` | `number \| null` | `null` | Per-slide gap override (scene-point units). `null` inherits `camera.gap`. |
| `opacity` | `number \| { expanded, compact }` | `1.0` | Slide opacity. A scalar stays constant; an object is interpolated during transitions. |
| `caption` | [Caption](#caption) \| `null` | `null` | Optional caption plate below this slide. |

---

## Camera

Controls spacing and the camera position for each view.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `gap` | `number` | `1920` | Points between adjacent plates in the expanded view. |
| `distance` | `number \| string` | `"100%"` | Camera distance: an absolute scene-point value, or a viewport-fit percentage (`"90%"` = the deck fills 90% of the frame width). |
| `angle` | `number` | `60` | Azimuth degrees (horizontal orbit) for the expanded view. `0` = head-on. |
| `elevation` | `number` | `0` | Degrees above the horizon for the expanded view. |
| `fov` | `number` | `39.6` | Camera vertical field of view in degrees. |

---

## Transition

```json
{
  "kind": "expand_collapse",
  "duration": 3.0,
  "wait": 1.0,
  "fps": 30,
  "easing": "easeInOutCubic"
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `kind` | `string` | — | **Required when transition is present.** One of `"expand"`, `"collapse"`, `"expand_collapse"`, `"collapse_expand"`. |
| `duration` | `number` | `3.0` | Seconds per leg (e.g. one-way for `expand`; per-leg for `expand_collapse`). |
| `wait` | `number` | `1.0` | Hold seconds at the far-end endpoint between legs. |
| `fps` | `integer` | `30` | Frames per second for `toVideo` (overridden by `video.fps` when set). |
| `easing` | `string` | `"easeInOutCubic"` | Easing function: `"linear"`, `"easeInOutCubic"`, `"easeOutCubic"`, or `"easeInCubic"`. |

---

## Video

Overrides transition fps and adds held stills to the video clip.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fps` | `integer` | `transition.fps` | Output frames per second (overrides `transition.fps`). |
| `first_hold` | `integer` | `10` | Held copies of the start frame (still intro before the animation). |
| `last_hold` | `integer` | `10` | Held copies of the end frame (still outro after the animation). |
| `frames` | `integer` | `round(duration × fps)` | Transition frames per leg; omit to derive from timing. |
| `width` | `integer` | `size.width` | Output video width in pixels. |
| `height` | `integer` | `size.height` | Output video height in pixels. |

---

## Floor

```json
{ "color": "#f5f5f5", "opacity": 0.05, "reflectivity": 0.15 }
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `color` | `string` | `"#ffffff"` | Floor plane color. |
| `opacity` | `number` | `0.0` | Floor visibility (0 = invisible pane, faint reflections only). |
| `reflectivity` | `number` | `0.1` | Reflection strength [0,1]. |

---

## Edge

The visible border drawn around each slide plate.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `width` | `number` | `0.0` | Border thickness as a fraction of plate height. `0` disables the border (and caption-plate borders). |
| `color` | `string` | `"#f2f2f2"` | Border color. Also the default `fill_color` and `border_color` for caption plates (overridable per caption). |

---

## Caption

```json
{
  "text": "Halftone fill: Dots",
  "show_in": "expanded",
  "style": {
    "size": 48,
    "color": "#222222",
    "font": "sans-serif",
    "fill_color": "#ffffff",
    "border_color": "#e0e0e0"
  }
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `text` | `string` | — | **Required.** Caption text. |
| `show_in` | `"expanded" \| "compact" \| "both" \| "none"` | `"expanded"` | Which view(s) display this caption plate. |
| `style` | [CaptionStyle](#captionstyle) | from `caption_defaults` | Per-caption style overrides. |

---

## CaptionStyle

Used in `caption.style` and `caption_defaults`.

| Field | Type | Description |
|-------|------|-------------|
| `size` | `number` | Font size in scene-point units (1 em). |
| `color` | `string` | Text color (hex). |
| `font` | `string` | Font family name or path to a TrueType / OpenType font file. Falls back to `system-ui, sans-serif`. |
| `fill_color` | `string` | Caption plate fill color. Defaults to `edge.color`. |
| `border_color` | `string` | Caption plate border color. Defaults to `edge.color`. |

---

## CaptionFade

Controls how captions fade in during a transition (back-to-front stagger).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `window` | `number` | `0.9` | Fraction of the morph [0,1] (from the end) over which captions fade in. |
| `stagger` | `number` | `0.3` | Back→front succession spread as a fraction of the fade window. |
| `stagger_frames` | `integer` | — | Per-caption step in transition frames (overrides `stagger` when set). |

---

## Full example

```json
{
  "$schema": "https://vexy.art/schema/vexy-stax-scene.schema.json",
  "version": 1,
  "view": "compact",
  "size": { "width": 1920, "height": 1080 },
  "background": "#f8f8f8",
  "captions": true,
  "camera": {
    "gap": 960,
    "distance": "90%",
    "angle": 55,
    "fov": 39.6
  },
  "transition": {
    "kind": "expand_collapse",
    "duration": 3.0,
    "wait": 1.0,
    "fps": 30,
    "easing": "easeInOutCubic"
  },
  "video": {
    "first_hold": 10,
    "last_hold": 10
  },
  "floor": { "color": "#ffffff", "opacity": 0.0, "reflectivity": 0.1 },
  "edge": { "width": 0.0, "color": "#f2f2f2" },
  "caption_defaults": { "size": 48, "color": "#333333", "font": "sans-serif" },
  "caption_fade": { "window": 0.9, "stagger": 0.3 },
  "slides": [
    {
      "src": "layer-0.png",
      "opacity": { "expanded": 1.0, "compact": 0.5 },
      "caption": { "text": "Background layer", "show_in": "expanded" }
    },
    {
      "src": "https://example.com/layer-1.png",
      "gap": 480,
      "caption": {
        "text": "Remote image — served with CORS",
        "show_in": "both",
        "style": { "color": "#0055aa" }
      }
    },
    {
      "src": "data:image/png;base64,iVBORw0KGgo...",
      "caption": { "text": "Inline image — base64 data URI", "show_in": "expanded" }
    }
  ]
}
```
