# <!-- this_file: PLAN.md -->
# Vexy Stax JS – Implementation Plan

## One-Sentence Scope
Maintain a browser-based Three.js studio that stacks 2D artwork with accurate color reproduction, provides camera controls and animations, and exports PNG/JSON artifacts while keeping the codebase modular and testable.

## Current Focus – Ambient Mode Color Accuracy & Refactoring (2025-11-04)

### Critical Requirements

#### 1. Ambient Mode WITHOUT Floor Rendering
**Problem Statement**: The ambient mode currently creates a visible floor surface that the user explicitly does not want. When ambience is enabled, NO floor should render - only lighting effects should be applied to the slides.

**Technical Specifications**:
- **Function**: `toggleAmbience(enabled)` in `src/main.js`
- **Current Behavior** (INCORRECT):
  - Line 647: Calls `createFloor()` which instantiates FloorManager
  - Creates visible gray/adaptive floor plane at `FLOOR_Y = -250`
  - Positions slides to "stand" on floor with `position.y = FLOOR_Y + (height / 2)`
  - Adds Reflector mesh for floor reflections
- **Required Behavior** (CORRECT):
  - Skip `createFloor()` entirely
  - Call only `updateImagesForAmbience(true)` to update materials
  - NO floor geometry, NO floor reflector, NO visible floor surface
  - Slides positioned at `position.y = 0` (centered, not standing on floor)

**Implementation Details**:
```javascript
// BEFORE (incorrect - creates floor)
if (enabled) {
    createFloor();  // ← REMOVE THIS
    showToast('✨ Ambience enabled: Realistic floor & shadows', 'success');
}

// AFTER (correct - no floor)
if (enabled) {
    updateImagesForAmbience(true);  // ← Only update materials
    showToast('✨ Ambience enabled: Realistic lighting', 'success');
}
```

**Verification Criteria**:
- When ambience checkbox is enabled, viewport shows ONLY slides against background
- No gray/colored surface visible below slides
- No reflective plane rendering
- Slides maintain centered vertical position
- Shadows may cast (for depth) but have nothing to cast onto

---

#### 2. Color Saturation & Luminosity Preservation
**Problem Statement**: When ambient mode is enabled, slides appear washed out, pale, over-bright, and desaturated. Original artwork colors must be preserved with IDENTICAL luminosity and saturation whether ambience is on or off.

**Root Cause Analysis**:
The `updateImagesForAmbience()` function applies THREE properties that brighten/wash out colors:

1. **Emissive Color** (Line 598): `emissive: new THREE.Color(0xffffff)`
   - Adds white self-illumination to material
   - Makes slides appear to glow internally
   - Reduces color saturation by blending with white

2. **Emissive Map** (Line 599): `emissiveMap: texture`
   - Uses texture itself as emissive source
   - Doubles the brightness contribution
   - Further washes out dark/saturated colors

3. **Emissive Intensity** (Line 600): `emissiveIntensity: emissiveIntensity`
   - Multiplier calculated from background luminance (0.05-0.25 range)
   - Even at 5% adds significant brightening
   - Compounds with other effects

4. **Environment Map Intensity** (Line 602): `envMapIntensity = 0.55`
   - 55% environment reflection contribution
   - Adds scene environment color to slides
   - Further reduces color purity

**Technical Specifications**:
- **Function**: `updateImagesForAmbience(enabled)` in `src/main.js:565-637`
- **Current Material Properties** (INCORRECT):
  ```javascript
  material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
      roughness: params.materialRoughness,
      metalness: params.materialMetalness,
      emissive: new THREE.Color(0xffffff),      // ← REMOVE
      emissiveMap: texture,                      // ← REMOVE
      emissiveIntensity: emissiveIntensity      // ← REMOVE
  });
  material.envMapIntensity = 0.55;              // ← SET TO 0.0
  ```

- **Required Material Properties** (CORRECT):
  ```javascript
  material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
      roughness: params.materialRoughness,
      metalness: params.materialMetalness
      // NO emissive properties
  });
  material.envMapIntensity = 0.0;  // No environment reflection
  ```

**Color Science Requirements**:
- **Luminosity Preservation**: Measure average RGB luminance of original texture, verify ambient mode shows same values (±2% tolerance)
- **Saturation Preservation**: HSV saturation values must be identical in both modes
- **Hue Accuracy**: No color shift - reds stay red, blues stay blue, yellows stay yellow
- **Contrast Maintenance**: Dark colors stay dark, bright colors stay bright
- **Texture Fidelity**: Fine details in artwork remain visible, not blown out by over-exposure

**Verification Criteria**:
- Load test images with pure red (#FF0000), green (#00FF00), blue (#0000FF)
- Enable ambience mode
- Use browser DevTools to sample pixel RGB values from slides
- Verify RGB values match original image data exactly
- Disable ambience, verify no difference in appearance
- Test with various material roughness/metalness settings
- Confirm colors look identical whether ambience is on or off

---

### Phase-by-Phase Implementation

#### Phase 1: Ambient Mode Floor Removal ✅ COMPLETE
**Timeline**: Immediate (completed 2025-11-04)

**Changes Made**:
1. Modified `toggleAmbience()` function (main.js:643-654)
   - Removed `createFloor()` call
   - Added `updateImagesForAmbience(true)` call
   - Updated toast message
2. Modified slide positioning (main.js:611-624)
   - Removed floor-relative Y positioning
   - Set `position.y = 0` for centered placement
   - Kept shadow casting for depth perception

**Testing**:
- [x] Visual verification: No floor visible when ambience enabled
- [x] Position verification: Slides centered at Y=0
- [x] Build verification: `npm run build` successful
- [x] Unit tests: 93/93 passing

---

#### Phase 2: Color Accuracy Restoration ✅ COMPLETE
**Timeline**: Immediate (completed 2025-11-04)

**Changes Made**:
1. Modified material creation (main.js:584-606)
   - Removed `emissive` property
   - Removed `emissiveMap` property
   - Removed `emissiveIntensity` property
   - Set `envMapIntensity` to 0.0 (was 0.55)
2. Removed emissive intensity calculation
   - No longer calling `getAdaptiveEmissiveIntensity()`
   - No longer calculating background luminance for slides

**Testing**:
- [x] Visual verification: Slides show original colors
- [x] Brightness check: No over-lighting or washing out
- [x] Saturation check: Colors appear vivid and accurate
- [x] Comparison test: Ambience on/off looks identical

---

#### Phase 3: Documentation & Code Quality (IN PROGRESS)
**Timeline**: Next 2-3 iterations

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

#### Phase 4: Main.js Modularization (FUTURE)
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

**Risk 1: Color Accuracy Regression**
- **Probability**: Medium
- **Impact**: High (user's primary complaint)
- **Mitigation**: Add pixel-perfect color comparison tests
- **Verification**: Sample RGB values from rendered slides vs original textures

**Risk 2: Performance Degradation**
- **Probability**: Low
- **Impact**: Medium
- **Mitigation**: Profile render loop before/after changes
- **Verification**: Maintain 60fps with 10+ slides loaded

**Risk 3: Breaking Existing Features**
- **Probability**: Low (good test coverage)
- **Impact**: High
- **Mitigation**: Run full test suite after each change
- **Verification**: 93/93 tests must pass

**Risk 4: Memory Leaks from Event Listeners**
- **Probability**: High (11 listeners, 1 cleanup)
- **Impact**: Medium (gradual degradation)
- **Mitigation**: Implement tracked listener system
- **Verification**: Memory profiling over 100+ interactions

---

### Testing Strategy

#### Unit Tests (Current: 93/93 passing)
- Core modules (AppState, EventBus, constants)
- Scene managers (SceneManager, LightingManager, FloorManager)
- Camera animation (CameraAnimator)
- Utilities (helpers.js)
- Error recovery scenarios

#### Integration Tests (Manual)
- Ambient mode toggle: Floor removal, color accuracy
- Material property changes: Roughness, metalness
- Camera viewpoints: All 7 presets
- Image loading: Multiple files, large files, retina sizing
- Export functions: PNG 1x/2x/4x, JSON save/load

#### Visual Regression Tests (Manual)
- Screenshot comparison: Ambience on vs off
- Color sampling: RGB value verification
- Pixel-perfect: Original texture vs rendered slide

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
