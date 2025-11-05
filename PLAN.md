# <!-- this_file: PLAN.md -->
# Vexy Stax JS – Implementation Plan

## One-Sentence Scope
Maintain a browser-based Three.js studio that stacks 2D artwork with accurate color reproduction, provides camera controls and animations, and exports PNG/JSON artifacts while keeping the codebase modular and testable.

---

## Current Focus – Phase 4: Main.js Modularization (2025-11-05)

### Phase 3: Documentation & Code Quality ✅ COMPLETE
**Completed**: 2025-11-05
**Results**: 110/110 tests passing, zero memory leaks, full JSDoc coverage

### Phase 4: Quality Improvements & Modularization (IN PROGRESS)
**Timeline**: Current iteration
**Status**: 89 quality improvement iterations complete ✅
**Progress**:
- ✅ 227/227 tests passing (+117 from baseline, includes 5 integration tests + 4 Iteration 73 constant tests)
- ✅ RenderLoop module extracted and integrated
- ✅ 99.3% logging migration (144/145 console calls to logger, 7 intentional console calls remain)
- ✅ Documentation optimized & complete (README 194 lines, all 8 dependencies documented, BROWSER_COMPATIBILITY.md 227 lines, PERFORMANCE.md 400+ lines)
- ✅ 96%+ coverage on core utilities
- ✅ Code robustness verified (WebGL recovery, resource cleanup, input validation, API input validation comprehensive)
- ✅ Integration tests added (cross-module interaction testing)
- ✅ Test suite documentation (16 files with comprehensive JSDoc headers)
- ✅ Complete constant coverage (all 36 exported constants validated + 10 Iteration 73 constants)
- ✅ npm package configured (entry points: main, module, exports, files)
- ✅ Cross-platform consistency (.editorconfig + .gitattributes for LF line endings)
- ✅ Package metadata accurate (LICENSE copyright, npm help updated)
- ✅ Project hygiene (obsolete/duplicate docs removed: 16→9 files, -119K total)
- ✅ JSDoc @example tags added to main.js exports (exportPNG, clearAll, importJSON)

**Current Problem**: main.js is 3,367 lines (was 3,455, -88 from RenderLoop)
**Goal**: Complete remaining 5 module extractions to reduce to <300 lines orchestration layer

---

## Extraction Strategy

### Step 1: Render Loop Module
**File**: src/core/RenderLoop.js
**Lines**: ~100 lines
**Scope**:
- requestAnimationFrame management
- FPS tracking (if showFPS enabled)
- Pause/resume animation
- Render callback registration

**API**:
```javascript
class RenderLoop {
  start(renderCallback)
  stop()
  pause()
  resume()
  showFPS(enabled)
  getCurrentFPS()
}
```

---

### Step 2: UI Initialization Module
**File**: src/ui/TweakpaneSetup.js
**Lines**: ~200 lines
**Scope**:
- Tweakpane folder structure creation
- Control bindings (sliders, buttons, color pickers)
- Material preset buttons
- Viewpoint preset buttons
- Tab setup (File/Image/Video/Studio/Camera)

**API**:
```javascript
class TweakpaneSetup {
  constructor(container, params, callbacks)
  createStudioFolder()
  createCameraFolder()
  createFileFolder()
  bindControls()
  refresh()
}
```

---

### Step 3: File Handling Module
**File**: src/files/FileHandler.js
**Lines**: ~180 lines
**Scope**:
- Drag/drop event handlers
- Browse button functionality
- File type validation
- Size validation (50MB limit)
- Memory usage calculation/warnings
- Multi-file processing

**API**:
```javascript
class FileHandler {
  constructor(callbacks)
  enableDragDrop(element)
  enableBrowse(button, input)
  validateFile(file)
  checkMemoryUsage(newBytes)
  processFiles(fileList)
}
```

---

### Step 4: Scene Composition Module
**File**: src/core/SceneComposition.js
**Lines**: ~200 lines
**Scope**:
- Image loading from File/URL/DataURL
- Texture creation with retry logic
- Mesh creation (PlaneGeometry/BoxGeometry)
- Z-positioning along stack
- Material application
- Mesh deletion with resource cleanup
- Stack reordering

**API**:
```javascript
class SceneComposition {
  constructor(scene, params)
  addImageFromFile(file)
  addImageFromDataURL(dataURL, filename)
  removeImage(meshId)
  reorderStack(fromIndex, toIndex)
  updateZSpacing(newSpacing)
  updateMaterials(materialProps)
  clearAll()
}
```

---

### Step 5: Camera Controller Module
**File**: src/camera/CameraController.js
**Lines**: ~150 lines
**Scope**:
- Camera mode switching (Perspective/Ortho/Iso/Telephoto)
- Viewpoint preset application
- FOV/zoom controls
- Integration with existing CameraAnimator
- OrbitControls management

**API**:
```javascript
class CameraController {
  constructor(cameras, controls, animator)
  setMode(mode) // 'perspective'|'orthographic'|'isometric'|'telephoto'
  setViewpoint(preset) // 'front'|'top'|'beauty'|'center'|etc
  setFOV(degrees)
  setZoom(factor)
  animateToViewpoint(preset, duration)
}
```

---

### Step 6: Export Manager Module
**File**: src/export/ExportManager.js
**Lines**: ~200 lines
**Scope**:
- PNG export with scale multiplier (1x/2x/4x)
- JSON serialization (params + images as base64)
- JSON deserialization
- Clipboard copy/paste
- Download trigger

**API**:
```javascript
class ExportManager {
  constructor(renderer, scene, camera, params)
  exportPNG(scale, filename)
  exportJSON()
  importJSON(jsonString)
  copyToClipboard()
  pasteFromClipboard()
}
```

---

## Testing Strategy

### Unit Tests
- Test each new module independently
- Mock dependencies (scene, renderer, etc.)
- Verify API contracts
- Test error handling

### Integration Tests
- Test module interactions
- Verify orchestration in main.js
- Check resource cleanup
- Validate event flow

### Regression Prevention
- All 110 existing tests must pass
- Bundle size must not increase significantly
- Performance must remain ≥60fps

---

## Success Criteria

✅ main.js < 300 lines (entry point only)
✅ Each module < 250 lines
✅ Zero circular dependencies
✅ All tests passing (110+)
✅ Bundle size ≤ 1,150 kB
✅ Build successful
✅ No runtime errors

---

## Risk Assessment

**Risk 1: Circular Dependencies**
- Probability: Medium
- Impact: High (build failure)
- Mitigation: Use dependency injection, avoid cross-imports
- Verification: Bundle build must succeed

**Risk 2: Breaking Changes**
- Probability: Low (good test coverage)
- Impact: High
- Mitigation: Run tests after each extraction
- Verification: All tests must pass

**Risk 3: Performance Regression**
- Probability: Low
- Impact: Medium
- Mitigation: Profile before/after
- Verification: Maintain 60fps with 10+ images

---

## Future Considerations (Post-Phase 4)

- Video export (MP4/WebM via MediaRecorder API)
- Advanced material editor (custom shaders)
- Plugin system for extensions
- Cloud storage integration
- Collaborative features
- Automated visual regression (Playwright)

---

## Technical Debt Backlog

1. ✅ JSDoc coverage (constants.js: 100%)
2. ✅ Event listener memory management (zero leaks)
3. 🔄 Main.js modularization (3,367 lines → <300) - Deferred to Phase 5
4. ✅ Console.log cleanup (99.3% migrated to logger, 7 intentional console calls)
5. ✅ Deep freeze for nested constant objects

---

## Release Preparation Checklist (v0.2.0)

### Pre-Release Verification
- [x] All tests passing (208/208) ✅
- [x] Build successful (1,143.27 kB) ✅
- [x] Documentation synchronized (24 iterations documented) ✅
- [x] No uncommitted work (ready for git commit)
- [ ] Git commit with comprehensive message
- [ ] Version bump in package.json (0.1.0 → 0.2.0)
- [ ] Git tag release (v0.2.0)

### Quality Metrics for v0.2.0
- **Tests**: 208 (+98 from v0.1.0, +89% improvement)
- **Coverage**: helpers.js 100%, core 96.41%, utils 97.22%
- **Build**: 1,143.27 kB (stable, -6 kB from v0.1.0)
- **Documentation**: 9 essential files (was 16, -119K cleanup)
- **Code Quality**: 24 systematic improvement iterations
- **Package**: npm-ready with proper entry points, cross-platform consistency

### Release Notes Template
```markdown
## v0.2.0 - Quality & Refinement Release

This release focuses on code quality, testing, and developer experience through
24 systematic improvement iterations. No new features, but significant improvements
to maintainability, reliability, and documentation.

**Highlights:**
- +98 tests (89% increase), 96%+ coverage on core utilities
- 99.3% logging migration to structured logger (19 module loggers)
- Complete dependency documentation, npm package configuration
- Cross-platform consistency (.editorconfig + .gitattributes)
- 119K of obsolete/duplicate documentation removed

**Breaking Changes:** None
**Upgrade Path:** Drop-in replacement for v0.1.0
```

### Post-Release Tasks
- [ ] Update GitHub Pages deployment
- [ ] Tag release on GitHub with release notes
- [ ] Update README badges if needed
- [ ] Consider npm publish (package is ready)
- [ ] Plan Phase 5: Module Extraction Strategy
