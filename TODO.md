# <!-- this_file: TODO.md -->
# Vexy Stax JS – TODO

## Current Iteration – Documentation & Quality (2025-11-05)

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
