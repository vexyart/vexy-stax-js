# <!-- this_file: CHANGELOG.md -->
# Changelog

## [0.2.5] - 2025-12-22

### SCENE.md §1: Tallest-Based Vertical Alignment
- **Dynamic vertical positioning**: Tallest slide centered at Y=0, all slides bottom-aligned
- **Floor follows slides**: Floor positioned 1px below tallest slide's bottom edge
- **Implementation**: `#recalculateLayout()`, `getFloorY()` in SceneComposition.js
- **Callbacks**: `onLayoutChanged`, `onImportComplete`, `onMaterialsUpdated` for cross-module coordination

### E2E Test Infrastructure Fixes
- **Playwright baseURL fix**: Changed from `http://127.0.0.1:4173` to `http://127.0.0.1:4173/vexy-stax-js/` to match Vite base config
- **Automation bridge fix**: Moved `setupPlaywrightBridge()` call inside `init()` - module-level calls weren't exposing the global in production builds
- **All 4 E2E tests passing**: DPR canvas, drop overlay, thumbnail strip, automation bridge

### New E2E Test
- **Slide positioning test**: Verifies SCENE.md §1 implementation (tallest centered, all bottom-aligned)

### Tests
- **370/370 unit tests**, **5/5 E2E tests** passing

---

## [0.2.4] - 2025-12-22

### SCENE.md §2: First-slide Defaults
- **Auto-apply defaults when first slide added**: Beauty viewpoint, neutral material, ambience off, auto z-spacing
- **Implementation**: `onFirstSlide` callback in SceneComposition, wired in main.js
- **Auto z-spacing formula**: `STUDIOWIDTH / (NUM_SLIDES + 2)` (e.g., 960/3 = 320 for 1 slide)

### JSON Import Y-Position Fix
- **Slides now stand ON floor**: Fixed missing Y position in ExportManager JSON loading
- **Root cause**: `#loadTextureWithRetry()` only set `mesh.position.z`, never `position.y`
- **Fix**: Added `mesh.position.y = FLOOR_Y + (imageConfig.height / 2)`

### Material Side Consistency
- **All slides use FrontSide**: Changed remaining DoubleSide usages in ExportManager and main.js

### Tests
- **370/370 passing** (+2 tests for onFirstSlide callback, +1 test for JSON Y-position fix)

---

## [0.2.3] - 2025-12-22

### Camera Targeting Fix
- **Content-centered camera**: Camera now looks at content center (tallest slide's vertical midpoint) instead of origin (0,0,0)
  - Root cause: Slides sit on floor at Y=0, centers at Y=height/2, but camera targeted Y=0
  - Result: Slides appeared in upper half of frame with excessive space below
- **Fixed in**: `CameraController.js` (setViewpoint, mode configs), `main.js` (JSON loading, fallbacks)
- **New helper**: `getContentCenter()` calculates bounding box center of image stack
- **All viewpoints affected**: Beauty, Top, Iso, 3D-Stack, Side, custom positions

### Ambience Toggle Y-Jump Fix
- **Removed incorrect camera recentering**: Slides no longer jump when toggling Ambience slider
  - Root cause: Initial fix incorrectly recentered camera, which overrode user's current view angle
  - Final fix: Just call `controls.update()` after mesh rebuilding - meshes are at same positions so existing target remains valid
- **World matrix sync**: `AmbienceManager.updateMaterials()` calls `mesh.updateMatrixWorld(true)` after positioning
- **Tests**: 367/367 passing

---

## [0.2.2] - 2025-12-22

### Camera Controls
- **5-slider system**: FOV (30-120°), Tele (0.1-3x), Z (distance 100-3000), X/Y (pan ±480/±270)
- **X/Y offset fix**: Internal tracking prevents Tweakpane binding race condition
- **Pinch-zoom syncs Z**: OrbitControls dolly syncs with distance slider
- **Hero viewpoint reset**: Resets X/Y to 0, calculates fit-to-frame distance

### Z-Spacing Fix
- **Auto-spacing now works**: `getEffectiveZSpacing()` callback handles null→auto calculation
- **Fixed in**: SceneComposition (3 locations), ExportManager (1 location)
- **Root cause**: `null * index = 0` stacked all slides at z=0 on load

### Materials
- **Reduced to 3 presets**: Glossy, Neutral, Matte (removed 7 others)

### Floor Simplification
- **Floor at Y=0**: Slides sit on floor plane (was Y=-250)
- **Simplified FloorManager**: MeshBasicMaterial, 5% opacity, rgba(236,236,236)
- **Cleanup**: Removed REFLECTION_*, FLOOR_BASE_MATERIAL, SoftReflectorShader

### UI
- **Load Example button**: Creates 3 gradient layers for quick onboarding
- **Floor color picker**: RGBA color control in Studio panel, always visible
- **Drop overlay**: Enhanced with pulsing dashed border animation
- **Label renamed**: "Distance" → "Layer Depth" for clarity

### Accessibility (WCAG 2.1) - All Critical Items Complete
- **Keyboard camera controls**: Arrow keys rotate, Shift+arrows pan, +/- zoom
- **Focus indicators**: Global `:focus-visible` CSS with 2px solid #4a9eff outline
- **Canvas aria-label**: Dynamic description (image count, viewpoint, material, keyboard hints)
- **Actionable errors**: Error messages now include specific fix suggestions
- **Modal ARIA**: `role="dialog"`, `aria-modal="true"` on keyboard help and export overlays
- **Skip links**: "Skip to canvas" and "Skip to controls" for keyboard navigation (WCAG 2.4.1)
- **Landmark regions**: Proper ARIA roles (main, complementary) with labels
- **Reduced motion**: CSS and JS respect `prefers-reduced-motion` (WCAG 2.3.3)
- Help overlay updated with new shortcuts

### UX Improvements
- **Auto-save**: Settings saved to localStorage every 30 seconds
- **Error toast duration**: Increased to 10s for readability (was 5s)
- **Visible toolbar**: Undo/Redo/Reset Camera/Help buttons above canvas
- **Toast icons**: All toast types now include icons (✓✕⚠ℹ) - don't rely on color alone
- **Text contrast fix**: Low-contrast text updated to WCAG 4.5:1 ratio
- **UI tooltips**: Native title tooltips on all Tweakpane controls (hover for help)
- **Progress overlay**: Now shown for all PNG exports (was only 2x+)
- **Loading indicator**: Toast shown when loading multiple files
- **Camera control hints**: First 3 canvas interactions show progressive hints (drag, keyboard, ? for help)

### Critical Bug Fixes (Session 13)
- **Material rescaling fix**: Changing material no longer shrinks slides to 1/4 size
  - Root cause: `#createMeshFromTexture` applied MAX_THUMBNAIL_DIMENSION (400) clamping even when explicit `overrideDimensions` were provided
  - Fix: Skip clamping when `overrideDimensions` provided (`SceneComposition.js:253-263`)
- **Hero Shot z-fighting fix**: Collapsed slides now maintain MIN_LAYER_GAP (3px) spacing
  - Root cause: `animation.js` and `main.js` used local `MIN_SLIDE_GAP=0.5` instead of centralized constant
  - Fix: Import and use `MIN_LAYER_GAP` from constants.js
- **Y positioning fix**: Slides ALWAYS sit on floor (bottom at Y=0), regardless of ambience state
  - Root cause: Y positioning was conditional on ambience, causing shifts when toggling
  - Fix: Set Y=FLOOR_Y+height/2 unconditionally everywhere (SceneComposition, AmbienceManager, JSON loading)
- **Hero viewpoint distance fix**: Hero viewpoint now matches Hero Shot animation culmination exactly
  - Root cause: `FRONT_VIEW_PADDING` was 1.1 in main.js but 1.0 in animation.js
  - Fix: Changed main.js `FRONT_VIEW_PADDING` from 1.1 to 1.0

### Phase A1 - Hero Shot Animation Fixes (2025-12-22)
- **Z-fighting fix**: Added MIN_SLIDE_GAP (0.5) between collapsed slides during hero shot
- **Camera restoration**: Account for camera.zoom in all distance calculations
- **Fit-to-frame**: Include zoom in effective FOV calculation for correct framing
- **MIN_LAYER_GAP constant**: Increased 0.1→1 to prevent slide overlap when Layer Depth = 0

### Floor Color Fix (2025-12-22)
- **Color normalization**: `#normalizeColorComponent()` handles both 0-255 and 0-1 formats
- **Tweakpane compatibility**: Floor color picker now properly updates floor material
- **Missing callback**: Added `updateFloorColor` callback registration to TweakpaneSetup

### Hero Shot Animation Fix (2025-12-22)
- **User-initiated animations**: No longer skipped by `prefersReducedMotion()` check
- **New parameter**: `respectReducedMotion` (default: false) for explicit control

### Ambience Slider (2025-12-22)
- **Replaced checkbox with slider**: 0=off, 0.1-1.0=gradual intensity
- **Emissive scaling**: Intensity * 0.25 (0-0.25 range)
- **Ambient light scaling**: 0.3 + intensity * 0.5 (0.3-0.8 range)
- **LightingManager**: Added `setAmbientIntensity(intensity)` method

### Test Status
- **366/366 tests pass**, bundle 1,192 kB

---

## [0.2.1] - 2025-12-21

### Accessibility
- **ARIA live regions**: ToastService `role="alert"` (errors) / `role="status"` (info) - WCAG 2.1
- +3 accessibility tests

### Documentation
- **GETTING_STARTED.md**: User onboarding guide

### Developer Experience
- **build.sh/dev.sh**: Auto-open browser
- **--no-serve flag**: CI/automation support

### Test Status
- **352/352 tests pass**

---

## [0.2.0] - 2025-11-08

### Test Status
- **Latest**: 349/349 tests pass (1.94s), Node 22; bundle 1,189.47 kB
- **Python harness**: Absent by design (exit 5 when run)
- **E2E**: Playwright disabled pending harness repair

### Phase 5 – main.js Decomposition (Active)
**Progress**: main.js 3,367→2,036 lines (−39.5%, 1,331 deleted/0 added)

**Modules Extracted**:
- UI: `TweakpaneSetup.js` (10 tests), `KeyboardShortcuts.js` (11), `ToastService.js` (3)
- Files: `FileHandler.js` (9 tests, 500MB guard), `TextureLoader.js` (8 tests, retry validation)
- Core: `SceneComposition.js` (7 tests, mesh lifecycle), `HistoryManager.js` (13 tests, undo/redo)
- Export: `ExportManager.js` (6 tests, PNG/JSON/clipboard), `SettingsManager.js` (5 tests)
- Scene: `SceneManager.js`, `LightingManager.js`, `FloorManager.js`, **`AmbienceManager.js` (11 tests, material rebuilding, 2025-11-08)**

**Features**:
- Automation: `window.__vexyStaxAutomation` API for ingest/viewpoint/hero-shot
- Canvas: Locked 960×540 default, hero-shot GSAP timeline validated
- Reliability: History snapshots pre-mutation, texture loader guards, message format locked

**Quality** (2025-11-06–08):
- `constants.js`: Usage examples for MAX_HISTORY, FPS_WARNING_THRESHOLD, DEBOUNCE_DELAY_MS
- `helpers.js`: Validation errors include "Fix:" hints (42 test cases)
- Constructor guards: HistoryManager callbacks/maxSize, TextureLoader scheduleRetry
- Zero-delay coverage: TextureLoader retry branch, FileHandler summary format
- **Error consistency** (2025-11-08): All scene managers use `[Manager] Cannot action: requirement` format
- **Edge case coverage** (2025-11-08): AmbienceManager handles empty stacks, missing properties (+3 tests)
- **Integration tests** (2025-11-08): Disposal safety verified for FloorManager + AmbienceManager (+4 tests)
- **Documentation** (Iteration 120): AmbienceManager JSDoc with responsibilities, usage examples, method details
- **Constructor validation** (Iteration 120): AmbienceManager constructor tests match other managers (+6 tests)
- **Disposal order safety** (Iteration 120): Formally documented and verified for all 4 scene managers (+3 test scenarios)
- **Integration tests** (Iteration 121): SceneComposition + scene managers coordination verified (+3 tests)
- **Actionable errors** (Iteration 121): All 7 manager error messages include "Fix:" hints with specific solutions
- **Initialization docs** (Iteration 121): Manager orchestration patterns documented inline in main.js

### Phase 4 – Modularization (2025-11-05)
**Core**:
- Extracted `RenderLoop.js` (244 lines, 20 tests)
- Full JSDoc: AppState, EventBus, sharedState, studioSizing, ordering
- `this_file` tracking: 52/52 files
- Constants: TOAST_DURATION*, CAMERA_FAR_PLANE, Z_INDEX_MODAL, BYTES_PER_MB
- Logger: 19 modules, console footprint 145→7 lines

**Testing**: 110→322 tests (+212); c8 coverage 80/80/75 enforced

**Docs**: README 888→194 lines (−78%); added BROWSER_COMPATIBILITY.md, PERFORMANCE.md; removed 21 legacy docs (−119 kB)

### UX & Bug Fixes
- **Viewpoints retuned**: Beauty `{-1280,-40,1400}`, Top `{0,1200,200}`, Iso `{-900,900,900}`, 3D-Stack `{-800,400,1000}`, Side `{-1400,0,200}`
- **Drag/drop**: Restored post-RenderLoop extraction
- **Export**: Pixel ratio reset in `finally`, re-render on success only

### Automation
- GitHub Actions: Node 18, `git-auto-commit-action@v5`, deterministic builds verified

---

## [0.1.0] - 2025-11-05

### Phase 3: Documentation & Code Quality
- JSDoc: Full type annotations for constants.js (~300 lines)
- Tests: +17 immutability tests for Object.freeze()
- Memory: Zero leaks (11 event listeners tracked/cleaned)
- Result: 110/110 tests, 1,149 kB bundle

### Phase 2: UI & Ambient Mode
- Ambient: Removed floor rendering, fixed color washout (envMapIntensity 0.0)
- UI: Dark theme (#38383d/#29292e), floor 1% opacity, 120px left panel
- Result: 93/93 tests

### Phase 1: Core Refactoring
- Modules: SceneManager, LightingManager, FloorManager (758 lines extracted)
- Tests: +61 (scene:8, helpers:20, camera:10, recovery:23)
- Utils: validation, calculations, cloning in `helpers.js`
- Layout: 3-column (thumbnails, studio, controls), DPR-aware retina sizing

### Initial Features
- **Camera**: 4 modes (Perspective/Ortho/Iso/Telephoto), 7 viewpoint presets
- **Export**: PNG 1x/2x/4x, JSON with base64, clipboard, transparent BG
- **Materials**: 10 PBR presets, custom shaders, VSM shadows
- **UI**: Tweakpane tabs, drag/drop, thumbnail reordering
- **Stack**: Three.js r181, Tweakpane 4.0.5, Vite 7.1.12

### Technical
- Tests: Node.js test runner, 110/110 unit tests
- Build: Vite ES modules, 1,149 kB
- WebGL: Context recovery, alpha channel, high-DPI, event cleanup
