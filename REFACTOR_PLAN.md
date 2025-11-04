# Vexy Stax JS - Refactoring Plan

**One-sentence scope**: Refactor 3,321-line monolithic main.js into modular ES6 architecture following Single Responsibility Principle while preserving all functionality.

---

## Problem Analysis

### Current State
- **File**: `src/main.js` (3,321 lines)
- **Functions**: 66+ functions and constants
- **Issues**:
  - Difficult to navigate and understand
  - High cognitive load for changes
  - Testing is complicated
  - Multiple concerns mixed together
  - Hard to onboard new developers
  - Complexity detection triggers violated (files > 200 lines)

### Why Refactor Now
1. **CLAUDE.md compliance**: Files longer than 200 lines trigger complexity detection
2. **Maintainability**: Current structure makes changes risky
3. **Testing**: Impossible to unit test individual components
4. **Collaboration**: Single file creates merge conflicts
5. **Performance**: Cannot optimize individual modules
6. **Future features**: Video export and advanced features need clean architecture

---

## Research Findings

### Best Practices (from Perplexity, Tavily, Exa)

1. **Segment by Responsibility**: Each module should encapsulate a single concept (SRP)
2. **ES6 Modules**: Use explicit `import`/`export`, avoid global scope pollution
3. **Class-Based Encapsulation**: Use classes for Three.js objects (extend THREE.Object3D)
4. **Organize by Feature**: Group by features (camera, scene, ui) not types (all models together)
5. **Central State Management**: Singleton app state for shared references
6. **Dependency Injection**: Pass dependencies explicitly, not via global imports
7. **Avoid Circular Dependencies**: Design interfaces carefully
8. **Single Animation Loop**: One main loop that delegates to modules

### Three.js-Specific Patterns

- Centralized scene manager for object additions/removals
- Single render loop with updatable object registration
- Clear ownership of Three.js resources (who creates, who disposes)
- Explicit material/texture/geometry disposal
- Reflector and lighting managed separately

---

## Proposed Module Architecture

```
src/
├── main.js (150-200 lines)           # Entry point, app initialization
├── core/
│   ├── AppState.js                   # Central state singleton
│   ├── constants.js                  # All magic numbers and configs
│   └── EventBus.js                   # Event system for module communication
├── scene/
│   ├── SceneManager.js               # Scene, renderer setup and lifecycle
│   ├── LightingManager.js            # Ambient, main, fill lights
│   └── FloorManager.js               # Floor plane, reflections, ambience
├── camera/
│   ├── animation.js ✅               # Already extracted (CameraAnimator)
│   ├── CameraManager.js              # Camera modes (perspective/ortho/iso)
│   ├── ViewpointPresets.js           # Viewpoint calculations
│   └── ControlsManager.js            # OrbitControls wrapper
├── images/
│   ├── ImageLoader.js                # File validation, loading, TextureLoader
│   ├── ImageStack.js                 # Stack management, positioning
│   └── DragDropHandler.js            # Drag-and-drop file handling
├── materials/
│   ├── presets.js                    # Material preset definitions (const)
│   ├── MaterialManager.js            # Material application, PBR settings
│   └── BorderManager.js              # Border generation for thick cards
├── ui/
│   ├── TweakpaneManager.js           # Tweakpane initialization and layout
│   ├── ImageListUI.js                # Image list rendering and interaction
│   └── Toast.js                      # Toast notification system
├── export/
│   ├── PNGExporter.js                # Canvas-based PNG export
│   └── JSONExporter.js               # JSON import/export with base64
├── utils/
│   ├── HistoryManager.js             # Undo/redo with proper disposal
│   ├── FPSMonitor.js                 # FPS tracking and display
│   ├── MemoryTracker.js              # Memory usage monitoring
│   └── helpers.js                    # Color utils, calculations
└── api/
    └── DebugAPI.js                   # window.vexyStax interface
```

**Total Files**: 25 modules (vs 1 monolith)
**Target Lines Per File**: 50-200 lines each

---

## Detailed Module Breakdown

### Phase 1: Foundation (Core & Constants)

#### 1.1 Extract Constants
**File**: `src/core/constants.js` (~80 lines)

```javascript
// All magic numbers and configuration
export const MAX_HISTORY = 10;
export const FPS_WARNING_THRESHOLD = 30;
export const MEMORY_WARNING_THRESHOLD_MB = 500;
export const MEMORY_CRITICAL_THRESHOLD_MB = 1000;
export const FLOOR_Y = -250;
export const FLOOR_SIZE = 2000;
export const REFLECTION_TEXTURE_BASE = 0.65;
// ... all constants

export const SoftReflectorShader = { /* shader definition */ };
export const MATERIAL_PRESETS = { /* all presets */ };
export const VIEWPOINT_PRESETS = { /* all presets */ };
```

**Extract from**: main.js lines 30-160

#### 1.2 Create AppState
**File**: `src/core/AppState.js` (~120 lines)

```javascript
// Central singleton for shared state
class AppState {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.orthoCamera = null;
        this.renderer = null;
        this.controls = null;
        this.cameraAnimator = null;
        this.imageStack = [];
        this.params = { /* params object */ };
    }

    // Getters/setters with validation
    getScene() { return this.scene; }
    setScene(scene) { this.scene = scene; }
    // ... etc
}

export const appState = new AppState(); // Singleton instance
```

**Purpose**:
- Single source of truth for global state
- Dependency injection target
- Avoids circular dependencies

#### 1.3 Create EventBus
**File**: `src/core/EventBus.js` (~60 lines)

```javascript
// Simple event system for module communication
class EventBus {
    constructor() {
        this.listeners = new Map();
    }

    on(event, callback) { /* subscribe */ }
    off(event, callback) { /* unsubscribe */ }
    emit(event, data) { /* notify */ }
}

export const eventBus = new EventBus();
```

**Events**:
- `background:changed`
- `ambience:toggled`
- `image:added`, `image:removed`
- `camera:moved`
- `material:changed`

**Why**: Decouple modules that need to react to changes

---

### Phase 2: Scene Management

#### 2.1 SceneManager
**File**: `src/scene/SceneManager.js` (~150 lines)

**Responsibilities**:
- Create Three.js scene
- Initialize WebGLRenderer
- Set up canvas
- Manage render loop
- Handle window resize
- Context loss recovery
- Resource cleanup

**API**:
```javascript
export class SceneManager {
    constructor(appState)
    init()
    render()
    resize()
    dispose()
    addObject(mesh)
    removeObject(mesh)
}
```

**Extract from**: main.js lines 165-280, 2984-3010

#### 2.2 LightingManager
**File**: `src/scene/LightingManager.js` (~100 lines)

**Responsibilities**:
- Create ambient, main, fill lights
- Calculate adaptive lighting based on background luminance
- Update emissive intensity
- Manage environment texture (RoomEnvironment)

**API**:
```javascript
export class LightingManager {
    constructor(scene, params)
    setup()
    update()
    updateForBackground(bgColor)
    dispose()
}
```

**Extract from**: main.js lines 362-460

#### 2.3 FloorManager
**File**: `src/scene/FloorManager.js` (~200 lines)

**Responsibilities**:
- Create floor plane
- Set up Reflector with SoftReflectorShader
- Calculate adaptive floor color
- Update reflection resolution
- Toggle ambience on/off

**API**:
```javascript
export class FloorManager {
    constructor(scene, params)
    create()
    remove()
    updateColor(bgColor)
    updateReflectionSettings()
    dispose()
}
```

**Extract from**: main.js lines 476-612

---

### Phase 3: Camera System

#### 3.1 CameraManager
**File**: `src/camera/CameraManager.js` (~180 lines)

**Responsibilities**:
- Create perspective/orthographic cameras
- Switch camera modes (perspective/ortho/iso)
- Handle FOV changes
- Handle zoom changes
- Fit camera to content

**API**:
```javascript
export class CameraManager {
    constructor(scene, renderer, params)
    init()
    switchMode(mode)
    updateFOV(fov)
    updateZoom(zoom)
    fitToContent()
    getActiveCamera()
}
```

**Extract from**: main.js lines 1746-1857, 1893-1934

#### 3.2 ViewpointPresets
**File**: `src/camera/ViewpointPresets.js` (~120 lines)

**Responsibilities**:
- Calculate viewpoint positions
- Apply viewpoint presets (Beauty, Front, Top, etc.)
- Fit-to-frame calculation

**API**:
```javascript
export class ViewpointPresets {
    constructor(cameraManager, imageStack, params)
    setViewpoint(x, y, z)
    applyPreset(presetName)
    fitToFrame()
}
```

**Extract from**: main.js lines 2283-2350

#### 3.3 ControlsManager
**File**: `src/camera/ControlsManager.js` (~80 lines)

**Responsibilities**:
- Initialize OrbitControls
- Enable/disable controls (during animation)
- Update controls on camera change

**API**:
```javascript
export class ControlsManager {
    constructor(camera, canvas)
    init()
    enable()
    disable()
    update()
    dispose()
}
```

**Extract from**: main.js lines 235-250 (scattered)

---

### Phase 4: Image Management

#### 4.1 ImageLoader
**File**: `src/images/ImageLoader.js` (~180 lines)

**Responsibilities**:
- Validate image files (size, dimensions, type)
- Load textures with TextureLoader
- Retry logic (3 attempts)
- Memory checks before loading

**API**:
```javascript
export class ImageLoader {
    constructor()
    validateFile(file)
    loadTexture(file)
    loadFromDataURL(dataURL)
    checkMemoryBefore(fileSize)
}
```

**Extract from**: main.js lines 2422-2645

#### 4.2 ImageStack
**File**: `src/images/ImageStack.js` (~150 lines)

**Responsibilities**:
- Manage imageStack array
- Add images to stack
- Remove images from stack
- Update Z-spacing
- Apply materials to images
- Dispose resources

**API**:
```javascript
export class ImageStack {
    constructor(scene, params, materialManager)
    add(texture, filename, width, height)
    remove(index)
    clear()
    updateZSpacing(spacing)
    updateMaterials()
    get stack() { return this._stack; }
}
```

**Extract from**: main.js lines 2646-2780, 2203-2270

#### 4.3 DragDropHandler
**File**: `src/images/DragDropHandler.js` (~100 lines)

**Responsibilities**:
- Handle file drop events
- Validate dropped files
- Queue files for loading

**API**:
```javascript
export class DragDropHandler {
    constructor(imageLoader, imageStack)
    init()
    handleDrop(files)
    dispose()
}
```

**Extract from**: main.js lines 2392-2421

---

### Phase 5: Materials

#### 5.1 Material Presets
**File**: `src/materials/presets.js` (~80 lines)

**Responsibilities**:
- Define all material presets (const data)

```javascript
export const MATERIAL_PRESETS = {
    'flat-matte': { roughness: 1.0, metalness: 0, ... },
    // ... all 9 presets
};
```

**Extract from**: main.js lines 153-160

#### 5.2 MaterialManager
**File**: `src/materials/MaterialManager.js` (~200 lines)

**Responsibilities**:
- Apply materials to meshes
- Handle PBR parameters (roughness, metalness)
- Handle thickness (via ExtrudeGeometry)
- Apply borders
- Update all images when preset changes

**API**:
```javascript
export class MaterialManager {
    constructor(params, imageStack)
    applyMaterial(mesh, texture)
    applyPreset(presetName)
    updateRoughness(value)
    updateMetalness(value)
    updateThickness(value)
    updateBorder(width, color)
}
```

**Extract from**: main.js lines 2476-2561

#### 5.3 BorderManager
**File**: `src/materials/BorderManager.js` (~100 lines)

**Responsibilities**:
- Generate border geometry
- Apply border material
- Update borders dynamically

**API**:
```javascript
export class BorderManager {
    constructor()
    createBorder(width, height, borderWidth, color)
    updateBorder(mesh, width, color)
    removeBorder(mesh)
}
```

**Extract from**: main.js (part of material application logic)

---

### Phase 6: User Interface

#### 6.1 TweakpaneManager
**File**: `src/ui/TweakpaneManager.js` (~400 lines)

**Responsibilities**:
- Initialize Tweakpane
- Create all folders (Studio, Camera, Slides, File/Image/Video tabs)
- Bind params to UI controls
- Handle UI events
- Refresh UI

**API**:
```javascript
export class TweakpaneManager {
    constructor(params, handlers)
    init()
    refresh()
    dispose()

    // Private methods for folder creation
    _createStudioFolder()
    _createCameraFolder()
    _createSlidesFolder()
    _createTabs()
}
```

**Extract from**: main.js lines 1139-1740

#### 6.2 ImageListUI
**File**: `src/ui/ImageListUI.js` (~200 lines)

**Responsibilities**:
- Render image list in #image-list
- Handle drag-and-drop reordering
- Handle keyboard navigation (Arrow keys, Delete)
- Update list when stack changes

**API**:
```javascript
export class ImageListUI {
    constructor(imageStack, eventBus)
    render()
    handleDragStart(e)
    handleDragOver(e)
    handleDrop(e)
    handleKeydown(e)
    dispose()
}
```

**Extract from**: main.js lines 2781-2982

#### 6.3 Toast
**File**: `src/ui/Toast.js` (~80 lines)

**Responsibilities**:
- Show toast notifications
- Auto-dismiss after duration
- Support types: info, success, warning, error
- Queue multiple toasts

**API**:
```javascript
export class Toast {
    show(message, type = 'info', duration = 3000)
    hide()
}
```

**Extract from**: main.js lines 1067-1136

---

### Phase 7: Export/Import

#### 7.1 PNGExporter
**File**: `src/export/PNGExporter.js` (~120 lines)

**Responsibilities**:
- Render scene to canvas at specified scale
- Convert canvas to PNG blob
- Download PNG file
- Restore original render state

**API**:
```javascript
export class PNGExporter {
    constructor(renderer, scene, cameraManager, params)
    export(scale = 1)
    _renderAtScale(scale)
    _downloadBlob(blob, filename)
}
```

**Extract from**: main.js lines 1481-1598

#### 7.2 JSONExporter
**File**: `src/export/JSONExporter.js` (~250 lines)

**Responsibilities**:
- Export config with embedded base64 images
- Import config from JSON
- Copy/paste clipboard operations
- Restore full application state

**API**:
```javascript
export class JSONExporter {
    constructor(appState, imageStack, imageLoader)
    export()
    import(file)
    copyToClipboard()
    pasteFromClipboard()
    _embedImages()
    _restoreState(config)
}
```

**Extract from**: main.js lines 3011-3318

---

### Phase 8: Utilities

#### 8.1 HistoryManager
**File**: `src/utils/HistoryManager.js` (~120 lines)

**Responsibilities**:
- Save history snapshots
- Undo/redo operations
- Proper resource disposal

**API**:
```javascript
export class HistoryManager {
    constructor(imageStack, appState, maxHistory = 10)
    save()
    undo()
    redo()
    canUndo()
    canRedo()
    clear()
}
```

**Extract from**: main.js lines 949-1066

#### 8.2 FPSMonitor
**File**: `src/utils/FPSMonitor.js` (~100 lines)

**Responsibilities**:
- Track FPS
- Display FPS counter
- Warning on low FPS

**API**:
```javascript
export class FPSMonitor {
    constructor()
    update()
    show()
    hide()
    getFPS()
}
```

**Extract from**: main.js lines 859-925

#### 8.3 MemoryTracker
**File**: `src/utils/MemoryTracker.js` (~80 lines)

**Responsibilities**:
- Calculate memory usage
- Show warnings on threshold
- Track texture memory

**API**:
```javascript
export class MemoryTracker {
    constructor()
    calculateUsage()
    check(isAdding = false)
    getStats()
}
```

**Extract from**: main.js lines 927-1000

#### 8.4 Helpers
**File**: `src/utils/helpers.js` (~60 lines)

**Responsibilities**:
- Color calculations (luminance)
- Math helpers
- Validation utilities

```javascript
export function calculateLuminance(hexColor)
export function getAdaptiveAmbientIntensity(luminance)
export function getAdaptiveEmissiveIntensity(luminance)
export function getAdaptiveFloorColor(bgColor)
```

**Extract from**: main.js lines 355-515

---

### Phase 9: Debug API

#### 9.1 DebugAPI
**File**: `src/api/DebugAPI.js` (~150 lines)

**Responsibilities**:
- Expose window.vexyStax interface
- Wrap manager methods for Python automation
- Provide help() documentation

**API**:
```javascript
export class DebugAPI {
    constructor(managers)
    expose()

    // Exposes:
    // window.vexyStax.exportPNG(scale)
    // window.vexyStax.loadConfig(config)
    // window.vexyStax.playAnimation(config)
    // window.vexyStax.getStats()
    // ... etc
}
```

**Extract from**: main.js lines 496-857

---

### Phase 10: New main.js

**File**: `src/main.js` (~180 lines)

**Responsibilities**:
- Import all managers
- Initialize app in correct order
- Set up animation loop
- Handle cleanup

```javascript
// Imports
import { appState } from './core/AppState.js';
import { eventBus } from './core/EventBus.js';
import { SceneManager } from './scene/SceneManager.js';
// ... all imports

// Initialize managers
const sceneManager = new SceneManager(appState);
const lightingManager = new LightingManager(appState.scene, appState.params);
const cameraManager = new CameraManager(appState.scene, appState.renderer, appState.params);
// ... etc

// Init sequence
async function init() {
    sceneManager.init();
    lightingManager.setup();
    cameraManager.init();
    // ... all setup

    // Setup animation loop
    function animate() {
        requestAnimationFrame(animate);
        sceneManager.render();
        fpsMonitor.update();
    }
    animate();

    // Expose API
    debugAPI.expose();
}

// Start on DOM ready
document.addEventListener('DOMContentLoaded', init);
```

**Structure**:
1. Imports (30 lines)
2. Manager initialization (50 lines)
3. Init function (60 lines)
4. Animation loop (20 lines)
5. Cleanup (20 lines)

---

## Refactoring Strategy

### Phase-by-Phase Approach

Each phase is a separate commit that:
1. Keeps the app working
2. Can be tested independently
3. Can be rolled back if needed

### Phase 1: Preparation (Day 1)
- [ ] Create module directory structure
- [ ] Extract constants.js
- [ ] Create AppState.js
- [ ] Create EventBus.js
- [ ] Update main.js to import constants
- [ ] **Test**: Build succeeds, app works

### Phase 2: Scene (Day 2)
- [ ] Extract SceneManager.js
- [ ] Extract LightingManager.js
- [ ] Extract FloorManager.js
- [ ] Update main.js to use managers
- [ ] **Test**: Scene renders, lights work, ambience works

### Phase 3: Camera (Day 3)
- [ ] Extract CameraManager.js
- [ ] Extract ViewpointPresets.js
- [ ] Extract ControlsManager.js
- [ ] Update main.js to use camera managers
- [ ] **Test**: Camera modes work, viewpoints work, controls work

### Phase 4: Images (Day 4)
- [ ] Extract ImageLoader.js
- [ ] Extract ImageStack.js
- [ ] Extract DragDropHandler.js
- [ ] Update main.js
- [ ] **Test**: Image loading works, stack updates, drag-drop works

### Phase 5: Materials (Day 5)
- [ ] Extract presets.js
- [ ] Extract MaterialManager.js
- [ ] Extract BorderManager.js
- [ ] Update main.js
- [ ] **Test**: All presets work, materials apply correctly

### Phase 6: UI (Day 6-7)
- [ ] Extract Toast.js
- [ ] Extract ImageListUI.js
- [ ] Extract TweakpaneManager.js (big one)
- [ ] Update main.js
- [ ] **Test**: UI works, controls update params, image list works

### Phase 7: Export (Day 8)
- [ ] Extract PNGExporter.js
- [ ] Extract JSONExporter.js
- [ ] Update main.js
- [ ] **Test**: PNG export works, JSON export/import works

### Phase 8: Utils (Day 9)
- [ ] Extract helpers.js
- [ ] Extract HistoryManager.js
- [ ] Extract FPSMonitor.js
- [ ] Extract MemoryTracker.js
- [ ] Update main.js
- [ ] **Test**: Undo/redo works, FPS displays, memory tracking works

### Phase 9: API (Day 10)
- [ ] Extract DebugAPI.js
- [ ] Update main.js
- [ ] **Test**: window.vexyStax works, Python automation works

### Phase 10: Final Cleanup (Day 11)
- [ ] Rewrite main.js to be clean entry point
- [ ] Remove all duplicate code
- [ ] Add JSDoc comments to all modules
- [ ] **Test**: Full integration test of all features

---

## Testing Strategy

### Per-Phase Testing

After each phase extraction:

1. **Build Test**: `npm run build` succeeds
2. **Manual Test**: Open app, test affected features
3. **Python Test**: Run Python automation if API affected
4. **Console Check**: No errors or warnings

### Full Integration Testing

After all phases complete:

1. **Image Loading**: Load images via file input, drag-drop
2. **Stack Management**: Add, remove, reorder images
3. **Materials**: Test all 9 presets, adjust parameters
4. **Camera**: Test all modes, viewpoints
5. **Ambience**: Toggle on/off, test on black/white backgrounds
6. **Animation**: Play hero shot, cancel with ESC
7. **Export**: PNG at 1x/2x/4x, JSON export/import
8. **Undo/Redo**: Test history works
9. **API**: Test all window.vexyStax methods
10. **Python**: Run full Python automation suite

### Success Criteria

- ✅ All features work identically to before refactor
- ✅ Build size unchanged or smaller
- ✅ No new console errors
- ✅ main.js < 200 lines
- ✅ All modules < 250 lines
- ✅ Python automation works unchanged
- ✅ FPS unchanged or improved

---

## Constraints & Risks

### Constraints

1. **API Compatibility**: window.vexyStax must remain unchanged (Python depends on it)
2. **Behavior Preservation**: App must work identically after refactor
3. **No New Dependencies**: Use only existing packages
4. **Build System**: Must work with existing Vite config

### Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Circular dependencies | High | Use AppState singleton, EventBus, careful import order |
| Resource disposal bugs | High | Test memory after each phase, use Chrome DevTools |
| Animation loop breaks | High | Keep single RAF loop in main.js |
| Tweakpane binding breaks | Medium | Test UI thoroughly after Phase 6 |
| Python automation breaks | High | Test after Phase 9, don't change API signatures |

---

## Alternative Approaches Considered

### Approach 1: Big Bang Refactor ❌
- Rewrite entire codebase at once
- **Rejected**: Too risky, hard to debug

### Approach 2: Extract UI First ❌
- Start with TweakpaneManager
- **Rejected**: Too dependent on other components

### Approach 3: Feature Flags ❌
- Use flags to toggle old vs new code
- **Rejected**: Adds complexity, harder to test

### Chosen Approach: Bottom-Up, Phase-by-Phase ✅
- Start with foundation (constants, state)
- Build up through layers (scene → camera → images → ui)
- Each phase independently testable
- Can roll back any phase if needed

---

## Dependencies

No new packages needed. Using existing:
- `three` (^0.181.0) - 3D rendering
- `gsap` (^3.13.0) - Animation
- `tweakpane` (^4.0.5) - UI
- `vite` (^7.1.12) - Build tool

---

## Success Metrics

### Code Quality
- ✅ main.js: 3,321 lines → ~180 lines (94% reduction)
- ✅ Longest module: < 250 lines
- ✅ Average module: 80-150 lines
- ✅ Functions per module: 5-15
- ✅ Circular dependencies: 0

### Maintainability
- ✅ Find any feature: <10 seconds
- ✅ Change a feature: Touch 1-2 files (not 1 monolith)
- ✅ Add new feature: Clear module to extend

### Performance
- ✅ Build time: Unchanged or faster
- ✅ Bundle size: Unchanged or smaller (tree-shaking)
- ✅ Runtime FPS: Unchanged or improved

### Testing
- ✅ Unit testable: Each module can be tested independently
- ✅ Integration testable: Managers compose cleanly
- ✅ No regression: All features work identically

---

## Future Benefits

After refactoring:

1. **Video Export**: Clean place to add (new export/VideoExporter.js)
2. **Testing**: Can add unit tests per module
3. **Performance**: Can optimize individual modules
4. **Features**: Easy to add without touching unrelated code
5. **Collaboration**: Devs can work on different modules
6. **Documentation**: Each module self-documents its purpose

---

## Timeline

**Total Estimate**: 11 days (assuming 4-6 hours/day)

- Day 1: Preparation (constants, state, events)
- Day 2: Scene managers
- Day 3: Camera managers
- Day 4: Image managers
- Day 5: Material managers
- Day 6-7: UI managers (biggest)
- Day 8: Export managers
- Day 9: Utilities
- Day 10: Debug API
- Day 11: Final cleanup, testing, documentation

**Realistic Schedule**: 2-3 weeks with testing

---

## Non-Goals (RED LIST)

Per CLAUDE.md, we do NOT add during refactoring:

- ❌ New features (just refactor existing)
- ❌ Performance monitoring (already have FPS)
- ❌ Advanced error handling (basic is enough)
- ❌ Logging framework (console is fine)
- ❌ Testing framework (that's Phase 12, not refactor)

**Goal**: Refactor only. New features come after clean architecture.

---

## Next Steps

1. ✅ Create this REFACTOR_PLAN.md
2. ⏳ Update TODO.md with detailed Phase 7 tasks
3. ⏳ Start Phase 1: Extract constants.js
4. ⏳ Continue through phases sequentially

---

**Plan Created**: 2025-11-04
**Status**: Ready to begin
**Complexity**: High (3,321 lines → 25 modules)
**Risk**: Medium (with phase-by-phase approach)
**Expected Outcome**: Maintainable, modular codebase that preserves all functionality
