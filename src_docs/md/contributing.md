# Contributing

## Prerequisites

- Node.js 18 or later (`.nvmrc` pins 20) and npm
- A checkout of [vexy-stax-py](https://github.com/vexyart/vexy-stax-py) next
  to this repository (`../vexy-stax-py`). The geometry tests and the demo
  build read its `testdata/` folder.
- For the documentation site: [`uv`](https://docs.astral.sh/uv/) (provides
  `uvx`)
- For the render checks: Python 3 with Pillow and NumPy

## Setting up

```bash
git clone https://github.com/vexyart/vexy-stax-js.git
cd vexy-stax-js
./install.sh
```

`install.sh` runs `npm install` and `npx playwright install chromium`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds `dist/vexy-stax.element.js` and `dist/vexy-stax.global.js` |
| `npm run test:unit` | Runs the `node --test` unit tests (scene, geometry, stage, transition) |
| `npm test` | Runs the unit tests, then the Playwright tests in `tests/e2e/` |
| `npm run build:docs` | Writes the live demos into `src_docs/md/` (needs `dist/`) |
| `./build.sh` | Unit tests, bundles, demos, then the documentation site |
| `./build.sh docs` | Only the documentation site, from `src_docs/` into `docs/` |
| `./example.sh` | Renders sample PNGs, a video and scroll frames into `outputs/` and checks them |

The Playwright tests mount a deck, switch views, export an image, play a
transition, record a video and drive the scroll mode in headless Chromium.

## Render checks

A WebGL bug can produce a canvas that is valid but empty. The `verify/`
scripts catch that:

```bash
node verify/run.mjs && python3 verify/gate.py
```

`run.mjs` serves the repository over HTTP, opens `verify/harness.html` in
Chromium, renders the compact and expanded views and saves them as PNG files.
`gate.py` fails unless each image has a pixel standard deviation above 30 and
more than 500 distinct colours.

## Rebuilding the demos

The live demos are generated files. Their sources are:

- the page templates in `scripts/build-docs.mjs`;
- the bundles in `dist/`;
- the scene files in `demo-scenes/`, which you can edit by hand;
- the slide images in `../vexy-stax-py/testdata/airbl-lores/`.

To rebuild them:

1. Build the bundles: `npm run build`.
2. Write the demos: `npm run build:docs`. The script writes `demos.html`,
   `playable.html`, `scrollable.html` and the three `demo-*.html` pages, and
   copies the bundles, scene files and slides, all into `src_docs/md/`.
3. Build the site: `./build.sh docs`.
4. Serve `docs/` and open the demos to check them, for example with
   `python3 -m http.server --directory docs`.

If `../vexy-stax-py` is missing, step 2 keeps the slide images that are
already in `src_docs/md/airbl-lores/`.

## Writing documentation

The pages are Markdown files in `src_docs/md/`. The navigation is the `nav`
list in `src_docs/mkdocs.yml`.

1. Edit a page, or add one and list it in `nav`.
2. Preview with live reload:

    ```bash
    src_docs/build.sh serve
    ```

    The preview runs at `http://127.0.0.1:8000`.

3. Build in strict mode: `./build.sh docs`. Any warning, such as a broken
   link between pages, fails the build.

Do not edit `docs/` by hand. The build replaces its contents, and the
`.github/workflows/docs.yml` workflow rebuilds it on every push to `main`
that touches `src_docs/`.

## Releasing

Maintainers publish to npm with `./publish.sh`. Without arguments it:

1. tags the next version with `uvx gitnextver`;
2. writes that version into `package.json`;
3. builds and publishes the package with npm, running `npm login` first if
   needed.

`./publish.sh --dryrun` packs and checks the package without bumping the
version or publishing.

The workflow `.github/workflows/publish.yml` also publishes to npm, with
provenance, when a GitHub release is published.
