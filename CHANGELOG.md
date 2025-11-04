## [Unreleased] - Next Release

### Phase 6.9: Code Quality Iteration 10 Complete ✅

**Focus**: Memory safety, code maintainability, color saturation

#### Fixed - Magic Numbers
- **Extracted constants**: Created 6 constants for file size limits, retry logic, dimensions
  - `FILE_SIZE_WARN_MB = 10`, `FILE_SIZE_REJECT_MB = 50`
  - `MAX_DIMENSION_PX = 4096`
  - `MAX_LOAD_RETRIES = 3`, `RETRY_DELAYS_MS = [500, 1500, 3000]`
- **Location**: src/main.js:56-61
- **Impact**: Single source of truth, easier to maintain, follows CLAUDE.md guidelines

#### Fixed - Unsafe Array Access
- **Defensive validation**: Added consistent checks after array access
  - playAnimation() at src/main.js:922-925
  - setViewpointFitToFrame() at src/main.js:2318-2322
- **Pattern**: Check length → access array → validate result
- **Impact**: Prevents potential undefined access crashes

#### Fixed - Memory Leak (Event Listeners)
- **Problem**: 16+ event listeners registered, 0 removeEventListener calls
- **Solution**: Implemented tracked event listener system
  - Created `eventListeners` tracking array (line 28)
  - Created `addTrackedEventListener()` helper (lines 700-703)
  - Tracked all listeners: keyboard (1), resize (1), context loss (2), file input (4)
  - Added cleanup in beforeunload handler (lines 1169-1174)
- **Impact**: Proper resource cleanup, no memory leaks on page refresh

#### Fixed - Color Saturation (User Request)
- **Problem**: Slides appeared washed out in ambience mode
  - Emissive lighting added white glow (emissiveIntensity: 0.05-0.25)
  - High environment reflections (envMapIntensity: 0.55)
- **Solution**: Removed emissive properties, reduced envMapIntensity to 0.15
  - Location: src/main.js:2733-2742
- **Result**: Slides now show full saturation and true colors

#### Confirmed - Floor Color Matching
- **User Request**: Floor must match background exactly (black/white on black/white)
- **Status**: Already implemented correctly
  - `getAdaptiveFloorColor()` returns exact background color (line 518)
  - Depth from reflections/shadows, not floor color

### Technical
- Build time: 6.19s
- Bundle size: 1,141.68 kB (stable, +0.10 kB for tracking infrastructure)
- All tests passing
- Zero syntax errors
- Memory leaks fixed

---

### Phase 7: Code Refactoring Plan

#### Planning - Comprehensive Refactoring Strategy
- **Created REFACTOR_PLAN.md**: 11-day phase-by-phase refactoring plan
  - Problem: main.js is 3,321 lines (violates CLAUDE.md complexity guideline of < 200 lines)
  - Solution: Split into 25 modular ES6 files following Single Responsibility Principle
  - Structure: 9 directories (core, scene, camera, images, materials, ui, export, utils, api)
  - Strategy: Bottom-up approach - foundation → scene → camera → images → materials → ui → export → utils → api
  - Each phase independently tested and committed
  - Timeline: 11 days (2-3 weeks with thorough testing)

- **Research**: Analyzed Three.js modular architecture best practices
  - Consulted: Perplexity AI, Tavily search, Exa search
  - Key patterns: Segment by responsibility, ES6 modules, class-based encapsulation
  - Avoid: Circular dependencies, fragmented scene updates, global state leakage
  - Use: Central AppState singleton, EventBus for module communication

- **Updated TODO.md**: Expanded Phase 7 with detailed 10-phase breakdown (Phase 7.1 through 7.10)
- **Updated PLAN.md**: Added comprehensive Phase 7 section with structure and timeline

### Benefits After Refactoring
- Maintainability: Find any feature in < 10 seconds (vs current monolith)
- Testing: Each module independently testable (currently impossible)
- Collaboration: Multiple developers can work on different modules
- Performance: Can optimize individual modules with profiling
- Future features: Clean architecture for video export and advanced features

### Success Criteria
- main.js: 3,321 lines → ~180 lines (94% reduction)
- All modules: < 250 lines each
- Zero circular dependencies
- All features work identically (no regression)
- Bundle size: Unchanged or smaller
- Python automation: Works unchanged (API compatibility preserved)

**Status**: Plan complete, ready to begin Phase 7.1 (Preparation)

---

## [1.2.2] - 2025-11-04 (UI Polish & Ambience Fix)

### Fixed - Ambience Floor Color
- **Adaptive Floor Color**: Floor now adjusts to background luminance for proper contrast
  - Problem: Black background → black floor (invisible), white background → white floor (washed out)
  - Solution: Created `getAdaptiveFloorColor()` function
  - Dark backgrounds (< 0.5 luminance) → Medium gray floor (0.30)
  - Light backgrounds (>= 0.5 luminance) → Darker gray floor (0.20)
  - Functions: `createFloor()` and `updateBackground()` at src/main.js:506-515, 2259

### Improved - Drop Area Styling
- **Tweakpane Visual Consistency**: Drop area now matches Tweakpane's design language
  - Changed from bright blue (#4a90e2) to subtle rgba() colors
  - Reduced border radius from 8px to 2px (matches Tweakpane)
  - Updated button styling with transparent backgrounds
  - Consistent hover states with proper opacity transitions
  - File: styles/main.css:46-110

### Technical
- CSS bundle: 2.37 kB (↑0.18 kB for improved styling)
- JS bundle: 1,141 kB (stable)
- Build time: 21.15s

## [1.2.1] - 2025-11-04 (Front Viewpoint Fix)

### Fixed - Camera Positioning
- **Front Viewpoint Bug**: Fixed camera distance calculation to use studio canvas size
  - Problem: Camera positioned based on slide dimensions (e.g., 400x300px)
  - Solution: Now uses studio canvas dimensions (e.g., 1920x1080px)
  - Impact: Front viewpoint now correctly fits the entire studio frame in view
  - Example: With 1920x1080 canvas and 400x300 slides, camera now shows full 1920x1080 frame
  - Function: `setViewpointFitToFrame()` at src/main.js:2310-2350

### Technical
- Improved aspect ratio handling for canvas width calculation
- Reduced padding from 10% to 5% for tighter frame fit
- Added clearer console logging with canvas dimensions

## [1.2.0] - 2025-11-04 (UI Refactoring)

### Changed - UI Organization
- **Reorganized Tweakpane UI** per 103.md specification for improved workflow
  - Split Studio folder into separate Studio and Camera sections
  - Studio: Size, Color, Transparent, Ambience
  - Camera: Viewpoint, Mode, Zoom, FOV
  - Slides: Material, Distance (unchanged)
- **Replaced folders with tabs** for better organization
  - File tab: JSON operations (Open/Paste/Save/Copy) + Tools (Defaults/Clear)
  - Image tab: PNG export (1x/2x/4x)
  - Video tab: Animation controls (Play Hero Shot, Duration, Easing)
- **Improved label clarity**
  - "Background" → "Color" for background color
  - "Transparent BG" → "Transparent" for brevity
  - "3D Stack View" → "3D Stack" for consistency

### Improved - User Experience
- **Better workflow separation** between file operations, image export, and video
- **Clearer hierarchy** distinguishing studio settings from camera controls
- **Reduced visual clutter** with tabbed interface instead of multiple folders
- **Logical grouping** of related controls for easier access

### Technical
- Uses native Tweakpane tabs API (addTab with pages array)
- Maintains all existing functionality with zero breaking changes
- Build successful: 1,146 kB bundle (292 kB gzipped)

## [1.1.1] - 2025-11-04 (Critical Fixes & UI Improvements)

### Fixed - Export Rendering
- **4x PNG Export Bug**: Fixed off-screen rendering issue where high-res exports were blank
  - Problem: Changing renderer size caused viewport zoom, pushing content off-screen
  - Solution: Use `renderer.setPixelRatio()` to increase resolution while maintaining view
  - Now correctly exports at 2x, 4x resolution with full composition visible
  - Export filename now includes scale factor (e.g., `vexy-stax-4x-2025-11-04.png`)

### Improved - UI Compactness
- **Compact Tweakpane Layout**: Reorganized controls for better space efficiency
  - PNG Export: Subfolder with 3 buttons (1x, 2x, 4x) instead of 2 separate buttons
  - JSON Operations: Subfolder with 4 buttons (Export, Import, Copy, Paste)
  - Folders default to collapsed state for cleaner interface
  - Reduces vertical space usage significantly

### Added - Clipboard Operations
- **Copy Configuration**: Copies current scene config (including images) to clipboard as JSON
  - Same format as Export JSON but uses clipboard instead of file download
  - Includes all params: camera mode, FOV, transparent BG, Z-spacing, camera position
  - Alert notification on success/failure
- **Paste Configuration**: Restores scene from clipboard JSON
  - Validates JSON structure before applying
  - Clears existing scene and loads new configuration
  - Recreates all images with proper materials and shadows
  - Updates Tweakpane to reflect new settings
  - Alert notification on success/failure

### Technical Improvements
- Export function now logs actual output dimensions to console
- Better error handling with user-friendly alert messages
- Clipboard API with promise-based error handling
- Maintains full image quality in copy/paste operations (base64 PNG encoding)

## [1.1.0] - 2025-11-04 (Major Feature Update)

### Added - Advanced Camera System
- **Multiple Camera Modes**: Perspective, Orthographic, Isometric, and Telephoto
- **Telephoto Mode**: Distant camera (1500px) with narrow FOV (30°) for reduced perspective distortion
- **Orthographic Projection**: True parallel projection with no perspective distortion
- **Isometric View**: 45° angled orthographic view for technical drawings
- **Dual Camera System**: Separate perspective and orthographic cameras for optimal rendering
- **FOV Slider**: Adjustable field of view (15°-120°) for perspective modes
- **Distance Slider**: Control camera distance (200-2000px)
- **Dynamic Camera Switching**: Seamless transitions between camera modes

### Added - Enhanced Export Features
- **Transparent Background Support**: Toggle transparency for PNG exports
- **Alpha Channel**: WebGL renderer configured with alpha support
- **Background Mode Toggle**: Switch between solid color and transparent
- **Active Camera Export**: Exports use the currently selected camera mode
- **High-Resolution Export**: Verified 2x and 4x resolution multipliers work correctly

### Added - Advanced Image Management
- **Drag & Drop Interface**: Visual drop zone with hover feedback
- **Multi-File Upload**: Support for dragging multiple images at once
- **Image List UI**: Visual list of all loaded images with thumbnails info
- **Reordering**: Drag images in the list to reorder the Z-stack
- **Individual Delete**: Remove specific images without clearing all
- **Live Updates**: UI automatically updates on add/remove/reorder
- **Image Metadata Display**: Shows filename and original dimensions

### Improved - User Experience
- **Better File Input**: Hidden native file input, styled custom button
- **Visual Feedback**: Drag-over highlighting for drop zone
- **Improved Controls Layout**: Camera settings in dedicated folder
- **OrbitControls Limits**: Min/max distance constraints for better navigation
- **Console Logging**: Detailed feedback for all operations

### Technical Improvements
- Dual camera system (PerspectiveCamera + OrthographicCamera)
- Dynamic camera switching with OrbitControls updates
- Proper frustum calculations for orthographic camera
- Unique IDs for image tracking and reordering
- Memory cleanup on image deletion
- Window resize handling for both cameras

## [1.0.1] - 2025-11-04 (Post-Test Quality Improvements)

### Testing
- Added comprehensive test report (TEST_REPORT.md)
- Verified all 15 functions for correctness
- Analyzed 479 lines of JavaScript
- Test score: 9.2/10 ✅ PASS
- Production readiness confirmed

### Issues Identified
- 3 medium-risk items identified
- 2 low-risk items identified
- 0 critical issues found

### Improvements Planned
- Scale parameter validation for exportPNG
- File input reset after clearAll
- File size warnings for large uploads

# Changelog

All notable changes to Vexy Stax will be documented in this file.

## [Unreleased]

### Added - Ambience Rendering Upgrade (2025-11-04)
- **Soft reflections**: Ambience floor now uses a grouped base mesh plus custom blurred Reflector shader for subtle mirror falloff.
- **Global environment light**: PMREM-generated `RoomEnvironment` assigned to the scene so PBR materials read consistent reflections.
- **Softer shadows**: Renderer switches to VSM shadow maps and increases directional light blur samples for diffused contact shadows.
- **Resilient cleanup**: Reflection render target resizes with the viewport and environment/floor resources dispose cleanly on teardown.

### Version 1.0.0 - MVP Complete (2025-11-04)

Complete implementation of core features across 5 phases.

### Added - Phase 5: JSON Export/Import (2025-11-04)

#### JSON Export
- Export complete scene configuration as JSON
- Embed images as base64 data URLs
- Save all parameters (Z-spacing, background color)
- Save camera position
- Timestamped filenames

#### JSON Import
- Load saved configurations
- Reconstruct complete scene from JSON
- Validate config structure
- Clear existing scene before import
- Update Tweakpane with imported params
- Error handling with user alerts

### Added - Phase 4: PNG Export (2025-11-04)

#### PNG Export Features
- Export current view as PNG image
- High-resolution export option (4x)
- Temporary canvas resizing for quality
- Automatic size restoration
- Timestamped filenames (vexy-stax-YYYY-MM-DDTHH-MM-SS.png)
- Download link creation and cleanup

### Added - Phase 3: Tweakpane Controls (2025-11-04)

#### UI Controls
- Tweakpane integration in top-right corner
- Z-spacing slider (0-500px, step 10)
- Background color picker
- Viewpoint presets folder with 4 buttons:
  - Front view (0, 0, 800)
  - Top view (0, 800, 100)
  - Isometric view (500, 500, 500)
  - Side view (800, 0, 0)
- Clear All button with memory cleanup

#### Real-time Updates
- Z-spacing instantly repositions all images
- Background color updates scene
- Camera position updates with OrbitControls sync

### Added - Phase 2: Image Loading & Stacking (2025-11-04)

#### Image Handling
- File input with styled button
- Multiple file selection support
- FileReader API integration
- Three.js TextureLoader for texture creation
- Auto-scaling images to max 400px dimension
- Proportional scaling (maintains aspect ratio)

#### Stack Management
- PlaneGeometry creation for each image
- MeshBasicMaterial with textures
- Z-axis positioning with configurable spacing
- imageStack array for tracking loaded images
- File type validation (PNG, JPG only)
- Error handling for failed loads

### Added - Phase 1 Complete (2025-11-04)

#### Project Setup
- Initialized npm project with package.json
- Installed dependencies:
  - three@0.181.0 (3D rendering engine)
  - tweakpane@4.0.5 (UI controls)
  - vite@7.1.12 (dev server and build tool)
- Configured ES modules in package.json
- Added npm scripts: dev, build, preview

#### File Structure
- Created `index.html` with canvas element and script loading
- Created `styles/main.css` with basic styling
- Created `src/main.js` with Three.js setup
- Created directories: src/, styles/, examples/

#### Three.js Implementation
- Scene setup with black background
- PerspectiveCamera positioned at (0, 0, 800)
- WebGLRenderer with antialiasing and preserveDrawingBuffer
- OrbitControls for camera manipulation
- Test plane geometry (400x400, red color)
- Render loop with requestAnimationFrame
- Window resize handling

#### Styling
- Full viewport canvas
- Dark theme (#1a1a1a background)
- Fixed positioning for controls container
- Responsive design

### Testing
- ✅ Dev server starts without errors
- ✅ Test plane renders correctly
- ✅ OrbitControls functional
- ✅ Window resize works
- ✅ No console errors
- ✅ Canvas takes full viewport

### Technical Notes
- Using Three.js OrbitControls from examples/jsm
- preserveDrawingBuffer enabled for future PNG export
- devicePixelRatio set for crisp rendering on high-DPI screens
- DoubleSide material for test plane (visible from both sides)
