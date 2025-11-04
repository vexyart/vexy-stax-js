# Vexy Stax JS - Implementation Plan

**Purpose**: Browser-based 3D image stacking visualizer with animation and export

---

## Core Objectives

1. **3D Visualization**: Interactive Three.js-based image stacking in 3D space
2. **Animation System**: GSAP-driven camera animations with "hero shot" feature
3. **Video Export**: Capture animations as WebM/MP4 video files
4. **Modular Architecture**: Refactor 2,400-line monolith into maintainable modules
5. **Material System**: Already implemented ✅ (9 presets)

---

## Current State Analysis

### ✅ Already Implemented
- Three.js 3D rendering with PBR materials
- 4 camera modes (Perspective, Orthographic, Isometric, Telephoto)
- 9 material presets (Flat Matte, Glossy Photo, Plastic Card, etc.)
- Image loading (drag-and-drop, file browser)
- PNG export (1x, 2x, 4x resolution)
- JSON config export/import
- Undo/redo system (10-state history)
- Keyboard shortcuts
- FPS monitoring
- Memory management
- WebGL context recovery

### ❌ Needs Implementation
- Animation system (GSAP-based camera tweens)
- Video export (MediaRecorder API)
- Modular code structure (break up 2,400-line main.js)
- Build scripts (build.sh)

---

## Architecture Refactoring

### Current Structure (Monolithic)
```
src/
└── main.js  # 2,400 lines - everything in one file
```

### Target Structure (Modular)
```
src/
├── main.js                  # 200 lines - entry point + initialization
├── core/
│   ├── scene.js             # Scene, camera, renderer setup
│   ├── lighting.js          # Lighting configuration
│   └── controls.js          # Orbit controls setup
├── ui/
│   ├── tweakpane.js         # Tweakpane UI initialization
│   ├── shortcuts.js         # Keyboard shortcuts
│   └── toasts.js            # Toast notification system
├── image/
│   ├── loader.js            # Image loading (drag-drop, file input)
│   ├── stack.js             # Image stack management
│   └── materials.js         # Material presets + application
├── camera/
│   ├── modes.js             # Camera mode switching
│   ├── viewpoints.js        # Preset viewpoints
│   └── animation.js         # GSAP-based camera animations
├── export/
│   ├── png.js               # PNG export functionality
│   ├── json.js              # JSON config export/import
│   └── video.js             # Video capture + encoding
├── state/
│   ├── history.js           # Undo/redo system
│   ├── settings.js          # localStorage persistence
│   └── params.js            # Global parameters
└── utils/
    ├── performance.js       # FPS monitoring, memory checks
    ├── recovery.js          # WebGL context loss recovery
    └── validation.js        # File/image validation
```

**Total Estimated Lines**: ~2,400 split into 23 focused modules (~100 lines each)

---

## Phase 1: Animation System

### 1.1 GSAP Integration

**Goal**: Smooth camera animations with easing

**Dependencies**:
- `gsap@3.13.0` (animation library)

**Implementation**:
```javascript
// src/camera/animation.js
import gsap from 'gsap';

class CameraAnimator {
    constructor(camera, controls) {
        this.camera = camera;
        this.controls = controls;
        this.isAnimating = false;
    }

    async playHeroShot(params = {}) {
        const {
            duration = 1.5,
            holdTime = 1.0,
            ease = 'power2.inOut',
            topSlidePosition = null
        } = params;

        if (this.isAnimating) return;

        // Save current state
        const savedState = this.saveState();

        // Disable manual controls
        this.controls.enabled = false;
        this.isAnimating = true;

        // Calculate hero shot camera position
        const heroPosition = this.calculateHeroPosition(topSlidePosition);

        // Animate to hero shot
        await gsap.to(this.camera.position, {
            ...heroPosition,
            duration,
            ease
        });

        // Hold at hero shot
        await new Promise(resolve => setTimeout(resolve, holdTime * 1000));

        // Return to original position
        await gsap.to(this.camera.position, {
            ...savedState.position,
            duration,
            ease
        });

        // Re-enable controls
        this.controls.enabled = true;
        this.isAnimating = false;
    }

    calculateHeroPosition(topSlide) {
        // Position camera to fill viewport with top slide
        const boundingBox = new THREE.Box3().setFromObject(topSlide);
        const center = boundingBox.getCenter(new THREE.Vector3());
        const size = boundingBox.getSize(new THREE.Vector3());

        // Calculate distance for viewport fit
        const fov = this.camera.fov * (Math.PI / 180);
        const maxDim = Math.max(size.x, size.y);
        const distance = maxDim / (2 * Math.tan(fov / 2));

        return {
            x: center.x,
            y: center.y,
            z: center.z + distance * 1.2
        };
    }

    saveState() {
        return {
            position: { ...this.camera.position },
            target: { ...this.controls.target },
            zoom: this.camera.zoom
        };
    }
}

export default CameraAnimator;
```

**UI Integration**:
- Add "Animation" folder to Tweakpane
- Add "Play Hero Shot" button
- Add duration slider (0.5s - 5.0s)
- Add hold time slider (0s - 3.0s)

---

### 1.2 Animation API

**Expose to Debug API**:
```javascript
window.vexyStax.playAnimation = async (config) => {
    await animator.playHeroShot(config);
};
```

---

## Phase 2: Video Export

### 2.1 Frame Capture

**Goal**: Capture animation frames at 60 FPS

**Implementation**:
```javascript
// src/export/video.js
class VideoExporter {
    constructor(renderer, camera, scene) {
        this.renderer = renderer;
        this.camera = camera;
        this.scene = scene;
        this.frames = [];
    }

    async captureAnimation(animationFn, durationSeconds, fps = 60) {
        this.frames = [];
        const frameCount = Math.ceil(durationSeconds * fps);
        const frameDelay = 1000 / fps;

        for (let i = 0; i < frameCount; i++) {
            // Render frame
            this.renderer.render(this.scene, this.camera);

            // Capture canvas as blob
            const blob = await new Promise(resolve => {
                this.renderer.domElement.toBlob(resolve, 'image/png');
            });

            this.frames.push(blob);

            // Advance animation
            await new Promise(resolve => setTimeout(resolve, frameDelay));
        }

        return this.frames;
    }

    async encodeToVideo(outputFormat = 'webm') {
        // Use MediaRecorder API if supported
        if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
            return this.encodeWithMediaRecorder();
        } else {
            // Fallback: export frames as ZIP
            return this.exportFramesAsZip();
        }
    }

    async encodeWithMediaRecorder() {
        const canvas = this.renderer.domElement;
        const stream = canvas.captureStream(60); // 60 FPS

        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=vp9',
            videoBitsPerSecond: 8000000 // 8 Mbps
        });

        const chunks = [];
        mediaRecorder.ondataavailable = e => chunks.push(e.data);

        mediaRecorder.start();

        // Play animation (triggers stream capture)
        await animator.playHeroShot();

        mediaRecorder.stop();

        // Wait for all chunks
        await new Promise(resolve => {
            mediaRecorder.onstop = resolve;
        });

        // Create video blob
        const blob = new Blob(chunks, { type: 'video/webm' });
        return blob;
    }

    exportFramesAsZip() {
        // Fallback for browsers without MediaRecorder
        // Export frames as individual PNGs in a ZIP file
        // (Implementation using JSZip library)
    }
}

export default VideoExporter;
```

---

### 2.2 UI Integration

**Tweakpane Controls**:
```javascript
// Add to Export folder
const videoFolder = exportFolder.addFolder({ title: 'Video', expanded: false });

videoFolder.addButton({ title: 'Record Animation' }).on('click', async () => {
    showToast('Recording animation...', 'info');

    const exporter = new VideoExporter(renderer, camera, scene);

    // Capture frames while playing animation
    await exporter.captureAnimation(
        () => animator.playHeroShot(),
        4.5, // Total duration
        60   // FPS
    );

    // Encode to video
    const videoBlob = await exporter.encodeToVideo('webm');

    // Download
    const url = URL.createObjectURL(videoBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vexy-stax-animation-${Date.now()}.webm`;
    link.click();

    showToast('✓ Video exported', 'success');
});
```

---

## Phase 3: Code Refactoring

### 3.1 Module Extraction Strategy

**Approach**: Incremental refactoring
1. Extract standalone utilities first (toasts, validation)
2. Extract state management (history, settings)
3. Extract major systems (image, camera, export)
4. Refactor main.js to orchestrate modules

### 3.2 Module Interfaces

**Example: Image Stack Module**
```javascript
// src/image/stack.js
class ImageStack {
    constructor(scene) {
        this.scene = scene;
        this.images = [];
    }

    addImage(texture, filename) {
        // Create mesh, add to scene
    }

    removeImage(index) {
        // Remove mesh, dispose resources
    }

    reorderImages(oldIndex, newIndex) {
        // Reorder stack, update Z positions
    }

    updateZSpacing(spacing) {
        // Update all mesh Z positions
    }

    getImages() {
        return this.images;
    }

    clear() {
        // Remove all images
    }
}

export default ImageStack;
```

---

### 3.3 Migration Plan

**Step-by-step**:
1. Create new module files
2. Copy/paste relevant code sections
3. Convert to class-based or functional modules
4. Export public interface
5. Import in main.js
6. Test functionality unchanged
7. Remove old code from main.js
8. Repeat for next module

**No breaking changes**: External API (`window.vexyStax`) remains unchanged

---

## Phase 4: Build Scripts

### 4.1 Build Script (`build.sh`)

```bash
#!/bin/bash
set -e

echo "Building vexy-stax-js..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Run build
echo "Building for production..."
npm run build

# Verify output
if [ ! -d "docs" ]; then
    echo "Error: docs/ directory not created"
    exit 1
fi

if [ ! -f "docs/index.html" ]; then
    echo "Error: docs/index.html not found"
    exit 1
fi

echo "✓ Build complete!"
echo "  Output: docs/"
echo "  Size: $(du -sh docs/ | cut -f1)"
```

### 4.2 Development Script (`dev.sh`)

```bash
#!/bin/bash

echo "Starting vexy-stax-js development server..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start dev server
npm run dev
```

---

## Dependencies

### New Dependencies
```json
{
  "dependencies": {
    "three": "^0.181.0",
    "tweakpane": "^4.0.5",
    "gsap": "^3.13.0"          // NEW: Animation
  },
  "devDependencies": {
    "vite": "^7.1.12"
  }
}
```

---

## Testing Strategy

### Manual Testing Checklist
- [ ] Hero shot animation plays smoothly
- [ ] Animation can be interrupted
- [ ] Video export works in Chrome/Firefox/Safari
- [ ] All modules load correctly
- [ ] No regression in existing features
- [ ] FPS maintains 60 during animation
- [ ] Memory usage stable during export

### Automated Tests (Future)
- Playwright E2E tests (via vexy-stax-py)
- Visual regression testing
- Performance benchmarks

---

## Timeline

- **Phase 1** (Animation): 1-2 days
- **Phase 2** (Video Export): 2-3 days
- **Phase 3** (Refactoring): 3-4 days
- **Phase 4** (Build Scripts): 0.5 days

**Total**: ~1.5 weeks for complete implementation

---

## Priority Order

**Immediate (Week 1)**:
1. Add GSAP dependency
2. Implement basic hero shot animation
3. Add animation UI controls
4. Create build.sh script

**Near-term (Week 2)**:
5. Implement video export
6. Start code refactoring (utilities first)
7. Continue refactoring (major systems)

**Future**:
8. Complete refactoring
9. Add automated tests
10. Performance optimization

---

## Notes

- Materials system already complete (9 presets) ✅
- Keep existing features intact during refactoring
- Animation should be interruptible (ESC key)
- Video export is bonus feature (Phase 2)
- Refactoring is ongoing (can be gradual)

---

**Status**: Planning complete. Ready to start Phase 1 implementation.
