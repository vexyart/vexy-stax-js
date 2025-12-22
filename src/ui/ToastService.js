// SPDX-License-Identifier: Apache-2.0
// this_file: src/ui/ToastService.js

import { Z_INDEX_MODAL, TOAST_FADE_DURATION } from '../core/constants.js';

const DEFAULT_DURATION = 3000;

const COLORS = {
    success: { bg: 'rgba(40, 167, 69, 0.95)', text: 'white' },
    error: { bg: 'rgba(220, 53, 69, 0.95)', text: 'white' },
    warning: { bg: 'rgba(255, 193, 7, 0.95)', text: 'black' },
    info: { bg: 'rgba(23, 162, 184, 0.95)', text: 'white' }
};

/**
 * Icons for each toast type (WCAG: don't rely on color alone).
 * Using Unicode symbols for zero-dependency solution.
 */
const ICONS = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
};

/**
 * ARIA roles for screen reader announcements.
 * - 'alert' for errors: assertive, interrupts current speech
 * - 'status' for info/success/warning: polite, waits for pause
 */
const ARIA_ROLES = {
    success: 'status',
    error: 'alert',
    warning: 'status',
    info: 'status'
};

function getDefaultDocument() {
    return typeof document !== 'undefined' ? document : null;
}

function getDefaultTimer() {
    if (typeof setTimeout === 'function') {
        return setTimeout.bind(typeof window !== 'undefined' ? window : globalThis);
    }
    return () => {};
}

/**
 * Factory that returns a toast function wired to the provided DOM/timeouts.
 * @param {object} [options]
 * @param {Document} [options.documentRef]
 * @param {(handler: (...args: any[]) => void, timeout: number) => number} [options.setTimeoutFn]
 * @param {number} [options.fadeDuration]
 * @param {number} [options.zIndex]
 * @param {number} [options.defaultDuration]
 * @returns {(message: string, type?: string, duration?: number) => void}
 */
export function createToastService(options = {}) {
    const documentRef = options.documentRef ?? getDefaultDocument();
    const setTimeoutFn = options.setTimeoutFn ?? getDefaultTimer();
    const fadeDuration = options.fadeDuration ?? TOAST_FADE_DURATION;
    const zIndex = options.zIndex ?? Z_INDEX_MODAL;
    const defaultDuration = options.defaultDuration ?? DEFAULT_DURATION;

    if (!documentRef || !documentRef.body || typeof documentRef.createElement !== 'function') {
        return () => {};
    }

    return (message, type = 'info', duration = defaultDuration) => {
        const toast = documentRef.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            z-index: ${zIndex};
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease-out;
        `;

        const palette = COLORS[type] ?? COLORS.info;
        toast.style.background = palette.bg;
        toast.style.color = palette.text;

        // Add icon prefix for accessibility (don't rely on color alone)
        const icon = ICONS[type] ?? ICONS.info;
        toast.textContent = `${icon} ${message}`;

        // ARIA live region for screen reader announcements
        const ariaRole = ARIA_ROLES[type] ?? ARIA_ROLES.info;
        toast.setAttribute('role', ariaRole);
        toast.setAttribute('aria-live', ariaRole === 'alert' ? 'assertive' : 'polite');

        documentRef.body.appendChild(toast);

        setTimeoutFn(() => {
            toast.style.animation = 'slideOut 0.3s ease-in';
            setTimeoutFn(() => {
                if (typeof toast.remove === 'function') {
                    toast.remove();
                } else if (toast.parentNode && typeof toast.parentNode.removeChild === 'function') {
                    toast.parentNode.removeChild(toast);
                }
            }, fadeDuration);
        }, duration);
    };
}
