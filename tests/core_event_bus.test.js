// this_file: tests/core_event_bus.test.js
import test from 'node:test';
import assert from 'node:assert/strict';

import { EventBus } from '../src/core/EventBus.js';

test('EventBus emits payloads to registered listeners', async () => {
    const bus = new EventBus();
    const events = [];

    bus.on('demo', (payload) => events.push(payload));
    bus.emit('demo', { id: 1 });
    bus.emit('demo', { id: 2 });

    assert.deepStrictEqual(
        events,
        [{ id: 1 }, { id: 2 }],
        'listeners should receive emitted payloads in order'
    );
});

test('EventBus off removes specific listener', () => {
    const bus = new EventBus();
    let count = 0;

    const handler = () => {
        count += 1;
    };

    bus.on('tick', handler);
    bus.emit('tick');

    bus.off('tick', handler);
    bus.emit('tick');

    assert.equal(count, 1, 'handler should only fire before it is removed');
});

test('EventBus on returns an unsubscribe helper', () => {
    const bus = new EventBus();
    let count = 0;

    const unsubscribe = bus.on('tick', () => {
        count += 1;
    });

    bus.emit('tick');
    unsubscribe();
    bus.emit('tick');

    assert.equal(count, 1, 'unsubscribe helper should stop delivery');
});

test('EventBus once registers handler that self-removes after first emit', () => {
    const bus = new EventBus();
    let count = 0;

    bus.once('ready', () => {
        count += 1;
    });

    bus.emit('ready');
    bus.emit('ready');

    assert.equal(count, 1, '`once` handler should run exactly once');
});

test('EventBus clear removes every listener', () => {
    const bus = new EventBus();
    let count = 0;

    bus.on('tick', () => {
        count += 1;
    });
    bus.on('tack', () => {
        count += 1;
    });

    bus.clear();
    bus.emit('tick');
    bus.emit('tack');

    assert.equal(count, 0, 'no handler should fire after clear');
});

test('EventBus on rejects non-function handlers', () => {
    const bus = new EventBus();

    assert.throws(
        () => bus.on('demo', 'not-a-function'),
        /requires a function handler/,
        'on should reject invalid handlers'
    );
});

// Edge case tests for robustness

test('EventBus emit does nothing for non-existent events', () => {
    const bus = new EventBus();

    // Should not throw
    bus.emit('nonExistent', { data: 'test' });

    assert.ok(true, 'emit should handle non-existent events gracefully');
});

test('EventBus off handles non-existent events gracefully', () => {
    const bus = new EventBus();
    const handler = () => {};

    // Should not throw
    bus.off('nonExistent', handler);

    assert.ok(true, 'off should handle non-existent events gracefully');
});

test('EventBus off handles removing non-existent handler', () => {
    const bus = new EventBus();
    const handler1 = () => {};
    const handler2 = () => {};

    bus.on('event', handler1);
    bus.off('event', handler2); // handler2 was never added

    let called = false;
    bus.on('event', () => { called = true; });
    bus.emit('event');

    assert.ok(called, 'other handlers should still work after removing non-existent handler');
});

test('EventBus once can be cancelled before first emit', () => {
    const bus = new EventBus();
    let count = 0;

    const unsubscribe = bus.once('ready', () => {
        count += 1;
    });

    unsubscribe(); // Cancel before emit
    bus.emit('ready');

    assert.equal(count, 0, 'cancelled once handler should not fire');
});

test('EventBus handles multiple listeners for same event', () => {
    const bus = new EventBus();
    const calls = [];

    bus.on('multi', () => calls.push('A'));
    bus.on('multi', () => calls.push('B'));
    bus.on('multi', () => calls.push('C'));

    bus.emit('multi');

    assert.deepStrictEqual(calls, ['A', 'B', 'C'], 'all handlers should fire in order');
});

test('EventBus handlers are safe from mutation during emit', () => {
    const bus = new EventBus();
    const calls = [];

    // Handler that unsubscribes itself
    const unsubscribe = bus.on('event', () => {
        calls.push('A');
        unsubscribe(); // Remove self during emit
    });

    bus.on('event', () => calls.push('B'));

    bus.emit('event');
    bus.emit('event'); // Second emit should not include A

    assert.deepStrictEqual(calls, ['A', 'B', 'B'], 'handlers should be safe from mid-emit mutations');
});

test('EventBus emit with no listeners is a no-op', () => {
    const bus = new EventBus();

    // Should not throw
    bus.emit('unused');
    bus.emit('unused', { payload: 'data' });

    assert.ok(true, 'emit with no listeners should not throw');
});

test('EventBus clear works multiple times', () => {
    const bus = new EventBus();
    let count = 0;

    bus.on('event', () => count++);
    bus.clear();
    bus.clear(); // Second clear should not throw

    bus.on('event', () => count++);
    bus.emit('event');

    assert.equal(count, 1, 'handlers added after clear should work');
});
