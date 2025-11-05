---
this_file: main_js_complexity.md
---

# main.js Complexity Analysis

**Generated**: 2025-11-05
**File**: src/main.js
**Total Lines**: 3,367
**Total Functions**: 77

## Functions >50 Lines (Refactoring Candidates)

### keydownHandler (line 745, ~62 lines)
- **Purpose**: Keyboard shortcut handler (Ctrl+Z undo, Ctrl+E export, Delete, arrows)
- **Complexity**: Multiple key combinations, modifier checks
- **Refactor Strategy**: Extract to src/ui/KeyboardShortcuts.js module

## Complexity Hotspots

### Large Code Blocks
- **init() function**: Initialization logic (~150 lines estimated)
- **Tweakpane setup**: UI folder creation (~300 lines estimated)
- **Image loading logic**: File validation, texture creation (~200 lines estimated)

### Inline Event Handlers
- Many inline arrow functions in Tweakpane button handlers
- Inline event listeners for drag/drop
- Could be extracted to named functions for testability

## Recommendations

1. **Priority 1 - Module Extraction** (already planned):
   - TweakpaneSetup.js (UI init, ~300 lines)
   - FileHandler.js (drag/drop, validation, ~200 lines)
   - ExportManager.js (PNG/JSON export, ~200 lines)

2. **Priority 2 - Helper Extraction**:
   - keyboardShortcuts.js (key handler logic)
   - imageListUI.js (thumbnail list management)
   - toastNotifications.js (toast display logic)

3. **Priority 3 - Inline Function Extraction**:
   - Named button handlers for testability
   - Named event listeners for clarity
   - Extract validation logic to validators.js

## Testing Strategy

- Extract and test each module independently
- Mock dependencies (Three.js, Tweakpane)
- Write integration tests for module interactions
- Maintain 197/197 tests passing during extraction

