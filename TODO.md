# Vexy Stax JS - TODO

## Phase 1: Core 3D Visualization ✅

- [x] Set up Three.js renderer
- [x] Create perspective/orthographic/isometric cameras
- [x] Add OrbitControls
- [x] Implement image loading via file input
- [x] Create image stacking along Z-axis
- [x] Build Tweakpane UI
- [x] Add camera mode controls
- [x] Add Z-spacing slider
- [x] Add background color picker
- [x] Add transparent background toggle

## Phase 2: Animation System ✅

- [x] Add GSAP dependency (^3.13.0)
- [x] Create src/camera/animation.js
- [x] Implement CameraAnimator class
- [x] Implement playHeroShot() method
- [x] Add duration/holdTime/easing parameters
- [x] Integrate with Tweakpane UI
- [x] Add Play button for animation
- [x] Implement ESC key cancellation
- [x] Disable controls during animation
- [x] Add toast notifications
- [x] Expose window.vexyStax.playAnimation()
- [x] Expose window.vexyStax.cancelAnimation()

## Phase 3: Material System ✅

- [x] Implement PBR materials with roughness/metalness
- [x] Add 9 material presets
- [x] Create Materials folder in Tweakpane
- [x] Add roughness slider (0-1)
- [x] Add metalness slider (0-1)
- [x] Add thickness control
- [x] Add border width control
- [x] Add border color picker
- [x] Add preset buttons to UI

## Phase 4: Export/Import System ✅

- [x] Implement JSON export with base64 images
- [x] Add copy to clipboard functionality
- [x] Add download JSON file
- [x] Implement JSON import from clipboard
- [x] Implement JSON import from file
- [x] Implement PNG export (1x, 2x, 3x, 4x)
- [x] Add Export folder to Tweakpane
- [x] Expose window.vexyStax.exportPNG()

## Phase 5: Debug API ✅

- [x] Create window.vexyStax object
- [x] Expose exportPNG(scale)
- [x] Expose clearAll()
- [x] Expose getImageStack()
- [x] Expose undo() / redo()
- [x] Expose showFPS(enabled)
- [x] Expose loadSettings() / saveSettings() / resetSettings()
- [x] Expose getStats()
- [x] Expose playAnimation(config)
- [x] Expose cancelAnimation()
- [x] Expose help()
- [x] Add loadConfig(config) method
- [x] Update help text

## Phase 6: Quality Improvements ✅

- [x] Add loadConfig() API for Python automation
- [x] Fix missing texture property (3 locations)
- [x] Update help text with loadConfig
- [x] Add CSS keyframes for toast animations
- [x] Build successful (3-4s)
- [x] Create PLAN.md
- [x] Create TODO.md (this file)

## Phase 6.5: Code Quality Iteration 4 ✅

- [x] Fix memory leak in undo/redo - add texture disposal
- [x] Add imageStack empty checks to prevent errors
- [x] Standardize error messaging to use showToast consistently

## Phase 6.6: Code Quality Iteration 5 ✅

- [x] Fix event listener memory leak in updateImageList()
- [x] Refactor duplicated image loading logic in cli.py (Python)
- [x] Add error handling for empty folders in cli.py (Python)

## Phase 7: Code Refactoring ⏳

**Goal**: Split main.js (2,600+ lines) into modules per 101.md Task 3

- [ ] Create src/ui/tweakpane.js (~400 lines)
- [ ] Create src/export/png.js (~100 lines)
- [ ] Create src/export/json.js (~100 lines)
- [ ] Create src/materials/presets.js (~150 lines)
- [ ] Create src/materials/manager.js (~50 lines)
- [ ] Create src/scene/renderer.js (~50 lines)
- [ ] Create src/scene/camera.js (~100 lines)
- [ ] Create src/scene/lights.js (~50 lines)
- [ ] Create src/images/loader.js (~150 lines)
- [ ] Create src/images/stack.js (~50 lines)
- [ ] Create src/api/debug.js (~100 lines)
- [ ] Reduce main.js to ~200 lines (entry point only)
- [ ] Test all functionality after refactor
- [ ] Update build to handle new structure

## Phase 8: Video Export ⏳

- [ ] Research MediaRecorder API
- [ ] Implement canvas.captureStream(60)
- [ ] Create video recording module
- [ ] Add "Record Video" button to UI
- [ ] Test video recording with animation
- [ ] Add codec selection (VP9, H264)
- [ ] Expose window.vexyStax.recordAnimation()
- [ ] Handle browser compatibility

## Build & Deployment 🔄

- [x] Configure Vite for production build
- [x] Set up docs/ directory for GitHub Pages
- [x] Create dev.sh helper script
- [x] Create build.sh helper script
- [ ] Test production build
- [ ] Deploy to GitHub Pages
- [ ] Verify all features work in production

## Documentation ⏳

- [ ] Update README.md if needed
- [ ] Document window.vexyStax API
- [ ] Add code comments for complex sections
- [ ] Create usage examples
- [ ] Document keyboard shortcuts

## Testing ⏳

- [ ] Test with Python automation
- [ ] Test all material presets
- [ ] Test JSON export/import round-trip
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

## Phase 6.6: Code Quality Iteration 6 ✅

- [x] Replace alert() with showToast() for better UX in main.js
- [x] Make loadConfig() return promise for reliable completion
- [x] Test all changes and verify build succeeds

## Phase 6.7: Code Quality Iteration 8 ✅

- [x] Replace blocking alert() with showToast() for file loading errors
- [x] Remove blocking confirm() for large file warning
- [x] Test all changes and verify build succeeds
