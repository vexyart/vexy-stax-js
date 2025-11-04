# Vexy Stax JS - TODO

## Phase 1: Core 3D Visualization ✅

- [x] Set up Three.js renderer
- [x] Create perspective/orthographic/isometric cameras
- [x] Add OrbitControls
- [x] Implement image loading via file input
- [x] Create image stacking along Z-axis
- [x] Build Tweakpane UI
- [x] Add camera mode controls
- [x] Add Z-spacing slider
- [x] Add background color picker
- [x] Add transparent background toggle

## Phase 2: Animation System ✅

- [x] Add GSAP dependency (^3.13.0)
- [x] Create src/camera/animation.js
- [x] Implement CameraAnimator class
- [x] Implement playHeroShot() method
- [x] Add duration/holdTime/easing parameters
- [x] Integrate with Tweakpane UI
- [x] Add Play button for animation
- [x] Implement ESC key cancellation
- [x] Disable controls during animation
- [x] Add toast notifications
- [x] Expose window.vexyStax.playAnimation()
- [x] Expose window.vexyStax.cancelAnimation()

## Phase 3: Material System ✅

- [x] Implement PBR materials with roughness/metalness
- [x] Add 9 material presets
- [x] Create Materials folder in Tweakpane
- [x] Add roughness slider (0-1)
- [x] Add metalness slider (0-1)
- [x] Add thickness control
- [x] Add border width control
- [x] Add border color picker
- [x] Add preset buttons to UI

## Phase 4: Export/Import System ✅

- [x] Implement JSON export with base64 images
- [x] Add copy to clipboard functionality
- [x] Add download JSON file
- [x] Implement JSON import from clipboard
- [x] Implement JSON import from file
- [x] Implement PNG export (1x, 2x, 3x, 4x)
- [x] Add Export folder to Tweakpane
- [x] Expose window.vexyStax.exportPNG()

## Phase 5: Debug API ✅

- [x] Create window.vexyStax object
- [x] Expose exportPNG(scale)
- [x] Expose clearAll()
- [x] Expose getImageStack()
- [x] Expose undo() / redo()
- [x] Expose showFPS(enabled)
- [x] Expose loadSettings() / saveSettings() / resetSettings()
- [x] Expose getStats()
- [x] Expose playAnimation(config)
- [x] Expose cancelAnimation()
- [x] Expose help()
- [x] Add loadConfig(config) method
- [x] Update help text

## Phase 6: Quality Improvements ✅

- [x] Add loadConfig() API for Python automation
- [x] Fix missing texture property (3 locations)
- [x] Update help text with loadConfig
- [x] Add CSS keyframes for toast animations
- [x] Build successful (3-4s)
- [x] Create PLAN.md
- [x] Create TODO.md (this file)

## Phase 6.5: Code Quality Iteration 4 ✅

- [x] Fix memory leak in undo/redo - add texture disposal
- [x] Add imageStack empty checks to prevent errors
- [x] Standardize error messaging to use showToast consistently

## Phase 6.6: Code Quality Iteration 5 ✅

- [x] Fix event listener memory leak in updateImageList()
- [x] Refactor duplicated image loading logic in cli.py (Python)
- [x] Add error handling for empty folders in cli.py (Python)

## Phase 7: Code Refactoring ⏳

**Goal**: Split main.js (3,321 lines) into 25 modular files
**Plan**: See `REFACTOR_PLAN.md` for comprehensive 11-day refactoring strategy

### Phase 7.1: Preparation (Foundation)
- [ ] Create module directory structure (core/, scene/, camera/, images/, materials/, ui/, export/, utils/, api/)
- [ ] Extract src/core/constants.js (~80 lines)
- [ ] Create src/core/AppState.js (~120 lines) - Singleton state manager
- [ ] Create src/core/EventBus.js (~60 lines) - Module communication
- [ ] Update main.js to import constants
- [ ] Test: Build succeeds, app works

### Phase 7.2: Scene Management
- [ ] Extract src/scene/SceneManager.js (~150 lines) - Scene, renderer, render loop
- [ ] Extract src/scene/LightingManager.js (~100 lines) - Lights, adaptive intensity
- [ ] Extract src/scene/FloorManager.js (~200 lines) - Floor, reflections, ambience
- [ ] Update main.js to use scene managers
- [ ] Test: Scene renders, lights work, ambience works

### Phase 7.3: Camera System
- [ ] Extract src/camera/CameraManager.js (~180 lines) - Camera modes, FOV, zoom
- [ ] Extract src/camera/ViewpointPresets.js (~120 lines) - Viewpoint calculations
- [ ] Extract src/camera/ControlsManager.js (~80 lines) - OrbitControls wrapper
- [ ] Update main.js to use camera managers
- [ ] Test: Camera modes, viewpoints, controls work

### Phase 7.4: Image Management
- [ ] Extract src/images/ImageLoader.js (~180 lines) - File validation, loading
- [ ] Extract src/images/ImageStack.js (~150 lines) - Stack management
- [ ] Extract src/images/DragDropHandler.js (~100 lines) - Drag-and-drop
- [ ] Update main.js
- [ ] Test: Image loading, stack updates, drag-drop works

### Phase 7.5: Materials
- [ ] Extract src/materials/presets.js (~80 lines) - Preset definitions
- [ ] Extract src/materials/MaterialManager.js (~200 lines) - PBR, thickness
- [ ] Extract src/materials/BorderManager.js (~100 lines) - Border generation
- [ ] Update main.js
- [ ] Test: All presets, materials apply correctly

### Phase 7.6: User Interface (Biggest)
- [ ] Extract src/ui/Toast.js (~80 lines) - Toast notifications
- [ ] Extract src/ui/ImageListUI.js (~200 lines) - Image list rendering
- [ ] Extract src/ui/TweakpaneManager.js (~400 lines) - UI initialization
- [ ] Update main.js
- [ ] Test: UI works, controls update, image list works

### Phase 7.7: Export/Import
- [ ] Extract src/export/PNGExporter.js (~120 lines) - PNG export
- [ ] Extract src/export/JSONExporter.js (~250 lines) - JSON import/export
- [ ] Update main.js
- [ ] Test: PNG export, JSON export/import work

### Phase 7.8: Utilities
- [ ] Extract src/utils/helpers.js (~60 lines) - Color, math utilities
- [ ] Extract src/utils/HistoryManager.js (~120 lines) - Undo/redo
- [ ] Extract src/utils/FPSMonitor.js (~100 lines) - FPS tracking
- [ ] Extract src/utils/MemoryTracker.js (~80 lines) - Memory monitoring
- [ ] Update main.js
- [ ] Test: Undo/redo, FPS, memory tracking work

### Phase 7.9: Debug API
- [ ] Extract src/api/DebugAPI.js (~150 lines) - window.vexyStax interface
- [ ] Update main.js
- [ ] Test: window.vexyStax works, Python automation works

### Phase 7.10: Final Cleanup
- [ ] Rewrite main.js as clean entry point (~180 lines)
- [ ] Remove duplicate code
- [ ] Add JSDoc comments to all modules
- [ ] Full integration test of all features
- [ ] Test with Python automation
- [ ] Verify bundle size unchanged or smaller

## Phase 8: Video Export ⏳

- [ ] Research MediaRecorder API
- [ ] Implement canvas.captureStream(60)
- [ ] Create video recording module
- [ ] Add "Record Video" button to UI
- [ ] Test video recording with animation
- [ ] Add codec selection (VP9, H264)
- [ ] Expose window.vexyStax.recordAnimation()
- [ ] Handle browser compatibility

## Build & Deployment 🔄

- [x] Configure Vite for production build
- [x] Set up docs/ directory for GitHub Pages
- [x] Create dev.sh helper script
- [x] Create build.sh helper script
- [ ] Test production build
- [ ] Deploy to GitHub Pages
- [ ] Verify all features work in production

## Documentation ⏳

- [ ] Update README.md if needed
- [ ] Document window.vexyStax API
- [ ] Add code comments for complex sections
- [ ] Create usage examples
- [ ] Document keyboard shortcuts

## Testing ⏳

- [ ] Test with Python automation
- [ ] Test all material presets
- [ ] Test JSON export/import round-trip
- [ ] Test PNG export at all resolutions
- [ ] Test animation system
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Performance testing with many images

## Future Enhancements 📋

- [ ] Keyboard shortcuts (Space = play animation, etc.)
- [ ] Drag-and-drop image reordering
- [ ] Image deletion (remove individual images)
- [ ] Preset saving/loading (custom material presets)
- [ ] Camera position presets
- [ ] Screenshot comparison tools
- [ ] Animation timeline editor
- [ ] Multiple animation sequences

## Phase 6.6: Code Quality Iteration 6 ✅

- [x] Replace alert() with showToast() for better UX in main.js
- [x] Make loadConfig() return promise for reliable completion
- [x] Test all changes and verify build succeeds

## Phase 6.7: Code Quality Iteration 8 ✅

- [x] Replace blocking alert() with showToast() for file loading errors
- [x] Remove blocking confirm() for large file warning
- [x] Test all changes and verify build succeeds

## Phase 6.8: Code Quality Iteration 9 (Current) ⏳

**Goal**: Fix critical bugs and improve resource management

### Task 1: Fix Front Viewpoint Calculation ✅
- [x] Fix setViewpointFitToFrame() to use studio canvas size (1920x1080)
- [x] Previously used slide dimensions (400x300) incorrectly
- [x] Camera now positions to show full studio frame
- [x] Test build succeeds
**Result**: Front viewpoint now correctly fits studio canvas in frame

### Task 2: Remove Studio Frame Visualization + Fix Canvas Sizing ✅
- [x] Remove updateStudioFrame() function that drew blue rectangle in 3D scene
- [x] Remove removeStudioFrame() function
- [x] Remove studioFrame global variable
- [x] Update updateCanvasSize() to resize renderer instead
- [x] Update camera aspect ratio when canvas size changes
- [x] Update reflection resolution for ambience mode
- [x] Test build succeeds (1,141 KB - 5KB smaller!)
**Result**: Studio size now controls actual canvas/renderer dimensions, no visible frame

### Task 3: Fix Flickering/Mirroring Artifacts ✅
- [x] Change slide materials from THREE.DoubleSide to THREE.FrontSide
- [x] Change border materials from THREE.DoubleSide to THREE.FrontSide
- [x] Prevents backface rendering that caused mirroring during camera movement
- [x] Test build succeeds
**Result**: Smooth camera movement without visual artifacts or mirroring

### Task 4: Style Drop Area to Match Tweakpane ✅
- [x] Update drop area colors to match Tweakpane's dark theme
- [x] Use rgba() colors with transparency for consistency
- [x] Reduce border radius from 8px to 2px (matches Tweakpane)
- [x] Update button styling with subtle borders
- [x] Adjust padding and spacing to match Tweakpane controls
- [x] Test build succeeds (CSS: 2.37 kB)
**Result**: Drop area now visually cohesive with Tweakpane UI

### Task 5: Fix Ambience Floor Color Adaptation ✅
- [x] Create getAdaptiveFloorColor() helper function
- [x] Calculate floor color based on background luminance
- [x] Dark backgrounds (< 0.5) → Medium gray floor (0.30)
- [x] Light backgrounds (>= 0.5) → Darker gray floor (0.20)
- [x] Update createFloor() to use adaptive color
- [x] Update updateBackground() to use adaptive color
- [x] Test build succeeds
**Result**: Floor now has proper contrast on both black and white backgrounds

## Phase 6.9: Code Quality Iteration 10 ✅

**Goal**: Fix memory leaks, unsafe array access, and magic numbers

### Task 1: Extract Magic Numbers to Constants ✅
- [x] Create FILE_SIZE constants (maxSizeWarn: 10MB, maxSizeReject: 50MB)
- [x] Create RETRY constants (MAX_RETRIES: 3, RETRY_DELAYS: [500, 1500, 3000])
- [x] Create DIMENSION constants (maxDimension: 4096)
- [x] Move to top of file with other constants
- [x] Replace all hardcoded values in loadImage()
- [x] Test build succeeds
**Result**: Single source of truth, easier maintenance, follows CLAUDE.md guidelines

### Task 2: Fix Unsafe Array Access Patterns ✅
- [x] Add length check before accessing imageStack[imageStack.length - 1] at line 914
- [x] Add length check before accessing imageStack[imageStack.length - 1] at line 2305
- [x] Make check pattern consistent: check length, then access, then check result
- [x] Test with empty image stack (should show proper error, not crash)
**Result**: Consistent validation pattern, prevents undefined access crashes

### Task 3: Add Event Listener Cleanup ✅
- [x] Create eventListeners array to track all registered listeners
- [x] Track listeners in setupKeyboardShortcuts() (window keydown)
- [x] Track listeners in setupDebouncedResize() (window resize)
- [x] Track listeners in setupContextLossRecovery() (canvas events)
- [x] Track listeners in setupFileInput() (fileInput, dropZone)
- [x] Add removeEventListener calls in beforeunload cleanup handler
- [x] Test cleanup happens correctly on page unload/refresh
**Result**: All event listeners properly cleaned up, no memory leaks

### Additional Fix: Full Color Saturation ✅
- [x] Remove emissive properties from ambience materials
- [x] Reduce envMapIntensity from 0.55 to 0.15
- [x] Test slides show full saturation
**Result**: Slides now show true colors without washing out
# <!-- this_file: TODO.md -->
# Vexy Stax JS – TODO

## Phase 0 – Foundation & Safety Nets
- [ ] Phase 0: scaffold `src/core`, `src/scene`, `src/camera`, `src/images`, `src/materials`, `src/ui`, `src/export`, `src/utils`, `src/api`
- [ ] Phase 0: extract constants and shader data into `src/core/constants.js`
- [ ] Phase 0: implement `src/core/AppState.js` singleton with unit tests
- [ ] Phase 0: implement `src/core/EventBus.js` with unit tests
- [ ] Phase 0: add `npm test` script using `node --test` and create baseline tests
- [ ] Phase 0: update `src/main.js` to consume constants/app state/event bus
- [ ] Phase 0: document progress in `WORK.md` and `CHANGELOG.md`

## Phase 1 – Scene & Loop
- [ ] Phase 1: migrate renderer/scene bootstrap into `scene/SceneManager.js`
- [ ] Phase 1: split lighting logic into `scene/LightingManager.js`
- [ ] Phase 1: encapsulate floor/ambience in `scene/FloorManager.js`
- [ ] Phase 1: add tests for luminance/ambient helpers

## Phase 2 – Camera
- [ ] Phase 2: create `camera/CameraManager.js`, `ControlsManager.js`, `ViewpointService.js`
- [ ] Phase 2: port zoom and fit-to-frame calculations, add unit tests

## Phase 3 – Images & Materials
- [ ] Phase 3: implement `images/ImageLoader.js` with retry handling
- [ ] Phase 3: implement `images/ImageStack.js` for mesh lifecycle
- [ ] Phase 3: split material presets/manager and cover with tests

## Phase 4 – UI & Interaction
- [ ] Phase 4: extract Tweakpane wiring into `ui/TweakpaneManager.js`
- [ ] Phase 4: extract image list DOM handling into `ui/ImageListView.js`
- [ ] Phase 4: extract toast system into `ui/Toast.js`
- [ ] Phase 4: centralise tracked event helpers in `utils/dom.js`

## Phase 5 – Export, History, Monitoring, API
- [ ] Phase 5: move undo/redo logic into `utils/HistoryManager.js`
- [ ] Phase 5: move FPS/memory tracking into `utils/Monitoring.js`
- [ ] Phase 5: split PNG/JSON exporters into `export` modules with tests
- [ ] Phase 5: rebuild `api/DebugAPI.js` to wrap public interface

## Phase 6 – Entry Point & Regression
- [ ] Phase 6: shrink `src/main.js` to orchestration only
- [ ] Phase 6: run `npm test` and `npm run build`, capture results
- [ ] Phase 6: update docs (`README.md`, `CHANGELOG.md`, `WORK.md`) and close TODO items
