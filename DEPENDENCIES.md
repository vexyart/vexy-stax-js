# Dependencies

## Production Dependencies

### three (^0.181.0)
**Purpose**: 3D rendering engine for WebGL

**Why chosen:**
- Industry standard for WebGL in browsers (>100k GitHub stars)
- Excellent documentation and examples
- Built-in support for textures, geometries, cameras
- Includes useful extras like OrbitControls
- Active maintenance and regular updates
- Perfect for rendering 2D images as textured planes in 3D space

**Key features used:**
- Scene, PerspectiveCamera, WebGLRenderer
- PlaneGeometry for image planes
- TextureLoader for loading image files
- MeshBasicMaterial for simple textured surfaces
- OrbitControls for camera manipulation

### tweakpane (^4.0.5)
**Purpose**: Parameter control panel UI library

**Why chosen:**
- Modern, clean design that doesn't distract
- Zero external dependencies (no jQuery, React, etc.)
- Excellent for real-time parameter adjustment
- Two-way data binding
- Better than dat.GUI (which is deprecated)
- Extensible plugin system
- Active development and maintenance

**Key features needed:**
- Number sliders (for Z-spacing)
- Color picker (for background)
- Buttons (for viewpoint presets, export)
- Folders (for organizing controls)
- Event listeners (for responding to changes)

## Development Dependencies

### vite (^7.1.12)
**Purpose**: Development server and build tool

**Why chosen:**
- Extremely fast dev server with instant HMR
- Simple configuration (often zero-config)
- Native ES modules support (no Webpack complexity)
- Excellent for Three.js projects
- Small bundle sizes in production
- Built-in asset handling (images, CSS)
- Modern and actively maintained

**Features used:**
- Dev server with hot module replacement
- ES6 module resolution
- Production build optimization
- Asset bundling

## Why Not These Alternatives?

### Webpack
- More complex configuration
- Slower dev server than Vite
- Overkill for this simple project

### dat.GUI
- Deprecated in favor of lil-gui
- Dated design
- Less flexible than Tweakpane

### Parcel
- Less control than Vite
- Slightly slower

### Canvas API (without Three.js)
- Would require manual WebGL programming
- Too low-level for this use case
- Three.js provides perfect abstraction

## Version Constraints

All dependencies use caret (^) ranges to allow patch and minor updates:
- Patch updates (bug fixes) applied automatically
- Minor updates (new features) applied automatically
- Major updates (breaking changes) require manual upgrade

This balances stability with security updates.
