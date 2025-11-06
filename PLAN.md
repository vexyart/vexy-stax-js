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
4. Maintain current test count (294) and performance baselines; prevent regression in memory watchdogs or export fidelity.


### Cross-Cutting Tasks
- Define shared data contracts (callbacks, state fragments) before extraction to avoid circular imports.
- Introduce façade helpers in main.js during transition so modules can be integrated incrementally.
- Ensure every relocated function gains a JSDoc block derived from the templates; add missing templates for memory/watchdog helpers as they become module APIs.
- Update `WORK.md` and docs after each module lands; note test runs (`npm run test:unit` minimum, add targeted unit suites as they appear).
- Keep `.github/workflows/docs-build.yml` healthy so every push to `main` refreshes `docs/` without triggering recursive runs (guarded via `github.actor` check; baseline run validated 2025-11-07).

### Acceptance Criteria
- main.js orchestrates module wiring, public API exposure, and lifecycle only; internal logic resides elsewhere.
- Each new module ≤250 lines, internally documented, unit-tested, and referenced in `DEPENDENCIES.md` if new packages appear (avoid unless essential).
- Unit suite stays green via `npm run test:unit`; add new suites per module.
- Build size remains ≤1,150 kB; memory guard rails continue to emit warnings at 500 MB.
- Public API signatures unchanged; templates applied so IDE hints remain accurate.

### Coordination & Sequencing
1. Confirm callback/state contract documentation in WORK.md reflects FileHandler, SceneComposition, ExportManager, CameraController, and TweakpaneSetup integrations before keyboard extraction.
2. Extract keyboard shortcut handling and complete final main.js orchestration pass.
3. Remove temporary camera fallbacks from `src/main.js` once UI/keyboard extractions ship.

### Next Candidates
1. Integrate `SceneManager`/`LightingManager` modules to replace remaining scene orchestration in `src/main.js`.
2. Restore Playwright smoke harness and cover hero-shot/regression journeys end-to-end.
3. Evaluate floor/lighting extraction coverage to ensure disposals align with new manager wiring.

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
