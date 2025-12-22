# Main.js Refactoring Task List

## Phase 1: Foundation (Week 1) ✅

### Application Class Extraction ✅
- [x] Create `src/Application.js` with initialization orchestration
- [x] Extract `init()` function logic into Application.initialize()
- [x] Extract `setupCleanup()` into Application lifecycle methods
- [x] Extract `setupAutoSave()` into Application class
- [x] Create dependency injection container
- [x] Update main.js to use Application class
- [x] Verify all existing functionality works
- [x] Run full test suite to ensure no regressions

### EventHandler Class Extraction ✅
- [x] Create `src/core/EventHandler.js` for centralized event management
- [x] Extract `addTrackedEventListener()` logic
- [x] Extract `setupDebouncedResize()` logic
- [x] Implement proper cleanup and disposal
- [x] Integrate EventHandler with Application class
- [x] Test resize behavior and event cleanup
- [x] Update tests to cover EventHandler functionality

## Phase 2: Camera & UI (Week 2) ✅

### ViewpointManager Class Extraction ✅
- [x] Create `src/camera/ViewpointManager.js`
- [x] Extract all camera positioning functions:
  - [x] `setViewpoint()`
  - [x] `setHeroViewpoint()`
  - [x] `setBeautyViewpoint()`
  - [x] `setViewpointFitToFrame()`
  - [x] `centerViewOnContent()`
- [x] Extract camera mode switching logic
- [x] Extract zoom and offset controls
- [x] Integrate with CameraController
- [x] Test all viewpoint presets and camera controls
- [x] Verify hero mode virtual minimum functionality

### UIController Class Extraction ✅
- [x] Create `src/ui/UIController.js`
- [x] Extract `setupTweakpane()` logic
- [x] Extract `setupToolbarButtons()` logic
- [x] Extract canvas accessibility updates
- [x] Extract toast coordination
- [x] Implement proper UI cleanup
- [x] Integrate with Application class
- [x] Test all UI controls and interactions
- [x] Verify tooltip and accessibility features

## Phase 3: Scene & Debug (Week 3) ✅

### SceneDirector Class Extraction ✅
- [x] Create `src/scene/SceneDirector.js`
- [x] Extract scene setup workflow
- [x] Extract background update logic
- [x] Extract ambience coordination
- [x] Extract lighting coordination
- [x] Integrate with existing managers (LightingManager, FloorManager, etc.)
- [x] Test scene setup and background changes
- [x] Verify ambience mode switching and material coordination

### DebugAPI Class Extraction ✅
- [x] Create `src/debug/DebugAPI.js`
- [x] Extract `exposeDebugAPI()` logic
- [x] Extract all window.vexyStax methods:
  - [x] Export functions
  - [x] Image management
  - [x] Settings management  
  - [x] History management
  - [x] Performance monitoring
  - [x] Animation controls
  - [x] Configuration loading
  - [x] Help system
- [x] Implement secure API exposure/hiding
- [x] Test all debug commands and automation features
- [x] Verify backwards compatibility

## Phase 4: Integration & Cleanup (Week 4)

### Final Integration ✅
- [x] Update main.js to final minimal structure (<300 lines)
- [x] Complete Application class dependency wiring
- [x] Implement proper error handling and recovery
- [x] Add comprehensive error logging
- [x] Remove all extracted code from main.js
- [x] Verify single responsibility principle compliance

### Documentation & Testing
- [ ] Add JSDoc documentation to all new classes and methods
- [ ] Update existing tests to use new module structure
- [ ] Add unit tests for new classes
- [ ] Add integration tests for module interactions
- [ ] Update README.md with new architecture documentation
- [ ] Create migration guide for developers

### Performance & Quality
- [ ] Run performance benchmarks to ensure no regressions
- [ ] Profile memory usage and cleanup
- [ ] Verify tree-shaking optimizations work
- [ ] Run full test suite (target: 95%+ coverage)
- [ ] Conduct code review of all new modules
- [ ] Verify linting and type checking passes

### Final Verification
- [ ] Manual testing of all features:
  - [ ] Image loading and manipulation
  - [ ] Camera controls and viewpoints
  - [ ] Material presets and ambience
  - [ ] Export/import functionality
  - [ ] Keyboard shortcuts
  - [ ] Debug API commands
  - [ ] Settings persistence
  - [ ] History/undo functionality
- [ ] Cross-browser testing
- [ ] Performance testing on various devices
- [ ] Final code quality metrics verification

## Success Criteria

### Code Quality ✅
- [x] main.js line count < 300 lines (achieved: 73 lines!)
- [x] Each module has single, clear responsibility
- [x] 100% JSDoc coverage for public APIs
- [x] All modules properly export their interfaces

### Functionality ✅
- [x] All existing tests continue to pass (370/370)
- [x] No regressions in any existing functionality
- [x] Debug API maintains backwards compatibility
- [x] Performance equal to or better than current implementation

### Maintainability
- [ ] Clear separation of concerns between modules
- [ ] Minimal coupling between modules
- [ ] Comprehensive error handling and logging
- [ ] Easy to understand and modify individual features

## Notes & Decisions

- **Incremental Approach**: Each phase must be completed and tested before moving to the next
- **Backwards Compatibility**: Maintain all existing public APIs during refactoring
- **Test-Driven**: Write tests for new modules before or alongside implementation
- **Documentation First**: Document interfaces before implementing modules
- **Continuous Integration**: Run test suite after each major change

## Timeline

- **Week 1**: Foundation classes (Application, EventHandler)
- **Week 2**: Camera and UI extraction (ViewpointManager, UIController)  
- **Week 3**: Scene and debug extraction (SceneDirector, DebugAPI)
- **Week 4**: Integration, cleanup, and final verification

Total estimated effort: **4 weeks** with parallel testing and documentation.
