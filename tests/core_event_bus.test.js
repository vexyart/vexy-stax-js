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
