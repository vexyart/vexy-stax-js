# <!-- this_file: WORK.md -->
# Vexy Stax JS - Work Progress

## Status (2025-12-23)
- **Tests**: 456 unit pass
- **Build**: 1,195 kB
- **Critical Bugs**: 3/3 FIXED

## Session Update (2025-12-23) - Architecture Refactoring

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

### Current State
- **main.js**: 2,590 lines (target: <100 lines)
- **New modules**: 7 classes created with full test coverage
- **Integration pending**: Modules exist but main.js not yet wired to use them

### Next Steps
1. Wire Application class to orchestrate all managers
2. Replace inline code in main.js with controller calls
3. Move remaining functions to appropriate controllers
4. Reduce main.js to entry point only

---

## Previous Session: Bug Fixes (2025-12-23)

### Bug 3: Stale Build ✅
- Rebuilt `docs/` folder with `npm run build`

### Bug 2: Hero View Z-Spacing ✅
- Added `{ skipRestore: true, skipPresetChange: true }` to setViewpointFitToFrame()
- Hero mode now preserves collapsed state

### Bug 1: Floor/Slide Layout ✅
- Verified correct callback chain: SceneComposition → onLayoutChanged → FloorManager.setPositionY()
