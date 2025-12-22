// SPDX-License-Identifier: Apache-2.0
// this_file: src/ui/KeyboardShortcuts.js

const noop = () => {};
const DEFAULT_CONFIRM_MESSAGE = 'Clear all images? This cannot be undone.';

// Camera rotation step in radians (~5 degrees)
const ROTATION_STEP = Math.PI / 36;
// Camera pan step in pixels
const PAN_STEP = 20;
// Camera zoom step
const ZOOM_STEP = 50;

function createOverlay(documentRef) {
    const overlay = documentRef?.createElement?.('div');
    if (!overlay) {
        return null;
    }

    overlay.id = 'keyboard-help';
    // ARIA: Modal dialog accessibility
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'keyboard-help-title');
    overlay.style = overlay.style ?? {};
    overlay.style.display = overlay.style.display ?? 'none';
    overlay.innerHTML = `
        <h2 id="keyboard-help-title" style="margin-top: 0;">Keyboard Shortcuts</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px;"><kbd>Ctrl/Cmd + E</kbd></td><td>Export PNG</td></tr>
            <tr><td style="padding: 8px;"><kbd>Ctrl/Cmd + Z</kbd></td><td>Undo</td></tr>
            <tr><td style="padding: 8px;"><kbd>Ctrl/Cmd + Shift + Z</kbd></td><td>Redo</td></tr>
            <tr><td style="padding: 8px;"><kbd>Ctrl/Cmd + Delete</kbd></td><td>Clear all images</td></tr>
            <tr><td style="padding: 8px;"><kbd>Arrow Keys</kbd></td><td>Rotate camera</td></tr>
            <tr><td style="padding: 8px;"><kbd>Shift + Arrows</kbd></td><td>Pan camera</td></tr>
            <tr><td style="padding: 8px;"><kbd>+ / -</kbd></td><td>Zoom in/out</td></tr>
            <tr><td style="padding: 8px;"><kbd>?</kbd></td><td>Show this help</td></tr>
            <tr><td style="padding: 8px;"><kbd>Esc</kbd></td><td>Close help</td></tr>
        </table>
        <p style="margin-bottom: 0; margin-top: 20px; text-align: center; font-size: 0.9em; opacity: 0.7;">Press Esc or ? to close</p>
    `;

    documentRef?.body?.appendChild?.(overlay);
    return overlay;
}

/**
 * Registers global keyboard shortcuts with dependency injection for logging, UI, and cleanup.
 * @param {Object} options
 * @param {(target: EventTarget, type: string, handler: EventListener, options?: AddEventListenerOptions) => void} [options.addTrackedEventListener]
 * @param {Window} [options.windowRef]
 * @param {Document} [options.document]
 * @param {{ isAnimating?: boolean, cancel?: Function }} [options.cameraAnimator]
 * @param {(message: string, type?: string) => void} [options.showToast]
 * @param {{ info?: Function, error?: Function }} [options.logUI]
 * @param {{ info?: Function, error?: Function }} [options.logCamera]
 * @param {(scale: number) => void} [options.exportPNG]
 * @param {() => void} [options.undo]
 * @param {() => void} [options.redo]
 * @param {() => void} [options.clearAll]
 * @param {Array} [options.imageStack]
 * @param {(message: string) => boolean} [options.confirm]
 * @param {{ rotateCamera?: Function, panCamera?: Function, zoomCamera?: Function }} [options.cameraControls]
 * @returns {{ teardown: () => void, toggleHelp: () => void }}
 */
export function setupKeyboardShortcuts(options = {}) {
    const addTrackedEventListener = options.addTrackedEventListener ?? ((target, type, handler, opts) => target?.addEventListener?.(type, handler, opts));
    const windowRef = options.windowRef ?? globalThis;
    const documentRef = options.document ?? globalThis.document;
    const cameraAnimator = options.cameraAnimator ?? {};
    const showToast = options.showToast ?? noop;
    const logUI = options.logUI ?? { info: noop, error: noop };
    const logCamera = options.logCamera ?? { info: noop, error: noop };
    const exportPNG = options.exportPNG ?? noop;
    const undo = options.undo ?? noop;
    const redo = options.redo ?? noop;
    const clearAll = options.clearAll ?? noop;
    const imageStack = options.imageStack ?? [];
    const confirmDialog = options.confirm ?? ((message) => (typeof globalThis.confirm === 'function' ? globalThis.confirm(message) : true));
    const cameraControls = options.cameraControls ?? {};

    let helpOverlay = null;
    let removeKeydownListener = null;

    const toggleHelp = () => {
        if (!helpOverlay) {
            helpOverlay = createOverlay(documentRef);
        }

        if (!helpOverlay) {
            logUI.error?.('Unable to render keyboard help overlay');
            return;
        }

        const isHidden = helpOverlay.style.display === 'none' || !helpOverlay.style.display;
        helpOverlay.style.display = isHidden ? 'block' : 'none';
        logUI.info?.(isHidden ? 'Keyboard shortcuts help shown' : 'Keyboard shortcuts help hidden');
    };

    const hideHelp = () => {
        if (helpOverlay && helpOverlay.style.display === 'block') {
            helpOverlay.style.display = 'none';
            logUI.info?.('Help closed');
        }
    };

    const removeOverlay = () => {
        if (!helpOverlay) {
            return;
        }

        if (typeof helpOverlay.remove === 'function') {
            helpOverlay.remove();
        } else if (documentRef?.body?.removeChild) {
            try {
                documentRef.body.removeChild(helpOverlay);
            } catch (error) {
                logUI.error?.('Failed to remove keyboard overlay:', error);
            }
        }

        helpOverlay = null;
    };

    const keydownHandler = (event) => {
        if (!event) {
            return;
        }

        if (event.key === '?' || event.key === '/') {
            event.preventDefault?.();
            toggleHelp();
            return;
        }

        if (event.key === 'Escape') {
            if (cameraAnimator?.isAnimating) {
                cameraAnimator.cancel?.();
                showToast('Animation cancelled', 'info');
                logCamera.info?.('Animation cancelled via ESC');
                return;
            }
            hideHelp();
            return;
        }

        const ctrlOrCmd = event.ctrlKey || event.metaKey;

        if (ctrlOrCmd && event.key === 'e' && !event.shiftKey) {
            event.preventDefault?.();
            logUI.info?.('Keyboard shortcut: Export PNG (Ctrl/Cmd+E)');
            exportPNG(1);
            return;
        }

        if (ctrlOrCmd && event.key === 'z' && !event.shiftKey) {
            event.preventDefault?.();
            logUI.info?.('Keyboard shortcut: Undo (Ctrl/Cmd+Z)');
            undo();
            return;
        }

        if (ctrlOrCmd && event.key === 'z' && event.shiftKey) {
            event.preventDefault?.();
            logUI.info?.('Keyboard shortcut: Redo (Ctrl/Cmd+Shift+Z)');
            redo();
            return;
        }

        if (ctrlOrCmd && (event.key === 'Delete' || event.key === 'Backspace')) {
            event.preventDefault?.();
            if (Array.isArray(imageStack) && imageStack.length > 0) {
                const proceed = confirmDialog(DEFAULT_CONFIRM_MESSAGE);
                if (proceed) {
                    logUI.info?.('Keyboard shortcut: Clear all (Ctrl/Cmd+Delete)');
                    clearAll();
                }
            }
            return;
        }

        // Arrow keys: rotate camera (or pan with Shift)
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' ||
            event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            // Skip if in input field
            if (event.target?.tagName === 'INPUT' || event.target?.tagName === 'TEXTAREA') {
                return;
            }
            event.preventDefault?.();

            if (event.shiftKey) {
                // Shift + arrows = pan
                const deltaX = event.key === 'ArrowLeft' ? -PAN_STEP : (event.key === 'ArrowRight' ? PAN_STEP : 0);
                const deltaY = event.key === 'ArrowUp' ? PAN_STEP : (event.key === 'ArrowDown' ? -PAN_STEP : 0);
                if (cameraControls.panCamera) {
                    cameraControls.panCamera(deltaX, deltaY);
                    logCamera.info?.(`Pan camera: ${deltaX}, ${deltaY}`);
                }
            } else {
                // Plain arrows = rotate
                const deltaAzimuth = event.key === 'ArrowLeft' ? ROTATION_STEP : (event.key === 'ArrowRight' ? -ROTATION_STEP : 0);
                const deltaPolar = event.key === 'ArrowUp' ? -ROTATION_STEP : (event.key === 'ArrowDown' ? ROTATION_STEP : 0);
                if (cameraControls.rotateCamera) {
                    cameraControls.rotateCamera(deltaAzimuth, deltaPolar);
                    logCamera.info?.(`Rotate camera: azimuth ${deltaAzimuth.toFixed(3)}, polar ${deltaPolar.toFixed(3)}`);
                }
            }
            return;
        }

        // +/- keys: zoom in/out
        if (event.key === '+' || event.key === '=' || event.key === '-' || event.key === '_') {
            // Skip if in input field
            if (event.target?.tagName === 'INPUT' || event.target?.tagName === 'TEXTAREA') {
                return;
            }
            event.preventDefault?.();

            const zoomIn = event.key === '+' || event.key === '=';
            const delta = zoomIn ? -ZOOM_STEP : ZOOM_STEP;
            if (cameraControls.zoomCamera) {
                cameraControls.zoomCamera(delta);
                logCamera.info?.(`Zoom camera: ${zoomIn ? 'in' : 'out'}`);
            }
        }
    };

    addTrackedEventListener(windowRef, 'keydown', keydownHandler);
    removeKeydownListener = () => {
        windowRef?.removeEventListener?.('keydown', keydownHandler);
    };
    logUI.info?.('Keyboard shortcuts enabled (Ctrl/Cmd+E, Ctrl/Cmd+Z, Ctrl/Cmd+Shift+Z, Ctrl/Cmd+Delete, ?)');

    return {
        toggleHelp,
        teardown: () => {
            removeKeydownListener?.();
            removeKeydownListener = null;
            hideHelp();
            removeOverlay();
        }
    };
}
