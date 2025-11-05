# <!-- this_file: CHANGELOG.md -->
# Changelog

## [0.2.0] - 2025-11-05

### Verification
- `npm run test:unit` → 235/235 passing (Node 22, 2025-11-05); bundle steady at 1,142.72 kB (±0.1 % across 98 iterations, -0.67 kB from vite 7.2.0 upgrade); coverage holds at helpers.js 100 %, core 96.41 %, utils 97.22 %; WebGL recovery, resource cleanup, and API input validation reconfirmed.

### Phase 5 – main.js Decomposition
- Added `src/files/FileHandler.js` to own drag/drop + browse intake with injected callbacks, size/type validation, and memory gating, removing duplicate logic from `src/main.js`; shipped `tests/files_file_handler.test.js` (+4 tests, suite total 231/231 green via `npm run test:unit`).
- Extracted mesh lifecycle management into `src/core/SceneComposition.js` handling clear/delete/reorder/material presets; added `tests/core_scene_composition.test.js` (+4 tests, suite total 235/235 green via `npm run test:unit`).

### Bug Fixes
- Restored drag-and-drop slide loading after RenderLoop extraction by reinstating FPS overlay state tracking inside `src/main.js`; regression verified with `npm run test:unit` (227 tests at time of fix).

### Phase 4 – Modularization & Quality
- **Module extraction**: Moved animation loop and FPS monitoring into `src/core/RenderLoop.js` (244 lines), shrinking `src/main.js` 3,455→3,367 (-88) and adding 20 dedicated tests plus usage-oriented JSDoc.
- **Documentation**: Authored full JSDoc (with examples and @throws) for `AppState`, `EventBus`, `sharedState`, `studioSizing`, `ordering`; ensured `this_file` metadata across 43/43 source/test files plus 9 dotfiles; expanded npm help command docs (218 tests), package.json metadata, and `.npmignore`; compressed README 888→194 lines (-78 %); updated LICENSE with “Copyright 2025 Adam Twardoch / VexyArt”; recorded rationale for all 8 dependencies (5 prod, 3 dev) in `DEPENDENCIES.md`; published `BROWSER_COMPATIBILITY.md` (227-line requirements for Chrome 90+/Edge 90+/Firefox 88+/Safari 14+, WebGL 1.0, ES6 modules) and `PERFORMANCE.md` (400+ lines covering monitoring, optimisation, troubleshooting, benchmarks, checklist); added `npm run clean`; deleted 21 backup files plus STATUS.md, REFACTOR_PLAN.md, QUICKSTART.md, AGENTS.md, GEMINI.md, LLXPRT.md, QWEN.md (total -119 KB) and hardened `.gitignore`; introduced `.gitattributes` enforcing LF line endings.
- **Code quality (Iterations 13–24)**: Added constants TOAST_DURATION_INFO/SUCCESS/WARNING/ERROR, CAMERA_FAR_PLANE, Z_INDEX_MODAL, BYTES_PER_MB (removing 25 magic numbers); produced `main_js_complexity.md` (77 functions, single >50-line handler) and `main_js_jsdoc_templates.md` (18 templates with @param/@returns/examples); extended `this_file` tracking to all 31 monitored files; logged WORK.md tasks 17–28; resynchronised documentation (README compression, npm help 208 tests, LICENSE update); aligned PLAN.md with Phase 4 progress; drafted v0.2.0 release checklist with metrics + notes template; revalidated WebGL recovery, resource cleanup, input validation (Iteration 19); configured npm entry points (main, module, exports, files) and `.editorconfig` guidelines (Iteration 21).
- **Testing (+108, 110→218)**: Added +22 validation tests (AppState/EventBus/sharedState null/undefined/empty guards), +8 configuration tests (material/viewpoint presets, shader constants, lighting ranges), +14 helper tests (calculateLuminance, clamp, lerp, formatFileSize, deepClone, generateId), +9 error-message tests (function prefixes, TypeError/RangeError consistency), +5 immutability tests (MAIN_LIGHT, FILL_LIGHT, HEMISPHERE, FLOOR_BASE_MATERIAL, EVENTS), +5 helper coverage tests (getAdaptiveFloorColor, debounce → helpers.js 100 %), +4 logger prefix tests, +5 new-constant tests (TOAST_DURATION*, CAMERA_FAR_PLANE, Z_INDEX_MODAL, BYTES_PER_MB), +6 formerly untested constant checks (FILE_SIZE_*, MAX_HISTORY, FPS_WARNING_THRESHOLD, MEMORY_WARNING_COOLDOWN, FLOOR_*, REFLECTION_*, MAX_LOAD_RETRIES, MAX_DIMENSION_PX, DEBOUNCE_DELAY_MS), +10 API guard tests (exportPNG scale/type validation, showFPS boolean coercion, importJSON structure/extreme values/NaN handling); enforced c8 thresholds 80/80/75 with HTML/text/lcov output.
- **Logging (99.3 % migrated)**: Introduced `src/utils/logger.js` with `createLogger()` powering 19 module loggers (Init, Lighting, Floor, Images, Camera, UI, API, File, Export, Cleanup, WebGL, Memory, History, Resize, Retry, Validation, Keyboard, Debug API, Settings); reduced console usage 145→7 (1 public help overlay, 6 `[RenderLoop]` debug statements); preserved 38 console calls within documentation examples only.
- **Build & project health**: Maintained 227/227 passing tests (+117 vs. baseline 110, including 5 integration suites); tracked main.js at 3,367 lines; completed 98 quality iterations covering documentation synchronisation, project health dashboards, vite 7.2.0 upgrade verification, timestamp audits, `.documentation-index` alignment, README vite version update, package.json validation, test performance baseline, git hygiene, `.gitattributes` enforcement, `.keyboard-shortcuts` reference; ensured 52/52 files include `this_file`; documented 16 test suites with descriptive JSDoc headers; confirmed README 194 lines, BROWSER/PERFORMANCE guides published, legacy docs trimmed (16→9, -119 KB); revalidated WebGL recovery, resource disposal, and input validation; guaranteed all 36 exported constants have direct tests; finalised npm export map + `.editorconfig`; Iterations 76–79 added documentation verification, four example JSON assets, nine tracked dot-docs, git sync, and refreshed build artefact `index-D0H6xQ20.js`.

## [0.1.0] - 2025-11-05

### Phase 3: Documentation & Code Quality ✅
- JSDoc: Full type annotations for constants.js (~300 lines)
- Tests: +17 immutability tests for Object.freeze() validation
- Memory: Zero leaks confirmed - all 11 event listeners tracked/cleaned
- Result: 110/110 tests passing, 1,149 kB build

### Phase 2: UI & Ambient Mode ✅
- Ambient: Removed floor rendering, fixed color washout (envMapIntensity 0.0)
- UI: Dark theme (#38383d/#29292e), floor 1% opacity, 120px left panel
- Result: 93/93 tests passing

### Phase 1: Core Refactoring ✅
- Modules: SceneManager, LightingManager, FloorManager (758 lines extracted)
- Tests: +61 tests (scene:8, helpers:20, camera:10, recovery:23)
- Utils: src/utils/helpers.js (validation, calculations, cloning)
- Layout: 3-column (thumbnails, studio, controls), DPR-aware retina sizing
- Core: constants.js, EventBus, sharedState.js (singleton references)

### Initial Features ✅
- Camera: 4 modes (Perspective, Ortho, Iso, Telephoto), 7 viewpoint presets
- Export: PNG 1x/2x/4x, JSON with base64, clipboard support, transparent BG
- Materials: 10 PBR presets, custom shader reflections, VSM shadows
- UI: Tweakpane tabs (File/Image/Video), drag/drop, thumbnail reordering
- Stack: Three.js r181, Tweakpane 4.0.5, Vite 7.1.12

### Technical
- Tests: Node.js test runner, 110/110 unit tests passing
- Build: Vite ES modules, 1,149 kB bundle
- WebGL: Context recovery, alpha channel, high-DPI, tracked event cleanup
