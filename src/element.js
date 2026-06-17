// SPDX-License-Identifier: Apache-2.0
// this_file: src/element.js
//
// <vexy-stax> custom element (SPEC.md §6.2). Attributes: scene (URL), view,
// mode (static|playable|scrollspy), width, height. Property `config` accepts an
// inline scene object (overrides `scene`). Events: ready, transitionstart,
// transitionend. Mounts a VexyStax in light DOM. Auto-registers on import.

import { VexyStax, loadScene } from "./index.js";

export class VexyStaxElement extends HTMLElement {
  static get observedAttributes() {
    return ["scene", "view", "mode", "trigger", "width", "height"];
  }

  constructor() {
    super();
    this._stax = null;
    this._config = null;
    this._mounting = false;
  }

  /** Inline scene object (or JSON string); overrides the `scene` attribute. */
  set config(value) {
    this._config = typeof value === "string" ? JSON.parse(value) : value;
    if (this.isConnected) this._mount();
  }
  get config() {
    return this._config;
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

      const sceneSrc = this._config ?? this.getAttribute("scene");
      if (!sceneSrc) return; // nothing to render yet
      const baseUrl = typeof document !== "undefined" ? document.baseURI : undefined;
      const scene = await loadScene(sceneSrc, { baseUrl });

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
}

if (typeof customElements !== "undefined" && !customElements.get("vexy-stax")) {
  customElements.define("vexy-stax", VexyStaxElement);
}
