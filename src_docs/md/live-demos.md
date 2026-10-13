# Live demos

The demos are static HTML pages published next to this documentation. Each
page loads the bundle from the same folder (`vexy-stax.element.js` or
`vexy-stax.global.js`), so it always runs the version this site was built
with. The animated and scrollspy demos show an eight-layer artwork from
`airbl-lores/`; the how-to pages use four of its layers.

Open the [demo overview](demos.html) for a card for each demo and a set of
copy-paste snippets.

## Animated demo

[playable.html](playable.html) loads `airbl-demo.scene.json` into a
`<vexy-stax>` element in the compact view. When the deck is ready, it plays
the `expand` transition once. Three buttons control it:

- **Play transition** calls `el.transition("expand_collapse")`: the deck opens
  and closes again.
- **Compact** and **Expanded** call `el.setView("compact")` and
  `el.setView("expanded")`, which jump to that view without animation.

The page reads the scene's `size` and sets the element's CSS `aspect-ratio`
to match it.

## Scrollspy demo

[scrollable.html](scrollable.html) places the deck between two screen-high
text sections. The element loads `airbl-scrollable.scene.json` in the compact
view with `buttons="toggle"`.

A page script maps the scroll position to the morph factor and calls
`el.seek(t)`:

- `t = 0` (compact) until 75% of the element's height is inside the window;
- `t` rises with an ease-in-out curve as you scroll on;
- `t = 1` (expanded) once the element's centre reaches the top of the window.

A click on the deck plays a toggle animation. The page then keeps the clicked
state until the scroll position reaches the same end point, so the deck does
not jump back after a click.

## How-to pages

Each how-to page shows a short code sample on the left and the live result on
the right.

[demo-component.html](demo-component.html) shows the `<vexy-stax>` element:

- a deck from the `slides` attribute;
- captions on, in the expanded view;
- a scene URL with `mode="playable"`;
- a whole scene inline in a `<script type="application/json">` child;
- a 3:1 box from `aspect="3"`;
- a built-in toggle button (`buttons`);
- a pair of buttons with custom labels, position and `--vexy-btn-*` colours.

[demo-module.html](demo-module.html) shows `createStax` from the ES module:

- a deck from a list of slides;
- a playable deck with a custom `gap` and transition kind;
- an inline scene object, with no file to fetch;
- click-to-toggle together with calls to the instance methods.

[demo-library.html](demo-library.html) shows the global script and
`window.VexyStax.create`.

!!! note "CDN links on the demo pages"
    The how-to pages also print jsDelivr URLs for the bundles. Those URLs do
    not work for the current npm releases, because the npm package does not
    include `dist/`. Load the bundles from this site instead, as described in
    [Installation](installation.md#use-the-hosted-copy).

## Where the demo files come from

`npm run build:docs` runs `scripts/build-docs.mjs`. The script writes the demo
pages, copies the two bundles and their source maps from `dist/`, copies the
scene files from `demo-scenes/` and the slide images from the sibling
`vexy-stax-py` checkout, all into `src_docs/md/`. The documentation build then
copies these files unchanged into `docs/`, so every demo keeps its URL. See
[Contributing](contributing.md#rebuilding-the-demos).
