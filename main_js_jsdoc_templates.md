# <!-- this_file: main_js_jsdoc_templates.md -->
# main.js JSDoc Templates

**Purpose**: JSDoc templates for the 18 most important functions in main.js

## Export Functions

```javascript
/**
 * Exports the current 3D scene as a PNG image
 * @param {number} [scale=1] - Resolution multiplier (1x, 2x, or 4x for higher quality)
 * @returns {void}
 * @example
 * exportPNG(2); // Export at 2x resolution
 */
function exportPNG(scale = 1) { ... }

/**
 * Exports the current scene configuration as JSON with embedded images
 * @returns {void}
 */
function exportJSON() { ... }

/**
 * Imports a scene configuration from a JSON file
 * @param {File} file - JSON file containing scene configuration
 * @returns {Promise<void>}
 */
function importJSON(file) { ... }
```

## Image Management

```javascript
/**
 * Clears all images from the scene and resets state
 * @returns {void}
 */
function clearAll() { ... }

/**
 * Removes a specific image from the stack by index
 * @param {number} index - Zero-based index of image to delete
 * @returns {void}
 */
function deleteImage(index) { ... }

/**
 * Loads an image file into the scene
 * @param {File} file - Image file (PNG, JPG, GIF, WebP)
 * @param {number} [retryCount=0] - Current retry attempt (internal use)
 * @returns {Promise<void>}
 */
function loadImageFile(file, retryCount = 0) { ... }
```

## Settings Management

```javascript
/**
 * Loads saved settings from localStorage
 * @returns {boolean} - True if settings were loaded successfully
 */
function loadSettings() { ... }

/**
 * Saves current settings to localStorage
 * @returns {void}
 */
function saveSettings() { ... }

/**
 * Resets all settings to default values
 * @returns {void}
 */
function resetSettings() { ... }
```

## History Management

```javascript
/**
 * Undoes the last action (undo/redo system)
 * @returns {void}
 */
function undo() { ... }

/**
 * Redoes the last undone action
 * @returns {void}
 */
function redo() { ... }
```

## UI Functions

```javascript
/**
 * Displays a toast notification message
 * @param {string} message - Message text to display
 * @param {string} [type='info'] - Toast type: 'info', 'success', 'warning', 'error'
 * @param {number} [duration] - Display duration in milliseconds (auto-selected by type if omitted)
 * @returns {void}
 * @example
 * showToast('File loaded successfully!', 'success');
 * showToast('⚠️ Memory warning', 'warning', 4000);
 */
function showToast(message, type = 'info', duration) { ... }
```

## Memory Functions

```javascript
/**
 * Calculates total memory usage of all loaded textures
 * @returns {number} - Memory usage in megabytes
 */
function calculateMemoryUsage() { ... }

/**
 * Checks memory usage and displays warnings if thresholds exceeded
 * @returns {void}
 */
function checkMemoryUsage() { ... }
```

## Camera Functions

```javascript
/**
 * Centers the camera view on all loaded content
 * @returns {void}
 */
function centerOnContent() { ... }

/**
 * Switches between camera modes (perspective, orthographic, isometric, telephoto)
 * @param {string} mode - Camera mode to activate
 * @returns {void}
 */
function setCameraMode(mode) { ... }
```

## Scene Functions

```javascript
/**
 * Updates the Z-spacing between image planes
 * @param {number} spacing - Distance between planes in world units
 * @returns {void}
 */
function updateZSpacing(spacing) { ... }

/**
 * Reorders the image stack by moving an image from one position to another
 * @param {number} fromIndex - Source index
 * @param {number} toIndex - Destination index
 * @returns {void}
 */
function reorderImages(fromIndex, toIndex) { ... }
```

## Usage

These JSDoc templates should be added directly above their respective functions in src/main.js. This will provide:

1. **IDE Autocomplete**: Better development experience with type hints
2. **Documentation**: Clear parameter/return types for future developers
3. **Examples**: Usage examples for complex functions
4. **Maintainability**: Self-documenting code reduces cognitive load

## Implementation Priority

1. **High Priority**: Export functions (exportPNG, exportJSON, importJSON)
2. **Medium Priority**: Image management (clearAll, deleteImage, loadImageFile)
3. **Low Priority**: Internal helper functions
