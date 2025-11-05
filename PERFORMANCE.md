# <!-- this_file: PERFORMANCE.md -->
# Performance Best Practices

## Overview

Vexy Stax JS is designed for smooth 60 FPS rendering with real-time 3D visualization. This guide covers performance monitoring, optimization techniques, and troubleshooting.

---

## Performance Monitoring

### Built-In Tools

**1. FPS Counter (On-Screen Display)**
```javascript
// Enable FPS display in top-right corner
window.vexyStax.showFPS(true);

// Display shows:
// - Current FPS (updated every second)
// - Average FPS (rolling 5-second average)
// - Color coding: Green (≥50), Orange (30-49), Red (<30)
```

**2. Performance Statistics API**
```javascript
// Get comprehensive performance stats
const stats = window.vexyStax.getStats();

console.log(stats);
// Returns:
// {
//   imageCount: 15,
//   totalPixels: 32000000,
//   estimatedMemoryMB: "122.07",
//   cameraMode: "perspective",
//   currentSettings: { ... },
//   performance: {
//     fpsMonitorEnabled: true,
//     currentFPS: 60,
//     historySize: "5/10"
//   }
// }
```

**3. Browser DevTools Integration**
```javascript
// Chrome DevTools Performance Profiler:
// 1. Open DevTools (F12)
// 2. Go to Performance tab
// 3. Click Record
// 4. Interact with the app (load images, animate camera)
// 5. Click Stop
// 6. Analyze frame timing, JavaScript execution, rendering

// Chrome DevTools Memory Profiler:
// 1. Open DevTools (F12)
// 2. Go to Memory tab
// 3. Take heap snapshot
// 4. Load images
// 5. Take another snapshot
// 6. Compare to detect memory leaks
```

---

## Performance Thresholds

### FPS Warnings

```javascript
// Threshold constants (from constants.js)
FPS_WARNING_THRESHOLD = 30  // Red warning if average FPS < 30

// Console warnings appear automatically:
// "[RenderLoop] Performance warning: Average FPS 28 below threshold 30"
```

### Memory Limits

```javascript
// Memory thresholds (from constants.js)
FILE_SIZE_WARN_MB = 10      // Yellow warning per file
FILE_SIZE_REJECT_MB = 50    // Hard limit per file
MEMORY_WARNING_THRESHOLD_MB = 500   // Yellow warning total
MEMORY_CRITICAL_THRESHOLD_MB = 1000 // Red warning total

// Check memory before loading files:
const stats = window.vexyStax.getStats();
if (parseFloat(stats.estimatedMemoryMB) > 500) {
  console.warn('High memory usage detected');
}
```

---

## Optimization Techniques

### 1. Image Optimization

**Recommended Image Sizes**:
- **Maximum dimension**: 4096px × 4096px (16.7M pixels)
- **Typical use**: 2048px × 2048px (4.2M pixels)
- **Mobile/web**: 1024px × 1024px (1.0M pixels)

**File Size Limits**:
- **Hard limit**: 50MB per file
- **Recommended**: <10MB per file for smooth loading

**Best Practices**:
```javascript
// ✅ Good: Compress images before loading
// Use tools: ImageOptim, TinyPNG, Squoosh
// Target: JPEG quality 85%, PNG optimized

// ✅ Good: Use appropriate formats
// - PNG: Transparency, text, graphics
// - JPEG: Photos, gradients
// - WebP: Best compression (if browser supports)

// ❌ Avoid: Loading 50MB uncompressed TIFFs
// ❌ Avoid: 8K resolution images (7680×4320 = 33M pixels)
```

### 2. Stack Size Management

**Performance vs. Stack Size**:
```javascript
// Target stack sizes for smooth 60 FPS:
// - Desktop (dedicated GPU): 50-100 images
// - Desktop (integrated GPU): 20-50 images
// - Laptop: 10-30 images

// Monitor current count:
const stats = window.vexyStax.getStats();
console.log(`Image count: ${stats.imageCount}`);

// Reduce stack if FPS drops:
if (stats.performance.currentFPS < 30) {
  console.warn('Consider removing some images');
}
```

**Memory Estimation**:
```javascript
// Rule of thumb: 4 bytes per pixel (RGBA)
// Example: 2048×2048 image = 16.7MB uncompressed

// Check memory usage:
const stats = window.vexyStax.getStats();
console.log(`Memory: ${stats.estimatedMemoryMB} MB`);
console.log(`Pixels: ${stats.totalPixels.toLocaleString()}`);
```

### 3. Camera and Rendering

**Camera Modes (Performance Impact)**:
- **Perspective**: Standard performance (60 FPS typical)
- **Orthographic**: Slightly better (no perspective calculations)
- **Isometric**: Same as Orthographic
- **Telephoto**: Same as Perspective (narrow FOV)

**Shadow Quality**:
```javascript
// Shadows use Variance Shadow Maps (VSM)
// Shadow map size: 2048×2048 (fixed)
// Performance impact: ~5-10% FPS reduction
// Cannot be disabled (always enabled for visual quality)
```

**Reflections and Materials**:
```javascript
// Material complexity (lowest to highest):
// 1. flat-matte        - Cheapest (no reflections)
// 2. glossy-photo      - Standard (basic reflections)
// 3. plastic-card      - Moderate (PBR reflections)
// 4. glass-slide       - Expensive (transparency + reflections)
// 5. 3d-box           - Most expensive (6-sided geometry)

// Use matte materials for better performance:
// params.materialPreset = 'flat-matte';
```

### 4. Animation Performance

**Camera Animations**:
```javascript
// GSAP animations are GPU-accelerated
// Typical cost: <1ms per frame
// No performance impact on large stacks

// Reduce animation duration for faster response:
window.vexyStax.playAnimation({
  duration: 2,      // Shorter = less overhead
  holdTime: 1,      // Reduce hold time
  easing: 'linear'  // Simpler easing = faster
});
```

### 5. Retina/High-DPI Displays

**Pixel Ratio Handling**:
```javascript
// Automatic DPI detection:
// - 1x display: 1920×1080 → 1920×1080 render buffer
// - 2x display: 1920×1080 → 3840×2160 render buffer (4× pixels!)
// - 3x display: 1920×1080 → 5760×3240 render buffer (9× pixels!)

// Performance impact: 4× pixels = ~4× GPU load
// If FPS drops on retina displays:
// 1. Reduce window size
// 2. Use browser zoom (90%, 80%)
// 3. Close other GPU-intensive tabs
```

---

## Troubleshooting Performance Issues

### Low FPS (<30 FPS)

**Diagnosis Steps**:
```javascript
// 1. Check FPS stats
window.vexyStax.showFPS(true);
const stats = window.vexyStax.getStats();
console.log('FPS:', stats.performance.currentFPS);

// 2. Check image count
console.log('Images:', stats.imageCount);
// → If >50 images: Reduce stack size

// 3. Check memory usage
console.log('Memory:', stats.estimatedMemoryMB, 'MB');
// → If >500MB: Remove large images

// 4. Check camera mode
console.log('Camera:', stats.cameraMode);
// → Try 'orthographic' for better performance

// 5. Check material preset (in UI)
// → Switch to 'flat-matte' for cheapest rendering
```

**Common Solutions**:
1. **Reduce image count**: Remove images from stack
2. **Compress images**: Use smaller/compressed versions
3. **Switch to matte material**: Disable reflections
4. **Reduce window size**: Smaller viewport = fewer pixels
5. **Close other tabs**: Free up GPU resources
6. **Use dedicated GPU**: Switch from integrated to dedicated GPU (laptops)

### Memory Warnings

**Diagnosis**:
```javascript
// Memory warning appears at 500MB
// Critical warning appears at 1000MB

// Check which images are largest:
const stack = window.vexyStax.getImageStack();
stack.forEach(img => {
  const tex = img.texture.image;
  const mb = (tex.width * tex.height * 4) / (1024 * 1024);
  console.log(`${img.filename}: ${tex.width}×${tex.height} = ${mb.toFixed(2)} MB`);
});
```

**Solutions**:
1. **Remove largest images**: Focus on biggest memory consumers
2. **Compress before upload**: Use image compression tools
3. **Reduce resolution**: Downscale images to 2048px max
4. **Export and restart**: Save JSON, reload page, import JSON

### GPU Context Loss

**Symptoms**: Black screen, "WebGL context lost" message

**Automatic Recovery**:
- Context loss is detected automatically
- Textures are reloaded from cached image data
- Renderer settings are restored
- User warning appears (auto-dismisses on recovery)

**Manual Recovery**:
```javascript
// If recovery fails:
// 1. Refresh page (F5)
// 2. Check GPU driver updates
// 3. Reduce memory usage before retry
// 4. Close other GPU-intensive applications
```

---

## Performance Benchmarks

### Typical Performance

**Configuration**: MacBook Pro 16" 2021, M1 Pro, 16GB RAM

| Stack Size | Image Size | Material | FPS | Memory |
|------------|------------|----------|-----|--------|
| 10 images | 2048×2048 | Matte | 60 | 160 MB |
| 25 images | 2048×2048 | Glossy | 60 | 400 MB |
| 50 images | 2048×2048 | Glossy | 58 | 800 MB |
| 100 images | 1024×1024 | Matte | 55 | 400 MB |
| 10 images | 4096×4096 | Glass | 52 | 640 MB |

**Configuration**: Windows Desktop, RTX 3060, 32GB RAM

| Stack Size | Image Size | Material | FPS | Memory |
|------------|------------|----------|-----|--------|
| 10 images | 2048×2048 | Matte | 60 | 160 MB |
| 50 images | 2048×2048 | Glossy | 60 | 800 MB |
| 100 images | 2048×2048 | Plastic | 60 | 1600 MB |
| 200 images | 1024×1024 | Matte | 55 | 800 MB |

**Observations**:
- Dedicated GPUs handle larger stacks better
- Memory usage is primary bottleneck (not GPU)
- Material complexity has minor impact (<10% FPS difference)
- Resolution matters more than image count

---

## Developer Tips

### 1. Monitor Performance During Development

```javascript
// Enable FPS display and check stats regularly
window.vexyStax.showFPS(true);
setInterval(() => {
  const stats = window.vexyStax.getStats();
  if (stats.performance.currentFPS < 30) {
    console.warn('Low FPS detected:', stats.performance.currentFPS);
  }
  if (parseFloat(stats.estimatedMemoryMB) > 500) {
    console.warn('High memory usage:', stats.estimatedMemoryMB, 'MB');
  }
}, 5000); // Check every 5 seconds
```

### 2. Batch Image Loading

```javascript
// ❌ Avoid: Loading images one-by-one in tight loop
for (const file of files) {
  await loadImage(file);
  await new Promise(r => setTimeout(r, 100)); // Add delay
}

// ✅ Good: Use built-in drag-and-drop which handles batching
// Drag multiple files at once - built-in memory checks and batching
```

### 3. Export Before Critical Operations

```javascript
// Before loading large stacks, export current state
window.vexyStax.exportJSON();

// Load new images, test performance

// If too slow, restore from JSON:
// 1. Refresh page
// 2. Import saved JSON
// 3. Adjust stack size
```

### 4. Test on Target Hardware

```javascript
// Test on multiple devices:
// - Desktop with dedicated GPU
// - Laptop with integrated GPU
// - Different browsers (Chrome, Firefox, Safari)
// - Different DPI displays (1x, 2x, 3x)

// Aim for 60 FPS on lowest target hardware
```

---

## Performance Checklist

### Before Deployment
- [ ] Test with 50+ images on target hardware
- [ ] Verify 60 FPS with typical image sizes
- [ ] Test memory usage under 1000MB
- [ ] Verify on retina displays (2x, 3x)
- [ ] Test on integrated GPU (not just dedicated)
- [ ] Check all camera modes perform well
- [ ] Test all material presets
- [ ] Verify GPU context recovery works

### For Users
- [ ] Provide image size guidelines (max 2048px)
- [ ] Recommend file compression
- [ ] Document memory limits (500MB warning)
- [ ] Link to browser requirements
- [ ] Provide performance troubleshooting guide

---

## Additional Resources

- **Browser Compatibility**: See [BROWSER_COMPATIBILITY.md](BROWSER_COMPATIBILITY.md)
- **API Reference**: See [API.md](API.md)
- **Main Documentation**: See [README.md](README.md)

---

**Performance monitoring is built-in. Use it early and often.**
