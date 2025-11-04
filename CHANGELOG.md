# Changelog

## [Unreleased]

### Phase 3: Documentation & Code Quality - 2025-11-05
- **JSDoc annotations** (~300 lines): All constants documented with types, defaults, units, ranges, examples
- **Immutability tests** (+17 tests): Validates Object.freeze() on all constant objects/arrays
- **Memory leak audit**: Confirmed ZERO leaks - all 11 event listeners properly tracked and cleaned up
- **Tests**: 110/110 passing (+17), build: 1,149.47 kB ✅

### UI & Ambient Mode - 2025-11-04
- **Ambient mode fixes**: Removed floor rendering, fixed color washout (removed emissive properties, envMapIntensity 0.55→0.0)
- **UI polish**: Floor transparency 32%→1%, narrower left panel (240px→120px), dark theme (#38383d/#29292e)
- **Tests**: 93/93 passing ✅

### Quality Rounds 1-3 - 2025-11-04
- **Tests added**: Scene managers (8), helpers (20), CameraAnimator (10), error recovery (23) = +61 tests
- **Modules created**: SceneManager, LightingManager, FloorManager (758 lines extracted)
- **Utilities**: src/utils/helpers.js with validation, calculations, cloning
- **Defensive checks**: Added to all manager modules
- **Tests**: 93/93 passing ✅

### Retina & Layout - 2025-11-05
- **Retina sizing**: src/core/studioSizing.js handles DPR-aware rendering
- **3-column layout**: Thumbnail strip left, studio center, Tweakpane right
- **Drag/drop**: Global window-level file drop support
- **Tests**: 32/32 passing ✅

### Code Foundation - 2025-11-04
- **Constants**: Extracted lighting/floor/retry config to src/core/constants.js
- **EventBus**: Added EVENTS registry with emit helpers for background/stack/camera changes
- **SharedState**: src/core/sharedState.js for singleton references (scene, cameras, renderer, etc.)
- **Tests**: 24/24 passing ✅

### Camera & Export - 2025-11-04
- **Camera modes**: Perspective, Orthographic, Isometric, Telephoto with FOV/zoom/distance controls
- **Viewpoints**: 7 presets (Beauty, Center, Front, Top, Isometric, 3D Stack, Side)
- **Front viewpoint fix**: Now uses canvas dimensions (not slide size) for correct framing
- **Export**: PNG 1x/2x/4x, transparent background, JSON save/load, clipboard copy/paste
- **Ambience**: Soft reflections (custom shader), VSM shadows, PMREM environment, adaptive floor color

### UI Organization - 2025-11-04
- **Tweakpane structure**: Tabbed interface (File/Image/Video), separate Studio/Camera folders
- **Image management**: Drag/drop, multi-file, thumbnail list, reordering, individual delete
- **Controls**: Compact layout with collapsed folders

### Initial Release - 2025-11-04
- **Core**: Three.js r181, Tweakpane 4.0.5, Vite 7.1.12
- **Scene**: WebGL renderer, OrbitControls, material presets (10 variants)
- **Images**: Multi-file loading, auto-scaling, Z-stack positioning
- **Build**: 1,141-1,149 kB bundle, ES modules

## Technical Notes
- **Test framework**: Node.js built-in test runner
- **Build tool**: Vite with ES modules
- **WebGL**: Context loss recovery, alpha channel, high-DPI support
- **Memory**: Event listener tracking, resource cleanup on beforeunload
- **Architecture**: ES6 classes, modular structure, EventBus communication
