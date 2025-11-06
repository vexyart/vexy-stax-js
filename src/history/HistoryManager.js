// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/history/HistoryManager.js

/**
 * HistoryManager encapsulates undo/redo bookkeeping for the image stack.
 * The manager keeps snapshots opaque by delegating capture/apply logic to
 * injected callbacks so Three.js resources can be handled outside the class.
 */
export class HistoryManager {
    constructor({
        maxSize,
        captureState,
        applyState,
        onStackChange,
        logger,
        showToast
    }) {
        if (!Number.isInteger(maxSize) || maxSize <= 0) {
            throw new Error('[HistoryManager] maxSize must be a positive integer');
        }
        if (typeof captureState !== 'function') {
            throw new Error('[HistoryManager] captureState callback is required');
        }
        if (typeof applyState !== 'function') {
            throw new Error('[HistoryManager] applyState callback is required');
        }

        this.maxSize = maxSize;
        this.captureState = captureState;
        this.applyState = applyState;
        this.onStackChange = typeof onStackChange === 'function' ? onStackChange : () => {};
        this.logger = logger ?? { info: () => {}, warn: () => {}, error: () => {} };
        this.showToast = typeof showToast === 'function' ? showToast : () => {};

        /** @type {Array<unknown>} */
        this.stack = [];
        /** @type {number} */
        this.index = -1;

        this._notify();
    }

    /**
     * Capture current state and append to stack.
     * Truncates redo states and enforces maxSize.
     * @returns {unknown} Captured snapshot
     */
    capture() {
        let snapshot;
        try {
            snapshot = this.captureState();
        } catch (error) {
            this.logger.error?.('[HistoryManager] Failed to capture snapshot', { error });
            this.showToast('❌ Failed to capture history snapshot', 'error');
            return null;
        }

        if (this.index < this.stack.length - 1) {
            this.stack = this.stack.slice(0, this.index + 1);
        }

        this.stack.push(snapshot);
        this.index = this.stack.length - 1;

        if (this.stack.length > this.maxSize) {
            this.stack.shift();
            this.index = this.stack.length - 1;
        }

        this.logger.info?.('[HistoryManager] Captured snapshot', {
            size: this.stack.length,
            index: this.index
        });
        this._notify();
        return snapshot;
    }

    /**
     * Undo to previous snapshot.
     * @returns {boolean} True when undo succeeded.
     */
    undo() {
        if (this.index <= 0) {
            this.logger.info?.('[HistoryManager] Nothing to undo', {
                size: this.stack.length,
                index: this.index
            });
            this.showToast('⚠️ Nothing to undo', 'warning');
            return false;
        }

        const previousIndex = this.index;
        this.index -= 1;
        const snapshot = this.stack[this.index];

        try {
            this.applyState(snapshot, { action: 'undo', index: this.index });
        } catch (error) {
            this.index = previousIndex;
            this.logger.error?.('[HistoryManager] Undo failed', {
                size: this.stack.length,
                index: previousIndex,
                error
            });
            this.showToast('❌ Undo failed. Check logs for details.', 'error');
            return false;
        }
        this.logger.info?.('[HistoryManager] Undo applied', {
            size: this.stack.length,
            index: this.index
        });
        this.showToast('↶ Undo applied', 'success');
        this._notify();
        return true;
    }

    /**
     * Redo to next snapshot, if available.
     * @returns {boolean} True when redo succeeded.
     */
    redo() {
        if (this.index >= this.stack.length - 1) {
            this.logger.info?.('[HistoryManager] Nothing to redo', {
                size: this.stack.length,
                index: this.index
            });
            this.showToast('⚠️ Nothing to redo', 'warning');
            return false;
        }

        const previousIndex = this.index;
        this.index += 1;
        const snapshot = this.stack[this.index];

        try {
            this.applyState(snapshot, { action: 'redo', index: this.index });
        } catch (error) {
            this.index = previousIndex;
            this.logger.error?.('[HistoryManager] Redo failed', {
                size: this.stack.length,
                index: previousIndex,
                error
            });
            this.showToast('❌ Redo failed. Check logs for details.', 'error');
            return false;
        }
        this.logger.info?.('[HistoryManager] Redo applied', {
            size: this.stack.length,
            index: this.index
        });
        this.showToast('↷ Redo applied', 'success');
        this._notify();
        return true;
    }

    /**
     * Clear all history snapshots.
     */
    clear() {
        this.stack = [];
        this.index = -1;
        this.logger.info?.('[HistoryManager] History cleared');
        this._notify();
    }

    /** @returns {number} */
    size() {
        return this.stack.length;
    }

    /** @returns {number} */
    getIndex() {
        return this.index;
    }

    /**
     * Snapshot view for tests/debugging (returns shallow copy).
     * @returns {unknown[]}
     */
    peekStack() {
        return this.stack.slice();
    }

    /**
     * @returns {unknown|null} Current snapshot
     */
    getCurrent() {
        if (this.index < 0 || this.index >= this.stack.length) {
            return null;
        }
        return this.stack[this.index];
    }

    _notify() {
        const stackCopy = this.stack.slice();
        try {
            this.onStackChange(this.index, stackCopy);
        } catch (error) {
            this.logger.error?.('[HistoryManager] onStackChange failed', { error });
            this.showToast('❌ History sync failed. Check logs.', 'error');
        }
    }
}
