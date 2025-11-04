# Vexy Stax JS - TODO List

## Quality Improvements (Current Focus)

### Task 1: Add Missing Animation Keyframes CSS
**Problem**: Toast animations reference `slideIn` and `slideOut` keyframes that don't exist
**Impact**: Toasts appear/disappear without smooth animations
**Fix**: Add CSS keyframes to index.html or inject via JavaScript
**Priority**: High (visual polish)
**Estimated Time**: 15 minutes

### Task 2: Improve Animation Error Handling & Recovery
**Problem**: If animation fails or GSAP errors occur, controls may stay disabled
**Impact**: User can get stuck with disabled camera controls
**Fix**: Add try-catch-finally blocks, ensure controls always re-enable
**Priority**: High (user experience blocker)
**Estimated Time**: 30 minutes

### Task 3: Add Animation System Defensive Checks
**Problem**: Animation can be triggered with no images loaded, causing errors
**Impact**: Console errors, poor UX, potential crashes
**Fix**: Add validation before animation starts, better error messages
**Priority**: High (reliability)
**Estimated Time**: 20 minutes

---

## Phase 1: Animation System ✅ COMPLETED

### GSAP Setup ✅
- [x] Add gsap dependency to package.json
- [x] Run `npm install gsap`
- [x] Verify GSAP loads correctly
- [x] Test basic GSAP tween

### Camera Animation Module ✅
- [x] Create `src/camera/animation.js`
- [x] Implement `CameraAnimator` class
  - [x] `constructor(camera, controls)`
  - [x] `async playHeroShot(params)`
  - [x] `calculateHeroPosition(topSlide)`
  - [x] `saveState()` / `restoreState()`
- [x] Add animation state management
  - [x] `isAnimating` flag
  - [x] Disable controls during animation
  - [x] Enable controls after animation
- [x] Implement hero shot sequence
  - [x] Save current camera state
  - [x] Tween to hero position (1.5s)
  - [x] Hold at hero position (1.0s)
  - [x] Tween back to original (1.5s)
  - [x] Restore controls

### Hero Position Calculation ✅
- [x] Calculate top slide bounding box
- [x] Find center point of top slide
- [x] Calculate camera distance for viewport fit
- [x] Account for FOV in distance calculation
- [x] Add padding/margin (1.2x multiplier)

### Easing Options ✅
- [x] Default: `power2.inOut`
- [x] Add options for other easings
  - [x] `elastic.out` (bouncy)
  - [x] `back.inOut` (overshoot)
  - [x] `circ.inOut` (smooth circular)

### UI Integration ✅
- [x] Add "Animation" folder to Tweakpane
- [x] Add "Play Hero Shot" button
- [x] Add duration slider (0.5s - 5.0s)
- [x] Add hold time slider (0s - 3.0s)
- [x] Add easing dropdown
- [x] Show "Animating..." toast during playback
- [x] Add ESC key to cancel animation

### Debug API ✅
- [x] Expose `vexyStax.playAnimation(config)`
- [x] Add animation to help menu
- [x] Test via console
- [x] Document animation API

---

## Phase 2: Video Export (Future)

### Video Export Module
- [ ] Create `src/export/video.js`
- [ ] Implement `VideoExporter` class
- [ ] MediaRecorder integration
- [ ] Frame capture system
- [ ] Video download functionality

---

## Phase 3: Code Refactoring (Future)

### Modular Structure
- [ ] Break main.js (2,521 lines) into focused modules
- [ ] Create directory structure (core/, ui/, image/, etc.)
- [ ] Extract utilities, state management, systems
- [ ] Target: main.js < 300 lines

---

## Phase 4: Build Scripts ✅ COMPLETED

- [x] Create `build.sh` script
- [x] Create `dev.sh` script
- [x] Make scripts executable
- [x] Test build process
- [x] Document in README

---

## Completed Major Milestones
- [x] GSAP animation system (Phase 1)
- [x] Build scripts (Phase 4)
- [x] Planning documents (PLAN.md, TODO.md)
- [x] Materials verification (9 presets)

---

## Next Steps After Quality Improvements
1. Consider video export system (Phase 2)
2. Gradual refactoring (Phase 3) - extract utilities first
3. Add automated tests
4. Performance optimization

---

**Current Status**: Quality improvement phase - fixing animation edge cases and polish
