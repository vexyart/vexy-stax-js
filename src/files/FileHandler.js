// SPDX-License-Identifier: Apache-2.0
// this_file: src/files/FileHandler.js
/**
 * FileHandler encapsulates drag-and-drop plus browse-based intake of image files.
 * Responsibilities:
 * - Guard incoming files by MIME type and size thresholds before texture loading
 * - Surface validation feedback through injected toast + logger utilities
 * - Coordinate memory gating via an injected predicate before delegating to the loader
 * - Toggle drop overlays through injected DOM references
 *
 * The handler is deliberately dependency-injected so the orchestration layer (`src/main.js`)
 * controls DOM lookup, event tracking, and downstream image loading.
 */

import {
    FILE_SIZE_WARN_MB,
    FILE_SIZE_REJECT_MB,
    TOAST_DURATION_ERROR,
    TOAST_DURATION_WARNING
} from '../core/constants.js';

const SUPPORTED_TYPES = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
    'image/svg+xml'
];

const BYTES_PER_MB = 1024 * 1024;
const UNSUPPORTED_TYPE_DURATION = 4000;
const MEMORY_LIMIT_MESSAGE = '❌ Image not added (memory limit)';

/**
 * @typedef {Object} FileHandlerOptions
 * @property {{ imageInput: HTMLInputElement | null, browseButton: HTMLElement | null, dropOverlay: HTMLElement | null, slidesPanel: HTMLElement | null }} elements
 * @property {(target: EventTarget, type: string, handler: EventListenerOrEventListenerObject, options?: AddEventListenerOptions) => void} addTrackedEventListener
 * @property {(file: File) => void} onFileAccepted
 * @property {() => boolean} shouldProceedAfterMemoryCheck
 * @property {(message: string, type?: string, duration?: number) => void} showToast
 * @property {{ logFile: { info: Function, warn: Function, error: Function }, logValidation: { warn: Function, error: Function } }} loggers
 */

export class FileHandler {
    /**
     * @param {FileHandlerOptions} options
     */
    constructor(options) {
        const {
            elements,
            addTrackedEventListener,
            onFileAccepted,
            shouldProceedAfterMemoryCheck,
            showToast,
            loggers
        } = options;

        if (typeof onFileAccepted !== 'function') {
            throw new Error('FileHandler requires an onFileAccepted callback');
        }
        if (typeof shouldProceedAfterMemoryCheck !== 'function') {
            throw new Error('FileHandler requires shouldProceedAfterMemoryCheck callback');
        }

        this.imageInput = elements?.imageInput ?? null;
        this.browseButton = elements?.browseButton ?? null;
        this.dropOverlay = elements?.dropOverlay ?? null;
        this.slidesPanel = elements?.slidesPanel ?? null;
        this.addTrackedEventListener = addTrackedEventListener ?? (() => {});
        this.onFileAccepted = onFileAccepted;
        this.shouldProceedAfterMemoryCheck = shouldProceedAfterMemoryCheck;
        this.showToast = showToast ?? (() => {});
        this.logFile = loggers?.logFile ?? {
            info: () => {},
            warn: () => {},
            error: () => {}
        };
        this.logValidation = loggers?.logValidation ?? {
            warn: () => {},
            error: () => {}
        };

        this.dragDepth = 0;

        this.handleBrowseClick = this.handleBrowseClick.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
    }

    /**
     * Attach DOM listeners for drag/drop and browse flows.
     */
    setup() {
        if (!this.imageInput) {
            this.logFile.error('File input element not found');
            return;
        }

        if (this.browseButton) {
            this.addTrackedEventListener(this.browseButton, 'click', this.handleBrowseClick);
        }

        this.addTrackedEventListener(this.imageInput, 'change', this.handleFileSelect);

        if (typeof window === 'undefined') {
            return;
        }

        this.addTrackedEventListener(window, 'dragenter', this.handleDragEnter);
        this.addTrackedEventListener(window, 'dragleave', this.handleDragLeave);
        this.addTrackedEventListener(window, 'dragover', this.handleDragOver);
        this.addTrackedEventListener(window, 'drop', this.handleDrop);
        this.addTrackedEventListener(window, 'dragend', this.handleDragEnd);
    }

    /**
     * Remove overlay state during teardown.
     */
    teardown() {
        this.hideOverlay();
    }

    /**
     * Process an array-like collection of File objects, applying validation and
     * delegating accepted files.
     * @param {FileList | File[] | null | undefined} files
     */
    processFiles(files) {
        if (!files || files.length === 0) {
            this.logFile.warn('No files provided for processing');
            return;
        }

        const fileList = Array.from(files);
        let invalidCount = 0;
        let validCount = 0;

        this.logFile.info(`Loading ${fileList.length} file(s)...`);

        for (const file of fileList) {
            if (!this.validateFileType(file)) {
                invalidCount += 1;
                continue;
            }

            if (!this.validateFileSize(file)) {
                invalidCount += 1;
                continue;
            }

            const proceed = this.shouldProceedAfterMemoryCheck();
            if (!proceed) {
                invalidCount += 1;
                this.showToast(MEMORY_LIMIT_MESSAGE, 'warning', TOAST_DURATION_WARNING);
                continue;
            }

            validCount += 1;
            this.onFileAccepted(file);
        }

        if (invalidCount > 0) {
            this.logValidation.warn(` ${invalidCount} file(s) rejected, ${validCount} accepted`);
        }
    }

    /**
     * Internal: file input change handler.
     * @param {Event} event
     */
    handleFileSelect(event) {
        const target = /** @type {HTMLInputElement} */ (event.target);
        this.processFiles(target?.files ?? null);
    }

    /**
     * Internal: browse button click triggers native input.
     * @param {MouseEvent} event
     */
    handleBrowseClick(event) {
        event.preventDefault();
        this.imageInput?.click();
    }

    /**
     * Internal: dragenter should reveal overlay when payload holds files.
     * @param {DragEvent} event
     */
    handleDragEnter(event) {
        if (!this.eventHasFiles(event)) {
            return;
        }
        this.dragDepth += 1;
        this.showOverlay();
    }

    /**
     * Internal: dragleave needs depth tracking to avoid flicker.
     * @param {DragEvent} event
     */
    handleDragLeave(event) {
        if (!this.eventHasFiles(event)) {
            return;
        }
        this.dragDepth = Math.max(0, this.dragDepth - 1);
        if (this.dragDepth === 0) {
            this.hideOverlay();
        }
    }

    /**
     * Internal: dragover prevents default to allow drops.
     * @param {DragEvent} event
     */
    handleDragOver(event) {
        if (!this.eventHasFiles(event)) {
            return;
        }
        event.preventDefault();
        this.showOverlay();
    }

    /**
     * Internal: drop handler consumes files and resets overlay state.
     * @param {DragEvent} event
     */
    handleDrop(event) {
        if (!this.eventHasFiles(event)) {
            this.hideOverlay();
            return;
        }

        event.preventDefault();
        const { files } = event.dataTransfer ?? { files: null };
        this.hideOverlay();

        if (files && files.length > 0) {
            this.processFiles(files);
        }
    }

    /**
     * Internal: dragend should always reset overlay.
     */
    handleDragEnd() {
        this.hideOverlay();
    }

    /**
     * Validate MIME type.
     * @param {File} file
     * @returns {boolean}
     */
    validateFileType(file) {
        if (SUPPORTED_TYPES.includes(file.type)) {
            return true;
        }

        const extension = (file.name || '').split('.').pop()?.toLowerCase() ?? 'unknown';
        this.logValidation.error(`Unsupported file type: ${file.name} (${file.type || 'unknown type'})`);
        this.showToast(`❌ Unsupported file type: .${extension} (only images supported)`, 'error', UNSUPPORTED_TYPE_DURATION);
        return false;
    }

    /**
     * Validate file size thresholds.
     * @param {File} file
     * @returns {boolean}
     */
    validateFileSize(file) {
        const warnThresholdBytes = FILE_SIZE_WARN_MB * BYTES_PER_MB;
        const rejectThresholdBytes = FILE_SIZE_REJECT_MB * BYTES_PER_MB;

        if (file.size > rejectThresholdBytes) {
            const sizeMB = (file.size / BYTES_PER_MB).toFixed(1);
            this.logValidation.error(`File ${file.name} is too large (${sizeMB}MB). Maximum size is ${FILE_SIZE_REJECT_MB}MB.`);
            this.showToast(`❌ File too large: ${file.name} (${sizeMB}MB). Max: ${FILE_SIZE_REJECT_MB}MB`, 'error', TOAST_DURATION_ERROR);
            return false;
        }

        if (file.size > warnThresholdBytes) {
            const sizeMB = (file.size / BYTES_PER_MB).toFixed(1);
            this.logValidation.warn(`Warning: File ${file.name} is large (${sizeMB}MB). This may affect performance.`);
            this.showToast(`⚠️ Large file: ${file.name} (${sizeMB}MB). May affect performance`, 'warning', TOAST_DURATION_WARNING);
        }

        return true;
    }

    /**
     * Determine whether a drag event includes files.
     * @param {DragEvent} event
     * @returns {boolean}
     */
    eventHasFiles(event) {
        const { dataTransfer } = event;
        if (!dataTransfer) {
            return false;
        }

        if (dataTransfer.files && dataTransfer.files.length > 0) {
            return true;
        }

        const types = Array.from(dataTransfer.types || []);
        return types.includes('Files');
    }

    showOverlay() {
        this.dropOverlay?.classList.add('visible');
        this.slidesPanel?.classList.add('drag-active');
    }

    hideOverlay() {
        this.dropOverlay?.classList.remove('visible');
        this.slidesPanel?.classList.remove('drag-active');
        this.dragDepth = 0;
    }
}
