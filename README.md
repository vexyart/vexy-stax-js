# Vexy Stax

Browser-based tool for arranging PNG/JPG images along the Z-axis in 3D space with interactive controls.

## Features

- **Image Loading**: Drag and drop or select multiple PNG/JPG images
- **3D Visualization**: View images stacked in 3D space using Three.js
- **Interactive Controls**: Adjust Z-spacing, background color, and camera viewpoints in real-time
- **Export Options**:
  - PNG (standard and 4x high-resolution)
  - JSON configuration (with embedded images)
- **Import/Export**: Save and load complete scene configurations
- **Viewpoint Presets**: Front, Top, Isometric, and Side views
- **Orbit Controls**: Free camera manipulation with mouse

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm build
```

Then open http://localhost:5173/

## Usage

1. **Add Images**: Click "Add Images" button and select PNG/JPG files
2. **Adjust Spacing**: Use the Z-Spacing slider to control distance between images (0-500px)
3. **Change Viewpoint**: Click viewpoint preset buttons (Front, Top, Isometric, Side)
4. **Manipulate Camera**: Use mouse to rotate (left drag), pan (right drag), zoom (scroll)
5. **Change Background**: Use color picker to set scene background
6. **Export PNG**: Click "Export PNG" for standard resolution, or "Export PNG (4x)" for high-resolution
7. **Save Configuration**: Click "Export JSON" to save scene with embedded images
8. **Load Configuration**: Click "Import JSON" to restore a saved scene
9. **Clear Scene**: Click "Clear All" to remove all images

## Controls

### Tweakpane Controls
- **Z-Spacing**: Slider (0-500px) - Distance between each image layer
- **Background**: Color picker - Scene background color
- **Viewpoints**:
  - Front: Head-on view (0, 0, 800)
  - Top: Bird's eye view (0, 800, 100)
  - Isometric: 3D angle (500, 500, 500)
  - Side: Profile view (800, 0, 0)
- **Export**:
  - Export PNG: Save current view as PNG
  - Export PNG (4x): Save high-resolution PNG (4x viewport size)
  - Export JSON: Save complete configuration
  - Import JSON: Load saved configuration
- **Clear All**: Remove all images from scene

### Mouse Controls
- **Left Click + Drag**: Rotate camera around scene
- **Right Click + Drag**: Pan camera
- **Scroll Wheel**: Zoom in/out

## Technical Details

### Stack
- **Three.js** (r181): 3D rendering engine
- **Tweakpane** (v4.0.5): Parameter controls UI
- **Vite** (v7.1.12): Dev server and build tool

### Architecture
- Single-page application
- ES6 modules
- No backend required
- All processing client-side

### File Format

JSON export format:
```json
{
  "version": "1.0",
  "params": {
    "zSpacing": 100,
    "bgColor": "#000000"
  },
  "camera": {
    "position": { "x": 0, "y": 0, "z": 800 }
  },
  "images": [
    {
      "filename": "image1.png",
      "dataURL": "data:image/png;base64,...",
      "width": 400,
      "height": 300
    }
  ]
}
```

## Browser Support

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported (macOS/iOS)

Requires:
- WebGL support
- FileReader API
- Modern JavaScript (ES6+)

## Project Structure

```
vexy-stax-wt/
├── index.html          # Main HTML file
├── src/
│   └── main.js         # Application logic
├── styles/
│   └── main.css        # Styling
├── examples/           # Test images (optional)
└── package.json        # Dependencies
```

## Development

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Limitations

- SVG export not currently supported (Three.js SVGRenderer doesn't support textures)
- Maximum recommended images: 50 (performance may degrade with more)
- Large images (>5MB) may load slowly
- High-res export (4x) may consume significant memory

## Future Enhancements

Potential features for v2.0:
- Animation timeline
- Per-image opacity control
- Custom image alignment
- Rotation per plane
- Keyboard shortcuts
- Video export
- SVG export (with manual 2D projection)

## License

ISC

## Author

Adam Twardoch <adam+npm@twardoch.com> (https://twardoch.github.io/)
