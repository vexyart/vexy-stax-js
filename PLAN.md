# <!-- this_file: PLAN.md -->
# Vexy Stax JS – Implementation Plan

## One-Sentence Scope
Maintainable Three.js studio for stacking 2D artwork, animating cameras, and exporting PNG/JSON assets to support the vexy-stax toolchain.

## Active Workstreams

### Workstream A – Modular Refactor of `src/main.js`
- **Goal**: Replace the monolith with cohesive ES modules while keeping feature parity and enabling targeted testing.
- **Phase 0 – Foundation (in progress)**:
  - Finalise use of `src/core/constants.js` everywhere; delete duplicate literals in `main.js` (lighting and ambience floor constants moved 2025-11-04, continue sweeping remaining sections).
  - Introduce `EventBus` wiring points for inter-module communication (background updates, image stack changes, camera events).
  - Deliverable: `npm test`, `npm run build`, documentation updates (`WORK.md`, `CHANGELOG.md`).
- **Phase 1 – Scene & Loop**:
  - Extract renderer/scene bootstrap and animation loop into `scene/SceneManager.js`.
  - Move lighting and ambience toggles into `scene/LightingManager.js`/`scene/FloorManager.js`.
  - Provide pure helpers (luminance, reflector sizing) that can be unit tested.
  - Ensure resize/context-loss logic references AppState rather than file-level variables.
- **Phase 2 – Camera System**:
  - Create `camera/CameraManager.js`, `camera/ControlsManager.js`, `camera/ViewpointService.js`.
  - Port zoom/FOV syncing, fit-to-frame maths, and hero-shot hooks; design pure functions for camera positioning to test with Node.
- **Phase 3 – Assets & Materials**:
  - Implement `images/ImageLoader.js` (validation + retry) and `images/ImageStack.js` (mesh lifecycle).
  - Extract material presets to `materials/presets.js` and application logic to `materials/MaterialManager.js`.
  - Add tests for ordering, preset defaults, and retry fallbacks.
- **Phase 4 – UI & Interaction**:
  - Move Tweakpane wiring into `ui/TweakpaneManager.js`.
  - Build dockable image list view and toast manager modules ready for upcoming UX overhaul.
  - Centralise tracked listeners in `utils/dom.js`.
- **Phase 5 – Export, History, Monitoring, API**:
  - Split history handling, monitoring, and exporters into dedicated modules.
  - Rebuild `api/DebugAPI.js` to compose the public surface from module instances.
- **Phase 6 – Entry Orchestration**:
  - Reduce `main.js` to instantiation + wiring.
  - Run full regression (`npm test`, `npm run build`, manual smoke checklist) and document results.

### Workstream B – Layout & UX Overhaul (Retina Studio + Docked Panels)
- **Requirement Summary**: Retina-aware studio sizing, studio frame centered between a left-aligned slide strip and right-aligned Tweakpane, full-window drag-and-drop, minimalist thumbnail list with hover tooltips, and draggable reordering.
- **Research Recap** (Perplexity 2025-11-04): Flexbox three-column layouts best center content between fixed panels; global drag-and-drop needs window-level listeners; retina canvases must size the drawing buffer to CSS size × `devicePixelRatio`.
- **Phase L1 – Layout Scaffold**:
  - Create `layout.css` (or extend existing) to implement a `display:flex` root with `slides-panel`, `studio-panel`, and `controls-panel`.
  - Move the slides list DOM to the left edge; ensure panels respect min-widths and allow vertical centering via `align-items:center`.
  - Update HTML structure (`index.html`) to wrap canvas + overlays inside a flex container.
  - Success criteria: Studio panel is vertically centered, horizontal centering accounts for left/right panel widths.
- **Phase L2 – Retina Studio Sizing**:
  - Define studio dimensions in logical pixels; compute rendering resolution as `cssSize * devicePixelRatio`.
  - Update resize handler to map UI inputs (e.g., 1920×1080) to CSS width/height while creating a `renderer.setSize(width * dpr, height * dpr, false)`.
  - Provide UI feedback (e.g., label) explaining retina scaling.
  - Add tests for helper functions translating logical to physical pixels.
- **Phase L3 – Slide Tray Redesign**:
  - Rebuild slide list markup as a single-column docked strip with minimal chrome (no nested frames).
  - Render thumbnails at reduced size (configurable constant); defer heavy details to tooltip content using native title or a custom tooltip component.
  - Integrate auto-scroll when dragging near list edges.
- **Phase L4 – Drag-and-Drop & Drop Targets**:
  - Expand drop handlers to listen on `window` (or a transparent overlay) so files can be dropped anywhere.
  - Implement draggable thumbnails via pointer events or an accessible drag-drop library while keeping ordering synced with `ImageStack`.
  - Ensure keyboard accessibility (focus + arrow drag) remains possible or provide fallback buttons.
  - Wire change events through EventBus so scene/order updates remain decoupled.
- **Testing & Validation**:
  - Automated: node tests for pixel conversion helpers and ordering logic.
  - Manual smoke: verify drag-drop anywhere, reorder via drag, tooltip details, retina clarity at 1920×1080, centering with varying window sizes.
  - Regression: `npm test`, `npm run build`, cross-browser check (Chromium/WebKit) for pointer/drag events.
- **Risks & Mitigations**:
  - Retina rendering may increase GPU load → expose toggle or cap max resolution.
  - Drag-and-drop conflicts with browser default behaviors → prevent default on `dragover`/`drop` for document.
  - Tooltip accessibility → ensure hover + focus both reveal metadata.

## Testing Strategy
- `npm test` (Node test runner) after each phase shift.
- `npm run build` to validate Vite bundling.
- Manual checklist covering image import, undo/redo, animation, exports, and new layout interactions.
| tweakpane | ^4.0.5 | UI controls | ✅ Added |
| vite | ^7.1.12 | Build tool | ✅ Configured |

**Why These Packages**:
- Three.js: Industry standard for WebGL/3D
- GSAP: Best animation library, deterministic easing
- Tweakpane: Lightweight, beautiful UI controls
- Vite: Fast development server, modern build tool

## Build System

**Development**:
```bash
npm run dev
# Starts dev server at http://localhost:5173/vexy-stax-js/
```

**Production**:
```bash
npm run build
# Builds to docs/ directory for GitHub Pages
```

**Scripts**:
- `dev.sh` - Helper script to start dev server
- `build.sh` - Helper script to build for production

## Success Criteria

**Must Have** (✅ Complete):
- ✅ 3D image stacking with Three.js
- ✅ GSAP hero shot animation
- ✅ 9 PBR material presets
- ✅ JSON export/import with embedded images
- ✅ PNG export at multiple resolutions
- ✅ Debug API for automation
- ✅ Responsive UI with Tweakpane

**Should Have** (Current Focus):
- 🔄 Comprehensive documentation (PLAN.md, TODO.md)
- ⏳ Refactored codebase (<200 lines per file)
- ⏳ Build scripts for easy deployment

**Nice to Have** (Future):
- Video recording/export
- Undo/redo history (partially implemented)
- Keyboard shortcuts
- Preset saving/loading

## Non-Goals (RED LIST)

Per CLAUDE.md guidelines, we **DO NOT** add:
- ❌ Analytics/tracking
- ❌ Performance monitoring dashboards
- ❌ Advanced error recovery
- ❌ Security hardening beyond basics
- ❌ Health monitoring
- ❌ Sophisticated caching
- ❌ User authentication
- ❌ Cloud storage integration

## Integration with vexy-stax-py

**Window API Contract**:
- Python calls `window.vexyStax.loadConfig(config)`
- Python calls `window.vexyStax.playAnimation(config)`
- Python calls `window.vexyStax.exportPNG(scale)`
- Python calls `window.vexyStax.getStats()`

**Requirements**:
- Dev server must run at localhost:5173 ✅
- File input must accept PNG files ✅
- API must be synchronous (or use Playwright waits) ✅
- JSON format must match Python's expectations ✅

## Next Steps

**Immediate**:
1. ✅ Add loadConfig() API method
2. ✅ Fix texture property bugs
3. 🔄 Create PLAN.md (this file)
4. 🔄 Create TODO.md
5. ⏳ Update README.md if needed

**Short Term**:
- Refactor main.js into modules
- Test with Python automation
- Document API methods

**Medium Term**:
- Implement video export
- Add more keyboard shortcuts
- Improve material presets

**Long Term**:
- Deploy to GitHub Pages
- Create demo videos
- User documentation
# <!-- this_file: PLAN.md -->
# Vexy Stax JS – Implementation Plan

## Scope

Single-page Three.js studio for stacking 2D imagery in 3D, animating the camera, and exporting PNG/JSON artefacts. Refactor is focused on maintainability, packaging, and testability without altering feature scope.

## Current Architecture Snapshot (2025-11-04)

- Entry point `src/main.js` (≈3,300 lines) orchestrates everything: capability checks, Three.js setup, materials, history, exporters, Tweakpane UI, drag-and-drop, debug API.
- `src/camera/animation.js` already hosts `CameraAnimator`; all other behaviour is inside `main.js`.
- DOM templates live in `index.html`/`styles/`; Vite handles bundling.
- Build verified with `npm run build`; no automated unit tests yet.

## Objectives for Phase 7 – Modular Refactor

1. **Separation of Concerns:** Introduce ES modules per responsibility (core, scene, camera, images, materials, ui, export, utils, api).
2. **Explicit State Flow:** Replace implicit globals with `AppState` singleton and event bus.
3. **Testability:** Add Node-driven unit tests for pure logic; keep modules below 200 lines when feasible.
4. **Packaging Friendliness:** Ensure modules expose clean interfaces so downstream tools (e.g., vexy-stax-py) can import targeted functionality.
5. **Performance Parity:** Preserve FPS/memory monitoring, resource disposal, and exporter quality.

## Phase Breakdown & Status

| Phase | Focus | Key Deliverables | Status |
|-------|-------|------------------|--------|
| 0 | Foundation & Safety Nets | Directory scaffold, `core/constants.js`, `core/AppState.js`, `core/EventBus.js`, `npm test` setup, baseline unit tests | 🔄 In progress |
| 1 | Scene & Loop | `SceneManager`, `LightingManager`, `FloorManager`, ambient/floor events, associated tests | ⏳ |
| 2 | Camera | `CameraManager`, `ControlsManager`, `ViewpointService`, camera fit maths tests | ⏳ |
| 3 | Images & Materials | `ImageLoader`, `ImageStack`, `MaterialManager`, preset map + tests | ⏳ |
| 4 | UI & Interaction | `TweakpaneManager`, `ImageListView`, `Toast`, tracked listeners helper | ⏳ |
| 5 | Export, History, Monitoring, API | Exporter modules, history/monitoring utils, rebuilt `DebugAPI` | ⏳ |
| 6 | Entry Cleanup & Regression | Slim `main.js`, integration verification, documentation + changelog updates | ⏳ |

Progression is strictly linear; each phase requires passing tests/builds and documented outcomes before moving forward.

## Testing & Tooling Strategy

- `npm test` (Node test runner) for module-level validation.
- `npm run build` for integration assurance after each phase.
- Manual smoke checks: load demo, verify image loading, materials, undo/redo, PNG/JSON export, animation.
- Update `WORK.md` with tasks, results, and residual risks per phase.

## Documentation & Tracking

- `REFACTOR_PLAN.md` hosts detailed design decisions and risks (kept current per phase).
- `TODO.md` tracks actionable checklist items derived from the table above.
- `CHANGELOG.md` records shipped increments.
- `README.md` summarises the system and refactor roadmap for contributors.

## Future Enhancements (Post-Refactor Backlog)

- Phase 8 video export via `MediaRecorder`.
- Additional automated tests for exporters and UI glue once modules exist.
- Potential CLI packaging improvements once modularisation is complete.
