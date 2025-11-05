// this_file: src/utils/logger.js
/**
 * @fileoverview Simple prefixed logging utility for debugging.
 *
 * Provides consistent [Module] prefixes for all console output, making
 * logs searchable and easier to filter during debugging.
 *
 * @module logger
 * @example
 * import { createLogger } from './logger.js';
 * const log = createLogger('FileLoader');
 * log.info('Loading file:', filename); // => [FileLoader] Loading file: image.png
 * log.error('Load failed:', error); // => [FileLoader] Load failed: ...
 */

/**
 * Creates a logger with a consistent module prefix.
 *
 * Returns an object with log, warn, and error methods that automatically
 * prepend a [Module] prefix to all output.
 *
 * @param {string} moduleName - Module name for the prefix (e.g., 'FileLoader', 'Camera')
 * @returns {{log: Function, warn: Function, error: Function, info: Function}} Logger object
 * @example
 * const log = createLogger('ImageStack');
 * log.info('Stack updated'); // => [ImageStack] Stack updated
 * log.warn('Large file'); // => [ImageStack] Large file
 * log.error('Load failed'); // => [ImageStack] Load failed
 */
export function createLogger(moduleName) {
    const prefix = `[${moduleName}]`;

    return {
        /**
         * Log informational message
         * @param {...*} args - Arguments to log
         */
        log: (...args) => console.log(prefix, ...args),

        /**
         * Log informational message (alias for log)
         * @param {...*} args - Arguments to log
         */
        info: (...args) => console.log(prefix, ...args),

        /**
         * Log warning message
         * @param {...*} args - Arguments to log
         */
        warn: (...args) => console.warn(prefix, ...args),

        /**
         * Log error message
         * @param {...*} args - Arguments to log
         */
        error: (...args) => console.error(prefix, ...args),
    };
}
