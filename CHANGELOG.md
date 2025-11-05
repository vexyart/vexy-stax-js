# <!-- this_file: CHANGELOG.md -->
# Changelog

## [0.2.0] - 2025-11-05

### Phase 4: Modularization & Quality

**Module Extraction**:
- RenderLoop.js: 244 lines extracted (animation loop, FPS monitoring), integrated into main.js (-88 lines, 3,455→3,367)
- +20 tests, comprehensive JSDoc with usage examples

**Documentation**:
- JSDoc: 5 core utilities (AppState, EventBus, sharedState, studioSizing, ordering) with examples
- Metadata: this_file comments (43/43 files), npm help command (218 tests), package.json metadata, .npmignore
- README: Compressed from 888→194 lines (-78%, now meets <200 line guideline), comprehensive test guide
- LICENSE: Added copyright notice "Copyright 2025 Adam Twardoch / VexyArt" (was placeholder)
- DEPENDENCIES.md: All 8 packages documented (5 prod + 3 dev) with why chosen, key features
- BROWSER_COMPATIBILITY.md: Comprehensive browser requirements (227 lines) - Chrome 90+, Edge 90+, Firefox 88+, Safari 14+, WebGL 1.0, ES6+ modules, all required APIs
- PERFORMANCE.md: Comprehensive performance guide (400+ lines) - monitoring tools, optimization techniques, troubleshooting, benchmarks, developer tips, performance checklist
- Cleanup: npm run clean script, removed 21 backup files + 7 obsolete/duplicate docs (-119K total), enhanced .gitignore
  - Obsolete docs removed (Iteration 23): STATUS.md, REFACTOR_PLAN.md, QUICKSTART.md (-51K)
  - Duplicate AI instruction files removed (Iteration 24): AGENTS.md, GEMINI.md, LLXPRT.md, QWEN.md (-68K)
- Cross-platform: .gitattributes for consistent LF line endings (complements .editorconfig)

**Code Quality** (Iterations 13-24):
- Constants: Added 7 new constants (TOAST_DURATION_*, CAMERA_FAR_PLANE, Z_INDEX_MODAL, BYTES_PER_MB), eliminated 25 magic numbers
- Analysis: main_js_complexity.md (77 functions, 1 >50 lines, complexity hotspots documented)
- Templates: main_js_jsdoc_templates.md (18 function templates with @param/@returns/examples)
- Metadata: this_file tracking added to all 31 files (30 source + 1 config)
- Work history: Tasks 17-28 (Iterations 13-25) fully documented in WORK.md
- Documentation sync: README compressed 888→194 lines, npm help updated to 208 tests, LICENSE copyright added
- PLAN.md alignment: Updated Phase 4 status with 25 iterations complete
- Release preparation: Added v0.2.0 checklist with quality metrics and release notes template
- Robustness verification: WebGL context recovery, resource cleanup, input validation (Iteration 19)
- Package configuration: npm entry points (main, module, exports, files), .editorconfig (Iteration 21)

**Testing** (+108 tests: 110→218):
- Validation: +22 tests (AppState/EventBus/sharedState edge cases, null/undefined/empty inputs)
- Config: +8 tests (material/viewpoint presets, shader constants, lighting ranges)
- Helpers: +14 edge cases (calculateLuminance, clamp, lerp, formatFileSize, deepClone, generateId)
- Error messages: +9 tests (function name prefixes, TypeError/RangeError consistency)
- Immutability: +5 deep freeze tests (MAIN_LIGHT, FILL_LIGHT, HEMISPHERE, FLOOR_BASE_MATERIAL, EVENTS)
- Helper coverage: +5 tests (getAdaptiveFloorColor, debounce) → helpers.js 100% coverage
- Logger: +4 tests (prefix validation)
- New constants: +5 tests (TOAST_DURATION values/types, CAMERA_FAR_PLANE, Z_INDEX_MODAL, BYTES_PER_MB)
- Untested constants: +6 tests (FILE_SIZE_*, MAX_HISTORY, FPS_WARNING_THRESHOLD, MEMORY_WARNING_COOLDOWN, FLOOR_*, REFLECTION_*, MAX_LOAD_RETRIES, MAX_DIMENSION_PX, DEBOUNCE_DELAY_MS)
- API input validation: +10 tests (exportPNG scale validation, showFPS boolean handling, importJSON validation, extreme values, string coercion attacks, NaN edge case)
- Coverage: c8 tool, thresholds 80/80/75%, HTML/text/lcov reports

**Logging** (144 of 145 migrated to logger, 99.3%):
- logger.js utility with createLogger(), 19 module loggers
- Migration: 145→7 actual console calls (main.js logger migration complete, RenderLoop uses console for debug output)
- Modules: Init, Lighting, Floor, Images, Camera, UI, API, File, Export, Cleanup, WebGL, Memory, History, Resize, Retry, Validation, Keyboard, Debug API, Settings
- Remaining: 7 intentional console calls (1 user-facing help(), 6 RenderLoop debug with [RenderLoop] prefix)
- Note: 38 console calls in JSDoc examples (not actual code)

**Build Status**:
- Tests: 227/227 passing ✅ (+117 from baseline of 110, includes 5 integration tests)
- Build: 1,142.72 kB (stable, improved -0.67 kB from vite 7.2.0 upgrade)
- Coverage: helpers.js 100%, core 96.41%, utils 97.22%
- Main.js: 3,367 lines (-88 from original 3,455)
- Quality iterations: 92 complete ✅ **Phase 4 COMPLETE** (Iterations 89-92: documentation sync & project health dashboard, documentation completeness & cleanup, end-of-Phase-4 comprehensive metrics baseline, post-Phase-4 quality maintenance with vite 7.2.0 upgrade and test documentation timestamps)
- File tracking: 52/52 files with this_file comments (43 source/test + 9 dot documentation files)
- Test suites: 16 suites with comprehensive JSDoc headers documenting purpose and scope
- Documentation: README 194 lines (was 888, -78%), LICENSE copyright, all dependencies documented, BROWSER_COMPATIBILITY.md (227 lines), PERFORMANCE.md (400+ lines), obsolete/duplicate docs removed (16→9 files, -119K total)
- Code robustness: WebGL recovery verified, resource cleanup confirmed, input validation audited, API input validation comprehensive
- Constant coverage: All 36 exported constants now have validation tests
- Package ready: npm entry points configured, .editorconfig for code style consistency
- Recent improvements (Iterations 76-79): Documentation verification, 4 example JSON files added, 9 dot documentation files tracked, git synchronization (pushed to origin), build artifacts updated (index-D0H6xQ20.js)

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
