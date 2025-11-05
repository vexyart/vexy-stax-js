# <!-- this_file: API.md -->
# Vexy Stax JS - API Reference

All functions are accessible via the global `window.vexyStax` object in the browser console.

## Quick Example

```javascript
// Load some images, then:
vexyStax.getImageStack()      // See loaded images
vexyStax.exportPNG(2)         // Export at 2x resolution
vexyStax.showFPS(true)        // Show FPS counter
vexyStax.help()               // Show all commands
```

---

## Export Functions

### `exportPNG(scale)`

Export current scene as PNG image.

**Parameters:**
- `scale` (number, optional): Resolution multiplier. Default: `1`
  - `1` = Native resolution
  - `2` = 2x resolution (double width/height)
  - `4` = 4x resolution (quad width/height)

**Returns:** `void` (triggers download)

**Example:**
```javascript
vexyStax.exportPNG(2)  // Export at 2x resolution
```

---

## Image Management

### `clearAll()`

Remove all loaded images from the scene.

**Returns:** `void`

**Example:**
```javascript
vexyStax.clearAll()
```

### `getImageStack()`

Get information about all loaded images.

**Returns:** `Array<Object>` - Array of image objects with:
- `index` (number): Position in stack (0-based)
- `filename` (string): Original filename
- `width` (number): Image width in pixels
- `height` (number): Image height in pixels
- `position` (Object): 3D position with `x`, `y`, `z` coordinates

**Example:**
```javascript
const images = vexyStax.getImageStack()
console.log(`Loaded ${images.length} images`)
images.forEach(img => {
  console.log(`${img.filename}: ${img.width}x${img.height} at z=${img.position.z}`)
})
```

---

## Settings Management

### `loadSettings()`

Load saved settings from browser localStorage.

**Returns:** `Object|null` - Settings object if found, null otherwise

**Example:**
```javascript
const settings = vexyStax.loadSettings()
if (settings) {
  console.log('Loaded settings:', settings)
}
```

### `saveSettings()`

Save current settings to browser localStorage.

**Returns:** `void`

**Example:**
```javascript
vexyStax.saveSettings()
```

### `resetSettings()`

Reset all settings to default values.

**Returns:** `void`

**Example:**
```javascript
vexyStax.resetSettings()
```

---

## History Management

### `undo()`

Undo last action (up to 10 states).

**Returns:** `void`

**Example:**
```javascript
vexyStax.undo()
```

### `redo()`

Redo previously undone action.

**Returns:** `void`

**Example:**
```javascript
vexyStax.redo()
```

---

## Performance Monitoring

### `showFPS(enabled)`

Toggle FPS (frames per second) display.

**Parameters:**
- `enabled` (boolean): `true` to show FPS counter, `false` to hide

**Returns:** `void`

**Example:**
```javascript
vexyStax.showFPS(true)   // Show FPS counter
vexyStax.showFPS(false)  // Hide FPS counter
```

---

## Stats and Information

### `getStats()`

Get detailed statistics about current scene and performance.

**Returns:** `Object` with:
- `imageCount` (number): Number of loaded images
- `totalPixels` (number): Sum of all image pixels
- `estimatedMemoryMB` (string): Estimated memory usage in MB
- `cameraMode` (string): Current camera mode
- `currentSettings` (Object): Current parameter values
  - `cameraMode`, `cameraFOV`, `cameraZoom`, `bgColor`, `transparentBg`, `zSpacing`
- `performance` (Object): Performance metrics
  - `fpsMonitorEnabled` (boolean): FPS counter visibility
  - `currentFPS` (number|null): Current frames per second
  - `historySize` (string): History position (e.g., "3/10")

**Example:**
```javascript
const stats = vexyStax.getStats()
console.log(`Memory: ${stats.estimatedMemoryMB} MB`)
console.log(`FPS: ${stats.performance.currentFPS}`)
console.log(`Images: ${stats.imageCount}`)
```

---

## Animation

### `playAnimation(config)`

Play camera animation (hero shot: zoom to top slide).

**Parameters:**
- `config` (Object, optional): Animation configuration
  - `duration` (number): Animation duration in seconds. Default: `2`
  - `easing` (string): GSAP easing function. Default: `"power2.inOut"`

**Returns:** `Promise<void>` - Resolves when animation completes

**Example:**
```javascript
// Default animation (2 seconds, power2.inOut)
await vexyStax.playAnimation()

// Custom animation
await vexyStax.playAnimation({
  duration: 3,
  easing: "elastic.out"
})
```

### `cancelAnimation()`

Cancel currently playing animation.

**Returns:** `void`

**Example:**
```javascript
vexyStax.cancelAnimation()
```

---

## JSON Configuration

### `loadConfig(config)`

Load scene configuration from JSON object.

**Parameters:**
- `config` (Object): Configuration object with:
  - `version` (string): Config format version
  - `params` (Object): Scene parameters
    - `zSpacing`, `bgColor`, `cameraMode`, `cameraFOV`, etc.
  - `images` (Array): Image data (base64-encoded)
  - `camera` (Object, optional): Camera position/rotation

**Returns:** `Promise<void>` - Resolves when all images are loaded

**Example:**
```javascript
const config = {
  version: "1.0",
  params: {
    zSpacing: 50,
    bgColor: "#1a1a1a",
    cameraMode: "perspective"
  },
  images: [/* base64 image data */]
}

await vexyStax.loadConfig(config)
```

---

## Help

### `help()`

Print all available API commands to console.

**Returns:** `void`

**Example:**
```javascript
vexyStax.help()
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` | Redo |
| `Ctrl/Cmd + E` | Export PNG (1x) |
| `Ctrl/Cmd + S` | Save settings |
| `F` | Toggle FPS counter |
| `Delete/Backspace` | Delete selected image |

---

## Usage Tips

### Check Memory Usage

```javascript
const stats = vexyStax.getStats()
if (parseFloat(stats.estimatedMemoryMB) > 500) {
  console.warn('High memory usage!')
}
```

### Batch Operations

```javascript
// Save current state before changes
vexyStax.saveSettings()

// Make changes...
// (user manipulates scene)

// Export multiple resolutions
vexyStax.exportPNG(1)
await new Promise(r => setTimeout(r, 1000))  // Wait for download
vexyStax.exportPNG(2)
await new Promise(r => setTimeout(r, 1000))
vexyStax.exportPNG(4)
```

### Monitor Performance

```javascript
vexyStax.showFPS(true)
const checkPerformance = () => {
  const stats = vexyStax.getStats()
  const fps = stats.performance.currentFPS
  if (fps && fps < 30) {
    console.warn(`Low FPS: ${fps}`)
  }
}
setInterval(checkPerformance, 5000)  // Check every 5 seconds
```

---

## Error Handling

All API functions include error logging. Check the browser console for detailed error messages:

```javascript
// Functions log errors automatically
vexyStax.playAnimation()  // Logs error if no images loaded

// For async functions, you can also catch errors:
try {
  await vexyStax.loadConfig(invalidConfig)
} catch (error) {
  console.error('Config load failed:', error)
}
```

---

## Browser Support

- Chrome 90+
- Edge 90+
- Firefox 88+
- Safari 14+

Requires WebGL 2.0 support.

---

## See Also

- [README.md](README.md) - Project overview and quick start
- [CHANGELOG.md](CHANGELOG.md) - Version history and changes
