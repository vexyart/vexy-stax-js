# <!-- this_file: CHANGELOG.md -->
# Changelog

## [0.2.0] - 2025-11-05

### Verification
- 2025-11-06 — npm run test:unit: 294/294 passing (≈1.3 s, Node 22); viewpoint preset optimization complete; all camera positions updated for better layer readability.
- 2025-11-06 — npm run test:unit: 295/295 passing (≈1.16 s, Node 22); quality improvements complete - added viewpoint validation, memory formatting edge cases, and viewpoint integration test.
- 2025-11-05 15:51 UTC — `npm run test:unit`: 294/294 passing (≈0.90 s, Node 22); new SceneComposition border/thickness tests plus FileHandler `dataTransfer.types` drag coverage added; Playwright smoke still disabled.
- 2025-11-05 15:43 UTC — `npm run test:unit`: 291/291 passing (≈0.96 s, Node 22); debounce timer remains slowest (~102 ms); Playwright smoke still disabled.
- 2025-11-05 15:45 UTC — `npm run test:unit`: 285/285 (≈1.05 s); added FileHandler overlay, SceneComposition rebuild, and MemoryMonitor confirm suites.
- 2025-11-05 15:28 UTC — `npm run test:unit`: 263/263 (≈0.95 s); sanity check of `src/main.js`, `src/camera/CameraController.js`, `src/export/ExportManager.js` verified wiring.
- 2025-11-05 15:23 UTC — `npm run test:unit`: 285/285 (≈0.89 s); MemoryMonitor, ToastService, SettingsManager suites landed; ExportManager pixel-ratio reset reconfirmed.
- 2025-11-05 15:00 UTC — `npm run test:unit`: 263/263 (≈1.0 s); `/test` sweep ahead of `/report`.
- 2025-11-05 14:55 UTC — `npm run test:unit`: 263/263 (≈1.0 s); CameraController fallback/FOV guard + ExportManager import/paste error surfacing.
- 2025-11-05 14:50 UTC — `npm run test:unit`: 263/263 (≈1.0 s); post-extraction regression sweep stayed green.
- 2025-11-05 14:46 UTC — `npm run test:unit`: 263/263 (≈1.0 s); KeyboardShortcuts teardown listeners, CameraController front fallback, ExportManager error recovery.
- 2025-11-05 — `npm run test:unit`: 263/263 (≈1.0 s); added KeyboardShortcuts `/` alias + Tweakpane Defaults cancel regressions; bundle 1,142.72 kB (±0.1%).
- 2025-11-05 — `npm test`: unit suite 263 pass; Playwright stage timed out after 124 s (browser smoke skipped).
- 2025-11-05 — `npm run test:unit`: 260/260 (≈0.85 s); KeyboardShortcuts (+7) and Tweakpane (+6) additions; bundle 1,142.72 kB (±0.1%).
- 2025-11-05 14:02 UTC — `npm run test:unit`: 247/247 (0.78 s); bundle 1,142.72 kB (−0.67 kB vs vite 7.2.0 upgrade); coverage helpers 100%, core 96.41%, utils 97.22%; WebGL recovery + API validation reconfirmed.
- 2025-11-05 — `uvx hatch test`: exit 5 (Python suite absent); repository unchanged.

### Phase 5 – main.js Decomposition
- `src/camera/CameraController.js`: extracted mode/viewpoint orchestration; `tests/camera_camera_controller.test.js` (+6) cover mode switches, telephoto FOV, zoom sync, centering, fallback.
- `src/memory/MemoryMonitor.js`: modularised GPU estimate + toast/confirm logic; `tests/memory_memory_monitor.test.js` (+5) guard cooldown, critical prompts, overlay reacquisition, formatting.
- `src/ui/TweakpaneSetup.js`: pane wiring for background, camera, presets, JSON tools, hero-shot playback; `tests/ui_tweakpane_setup.test.js` (+10) verify plugin registration + callbacks.
- `src/ui/KeyboardShortcuts.js`: help overlay + listener teardown isolated; `tests/ui_keyboard_shortcuts.test.js` (+11) check aliases, destructive confirms, animation cancel, cleanup.
- `src/ui/ToastService.js`: injectable toast factory; `tests/ui_toast_service.test.js` (+3) cover styling, timers, z-index defaults.
- `src/files/FileHandler.js`: drag/drop + browse intake with validation + 500 MB gate; `tests/files_file_handler.test.js` (+4) assert type/size/memory declines.
- `src/core/SceneComposition.js`: mesh lifecycle, reorder, material presets; `tests/core_scene_composition.test.js` (+4) keep 235/235 coverage.
- `src/export/ExportManager.js`: PNG/JSON export, clipboard, overlay cleanup unified; `tests/export_export_manager.test.js` (+6) check scale sanitisation, metadata, clipboard, import recovery.
- `src/main.js`: applied pending JSDoc templates for export/settings/camera/history/memory helpers and added reliability tests for CameraController fallbacks + ExportManager error toasts.
- `src/settings/SettingsManager.js`: modular load/save/reset with injected storage + alerts; `tests/settings_settings_manager.test.js` (+5) cover storage loss, snapshots, quota recovery, defaults.
- Tests-only: expanded `tests/core_scene_composition.test.js` with border mesh and BoxGeometry thickness coverage (+2) and `tests/files_file_handler.test.js` with `dataTransfer.types` drag handling (+1).

### UX Improvements
- **Viewpoint Optimization (2025-11-06)**: Updated all camera viewpoint presets (`src/core/constants.js`) for better layer readability and clearer separation:
  - Beauty: repositioned from `{x:600, y:400, z:700}` to `{x:-1280, y:-40, z:1400}` for readable 3/4 view
  - Top: increased from `{x:0, y:800, z:100}` to `{x:0, y:1200, z:200}` for better depth perception
  - Isometric: adjusted to `{x:-900, y:900, z:900}` for true isometric from improved angle
  - 3D-Stack: enhanced to `{x:-800, y:400, z:1000}` for better depth emphasis
  - Side: updated to `{x:-1400, y:0, z:200}` for side view with slight perspective
  - All viewpoints now provide more face-on visualization with reduced perspective distortion, making individual layers easier to read and distinguish.

### Bug Fixes
- Restored drag-and-drop slide loading after RenderLoop extraction by reinstating FPS overlay tracking inside `src/main.js`; regression cleared with `npm run test:unit` (227 tests at fix time).
- `src/export/ExportManager.js`: now always restores original pixel ratio in a `finally` block and re-renders only on success, ensuring failed exports reset renderer state (covered by `tests/export_export_manager.test.js`).

### Phase 4 – Modularization & Quality
- Module extraction: moved animation loop + FPS monitor into `src/core/RenderLoop.js` (244 lines), shrinking `src/main.js` 3,455→3,367 (−88) and adding 20 tests with JSDoc coverage.
- Documentation & metadata: delivered complete JSDoc (examples/`@throws`) for `AppState`, `EventBus`, `sharedState`, `studioSizing`, `ordering`; `this_file` metadata in 43/43 source/test files plus 9 dotfiles; expanded npm help docs (218 tests), package.json metadata, `.npmignore`; compressed README 888→194 (−78%); updated LICENSE; documented dependency rationale in `DEPENDENCIES.md`; published `BROWSER_COMPATIBILITY.md` and `PERFORMANCE.md`; added `npm run clean`; removed 21 backups (`STATUS.md`, `REFACTOR_PLAN.md`, `QUICKSTART.md`, `AGENTS.md`, `GEMINI.md`, `LLXPRT.md`, `QWEN.md`) saving 119 kB; hardened `.gitignore`; introduced `.gitattributes` enforcing LF endings.
- Constants & planning: introduced TOAST_DURATION_INFO/SUCCESS/WARNING/ERROR, CAMERA_FAR_PLANE, Z_INDEX_MODAL, BYTES_PER_MB (removed 25 magic numbers); produced `main_js_complexity.md` (77 functions, one >50-line handler) and `main_js_jsdoc_templates.md` (18 templates with `@param`, `@returns`, examples); extended `this_file` tracking to 31 files; logged WORK.md tasks 17–28; resynchronised documentation (README compression, npm help 208 tests, LICENSE update); aligned PLAN.md with Phase 4 progress; drafted v0.2.0 release checklist with metrics template; revalidated WebGL recovery, resource cleanup, input validation; configured npm entry points and `.editorconfig`.
- Testing (+108, 110→218): added +22 validation tests (AppState/EventBus/sharedState null/undefined/empty guards), +8 configuration tests (material/viewpoint presets, shader constants, lighting ranges), +14 helper tests (calculateLuminance, clamp, lerp, formatFileSize, deepClone, generateId), +9 error-message tests (function prefixes, TypeError/RangeError consistency), +5 immutability tests (MAIN_LIGHT, FILL_LIGHT, HEMISPHERE, FLOOR_BASE_MATERIAL, EVENTS), +5 helper coverage tests (getAdaptiveFloorColor, debounce → helpers.js 100%), +4 logger prefix tests, +5 new-constant tests (TOAST_DURATION*, CAMERA_FAR_PLANE, Z_INDEX_MODAL, BYTES_PER_MB), +6 constant coverage tests (FILE_SIZE_*, MAX_HISTORY, FPS_WARNING_THRESHOLD, MEMORY_WARNING_COOLDOWN, FLOOR_*, REFLECTION_*, MAX_LOAD_RETRIES, MAX_DIMENSION_PX, DEBOUNCE_DELAY_MS), +10 API guard tests (exportPNG scale/type validation, showFPS boolean coercion, importJSON structure/extreme values/NaN handling); enforced c8 thresholds 80/80/75 with HTML/text/lcov.
- Logging: `src/utils/logger.js` powers 19 module loggers (Init, Lighting, Floor, Images, Camera, UI, API, File, Export, Cleanup, WebGL, Memory, History, Resize, Retry, Validation, Keyboard, Debug API, Settings); console usage 145→7 (1 public help overlay, 6 `[RenderLoop]` debug statements); 38 console calls remain only in docs.
- Build & project health: maintained 227/227 passing tests (+117 vs baseline 110, including 5 integration suites); tracked `src/main.js` at 3,367 lines; completed 98 quality iterations covering documentation sync, health dashboards, vite 7.2.0 verification, timestamp audits, `.documentation-index` alignment, README vite version update, package.json validation, test performance baseline, git hygiene, `.gitattributes` enforcement, `.keyboard-shortcuts` reference; ensured 52/52 files include `this_file`; documented 16 test suites with JSDoc; confirmed README 194 lines, BROWSER/PERFORMANCE guides published, legacy docs trimmed (16→9, −119 kB); revalidated WebGL recovery, resource disposal, input validation; guaranteed all 36 exported constants have direct tests; finalised npm export map + `.editorconfig`; Iterations 76–79 added documentation verification, four example JSON assets, nine tracked dot-docs, git sync, refreshed build artefact `index-D0H6xQ20.js`.

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
