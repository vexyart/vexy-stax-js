// this_file: tests/ui_slide_panel_controller.test.js

import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { SlidePanelController } from '../src/ui/SlidePanelController.js';

// Mock DOM
global.document = {
    getElementById: () => null,
    createElement: () => ({
        className: '',
        draggable: false,
        dataset: {},
        tabIndex: 0,
        textContent: '',
        title: '',
        type: '',
        src: '',
        alt: '',
        setAttribute: () => {},
        getAttribute: () => '',
        appendChild: () => {},
        addEventListener: () => {},
        classList: { toggle: () => {}, add: () => {}, remove: () => {} }
    })
};

describe('SlidePanelController', () => {
    let imageStack, controller;
    const mockOnDelete = mock.fn(() => {});
    const mockOnReorder = mock.fn(() => {});

    beforeEach(() => {
        imageStack = [];
        mockOnDelete.mock.resetCalls();
        mockOnReorder.mock.resetCalls();
    });

    it('constructor should throw without imageStack', () => {
        assert.throws(
            () => new SlidePanelController({ onDelete: () => {}, onReorder: () => {} }),
            /imageStack is required/
        );
    });

    it('constructor should throw without onDelete', () => {
        assert.throws(
            () => new SlidePanelController({ imageStack: [], onReorder: () => {} }),
            /onDelete callback is required/
        );
    });

    it('constructor should throw without onReorder', () => {
        assert.throws(
            () => new SlidePanelController({ imageStack: [], onDelete: () => {} }),
            /onReorder callback is required/
        );
    });

    it('constructor should accept valid options', () => {
        controller = new SlidePanelController({
            imageStack,
            onDelete: mockOnDelete,
            onReorder: mockOnReorder
        });
        assert.strictEqual(controller.imageStack, imageStack);
    });

    it('updateImageList should not throw when container missing', () => {
        controller = new SlidePanelController({
            imageStack,
            onDelete: mockOnDelete,
            onReorder: mockOnReorder
        });
        // No container exists in mock
        assert.doesNotThrow(() => controller.updateImageList());
    });

    it('updateImageList should call onUpdateAriaLabel if provided', () => {
        let ariaCalled = false;
        const mockContainer = {
            setAttribute: () => {},
            innerHTML: '',
            appendChild: () => {},
            children: []
        };

        global.document.getElementById = (id) => {
            if (id === 'image-list') return mockContainer;
            return null;
        };

        controller = new SlidePanelController({
            imageStack,
            onDelete: mockOnDelete,
            onReorder: mockOnReorder,
            onUpdateAriaLabel: () => { ariaCalled = true; }
        });

        controller.updateImageList();
        assert.strictEqual(ariaCalled, true);

        // Reset global mock
        global.document.getElementById = () => null;
    });

    it('updateImageList should create slide items for each image', () => {
        const appendedItems = [];
        const mockContainer = {
            setAttribute: () => {},
            innerHTML: '',
            appendChild: (item) => { appendedItems.push(item); },
            children: []
        };

        const mockPanel = {
            classList: { toggle: () => {} }
        };

        global.document.getElementById = (id) => {
            if (id === 'image-list') return mockContainer;
            if (id === 'slides-panel') return mockPanel;
            return null;
        };

        imageStack = [
            { id: '1', filename: 'test1.png', originalWidth: 100, originalHeight: 100, texture: null },
            { id: '2', filename: 'test2.png', originalWidth: 200, originalHeight: 200, texture: null }
        ];

        controller = new SlidePanelController({
            imageStack,
            onDelete: mockOnDelete,
            onReorder: mockOnReorder
        });

        controller.updateImageList();
        assert.strictEqual(appendedItems.length, 2);

        // Reset global mock
        global.document.getElementById = () => null;
    });

    it('dispose should clear references', () => {
        controller = new SlidePanelController({
            imageStack,
            onDelete: mockOnDelete,
            onReorder: mockOnReorder
        });

        controller.listContainer = {};
        controller.emptyMessage = {};
        controller.slidesPanel = {};

        controller.dispose();

        assert.strictEqual(controller.listContainer, null);
        assert.strictEqual(controller.emptyMessage, null);
        assert.strictEqual(controller.slidesPanel, null);
        assert.strictEqual(controller.draggedElement, null);
        assert.strictEqual(controller.draggedIndex, null);
    });

    it('constructor should accept optional showToast', () => {
        let toastCalled = false;
        controller = new SlidePanelController({
            imageStack,
            onDelete: mockOnDelete,
            onReorder: mockOnReorder,
            showToast: () => { toastCalled = true; }
        });

        controller.showToast('test', 'info');
        assert.strictEqual(toastCalled, true);
    });

    it('default showToast should be no-op', () => {
        controller = new SlidePanelController({
            imageStack,
            onDelete: mockOnDelete,
            onReorder: mockOnReorder
        });

        // Should not throw
        assert.doesNotThrow(() => controller.showToast('test', 'info'));
    });
});
