# <!-- this_file: PLAN.md -->
# Vexy Stax JS – Implementation Plan

## One-Sentence Scope
Maintain a browser-based Three.js studio that stacks 2D artwork with accurate color reproduction, provides camera controls and animations, and exports PNG/JSON artifacts while keeping the codebase modular and testable.

---

## Phase History Snapshot
- **Phase 1 – Core Refactor**: Extracted Scene, Lighting, and Floor managers; added helpers and layout foundations.
- **Phase 2 – UI & Ambient**: Delivered ambient mode, UI dark theme, and camera polish with 93/93 tests passing.
- **Phase 3 – Documentation & Quality**: Completed full JSDoc coverage, zero memory leaks, 110/110 tests.
- **Phase 4 – Quality Intensification**: 98 disciplined iterations, 227/227 tests, RenderLoop module extracted, logging and docs aligned, project release-ready.

---

## Current Focus – Phase 5: main.js Decomposition (2025-11-05)

### Baseline
- `src/main.js`: 3,367 lines, 77 functions (per `main_js_complexity.md`), single keyboard handler >60 lines, several 150–300 line blocks.
- Major hotspots: init orchestration, Tweakpane setup, image loading/memory guardrails, export handlers.
- Public API functions mapped in `main_js_jsdoc_templates.md`; templates flag 18 functions requiring consistent documentation once relocated.

### Objectives
1. Shrink main.js to an orchestration shell (<300 lines) while preserving behaviour and API surface.
2. Extract cohesive modules that match existing plan (UI setup, file handling, scene composition, camera control, exports) with clear interfaces and tests.
3. Apply JSDoc templates (and extend where gaps remain) so every exported function in new modules ships with examples and type hints.
4. Maintain current test count (235) and performance baselines; prevent regression in memory watchdogs or export fidelity.

### Completed Workstreams
- **File Handling (`src/files/FileHandler.js`)**: Drag/drop + browse intake orchestrated with validation + memory gating; unit tests (`tests/files_file_handler.test.js`) ensure oversize/type thresholds and warning surfaces.
- **Scene Composition (`src/core/SceneComposition.js`)**: Mesh lifecycle, material presets, reorder/clear safeguards extracted; integration tests (`tests/core_scene_composition.test.js`) confirm add/reorder/clear flows.

### Workstreams & Deliverables
1. **UI Controls (`src/ui/TweakpaneSetup.js`)**
   - Scope: Tweakpane construction (~300 lines), button callbacks, pane refresh logic.
   - Deliverables: Class with dependency-injected callbacks, tests covering folder creation and callback wiring, documentation referencing templates for UI-bound functions (e.g., `showToast` usage).
   - Dependencies: Relies on existing FileHandler + SceneComposition contracts and upcoming ExportManager/CameraController interfaces.
2. **Export Manager (`src/export/ExportManager.js`)**
   - Scope: PNG multi-scale rendering, JSON serialisation/deserialisation, clipboard interactions.
   - Deliverables: Deterministic exports with dependency injection for renderer/canvas, tests with mocked renderer to validate scale bounds (per `exportPNG` template).
3. **Camera Controls (`src/camera/CameraController.js`)**
   - Scope: Mode switching, viewpoint presets, integration with existing animator/OrbitControls.
   - Deliverables: Controller abstraction, tests verifying transforms, JSDoc for `setCameraMode`, `centerOnContent`.
4. **Keyboard Shortcuts (`src/ui/KeyboardShortcuts.js`)**
   - Scope: Isolate 62-line `keydownHandler`; ensure undo/redo/export shortcuts remain covered by tests.
   - Deliverables: Focused listener with test coverage for modifier edge cases.

### Cross-Cutting Tasks
- Define shared data contracts (callbacks, state fragments) before extraction to avoid circular imports.
- Introduce façade helpers in main.js during transition so modules can be integrated incrementally.
- Ensure every relocated function gains a JSDoc block derived from the templates; add missing templates for memory/watchdog helpers as they become module APIs.
- Update `WORK.md` and docs after each module lands; note test runs (`npm run test:unit` minimum, add targeted unit suites as they appear).

### Acceptance Criteria
- main.js orchestrates module wiring, public API exposure, and lifecycle only; internal logic resides elsewhere.
- Each new module ≤250 lines, internally documented, unit-tested, and referenced in `DEPENDENCIES.md` if new packages appear (avoid unless essential).
- 235/235 tests stay green; add new suites per module.
- Build size remains ≤1,150 kB; memory guard rails continue to emit warnings at 500 MB.
- Public API signatures unchanged; templates applied so IDE hints remain accurate.

### Coordination & Sequencing
1. Confirm callback/state contract documentation in WORK.md reflects FileHandler + SceneComposition integrations before UI extraction.
2. Implement ExportManager and CameraController to provide stable APIs for UI wiring.
3. Build TweakpaneSetup atop the new module interfaces, backfilling tests and documentation.
4. Extract keyboard shortcut handling and complete final main.js orchestration pass.

### Verification Strategy
- Unit: Dedicated suites per new module.
- Integration: Regression tests ensuring drag/drop → scene update → export still works when modules interact.
- Manual smoke: Load sample stacks (small/large), trigger exports, verify keyboard shortcuts.
- Documentation: Update README features table only if behaviour changes; record test outcomes in `CHANGELOG.md`.

---

### Risks & Mitigations
- **Circular dependencies**: Keep module APIs dependency-injected; enforce lint checks for banned imports; smoke-test build after each extraction.
- **Behaviour regressions**: Write targeted unit tests before moving logic; run `npm run test:unit` and relevant integration suites after every module.
- **Performance drift**: Benchmark render loop with 10-image stacks pre/post extraction; log deltas in WORK.md.
- **Documentation drift**: Track template adoption in WORK.md; block merges until relocated functions ship with updated JSDoc.
