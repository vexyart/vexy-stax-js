# <!-- this_file: PLAN.md -->
# Vexy Stax JS – Implementation Plan

## One-Sentence Scope
Maintain a browser-based Three.js studio that stacks 2D artwork with accurate color reproduction, provides camera controls and animations, and exports PNG/JSON artifacts while keeping the codebase modular and testable.

## Current Focus – Documentation & Code Quality (2025-11-05)

### Phase 3: Documentation & Code Quality (IN PROGRESS)
**Timeline**: Current iteration

**Sub-Task 3.1: JSDoc Annotations for constants.js**
**Rationale**: constants.js has 0 JSDoc comments, causing poor IDE support

**Required Annotations**:
```javascript
/**
 * Vertical position of floor plane in world coordinates
 * @type {number}
 * @constant
 * @default -250
 * @unit pixels
 */
export const FLOOR_Y = -250;

/**
 * Floor plane dimensions (width and depth)
 * @type {number}
 * @constant
 * @default 2000
 * @unit pixels
 * @description Large enough to extend beyond camera frustum
 */
export const FLOOR_SIZE = 2000;

/**
 * Reflection texture opacity (0.0 = invisible, 1.0 = opaque)
 * @type {number}
 * @constant
 * @default 0.01
 * @range {0.0, 1.0}
 * @description Reduced to 1% for subtle depth cue without visual distraction
 */
export const REFLECTION_OPACITY = 0.01;
```

**Scope**: Add similar annotations for:
- All numeric constants (FLOOR_Y, FLOOR_SIZE, ORTHO_FRUSTUM_SIZE, etc.)
- All configuration objects (MATERIAL_PRESETS, VIEWPOINT_PRESETS, LIGHTING_CONFIG)
- All frozen arrays (RETRY_DELAYS_MS)
- Include measurement units, valid ranges, default values, descriptions

**Testing**:
- [ ] VSCode/IDE shows hover tooltips with type info
- [ ] Autocomplete suggests correct parameter types
- [ ] No missing type warnings in editor

---

**Sub-Task 3.2: Event Listener Memory Leak Audit**
**Rationale**: 11 `addEventListener` calls vs 1 `removeEventListener` - potential memory leaks

**Audit Process**:
1. Grep for all `addEventListener` calls in src/main.js
2. Document each listener: target, event type, handler function name
3. Verify corresponding `removeEventListener` exists
4. Add cleanup to `window.beforeunload` handler
5. Use `addTrackedEventListener()` helper for automatic cleanup

**Known Listeners** (from grep analysis):
- Window resize event
- Window beforeunload event
- Keyboard events (keydown)
- Canvas context loss/restore events
- File input change event
- Drag/drop events (dragenter, dragover, dragleave, drop)

**Implementation**:
```javascript
// Track all event listeners for cleanup
const eventListeners = [];

function addTrackedEventListener(target, event, handler, options = {}) {
    target.addEventListener(event, handler, options);
    eventListeners.push({ target, event, handler, options });
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    eventListeners.forEach(({ target, event, handler, options }) => {
        target.removeEventListener(event, handler, options);
    });
    eventListeners.length = 0;
});
```

**Testing**:
- [ ] Monitor Chrome DevTools Performance → Memory
- [ ] Toggle ambience 50 times, check memory growth
- [ ] Reload page, verify listeners cleaned up
- [ ] No orphaned handlers in heap snapshot

---

**Sub-Task 3.3: Constants Immutability Tests**
**Rationale**: Verify `Object.freeze()` actually prevents mutations

**Test Cases**:
```javascript
// tests/constants_immutability.test.js
test('MATERIAL_PRESETS is frozen and cannot be mutated', () => {
    const preset = MATERIAL_PRESETS.card;
    assert.throws(() => {
        preset.roughness = 0.99;  // Should throw
    }, TypeError);
});

test('RETRY_DELAYS_MS array is frozen', () => {
    assert.throws(() => {
        RETRY_DELAYS_MS[0] = 999;  // Should throw
    }, TypeError);
});

test('All numeric constants are immutable', () => {
    assert.throws(() => {
        FLOOR_Y = 0;  // Should throw or have no effect
    });
});
```

**Testing**:
- [ ] Run tests, verify frozen objects throw on mutation
- [ ] Verify arrays cannot be modified
- [ ] Check nested object freezing (deep freeze)

---

### Phase 4: Main.js Modularization (FUTURE)
**Timeline**: Post-quality improvements, est. 2-3 weeks

**Problem**: main.js is 3,459 lines with 82 functions - violates single responsibility principle

**Target Structure**:
```
src/
├── main.js (< 300 lines - entry point only)
├── core/
│   ├── RenderLoop.js         - requestAnimationFrame management
│   ├── SceneComposition.js   - Image stacking, positioning
│   └── [existing core modules]
├── camera/
│   ├── CameraController.js   - Mode switching, viewpoints
│   ├── CameraAnimator.js     - [existing]
│   └── animation.js          - [existing]
├── ui/
│   ├── TweakpaneSetup.js     - UI control initialization
│   ├── ToastNotifications.js - Toast message system
│   └── KeyboardShortcuts.js  - Keyboard event handling
├── files/
│   ├── FileHandler.js        - Drag/drop, browse, validation
│   ├── ImageLoader.js        - Texture loading, retina sizing
│   └── ExportManager.js      - PNG/JSON export logic
└── [existing modules]
```

**Extraction Strategy**:
1. Bottom-up approach: Start with pure functions
2. Group related functionality into modules
3. Test each extraction independently
4. Maintain API compatibility
5. Update imports progressively

**Success Criteria**:
- main.js < 300 lines
- Each module < 250 lines
- Zero circular dependencies
- All tests passing
- Bundle size unchanged or smaller

---

### Risk Assessment & Mitigations

**Risk 1: Memory Leaks from Event Listeners**
- **Probability**: High (11 listeners, 1 cleanup)
- **Impact**: Medium (gradual degradation)
- **Mitigation**: Implement tracked listener system
- **Verification**: Memory profiling over 100+ interactions

**Risk 2: Breaking Existing Features**
- **Probability**: Low (good test coverage: 93/93 passing)
- **Impact**: High
- **Mitigation**: Run full test suite after each change
- **Verification**: All tests must pass

**Risk 3: Performance Degradation**
- **Probability**: Low
- **Impact**: Medium
- **Mitigation**: Profile render loop before/after changes
- **Verification**: Maintain 60fps with 10+ slides loaded

---

### Testing Strategy

#### Unit Tests (Current: 93/93 passing)
- Core modules (AppState, EventBus, constants)
- Scene managers (SceneManager, LightingManager, FloorManager)
- Camera animation (CameraAnimator)
- Utilities (helpers.js)
- Error recovery scenarios

#### Integration Tests (Manual)
- Material property changes: Roughness, metalness
- Camera viewpoints: All 7 presets
- Image loading: Multiple files, large files, retina sizing
- Export functions: PNG 1x/2x/4x, JSON save/load

#### Performance Tests
- Frame rate: 60fps target with 10 slides
- Memory usage: < 200MB growth over 100 interactions
- Load time: < 3s for 10 images @ 2MB each

---

### Future Considerations

**Post-Modularization Goals**:
- Video export support (MP4/WebM)
- Advanced material editor (custom shaders)
- Collaborative features (real-time sharing)
- Plugin system for extensions
- Cloud storage integration
- Automated visual regression testing (Playwright)

**Technical Debt Priorities**:
1. Console.log cleanup (95 statements)
2. Main.js modularization (3,459 lines)
3. Event listener memory management
4. JSDoc coverage (constants.js: 0%)
5. Error handling standardization
