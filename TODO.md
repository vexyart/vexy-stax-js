# <!-- this_file: TODO.md -->
# Vexy Stax JS – TODO

## Current Snapshot (2025-11-06)
- Tests: 295/295 passing; run `npm run test:unit` after every module extraction.
- Build: 1,142.72 kB; keep ≤1,150 kB while refactoring.
- main.js: 3,367 lines, 77 functions (see main_js_complexity.md). Target: <300 lines orchestration shell.
- Documentation: JSDoc templates ready for 18 public functions (main_js_jsdoc_templates.md).

## Quality Improvement Tasks - Round 2 (2025-11-06)

### Task 4: Enhanced JSDoc Examples for Core Constants
- **Goal**: Add practical usage examples to key constant definitions
- **Rationale**: Constants like DEBOUNCE_DELAY_MS, MAX_HISTORY, FPS_WARNING_THRESHOLD would benefit from @example JSDoc showing real usage patterns
- **Approach**: Add @example blocks to 5-7 most commonly referenced constants in `src/core/constants.js`
- **Benefit**: Better developer experience when hovering over constants in IDE

### Task 5: Error Recovery Documentation
- **Goal**: Ensure all custom error messages include actionable guidance
- **Rationale**: Current errors tell what's wrong but could better explain how to fix it
- **Approach**: Review error throws in helpers.js and add "Fix:" hints to error messages
- **Benefit**: Faster debugging when errors occur

### Task 6: Test Suite Headers and Documentation
- **Goal**: Add comprehensive headers to test suites explaining what they test and why
- **Rationale**: Tests are well-written but purpose isn't always immediately clear
- **Approach**: Add JSDoc-style headers to test files missing them (target: helpers.test.js, ordering.test.js)
- **Benefit**: Better test maintainability and onboarding for contributors

## Quality Improvement Tasks - Round 1 (2025-11-06) ✅ ALL COMPLETE

### Task 1: Viewpoint Coordinate Validation ✅
- **Status**: COMPLETE
- Enhanced `tests/core_constants.test.js` with minimum distance and Z-bounds checks
- All viewpoint presets validated against enhanced constraints

### Task 2: Memory Formatting Edge Case Coverage ✅
- **Status**: COMPLETE
- Expanded `tests/utils_helpers.test.js` with 1 byte, 1 GB, 1 TB, 10 TB test cases
- Full range coverage from bytes to terabytes verified

### Task 3: Viewpoint Integration Test ✅
- **Status**: COMPLETE
- Added integration test in `tests/camera_camera_controller.test.js` (9 tests total)
- Verifies viewpoint positioning, controls update, and distance calculation

**Final Test Count**: 295/295 passing (+1 from quality improvements)

## Phase 5 - main.js Decomposition (Ongoing)
- Remaining: Final orchestration layer cleanup
- Target: Reduce main.js from 3,367 to <300 lines
- All major modules extracted and tested (FileHandler, SceneComposition, ExportManager, CameraController, TweakpaneSetup, KeyboardShortcuts, MemoryMonitor, ToastService, SettingsManager)
