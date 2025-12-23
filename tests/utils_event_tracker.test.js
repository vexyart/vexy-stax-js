// this_file: tests/utils_event_tracker.test.js

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { EventTracker } from '../src/utils/EventTracker.js';

// Mock EventTarget for Node.js environment
class MockTarget {
    constructor() {
        this.listeners = new Map();
    }

    addEventListener(type, listener, options) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }
        this.listeners.get(type).push({ listener, options });
    }

    removeEventListener(type, listener, options) {
        const typeListeners = this.listeners.get(type);
        if (typeListeners) {
            const index = typeListeners.findIndex(l => l.listener === listener);
            if (index !== -1) {
                typeListeners.splice(index, 1);
            }
        }
    }

    getListenerCount(type) {
        return this.listeners.get(type)?.length ?? 0;
    }
}

describe('EventTracker', () => {
    let tracker;
    let target;

    beforeEach(() => {
        tracker = new EventTracker();
        target = new MockTarget();
    });

    it('add should register event listener on target', () => {
        const handler = () => {};
        tracker.add(target, 'click', handler);

        assert.strictEqual(target.getListenerCount('click'), 1);
        assert.strictEqual(tracker.count, 1);
    });

    it('add should handle options parameter', () => {
        const handler = () => {};
        tracker.add(target, 'click', handler, { passive: true });

        assert.strictEqual(tracker.count, 1);
    });

    it('add should warn on invalid target', () => {
        // Should not throw, just warn
        assert.doesNotThrow(() => tracker.add(null, 'click', () => {}));
        assert.doesNotThrow(() => tracker.add({}, 'click', () => {}));
        assert.strictEqual(tracker.count, 0);
    });

    it('remove should unregister specific listener', () => {
        const handler = () => {};
        tracker.add(target, 'click', handler);
        tracker.remove(target, 'click', handler);

        assert.strictEqual(target.getListenerCount('click'), 0);
        assert.strictEqual(tracker.count, 0);
    });

    it('remove should do nothing for unknown listener', () => {
        const handler = () => {};
        tracker.add(target, 'click', handler);
        tracker.remove(target, 'click', () => {}); // Different function

        assert.strictEqual(tracker.count, 1);
    });

    it('removeAll should unregister all listeners', () => {
        const target2 = new MockTarget();
        tracker.add(target, 'click', () => {});
        tracker.add(target, 'keydown', () => {});
        tracker.add(target2, 'resize', () => {});

        tracker.removeAll();

        assert.strictEqual(target.getListenerCount('click'), 0);
        assert.strictEqual(target.getListenerCount('keydown'), 0);
        assert.strictEqual(target2.getListenerCount('resize'), 0);
        assert.strictEqual(tracker.count, 0);
    });

    it('removeAll should continue on errors', () => {
        const badTarget = {
            addEventListener: () => {},
            removeEventListener: () => { throw new Error('fail'); }
        };
        tracker.listeners.push({ target: badTarget, type: 'click', listener: () => {} });
        tracker.add(target, 'click', () => {});

        assert.doesNotThrow(() => tracker.removeAll());
        assert.strictEqual(tracker.count, 0);
    });

    it('count should return number of tracked listeners', () => {
        assert.strictEqual(tracker.count, 0);
        tracker.add(target, 'click', () => {});
        assert.strictEqual(tracker.count, 1);
        tracker.add(target, 'keydown', () => {});
        assert.strictEqual(tracker.count, 2);
    });

    it('dispose should be alias for removeAll', () => {
        tracker.add(target, 'click', () => {});
        tracker.dispose();
        assert.strictEqual(tracker.count, 0);
    });
});
