# Vexy Stax JS - TODO List

## Phase 1: Animation System

### GSAP Setup
- [ ] Add gsap dependency to package.json
- [ ] Run `npm install gsap`
- [ ] Verify GSAP loads correctly
- [ ] Test basic GSAP tween

### Camera Animation Module
- [ ] Create `src/camera/animation.js`
- [ ] Implement `CameraAnimator` class
  - [ ] `constructor(camera, controls)`
  - [ ] `async playHeroShot(params)`
  - [ ] `calculateHeroPosition(topSlide)`
  - [ ] `saveState()` / `restoreState()`
- [ ] Add animation state management
  - [ ] `isAnimating` flag
  - [ ] Disable controls during animation
  - [ ] Enable controls after animation
- [ ] Implement hero shot sequence
  - [ ] Save current camera state
  - [ ] Tween to hero position (1.5s)
  - [ ] Hold at hero position (1.0s)
  - [ ] Tween back to original (1.5s)
  - [ ] Restore controls

### Hero Position Calculation
- [ ] Calculate top slide bounding box
- [ ] Find center point of top slide
- [ ] Calculate camera distance for viewport fit
- [ ] Account for FOV in distance calculation
- [ ] Add padding/margin (1.2x multiplier)
- [ ] Test with various image sizes

### Easing Options
- [ ] Default: `power2.inOut`
- [ ] Add options for other easings
  - [ ] `elastic.out` (bouncy)
  - [ ] `back.inOut` (overshoot)
  - [ ] `circ.inOut` (smooth circular)
- [ ] Document easing options

### UI Integration
- [ ] Add "Animation" folder to Tweakpane
- [ ] Add "Play Hero Shot" button
- [ ] Add duration slider (0.5s - 5.0s)
- [ ] Add hold time slider (0s - 3.0s)
- [ ] Add easing dropdown
- [ ] Show "Animating..." toast during playback
- [ ] Add ESC key to cancel animation

### Debug API
- [ ] Expose `vexyStax.playAnimation(config)`
- [ ] Add animation to help menu
- [ ] Test via console
- [ ] Document animation API

---

## Phase 2: Video Export

### Video Export Module
- [ ] Create `src/export/video.js`
- [ ] Implement `VideoExporter` class
  - [ ] `constructor(renderer, camera, scene)`
  - [ ] `async captureAnimation()`
  - [ ] `async encodeToVideo()`
  - [ ] `async encodeWithMediaRecorder()`
  - [ ] `exportFramesAsZip()` (fallback)

### Frame Capture
- [ ] Render loop for frame capture
- [ ] Capture canvas as blob per frame
- [ ] Store frames in array
- [ ] Calculate frame count from duration + FPS
- [ ] Progress indicator during capture
- [ ] Memory management (clear frames after encode)

### MediaRecorder Integration
- [ ] Check MediaRecorder support
- [ ] Create stream from canvas
- [ ] Configure MediaRecorder options
  - [ ] mimeType: 'video/webm;codecs=vp9'
  - [ ] videoBitsPerSecond: 8000000 (8 Mbps)
- [ ] Handle data chunks
- [ ] Create final video blob
- [ ] Download video file

### Fallback (Frame ZIP Export)
- [ ] Add JSZip dependency (optional)
- [ ] Export frames as individual PNGs
- [ ] Create ZIP archive
- [ ] Download ZIP file
- [ ] Show instructions for manual encoding

### UI Integration
- [ ] Add "Video" section to Export folder
- [ ] Add "Record Animation" button
- [ ] Add FPS selector (30/60 FPS)
- [ ] Add quality selector (Low/Medium/High)
- [ ] Show progress bar during recording
- [ ] Show "Recording..." overlay
- [ ] Disable other controls during recording
- [ ] Show success toast with file size

### Browser Compatibility
- [ ] Test Chrome (MediaRecorder ✓)
- [ ] Test Firefox (MediaRecorder ✓)
- [ ] Test Safari (MediaRecorder ✓)
- [ ] Test Edge (MediaRecorder ✓)
- [ ] Document browser support
- [ ] Provide fallback instructions

---

## Phase 3: Code Refactoring

### Create Module Structure
- [ ] Create `src/core/` directory
- [ ] Create `src/ui/` directory
- [ ] Create `src/image/` directory
- [ ] Create `src/camera/` directory
- [ ] Create `src/export/` directory
- [ ] Create `src/state/` directory
- [ ] Create `src/utils/` directory

### Extract Utilities (Low Risk)
- [ ] Create `src/utils/toasts.js`
  - [ ] Move `showToast()` function
  - [ ] Export as utility
  - [ ] Import in main.js
  - [ ] Test toasts work
- [ ] Create `src/utils/validation.js`
  - [ ] Move `validateImageFile()`
  - [ ] Move file size checks
  - [ ] Export validation functions
- [ ] Create `src/utils/performance.js`
  - [ ] Move FPS monitoring code
  - [ ] Move memory checking code
  - [ ] Export PerformanceMonitor class

### Extract State Management
- [ ] Create `src/state/params.js`
  - [ ] Move `params` object
  - [ ] Export parameters
  - [ ] Create getters/setters
- [ ] Create `src/state/history.js`
  - [ ] Move history stack code
  - [ ] Move `saveHistory()`, `undo()`, `redo()`
  - [ ] Export History class
- [ ] Create `src/state/settings.js`
  - [ ] Move localStorage code
  - [ ] Move `loadSettings()`, `saveSettings()`
  - [ ] Export Settings class

### Extract Core Systems
- [ ] Create `src/core/scene.js`
  - [ ] Move scene creation
  - [ ] Move camera setup
  - [ ] Move renderer setup
  - [ ] Export Scene class
- [ ] Create `src/core/lighting.js`
  - [ ] Move `setupLighting()` code
  - [ ] Export Lighting class
- [ ] Create `src/core/controls.js`
  - [ ] Move OrbitControls setup
  - [ ] Export Controls class

### Extract UI System
- [ ] Create `src/ui/tweakpane.js`
  - [ ] Move Tweakpane initialization
  - [ ] Move folder/button creation
  - [ ] Export TweakpaneUI class
- [ ] Create `src/ui/shortcuts.js`
  - [ ] Move keyboard shortcut handlers
  - [ ] Move help overlay code
  - [ ] Export KeyboardShortcuts class
- [ ] Create `src/ui/toasts.js`
  - [ ] Already done in utils ✓

### Extract Image System
- [ ] Create `src/image/loader.js`
  - [ ] Move file input handlers
  - [ ] Move drag-and-drop handlers
  - [ ] Move `loadImage()` function
  - [ ] Export ImageLoader class
- [ ] Create `src/image/stack.js`
  - [ ] Move `imageStack` array
  - [ ] Move `addImageToStack()`
  - [ ] Move `deleteImage()`
  - [ ] Move `updateImageList()`
  - [ ] Export ImageStack class
- [ ] Create `src/image/materials.js`
  - [ ] Move material parameters
  - [ ] Move `applyMaterialPreset()`
  - [ ] Export Materials class

### Extract Camera System
- [ ] Create `src/camera/modes.js`
  - [ ] Move `switchCameraMode()`
  - [ ] Move camera mode logic
  - [ ] Export CameraModes class
- [ ] Create `src/camera/viewpoints.js`
  - [ ] Move `setViewpoint()`
  - [ ] Move `centerViewOnContent()`
  - [ ] Export Viewpoints class
- [ ] Create `src/camera/animation.js`
  - [ ] Already done in Phase 1 ✓

### Extract Export System
- [ ] Create `src/export/png.js`
  - [ ] Move `exportPNG()` function
  - [ ] Export PNGExporter class
- [ ] Create `src/export/json.js`
  - [ ] Move `exportJSON()`, `importJSON()`
  - [ ] Move `copyJSON()`, `pasteJSON()`
  - [ ] Export JSONExporter class
- [ ] Create `src/export/video.js`
  - [ ] Already done in Phase 2 ✓

### Refactor main.js
- [ ] Import all modules
- [ ] Initialize modules in `init()`
- [ ] Wire up module interactions
- [ ] Remove old code (replaced by modules)
- [ ] Test all functionality
- [ ] Verify no regressions
- [ ] Measure final main.js size (target: <200 lines)

### Testing After Each Module
- [ ] Test feature works after extraction
- [ ] Check for console errors
- [ ] Verify no memory leaks
- [ ] Test in all browsers
- [ ] Document any breaking changes

---

## Phase 4: Build Scripts

### build.sh Script
- [ ] Create `build.sh` in root
- [ ] Add shebang (`#!/bin/bash`)
- [ ] Add `set -e` for error handling
- [ ] Add dependency check/install
- [ ] Add build command (`npm run build`)
- [ ] Add output verification
- [ ] Add success message with stats
- [ ] Make executable (`chmod +x build.sh`)
- [ ] Test on clean clone
- [ ] Document in README

### dev.sh Script
- [ ] Create `dev.sh` in root
- [ ] Check for node_modules
- [ ] Install deps if missing
- [ ] Start dev server
- [ ] Make executable
- [ ] Test script
- [ ] Document usage

### Package Scripts
- [ ] Verify `npm run dev` works
- [ ] Verify `npm run build` works
- [ ] Verify `npm run preview` works
- [ ] Add `npm run clean` (remove node_modules, docs)
- [ ] Add `npm run lint` (if adding linter)
- [ ] Document all scripts in README

---

## Phase 5: Documentation

### README Updates
- [ ] Add "Building" section
  - [ ] Quick build: `./build.sh`
  - [ ] Or: `npm ci && npm run build`
  - [ ] Output location: `docs/`
- [ ] Add "Development" section
  - [ ] Quick start: `./dev.sh`
  - [ ] Or: `npm install && npm run dev`
  - [ ] Dev server: `http://localhost:5173`
- [ ] Add "Animation" section
  - [ ] Hero shot animation feature
  - [ ] GSAP-based camera tweens
  - [ ] Video export capability
  - [ ] Usage instructions
- [ ] Add "Deployment" section
  - [ ] GitHub Pages setup
  - [ ] Manual deployment steps
  - [ ] Versioning with git tags
- [ ] Update architecture docs
  - [ ] New module structure
  - [ ] Import diagram
  - [ ] Module responsibilities

### API Documentation
- [ ] Document animation API
- [ ] Document video export API
- [ ] Update debug API docs
- [ ] Add code examples

### Code Comments
- [ ] Add JSDoc comments to public APIs
- [ ] Document module interfaces
- [ ] Add inline comments for complex logic
- [ ] Document animation parameters

---

## Phase 6: Testing

### Manual Testing
- [ ] Test hero shot animation
  - [ ] Smooth transition to top slide
  - [ ] Hold at hero position
  - [ ] Smooth return to original
  - [ ] Can interrupt with ESC
- [ ] Test video export
  - [ ] Records full animation
  - [ ] Exports as WebM
  - [ ] File downloads successfully
  - [ ] Video plays in media player
- [ ] Test existing features (regression)
  - [ ] Image loading
  - [ ] Material presets
  - [ ] Camera modes
  - [ ] PNG export
  - [ ] JSON export
  - [ ] Undo/redo
- [ ] Test in all browsers
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

### Performance Testing
- [ ] FPS during animation (target: 60 FPS)
- [ ] Memory usage during video export
- [ ] Build size increase from GSAP
- [ ] Load time impact

---

## Completed
- [x] Create PLAN.md
- [x] Create TODO.md
- [x] Verify Materials section exists (9 presets ✓)

---

## Priority Order

**Immediate (This Week)**:
1. Phase 1: Animation System (1-2 days)
2. Phase 4: Build Scripts (0.5 days)
3. Phase 5: Documentation (0.5 days)

**Near-term (Next Week)**:
4. Phase 2: Video Export (2-3 days)
5. Phase 3: Start Refactoring (utilities first)

**Ongoing**:
6. Phase 3: Continue Refactoring (gradual, non-breaking)
7. Phase 6: Testing (continuous)

---

## Notes

- Animation is top priority (requested feature)
- Video export is bonus (Phase 2)
- Refactoring can be gradual (no rush)
- Keep existing functionality intact
- Test after each change
- Materials already complete (skip)

---

**Status**: Planning complete. Ready to start Phase 1 implementation.
