# <!-- this_file: BROWSER_COMPATIBILITY.md -->
# Browser Compatibility

## Minimum Requirements

Vexy Stax JS requires modern browser support for WebGL and ES6+ features.

### Supported Browsers

| Browser | Minimum Version | Recommended | Notes |
|---------|----------------|-------------|-------|
| **Chrome** | 90+ | Latest | Full support, best performance |
| **Edge** | 90+ | Latest | Chromium-based, equivalent to Chrome |
| **Firefox** | 88+ | Latest | Full support |
| **Safari** | 14+ | Latest | WebGL support good, performance slightly lower |
| **Opera** | 76+ | Latest | Chromium-based, equivalent to Chrome |

### Not Supported

- Internet Explorer (all versions)
- Safari < 14
- Chrome < 90
- Firefox < 88
- Mobile browsers (iOS Safari, Chrome Mobile) - UI not optimized for touch

---

## Required Browser Features

### WebGL 1.0 (Core Rendering)
**Requirement**: WebGL 1.0 with depth texture support

**Browsers**:
- Chrome 56+
- Firefox 51+
- Safari 14+
- Edge 79+

**Features Used**:
- `THREE.WebGLRenderer` with antialiasing and alpha channel
- Shadow mapping (VSM - Variance Shadow Maps)
- Custom shaders (SoftReflectorShader)
- High-DPI rendering (window.devicePixelRatio)
- Context loss/restore handling

### ES6+ JavaScript Features
**Requirement**: Full ES6 support including modules

**Features Used**:
- ES6 Modules (`import`/`export`)
- Arrow functions
- Template literals
- Destructuring
- Classes
- `async`/`await`
- `const`/`let`
- Spread operator
- `Map` and `Set`

**Browsers**:
- Chrome 60+
- Firefox 60+
- Safari 11.1+
- Edge 79+

### Canvas API
**Requirement**: HTML5 Canvas 2D with `toBlob()` and `toDataURL()`

**Features Used**:
- Canvas rendering
- Image export (PNG with scaling)
- High-resolution rendering (2x, 4x multipliers)
- Transparent backgrounds

**Browsers**: All modern browsers

### File API
**Requirement**: File API with drag-and-drop support

**Features Used**:
- FileReader for image loading
- Drag-and-drop events
- File size validation (50MB limit)
- Multiple file selection
- MIME type detection

**Browsers**: All modern browsers

### Local Storage
**Requirement**: localStorage with 5MB+ quota

**Features Used**:
- Settings persistence
- JSON serialization
- Quota exceeded handling

**Browsers**: All modern browsers

---

## Optional Features

### Clipboard API (Copy/Paste JSON)
**Feature**: `navigator.clipboard.writeText()`

**Browsers**:
- Chrome 66+
- Firefox 63+
- Safari 13.1+
- Edge 79+

**Fallback**: Manual JSON download/upload

### High-DPI Displays
**Feature**: `window.devicePixelRatio` for retina displays

**Browsers**: All modern browsers

**Notes**: Automatically detected and used for crisp rendering on 2x/3x displays

---

## Performance Considerations

### Recommended Hardware

- **GPU**: Dedicated graphics card recommended
- **RAM**: 4GB+ for handling multiple large images
- **Display**: Any resolution (tested up to 4K)

### Memory Limits

- **Image Size**: 50MB per file (hard limit)
- **Total Memory**: 500MB warning threshold, 1000MB critical
- **Image Count**: Tested with 100+ images
- **Export Resolution**: Up to 4x canvas size (16K+ pixels)

### WebGL Context Loss

**Handled Gracefully**: GPU reset detection and automatic recovery

**Browsers**: All modern browsers

**Features**:
- Texture reload on context restore
- User notification with auto-dismiss
- Renderer settings restoration

---

## Known Issues

### Safari Limitations

1. **Performance**: Slightly lower than Chrome/Firefox for complex scenes
2. **Shadow Quality**: May render differently than other browsers
3. **Memory**: More aggressive garbage collection

**Workaround**: Use Chrome/Firefox for best experience

### Firefox Limitations

1. **Console Output**: Some Three.js warnings in console
2. **Performance**: Slightly lower than Chrome for GSAP animations

**Workaround**: No action needed, fully functional

### High-DPI Displays

1. **Memory Usage**: 2x/3x displays use 4x/9x more GPU memory
2. **Performance**: May be slower on integrated GPUs

**Workaround**: Reduce window size or use lower DPI if needed

---

## Future Requirements

### Phase 5 Features (Planned)

**SharedArrayBuffer** (for web workers, future performance optimization):
- Chrome 68+ (with cross-origin isolation headers)
- Firefox 79+
- Safari 15.2+

**Note**: Not currently required

### E2E Testing

**Playwright** browser automation support:
- Chrome
- Firefox
- WebKit (Safari)

---

## Testing Recommendations

### Development
- Test in Chrome/Edge (primary)
- Verify in Firefox and Safari
- Check console for WebGL warnings
- Monitor memory usage with large image stacks

### Production
- Recommend Chrome/Edge to users
- Provide fallback instructions for Safari
- Include browser version check in UI
- Show warning for unsupported browsers

---

## Browser Detection

The application does **not** currently implement browser detection or blocking. All modern browsers are allowed.

**Future Enhancement**: Add warning banner for unsupported browser versions with a link to this compatibility guide.

---

## Version History

- **v0.2.0** (2025-11-05): Initial browser compatibility documentation
  - Minimum versions: Chrome 90+, Edge 90+, Firefox 88+, Safari 14+
  - WebGL 1.0 required
  - ES6 modules required
