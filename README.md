# Vexy Stax JS

Browser-based 3D image stacking visualizer built with Three.js. Load images, position them in 3D space, apply materials, and export high-resolution renders.

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-462%20passing-success)](tests/)
[![Demo](https://img.shields.io/badge/demo-live-success)](https://vexyart.github.io/vexy-stax-js/)

---

## Quick Start

**Online**: https://vexyart.github.io/vexy-stax-js/

**Local**:
```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # outputs to docs/
npm test             # run all tests
```

---

## Features

- **3D Image Stacking**: Position images along Z-axis with adjustable spacing
- **Camera Modes**: Perspective, Orthographic, Isometric, Telephoto
- **Viewpoints**: Beauty (3/4 angle), Hero (front), Top, Side, custom
- **Materials**: Matte, Glossy, Neutral presets
- **Export**: PNG (1x/2x/4x), JSON with embedded images
- **Hero Shot**: Animated camera fly-through with slide collapse

### Camera System

- **Beauty View**: Fits entire floor in viewport from 3/4 angle
- **Hero View**: Front-on view with slides collapsed to minimum spacing
- **Dynamic near plane**: Prevents z-fighting at large camera distances
- **5-slider control**: FOV, Tele, Z (distance), X/Y (pan)

### Scene Composition

- Final slide anchored at Z=0, others at negative Z
- Tallest slide centered at Y=0, all slides bottom-aligned
- Floor positioned 3px below tallest slide
- Auto slide spacing: `tallest_height × 0.6`

---

## Commands

```bash
npm run dev                   # Start dev server
npm run build                 # Build for production
npm test                      # Run all tests (462 unit + 7 E2E)
npm run test:unit             # Unit tests only
npm run test:coverage         # Generate coverage reports
```

---

## Project Structure

```
src/
├── main.js              # Entry point (refactoring in progress)
├── Application.js       # Lifecycle orchestration
├── core/                # AppState, EventBus, RenderLoop, constants
├── camera/              # CameraController, ViewpointController, animation
├── scene/               # SceneManager, FloorManager, AmbienceManager
├── ui/                  # TweakpaneSetup, SlidePanelController
├── export/              # ExportManager (PNG/JSON)
├── files/               # FileHandler, TextureLoader
└── utils/               # helpers, logger

tests/                   # 462 unit tests + 7 E2E tests
docs/                    # Production build output
```

---

## API Reference

```javascript
// Export
vexyStax.exportPNG(scale)        // 1x, 2x, or 4x
vexyStax.clearAll()              // Remove all images

// Camera
vexyStax.setViewpoint(preset)    // 'beauty', 'hero', 'front', etc.

// Settings
vexyStax.loadSettings()
vexyStax.saveSettings()
vexyStax.resetSettings()

// History
vexyStax.undo()
vexyStax.redo()
```

---

## JSON Scene Format

```json
{
  "version": "1.0",
  "params": {
    "zSpacing": 648,
    "bgColor": "#ffffff"
  },
  "settings": {
    "floorColor": "#ececec",
    "floorOpacity": 0.05,
    "material": "neutral",
    "viewpoint": "beauty"
  },
  "camera": {
    "position": { "x": -2299, "y": 1916, "z": 1327 }
  },
  "images": [
    { "filename": "slide1.png", "dataURL": "data:image/png;base64,...", "width": 1920, "height": 1080 }
  ]
}
```

---

## Technical Notes

- **Three.js r181**: WebGL rendering with PBR materials
- **GSAP**: Camera animations
- **Tweakpane 4.0.5**: Parameter controls
- **Build**: ES modules, ~1.2MB bundle
- **Browser**: Chrome 90+, Edge 90+, Firefox 88+, Safari 14+

---

## License

Apache License 2.0

Copyright 2025 Adam Twardoch / VexyArt
