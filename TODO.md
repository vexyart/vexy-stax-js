# <!-- this_file: TODO.md -->
# Vexy Stax JS – TODO

## Workstream A – Modular Refactor
- [x] Phase 0: Replace inline literals in `main.js` with imports from `core/constants.js`. (2025-11-04)
- [ ] Phase 0: Integrate `EventBus` placeholders for background, stack, and camera events.
- [ ] Phase 1: Create `scene/SceneManager.js` and migrate renderer/loop initialisation.
- [ ] Phase 1: Move lighting and floor logic into `scene/LightingManager.js` and `scene/FloorManager.js`.
- [ ] Phase 2: Implement camera managers (`CameraManager`, `ControlsManager`, `ViewpointService`) and port fit-to-frame maths.
- [ ] Phase 3: Introduce `images/ImageLoader.js`, `images/ImageStack.js`, and `materials` modules with unit tests.
- [ ] Phase 4: Extract UI components (`ui/TweakpaneManager.js`, `ui/ImageListView.js`, `ui/Toast.js`) and centralise DOM listener utilities.
- [ ] Phase 5: Split exporters, history, monitoring, and rebuild `api/DebugAPI.js`.
- [ ] Phase 6: Trim `main.js` to orchestration, run full regression (`npm test`, `npm run build`), and document outcomes.

## Workstream B – Layout & UX Overhaul
- [ ] Phase L1: Build flex-based layout with left slide strip, centred studio panel, and right Tweakpane.
- [ ] Phase L1: Ensure studio panel is vertically centred and accounts for fixed side-panel widths.
- [ ] Phase L2: Implement retina-aware studio sizing helpers and hook them into resize/UI flows.
- [ ] Phase L2: Surface UI messaging explaining retina (“logical pixels”) vs device pixels.
- [ ] Phase L3: Redesign slide thumbnails as a minimal docked strip with tooltip metadata on hover/focus.
- [ ] Phase L3: Add auto-scroll behaviour when dragging near strip edges.
- [ ] Phase L4: Promote drag/drop listeners to window scope so files can be dropped anywhere.
- [ ] Phase L4: Enable thumbnail drag reordering with `ImageStack` updates and EventBus notifications.
- [ ] Phase L4: Validate keyboard accessibility for reordering or provide explicit fallback controls.
- [ ] Phase L4: Run manual smoke checks (drop anywhere, reorder, retina clarity) and capture results in `WORK.md`.
- [ ] Test PNG export at all resolutions
- [ ] Test animation system
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Performance testing with many images

## Future Enhancements 📋

- [ ] Keyboard shortcuts (Space = play animation, etc.)
- [ ] Drag-and-drop image reordering
- [ ] Image deletion (remove individual images)
- [ ] Preset saving/loading (custom material presets)
- [ ] Camera position presets
- [ ] Screenshot comparison tools
- [ ] Animation timeline editor
- [ ] Multiple animation sequences
