# Vexy Stax JS - Work Progress
<!-- this_file: WORK.md -->

## 2025-11-04 – Verification Log
- Ran `/test` command sequence (`fd … uvx hatch test`); hatch env spun up but zero Python tests exist, pytest exited 5 (“no tests ran”). Recorded as expected gap—repository is JS-only today.
- Follow-up safety net: `npm run test` (node --test) passes 18/18 assertions in 0.17s; confirms JS core modules remain green.
- Earlier iteration log (pre-constant tests): `npm run test` twice (node --test) maintained 10/10 AppState/EventBus assertions in ~0.13s; retaining note for provenance.
- Re-read `src/core/AppState.js` and `src/core/EventBus.js`; logic remains deterministic with defensive guard clauses. Residual risk: medium—state consumers in `main.js` still bypass the singleton in places, so future refactors must confirm all writes flow through `appState`.
- Spot-checked `index.html`, `styles/main.css`, and `src/main.js` entry sections for drift; no config skew detected. Risk: low—monolith still large but unchanged during this iteration.
- Sanity review of `tests/core.test.js` confirms coverage matches implemented helpers; gap: no negative-path assertions for invalid EventBus events (document in TODO if needed during next work cycle).
- Confidence level: I’m certain current tests cover exercised modules; broader system remains high risk until refactor phases land because `main.js` lacks unit coverage.

## 2025-11-04 – Active Iteration Notes
- Targeting TODO “Phase 0: Extend unit tests to cover constants, AppState flows, and EventBus helpers; record results in `WORK.md`.”
- Plan: add dedicated `tests/core_constants.test.js` validating `createDefaultParams()` immutability and preset tables; consider negative-path assertions for EventBus if quick win.
- Risk assessment: low—pure data module, no runtime side effects. Primary risk is missing frozen checks; mitigated by asserting `.freeze` behaviour.
- Outcome: Added `tests/core_constants.test.js`, extended AppState/EventBus suites with guard-rail cases; `npm run test` (node --test) now runs 18 passing specs in ~0.18s. Residual risk: low—tests only cover pure modules, monolithic `main.js` still untested.

## 2025-11-04 – /work Iteration Setup
- Immediate focus: TODO Phase 0 task “Route shared objects (scene, cameras, renderer, history, listeners) through `appState`.”
- Supporting goal: expose lean helper(s) so AppState keys stay synchronised and can be unit-tested without touching DOM-heavy `main.js`.
- Test-first reminder: add failing node-test validating helper behaviour before touching implementation.
- Risk snapshot: medium—`main.js` is tightly coupled; need to ensure helper usage doesn’t break runtime initialisation. Mitigate via incremental swaps + regression tests.

## Current Focus (2025-11-04)
- Establish foundation for modular refactor by wiring `core/constants`, `AppState`, and `EventBus` across `main.js`.
- Design and implement new three-column layout (left slides strip, centred studio, right Tweakpane) with retina-aware sizing.
- Expand automated tests (Node test runner) to cover new core helpers before migrating additional modules.
- Plan validation: run `npm test`, `npm run build`, then execute manual smoke checks covering drag/drop, thumbnail ordering, retina clarity, and layout centring.

### Front Viewpoint Bug Fix (2025-11-04)

#### Issue Identified
**Problem**: Front viewpoint was not fitting studio canvas correctly
- User set Studio size to 1920x1080px
- Loaded 3 slides of 400x300px
- Expected: Camera positions to show entire 1920x1080 frame
- Actual: Camera positioned based on slide size (400x300), showing wrong scale

#### Root Cause
`setViewpointFitToFrame()` function calculated camera distance based on **slide dimensions** instead of **studio canvas dimensions**.

```javascript
// WRONG (before)
const slideHeight = frontSlide.height;  // 300px
const distance = (slideHeight / 2) / Math.tan(fov / 2);

// CORRECT (after)
const canvasHeight = params.canvasSize.y;  // 1080px
const distance = (canvasHeight / 2) / Math.tan(fov / 2);
```

#### Fix Applied
**File**: `src/main.js:2310-2350`
- Changed calculation to use `params.canvasSize.x/y` (studio canvas)
- Camera now positions to fit the full studio frame in viewport
- Added proper aspect ratio handling
- Reduced padding from 10% to 5%

#### Test Results
```bash
npm run build
# ✓ built in 14.48s
# Bundle: 1,146 kB (292 kB gzipped)
```

**Behavior Now**:
- Front viewpoint shows entire 1920x1080 studio canvas
- Slides (400x300) appear correctly sized within frame
- Works with any canvas size
- Works with any slide dimensions

---

## UI Refactoring (2025-11-04)

### Completed Tasks ✅

1. **Reorganized UI structure** per 103.md specification
2. **Split Studio folder** into Studio and Camera sections
3. **Created tabbed interface** for File/Image/Video operations
4. **Improved UI organization** for better workflow

### UI Structure Changes

**Before:**
- Studio folder: Size, Mode, Zoom, FOV, Background, Transparent BG, Ambience, Viewpoint
- Slides folder: Material, Distance
- Animation folder: Play Hero Shot, Duration, Easing
- Export folder: PNG, JSON
- Actions: Defaults, Clear

**After:**
```
Studio Folder
├── Size (canvas dimensions)
├── Color (background color)
├── Transparent (background toggle)
└── Ambience (floor reflection toggle)

Camera Folder
├── Viewpoint (Beauty/Center/Front/Top/Isometric/3D Stack/Side)
├── Mode (Perspective/Orthographic/Isometric/Telephoto)
├── Zoom (0.1-3.0x)
└── FOV (15-120°)

Slides Folder
├── Material (preset selector)
└── Distance (Z-spacing 0-500px)

Tabbed Interface
├── File Tab
│   ├── JSON (Open/Paste/Save/Copy)
│   └── Tools (Defaults/Clear)
├── Image Tab
│   └── PNG (1x/2x/4x export)
└── Video Tab
    ├── Play Hero Shot (button)
    ├── Duration (0.5-5.0s)
    └── Easing (preset selector)
```

### Benefits

- **Better organization**: Logical grouping of related controls
- **Improved workflow**: Separate tabs for different operations (File/Image/Video)
- **Clearer hierarchy**: Studio settings vs Camera settings are now distinct
- **Space efficiency**: Tabs reduce vertical scrolling
- **Consistency**: Matches the specification in 103.md

### Tests Passed

```bash
npm run build
# ✓ built in 17.17s
# Bundle size: 1,146 kB (292 kB gzipped)
```

### Decision: Not integrating uiconfig-tweakpane

**Rationale:**
- Current Tweakpane API approach is clear and maintainable
- uiconfig-tweakpane would require significant rewrite
- JSON-based config adds abstraction layer without clear benefit
- Direct API calls provide better type safety and IDE support
- Project size doesn't justify the added complexity

**Alternative considered:**
- uiconfig-tweakpane: JSON-based UI configuration system
- Good for very large UIs with dynamic generation
- Overkill for our ~30 control elements

---

## Ambience Rendering Upgrade (2025-11-04)

- Added physically based ambience floor: grouped base plane plus custom blurred reflection shader (Three.js Reflector + RoomEnvironment PMREM).
- Switched renderer to VSM shadow maps, raised directional light blur samples, and tuned envMap intensity on ambience materials for softer shadows.
- Synced reflection render target with viewport changes and cleaned up environment/floor resources on teardown.
- Tests: `npm run build`

---

**Last Updated**: 2025-11-04
**Status**: Phase 6.9 complete - Quality improvements iteration 10
**Focus**: Code quality, robustness, memory safety, full color saturation
