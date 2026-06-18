// SPDX-License-Identifier: Apache-2.0
// this_file: src/element.js
//
// <vexy-stax> custom element (SPEC.md §6.2). Attributes: scene (URL), slides
// (space/newline-separated image URLs — issue 341), captions (bool), view,
// mode (static|playable|scrollspy), width, height, aspect (CSS aspect-ratio,
// e.g. "3", "3/1", "3:1" — issue 701). Property `config` accepts an inline scene
// object (overrides `scene`/`slides`); an inline `<script type="application/json">`
// child also supplies the scene (issue 701 — "specify the full scene right where
// you load the component"). Events: ready, transitionstart, transitionend. Mounts
// a VexyStax in light DOM. Auto-registers on import.

import { VexyStax, loadScene, makeScene } from "./index.js";

// Re-export the public ESM API from the element bundle (issue 341): the built
// dist/vexy-stax.element.js has src/element.js as its entry, so a user who loads that single
// file can also `import { createStax, makeScene, loadScene, VexyStax }` from it (the how-to
// ESM demo + the documented CDN URL both rely on this).
export { VexyStax, loadScene, parseScene, makeScene, createStax } from "./index.js";

export class VexyStaxElement extends HTMLElement {
  static get observedAttributes() {
    // `slides` + `captions` are the issue-341 easy path (a scene from a bare URL list);
    // `click-toggle` is the issue-342 opt-out for the default click-to-toggle behavior.
    // `buttons` + `explain-label`/`preview-label`/`buttons-position` are the issue-343 control buttons.
    return [
      "scene", "slides", "captions", "view", "mode", "trigger", "width", "height", "aspect",
      "click-toggle", "buttons", "explain-label", "preview-label", "buttons-position",
    ];
  }

  constructor() {
    super();
    this._stax = null;
    this._config = null;
    this._mounting = false;
  }

  /** Inline scene object (or JSON string); overrides the `scene`/`slides` attributes. */
  set config(value) {
    this._config = typeof value === "string" ? JSON.parse(value) : value;
    if (this.isConnected) this._mount();
  }
  get config() {
    return this._config;
  }

  /**
   * Scene-in-init (issue 342): assigning an OBJECT (or JSON string) sets the inline scene
   * (same as `config`), so `el.scene = {version:1, slides:[…]}` works at init. Assigning a
   * STRING URL is treated as the `scene` attribute (a URL to fetch). This makes the property
   * mirror the lines-nano-style "pass the data right in" ergonomics for the Web Component.
   */
  set scene(value) {
    if (value && typeof value === "object") {
      this.config = value; // inline scene object
    } else if (typeof value === "string") {
      // Looks like JSON? treat as an inline scene; otherwise it's a URL attribute.
      const trimmed = value.trim();
      if (trimmed.startsWith("{")) this.config = JSON.parse(trimmed);
      else this.setAttribute("scene", value);
    }
  }
  get scene() {
    return this._config ?? this.getAttribute("scene");
  }

  /** The underlying VexyStax instance (null until mounted). */
  get instance() {
    return this._stax;
  }

  connectedCallback() {
    if (this.getAttribute("config") && !this._config) {
      this._config = JSON.parse(this.getAttribute("config"));
    }
    this.style.display = this.style.display || "block";
    this.style.position = this.style.position || "relative";
    this._applySize();
    this._mount();
  }

  disconnectedCallback() {
    this._stax?.destroy();
    this._stax = null;
  }

  attributeChangedCallback(name) {
    if (!this.isConnected) return;
    if (name === "width" || name === "height" || name === "aspect") {
      this._applySize();
      this._stax?.resize();
      return;
    }
    if (name === "view") {
      this._stax?.setView(this.getAttribute("view") || "expanded");
      return;
    }
    if (name === "click-toggle") {
      // Toggle the issue-342 behavior in place (no costly remount).
      if (this.getAttribute("click-toggle") === "false") this._stax?.disableClickToggle();
      else this._stax?.enableClickToggle();
      return;
    }
    // scene/mode changes re-mount.
    this._mount();
  }

  _applySize() {
    const w = this.getAttribute("width");
    const h = this.getAttribute("height");
    if (w) this.style.width = /^\d+$/.test(w) ? `${w}px` : w;
    if (h) this.style.height = /^\d+$/.test(h) ? `${h}px` : h;
    // Issue 701: `aspect` sets the CSS aspect-ratio so the embed box is easy to shape
    // (e.g. aspect="3" / "3/1" / "3:1" → a short, wide 3:1 deck). Accepts the CSS
    // `<width>/<height>` or bare-ratio forms; ":" and "x" are normalized to "/". With
    // only `aspect` (no height) the element's height follows from its width, and the
    // ResizeObserver reframes the camera to the resolved box.
    const aspect = this.getAttribute("aspect");
    if (aspect && aspect.trim()) {
      this.style.aspectRatio = aspect.trim().replace(/[:x]/i, " / ");
    }
  }

  /**
   * Issue 701: an inline scene declared as a child `<script type="application/json">` (or
   * `application/vexy-scene+json`). This is the no-escaping way to "specify the full scene
   * right where you load the component" — drop the whole scene JSON inside the element instead
   * of pointing `scene` at a URL. Returns the parsed object (later normalized by loadScene), or
   * null when there is no such child. A `<script>` child is never rendered, so it is invisible.
   */
  _inlineScene() {
    if (typeof this.querySelector !== "function") return null;
    const tag = this.querySelector(
      'script[type="application/json"], script[type="application/vexy-scene+json"]'
    );
    const text = tag?.textContent?.trim();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch (err) {
      throw new Error(`<vexy-stax>: inline <script> scene is not valid JSON (${err.message})`);
    }
  }

  async _mount() {
    if (this._mounting) return;
    this._mounting = true;
    try {
      this._stax?.destroy();
      this._stax = null;

      const baseUrl = typeof document !== "undefined" ? document.baseURI : undefined;
      // Source precedence (issue 341 + 701): inline `config` object → inline <script> scene →
      // `scene` URL → `slides` list. `slides` is the easy path: a space/newline-separated list
      // of image URLs (local, data:, or remote http(s)) built into a scene via makeScene.
      // `captions` (bool attr) toggles caption plates (default on; here off unless slides carry
      // their own — empty by default).
      const sceneSrc = this._config ?? this._inlineScene() ?? this.getAttribute("scene");
      const slidesAttr = this.getAttribute("slides");
      let scene;
      if (sceneSrc) {
        scene = await loadScene(sceneSrc, { baseUrl });
      } else if (slidesAttr && slidesAttr.trim()) {
        const urls = slidesAttr.split(/\s+/).filter(Boolean);
        const captionsAttr = this.getAttribute("captions");
        const opts = { baseUrl };
        if (captionsAttr !== null) opts.captions = captionsAttr !== "false";
        scene = makeScene(urls, opts);
      } else {
        return; // nothing to render yet
      }

      const view = this.getAttribute("view") || scene.view || "expanded";
      scene.view = view;

      this._stax = new VexyStax(this, scene);
      await this._stax.ready;

      const mode = this.getAttribute("mode") || "static";
      if (mode === "scrollspy") {
        // Trigger defaults to a `trigger` selector attribute, else the element.
        const sel = this.getAttribute("trigger");
        const trigger = sel ? document.querySelector(sel) : this;
        this._stax.scrollspy({ trigger });
      }
      // mode="playable" leaves the deck at its initial view; the host calls
      // el.transition(...) (e.g. on a button) to play it.

      // Issue 342: click-to-toggle is ON by default for the interactive container — a click
      // anywhere inside fluently toggles compact↔expanded, layered on top of scrollspy. Opt
      // out with the `click-toggle="false"` attribute (or mode="static" pages that don't want it
      // can still opt out explicitly). Default ON for every mode so a generic <vexy-stax> just
      // works.
      if (this.getAttribute("click-toggle") !== "false") {
        this._stax?.enableClickToggle();
      }

      // Issue 343: built-in control buttons. `buttons` = "toggle" (single relabeling button) or
      // "pair" (two buttons); a bare `buttons` attribute defaults to "toggle". `explain-label`,
      // `preview-label` and `buttons-position` customize text + placement (style via --vexy-btn-*).
      const buttonsAttr = this.getAttribute("buttons");
      if (buttonsAttr !== null && buttonsAttr !== "false") {
        this._stax?.controls({
          type: buttonsAttr === "pair" ? "pair" : "toggle",
          explainLabel: this.getAttribute("explain-label") ?? undefined,
          previewLabel: this.getAttribute("preview-label") ?? undefined,
          position: this.getAttribute("buttons-position") ?? undefined,
        });
      }

      this.dispatchEvent(new CustomEvent("ready", { detail: { instance: this._stax } }));
    } catch (err) {
      this.dispatchEvent(new CustomEvent("error", { detail: { error: err } }));
      throw err;
    } finally {
      this._mounting = false;
    }
  }

  // Convenience pass-throughs.
  setView(view) {
    return this._stax?.setView(view);
  }
  toImage(opts) {
    return this._stax?.toImage(opts);
  }
  transition(kind, opts) {
    return this._stax?.transition(kind, opts);
  }
  toVideo(opts) {
    return this._stax?.toVideo(opts);
  }
  scrollspy(opts) {
    return this._stax?.scrollspy(opts);
  }
  seek(t) {
    return this._stax?.seek(t);
  }
  /** Issue 342: fluently toggle compact↔expanded (the default click behavior, exposed). */
  toggleView() {
    return this._stax?.toggleView();
  }
}

if (typeof customElements !== "undefined" && !customElements.get("vexy-stax")) {
  customElements.define("vexy-stax", VexyStaxElement);
}
