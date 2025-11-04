# <!-- this_file: TODO.md -->
# Vexy Stax JS – TODO

## Current Iteration – Ambient Mode Refactoring & Color Accuracy (2025-11-04)

### Phase 1: Ambient Mode Floor Removal ✅
- [x] **Remove floor rendering entirely from ambient mode**
  - Modify `toggleAmbience()` to NOT call `createFloor()`
  - Update toast message from "Realistic floor & shadows" to "Realistic lighting"
  - Ensure floor creation functions are bypassed when ambience enabled
  - Verify no visual artifacts or gray surfaces appear in ambient mode

### Phase 2: Color Saturation & Luminosity Restoration ✅
- [x] **Eliminate over-lighting that washes out slide colors**
  - Remove emissive properties completely from `MeshStandardMaterial` in ambient mode
  - Remove `emissive: new THREE.Color(0xffffff)` property
  - Remove `emissiveMap: texture` property
  - Remove `emissiveIntensity` calculation and application
  - Set `envMapIntensity` to 0.0 (was 0.55) to prevent environment reflection brightening
  - Verify slides maintain original RGB values and saturation
  - Ensure colors appear identical whether ambience is on or off

- [x] **Update slide positioning for no-floor mode**
  - Remove floor-relative positioning logic (`FLOOR_Y + (height / 2)`)
  - Set all slides to centered position (`position.y = 0`)
  - Keep shadows enabled for depth perception
  - Maintain proper z-spacing for stack depth

### Phase 3: Documentation & Quality (In Progress)
- [ ] **Task 10**: Add comprehensive JSDoc annotations to constants.js
  - Document purpose and valid ranges for all numeric constants
  - Add type annotations for all exported values
  - Include usage examples in comments
  - Specify measurement units (px, degrees, ratios, etc.)

- [ ] **Task 11**: Audit and fix event listener memory leaks
  - Document all 11 `addEventListener` call locations
  - Verify corresponding `removeEventListener` exists for each
  - Add tracked cleanup in window beforeunload handler
  - Test memory usage with repeated ambience toggles
  - Ensure no listeners persist after UI interactions

- [ ] **Task 12**: Add immutability validation tests for constants
  - Test `Object.freeze()` enforcement on all constant objects
  - Verify frozen constants throw errors on mutation attempts
  - Add test coverage for MATERIAL_PRESETS, VIEWPOINT_PRESETS
  - Validate LIGHTING_CONFIG, FLOOR_MATERIAL constants are frozen
  - Check array constants (RETRY_DELAYS_MS) are immutable

### Phase 4: Main.js Modularization (Future)
- [ ] Extract render loop and animation frame management
- [ ] Extract UI control initialization (Tweakpane setup)
- [ ] Extract file handling (drag/drop, browse, validation)
- [ ] Extract scene composition (image stacking, positioning)
- [ ] Extract camera control logic (modes, viewpoints, animations)
- [ ] Target: Reduce main.js from 3,459 lines to <300 lines

## Deferred Tasks
- **Manual QA checklist**: Requires browser - verify retina sizing at DPR 1/2, drop-anywhere flow, thumbnail reorder, tooltip displays
- **Console.log noise reduction**: Requires touching 95+ call sites; deferred to refactoring phase
