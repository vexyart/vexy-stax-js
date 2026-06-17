// SPDX-License-Identifier: Apache-2.0
// this_file: tests/stage.test.js
//
// Unit tests for stage.js caption-plate layout (issue 311; shadows removed: issue 312).
// No real DOM or three.js — THREE and document are stubbed via registerHooks
// (Node 26 preferred API) so this file runs with plain `node --test`.
//
// Tested contracts (issue 311 caption plates):
//   1. makeCaptionSprite builds an OPAQUE bordered plate: fill == edgeColor (t, a stroked
//      border, text drawn CENTERED (textAlign/textBaseline = center/middle); returns
//      { mesh, material, worldWidth } with a PlaneGeometry sized text+3em × plateHeight.
//   2. _placeCaptions(opacities) positions each caption plate's RIGHT edge at
//        captionAnchorX(scene), vertical center at captionPlateCenterY(scene), at plate Z
//        (mesh center X = anchorX - worldWidth/2).
//   3. _placeCaptions sets material.opacity from the supplied opacities array.

import { test } from "node:test";
import assert from "node:assert/strict";
import * as nodeModule from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));

/** Approximate float equality for world-unit geometry assertions. */
const close = (a, b, eps = 1e-6) => Math.abs(a - b) <= eps;

// stage.js imports `three`; we stub it via a module resolve hook so this runs with
// plain `node --test` (no bundler/browser). registerHooks is stable on Node >=22.15;
// on older runtimes (the library only requires Node >=18) we skip rather than force a
// newer Node onto consumers.
const registerHooks = nodeModule.registerHooks;
const SKIP = typeof registerHooks !== "function";

// ---------------------------------------------------------------------------
// Stubs
// ---------------------------------------------------------------------------

/** Minimal Vector2 stub: records the last set() call. */
function makeVector2() {
  const v = { x: 0, y: 0, _calls: [] };
  v.set = (x, y) => { v.x = x; v.y = y; v._calls.push([x, y]); return v; };
  return v;
}

/** Minimal position stub (same shape as THREE.Vector3 for position). */
function makePosition() {
  const p = { x: 0, y: 0, z: 0, _calls: [] };
  p.set = (x, y, z) => { p.x = x; p.y = y; p.z = z; p._calls.push([x, y, z]); return p; };
  return p;
}

/** Build the THREE stub module source (returned as a data: URI by the loader). */
function makeThreeStubSrc() {
  // Each call to new Sprite() / new SpriteMaterial() returns a fresh tracked object.
  // We expose factory counters on the stub module so tests can inspect them.
  return `
const sprites = [];
const materials = [];
const meshes = [];

export const SRGBColorSpace = "srgb";

export class Vector2 {
  constructor(x=0,y=0){ this.x=x; this.y=y; this._calls=[]; }
  set(x,y){ this.x=x; this.y=y; this._calls.push([x,y]); return this; }
}

export class CanvasTexture {
  constructor(canvas){ this.canvas=canvas; this.needsUpdate=false; this.colorSpace=null; }
  dispose(){}
}

export class SpriteMaterial {
  constructor(opts={}){ this.map=opts.map??null; this.transparent=opts.transparent??false; this.depthTest=opts.depthTest??true; this.opacity=1; this.alpha_mode=null; materials.push(this); }
}

export class Sprite {
  constructor(mat){ this.material=mat; this.center=new Vector2(0.5,0.5); this.position={ x:0,y:0,z:0,_calls:[], set(x,y,z){ this.x=x;this.y=y;this.z=z;this._calls.push([x,y,z]);return this;} }; this.scale={x:1,y:1,z:1,set(x,y,z){this.x=x;this.y=y;this.z=z;}}; this.visible=true; sprites.push(this); }
}

export class PerspectiveCamera { constructor(){} updateProjectionMatrix(){} }
export class Scene { constructor(){ this.background=null; } add(){} }
export class Color { constructor(c){ this.c=c; } }
export class WebGLRenderer { constructor(){ this.domElement=null; } setPixelRatio(){} setSize(){} render(){} }
// PlaneGeometry records its (width, height) so caption-plate tests can assert the world size.
export class PlaneGeometry { constructor(w,h){ this.width=w; this.height=h; } dispose(){} }
// MeshBasicMaterial captures its options (issue 311 caption plates pass map/transparent/etc).
export class MeshBasicMaterial { constructor(opts={}){ this.map=opts.map??null; this.color=opts.color??null; this.transparent=opts.transparent??false; this.depthTest=opts.depthTest??true; this.side=opts.side??null; this.opacity=opts.opacity??1; } dispose(){} }
// Mesh keeps the material/geometry it was constructed with (caption plates rely on this).
export class Mesh { constructor(geo,mat){ this.geometry=geo??null; this.material=mat??{opacity:1}; this.renderOrder=0; this.visible=true; this.position={x:0,y:0,z:0,_calls:[],set(x,y,z){this.x=x;this.y=y;this.z=z;this._calls.push([x,y,z]);return this;}}; this.scale={x:1,y:1,z:1,set(x,y,z){this.x=x;this.y=y;this.z=z;}}; meshes.push(this); } }
export class TextureLoader { load(){} }
export class BackgroundMaterial { constructor(){} }
export const DoubleSide="double";

export function __getSprites(){ return sprites; }
export function __getMaterials(){ return materials; }
export function __getMeshes(){ return meshes; }
`;
}

/** Fake canvas + 2D context stub (records draw calls so caption-plate tests can assert). */
function makeFakeCanvas() {
  const ctx = {
    font: "",
    letterSpacing: "", // canvas 2D tracking (issue 328); present so `"letterSpacing" in ctx` holds
    textAlign: "",
    textBaseline: "",
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 0,
    _fillTextCalls: [],
    _fillRectCalls: [],
    _strokeRectCalls: [],
    measureText: () => ({ width: 100 }),
    fillText: (text, x, y) => { ctx._fillTextCalls.push({ text, x, y, fillStyle: ctx.fillStyle, textAlign: ctx.textAlign, textBaseline: ctx.textBaseline }); },
    fillRect: (x, y, w, h) => { ctx._fillRectCalls.push({ x, y, w, h, fillStyle: ctx.fillStyle }); },
    strokeRect: (x, y, w, h) => { ctx._strokeRectCalls.push({ x, y, w, h, strokeStyle: ctx.strokeStyle, lineWidth: ctx.lineWidth }); },
    getImageData: () => ({ data: new Uint8ClampedArray(4) }),
  };
  return {
    width: 0,
    height: 0,
    getContext: () => ctx,
    _ctx: ctx,
  };
}

// ---------------------------------------------------------------------------
// Module loader hook: intercept 'three' and return our stub
// ---------------------------------------------------------------------------

const THREE_STUB_SRC = makeThreeStubSrc();
const THREE_DATA_URL = "data:text/javascript," + encodeURIComponent(THREE_STUB_SRC);

let _canvases = [];
let makeCaptionSprite;
let Stage;
let captionAnchorX;
let captionPlateCenterY;
let captionPlateHeight;
let captionSize;

if (!SKIP) {
  registerHooks({
    resolve(specifier, context, nextResolve) {
      if (specifier === "three") {
        return { shortCircuit: true, url: THREE_DATA_URL };
      }
      return nextResolve(specifier, context);
    },
  });

  // Patch globalThis.document before importing stage.js.
  globalThis.document = {
    createElement: () => {
      const c = makeFakeCanvas();
      _canvases.push(c);
      return c;
    },
  };

  // Dynamic import of stage.js (after hooks + globals are set).
  ({ makeCaptionSprite, Stage } = await import(resolve(HERE, "../src/stage.js")));
  ({ captionAnchorX, captionPlateCenterY, captionPlateHeight, captionSize } = await import(
    resolve(HERE, "../src/geometry.js")
  ));
}

// ---------------------------------------------------------------------------
// Minimal scene fixture (matches parseScene output shape)
// ---------------------------------------------------------------------------

function makeScene(nSlides = 2) {
  return {
    size: { width: 1920, height: 1080 },
    background: "#ffffff",
    camera: { fov: 60, gap: 200 },
    floor: { color: "#f2f2f2", reflectivity: 0.5, opacity: 1 },
    slides: Array.from({ length: nSlides }, (_, i) => ({
      src: `slide${i}.png`,
      opacity: 1,
      gap: null,
      caption: { text: `Caption ${i}`, show_in: "expanded", style: null },
    })),
    caption_defaults: { size: 28, color: "#222222", font: "sans-serif" },
    view: "expanded",
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test("makeCaptionSprite builds an edge-colored opaque bordered plate (issues 311, 320)", { skip: SKIP }, () => {
  _canvases = [];
  const style = { size: 28, color: "#222222", font: "sans-serif", plateHeight: 28 / 0.75, edgeWidth: 4, edgeColor: "#0000ff" };
  const { mesh, material, worldWidth } = makeCaptionSprite("Hello", style);

  // Returns a Mesh (caption PLATE), not a Sprite, with a real geometry + own material.
  assert.ok(mesh.geometry, "caption mesh must have a geometry");
  assert.ok(material, "caption must expose its material");
  // Plate width = measured text width (100px / dpr=2 = 50) + 0.75em pad each side
  // (2 * 0.75 * size = 1.5em total) — issue 315.
  assert.ok(close(worldWidth, 50 + 1.5 * 28), `worldWidth must be text(50)+1.5em(42)=92, got ${worldWidth}`);
  // Plate height == plateHeight (caption_size / 0.75).
  assert.ok(close(mesh.geometry.height, 28 / 0.75), `plate height must equal plateHeight, got ${mesh.geometry.height}`);
  assert.ok(close(mesh.geometry.width, worldWidth), "geometry width must equal worldWidth");

  // The draw canvas (last created; first is the measurement canvas).
  const drawCanvas = _canvases[_canvases.length - 1];
  const ctx = drawCanvas._ctx;
  // Fill spanning the whole plate — now uses edgeColor (issue 320: fill == border color).
  assert.ok(ctx._fillRectCalls.length >= 1, "plate must be filled with fillRect");
  assert.equal(ctx._fillRectCalls[0].fillStyle, "#0000ff", "fill must match edgeColor (issue 320)");
  assert.equal(ctx._fillRectCalls[0].x, 0, "fill must start at x=0");
  assert.equal(ctx._fillRectCalls[0].y, 0, "fill must start at y=0");
  // Bordered: strokeRect called in the edge color.
  assert.ok(ctx._strokeRectCalls.length >= 1, "plate must be stroked with a border");
  assert.equal(ctx._strokeRectCalls[0].strokeStyle, "#0000ff", "border must be scene.edge.color");
  // Material is opaque white-backed and transparent-enabled (fades as one) — opacity starts 1.
  assert.equal(material.opacity, 1, "caption material opacity starts at 1 (opaque)");
  assert.equal(material.transparent, true, "caption material must be transparent-enabled to fade");
});

test("makeCaptionSprite uses separate fill/border colors when given (issue 324)", { skip: SKIP }, () => {
  _canvases = [];
  const style = {
    size: 28, color: "#222222", font: "sans-serif", plateHeight: 28 / 0.75,
    edgeWidth: 4, edgeColor: "#0000ff", fillColor: "#ff0000", borderColor: "#00ff00",
  };
  makeCaptionSprite("Hi", style);
  const ctx = _canvases[_canvases.length - 1]._ctx;
  assert.equal(ctx._fillRectCalls[0].fillStyle, "#ff0000", "plate fill must use fillColor");
  assert.equal(ctx._strokeRectCalls[0].strokeStyle, "#00ff00", "plate border must use borderColor");
});

test("makeCaptionSprite centers the text both ways (issue 311)", { skip: SKIP }, () => {
  _canvases = [];
  makeCaptionSprite("Test", { size: 24, color: "#111", font: "Arial", plateHeight: 32, edgeWidth: 2, edgeColor: "#000" });
  const drawCanvas = _canvases[_canvases.length - 1];
  const ctx = drawCanvas._ctx;
  assert.equal(ctx.textAlign, "center", "ctx.textAlign must be 'center'");
  assert.equal(ctx.textBaseline, "middle", "ctx.textBaseline must be 'middle'");
  // The caption text is drawn in the caption color (after the white fill + border).
  const textDraw = ctx._fillTextCalls.find((c) => c.text === "Test");
  assert.ok(textDraw, "the caption text must be drawn");
  assert.equal(textDraw.fillStyle, "#111", "text drawn in the caption color");
});

test("makeCaptionSprite font stack falls back to system-ui/sans-serif, never serif (issue 327)", { skip: SKIP }, () => {
  _canvases = [];
  makeCaptionSprite("Hi", { size: 24, font: "REM", plateHeight: 32, edgeColor: "#000" });
  const ctx = _canvases[_canvases.length - 1]._ctx;
  // The requested family is quoted and backed by system-ui + the generic sans-serif so an
  // unloaded family never resolves to the canvas default serif (Times New Roman).
  assert.match(ctx.font, /"REM", system-ui, sans-serif$/, `font must carry the REM→system-ui→sans-serif stack, got ${ctx.font}`);
  // With no requested family the default font is Zalando Sans at 500/expanded (issue 328), still
  // backed by system-ui/sans-serif so it never resolves to serif.
  _canvases = [];
  makeCaptionSprite("Hi", { size: 24, plateHeight: 32, edgeColor: "#000" });
  const ctx2 = _canvases[_canvases.length - 1]._ctx;
  assert.match(ctx2.font, /^500 expanded .*"Zalando Sans", system-ui, sans-serif$/, `default font must be Zalando Sans 500/expanded, got ${ctx2.font}`);
  // 0.02em tracking is applied for the default font (issue 328).
  assert.equal(ctx2.letterSpacing, `${0.02 * 24 * 2}px`, "default font must carry 0.02em tracking");
});

test("_placeCaptions positions plate right edge at anchorX, center at plateCenterY, plateZ (issue 311)", { skip: SKIP }, () => {
  const scene = makeScene(2);
  const anchorX = captionAnchorX(scene);
  const centerY = captionPlateCenterY(scene);

  // Use distinct non-zero Z values for both plates so no assertion can accidentally
  // pass because the mesh's initial z=0 happens to match the expected plate Z.
  const plateZ0 = -200; // back plate
  const plateZ1 = -50;  // front plate (non-zero avoids false-pass on initial z=0)

  // Distinct widths so the right-edge anchoring (center = anchorX - width/2) is verified.
  const w0 = 134;
  const w1 = 200;

  const fakeMaterial0 = { opacity: 1 };
  const fakeMaterial1 = { opacity: 1 };
  const fakeSprite0 = {
    position: { x: 0, y: 0, z: 0, _calls: [], set(x, y, z) { this.x = x; this.y = y; this.z = z; this._calls.push([x, y, z]); } },
    visible: true,
  };
  const fakeSprite1 = {
    position: { x: 0, y: 0, z: 0, _calls: [], set(x, y, z) { this.x = x; this.y = y; this.z = z; this._calls.push([x, y, z]); } },
    visible: true,
  };

  // Fake plates with mesh.position.z set to the distinct non-zero values above
  const plates = [
    { mesh: { position: { x: 0, y: 0, z: plateZ0 } }, slide: scene.slides[0] },
    { mesh: { position: { x: 0, y: 0, z: plateZ1 } }, slide: scene.slides[1] },
  ];
  const captions = [
    { sprite: fakeSprite0, material: fakeMaterial0, plateIndex: 0, worldWidth: w0 },
    { sprite: fakeSprite1, material: fakeMaterial1, plateIndex: 1, worldWidth: w1 },
  ];

  // Call _placeCaptions directly on a fake stage instance
  const fakeStage = { scene, captions, plates };
  Stage.prototype._placeCaptions.call(fakeStage, [1.0, 0.8]);

  // Confirm position.set was actually called (not just initial values)
  assert.equal(fakeSprite0.position._calls.length, 1, "plate0 position.set must be called exactly once");
  assert.equal(fakeSprite1.position._calls.length, 1, "plate1 position.set must be called exactly once");

  // Plate 0: mesh center X = anchorX - w0/2 (right edge at anchorX), Y = centerY, Z = plateZ0.
  assert.ok(close(fakeSprite0.position.x, anchorX - w0 / 2), `plate0 center X must be anchorX - w0/2 (${anchorX - w0 / 2}), got ${fakeSprite0.position.x}`);
  assert.ok(close(fakeSprite0.position.y, centerY), `plate0 Y must equal captionPlateCenterY (${centerY}), got ${fakeSprite0.position.y}`);
  assert.equal(fakeSprite0.position.z, plateZ0, `plate0 Z must equal plate Z (${plateZ0})`);

  // Plate 1: mesh center X = anchorX - w1/2, Y = centerY, Z = plateZ1.
  assert.ok(close(fakeSprite1.position.x, anchorX - w1 / 2), `plate1 center X must be anchorX - w1/2 (${anchorX - w1 / 2}), got ${fakeSprite1.position.x}`);
  assert.ok(close(fakeSprite1.position.y, centerY), `plate1 Y must equal captionPlateCenterY (${centerY}), got ${fakeSprite1.position.y}`);
  assert.equal(fakeSprite1.position.z, plateZ1, `plate1 Z must equal plate Z (${plateZ1})`);
});

test("_placeCaptions sets material.opacity from supplied opacities array", { skip: SKIP }, () => {
  const scene = makeScene(2);

  const fakeMat0 = { opacity: 0 };
  const fakeMat1 = { opacity: 0 };
  const fakeSprite0 = { position: { set() {}, x:0, y:0, z:0 }, visible: false, scale: { x:100, y:30 } };
  const fakeSprite1 = { position: { set() {}, x:0, y:0, z:0 }, visible: false, scale: { x:100, y:30 } };

  const plates = [
    { mesh: { position: { x: 0, y: 0, z: -200 } }, slide: scene.slides[0] },
    { mesh: { position: { x: 0, y: 0, z: 0 } }, slide: scene.slides[1] },
  ];
  const captions = [
    { sprite: fakeSprite0, material: fakeMat0, plateIndex: 0 },
    { sprite: fakeSprite1, material: fakeMat1, plateIndex: 1 },
  ];

  const opacities = [0.75, 0.25];
  Stage.prototype._placeCaptions.call({ scene, captions, plates }, opacities);

  assert.equal(fakeMat0.opacity, 0.75, "material[0].opacity must be opacities[0]=0.75");
  assert.equal(fakeMat1.opacity, 0.25, "material[1].opacity must be opacities[1]=0.25");
  // visibility: only sprite0 should be visible (opacity > 0.001)
  assert.equal(fakeSprite0.visible, true, "sprite0 must be visible when opacity=0.75");
  assert.equal(fakeSprite1.visible, true, "sprite1 must be visible when opacity=0.25");
});

test("_placeCaptions hides sprites with opacity <= 0.001", { skip: SKIP }, () => {
  const scene = makeScene(2);
  const fakeMat0 = { opacity: 1 };
  const fakeMat1 = { opacity: 1 };
  const fakeSprite0 = { position: { set() {}, x:0, y:0, z:0 }, visible: true, scale: { x:100, y:30 } };
  const fakeSprite1 = { position: { set() {}, x:0, y:0, z:0 }, visible: true, scale: { x:100, y:30 } };

  const plates = [
    { mesh: { position: { x: 0, y: 0, z: -200 } }, slide: scene.slides[0] },
    { mesh: { position: { x: 0, y: 0, z: 0 } }, slide: scene.slides[1] },
  ];
  const captions = [
    { sprite: fakeSprite0, material: fakeMat0, plateIndex: 0 },
    { sprite: fakeSprite1, material: fakeMat1, plateIndex: 1 },
  ];

  Stage.prototype._placeCaptions.call({ scene, captions, plates }, [0.0, 0.001]);

  assert.equal(fakeSprite0.visible, false, "sprite0 must be hidden when opacity=0.0");
  assert.equal(fakeSprite1.visible, false, "sprite1 must be hidden when opacity=0.001 (threshold)");
});
