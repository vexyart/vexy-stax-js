# <!-- this_file: WORK.md -->
# Vexy Stax JS - Work Progress

## Current Status (2025-11-06)
**Phase**: 5 – main.js decomposition and quality tightening (active)
**Main.js**: 3,367 lines (target <300)
**Build**: 1,142.72 kB (stable ±0.1%)
**Node/Tooling**: Node 22, npm scripts stable; Playwright smoke still disabled pending harness repair

## Active Focus
- Finalise Phase 5 extractions so `src/main.js` becomes an orchestration shell
- Restore E2E smoke coverage once Playwright harness is repaired
- Keep documentation and test artefacts aligned after each extraction (README, CHANGELOG, TODO/PLAN)

## Risk & Follow-Up
- Medium: Playwright disabled leaves drag/drop + export flows unverified; schedule harness fix after current refactor slice
- Low: JavaScript unit surface remains green; maintain frequent runs of `npm run test:unit`
- Action: Draft next iteration objectives in PLAN/TODO after assessing remaining gaps

## Notes
- Historical iteration logs archived in CHANGELOG.md for reference.

## Iteration 115 – Loader/Logging Tidy (2025-11-06)
- Target: `RetryingTextureLoader` constructor validation for `scheduleRetry` option (+unit test).
- Target: zero-delay retry branch coverage in `tests/files_texture_loader.test.js`.
- Target: remove leading spaces from `FileHandler` rejection logs and lock via regression assertion.
- Approach: follow test-first workflow per `/work`; extend tests before adjusting implementations.
- Risks: minimal; changes scoped to files modules/tests, ensure no behavioural regressions in drag/drop intake or loader scheduling.
- Tests (red):
  - `node --test tests/files_texture_loader.test.js` → expected failure (missing scheduleRetry guard).
  - `node --test tests/files_file_handler.test.js` → expected failure (summary log retains leading space).
- Implementation snapshot:
  - Added constructor validation + default scheduling branch in `src/files/TextureLoader.js`; introduced zero-delay retry coverage.
  - Normalised `FileHandler` summary log formatting and asserted message via new test.
- Tests (green):
  - `node --test tests/files_texture_loader.test.js` → 8/8 pass post-fix.
  - `node --test tests/files_file_handler.test.js` → 9/9 pass post-fix.
  - `npm run test:unit` → full Node suite pass (317 tests; confirms loaders/logging changes integrate cleanly).

## Test Session – 2025-11-06 12:59 UTC (/test command)
- `fd -e py -x uvx` maintenance passes → no targets (repository has no Python sources).
- `uvx hatch test` → exit 5 (0 tests discovered; Python harness absent by design).
- Risk review: Python tooling remains optional; no corrective action required for JS stack, but document failure in CHANGELOG.

## Test Session – 2025-11-06 13:07 UTC (/test command)
- `fd -e py -x uvx` maintenance passes → noop (no `.py` files present).
- `uvx hatch test` → exit 5 (pytest collection empty, expected while Python harness intentionally absent).
- Risk review: unchanged from prior run; JS coverage handled via Node suites above.

## Test Session – 2025-11-06 12:38 UTC (/test command)
- `npm run test:unit` → 308/308 pass (≈0.85 s, Node 22). Node --test reported 9 suites, 0 skipped/todo, duration 845.96 ms; `debounce` specs remain slowest yet stable.
- Sanity checks: re-read `src/history/HistoryManager.js` `_notify` guard and `src/files/TextureLoader.js` delay validation to confirm unit assertions still mirror implementation; verified `src/main.js` only delegates history/loader responsibilities.
- Risk review: integration coverage still limited because Playwright smoke harness is offline; undo/redo + retry loaders now unit-tested but drag/drop/export flows remain medium risk until E2E reinstated.

## Iteration 113 – Reliability Slice (2025-11-06)
- Completed constructor validation tests for `HistoryManager`, covering missing callbacks and invalid `maxSize`.
- Hardened `RetryingTextureLoader` against loaders lacking `load()`; new guard logs error + toast with regression coverage.
- Added `HistoryManager.getCurrent` tests for empty stack and active snapshot flows.
- Planned tests executed: targeted Node suites followed by `npm run test:unit`.

## Test Session – 2025-11-06 12:43 UTC (/test command)
- `node --test tests/history_history_manager.test.js` → 13/13 pass (≈0.20 s).
- `node --test tests/files_texture_loader.test.js` → 6/6 pass (≈0.18 s).
- `npm run test:unit` → 314/314 pass (≈1.44 s, Node 22). Duration 1.915 s wall-clock; `debounce` specs remain slowest (≈101 ms each). No flaky behaviour observed.

## Test Session – 2025-11-06 12:48 UTC (/test command)
- `npm run test:unit` → 314/314 pass (≈1.34 s, Node 22). Node test runner reported 9 suites, 0 skipped/todo, duration 1,339 ms; debounce helpers remain slowest (~103 ms) but stable.
- Sanity checks: re-read `src/core/SceneComposition.js` disposal + memory guards to confirm `clearAll()` still releases textures/geometry and `addImage()` keeps shared refs up to date; reviewed `src/files/FileHandler.js` validation/memory throttling to ensure toast + overlay handling matches tests; spot-checked `src/utils/helpers.js` debounce path for timing expectations.
- Risk review: Playwright smoke remains disabled so drag/drop/export flows lack end-to-end coverage; manual sanity limited to module spot-checks, so API wiring in `src/main.js` still medium risk until refactor continues.

## Iteration 114 – SceneComposition reliability touch (2025-11-06)
- Targets: history capture missing on `reorder`, dispose/memory guard coverage on `deleteAt`, shared-state confirmation + memory guard assertion on `clearAll`.
- Approach: follow test-first flow per `/work`; extend `tests/core_scene_composition.test.js` with new expectations before adjusting `src/core/SceneComposition.js`.
- Risks: `AppState` global state bleed between tests; will reset via `appState.reset()` during setup to keep assertions deterministic.
- Progress: new specs lock history capture, deletion disposal, and shared-state memory guard behaviour; `SceneComposition.reorder` now calls `saveHistory()` so undo works across reorder operations.
- Tests: `node --test tests/core_scene_composition.test.js` (targeted) then `npm run test:unit` → 317/317 pass (≈0.86 s, Node 22); debounce helper still slowest (~102 ms).
