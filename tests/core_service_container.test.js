// this_file: tests/core_service_container.test.js

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { ServiceContainer } from '../src/core/ServiceContainer.js';

describe('ServiceContainer', () => {
    let container;

    beforeEach(() => {
        container = new ServiceContainer();
    });

    it('register and get should store and retrieve services', () => {
        const service = { name: 'test' };
        container.register('test', service);
        assert.strictEqual(container.get('test'), service);
    });

    it('register should throw on duplicate name', () => {
        container.register('test', {});
        assert.throws(
            () => container.register('test', {}),
            /Service 'test' already registered/
        );
    });

    it('get should throw on unknown service', () => {
        assert.throws(
            () => container.get('unknown'),
            /Service 'unknown' not found/
        );
    });

    it('has should return true for registered services', () => {
        container.register('test', {});
        assert.strictEqual(container.has('test'), true);
        assert.strictEqual(container.has('unknown'), false);
    });

    it('unregister should remove and dispose service', () => {
        let disposed = false;
        const service = { dispose: () => { disposed = true; } };
        container.register('test', service);

        container.unregister('test');

        assert.strictEqual(disposed, true);
        assert.strictEqual(container.has('test'), false);
    });

    it('unregister with dispose=false should not call dispose', () => {
        let disposed = false;
        const service = { dispose: () => { disposed = true; } };
        container.register('test', service);

        container.unregister('test', false);

        assert.strictEqual(disposed, false);
    });

    it('disposeAll should dispose all services in reverse order', () => {
        const order = [];
        container.register('first', { dispose: () => order.push('first') });
        container.register('second', { dispose: () => order.push('second') });
        container.register('third', { dispose: () => order.push('third') });

        container.disposeAll();

        assert.deepEqual(order, ['third', 'second', 'first']);
        assert.strictEqual(container.size, 0);
    });

    it('disposeAll should handle services without dispose method', () => {
        container.register('noDispose', { name: 'test' });
        container.register('hasDispose', { dispose: () => {} });

        assert.doesNotThrow(() => container.disposeAll());
    });

    it('disposeAll should continue on dispose errors', () => {
        container.register('error', { dispose: () => { throw new Error('fail'); } });
        container.register('ok', { dispose: () => {} });

        assert.doesNotThrow(() => container.disposeAll());
        assert.strictEqual(container.size, 0);
    });

    it('getServiceNames should return all registered names', () => {
        container.register('a', {});
        container.register('b', {});

        const names = container.getServiceNames();
        assert.deepEqual(names.sort(), ['a', 'b']);
    });

    it('size should return count of services', () => {
        assert.strictEqual(container.size, 0);
        container.register('a', {});
        assert.strictEqual(container.size, 1);
        container.register('b', {});
        assert.strictEqual(container.size, 2);
    });
});
