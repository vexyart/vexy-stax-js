// src/utils/helpers.js
// this_file: src/utils/helpers.js

import * as THREE from 'three';

/**
 * Helper utility functions for color calculations, validation, and common operations
 *
 * This module extracts pure utility functions from main.js to improve reusability
 * and reduce the size of the monolithic main file.
 */

/**
 * Calculate relative luminance of a color (0-1 range)
 * Uses formula from WCAG 2.0
 * @param {string} hexColor - Hex color string (e.g. '#ffffff')
 * @returns {number} Luminance value between 0 (black) and 1 (white)
 * @throws {TypeError} If hexColor is not a valid hex color string
 */
export function calculateLuminance(hexColor) {
    // Input validation
    if (!isValidHexColor(hexColor)) {
        throw new TypeError(`calculateLuminance: expected valid hex color, got "${hexColor}"`);
    }

    // Parse hex color to RGB
    const color = new THREE.Color(hexColor);
    const r = color.r;
    const g = color.g;
    const b = color.b;

    // Apply gamma correction
    const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    // Calculate luminance
    return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

/**
 * Get adaptive floor color that matches background exactly
 * Depth comes from shadows and reflections, not floor color contrast
 * @param {string} bgColor - Hex color string
 * @returns {THREE.Color}
 */
export function getAdaptiveFloorColor(bgColor) {
    return new THREE.Color(bgColor);
}

/**
 * Validate if a string is a valid hex color
 * @param {string} color - Color string to validate
 * @returns {boolean} True if valid hex color
 */
export function isValidHexColor(color) {
    if (!color || typeof color !== 'string') {
        return false;
    }
    return /^#([0-9A-Fa-f]{3}){1,2}$/.test(color);
}

/**
 * Clamp a number between min and max values
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 * @throws {TypeError} If inputs are not valid numbers
 * @throws {RangeError} If min > max
 */
export function clamp(value, min, max) {
    // Input validation
    if (!isValidNumber(value)) {
        throw new TypeError(`clamp: value must be a valid number, got ${typeof value}`);
    }
    if (!isValidNumber(min)) {
        throw new TypeError(`clamp: min must be a valid number, got ${typeof min}`);
    }
    if (!isValidNumber(max)) {
        throw new TypeError(`clamp: max must be a valid number, got ${typeof max}`);
    }
    if (min > max) {
        throw new RangeError(`clamp: min (${min}) must be <= max (${max})`);
    }

    return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} Interpolated value
 * @throws {TypeError} If inputs are not valid numbers
 */
export function lerp(a, b, t) {
    // Input validation
    if (!isValidNumber(a)) {
        throw new TypeError(`lerp: a must be a valid number, got ${typeof a}`);
    }
    if (!isValidNumber(b)) {
        throw new TypeError(`lerp: b must be a valid number, got ${typeof b}`);
    }
    if (!isValidNumber(t)) {
        throw new TypeError(`lerp: t must be a valid number, got ${typeof t}`);
    }

    return a + (b - a) * clamp(t, 0, 1);
}

/**
 * Check if a value is a valid number (not NaN, not Infinity)
 * @param {*} value - Value to check
 * @returns {boolean} True if valid number
 */
export function isValidNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
}

/**
 * Validate image file type
 * @param {File} file - File object to validate
 * @returns {boolean} True if valid image file
 */
export function isValidImageFile(file) {
    if (!file || !file.type) {
        return false;
    }
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml'];
    return validTypes.includes(file.type.toLowerCase());
}

/**
 * Format file size in human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size (e.g., "1.5 MB")
 */
export function formatFileSize(bytes) {
    if (!isValidNumber(bytes) || bytes < 0) {
        return '0 B';
    }

    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
}

/**
 * Generate a unique ID string
 * @returns {string} Unique ID
 */
export function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Deep clone an object (simple implementation for plain objects)
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Array) {
        return obj.map(item => deepClone(item));
    }

    const cloned = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }

    return cloned;
}

/**
 * Debounce a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
