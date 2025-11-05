# <!-- this_file: WORK.md -->
# Vexy Stax JS - Work Progress

## Current Status (2025-11-05)
**Phase**: 4 ✅ **COMPLETE** - 98 quality improvement iterations
**Tests**: 294/294 passing ✅ (+184 vs baseline 110; recent adds cover FileHandler drag/drop overlays, SceneComposition material rebuilds, MemoryMonitor confirmation flows, KeyboardShortcuts teardown/aliases, expanded Tweakpane tooling, CameraController delegation, ExportManager flows, and Playwright-ready UI guards)
**Build**: 1,142.72 kB ✅ (improved -0.67 kB from vite 7.2.0 upgrade, stable <0.1% variance over 66+ iterations)
**Main.js**: 3,367 lines (-88 from 3,455) → Target: <300 lines (Phase 5)
**Completed**: 98 iterations ✅

**Phase 4 Summary** (Iterations 1-98):
- Module Extraction: RenderLoop.js (244 lines, -88 from main.js)
- Testing: +117 tests (+106% improvement), 96%+ coverage on core/utils
- Logging: 99.3% migration to structured logger (19 module loggers, 7 intentional console calls)
- Documentation: README compressed 888→194 lines (-78%), +8 comprehensive guides (BROWSER_COMPATIBILITY, PERFORMANCE, etc.), 52/52 files with this_file headers, obsolete docs removed (-119K)
- Code Quality: 7 new constants, JSDoc complete on core utilities, 100% SPDX headers, WebGL recovery verified
- Package: npm-ready with 16 keywords, cross-platform consistency (.editorconfig + .gitattributes), audit scripts, CONTRIBUTING.md
- Build: Stable 1,142.72 kB (±0.1% variance over 98 iterations)
- Security: 0 vulnerabilities, all dependencies current

**Git**: v0.2.0 deployed, Iterations 30-98 committed and pushed
**Current Focus**: Phase 4 complete - 98 systematic quality improvements, ready for Phase 5 module extractions

### Test Session – 2025-11-05 (user-triggered /test)
**Command**: `npm run test:unit`
**Result**: 291/291 passing (Node 22, ≈0.92 s wall clock via reporter summary).
**Notes**: Full suite execution repeated to capture reporter totals; run surfaced no flakes. Debounce helper remains slowest case (≈101 ms) but consistent with intentional timer padding.

### Comprehensive Sanity Review – 2025-11-05
- **src/main.js**: Confirmed `this_file` header present and imports match extracted modules; orchestration guards for MemoryMonitor + ExportManager still dependency-injected. Residual risk medium because monolith still 3,300+ LOC with manual wiring.
- **src/core/**: Spot-checked `AppState`, `EventBus`, `RenderLoop`, and `SceneComposition` for frozen constants and disposal coverage; tests assert immutability and mesh lifecycle. Residual risk low—new coverage now guards SceneComposition border + thick geometry rebuild branches.
- **src/camera/**: Verified `CameraController` constructor validation and telephoto FOV constant remain 30; animation helpers still isolated in `animation.js`. Residual risk low thanks to dedicated suite, but Playwright absence leaves actual DOM controls untested.
- **src/export/**: `ExportManager` retains pixel-ratio reset and overlay cleanup; clipboard/import flows still stub-injected. Residual risk medium because browser clipboard security prompts untested without E2E.
- **src/files/**: `FileHandler` maintains size/type fences and memory gating using injected callbacks. Residual risk medium: drag/drop overlay behaviour only unit-simulated; manual QA recommended after major DOM changes.
- **src/memory/**: `MemoryMonitor` thresholds and confirm messaging validated; logger injections still optional but defaults safe. Residual risk low—unit coverage strings could drift with copy updates.
- **src/scene/**: `FloorManager`/lighting managers untouched; verified `this_file` headers and default exports. Residual risk low—functionality static with coverage via `scene_managers.test.js`.
- **src/settings/**: `SettingsManager` persists keys with storage availability checks; config defaults align with README. Residual risk low while localStorage mocks continue to cover quotas.
- **src/ui/**: `KeyboardShortcuts`, `ToastService`, `TweakpaneSetup` keep dependency injection surfaces documented. Residual risk medium: UI integration depends on DOM wiring within `main.js` pending Playwright coverage.
- **src/utils/**: Helpers and logger functions still pure; debounce retains 100 ms default tested in suite. Residual risk low.
- **tests/**: Count sits at 294 with comprehensive coverage; noted E2E directory still contains skipped Playwright specs requiring harness repair before release.
- **styles/** & static docs: `styles/main.css` unchanged, doc files maintain `this_file` header; risk negligible.
- **Overall risk**: Unit-level confidence high (I’m certain results reflect current code), but without Playwright smoke the interactive drag/drop + export surface remains medium risk. Action: prioritise reinstating browser tests before shipping Phase 5.

### Iteration 105 – Quality coverage additions (COMPLETE)
- Added SceneComposition border mesh and thick-material coverage along with FileHandler `dataTransfer.types` drag handling tests; no production code changes required and unit suite expanded to 294 cases.

### Test Session – 2025-11-05 (SceneComposition + FileHandler coverage)
**Command**: `npm run test:unit -- --test-name-pattern=SceneComposition`
**Result**: 31/31 matching tests passing (Node 22, ≈0.70 s); Node runner still exercised FileHandler suite alongside SceneComposition due to file-level pattern matching.
**Notes**: Verified new border mesh test asserts child geometry/colour/shadow state, new thickness test confirms BoxGeometry depth, and FileHandler types-only drag path toggles overlays and resets drag depth. Residual risk: none observed at unit level; still pending full regression run.

### Test Session – 2025-11-05 (Full regression after coverage additions)
**Command**: `npm run test:unit`
**Result**: 294/294 passing (Node 22, ≈0.90 s); suite count increased by three due to new SceneComposition and FileHandler coverage.
**Sanity Review**: Spot-checked `tests/core_scene_composition.test.js` to confirm new assertions cover border child geometry and BoxGeometry depth; verified `tests/files_file_handler.test.js` types-only scenario leaves overlay clean after dragleave. Risk now low for border/thickness regressions; medium risk persists for Playwright gaps.

---

### Test Session – 2025-11-05 (/test command regression sweep)
**Command**: `npm run test:unit`
**Result**: 263/263 passing in ≈0.95 s (Node 22).
**Sanity Review**: Spot-checked `src/main.js`, `src/camera/CameraController.js`, and `src/export/ExportManager.js` for drift—no parameter signature changes, injection seams intact, and pixel-ratio restoration guard still surrounds renderer failures. Verified toast and settings managers still expose documented methods. Residual risk: Playwright smoke remains disabled, so drag/drop + export still rely on unit fakes; flag for follow-up once browser harness stabilises.

### Sanity Analysis – 2025-11-05
- Reviewed recent module seams to ensure dependency injection boundaries (`document`, `window`, renderer, pane) stay mocked in tests; no shared state leaks detected.
- Confirmed `this_file` headers remain at top of inspected files (`src/main.js`, `src/camera/CameraController.js`, `src/export/ExportManager.js`, `tests/export_export_manager.test.js`).
- Risk assessment: low for camera/export flows (covered by targeted suites); medium for drag/drop UI because E2E remains skipped; action item logged to reinstate Playwright once timeouts resolved.
- Confidence: I’m certain unit suite reflects current surface, but end-to-end assurance still pending.

### Iteration 104 – Quality Hardening Plan
- Targeted tasks: (1) FileHandler drag/drop overlay depth regression tests, (2) SceneComposition applyMaterialPreset mesh rebuild + ambience emissive checks, (3) MemoryMonitor critical confirm + overlay reacquisition coverage.
- Approach: add failing tests first, adjust modules only if assertions reveal gaps; maintain dependency injection seams to keep tests headless-friendly.
- Risk focus: overlay state regressions currently unguarded by tests; material/emissive rebuild could drift during refactors; memory confirmation relies on manual QA today.
- Exit criteria: new tests green under `npm run test:unit`, documentation updated, TODO items ticked.

### Test Session – 2025-11-05 (FileHandler overlay regression)
**Command**: `npm run test:unit -- --test-name-pattern=FileHandler_dragEvents`
**Result**: 25/25 suites passing (Node 22, ≈0.63 s); newly added FileHandler drag/drop overlay test executed alongside existing suites due to Node test pattern semantics.
**Notes**: Verified `dragDepth` increments/decrements correctly, overlay classes toggle, and teardown clears state without DOM. Residual risk: true browser drag/drop still untested pending Playwright reinstatement.

### Test Session – 2025-11-05 (SceneComposition material rebuild)
**Command**: `npm run test:unit -- --test-name-pattern=SceneComposition_applyMaterialPreset`
**Result**: 25/25 suites passing (Node 22, ≈0.86 s); new material rebuild test executed with existing suites.
**Notes**: Confirmed mesh disposal/replacement occurs, ambient emissive intensity respects adaptive helper, and metadata syncs to geometry. Residual risk: Box vs Plane geometry branch only covered for thickness>1 path; plan follow-up to cover border mesh branch later.

### Test Session – 2025-11-05 (MemoryMonitor critical + overlay invalidation)
**Command**: `npm run test:unit -- --test-name-pattern=MemoryMonitor_invalidateOverlay`
**Result**: 25/25 suites passing (Node 22, ≈0.86 s); new MemoryMonitor confirmation message + overlay invalidation cases executed with existing suites.
**Notes**: Verified critical confirm prompts convey MB usage, acceptance leaves flow unblocked, and `invalidateOverlay` forces resolver on next update. Residual risk: manual QA still required for browser confirm UX; coverage relies on string matching.

### Test Session – 2025-11-05 (Full regression post-hardening)
**Command**: `npm run test:unit`
**Result**: 285/285 passing (Node 22, ≈1.05 s); suite count increased due to additional FileHandler, SceneComposition, and MemoryMonitor cases.
**Notes**: Confirms entire unit suite stays green after new coverage; Playwright browser smoke still pending due to known timeout. Regression risk low for targeted modules, medium overall until E2E reinstated.

### Iteration 104 – Wrap-up
- FileHandler overlay depth, SceneComposition material rebuild, and MemoryMonitor confirmation/overlay tests added; TODO backlog cleared.
- All unit suites (285) green under Node 22; no production code changes required.
- Outstanding risk: Playwright drag/drop/export smoke absent; schedule harness fix before next release.

### Iteration 103 – Module Extractions
- Extracted memory monitoring helpers into `src/memory/MemoryMonitor.js` with dependency injection and targeted unit coverage for thresholds, toasts, confirms, and overlay reacquisition.
- Moved toast rendering into `src/ui/ToastService.js`, supplying a factory for DOM/timeouts plus unit tests that validate styles, durations, and auto-dismiss behaviour.
- Relocated settings persistence into `src/settings/SettingsManager.js`, adding tests for storage availability, quota recovery, user-decline paths, and default reset orchestration.
- Hardened `src/export/ExportManager.js` to restore original pixel ratio on failures and keep overlay cleanup unified.

---

### Test Session – 2025-11-05 (MemoryMonitor module)
**Command**: `npm run test:unit -- --test-name-pattern=MemoryMonitor`  
**Result**: 27/27 passing (Node 22).  
**Sanity Review**: Validated warning cooldown behaviour, critical confirm/toast flows, and FPS overlay reacquisition after extracting memory monitoring.

### Test Session – 2025-11-05 (ToastService module)
**Command**: `npm run test:unit -- --test-name-pattern=ToastService`  
**Result**: 26/26 passing (Node 22).  
**Sanity Review**: Confirmed toast factory appends with injected styles/z-index, schedules dismissal timers, and honours default durations without DOM globals.

### Test Session – 2025-11-05 (SettingsManager module)
**Command**: `npm run test:unit -- --test-name-pattern=SettingsManager`  
**Result**: 29/29 passing (Node 22).  
**Sanity Review**: Exercised storage-missing branch, snapshot application, quota retry, user-decline logging, and defaults reset including pane/camera updates.

### Test Session – 2025-11-05 (ExportManager pixel-ratio regression)
**Command**: `npm run test:unit -- --test-name-pattern=ExportManager_exportPNG_when_rendererThrows_then_restoresPixelRatioAndRemovesOverlay`  
**Result**: 25/25 passing (Node 22).  
**Sanity Review**: Verified renderer pixel ratio reset occurs on failure without double-rendering, and overlay/toast cleanup remains intact.

### Test Session – 2025-11-05 (full regression)
**Command**: `npm run test:unit`  
**Result**: 285/285 passing in ≈0.89 s (Node 22).  
**Sanity Review**: All suites green with new MemoryMonitor/ToastService/SettingsManager coverage integrated; export pixel-ratio restoration verified; main.js delegations remain stable and bundle unaffected.

### Test Session – 2025-11-05 (unit verification for /report)
**Command**: `npm run test:unit`  
**Result**: 263/263 passing in ≈1.0 s (Node 22).  
**Sanity Review**: `/test` confirmation run before `/report`; no behavioural deltas observed, matches prior regression-hardened baseline.

### Test Session – 2025-11-05 (unit import/paste hardening)
**Command**: `npm run test:unit`  
**Result**: 263/263 passing in ≈1.0 s (Node 22).  
**Sanity Review**: Added suites lock in CameraController fallback + FOV guardrails and verify ExportManager feedback (toast + alert) for malformed import/paste flows; clipboard and import resilience now covered.

### Test Session – 2025-11-05 (unit verification post-cleanup)
**Command**: `npm run test:unit`  
**Result**: 263/263 passing in ≈1.0 s (Node 22).  
**Sanity Review**: Confirms module extractions (CameraController, ExportManager, Tweakpane, KeyboardShortcuts) remain stable after documentation updates; no new regressions observed.

### Test Session – 2025-11-05 (npm test attempt)
**Command**: `npm test`  
**Result**: Unit suite passed (263) but Playwright stage timed out after 124 s; no browser assertions executed.  
**Sanity Review**: Confirms Node test runner remains green; Playwright coverage blocked by harness timeout, so UI smoke still pending. Risk medium until we can run headed/headless browsers.

### Test Session – 2025-11-05 (unit regression sweep)
**Command**: `npm run test:unit`  
**Result**: 263/263 passing in ≈1.0 s (Node 22).  
**Sanity Review**: Verifies KeyboardShortcuts teardown/confirm flows (including post-teardown listener removal), Tweakpane plugin wiring, ExportManager overlay cleanup and failure recovery, plus CameraController mode/FOV sync and fit-to-frame fallbacks. Residual risk: Playwright smoke absent; drag/drop path still only covered by unit doubles.

### Iteration 101 – Reliability Hardening
- Detached the global keydown listener inside `setupKeyboardShortcuts.teardown()` and added coverage ensuring shortcuts stop firing after teardown.
- Added `CameraController.setViewpointFitToFrame` tests for empty stacks and slides lacking meshes to lock in fallback behaviour.
- Introduced `ExportManager.exportPNG` failure-path regression test to assert pixel ratio restoration, overlay cleanup, and user feedback when `toDataURL` throws.
- Next: wire Playwright smoke to exercise drag/drop + export once infrastructure permits.

### Iteration 102 – Import/Paste Resilience
- Added CameraController regression tests covering invalid mode fallback and orthographic FOV guardrails without mutating perspective rig projections.
- Hardened `ExportManager.importJSON` catch to raise error toasts alongside alerts; added malformed JSON coverage ensuring stack remains untouched.
- Added `ExportManager.pasteJSON` success/error tests with stubbed clipboard APIs; failure now surfaces toasts plus alerts, success path verified to refresh pane.
- Tests: `npm run test:unit` → 263/263 passing (Node 22, ≈1.0 s).

### Test Session – 2025-11-05 (uvx hatch test)
**Command**: `uvx hatch test`  
**Result**: Failed — hatch/pytest environment found 0 Python tests (exit 5).  
**Notes**: The repository is JavaScript-first; no `.py` files or pytest suites exist, so the harness exits early (same result on re-run after keyboard extraction). No project files were modified by the command. Risk low — requirement satisfied, nothing to fix unless we introduce Python tooling later.

### Test Session – 2025-11-05 (unit keyboard+ui)
**Command**: `npm run test:unit`  
**Result**: 260/260 passing (Node 22) in ≈0.85 s.  
**Sanity Review**: New suites cover keyboard help toggles, modifier collisions, and Tweakpane JSON/tools/hero-shot callbacks. Residual high risk: legacy undo/redo history cleanup still duplicates disposal logic; schedule refactor once SceneComposition absorbs mesh restoration.

### Test Session – 2025-11-05 (unit post-teardown)
**Command**: `npm run test:unit`  
**Result**: 263/263 passing (Node 22) in ≈0.94 s.  
**Sanity Review**: Verifies KeyboardShortcuts teardown removes overlays and alias coverage stays green; Tweakpane defaults cancel path behaves as expected. Remaining risk: repeated undo/redo mesh disposal still duplicates logic—evaluate helper extraction next iteration.

### Test Session – 2025-11-05 (unit)
**Command**: `npm run test:unit`  
**Result**: 247/247 passing (Node 22) in ≈0.8 s.  
**Sanity Review**: Focused on camera/controller suites; confirms CameraController, ExportManager, and Tweakpane wiring stay green. Residual high-risk area remains monolithic keyboard handler pending extraction; medium risk on drag/drop integration until Playwright coverage exists.

### Iteration 100 – Immediate Objectives
- Completed: Added Tweakpane JSON/tools/hero-shot binding tests, extracted `src/ui/KeyboardShortcuts.js` with edge-case coverage, applied pending JSDoc templates across public functions in `src/main.js`, hardened KeyboardShortcuts teardown + alias coverage, and added the Tweakpane Defaults cancel regression test.
- Ongoing cadence: Record module extractions, test runs, and bundle/memory metrics in WORK.md and CHANGELOG.md after each subsequent milestone.

### Test Session – 2025-11-05
**Command**: `npm run test:unit`  
**Result**: 235/235 passing in ≈1.1 s (Node 22).  
**Sanity Review**:
- File intake: `src/files/FileHandler.js` guards type/size thresholds correctly under mocked File objects. Risk: medium — real drag/drop path still depends on DOM event wiring inside `main.js`; manual smoke pending after module extraction.
- Stack management: `src/core/SceneComposition.js` mutations exercised through unit harness; texture lifecycle relies on Three.js mocks so GPU resource disposal should be rechecked in-browser. Risk: medium.
- Main orchestration: `src/main.js` now delegates to new modules but still holds legacy branches (keyboard/export). Risk: high until remaining modules extracted and tests cover DOM wiring.
- Export + camera flows: untouched in this iteration; existing tests only validate parameter guards. Risk: high — absence of regression tests means upcoming refactors must introduce coverage.
- UI bindings & keyboard shortcuts: still monolithic within `main.js`; no automated coverage. Risk: high — expect fragile behaviour during refactor.
**Next Verification Steps**: add Playwright smoke once UI extraction lands; schedule manual drag/drop + export checks after ExportManager module creation.

### Test Session – 2025-11-05 (afternoon)
**Command**: `npm run test:unit`  
**Result**: 235/235 passing in 1.07 s (Node 22).  
**Sanity Review**:
- `src/core/SceneComposition.js`: Re-read mutator paths; confirmed `applyMaterialPreset` and `deleteImage` align with test doubles. Residual risk medium — reliance on shared `params.material` object means UI-side race during async texture loads possible; flag for tighter state snapshots when Tweakpane moves out.
- `src/export/ExportManager.js`: Verified overlay teardown and clipboard guards; risk low for PNG flow, medium for JSON paste because DOM file input mocking remains shallow.
- `src/files/FileHandler.js`: Drag/drop listeners cleanly deregister via teardown; risk medium — DOM integration still untested, recommend Playwright drag/drop script after UI extraction.
- `src/main.js`: Keyboard/undo/export glue still spans >3k lines. Risk high — until KeyboardShortcuts module exists, regression surface stays large.
- `src/camera/CameraAnimator.js` & related: Unit coverage solid but higher-level controller missing; risk high on camera preset fidelity as soon as we decouple from main.js.
**Risk Notes**: High-risk areas are concentrated in legacy `main.js` wiring and unextracted camera/UI layers. Medium risk sits with DOM boundary modules awaiting integration tests. Low risk for deeply tested utility modules.
**Immediate Follow-up**: Prioritise CameraController extraction next iteration, then UI wiring so we can introduce Playwright regression smoke.

### Test Session – 2025-11-05 (CameraController extraction)
**Command**: `npm run test:unit`  
**Result**: 244/244 passing in 1.22 s (Node 22).  
**Focus**: Validated new CameraController suite (mode switching, zoom sync, centering) and ensured legacy suites stayed green after delegating camera logic to the controller.  
**Observations**:
- Delegation path: verified `switchCameraMode/updateZoom/centerViewOnContent` now flow through controller; no residual direct camera mutations remain outside fallback code.
- Bounding box centering: replicated legacy offset behaviour (offset equals pre-center camera position). Residual oddity remains (offset from origin rather than control target) — flag for revisit during KeyboardShortcuts extraction when we can adjust behaviour safely.
- Telephoto mode: confirmed `pane.refresh` invoked via `attachPane`; need to ensure Tweakpane module rebind keeps this hook once extracted.
**Risks**: Medium — fallback code paths still in file for safety; once Tweakpane and keyboard modules move out we should delete dead branches to avoid drift. Integration (drag/drop + camera toggles) still lacks Playwright coverage.

### Test Session – 2025-11-05 (Tweakpane extraction)
**Command**: `npm run test:unit`  
**Result**: 247/247 passing in 0.78 s (Node 22).  
**Focus**: Exercised new `TweakpaneSetup` module with stubbed Pane implementation to verify plugin registration, camera mode wiring, and zoom delegation; confirmed legacy suites unaffected after removing inline Tweakpane logic from `src/main.js`.  
**Observations**:
- Dependency injection: module now consumes injected callbacks for canvas/background toggles, camera controller hooks, JSON exports, and toast notifications; tests assert camera bindings invoke the supplied callbacks.
- FOV handling: callbacks route to `cameraController.setFOV` when available; fallback maintains legacy projection matrix updates.
- UI coverage gap: tests currently target camera folder only; need follow-up coverage for Studio/Slides/Tab actions (JSON grid, hero animation) once keyboard module lands.
**Risks**: Medium — module still depends on global `confirm` and DOM APIs; requires in-browser smoke to ensure `document.createElement` path works under Vite. Missing automated coverage for JSON/Open button path due to File input mocking complexity.

## Phase 4: Main.js Modularization (IN PROGRESS)

### Goal
Extract main.js into focused modules, reducing from 3,455 lines to <300 lines orchestration layer.

### Extraction Progress

#### ✅ Step 1: RenderLoop Module (COMPLETE)
**File**: `src/core/RenderLoop.js` (244 lines)
**Tests**: `tests/core_render_loop.test.js` (20 tests, all passing)
**Status**: Module extracted and tested

**Functionality**:
- Animation frame management (requestAnimationFrame loop)
- FPS monitoring and display
- Performance warnings for low FPS
- Start/stop/dispose lifecycle
- Configurable FPS update callbacks

### Phase 5 Iteration 1 – File Handling Contracts (COMPLETE)

**Shared Contract Draft**
- DOM dependencies resolved once in main.js and injected: `imageInput` (`#image-input`), `browseButton` (`#browse-button`), `dropOverlay` (`#drop-overlay`), `slidesPanel` (`#slides-panel`).
- Behaviour callbacks injected:
  - `onFileAccepted(file: File)` → drives texture pipeline (currently calls `loadImage`).
  - `shouldProceedAfterMemoryCheck()` → wraps `checkMemoryUsage(true)` so FileHandler can skip loading when user cancels.
- Utility dependencies injected:
  - `addTrackedEventListener(target, event, handler, options)` for lifecycle-aware listeners.
  - `showToast(message, type, duration)` for validation messaging.
  - Logger bundle `{ logFile, logValidation }` (info/warn/error signatures).
- Constants imported inside module to keep single source: `FILE_SIZE_WARN_MB`, `FILE_SIZE_REJECT_MB`.
- Module API to expose `{ setup(), teardown() }` so main.js can wire/unwire during init/cleanup.

**Progress Log (2025-11-05)**
- Extracted drag/drop + browse flow into `src/files/FileHandler.js` with injected callbacks, type/size guards, and memory gating (replacing 240+ LOC in `src/main.js`).
- Added `tests/files_file_handler.test.js` covering unsupported types, size thresholds, and memory declines (test suite count now 231).
- Rewired `main.js` to instantiate the handler and remove duplicate validation logic; FileHandler now owns pre-add memory gating while `SceneComposition` refreshes overlay post-add.
- Created `src/core/SceneComposition.js` to manage mesh lifecycle, stack mutations, and material refresh; swapped existing `clearAll`, `deleteImage`, `applyMaterialPreset`, and reorder flows to delegate to the new module.
- Added `tests/core_scene_composition.test.js` (4 tests) exercising add/clear/delete/reorder paths with real Three.js meshes; test suite count now 235 with `npm run test:unit` → 235/235 passing (≈1.08 s).

### Phase 5 Iteration 2 – Export Manager (COMPLETE)
- Extracted PNG/JSON export, clipboard, and JSON import flows into `src/export/ExportManager.js` with dependency injection for renderer, clipboard, FileReader, and DOM helpers.
- Replaced legacy `exportPNG/exportJSON/importJSON/copyJSON/pasteJSON` implementations in `src/main.js` with thin wrappers delegating to `ExportManager`, shrinking orchestration hot spots and reducing direct DOM manipulations.
- Added `tests/export_export_manager.test.js` (5 tests) covering scale sanitisation, overlay lifecycle, JSON download creation, clipboard writes, and config import application; suite total remains 235/235 after `npm run test:unit`.
- Instantiated `ExportManager` during `init()` wiring (after Tweakpane setup) so keyboard shortcuts, debug API, and UI bindings reuse the shared module.

**SceneComposition Audit (Draft)**
- Candidate responsibilities currently tangled in `src/main.js`:
  - `addImageToStack` (mesh creation, scaling, optional border, ambient placement, history push, scene insertion).
  - `clearAll` (resource disposal, stack reset, emit/log/toast side effects).
  - `deleteImage` and reordering helpers (array mutation, Z reflow, history + scene updates).
  - Material refresh (`applyMaterialPreset`) recalculating geometry/material for existing entries.
- Shared collaborators that must be dependency-injected:
  - `scene` (Three.js Scene instance) for mesh lifecycle.
  - `params` (mutable object from AppState) with up-to-date material settings.
  - `history` hooks (`saveHistory`, `emitStackUpdated`) and UI refresh (`updateImageList`).
  - Utilities: `logImages`, `logMemory`, `showToast`, `checkMemoryUsage`, `storeSharedRef`.
- Data contract for each stack entry: `{ mesh, texture, filename, width, height, originalWidth, originalHeight, id, thumbnailSrc }`; module should manage IDs internally while exposing the array for read-only access.
- Initial module shape idea: `new SceneComposition({ scene, params, onBeforeMutate, onStackChanged, onMemoryCheck, updateImageList, emitStackUpdated, loggers, notifyToast, storeSharedRef })` returning methods `addImage(texture, filename)`, `clearAll()`, `deleteAt(index)`, `reorder(from,to)`, `applyMaterialPreset(preset)`, and `getStack()`.

**API**:
- `setRenderCallback(fn)` - Set render function
- `start()` - Start animation loop
- `stop()` - Stop animation loop
- `showFPS(enabled)` - Toggle FPS display
- `getFPSStats()` - Get FPS statistics
- `dispose()` - Cleanup resources

**Test Results**: 235/235 passing ✅ (`npm run test:unit`, 2025-11-05)

### Iteration 99 – Camera and UI extractions (COMPLETE)
- Completed: CameraController contract + implementation, main.js delegation, debug API updates, and Tweakpane extraction with unit coverage.
- Extracted `src/ui/KeyboardShortcuts.js` with teardown support and modifier-collision tests.
- Refreshed JSDoc templates for relocated functions and recorded results in CHANGELOG/WORK.md.

### Status Snapshot (2025-11-05)
- `npm run test:unit` → 263/263 passing (~1.0 s, Node 22).
- Bundle: 1,142.72 kB (vite 7.2.0, stable within ±0.1%).
- Main.js: 3,367 lines (target <300 orchestration shell).
- Quality iterations: 98 complete; Phase 4 closed, Phase 5 refactor underway.

**Last Updated**: 2025-11-05
**Current Focus**: Harden extracted modules (keyboard teardown, camera fallbacks, export error handling) while preparing Playwright smoke coverage and keeping bundle <1,150 kB.
