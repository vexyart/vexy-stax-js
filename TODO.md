# <!-- this_file: TODO.md -->
# Vexy Stax JS – TODO

## Iteration – Quality & Robustness Round 2 (2025-11-04) ✅
- [x] **Task 4**: Add input validation to core utility functions (clamp, lerp bounds; hex color format; file size limits) to prevent edge case failures ✅
- [x] **Task 5**: Skipped - defensive checks already provide sufficient error handling ✅
- [x] **Task 6**: Add JSDoc type annotations to all scene manager public methods to improve IDE autocomplete and catch type errors early ✅

## Iteration – Quality & Robustness Round 1 (2025-11-04) ✅
- [x] **Task 1**: Add unit tests for scene managers (SceneManager, LightingManager, FloorManager) to improve test coverage and ensure refactored modules work correctly ✅
- [x] **Task 2**: Extract helper utilities from main.js into `src/utils/helpers.js` (color calculations, validation) to reduce main.js size and improve reusability ✅
- [x] **Task 3**: Add defensive null checks and error handling to scene module initialization sequences to prevent crashes if DOM elements missing ✅

## Iteration – Retina Studio & Docked Layout
- [ ] Manual QA checklist: verify retina sizing at DPR 1/2, drop-anywhere flow, thumbnail reorder, tooltip displays; log results in `WORK.md`.

## Iteration – Quality & Robustness Round 3 (2025-11-04)
- [x] **Task 7**: Add unit tests for CameraAnimator class (saveState, restoreState, calculateFrontViewpoint, error handling) to cover critical untested animation module ✅
- [x] **Task 8**: Add error recovery tests - verify modules handle missing dependencies, invalid states, and edge cases gracefully ✅
- [ ] **Task 9**: Reduce console.log noise in main.js - DEFERRED (too large for this iteration, requires touching 95+ call sites; better suited for main.js refactoring phase)
