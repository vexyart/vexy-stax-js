# <!-- this_file: CHANGELOG.md -->
# Changelog

## [0.2.0] - 2025-11-05

### Verification
| Timestamp (UTC) | Command | Result | Notes |
| --- | --- | --- | --- |
| 2025-11-06 13:11 | `uvx hatch test` | exit 5 | Python harness not present; expected until suite exists. |
| 2025-11-06 13:09 | `npm run test:unit` | 317/317 pass | Node suite green; debounce helper ~102 ms. |
| 2025-11-06 13:07 | `uvx hatch test` | exit 5 | Python harness absent; expected while JS-only project. |
| 2025-11-06 12:59 | `uvx hatch test` | exit 5 | Python harness absent; expected while JS-only project. |
| 2025-11-06 12:56 | `npm run test:unit` | 317/317 pass (0.86 s, Node 22) | SceneComposition history + disposal validated; debounce ~102 ms. |
| 2025-11-06 12:48 | `npm run test:unit` | 314/314 pass (1.34 s, Node 22) | /test sweep; debounce ~103 ms. |
| 2025-11-06 12:43 | `npm run test:unit` | 314/314 pass (1.44 s) | Reliability slice wrap-up; HistoryManager + TextureLoader covered. |
| 2025-11-06 12:38 | `npm run test:unit` | 308/308 pass (0.85 s) | `/test` + `/report` sweep; 9 suites, none skipped. |
| 2025-11-06 12:34 | `npm run test:unit` | 305/305 pass (0.89 s) | Post-comment tidy verification. |
| 2025-11-06 12:32 | `npm run test:unit` | 305/305 pass (0.90 s) | HistoryManager + TextureLoader hardening confirmed. |
| 2025-11-06 12:24 | `npm run test:unit` | 305/305 pass (0.84 s) | `/test` + `/report` verification. |
| 2025-11-06 12:21 | `npm run test:unit` | 305/305 pass (0.85 s) | History safeguards + TextureLoader extraction. |
| 2025-11-06 12:10 | `npm run test:unit` | 299/299 pass (0.83 s) | `/test` confirmation run. |
| 2025-11-06 12:07 | `npm run test:unit` | 296/296 pass (0.90 s) | HistoryManager refactor + new suite. |
| 2025-11-06 11:54 | `uvx hatch test` | exit 5 | Python harness absent; expected while JS-only project. |
| 2025-11-08 | `npm run test:unit` | ✅ pass | Hero-shot timeline + automation bridge sanity. |
| 2025-11-07 | `npm run test:unit` | 296/296 pass (0.86–0.93 s) | Docs-build + helper messaging sweep. |
| 2025-11-06 | `npm run test:unit` | 294/294 pass (1.3 s) | Viewpoint preset optimisation + camera retune. |
| 2025-11-06 | `npm run test:unit` | 295/295 pass (1.16 s) | Viewpoint validation + memory formatting guard. |
| 2025-11-05 15:51 | `npm run test:unit` | 294/294 pass (0.90 s) | SceneComposition border/thickness + FileHandler drag-type coverage. |
| 2025-11-05 15:45 | `npm run test:unit` | 285/285 pass (1.05 s) | FileHandler overlay, SceneComposition rebuild, MemoryMonitor confirmations. |
| 2025-11-05 15:43 | `npm run test:unit` | 291/291 pass (0.96 s) | Debounce helper ~102 ms. |
| 2025-11-05 15:28 | `npm run test:unit` | 263/263 pass (0.95 s) | main.js + CameraController + ExportManager integration sanity. |
| 2025-11-05 15:23 | `npm run test:unit` | 285/285 pass (0.89 s) | MemoryMonitor, ToastService, SettingsManager suites; ExportManager pixel-ratio reset. |
| 2025-11-05 15:00 | `npm run test:unit` | 263/263 pass (1.0 s) | `/test` sweep before `/report`. |
| 2025-11-05 14:55 | `npm run test:unit` | 263/263 pass (1.0 s) | CameraController fallback/FOV guard; ExportManager error surfacing. |
| 2025-11-05 14:50 | `npm run test:unit` | 263/263 pass (1.0 s) | Post-extraction regression sweep. |
| 2025-11-05 14:46 | `npm run test:unit` | 263/263 pass (1.0 s) | KeyboardShortcuts teardown, camera fallback, export recovery. |
| 2025-11-05 | `npm run test:unit` | 263/263 pass (1.0 s) | KeyboardShortcuts `/` alias + Tweakpane defaults cancel; bundle 1,142.72 kB. |
| 2025-11-05 | `npm test` | 263 unit pass (Playwright timeout 124 s) | Browser smoke skipped; harness disabled. |
| 2025-11-05 | `npm run test:unit` | 260/260 pass (0.85 s) | KeyboardShortcuts (+7) & Tweakpane (+6) coverage; bundle steady at 1,142.72 kB. |
| 2025-11-05 14:02 | `npm run test:unit` | 247/247 pass (0.78 s) | Bundle 1,142.72 kB (−0.67 kB vs Vite 7.2.0); helper/core/utils coverage 100/96.41/97.22%; WebGL recovery + API checks. |
| 2025-11-05 | `uvx hatch test` | exit 5 | Python suite absent; repository unchanged. |

### Phase 5 – main.js Decomposition
- Studio canvas fixed at 960×540; `src/main.js` keeps legacy fallback while presets centre stacks; controller tests cover both paths.
- Hero-shot GSAP timeline collapses spacing, pauses, restores camera/stack; `tests/camera_animation.test.js` enforces determinism.
- `window.__vexyStaxAutomation` exposes slide ingest, viewpoint switching, hero-shot triggers for Playwright automation (CI bootstrap pending).
- `src/camera/CameraController.js`: mode/viewpoint orchestration extracted; `tests/camera_camera_controller.test.js` (+6) cover mode swaps, telephoto FOV, zoom sync, centring, fallbacks.
- `src/memory/MemoryMonitor.js`: GPU estimator + toast/confirm flow extracted; `tests/memory_memory_monitor.test.js` (+5) guard cooldowns, prompts, overlay reacquisition, formatting.
- `src/ui/TweakpaneSetup.js`: pane wiring consolidated for background, camera, presets, JSON tools, hero-shot playback; `tests/ui_tweakpane_setup.test.js` (+10) assert plugin registration + callbacks.
- `src/ui/KeyboardShortcuts.js`: help overlay/teardown isolated; `tests/ui_keyboard_shortcuts.test.js` (+11) cover aliases, destructive confirms, animation cancel, cleanup.
- `src/ui/ToastService.js`: injectable toast factory shipped; `tests/ui_toast_service.test.js` (+3) validate styling, timers, z-index defaults.
- `src/files/FileHandler.js`: drag/drop + browse intake keeps validation + 500 MB guard; `tests/files_file_handler.test.js` (+4) assert type/size/memory declines.
- `src/core/SceneComposition.js`: mesh lifecycle, reorder, material presets extracted; `tests/core_scene_composition.test.js` (+4) hold coverage.
- `src/export/ExportManager.js`: PNG/JSON export, clipboard, overlay cleanup unified; `tests/export_export_manager.test.js` (+6) check scale sanitisation, metadata, clipboard, import recovery.
- `src/main.js`: pending JSDoc templates applied for export/settings/camera/history/memory helpers; controller fallback + export error toast tests added.
- `src/settings/SettingsManager.js`: storage-backed load/save/reset modularised; `tests/settings_settings_manager.test.js` (+5) cover storage loss, snapshots, quota handling.
- Tests-only deltas: `tests/core_scene_composition.test.js` adds border mesh + BoxGeometry thickness checks (+2); `tests/files_file_handler.test.js` adds `dataTransfer.types` drag handling (+1).
- `src/history/HistoryManager.js`: undo/redo module with toast/log hooks; `_notify` now clones stacks, catches observer failures, emits error toast/log; `tests/history_history_manager.test.js` (+8) cover trimming, failure handling, observer guard.
- `src/files/TextureLoader.js`: retry loader extracted; constructor validates non-negative retry delays; regression ensures final delay reuse; `tests/files_texture_loader.test.js` (+5) verify success, scheduling, terminal failure, validation, reuse.

### Reliability Slice – 2025-11-06
- `src/core/SceneComposition.js`: `reorder` now captures history before mutations so undo works on reorders; added disposals + shared-state assertions. `tests/core_scene_composition.test.js` (+3) cover history capture, deletion resource cleanup, memory guard/shared-state checks with `appState.reset()` harness.
- `tests/history_history_manager.test.js`: +5 cases for `getCurrent` boundaries and constructor validation (missing callbacks, invalid `maxSize`); suite now 13 tests.
- `src/files/TextureLoader.js`: `#loadInternal` guards loaders missing `load()`, logging `[RetryingTextureLoader] Loader missing load()` and emitting toast; regression test `RetryingTextureLoader_load_when_loaderMissingLoad_then_logsErrorAndShowsToast` added.
- `src/files/TextureLoader.js`: constructor now rejects non-function `scheduleRetry` values and defaults to `setTimeout`; tests cover invalid type and zero-delay retry branch.
- `src/files/FileHandler.js`: summary warning removes leading space; regression test ensures message format (`1 file(s) rejected, 1 accepted`).

### Utility Hardening (2025-11-07)
- `src/core/constants.js`: usage examples for `MAX_HISTORY`, `FPS_WARNING_THRESHOLD`, `DEBOUNCE_DELAY_MS` improve IDE hovers.
- `src/utils/helpers.js`: validation errors now include "Fix:" hints for luminance, clamp, lerp helpers.
- `tests/utils_helpers.test.js`: asserts hint presence (suite now 42 cases).
- `tests/core_ordering.test.js`: header trimmed to emphasise drag/drop guarantees.

### Automation
- `.github/workflows/docs-build.yml`: Node 18 build with `stefanzweifel/git-auto-commit-action@v5`, skips `github-actions[bot]`, keeps `docs/` synced.
- Determinism check (2025-11-07): two `npm run build` runs yielded identical `index-Doj9iqVd.js`.

### UX Improvements
- Viewpoint presets (2025-11-06) retuned: Beauty `{600,400,700}`→`{-1280,-40,1400}`, Top `{0,800,100}`→`{0,1200,200}`, Isometric `{ -900,900,900 }` true iso, 3D-Stack `{ -800,400,1000 }`, Side `{ -1400,0,200 }`; layers render flatter with clearer separation.

### Bug Fixes
- `src/main.js`: drag/drop slide loading restored by re-linking FPS overlay after RenderLoop extraction; confirmed with `npm run test:unit` (227 tests).
- `src/export/ExportManager.js`: pixel ratio resets inside `finally`, re-render only on success; guarded by `tests/export_export_manager.test.js`.

### Phase 4 – Modularization & Quality
- RenderLoop extraction: animation loop + FPS monitor moved to `src/core/RenderLoop.js` (244 lines); `src/main.js` shrank 3,455→3,367 (−88); +20 tests landed with full JSDoc.
- Documentation & metadata: JSDoc completed for `AppState`, `EventBus`, `sharedState`, `studioSizing`, `ordering`; `this_file` recorded in 43/43 source/tests + 9 dotfiles; npm help docs expanded; README compressed 888→194 (−78%); LICENSE, `.npmignore`, `.gitignore`, `.gitattributes` refreshed; dependencies documented; `BROWSER_COMPATIBILITY.md` + `PERFORMANCE.md` published; `npm run clean` added; removed 21 legacy docs (−119 kB).
- Constants & planning: TOAST_DURATION_INFO/SUCCESS/WARNING/ERROR, CAMERA_FAR_PLANE, Z_INDEX_MODAL, BYTES_PER_MB replace 25 magic numbers; produced `main_js_complexity.md` (77 functions, one >50-line handler) and `main_js_jsdoc_templates.md` (18 templates); extended `this_file` tracking by 31 files; synced PLAN.md + WORK.md iterations 17–28; drafted v0.2.0 release checklist; reconfirmed WebGL recovery, resource cleanup, input validation; finalised npm entry map + `.editorconfig`.
- Testing (+108, 110→218): +22 validation (AppState/EventBus/sharedState null/undefined/empty guards); +8 configuration (materials/viewpoints/shaders/lighting); +14 helper (luminance/clamp/lerp/formatFileSize/deepClone/generateId); +9 error-message (prefix/TypeError/RangeError); +5 immutability (MAIN_LIGHT/FILL_LIGHT/HEMISPHERE/FLOOR_BASE_MATERIAL/EVENTS); +5 helper coverage (getAdaptiveFloorColor, debounce → helpers.js 100%); +4 logger prefix; +5 new-constant (TOAST_DURATION*, CAMERA_FAR_PLANE, Z_INDEX_MODAL, BYTES_PER_MB); +6 constant ranges (FILE_SIZE_*, MAX_HISTORY, FPS_WARNING_THRESHOLD, MEMORY_WARNING_COOLDOWN, FLOOR_*, REFLECTION_*, MAX_LOAD_RETRIES, MAX_DIMENSION_PX, DEBOUNCE_DELAY_MS); +10 API guards (exportPNG scale/type, showFPS coercion, importJSON structure/extremes/NaN); enforced c8 80/80/75 with HTML/text/lcov outputs.
- Logging: structured logger now drives 19 modules (Init, Lighting, Floor, Images, Camera, UI, API, File, Export, Cleanup, WebGL, Memory, History, Resize, Retry, Validation, Keyboard, Debug API, Settings); console footprint 145→7 (1 help overlay, 6 `[RenderLoop]` debug); remaining 38 messages only in docs.
- Build & project health: 227/227 tests (+117 vs baseline, 5 integration suites); `src/main.js` 3,367 lines; 98 iterations delivered doc sync, health dashboards, Vite 7.2.0 verification, timestamp audits, `.documentation-index` alignment, README Vite update, package.json validation, test baseline, git hygiene, `.keyboard-shortcuts` reference; 52/52 files carry `this_file`; 16 suites documented with JSDoc; README 194 lines; `BROWSER_COMPATIBILITY.md`/`PERFORMANCE.md` published; legacy docs trimmed 16→9 (−119 kB); WebGL recovery/resource disposal/input validation reconfirmed; all 36 exported constants tested; npm export map + `.editorconfig` final; Iterations 76–79 added docs verification, four example JSON assets, nine dot-docs, git sync, refreshed `index-D0H6xQ20.js`.

## [0.1.0] - 2025-11-05

### Phase 3: Documentation & Code Quality ✅
- JSDoc: full type annotations for constants.js (~300 lines).
- Tests: +17 immutability tests for Object.freeze() validation.
- Memory: zero leaks confirmed - all 11 event listeners tracked/cleaned.
- Result: 110/110 tests passing, 1,149 kB build.

### Phase 2: UI & Ambient Mode ✅
- Ambient: removed floor rendering, fixed color washout (envMapIntensity 0.0).
- UI: dark theme (#38383d/#29292e), floor 1% opacity, 120 px left panel.
- Result: 93/93 tests passing.

### Phase 1: Core Refactoring ✅
- Modules: SceneManager, LightingManager, FloorManager (758 lines extracted).
- Tests: +61 tests (scene:8, helpers:20, camera:10, recovery:23).
- Utils: `src/utils/helpers.js` (validation, calculations, cloning).
- Layout: 3-column (thumbnails, studio, controls), DPR-aware retina sizing.
- Core: constants.js, EventBus, sharedState.js (singleton references).

### Initial Features ✅
- Camera: 4 modes (Perspective, Ortho, Iso, Telephoto), 7 viewpoint presets.
- Export: PNG 1x/2x/4x, JSON with base64, clipboard support, transparent BG.
- Materials: 10 PBR presets, custom shader reflections, VSM shadows.
- UI: Tweakpane tabs (File/Image/Video), drag/drop, thumbnail reordering.
- Stack: Three.js r181, Tweakpane 4.0.5, Vite 7.1.12.

### Technical
- Tests: Node.js test runner, 110/110 unit tests passing.
- Build: Vite ES modules, 1,149 kB bundle.
- WebGL: context recovery, alpha channel, high-DPI, tracked event cleanup.
