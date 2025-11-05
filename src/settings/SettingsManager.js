// SPDX-License-Identifier: Apache-2.0
// this_file: src/settings/SettingsManager.js

const STORAGE_KEY = 'vexy-stax-settings';

function ensureLogger(logger) {
    const noop = () => {};
    return {
        info: logger?.info ?? noop,
        warn: logger?.warn ?? noop,
        error: logger?.error ?? noop
    };
}

function ensureFn(fn, fallback) {
    return typeof fn === 'function' ? fn : fallback;
}

export function createSettingsManager(options = {}) {
    const params = options.params ?? {};
    const storage = options.storage;
    const logger = ensureLogger(options.logger);
    const confirmFn = ensureFn(options.confirm, () => true);
    const alertFn = ensureFn(options.alert, () => {});
    const refreshPane = ensureFn(options.refreshPane, () => {});
    const switchCameraMode = ensureFn(options.switchCameraMode, () => {});
    const updateZoom = ensureFn(options.updateZoom, () => {});
    const updateBackground = ensureFn(options.updateBackground, () => {});
    const updateZSpacing = ensureFn(options.updateZSpacing, () => {});
    const updateReflectionSettings = ensureFn(options.updateReflectionSettings, () => {});
    const defaults = options.defaults ?? {};

    const storageAvailable = Boolean(storage && typeof storage.getItem === 'function' && typeof storage.setItem === 'function');

    const applySettings = (settings = {}) => {
        if (settings.cameraMode !== undefined) params.cameraMode = settings.cameraMode;
        if (settings.cameraFOV !== undefined) params.cameraFOV = settings.cameraFOV;
        if (settings.cameraZoom !== undefined) params.cameraZoom = settings.cameraZoom;
        if (settings.bgColor !== undefined) params.bgColor = settings.bgColor;
        if (settings.transparentBg !== undefined) params.transparentBg = settings.transparentBg;
        if (settings.zSpacing !== undefined) params.zSpacing = settings.zSpacing;
    };

    const serializeParams = () => ({
        cameraMode: params.cameraMode,
        cameraFOV: params.cameraFOV,
        cameraZoom: params.cameraZoom,
        bgColor: params.bgColor,
        transparentBg: params.transparentBg,
        zSpacing: params.zSpacing
    });

    const saveSnapshot = () => {
        if (!storageAvailable) {
            logger.warn('localStorage not available');
            return;
        }

        const settings = serializeParams();

        try {
            storage.setItem(STORAGE_KEY, JSON.stringify(settings));
            logger.info('Settings saved to localStorage');
        } catch (error) {
            if (error && (error.name === 'QuotaExceededError' || error.code === 22)) {
                logger.error('localStorage quota exceeded');
                const clear = confirmFn(
                    'Storage quota full!\n\n' +
                        'Cannot save settings because browser storage is full.\n\n' +
                        'Click OK to clear Vexy Stax storage and try again, or Cancel to continue without saving.'
                );

                if (clear) {
                    try {
                        if (typeof storage.removeItem === 'function') {
                            storage.removeItem(STORAGE_KEY);
                        }
                        logger.info('Cleared storage, retrying save...');
                        storage.setItem(STORAGE_KEY, JSON.stringify(settings));
                        logger.info('Settings saved successfully after clearing storage');
                        alertFn('Storage cleared and settings saved!');
                    } catch (retryError) {
                        logger.error('Failed to save even after clearing:', retryError);
                        alertFn('Still unable to save settings. Try closing other tabs or clearing browser data.');
                    }
                } else {
                    logger.warn('User declined to clear storage - settings not saved');
                }
                return;
            }

            logger.error('Failed to save settings:', error?.name ?? 'UnknownError', error?.message ?? error);
        }
    };

    return {
        loadSettings() {
            if (!storageAvailable) {
                logger.warn('localStorage not available');
                return false;
            }

            try {
                const saved = storage.getItem(STORAGE_KEY);
                if (!saved) {
                    logger.info('No saved settings found');
                    return false;
                }

                const settings = JSON.parse(saved);
                applySettings(settings);
                logger.info('Settings loaded from localStorage:', settings);
                return true;
            } catch (error) {
                logger.error('Failed to load settings:', error);
                return false;
            }
        },

        saveSettings() {
            saveSnapshot();
        },

        resetSettings() {
            applySettings(defaults);
            refreshPane();
            switchCameraMode(params.cameraMode);
            updateZoom(params.cameraZoom);
            updateBackground();
            updateZSpacing(params.zSpacing);
            updateReflectionSettings();

            if (storageAvailable && typeof storage.removeItem === 'function') {
                try {
                    storage.removeItem(STORAGE_KEY);
                    logger.info('Settings reset to defaults and cleared from localStorage');
                } catch (error) {
                    logger.error('Failed to clear settings:', error);
                }
            } else {
                logger.info('Settings reset to defaults');
            }
        }
    };
}
