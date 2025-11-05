# <!-- this_file: README.md -->
# Vexy Stax JS

Browser-based 3D image stacking visualizer built with Three.js. Load images, position them in 3D space, apply materials, and export high-resolution renders.

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-218%20passing-success)](tests/)
[![Demo](https://img.shields.io/badge/demo-live-success)](https://vexyart.github.io/vexy-stax-js/)

---

## Quick Start

### Try Online
**https://vexyart.github.io/vexy-stax-js/**

### Run Locally
```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # outputs to docs/
npm test             # run all tests
```

---

## What It Does

Creates **3D visualizations of image stacks** with Z-axis depth positioning:

- **Interactive 3D viewer** for layered artwork/designs
- **4 camera modes**: Perspective, Orthographic, Isometric, Telephoto
- **10 material presets**: Matte, glossy, plastic, glass, metal, 3D box
- **Export**: PNG (1x/2x/4x), JSON with embedded images
- **File support**: PNG, JPG, GIF, WebP, SVG (drag-and-drop or browse)

### Core Workflow
```
[Load Images] → [Position in 3D] → [Adjust Materials/Camera] → [Export PNG/JSON]
```

---

## Features

- **Image Management**: Drag-and-drop loading, thumbnail reordering, memory monitoring (warns at 500MB), file validation (50MB max)
- **3D Controls**: Z-spacing (0-500px), camera zoom (0.1x-3.0x), 7 viewpoint presets, background color + transparency, material properties
- **Developer**: Undo/Redo (10 states), keyboard shortcuts, console debug API, FPS monitor, WebGL recovery, settings persistence

---

## Technology

- **Three.js r181**: WebGL 3D rendering with PBR materials
- **Tweakpane 4.0.5**: Parameter controls UI
- **GSAP**: Camera animations
- **Vite 7.1.12**: Dev server + bundler

**Build**: ES modules, 1,143 kB bundle
**Tests**: 218/218 passing, 96%+ coverage on core utilities
**Browser Support**: Chrome 90+, Edge 90+, Firefox 88+, Safari 14+

---

## Development

### Commands
```bash
npm run dev                   # Start dev server
npm run build                 # Build for production
npm run preview               # Preview production build
npm test                      # Run all tests (unit + E2E)
npm run test:unit             # Run unit tests only (218 tests)
npm run test:coverage         # Generate coverage reports
npm run test:coverage:check   # Enforce 80% coverage thresholds
npm run clean                 # Remove build artifacts
npm run help                  # Show all commands
```

### Project Structure
```
src/
├── main.js              # Entry point (3,367 lines)
├── core/                # Core utilities (AppState, EventBus, RenderLoop, constants)
├── camera/              # Camera animation
├── managers/            # Scene/Lighting/Floor managers
├── utils/               # Helpers, logger
└── styles/              # Global CSS

tests/                   # 14 test suites, 218 tests
docs/                    # Production build output
```

### Code Quality
- **Tests**: Node.js test runner with c8 coverage
- **Logging**: 99.3% migrated to structured logger (19 module loggers)
- **Constants**: All 36 exported constants validated
- **Documentation**: Complete JSDoc on core modules
- **Package**: npm-ready with proper entry points

---

## Integration with vexy-stax-py

Python CLI tools for testing and validation:
```bash
pip install vexy-stax
vexy-stax-create-test    # Generate test images
vexy-stax-validate       # Validate exported PNGs
```

Workflow: Python creates test images → Web app visualizes → Python validates exports

---

## API Reference

All functions accessible via `window.vexyStax`:

```javascript
// Export
vexyStax.exportPNG(scale)        // 1x, 2x, or 4x
vexyStax.clearAll()              // Remove all images

// Image info
vexyStax.getImageStack()         // Array of loaded images
vexyStax.getStats()              // Memory, FPS, image count

// Settings
vexyStax.loadSettings()          // Load from localStorage
vexyStax.saveSettings()          // Save to localStorage
vexyStax.resetSettings()         // Reset to defaults

// History
vexyStax.undo()                  // Undo last change
vexyStax.redo()                  // Redo last undone change

// Performance
vexyStax.showFPS(enabled)        // Toggle FPS counter
vexyStax.help()                  // Show all commands
```

See [detailed API documentation](API.md) for complete reference.

---

## Deployment

### GitHub Pages (Automatic)
Push a git tag starting with `v`:
```bash
git tag v0.2.0
git push origin v0.2.0
```

GitHub Action automatically:
1. Updates `package.json` version from tag
2. Runs `npm ci` + `npm run build`
3. Deploys `docs/` folder to GitHub Pages

### Manual Deployment
```bash
npm run build
# Copy docs/ contents to your web server
```

---

## Documentation

- [CHANGELOG.md](CHANGELOG.md) - Release notes and change history
- [TODO.md](TODO.md) - Current tasks and iteration progress
- [PLAN.md](PLAN.md) - Strategic planning and roadmap
- [WORK.md](WORK.md) - Detailed work history

---

## License

Apache License 2.0 - See [LICENSE](LICENSE) file

Copyright 2025 Adam Twardoch / VexyArt

---

## Author

**Adam Twardoch**
[adam+npm@twardoch.com](mailto:adam+npm@twardoch.com)
[https://twardoch.github.io/](https://twardoch.github.io/)

---

**Made with Three.js, tested to exhaustion, documented obsessively.**
