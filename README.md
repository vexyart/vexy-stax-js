# Vexy Stax JS

**Browser-based 3D image stacking visualizer and export tool**

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![GitHub Pages](https://img.shields.io/badge/demo-live-success)](https://vexyart.github.io/vexy-stax-js/)

Vexy Stax JS is a production-ready web application for arranging images along the Z-axis in 3D space. Load your images, position them in 3D, apply materials, and export high-resolution renders.

---

## 🚀 Quick Start

### Try Online
Visit the live demo at **https://vexyart.github.io/vexy-stax-js/**

### Run Locally
```bash
npm install
npm run dev
# Open http://localhost:5173
```

### Build for Production
```bash
npm run build
# Output in docs/ folder, ready for GitHub Pages
```

---

## 📖 Table of Contents

- [What It Does](#what-it-does)
- [How It Works](#how-it-works)
- [Features](#features)
- [Integration with vexy-stax-py](#integration-with-vexy-stax-py)
- [Architecture](#architecture)
- [API Reference](#api-reference)
- [Development](#development)
- [Deployment](#deployment)

---

## What It Does

Vexy Stax JS creates **3D visualizations of image stacks** where multiple images are arranged along the Z-axis (depth). Think of it as:
- **Layered cards** in 3D space (like trading cards displayed with depth)
- **Photo stack viewer** with interactive 3D camera controls
- **Image compositor** with depth-based layering and export

### Use Cases
- Visualize layered designs in 3D (UI mockups, artwork layers)
- Create depth-effect renders from multiple images
- Export high-resolution composites with Z-spacing control
- Interactive presentations of multi-layer artwork

---

## How It Works

### Core Workflow

```
[Load Images] → [Position in 3D] → [Adjust Settings] → [Export PNG/JSON]
```

#### 1. Image Loading
- **Drag & drop** or **browse** for PNG/JPG/GIF/WebP images
- Images are loaded as **Three.js textures** on transparent planes
- Each image becomes a **mesh** in the 3D scene
- Positioned sequentially along Z-axis (configurable spacing)

####  2. 3D Rendering Engine

**Three.js Scene Graph**:
```
Scene
├── Cameras
│   ├── PerspectiveCamera (default, telephoto)
│   └── OrthographicCamera (orthographic, isometric)
├── Lighting
│   ├── AmbientLight (overall illumination)
│   ├── DirectionalLight (main, with shadows)
│   └── DirectionalLight (fill, softer shadows)
└── Image Meshes
    ├── PlaneGeometry (thin materials)
    ├── BoxGeometry (thick materials)
    └── MeshStandardMaterial (PBR rendering)
```

**Rendering Pipeline**:
1. WebGL context initialization with antialiasing + transparency
2. Shadow mapping enabled (PCFSoftShadowMap, 2048×2048)
3. Orbit controls for interactive camera manipulation
4. RequestAnimationFrame loop (60 FPS target)
5. Pixel ratio scaling for high-DPI displays

#### 3. Material System

Uses **PBR (Physically-Based Rendering)** with MeshStandardMaterial:
- `roughness` (0-1): Surface microsurface detail
  - 0 = mirror-like (glossy photo)
  - 1 = completely diffuse (matte print)
- `metalness` (0-1): Conductive material property
  - 0 = dielectric (plastic, paper)
  - 1 = metallic (metal sheet)
- `thickness`: Geometry depth (1 = plane, >1 = box extrusion)
- `borderWidth`: Frame/border around image (pixels)

**Material Presets**:
| Preset | Roughness | Metalness | Thickness | Use Case |
|--------|-----------|-----------|-----------|----------|
| Flat Matte | 1.0 | 0.0 | 1 | Uncoated paper prints |
| Glossy Photo | 0.1 | 0.0 | 1 | Photo paper with sheen |
| Plastic Card | 0.4 | 0.1 | 2 | Trading cards, ID cards |
| Thick Board | 0.9 | 0.0 | 8 | Foamcore, cardboard |
| Metal Sheet | 0.2 | 0.8 | 1 | Aluminum prints |
| Glass Slide | 0.05 | 0.0 | 1 | Transparent slides |
| 3D Box | 0.6 | 0.0 | 15 | Deep physical object |

#### 4. Camera Modes

**Perspective** (default):
- Natural 3D view with depth perspective
- FOV adjustable (15°-120°, default 75°)
- Best for realistic visualization

**Orthographic**:
- Parallel projection (no perspective distortion)
- Front-facing view
- Best for technical drawings, flat layouts

**Isometric**:
- Orthographic at 45° angle
- Classic isometric game view
- Best for showing depth without perspective

**Telephoto**:
- Perspective with narrow FOV (30°)
- Camera positioned far back
- Minimal distortion, "flattened" depth

#### 5. Export System

**PNG Export**:
```javascript
// Rendering pipeline for export
1. Store original pixel ratio
2. Set pixel ratio to scale factor (1x, 2x, 4x)
3. Render one frame at higher resolution
4. Extract canvas data via toDataURL('image/png')
5. Trigger browser download
6. Restore original pixel ratio
```

**Supported resolutions**:
- **1x**: Standard viewport resolution
- **2x**: Double resolution (retina displays)
- **4x**: Quadruple resolution (print quality)

**JSON Export**:
```json
{
  "version": "1.0",
  "params": {
    "zSpacing": 100,
    "bgColor": "#000000",
    "cameraMode": "perspective",
    "cameraFOV": 75,
    "transparentBg": false
  },
  "camera": {
    "position": { "x": 0, "y": 0, "z": 800 }
  },
  "images": [
    {
      "filename": "layer1.png",
      "dataURL": "data:image/png;base64,...",
      "width": 400,
      "height": 300
    }
  ]
}
```

---

## Features

### Image Management
- **Load**: Drag-and-drop or file browser (PNG/JPG/GIF/WebP/SVG)
- **Reorder**: Drag items in list to change Z-stack order
- **Delete**: Remove individual images from stack
- **Memory monitoring**: Warns at 500MB, critical at 1000MB
- **File validation**: Type checking, size limits (50MB max)

### 3D Controls
- **Z-Spacing**: 0-500px distance between layers
- **Camera Zoom**: 0.1x - 3.0x (unified for all modes)
- **Background**: Color picker + transparent background toggle
- **Viewpoint Presets**:
  - Front (0, 0, 800)
  - Top (0, 800, 100)
  - Isometric (500, 500, 500)
  - Side (800, 0, 0)
  - 3D Stack View (400, 300, 600)
  - Center on Content (auto-fit)

### Performance Features
- **FPS Monitor**: Real-time performance tracking (via `vexyStax.showFPS(true)`)
- **WebGL Context Recovery**: Automatic GPU reset handling
- **Debounced Resize**: 150ms delay prevents excessive recalculations
- **Resource Cleanup**: Proper disposal on page unload
- **Retry Logic**: 3 attempts with exponential backoff for texture loading

### Developer Features
- **Undo/Redo**: 10-state history (Ctrl/Cmd+Z, Ctrl/Cmd+Shift+Z)
- **Keyboard Shortcuts**:
  - `?` - Show help
  - `Ctrl/Cmd+E` - Export PNG
  - `Ctrl/Cmd+Z` - Undo
  - `Ctrl/Cmd+Shift+Z` - Redo
  - `Ctrl/Cmd+Delete` - Clear all (with confirmation)
- **Debug API**: Console access to all functions (see [API Reference](#api-reference))
- **Settings Persistence**: localStorage saves preferences

---

## Integration with vexy-stax-py

Vexy Stax JS works standalone but integrates with the **vexy-stax-py** Python CLI for testing and validation:

### Python Tool Capabilities
1. **Generate Test Images**: Create colored layers for testing
   ```bash
   vexy-stax-create-test
   # Creates test-img/layer1.png, layer2.png, layer3.png
   ```

2. **Validate PNG Exports**: Verify exported images
   ```bash
   vexy-stax-validate
   # Checks format, dimensions, content validity
   ```

### Integration Workflow
```
                  ┌─────────────────────────┐
                  │   vexy-stax-create-test  │
                  │  (Python CLI)           │
                  └───────────┬─────────────┘
                              │
                        Creates test images
                              │
                              ▼
┌─────────────────────────────────────────────────┐
│          vexy-stax-js (Web App)                 │
│  1. Load test images                            │
│  2. Arrange in 3D space                         │
│  3. Export PNG renders                          │
└───────────┬─────────────────────────────────────┘
            │
      Exports PNG files
            │
            ▼
┌─────────────────────────────┐
│  vexy-stax-validate         │
│  (Python CLI)               │
│  Validates exported PNGs    │
└─────────────────────────────┘
```

### Why This Architecture?
- **Separation of Concerns**: Web app handles visualization, Python handles validation
- **Cross-Platform Testing**: Browser-independent test image generation
- **Automated QA**: Python can validate exports in CI/CD pipelines
- **Developer Workflow**: Create test assets → visualize → verify output quality

---

## Architecture

### Technology Stack
- **Three.js** (r181): 3D rendering engine
- **Tweakpane** (v4.0.5): Parameter controls UI
- **Vite** (v7.1.12): Dev server + build tool
- **Vanilla JavaScript**: No framework overhead, minimal dependencies

### File Structure
```
vexy-stax-js/
├── src/
│   └── main.js          # 2,400 lines - entire application logic
├── styles/
│   └── main.css         # UI styling for controls and layout
├── index.html           # Single-page app entry point
├── vite.config.js       # Build config (outputs to docs/)
├── package.json         # Dependencies + scripts
├── .github/workflows/   # CI/CD pipelines
│   ├── ci.yml           # Build validation on push/PR
│   └── deploy.yml       # Auto-deploy to GitHub Pages on tag
└── docs/                # Built output (GitHub Pages)
    ├── .nojekyll        # Disables Jekyll processing
    ├── index.html       # Bundled app
    └── assets/          # JS + CSS bundles
```

### Code Organization (main.js)

**Core Systems** (lines 1-232):
- Initialization, capabilities detection
- Scene/camera/renderer setup
- Lighting configuration (ambient + directional)
- Keyboard shortcuts

**State Management** (lines 233-907):
- History (undo/redo) with 10-state stack
- Settings persistence (localStorage)
- Toast notifications
- FPS monitoring

**UI System** (lines 1076-1263):
- Tweakpane controls initialization
- Camera mode switcher
- Material preset buttons
- Export folder (PNG/JSON)

**Image Management** (lines 1518-1883):
- File input + drag-and-drop handling
- Image validation (type, size, dimensions)
- Texture loading with retry logic
- Memory usage checking

**Export System** (lines 1265-1380, 2101-2394):
- PNG export with scale multiplier
- JSON export/import (with embedded base64)
- Clipboard copy/paste

**3D Interaction** (lines 1884-2074):
- Image list UI (with drag-to-reorder)
- Keyboard navigation (arrows, delete, enter)
- Mesh deletion with resource cleanup

### Performance Optimizations

1. **Debounced Window Resize** (line 538):
   - 150ms delay prevents excessive recalculations
   - Clears pending resize before scheduling new one

2. **Memory Management** (lines 731-793):
   - Calculates texture memory (width × height × 4 bytes)
   - Warning at 500MB, critical threshold at 1000MB
   - 30-second cooldown between warnings

3. **WebGL Context Recovery** (lines 563-641):
   - Handles GPU resets gracefully
   - Re-initializes renderer settings
   - Reloads all textures automatically

4. **Resource Cleanup** (lines 480-533):
   - Disposes geometries, materials, textures on unload
   - Prevents memory leaks
   - Forces WebGL context loss

---

## API Reference

### Console Debug API

All functions accessible via `window.vexyStax`:

```javascript
// Export functions
vexyStax.exportPNG(scale)        // Export PNG at 1x, 2x, or 4x
vexyStax.clearAll()              // Remove all images

// Image info
vexyStax.getImageStack()         // Get array of loaded images
vexyStax.getStats()              // Memory, FPS, image count stats

// Settings
vexyStax.loadSettings()          // Load from localStorage
vexyStax.saveSettings()          // Save to localStorage
vexyStax.resetSettings()         // Reset to defaults

// History
vexyStax.undo()                  // Undo last change
vexyStax.redo()                  // Redo last undone change

// Performance
vexyStax.showFPS(enabled)        // Toggle FPS counter (boolean)

// Help
vexyStax.help()                  // Show all available commands
```

### Example Usage
```javascript
// Enable FPS monitor
vexyStax.showFPS(true);

// Export at 2x resolution
vexyStax.exportPNG(2);

// Get current stats
const stats = vexyStax.getStats();
console.log(`${stats.imageCount} images using ${stats.estimatedMemoryMB} MB`);

// Undo last action
vexyStax.undo();
```

---

## Development

### Prerequisites
- Node.js 20+ (for Vite 7)
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Workflow
1. Make changes to `src/main.js` or `styles/main.css`
2. Vite automatically reloads browser
3. Test in browser console using `vexyStax.*` API
4. Build with `npm run build` to verify production output

### Testing
```bash
# The vexy-stax-py package provides validation tools
pip install vexy-stax

# Generate test images
vexy-stax-create-test

# Load test images in web app
# Export PNG from web app

# Validate exported PNG
vexy-stax-validate
```

---

## Deployment

### GitHub Pages (Automatic)

This repository is configured for automatic deployment:

1. **Trigger**: Push a git tag starting with `v` (e.g., `v0.1.0`)
   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

2. **GitHub Action** (`.github/workflows/deploy.yml`):
   - Updates `package.json` version from tag
   - Runs `npm ci` + `npm run build`
   - Deploys `docs/` folder to GitHub Pages

3. **Access**: https://vexyart.github.io/vexy-stax-js/

### Manual Deployment

```bash
# Build
npm run build

# The docs/ folder is now ready for static hosting
# Copy docs/ contents to your web server
```

### Configuration

**GitHub Pages Settings**:
- Source: Deploy from branch
- Branch: `main`
- Folder: `/docs`

**vite.config.js**:
```javascript
export default defineConfig({
  base: '/vexy-stax-js/',  // Match your repo name
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
```

---

## Browser Support

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome 90+ | ✅ Fully supported | Best performance |
| Edge 90+ | ✅ Fully supported | Chromium-based |
| Firefox 88+ | ✅ Fully supported | Good performance |
| Safari 14+ | ✅ Fully supported | macOS + iOS |

**Requirements**:
- WebGL 1.0 support
- FileReader API (for image loading)
- Canvas.toDataURL (for PNG export)
- ES6+ JavaScript (async/await, modules)

**Recommended**:
- 4GB+ RAM (for handling multiple high-res images)
- Dedicated GPU (for smooth 60 FPS rendering)
- 1920×1080+ display (optimal UI layout)

---

## Limitations

- **Maximum images**: ~50 images (performance may degrade beyond this)
- **Maximum image size**: 50MB per file, 4096×4096px recommended
- **Export resolution**: 4x scale max (to prevent memory exhaustion)
- **SVG export**: Not supported (Three.js SVGRenderer doesn't support textures)

---

## Future Enhancements

Potential v2.0 features:
- Animation timeline for Z-spacing/rotation
- Per-image opacity/blending modes
- Custom image alignment (left/right/center)
- Individual rotation per plane
- Video export (via MediaRecorder API)
- WebGL 2.0 with advanced effects

---

## License

ISC License - See [LICENSE](LICENSE) file for details

---

## Author

**Adam Twardoch**
[adam+npm@twardoch.com](mailto:adam+npm@twardoch.com)
[https://twardoch.github.io/](https://twardoch.github.io/)

---

## Related Projects

- **[vexy-stax-py](https://github.com/vexyart/vexy-stax-py)**: Python CLI for test image generation and PNG validation
- Workflow: Python creates test images → Web app visualizes → Python validates exports

---

## Contributing

This is a production tool. For bug reports or feature requests, please open an issue on GitHub.

---

**Made with Three.js and excessive attention to detail.**
