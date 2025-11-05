# <!-- this_file: DEPENDENCIES.md -->
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
- Scene, PerspectiveCamera, OrthographicCamera, WebGLRenderer
- PlaneGeometry and BoxGeometry for image meshes
- TextureLoader for loading image files
- MeshStandardMaterial with PBR (roughness, metalness)
- OrbitControls for camera manipulation
- VSMShadowMap for realistic soft shadows

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

**Key features used:**
- Number sliders (Z-spacing, zoom, FOV, material properties)
- Color picker (background color)
- Buttons (viewpoint presets, export, clear)
- Folders (File/Image/Studio/Camera organization)
- Event listeners (onChange callbacks)

### gsap (^3.13.0)
**Purpose**: Animation library for smooth camera transitions

**Why chosen:**
- Best-in-class JavaScript animation engine
- Smooth easing functions for camera movements
- Promise-based API for async coordination
- Excellent performance (GPU-accelerated when possible)
- Works seamlessly with Three.js camera properties
- Industry standard (used by major studios)

**Key features used:**
- gsap.to() for animating camera position/rotation
- Easing functions (power2.inOut) for natural movement
- Promise returns for animation completion handling
- Timeline support for coordinated animations

### @kitschpatrol/tweakpane-plugin-essentials (^0.2.2-beta.3)
**Purpose**: Extended Tweakpane controls (FPS graph, etc.)

**Why chosen:**
- Adds FPS monitor and performance graphs to Tweakpane
- Consistent UI with main Tweakpane controls
- Lightweight addition for developer tools
- Active maintenance

**Key features used:**
- FPS graph for performance monitoring

### tweakpane-plugin-color-plus (^0.1.8)
**Purpose**: Enhanced color picker for Tweakpane

**Why chosen:**
- Better color picker than default Tweakpane
- Supports alpha channel (transparency)
- Hex, RGB, HSL color spaces
- Live preview of color changes

**Key features used:**
- RGBA color picker with transparency support
- Hex color input for precise values

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
- Production build optimization to docs/ folder
- Asset bundling (CSS, images)

### @playwright/test (^1.56.1)
**Purpose**: End-to-end testing framework

**Why chosen:**
- Modern E2E testing with excellent developer experience
- Cross-browser testing (Chromium, Firefox, WebKit)
- Automatic waiting and retry logic
- Screenshot and video recording
- Trace viewer for debugging failures
- Fast parallel test execution

**Features used:**
- E2E tests for manual QA automation
- Browser automation for testing UI interactions
- Screenshot comparison for visual regression

### c8 (^10.1.3)
**Purpose**: Code coverage reporting for Node.js test runner

**Why chosen:**
- Native V8 coverage (more accurate than Istanbul)
- Works seamlessly with Node.js --test
- Multiple output formats (HTML, text, lcov)
- Configurable thresholds for CI/CD
- Fast and lightweight

**Features used:**
- Coverage reports (HTML for local, lcov for CI)
- Threshold enforcement (80% lines, 80% functions, 75% branches)
- Exclusion patterns (tests, docs, node_modules)

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
