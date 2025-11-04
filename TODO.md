# <!-- this_file: TODO.md -->
# Vexy Stax JS – TODO

## Workstream A – Modular Refactor
- [ ] Phase 0: Replace inline literals in `main.js` with imports from `core/constants.js`.
- [ ] Phase 0: Route shared objects (scene, cameras, renderer, history, listeners) through `appState`.
- [ ] Phase 0: Integrate `EventBus` placeholders for background, stack, and camera events.
- [x] Phase 0: Extend unit tests to cover constants, AppState flows, and EventBus helpers; record results in `WORK.md`. (2025-11-04)
- [ ] Phase 1: Create `scene/SceneManager.js` and migrate renderer/loop initialisation.
- [ ] Phase 1: Move lighting and floor logic into `scene/LightingManager.js` and `scene/FloorManager.js`.
- [ ] Phase 2: Implement camera managers (`CameraManager`, `ControlsManager`, `ViewpointService`) and port fit-to-frame maths.
- [ ] Phase 3: Introduce `images/ImageLoader.js`, `images/ImageStack.js`, and `materials` modules with unit tests.
- [ ] Phase 4: Extract UI components (`ui/TweakpaneManager.js`, `ui/ImageListView.js`, `ui/Toast.js`) and centralise DOM listener utilities.
- [ ] Phase 5: Split exporters, history, monitoring, and rebuild `api/DebugAPI.js`.
- [ ] Phase 6: Trim `main.js` to orchestration, run full regression (`npm test`, `npm run build`), and document outcomes.

## Workstream B – Layout & UX Overhaul
- [ ] Phase L1: Build flex-based layout with left slide strip, centred studio panel, and right Tweakpane.
- [ ] Phase L1: Ensure studio panel is vertically centred and accounts for fixed side-panel widths.
- [ ] Phase L2: Implement retina-aware studio sizing helpers and hook them into resize/UI flows.
- [ ] Phase L2: Surface UI messaging explaining retina (“logical pixels”) vs device pixels.
- [ ] Phase L3: Redesign slide thumbnails as a minimal docked strip with tooltip metadata on hover/focus.
- [ ] Phase L3: Add auto-scroll behaviour when dragging near strip edges.
- [ ] Phase L4: Promote drag/drop listeners to window scope so files can be dropped anywhere.
- [ ] Phase L4: Enable thumbnail drag reordering with `ImageStack` updates and EventBus notifications.
- [ ] Phase L4: Validate keyboard accessibility for reordering or provide explicit fallback controls.
- [ ] Phase L4: Run manual smoke checks (drop anywhere, reorder, retina clarity) and capture results in `WORK.md`.
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
