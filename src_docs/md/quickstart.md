# Quickstart

This page builds the same deck three ways. The deck has three layer images,
`layer-0.png`, `layer-1.png` and `layer-2.png`, stored next to the HTML page.
The first image in the list is the backmost plate; the last is the front.

Prerequisites: the images, and a local web server. Browsers do not load ES
modules or WebGL textures from `file://` pages, so serve the folder, for
example with `npx vite` or `python3 -m http.server`.

## 1. With the Web Component

1. Create `index.html`:

    ```html
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <script type="module" src="https://vexy.dev/vexy-stax-js/vexy-stax.element.js"></script>
      </head>
      <body>
        <vexy-stax
          slides="layer-0.png layer-1.png layer-2.png"
          view="compact"
          aspect="16/9"
          buttons>
        </vexy-stax>
      </body>
    </html>
    ```

2. Open the page through your web server.

The element splits `slides` at spaces and newlines, builds a scene with
default settings and renders the compact view in a 16:9 box. `buttons` adds
an **Explain** button. Click it, or anywhere in the deck, and the plates move
apart into the expanded view; the button now reads **Preview** and brings the
deck back.

## 2. With the ES module

1. Replace the element with an empty container and a module script:

    ```html
    <div id="stage" style="width: 800px; aspect-ratio: 16 / 9"></div>

    <script type="module">
      import { createStax } from "https://vexy.dev/vexy-stax-js/vexy-stax.element.js";

      const stax = await createStax("#stage", {
        slides: ["layer-0.png", "layer-1.png", "layer-2.png"],
        transition: "expand_collapse",
        mode: "playable",
      });
    </script>
    ```

2. Reload the page.

`createStax` builds the scene, mounts the deck, waits until the textures are
loaded and returns a `VexyStax` instance. With `mode: "playable"` it plays the
scene's transition once: here `expand_collapse`, which opens the deck and
closes it again. Clicking the deck still toggles the view.

The instance has the render methods. Add these lines to export the current
view as a PNG and the transition as a video:

```js
const png = await stax.toImage({ scale: 2 });
const video = await stax.toVideo();
```

Both return a `Blob`. See [ESM API](api.md).

## 3. With the global script

For pages without modules, load the global bundle. It defines
`window.VexyStax`:

```html
<div id="stage" style="width: 800px; aspect-ratio: 16 / 9"></div>

<script src="https://vexy.dev/vexy-stax-js/vexy-stax.global.js"></script>
<script>
  VexyStax.create("#stage", { slides: ["layer-0.png", "layer-1.png", "layer-2.png"] });
</script>
```

`VexyStax.create` is the same function as `createStax`.

## Next steps

- Write a [scene file](scene-format.md) to set captions, spacing, camera
  angle, colours and transition timing, then load it with
  `<vexy-stax scene="deck.scene.json">`.
- Make the deck follow the page scroll with `mode="scrollspy"`; see
  [Web Component](web-component.md#playback-mode).
- Try the [live demos](live-demos.md).
