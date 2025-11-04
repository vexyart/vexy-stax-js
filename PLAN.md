# Vexy Stax JS - Implementation Plan

**One-sentence scope**: Browser-based 3D image stack visualization with GSAP animations, PBR materials, and JSON export/import.

## Core Objectives

1. **3D Visualization**: Three.js-based image stacking with camera controls
2. **Animation System**: GSAP-powered hero shot animations  
3. **Material Presets**: 9 PBR material presets for different looks
4. **JSON Export/Import**: Save and load complete configurations
5. **Debug API**: Automation-friendly window.vexyStax interface

## Architecture

```
User Interface (Tweakpane)
    ↓
Main Application (main.js)
    ↓
Three.js Scene → GSAP Animation → Export System
    ↓
window.vexyStax API (for Python automation)
```

## Implementation Status

### ✅ Phase 1: Core 3D Visualization (COMPLETE)

**Scene Setup**:
- Three.js renderer with WebGL
- Perspective/Orthographic/Isometric camera modes
- OrbitControls for user interaction
- Image stacking along Z-axis

**Image Loading**:
- File input for PNG upload
- Multiple image support
- Maintains imageStack array
- Texture management with Three.js

**UI Controls** (Tweakpane):
- Camera mode selector
- FOV/Zoom controls
- Z-spacing slider
- Background color picker
- Transparent background toggle

### ✅ Phase 2: Animation System (COMPLETE)

**GSAP Integration** (`src/camera/animation.js`):
- CameraAnimator class
- playHeroShot() method
- Tween to hero position → Hold → Return
- Duration/holdTime/easing parameters
- ESC key cancellation

**UI Integration**:
- Animation folder in Tweakpane
- Play button triggers animation
- Disable controls during playback
- Toast notifications for feedback

**Debug API**:
- `window.vexyStax.playAnimation(config)`
- `window.vexyStax.cancelAnimation()`

### ✅ Phase 3: Material System (COMPLETE)

**PBR Materials** (9 presets):
1. Flat Matte (roughness: 1.0, metalness: 0)
2. Soft Satin (roughness: 0.7, metalness: 0)
3. Glossy Photo (roughness: 0.3, metalness: 0)
4. Glass Clear (roughness: 0.1, metalness: 0)
5. Brushed Metal (roughness: 0.5, metalness: 0.9)
6. Polished Metal (roughness: 0.2, metalness: 1.0)
7. Thick Card (thickness: 20, border: 2px)
8. Thin Film (thickness: 1, border: 0)
9. Framed Print (thickness: 10, border: 5px)

**Material Controls**:
- Roughness slider (0-1)
- Metalness slider (0-1)
- Thickness slider
- Border width/color
- Preset buttons for quick apply

### ✅ Phase 4: Export/Import System (COMPLETE)

**JSON Export**:
- Includes all images (base64 embedded)
- Camera position
- Material settings
- App parameters
- Copy to clipboard or download

**JSON Import**:
- Paste from clipboard
- Load from file
- Restores full state

**PNG Export**:
- 1x, 2x, 3x, 4x resolution options
- Preserves transparency
- Canvas-based rendering

**Debug API**:
- `window.vexyStax.exportPNG(scale)`
- `window.vexyStax.loadConfig(config)`

### ✅ Phase 5: Debug API (COMPLETE)

**Exposed Methods**:
- `exportPNG(scale)` - Export PNG at scale
- `clearAll()` - Remove all images
- `getImageStack()` - Get image info
- `undo()` / `redo()` - History navigation
- `showFPS(enabled)` - Toggle FPS counter
- `loadSettings()` / `saveSettings()` / `resetSettings()`
- `getStats()` - Memory and image statistics
- `loadConfig(config)` - Load JSON config programmatically
- `playAnimation(config)` - Play hero shot
- `cancelAnimation()` - Stop animation
- `help()` - Show API documentation

### 🔄 Phase 6: Quality Improvements (CURRENT)

**Completed**:
- ✅ Added loadConfig() API method for Python automation
- ✅ Fixed missing texture property in imageStack (3 locations)
- ✅ Updated help text with new API method

**In Progress**:
- 🔄 Create PLAN.md (this file)
- 🔄 Create TODO.md (next)

### ⏳ Phase 7: Code Refactoring (READY TO START)

**Issue**: main.js is 3,321 lines - violates CLAUDE.md complexity guidelines (files > 200 lines)

**Solution**: Split into 25 modular ES6 files following Single Responsibility Principle

**Comprehensive Plan**: See `REFACTOR_PLAN.md` for detailed 11-day refactoring strategy

**High-Level Structure**:
```
src/
├── main.js (~180 lines - entry point)
├── core/ (AppState, constants, EventBus)
├── scene/ (SceneManager, LightingManager, FloorManager)
├── camera/ (CameraManager, ViewpointPresets, ControlsManager, animation.js✅)
├── images/ (ImageLoader, ImageStack, DragDropHandler)
├── materials/ (presets, MaterialManager, BorderManager)
├── ui/ (TweakpaneManager, ImageListUI, Toast)
├── export/ (PNGExporter, JSONExporter)
├── utils/ (helpers, HistoryManager, FPSMonitor, MemoryTracker)
└── api/ (DebugAPI)
```

**Benefits**:
- Maintainability: Find any feature in <10 seconds
- Testing: Each module unit-testable
- Collaboration: Work on modules independently
- Performance: Optimize individual modules
- Future: Clean place to add video export

**Strategy**: Phase-by-phase (10 phases), each phase tested and committed separately

**Timeline**: 11 days (2-3 weeks with testing)

### ⏳ Phase 8: Video Export (FUTURE)

**Goal**: Export 60fps video of animation

**Approach**: MediaRecorder API
```javascript
async function recordAnimation() {
  const stream = canvas.captureStream(60);
  const recorder = new MediaRecorder(stream, {
    mimeType: 'video/webm;codecs=vp9',
    videoBitsPerSecond: 5000000
  });
  
  // Trigger animation
  await cameraAnimator.playHeroShot(...);
  
  // Download video
  recorder.stop();
}
```

**UI**: Add "Record Video" button in Animation folder

**Debug API**: `window.vexyStax.recordAnimation(config)`

## Dependencies

| Package | Version | Purpose | Status |
|---------|---------|---------|--------|
| three | ^0.181.0 | 3D rendering | ✅ Added |
| gsap | ^3.13.0 | Animation | ✅ Added |
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
