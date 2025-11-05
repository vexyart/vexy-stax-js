# <!-- this_file: examples/README.md -->
# Example Configurations

This directory contains sample JSON configurations demonstrating various use cases for Vexy Stax JS.

---

## What Are These Files?

These are `.json` files that can be imported into Vexy Stax JS using:
- **Keyboard**: Press `L` to load JSON
- **API**: `window.vexyStax.importJSON(jsonString)`
- **UI**: File tab → Import JSON button

Each example showcases different material presets, camera angles, and stack configurations.

---

## Available Examples

### 1. basic-stack.json
**Purpose**: Simple 3-layer stack with default settings

**Features**:
- 3 placeholder images (red, green, blue)
- Flat matte material
- Front camera view
- Default spacing (50px)

**Use Case**: Testing basic functionality, understanding JSON structure

---

### 2. photo-gallery.json
**Purpose**: Glossy photo gallery with beauty shot angle

**Features**:
- 5 placeholder images
- Glossy photo material (low roughness)
- Beauty camera angle (35° elevation)
- Tight spacing (20px) for gallery effect

**Use Case**: Showcasing photography, portfolio presentations

---

### 3. card-stack-3d.json
**Purpose**: 3D card stack with thick board material

**Features**:
- 4 placeholder images
- Thick board material (3D box mode)
- Isometric camera view
- Wide spacing (100px) for depth
- Visible floor with shadows

**Use Case**: Card games, UI mockups, layered designs

---

### 4. glass-layers.json
**Purpose**: Transparent glass layers with high transparency

**Features**:
- 6 placeholder images
- Glass slide material (0.3 opacity)
- Top-down camera view
- Minimal spacing (10px)
- White background

**Use Case**: Overlay effects, transparency demos

---

### 5. metallic-showcase.json
**Purpose**: Metallic finish with dramatic lighting

**Features**:
- 3 placeholder images
- Metallic card material (high metalness)
- Side view camera (45° angle)
- Medium spacing (75px)
- Dark background for contrast

**Use Case**: Product showcases, premium presentations

---

## JSON Structure Reference

All configuration files follow this structure:

```json
{
  "version": "0.2.0",
  "images": [
    {
      "filename": "image1.png",
      "dataURL": "data:image/png;base64,..."
    }
  ],
  "params": {
    "zSpacing": 50,
    "cameraMode": "perspective",
    "cameraZoom": 1.0,
    "cameraFOV": 50,
    "viewpoint": "front",
    "bgColor": "#38383d",
    "bgAlpha": 1.0,
    "materialPreset": "flat-matte",
    "roughness": 0.8,
    "metalness": 0.0,
    "thickness": 10,
    "borderWidth": 2,
    "emissive": 0.0,
    "floorVisible": true,
    "floorOpacity": 0.01,
    "ambientMode": false
  }
}
```

---

## How to Use Examples

### Method 1: Load in Browser
1. Open https://vexyart.github.io/vexy-stax-js/
2. Press `L` (Load JSON)
3. Select example file from `examples/` directory
4. Configuration applied automatically

### Method 2: Load in Dev Server
```bash
npm run dev
# Navigate to http://localhost:5173
# Press `L` and select example file
```

### Method 3: Programmatic Loading
```javascript
// Fetch example
fetch('examples/basic-stack.json')
  .then(r => r.text())
  .then(json => window.vexyStax.importJSON(json));
```

---

## Creating Your Own Examples

### 1. Set Up Your Scene
- Load images
- Adjust materials, camera, spacing
- Fine-tune lighting and floor

### 2. Export Configuration
- Press `J` or call `window.vexyStax.exportJSON()`
- Save the downloaded `.json` file
- Move to `examples/` directory

### 3. Document Your Example
- Add entry to this README
- Describe purpose and use case
- Note any special features

---

## Example Use Cases

### For Testing
- **basic-stack.json**: Quick smoke test
- **glass-layers.json**: Transparency/alpha testing
- **card-stack-3d.json**: 3D rendering validation

### For Demos
- **photo-gallery.json**: Showcase photography
- **metallic-showcase.json**: Product presentations
- **card-stack-3d.json**: UI/UX mockups

### For Tutorials
- **basic-stack.json**: "Getting Started" guide
- **photo-gallery.json**: "Material Presets" tutorial
- **glass-layers.json**: "Transparency Effects" guide

---

## Technical Notes

### Image Data URLs
- All examples use placeholder base64-encoded images
- Replace `dataURL` values with your own images
- Max size per image: 50 MB
- Supported formats: PNG, JPG, GIF, WebP, SVG

### Parameter Ranges
| Parameter | Min | Max | Default |
|-----------|-----|-----|---------|
| zSpacing | 0 | 500 | 50 |
| cameraZoom | 0.1 | 3.0 | 1.0 |
| cameraFOV | 15 | 120 | 50 |
| bgAlpha | 0.0 | 1.0 | 1.0 |
| roughness | 0.0 | 1.0 | 0.8 |
| metalness | 0.0 | 1.0 | 0.0 |
| thickness | 1 | 50 | 10 |
| borderWidth | 0 | 20 | 2 |
| emissive | 0.0 | 5.0 | 0.0 |
| floorOpacity | 0.0 | 1.0 | 0.01 |

### Camera Modes
- `perspective`: Natural 3D view (default)
- `orthographic`: Parallel projection, no perspective distortion
- `isometric`: 45° angle, technical drawings
- `telephoto`: Narrow FOV, compressed depth

### Viewpoint Presets
- `front`: Straight-on view
- `top`: Top-down orthographic
- `beauty`: 35° elevation (hero shot)
- `side`: 45° side angle
- `3d-stack`: Isometric 3D view
- `center`: Centered on stack
- `isometric`: Classic isometric view

---

## Contributing Examples

We welcome contributions of useful example configurations!

### Guidelines
1. **Test thoroughly**: Ensure example loads correctly
2. **Document clearly**: Add description to this README
3. **Use placeholders**: Don't include copyrighted images
4. **Keep small**: Optimize image sizes
5. **Name clearly**: Use descriptive filenames (e.g., `sunset-photos.json`)

### Submission Process
1. Create example JSON file
2. Add entry to this README
3. Submit Pull Request
4. Tag with `enhancement` label

---

## Troubleshooting

### "Failed to import JSON"
**Cause**: Invalid JSON syntax
**Fix**: Validate JSON with `jq` or online validator
```bash
jq . examples/your-file.json  # Validates syntax
```

### "Image failed to load"
**Cause**: Invalid or corrupted base64 data URL
**Fix**: Re-export from working configuration

### "Configuration partially applied"
**Cause**: Missing required fields
**Fix**: Ensure all parameters in structure above are present

---

## Related Documentation

- [API.md](../API.md) - JavaScript API for import/export
- [.ui-guide.md](../.ui-guide.md) - Keyboard shortcuts (L = Load, J = Save)
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines

---

**Have questions or suggestions?** Open an issue on GitHub!
