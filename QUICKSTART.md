# Vexy Stax JS - Quick Start

Get started in 3 minutes.

## Option 1: Use Online (Fastest)

Visit **https://vexyart.github.io/vexy-stax-js/**

1. Drop PNG images onto the page
2. Adjust spacing and colors in the panel
3. Export PNG at 1x, 2x, or 4x resolution

Done.

## Option 2: Run Locally

```bash
# Clone and start
npm install
npm run dev

# Open http://localhost:5173/vexy-stax-js/
```

## Basic Usage

### Load Images
- **Drag & drop** PNG files onto the page
- Or click "Choose Files" button
- Images stack along Z-axis (depth)

### Adjust View
- **Left mouse** - Rotate camera
- **Right mouse** - Pan
- **Scroll** - Zoom
- **Panel** - Adjust spacing, colors, FOV

### Export
- Click "Export PNG" for 1x resolution
- Shift + Click for 2x resolution
- Ctrl + Click for 4x resolution (high-res)

### Save/Load Config
- **Copy Config** - Saves images + settings to clipboard
- **Paste Config** - Loads from clipboard JSON

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play hero shot animation |
| `C` | Copy config to clipboard |
| `V` | Paste config from clipboard |
| `U` | Undo last action |
| `R` | Redo |
| `Delete` | Clear all images |
| `H` | Toggle panel |

## Animation

Press **Space** or click "Play Hero Shot" to trigger the GSAP animation:
1. Camera starts offset
2. Animates to hero position
3. Holds for 1 second
4. Returns to default view

## Tips

- **Performance**: Keep images under 10MB and 4096px
- **Best results**: Use transparent PNG files
- **Layer order**: First image = front, last = back
- **Config persistence**: Save config JSON for repeatable renders

## Automation

Use **vexy-stax-py** for command-line automation:

```bash
pip install vexy-stax
vexy-stax animate --images config.json --output render.png
```

See [vexy-stax-py](../vexy-stax-py/) for Python automation tools.

## Need More?

- Full documentation: [README.md](README.md)
- API reference: [README.md#api-reference](README.md#api-reference)
- Live demo: https://vexyart.github.io/vexy-stax-js/
