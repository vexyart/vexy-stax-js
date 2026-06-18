// SPDX-License-Identifier: Apache-2.0
// this_file: vexy-stax-js/src/controls.js
//
// Built-in control buttons (issue 343): a small overlay over the deck that switches between the
// compact ("Preview") and expanded ("Explain") views via the smooth click-toggle morph. Two layouts:
//   - "toggle" (default): ONE relabeling button — "Explain" while compact (click → expand), then
//     "Preview" while expanded (click → collapse back to compact).
//   - "pair": TWO buttons side-by-side — "Explain" (→ expand) and "Preview" (→ compact).
// Default placement is just above the bottom, horizontally centered. Default styling is black text
// on a barely-there (5%) blurred black pill. Everything is themeable via CSS custom properties
// (`--vexy-btn-*` on the element) and the labels/position/type are options.

// Simple position presets (the `position` option). All are relative to the component box.
const POSITIONS = {
  bottom: "left:50%;bottom:6%;transform:translateX(-50%);",
  top: "left:50%;top:6%;transform:translateX(-50%);",
  "bottom-left": "left:5%;bottom:6%;",
  "bottom-right": "right:5%;bottom:6%;",
  "top-left": "left:5%;top:6%;",
  "top-right": "right:5%;top:6%;",
  center: "left:50%;top:50%;transform:translate(-50%,-50%);",
};

let _styleInjected = false;
function injectStyle(doc) {
  if (_styleInjected || !doc?.head) return;
  _styleInjected = true;
  const s = doc.createElement("style");
  // All visual knobs are CSS custom properties so a host overrides them with one rule, e.g.
  //   vexy-stax { --vexy-btn-color:#fff; --vexy-btn-bg:rgba(0,0,0,.4); --vexy-btn-blur:14px; }
  s.textContent = `
.vexy-stax-controls{position:absolute;z-index:5;display:flex;gap:8px;pointer-events:none}
.vexy-stax-controls button{
  pointer-events:auto;cursor:pointer;font:inherit;
  font-size:var(--vexy-btn-font,14px);font-weight:var(--vexy-btn-weight,600);letter-spacing:.01em;line-height:1;
  color:var(--vexy-btn-color,#000);
  background:var(--vexy-btn-bg,rgba(0,0,0,0.05));
  -webkit-backdrop-filter:blur(var(--vexy-btn-blur,10px));backdrop-filter:blur(var(--vexy-btn-blur,10px));
  border:var(--vexy-btn-border,1px solid rgba(0,0,0,0.08));
  border-radius:var(--vexy-btn-radius,999px);
  padding:var(--vexy-btn-pad,9px 18px);
  box-shadow:var(--vexy-btn-shadow,0 2px 10px rgba(0,0,0,0.06));
  transition:background .15s,transform .12s;
}
.vexy-stax-controls button:hover{background:var(--vexy-btn-bg-hover,rgba(0,0,0,0.10))}
.vexy-stax-controls button:active{transform:translateY(1px)}
`;
  doc.head.appendChild(s);
}

/**
 * Attach control buttons over the deck (issue 343).
 * @param {object} stax the VexyStax instance (uses `_currentView` + `toggleView()`/`setView`)
 * @param {HTMLElement} container the element the canvas lives in (the overlay is appended here)
 * @param {object} [opts]
 * @param {"toggle"|"pair"} [opts.type="toggle"] single relabeling button, or a side-by-side pair
 * @param {string} [opts.explainLabel="Explain"] label for the compact→expand action
 * @param {string} [opts.previewLabel="Preview"] label for the expand→compact action
 * @param {string} [opts.position="bottom"] one of POSITIONS (bottom|top|bottom-left|…|center)
 * @param {string} [opts.style] extra inline CSS appended to the overlay wrapper (full custom position)
 * @returns {{el:HTMLElement, update:()=>void, destroy:()=>void}|null}
 */
export function attachControls(stax, container, opts = {}) {
  if (!container?.ownerDocument || !container.appendChild) return null;
  const doc = container.ownerDocument;
  injectStyle(doc);

  const type = opts.type === "pair" ? "pair" : "toggle";
  const explainLabel = opts.explainLabel ?? "Explain"; // compact → expand
  const previewLabel = opts.previewLabel ?? "Preview"; // expanded → compact
  const posKey = opts.position && POSITIONS[opts.position] ? opts.position : "bottom";

  // The overlay is absolutely positioned, so the container must establish a positioning context.
  if (container.style && typeof getComputedStyle === "function" && getComputedStyle(container).position === "static") {
    container.style.position = "relative";
  }

  const wrap = doc.createElement("div");
  wrap.className = "vexy-stax-controls";
  wrap.setAttribute("style", POSITIONS[posKey] + (opts.style ?? ""));

  const isCompact = () => stax._currentView === "compact";
  let update;

  if (type === "pair") {
    const bExplain = doc.createElement("button");
    bExplain.type = "button";
    bExplain.textContent = explainLabel;
    bExplain.addEventListener("click", () => { if (isCompact()) stax.toggleView(); });
    const bPreview = doc.createElement("button");
    bPreview.type = "button";
    bPreview.textContent = previewLabel;
    bPreview.addEventListener("click", () => { if (!isCompact()) stax.toggleView(); });
    wrap.append(bExplain, bPreview);
    update = () => {}; // both labels are always shown
  } else {
    const b = doc.createElement("button");
    b.type = "button";
    b.addEventListener("click", () => stax.toggleView());
    wrap.append(b);
    update = () => { b.textContent = isCompact() ? explainLabel : previewLabel; };
    update();
  }

  container.appendChild(wrap);

  // Keep the single-button label in sync with the CURRENT view however it changes — a click-toggle,
  // a setView, OR a scroll-driven seek (issue 344 follow-up). VexyStax emits a "viewchange"
  // CustomEvent on the container whenever `_currentView` flips, including mid-scrollspy, so the
  // label is never stale (a click during a scroll always shows the action it will perform).
  const onChange = () => update();
  container.addEventListener("viewchange", onChange);

  return {
    el: wrap,
    update,
    destroy() {
      container.removeEventListener("viewchange", onChange);
      wrap.remove();
    },
  };
}
