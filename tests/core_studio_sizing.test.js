// this_file: tests/core_studio_sizing.test.js
import test from 'node:test';
import assert from 'node:assert/strict';

import { computeRetinaDimensions } from '../src/core/studioSizing.js';

test('computeRetinaDimensions_returnsExpectedSizes_forUnitPixelRatio', () => {
    const size = { x: 1920, y: 1080 };
    const result = computeRetinaDimensions(size, 1);

    assert.deepStrictEqual(
        result,
        {
            cssWidth: 1920,
            cssHeight: 1080,
            renderWidth: 1920,
            renderHeight: 1080,
            pixelRatio: 1
        },
        'DPR 1 should keep render dimensions identical to requested size'
    );
});

test('computeRetinaDimensions_scalesRenderBuffer_forHighPixelRatio', () => {
    const size = { x: 1280, y: 720 };
    const result = computeRetinaDimensions(size, 2);

    assert.deepStrictEqual(
        result,
        {
            cssWidth: 1280,
            cssHeight: 720,
            renderWidth: 2560,
            renderHeight: 1440,
            pixelRatio: 2
        },
        'DPR 2 should double the renderer buffer dimensions'
    );
});

test('computeRetinaDimensions_roundsRenderBuffer_forFractionalPixelRatio', () => {
    const size = { x: 1000, y: 500 };
    const result = computeRetinaDimensions(size, 1.5);

    assert.equal(result.pixelRatio, 1.5, 'pixel ratio should preserve fractional values');
    assert.equal(result.renderWidth, 1500, 'render width should round to nearest integer');
    assert.equal(result.renderHeight, 750, 'render height should round to nearest integer');
});

test('computeRetinaDimensions_clampsInvalidPixelRatio_toMinimum', () => {
    const size = { x: 800, y: 600 };
    const result = computeRetinaDimensions(size, 0);

    assert.equal(result.pixelRatio, 1, 'pixel ratio should clamp to at least 1');
    assert.equal(result.renderWidth, 800, 'render width should equal css width when DPR < 1');
    assert.equal(result.renderHeight, 600, 'render height should equal css height when DPR < 1');
});

test('computeRetinaDimensions_throwsHelpfulError_forInvalidSize', () => {
    assert.throws(
        () => computeRetinaDimensions({ x: 0, y: 1080 }, 2),
        /positive/,
        'zero or negative width should raise descriptive error'
    );
    assert.throws(
        () => computeRetinaDimensions({ x: 1920 }, 2),
        /height/,
        'missing height should raise descriptive error'
    );
});
