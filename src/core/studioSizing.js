// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/core/studioSizing.js
/**
 * @fileoverview Studio canvas sizing utilities with retina/high-DPI support.
 *
 * Calculates proper CSS and WebGL render dimensions for high-DPI displays
 * (Retina, 4K, etc.). Ensures crisp rendering by scaling the WebGL buffer
 * according to device pixel ratio while maintaining CSS layout dimensions.
 *
 * @module studioSizing
 * @example
 * // Standard display (DPR = 1)
 * const dims = computeRetinaDimensions({ x: 800, y: 600 });
 * // => { cssWidth: 800, cssHeight: 600, renderWidth: 800, renderHeight: 600, pixelRatio: 1 }
 *
 * @example
 * // Retina display (DPR = 2)
 * const dims = computeRetinaDimensions({ x: 800, y: 600 });
 * // => { cssWidth: 800, cssHeight: 600, renderWidth: 1600, renderHeight: 1200, pixelRatio: 2 }
 *
 * @example
 * // 4K/5K display (DPR = 3+)
 * const dims = computeRetinaDimensions({ x: 800, y: 600 });
 * // => { cssWidth: 800, cssHeight: 600, renderWidth: 2400, renderHeight: 1800, pixelRatio: 3 }
 */

/**
 * Minimum allowed pixel ratio (standard displays).
 * @constant {number}
 */
const MIN_PIXEL_RATIO = 1;

/**
 * Maximum allowed pixel ratio (performance cap for ultra-high-DPI).
 * @constant {number}
 */
const MAX_PIXEL_RATIO = 4;

/**
 * Calculates CSS and render-target dimensions for the studio canvas using device pixel ratio.
 *
 * Separates logical (CSS) dimensions from physical (WebGL buffer) dimensions to
 * achieve crisp rendering on high-DPI displays. The CSS size controls layout while
 * the render size scales proportionally to match screen density.
 *
 * @param {{x: number, y: number}} size - Logical studio dimensions in CSS pixels
 * @param {number} [pixelRatio] - Override pixel ratio (defaults to window.devicePixelRatio)
 * @returns {{cssWidth: number, cssHeight: number, renderWidth: number, renderHeight: number, pixelRatio: number}} Dimension set for CSS and WebGL
 * @throws {Error} If size is invalid (not object, negative, or non-numeric)
 * @example
 * // Basic usage with automatic DPR detection
 * const size = { x: 1024, y: 768 };
 * const { cssWidth, cssHeight, renderWidth, renderHeight } = computeRetinaDimensions(size);
 * canvas.style.width = `${cssWidth}px`;
 * canvas.style.height = `${cssHeight}px`;
 * renderer.setSize(renderWidth, renderHeight, false); // false = don't update style
 *
 * @example
 * // Force specific pixel ratio (e.g., for export)
 * const dims2x = computeRetinaDimensions({ x: 800, y: 600 }, 2);
 * // => { cssWidth: 800, cssHeight: 600, renderWidth: 1600, renderHeight: 1200, pixelRatio: 2 }
 *
 * @example
 * // Pixel ratio clamping (1-4 range)
 * const dims = computeRetinaDimensions({ x: 500, y: 500 }, 10); // Excessive DPR
 * // => pixelRatio clamped to 4
 * // => { cssWidth: 500, cssHeight: 500, renderWidth: 2000, renderHeight: 2000, pixelRatio: 4 }
 */
export function computeRetinaDimensions(size, pixelRatio) {
    if (!size || typeof size !== 'object') {
        throw new Error('Studio size must be an object with x and y properties');
    }
    if (typeof size.x !== 'number') {
        throw new Error('Studio width must be a numeric value');
    }
    if (typeof size.y !== 'number') {
        throw new Error('Studio height must be a numeric value');
    }
    if (size.x <= 0 || size.y <= 0) {
        throw new Error('Studio size must be positive in both dimensions');
    }

    const resolvedRatio = clampPixelRatio(
        typeof pixelRatio === 'number'
            ? pixelRatio
            : (typeof window !== 'undefined' && typeof window.devicePixelRatio === 'number'
                ? window.devicePixelRatio
                : 1)
    );

    const renderWidth = ensureMinimum(Math.round(size.x * resolvedRatio));
    const renderHeight = ensureMinimum(Math.round(size.y * resolvedRatio));

    return {
        cssWidth: size.x,
        cssHeight: size.y,
        renderWidth,
        renderHeight,
        pixelRatio: resolvedRatio
    };
}

/**
 * Clamps pixel ratio to valid range (1-4).
 *
 * @private
 * @param {number} value - Raw pixel ratio value
 * @returns {number} Clamped value between MIN_PIXEL_RATIO and MAX_PIXEL_RATIO
 * @example
 * clampPixelRatio(2.5) // => 2.5 (within range)
 * clampPixelRatio(0) // => 1 (below minimum)
 * clampPixelRatio(10) // => 4 (above maximum)
 * clampPixelRatio(NaN) // => 1 (invalid)
 */
function clampPixelRatio(value) {
    if (!Number.isFinite(value) || value <= 0) {
        return MIN_PIXEL_RATIO;
    }
    return Math.min(Math.max(value, MIN_PIXEL_RATIO), MAX_PIXEL_RATIO);
}

/**
 * Ensures dimension is at least 1 pixel.
 *
 * @private
 * @param {number} value - Raw dimension value
 * @returns {number} Value clamped to minimum of 1
 * @example
 * ensureMinimum(800) // => 800
 * ensureMinimum(0) // => 1
 * ensureMinimum(-5) // => 1
 */
function ensureMinimum(value) {
    return Math.max(1, value);
}
