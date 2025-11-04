// this_file: src/core/studioSizing.js

const MIN_PIXEL_RATIO = 1;
const MAX_PIXEL_RATIO = 4;

/**
 * Calculates CSS and render-target dimensions for the studio canvas using device pixel ratio.
 * @param {{x: number, y: number}} size - logical studio dimensions in CSS pixels.
 * @param {number} [pixelRatio] - device pixel ratio override; falls back to window.devicePixelRatio when available.
 * @returns {{cssWidth: number, cssHeight: number, renderWidth: number, renderHeight: number, pixelRatio: number}}
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

function clampPixelRatio(value) {
    if (!Number.isFinite(value) || value <= 0) {
        return MIN_PIXEL_RATIO;
    }
    return Math.min(Math.max(value, MIN_PIXEL_RATIO), MAX_PIXEL_RATIO);
}

function ensureMinimum(value) {
    return Math.max(1, value);
}
