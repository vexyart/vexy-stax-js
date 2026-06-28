// SPDX-License-Identifier: Apache-2.0
// this_file: tests/geometry.test.js
//
// node --test for engine-agnostic geometry (SPEC.md §3). Replicates the Python
// fixture vectors from vexy-stax-py/tests/test_geometry.py so the math provably
// matches across the two implementations.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { parseScene } from "../src/scene.js";
import * as g from "../src/geometry.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const EXAMPLE = resolve(HERE, "../../vexy-stax-py/testdata/airbl-lores.scene.json");

function loadExample() {
  return parseScene(JSON.parse(readFileSync(EXAMPLE, "utf-8")));
}

const EASINGS = ["linear", "easeInOutCubic", "easeOutCubic", "easeInCubic"];
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;

for (const name of EASINGS) {
  test(`ease ${name} endpoints`, () => {
    assert.ok(close(g.ease(name, 0.0), 0.0));
    assert.ok(close(g.ease(name, 1.0), 1.0));
  });
  test(`ease ${name} clamps`, () => {
    assert.ok(close(g.ease(name, -5.0), 0.0));
    assert.ok(close(g.ease(name, 5.0), 1.0));
  });
}

test("ease midpoint values match Python fixtures", () => {
  assert.ok(close(g.ease("linear", 0.5), 0.5));
  assert.ok(close(g.ease("easeInOutCubic", 0.5), 0.5));
  assert.ok(close(g.ease("easeInCubic", 0.5), 0.125));
  assert.ok(close(g.ease("easeOutCubic", 0.5), 0.875));
});

test("ease unknown throws", () => {
  assert.throws(() => g.ease("bogus", 0.5), /Unknown easing/);
});

test("interpolateOpacity lerps per-view", () => {
  const scene = loadExample();
  const halftone = scene.slides[6]; // expanded=1.0, compact=0.4
  assert.ok(close(g.interpolateOpacity(halftone, 0.0), 0.4));
  assert.ok(close(g.interpolateOpacity(halftone, 1.0), 1.0));
  assert.ok(close(g.interpolateOpacity(halftone, 0.5), 0.7));
});

test("interpolateOpacity scalar stays constant", () => {
  const scene = loadExample();
  const source = scene.slides[0]; // scalar 1.0
  assert.ok(close(g.interpolateOpacity(source, 0.0), 1.0));
  assert.ok(close(g.interpolateOpacity(source, 0.5), 1.0));
});

test("stackDepth expanded vs compact", () => {
  const scene = loadExample();
  const n = scene.slides.length; // 8
  assert.ok(close(g.stackDepth(scene, "compact"), (n - 1) * g.MIN_GAP)); // 21
  assert.ok(close(g.stackDepth(scene, "expanded"), (n - 1) * scene.camera.gap)); // 3360
});

test("plateGaps fall back to camera.gap", () => {
  const scene = loadExample();
  const gaps = g.plateGaps(scene);
  assert.equal(gaps.length, scene.slides.length);
  assert.ok(gaps.every((x) => close(x, scene.camera.gap)));
});

test("plateGaps customizable and zero gaps", () => {
  const scene = loadExample();
  scene.camera.gap = 500.0;
  scene.slides[0].gap = null;
  scene.slides[1].gap = 0.0;
  scene.slides[2].gap = 100.0;

  const gaps = g.plateGaps(scene);
  assert.ok(close(gaps[0], 500.0)); // fallback to camera.gap
  assert.ok(close(gaps[1], g.MIN_GAP)); // zero gap resolved to MIN_GAP
  assert.ok(close(gaps[2], 100.0)); // custom gap preserved

  // Test camera.gap = 0.0 resolves to MIN_GAP for slides without override
  scene.camera.gap = 0.0;
  scene.slides[0].gap = null;
  scene.slides[1].gap = null;
  scene.slides[2].gap = 100.0;

  const gaps2 = g.plateGaps(scene);
  assert.ok(close(gaps2[0], g.MIN_GAP));
  assert.ok(close(gaps2[1], g.MIN_GAP));
  assert.ok(close(gaps2[2], 100.0));
});


test("compactCamera head-on +Z with dual-axis crop-free fit (slide only, issue 337)", () => {
  const scene = loadExample();
  const cam = g.compactCamera(scene);
  assert.ok(close(cam.position[0], 0.0, 1e-6));
  // Issue 337: the compact head-on target is the SLIDE plate center (lifted to Y = lift by
  // issue 332's stacked layout), NOT the composite center — captions are invisible in compact.
  const lift = g.slideLift(scene);
  assert.ok(close(cam.position[1], lift, 1e-6));
  assert.ok(close(cam.target[1], lift, 1e-6));
  // distance = max(d_w, d_h) (issue 302 §1, 337: d_h fits ONLY the slide height H), target z absorbs +depth/2.
  const frac = parseFloat(String(scene.camera.distance)) / 100.0; // "100%" -> 1.0 (fit tight)
  const hfov = (scene.camera.fov * Math.PI) / 180.0;
  const aspect = scene.size.width / scene.size.height;
  const vfov = 2.0 * Math.atan(Math.tan(hfov / 2.0) / aspect);
  const dW = scene.size.width / (2.0 * Math.tan(hfov / 2.0) * frac);
  const dH = scene.size.height / (2.0 * Math.tan(vfov / 2.0) * frac);
  assert.ok(close(cam.position[2], Math.max(dW, dH), 1e-6));
  assert.ok(close(cam.target[2], -10.5, 1e-6)); // -(21/2)
  assert.ok(cam.position[2] > cam.target[2]); // on +Z toward viewer
  // no crop: slide (Z=0) fills <=100% on both axes; limiting axis touches exactly P%.
  const d = cam.position[2];
  const fillW = scene.size.width / 2.0 / (d * Math.tan(hfov / 2.0));
  const fillH = scene.size.height / 2.0 / (d * Math.tan(vfov / 2.0));
  assert.ok(fillW <= 1.0 + 1e-9 && fillH <= 1.0 + 1e-9);
  assert.ok(close(Math.max(fillW, fillH), frac, 1e-9));
});

// Project the expanded deck at `cam` -> { marginL, marginR, gap, ymax } in NDC.
function projectExpanded(scene, cam) {
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
  const norm = (a) => {
    const n = Math.hypot(a[0], a[1], a[2]) || 1;
    return [a[0] / n, a[1] / n, a[2] / n];
  };
  const hfov = (scene.camera.fov * Math.PI) / 180.0;
  const aspect = scene.size.width / scene.size.height;
  const th = Math.tan(hfov / 2.0);
  const tv = Math.tan(Math.atan(th / aspect)); // tan(vfov/2)
  const look = norm(sub(cam.target, cam.position));
  const right = norm(cross(look, [0, 1, 0]));
  const up = norm(cross(right, look));
  const hw = scene.size.width / 2.0;
  const hh = scene.size.height / 2.0;
  // per-plate Z (mirrors stackPositions): front plate at 0, index 0 at -depth.
  const gaps = g.plateGaps(scene);
  let depth = 0;
  for (let i = 1; i < gaps.length; i++) depth += gaps[i];
  const cum = [0];
  for (let i = 1; i < gaps.length; i++) cum.push(cum[cum.length - 1] + gaps[i]);
  const zPositions = cum.map((c) => c - depth);
  let a = Infinity;
  let b = -Infinity;
  let ymax = 0;
  const centers = [];
  for (const z of zPositions) {
    const relc = sub([0, 0, z], cam.position);
    centers.push(dot(relc, right) / (dot(relc, look) * th));
    for (const sx of [-hw, hw]) {
      for (const sy of [-hh, hh]) {
        const rel = sub([sx, sy, z], cam.position);
        const zv = dot(rel, look);
        const nx = dot(rel, right) / (zv * th);
        a = Math.min(a, nx);
        b = Math.max(b, nx);
        ymax = Math.max(ymax, Math.abs(dot(rel, up) / (zv * tv)));
      }
    }
  }
  let s = 0;
  for (let i = 0; i < centers.length - 1; i++) s += Math.abs(centers[i + 1] - centers[i]);
  return { marginL: a + 1.0, marginR: 1.0 - b, gap: s / (centers.length - 1), ymax };
}

test("expandedCamera margins match projected gap (issue 302 §2)", () => {
  const scene = loadExample();
  const cam = g.expandedCamera(scene);
  assert.ok(close(cam.position[1], 0.0, 1e-6)); // elevation 0
  assert.ok(cam.position[2] > cam.target[2]);
  const { marginL, marginR, gap, ymax } = projectExpanded(scene, cam);
  assert.ok(close(marginL, marginR, 1e-3)); // equal L/R margins
  assert.ok(close(marginL, gap, 1e-3)); // margin == projected gap
  assert.ok(marginL > 0.0 && ymax <= g.V_FILL + 1e-6); // all plates inside the frame
});

test("expandedCamera near scales with distance", () => {
  const scene = loadExample();
  const cam = g.expandedCamera(scene);
  const dist = Math.hypot(
    cam.position[0] - cam.target[0],
    cam.position[1] - cam.target[1],
    cam.position[2] - cam.target[2]
  );
  assert.ok(close(cam.near, Math.max(1.0, dist * 0.005), 1e-6));
  assert.ok(cam.near > 1.0);
});

test("framePlan length matches Python (240) and is empty without transition", () => {
  const scene = loadExample();
  const plan = g.framePlan(scene);
  // lores scene: fps=30, duration=3.0, wait=1.0 → expand=90, wait=30, total=2*(90+30)=240
  assert.equal(plan.length, 2 * (Math.round(3.0 * 30) + Math.round(1.0 * 30))); // 240
  assert.equal(plan.length, 240);

  scene.transition = null;
  assert.equal(g.framePlan(scene).length, 0);
});

test("framePlan endpoint opacity for halftone", () => {
  const scene = loadExample();
  const plan = g.framePlan(scene);
  const idx = 6;
  // expand_collapse starts compact (t=0): halftone 0.4
  assert.ok(close(plan[0].opacities[idx], 0.4));
  // first hold frame = Math.round(duration*fps) = 90 → fully expanded: 1.0
  const firstHoldFrame = Math.round(scene.transition.duration * scene.transition.fps);
  assert.ok(close(plan[firstHoldFrame].opacities[idx], 1.0));
});

test("captionOpacities invisible in compact, full in expanded", () => {
  const scene = loadExample(); // every caption show_in "expanded"
  assert.ok(g.captionOpacities(scene, 0.0).every((o) => close(o, 0.0)));
  assert.ok(g.captionOpacities(scene, 1.0).every((o) => close(o, 1.0)));
});

test("captionOpacities stagger back-to-front", () => {
  const scene = loadExample();
  const ops = g.captionOpacities(scene, 0.5);
  for (let i = 0; i < ops.length - 1; i++) assert.ok(ops[i] > ops[i + 1]);
  assert.ok(ops[0] > 0.0);
});

test("captionOpacities honors window, stagger, and show_in", () => {
  const scene = parseScene({
    version: 1,
    size: { width: 100, height: 100 },
    caption_fade: { window: 1.0, stagger: 0.0 },
    slides: [
      { src: "a", caption: { text: "x", show_in: "expanded" } },
      { src: "b", caption: { text: "y", show_in: "both" } },
      { src: "c", caption: { text: "z", show_in: "none" } },
      { src: "d" },
    ],
  });
  const at = (t) => g.captionOpacities(scene, t);
  assert.deepEqual(at(0.0).map((x) => Math.round(x * 100) / 100), [0.0, 1.0, 0.0, 0.0]);
  assert.deepEqual(at(0.5).map((x) => Math.round(x * 100) / 100), [0.5, 1.0, 0.0, 0.0]);
  assert.deepEqual(at(1.0).map((x) => Math.round(x * 100) / 100), [1.0, 1.0, 0.0, 0.0]);
});

test("frameState carries captionOpacities", () => {
  const scene = loadExample();
  const plan = g.framePlan(scene);
  assert.ok(plan[0].captionOpacities.every((o) => close(o, 0.0))); // compact start
  // Frame at half the plan (end of expand leg) must have all caption opacities == 1.0.
  const midFrame = Math.floor(plan.length / 2);
  assert.ok(plan[midFrame].captionOpacities.every((o) => close(o, 1.0)), `frame ${midFrame} should be fully expanded`); // expanded hold
});

test("caption layout: touching plate left edge (0em gap, issues 321/323), baseline 1em above ground (issue 302 §B)", () => {
  const scene = loadExample();
  const s = g.captionSize(scene);
  // issue 316/324: testdata carries explicit caption size (== the new default of 10% of plate
  // height); captionSize resolves caption_defaults.size when set. issue 328: no explicit font →
  // the default (Zalando Sans / bundled vexy-stax) applies.
  assert.ok(scene.caption_defaults.size !== undefined && scene.caption_defaults.size !== null);
  assert.ok(scene.caption_defaults.font === undefined || scene.caption_defaults.font === null);
  assert.ok(close(s, Number(scene.caption_defaults.size)));
  // issue 324: the *default* (no explicit size) is now 10% of plate height (1/3 larger than 315).
  assert.ok(close(g.CAPTION_DEFAULT_SIZE_FRAC, 0.1));
  assert.ok(Math.abs(Number(scene.caption_defaults.size) - scene.size.height * g.CAPTION_DEFAULT_SIZE_FRAC) <= 1.0);
  // issues 321/323: CAPTION_GAP_EM=0 so right edge of caption plate touches left edge of slide plate.
  assert.ok(close(g.captionAnchorX(scene), -(scene.size.width / 2.0 + g.CAPTION_GAP_EM * s)));
});

test("plateEdgeWidth: off (0) by default, scales with plate height when enabled (issues 305/326)", () => {
  // Issue 326: borders off by default → 0 thickness.
  const off = parseScene({ version: 1, size: { width: 1000, height: 700 }, slides: [{ src: "a.png" }] });
  assert.ok(close(g.plateEdgeWidth(off), 0));
  // When enabled it scales with the plate height.
  const on = parseScene({ version: 1, size: { width: 1000, height: 700 }, edge: { width: 0.004 }, slides: [{ src: "a.png" }] });
  assert.ok(close(g.plateEdgeWidth(on), 700 * 0.004));
  assert.ok(g.plateEdgeWidth(on) > 0);
});

test("reflection constant + caption-plate geometry (issues 303/311; shadows removed 312)", () => {
  const scene = parseScene({ version: 1, size: { width: 1000, height: 700 }, slides: [{ src: "a.png" }] });
  assert.ok(g.REFLECTION_BLUR_FRAC > 0 && g.REFLECTION_BLUR_FRAC < 1);
  assert.equal(g.SHADOW_OPACITY, undefined); // issue 312: floor shadows eliminated
  assert.ok(close(g.captionPlateHeight(scene), g.captionSize(scene) / 0.75));
  assert.ok(close(g.CAPTION_PLATE_HEIGHT_FRAC, (0.1 * 4) / 3)); // issue 324: font 1/3 larger (was 0.1)
  assert.ok(close(g.captionPlateCenterY(scene), -(700 / 2) + g.captionPlateHeight(scene) / 2));
});

test("caption fill/border colors default to edge.color, overridable separately (issue 324)", () => {
  // Defaults: both fall back to the (default) edge color.
  const d = parseScene({ version: 1, slides: [{ src: "a.png" }] });
  assert.equal(g.captionFillColor(d), "#f2f2f2");
  assert.equal(g.captionBorderColor(d), "#f2f2f2");
  // Independently overridable; text color stays separate.
  const o = parseScene({
    version: 1,
    edge: { color: "#111111" },
    caption_defaults: { color: "#abcdef", fill_color: "#ff0000", border_color: "#00ff00" },
    slides: [{ src: "a.png" }],
  });
  assert.equal(g.captionFillColor(o), "#ff0000");
  assert.equal(g.captionBorderColor(o), "#00ff00");
  // Only fill overridden → border still falls back to edge.color.
  const p = parseScene({ version: 1, edge: { color: "#222222" }, caption_defaults: { fill_color: "#abcabc" }, slides: [{ src: "a.png" }] });
  assert.equal(g.captionFillColor(p), "#abcabc");
  assert.equal(g.captionBorderColor(p), "#222222");
});

test("slideLift on/off and captions-off suppresses caption opacities (issue 332)", () => {
  const scene = loadExample();
  // Default (captions on): each slide lifts by one caption-plate height.
  assert.equal(scene.captions, true);
  assert.ok(close(g.slideLift(scene), g.captionPlateHeight(scene)));
  assert.ok(g.slideLift(scene) > 0.0);
  // Caption plate still on the floor regardless of the lift.
  assert.ok(close(g.captionPlateCenterY(scene), -(scene.size.height / 2.0) + g.captionPlateHeight(scene) / 2.0));
  // Captions off: no lift, and every caption opacity is zeroed.
  scene.captions = false;
  assert.ok(close(g.slideLift(scene), 0.0));
  assert.ok(g.captionOpacities(scene, 0.0).every((o) => close(o, 0.0)));
  assert.ok(g.captionOpacities(scene, 1.0).every((o) => close(o, 0.0)));
});

test("captions-off compact camera drops slides to the floor (issue 332)", () => {
  const scene = loadExample();
  scene.captions = false;
  const cam = g.compactCamera(scene);
  assert.ok(close(cam.target[1], 0.0, 1e-6)); // no lift → composite center back at Y=0
  const frac = parseFloat(String(scene.camera.distance)) / 100.0;
  const hfov = (scene.camera.fov * Math.PI) / 180.0;
  const aspect = scene.size.width / scene.size.height;
  const vfov = 2.0 * Math.atan(Math.tan(hfov / 2.0) / aspect);
  const dW = scene.size.width / (2.0 * Math.tan(hfov / 2.0) * frac);
  const dH = scene.size.height / (2.0 * Math.tan(vfov / 2.0) * frac); // compositeH == H (lift 0)
  assert.ok(close(cam.position[2], Math.max(dW, dH), 1e-6));
});

test("captionOpacities stagger_frames steps back->front (issue 309)", () => {
  const slides = Array.from({ length: 6 }, (_, i) => ({ src: `${i}.png`, caption: { text: `${i}`, show_in: "expanded" } }));
  const scene = parseScene({
    version: 1,
    size: { width: 1000, height: 700 },
    transition: { kind: "expand", duration: 2.0, fps: 30 }, // 60-frame leg
    caption_fade: { window: 0.9, stagger_frames: 6 },
    slides,
  });
  const ops = g.captionOpacities(scene, 0.6);
  assert.equal(ops.length, 6);
  for (let i = 0; i < 5; i++) assert.ok(ops[i] >= ops[i + 1] - 1e-9); // back leads, front trails
  assert.ok(ops[0] > ops[ops.length - 1]); // real spread
  assert.ok(g.captionOpacities(scene, 1.0).every((o) => close(o, 1.0)));
  assert.ok(g.captionOpacities(scene, 0.0).every((o) => close(o, 0.0)));
});
