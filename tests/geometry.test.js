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
const EXAMPLE = resolve(HERE, "../testdata/airbl.scene.json");

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

test("compactCamera matches Python fixture (0, 0, 1110.9) head-on +Z", () => {
  const scene = loadExample();
  const cam = g.compactCamera(scene);
  assert.ok(close(cam.position[0], 0.0, 1e-6));
  assert.ok(close(cam.position[1], 0.0, 1e-6));
  assert.ok(close(cam.position[2], 0.9 * scene.size.width - 10.5, 1e-6)); // 1110.9
  assert.ok(close(cam.target[2], -10.5, 1e-6)); // -(21/2)
  assert.ok(cam.position[2] > cam.target[2]); // on +Z toward viewer
});

test("expandedCamera target z = -1680", () => {
  const scene = loadExample();
  const cam = g.expandedCamera(scene);
  assert.ok(close(cam.target[2], -1680.0, 1e-6)); // -(3360/2)
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
  // frame 90 = first hold frame at full expansion: 1.0
  assert.ok(close(plan[90].opacities[idx], 1.0));
});
