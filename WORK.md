# <!-- this_file: WORK.md -->
# Vexy Stax JS - Work Progress

## Status (2025-12-23)
- **Tests**: 462 unit + 7 E2E pass
- **Build**: 1,212 kB
- **Critical Bugs**: 4/4 FIXED

## Session Update (2025-12-23) - Hero→Beauty Fix

### Bug 4: Hero→Beauty State Restoration ✅
**Problem**: E2E test "Hero→Beauty restores layer depth" failed. Slides stayed collapsed after switching from Hero to Beauty viewpoint.

**Root Causes**:
1. `pane.refresh()` triggered cascading onChange callbacks causing multiple viewpoint calls
2. `cameraController.setViewpointFitToFrame()` overwrote 'hero' preset to 'front'

**Fixes Applied**:
1. Added `_isChangingViewpoint` re-entry guard to all viewpoint methods
2. Don't delegate to cameraController when `skipPresetChange=true`

### Coordinate System Compliance (PLAN.md §1)
Updated all slide positioning to use new formula:
- **Final slide** (highest index) always at **Z=0** (immovable anchor)
- **Other slides** at `z = -(slideCount - 1 - index) * effectiveSpacing`
- **Hero mode** collapses to `z = -(slideCount - 1 - index) * MIN_LAYER_GAP`

**Files Updated**:
- `ViewpointController.#restoreHeroState()` - restore formula
- `SceneComposition.#recalculateLayout()` - layout formula
- `AmbienceManager.updateMaterials()` - temporary positioning
- `ExportManager.#loadTextureWithRetry()` - JSON loading
- `main.js updateZSpacing()` - z-spacing updates
- `FloorManager` - floor Z position = `-stackDepth / 2`

**Tests Updated**:
- `camera_viewpoint_controller.test.js`
- `core_scene_composition.test.js`
- `scene_ambience_manager.test.js`

---

## Previous Session: Architecture Refactoring

### Modules Created

**Phase 1: Foundation (402 tests)**
- `src/core/ServiceContainer.js` - DI container with register/get/disposeAll
- `src/utils/EventTracker.js` - Event listener tracking and cleanup
- `src/Application.js` - Main orchestrator shell

**Phase 2: SceneDirector (416 tests)**
- `src/scene/SceneDirector.js` - Extracts toggleAmbience() and updateBackground()

**Phase 3: ViewpointController (434 tests)**
- `src/camera/ViewpointController.js` - Extracts all viewpoint functions
  - setHeroViewpoint() with proper skipPresetChange option
  - restoreSlideZPositions()
  - setBeautyViewpoint()
  - setViewpointFitToFrame() with skipRestore/skipPresetChange options
  - centerViewOnContent()

**Phase 4: UI Controllers (456 tests)**
- `src/ui/SlidePanelController.js` - Slide thumbnail panel management
- `src/ui/ToolbarController.js` - Toolbar button setup

### Next Steps
1. Wire Application class to orchestrate all managers
2. Replace inline code in main.js with controller calls
3. Move remaining functions to appropriate controllers
4. Reduce main.js to entry point only
