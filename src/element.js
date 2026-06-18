// SPDX-License-Identifier: Apache-2.0
// this_file: src/element.js
//
// <vexy-stax> custom element (SPEC.md §6.2). Attributes: scene (URL), slides
// (space/newline-separated image URLs — issue 341), captions (bool), view,
// mode (static|playable|scrollspy), width, height. Property `config` accepts an
// inline scene object (overrides `scene`/`slides`). Events: ready, transitionstart,
// transitionend. Mounts a VexyStax in light DOM. Auto-registers on import.

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
    return ["scene", "slides", "captions", "view", "mode", "trigger", "width", "height", "click-toggle"];
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
    if (name === "width" || name === "height") {
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
  }

  async _mount() {
    if (this._mounting) return;
    this._mounting = true;
    try {
      this._stax?.destroy();
      this._stax = null;

      const baseUrl = typeof document !== "undefined" ? document.baseURI : undefined;
      // Source precedence (issue 341): inline `config` object → `scene` URL → `slides` list.
      // `slides` is the easy path: a space/newline-separated list of image URLs (local, data:,
      // or remote http(s)) built into a scene via makeScene. `captions` (bool attr) toggles
      // caption plates (default on; here off unless slides carry their own — empty by default).
      const sceneSrc = this._config ?? this.getAttribute("scene");
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
