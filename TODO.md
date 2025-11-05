# <!-- this_file: TODO.md -->
# Vexy Stax JS – TODO

## Current Snapshot (2025-11-05)
- Tests: 235/235 passing; run `npm run test:unit` after every module extraction.
- Build: 1,142.72 kB; keep ≤1,150 kB while refactoring.
- main.js: 3,367 lines, 77 functions (see main_js_complexity.md). Target: <300 lines orchestration shell.
- Documentation: JSDoc templates ready for 18 public functions (main_js_jsdoc_templates.md).

## Phase 5: main.js Decomposition – Action Items
- [] Introduce `src/export/ExportManager.js` for PNG/JSON/clipboard routines with dependency injection.
- [] Add unit tests for ExportManager enforcing scale bounds and JSON round-trip.
- [] Carve out camera mode + viewpoint logic into `src/camera/CameraController.js` with animator hooks.
- [] Add unit tests for CameraController covering mode switching and center-on-content.
- [] Build `src/ui/TweakpaneSetup.js` to encapsulate control wiring using injected callbacks.
- [] Add UI binding tests (mocked callbacks) to verify pane configuration.
- [] Extract keyboard shortcut handling into `src/ui/KeyboardShortcuts.js` and cover modifier edge cases.
- [] Apply JSDoc templates (or extend them) for every function moved out of main.js before closing PRs.
- [] Log each module extraction, tests run, and bundle/memory observations in WORK.md and CHANGELOG.md.
