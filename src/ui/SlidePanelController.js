// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/ui/SlidePanelController.js

import { createLogger } from '../utils/logger.js';

const log = createLogger('SlidePanelController');

/**
 * SlidePanelController - Manages the slide thumbnail panel
 *
 * Extracts slide list UI management from main.js:
 * - updateImageList(): Render slide thumbnails
 * - Drag/drop handlers for reordering
 * - Keyboard navigation within slide list
 *
 * @example
 * const controller = new SlidePanelController({
 *     imageStack,
 *     onDelete: (index) => sceneComposition.deleteAt(index),
 *     onReorder: (from, to) => sceneComposition.reorder(from, to),
 *     onUpdateAriaLabel: () => updateCanvasAriaLabel()
 * });
 *
 * controller.updateImageList(); // Re-render thumbnails
 */
export class SlidePanelController {
    /**
     * @param {Object} options
     * @param {Array} options.imageStack - Reference to imageStack array
     * @param {Function} options.onDelete - Callback when slide is deleted
     * @param {Function} options.onReorder - Callback when slides are reordered
     * @param {Function} [options.onUpdateAriaLabel] - Callback to update canvas aria-label
     * @param {Function} [options.showToast] - Toast notification function
     */
    constructor(options) {
        if (!options.imageStack) {
            throw new Error('[SlidePanelController] imageStack is required. Fix: Pass the imageStack array reference.');
        }
        if (typeof options.onDelete !== 'function') {
            throw new Error('[SlidePanelController] onDelete callback is required. Fix: Pass a function to handle slide deletion.');
        }
        if (typeof options.onReorder !== 'function') {
            throw new Error('[SlidePanelController] onReorder callback is required. Fix: Pass a function to handle slide reordering.');
        }

        this.imageStack = options.imageStack;
        this.onDelete = options.onDelete;
        this.onReorder = options.onReorder;
        this.onUpdateAriaLabel = options.onUpdateAriaLabel || null;
        this.showToast = options.showToast || (() => {});

        /** @private */
        this.draggedElement = null;
        /** @private */
        this.draggedIndex = null;
        /** @private */
        this.listContainer = null;
        /** @private */
        this.emptyMessage = null;
        /** @private */
        this.slidesPanel = null;
    }

    /**
     * Update the image list UI with current slide thumbnails
     */
    updateImageList() {
        this.listContainer = document.getElementById('image-list');
        this.emptyMessage = document.getElementById('slides-empty-message');
        this.slidesPanel = document.getElementById('slides-panel');

        if (!this.listContainer) {
            return;
        }

        this.listContainer.setAttribute('role', 'list');
        this.listContainer.innerHTML = '';

        const hasImages = this.imageStack.length > 0;
        this.slidesPanel?.classList.toggle('is-empty', !hasImages);
        if (this.emptyMessage) {
            this.emptyMessage.classList.toggle('hidden', hasImages);
        }

        // Update canvas aria-label when image count changes
        if (typeof this.onUpdateAriaLabel === 'function') {
            this.onUpdateAriaLabel();
        }

        this.imageStack.forEach((imageData, index) => {
            const item = this.#createSlideItem(imageData, index);
            this.listContainer.appendChild(item);
        });

        log.info(`Image list updated: ${this.imageStack.length} slides`);
    }

    /** @private */
    #createSlideItem(imageData, index) {
        const item = document.createElement('div');
        item.className = 'slide-thumb';
        item.draggable = true;
        item.dataset.index = index;
        item.dataset.id = imageData.id;
        item.tabIndex = 0;
        item.setAttribute('role', 'listitem');
        item.setAttribute(
            'aria-label',
            `Slide ${index + 1}: ${imageData.filename}, ${imageData.originalWidth} by ${imageData.originalHeight} pixels`
        );
        item.title = `${imageData.filename} — ${imageData.originalWidth}×${imageData.originalHeight}px`;

        const image = document.createElement('img');
        image.src =
            imageData.thumbnailSrc ||
            imageData.texture?.image?.currentSrc ||
            imageData.texture?.image?.src ||
            '';
        image.alt = '';
        image.draggable = false;
        item.appendChild(image);

        const indexBadge = document.createElement('span');
        indexBadge.className = 'slide-thumb-index';
        indexBadge.textContent = index + 1;
        item.appendChild(indexBadge);

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'slide-thumb-delete';
        deleteButton.setAttribute('aria-label', `Delete ${imageData.filename}`);
        deleteButton.textContent = '✕';
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.onDelete(index);
        });
        item.appendChild(deleteButton);

        item.addEventListener('click', () => {
            item.focus();
        });

        // Drag events for reordering
        item.addEventListener('dragstart', (e) => this.#handleDragStart(e));
        item.addEventListener('dragover', (e) => this.#handleDragOver(e));
        item.addEventListener('drop', (e) => this.#handleDrop(e));
        item.addEventListener('dragend', (e) => this.#handleDragEnd(e));

        // Keyboard navigation events
        item.addEventListener('keydown', (e) => this.#handleKeydown(e, index, imageData));
        item.addEventListener('focus', () => {
            item.classList.add('focused');
        });
        item.addEventListener('blur', () => {
            item.classList.remove('focused');
        });

        return item;
    }

    /** @private */
    #handleDragStart(e) {
        const item = e.currentTarget;
        this.draggedElement = item;
        this.draggedIndex = parseInt(item.dataset.index, 10);
        item.classList.add('dragging');

        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', String(this.draggedIndex));
        }
    }

    /** @private */
    #handleDragOver(e) {
        e.preventDefault();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'move';
        }
        return false;
    }

    /** @private */
    #handleDrop(e) {
        e.preventDefault();

        const dropIndex = parseInt(e.currentTarget.dataset.index, 10);

        if (this.draggedIndex !== null && this.draggedIndex !== dropIndex) {
            this.onReorder(this.draggedIndex, dropIndex);
        }

        return false;
    }

    /** @private */
    #handleDragEnd(e) {
        e.currentTarget.classList.remove('dragging');
        this.draggedElement = null;
        this.draggedIndex = null;
    }

    /** @private */
    #handleKeydown(e, index, imageData) {
        const items = Array.from(this.listContainer.children);

        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                if (index > 0) {
                    items[index - 1].focus();
                }
                break;

            case 'ArrowDown':
                e.preventDefault();
                if (index < items.length - 1) {
                    items[index + 1].focus();
                }
                break;

            case 'Delete':
            case 'Backspace':
                e.preventDefault();
                // eslint-disable-next-line no-alert
                if (confirm(`Delete "${imageData.filename}"?`)) {
                    this.onDelete(index);
                    setTimeout(() => {
                        const newItems = Array.from(this.listContainer.children);
                        if (newItems.length > 0) {
                            const focusIndex = Math.min(index, newItems.length - 1);
                            newItems[focusIndex]?.focus();
                        }
                    }, 100);
                }
                break;

            case 'Enter':
                e.preventDefault();
                this.#highlightSlide(index, imageData);
                break;
        }
    }

    /** @private */
    #highlightSlide(index, imageData) {
        const mesh = this.imageStack[index]?.mesh;
        if (mesh?.material?.emissive) {
            const originalEmissive = mesh.material.emissive.getHex();
            mesh.material.emissive.setHex(0x44ff44);

            setTimeout(() => {
                mesh.material.emissive.setHex(originalEmissive);
            }, 500);

            log.info(`Highlighted image ${index + 1}: ${imageData.filename}`);
            this.showToast(`✨ Image ${index + 1}: ${imageData.filename}`, 'info', 2000);
        }
    }

    /**
     * Dispose resources
     */
    dispose() {
        this.listContainer = null;
        this.emptyMessage = null;
        this.slidesPanel = null;
        this.draggedElement = null;
        this.draggedIndex = null;
        log.info('Disposed');
    }
}
