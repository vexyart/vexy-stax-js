# Refactoring Plan for main.js

## Current State Analysis

The `src/main.js` file is **2553 lines** and handles multiple concerns:

1. **Application initialization** (~400 lines)
2. **Camera controls & viewpoints** (~300 lines)
3. **UI management (Tweakpane)** (~200 lines)
4. **Scene management** (~150 lines)
5. **Event handling & cleanup** (~200 lines)
6. **Export/import functionality** (~150 lines)
7. **Debug API** (~200 lines)
8. **Helper functions** (~560 lines)
9. **Settings management** (~150 lines)
10. **History/undo system** (~100 lines)

## Refactoring Goals

**Primary Goal**: Reduce main.js to **<300 lines** by extracting cohesive modules while maintaining all existing functionality.

**Success Criteria**:
- main.js becomes a thin orchestrator (<300 lines)
- All existing tests continue to pass
- No breaking changes to public API
- Improved maintainability and testability
- Clear separation of concerns

## Proposed Module Structure

### 1. **Application** (`src/Application.js`)
**Responsibility**: Main application lifecycle and orchestration
- Overall initialization sequence
- Manager coordination and dependency injection
- Global cleanup and disposal
- Auto-save functionality

**Extracted from main.js**: `init()`, `setupCleanup()`, `setupAutoSave()`, cleanup handlers

**Interface**:
```javascript
export class Application {
    constructor(options)
    async initialize()
    dispose()
    readonly managers // Map of all initialized managers
}
```

### 2. **CameraViewpointManager** (`src/camera/ViewpointManager.js`)
**Responsibility**: Camera positioning and viewpoint management
- Viewpoint presets (hero, beauty, front, etc.)
- Camera mode switching
- Auto-fit calculations
- Viewpoint-specific layout (hero mode slide spacing)

**Extracted from main.js**: All camera positioning functions

**Interface**:
```javascript
export class ViewpointManager {
    constructor(camera, orthoCamera, controls, params, sceneComposition)
    setViewpoint(x, y, z)
    setHeroViewpoint()
    setBeautyViewpoint()
    setViewpointFitToFrame()
    centerViewOnContent()
    switchCameraMode(mode)
    updateZoom(zoom)
    updateCameraOffset(x, y)
}
```

### 3. **UIController** (`src/ui/UIController.js`)
**Responsibility**: UI setup and user interaction coordination
- Tweakpane initialization and binding
- Toolbar button setup
- Canvas accessibility updates
- Toast notifications coordination

**Extracted from main.js**: `setupTweakpane()`, `setupToolbarButtons()`, canvas accessibility

**Interface**:
```javascript
export class UIController {
    constructor(params, callbacks, dependencies)
    setup()
    refresh()
    updateCanvasAriaLabel()
    dispose()
}
```

### 4. **DebugAPI** (`src/debug/DebugAPI.js`)
**Responsibility**: Development and automation API
- Window.vexyStax object
- Console commands and helpers
- Performance monitoring interface
- Development utilities

**Extracted from main.js**: `exposeDebugAPI()`, debug helper functions

**Interface**:
```javascript
export class DebugAPI {
    constructor(dependencies)
    expose()
    hide()
    // All existing vexyStax.* methods
}
```

### 5. **SceneDirector** (`src/scene/SceneDirector.js`)
**Responsibility**: High-level scene coordination
- Scene setup workflow
- Background and lighting coordination
- Floor and ambience coordination
- Image stack lifecycle events

**Extracted from main.js**: Scene setup logic, background updates, ambience coordination

**Interface**:
```javascript
export class SceneDirector {
    constructor(managers, params, eventBus)
    setupScene()
    updateBackground()
    toggleAmbience(intensity)
}
```

### 6. **EventHandler** (`src/core/EventHandler.js`)
**Responsibility**: Centralized event management
- Event listener tracking and cleanup
- DOM event management
- Cross-module event coordination
- Memory-safe event handling

**Extracted from main.js**: `addTrackedEventListener()`, `setupDebouncedResize()`

**Interface**:
```javascript
export class EventHandler {
    constructor()
    addTrackedEventListener(target, event, handler, options)
    setupDebouncedResize(callback)
    dispose()
}
```

## Implementation Strategy

### Phase 1: Foundation (Week 1)
1. **Create Application class** - Extract initialization logic
2. **Create EventHandler class** - Extract event management
3. **Update main.js** - Use new classes, verify functionality

### Phase 2: Camera & UI (Week 2)  
1. **Create ViewpointManager** - Extract all camera logic
2. **Create UIController** - Extract Tweakpane setup
3. **Integrate with Application** - Wire up new dependencies
4. **Test all camera viewpoints and UI elements**

### Phase 3: Scene & Debug (Week 3)
1. **Create SceneDirector** - Extract scene coordination
2. **Create DebugAPI** - Extract debug functionality  
3. **Final integration** - Complete Application wiring
4. **Comprehensive testing** - Verify all features work

### Phase 4: Cleanup & Documentation (Week 4)
1. **Remove dead code** from main.js
2. **Add comprehensive JSDoc** to all new modules
3. **Update tests** to use new module structure
4. **Performance verification** - Ensure no regressions

## Minimal viable main.js (Target Structure)

```javascript
// SPDX-License-Identifier: Apache-2.0
import { Application } from './Application.js';
import { createDependencies } from './dependencies.js';

// Single responsibility: Bootstrap and handoff to Application
async function main() {
    const dependencies = createDependencies();
    const app = new Application(dependencies);
    
    try {
        await app.initialize();
        window.vexyStaxApp = app; // For debugging/automation
        console.log('Vexy Stax initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Vexy Stax:', error);
        app.dispose();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}
```

## Benefits of This Refactoring

1. **Maintainability**: Each module has a single, clear responsibility
2. **Testability**: Smaller, focused modules are easier to unit test
3. **Reusability**: Modules can be reused in different contexts
4. **Developer Experience**: Easier to understand and modify specific features
5. **Performance**: Better tree-shaking and code splitting opportunities
6. **Debugging**: Clearer stack traces and error attribution

## Risk Mitigation

1. **Incremental approach**: Extract one module at a time with full testing
2. **Backward compatibility**: Maintain existing public APIs during transition
3. **Comprehensive testing**: Run full test suite after each extraction
4. **Feature flags**: Ability to switch between old/new implementations during development
5. **Rollback capability**: Keep original code until phase is complete and verified

## Success Metrics

- **main.js line count**: <300 lines (target: ~60 lines)
- **Module count**: 6-8 focused modules
- **Test coverage**: Maintain existing 95%+ coverage
- **Performance**: No regressions in initialization or runtime performance
- **Complexity**: Reduced cyclomatic complexity per module
- **Documentation**: 100% JSDoc coverage for public APIs

## Next Steps

1. **Get stakeholder approval** for this refactoring plan
2. **Create detailed task breakdown** for Phase 1
3. **Set up feature branch** for refactoring work
4. **Begin Phase 1 implementation** with Application and EventHandler classes
5. **Continuous integration** to catch regressions early
