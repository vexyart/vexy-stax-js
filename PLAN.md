# <!-- this_file: PLAN.md -->
# Vexy Stax JS – Implementation Plan

## One-Sentence Scope
Maintain a browser-based Three.js studio that stacks 2D artwork, animates the camera, and exports PNG/JSON artefacts while keeping the experience lightweight and testable.

## Current Objective – Retina Studio & Docked Layout QA (2025-11-04)

### Outcome Targets
- Independently confirm the retina-aware sizing behaves correctly on DPR 1 and DPR 2 displays, noting any discrepancies.
- Validate global drop overlay accepts assets anywhere in the viewport without blocking text selection or misfiring.
- Exercise thumbnail reordering via pointer and keyboard to ensure scene `imageStack` stays in sync.
- Verify tooltip metadata renders with accurate filename and dimensions, accessible via hover and keyboard focus.
- Record findings and any follow-up work in `WORK.md`, then close the outstanding TODO item once complete.

### Phase Breakdown
1. **QA Preparation**
   - Launch local build in Chrome and Firefox (desktop) with developer tools for device pixel ratio overrides.
   - Prepare sample assets covering varied resolutions (e.g., 400×300 PNG, 1080×1080 JPG) to test edge cases.
   - Ensure logging console is open to capture unexpected warnings.
2. **Retina & Layout Validation**
   - Using Chrome device emulation, capture screenshots at DPR 1 and DPR 2 for a 1920×1080 studio; check for blurring or incorrect CSS sizing.
   - Confirm exported PNGs (1×/2×/4×) remain crisp and align with requested logical dimensions.
3. **Interaction Sweep**
   - Drag/drop files onto canvas, controls panel, and blank area; confirm overlay visibility and dismissal.
   - Reorder thumbnails with mouse drag and keyboard controls; validate render order changes accordingly.
   - Hover/focus thumbnails to review tooltips for correctness.
4. **Documentation & Closure**
   - Summarise results (pass/fail, follow-ups) in `WORK.md`.
   - Update `TODO.md` when QA completes; raise new TODO entries for any defects discovered.

### Risks & Mitigations
- **Manual coverage gaps**: Without Playwright, rely on disciplined QA script; consider screen recording to aid replication if issues surface.
- **DPR emulation fidelity**: Chrome overrides may not perfectly emulate retina hardware; cross-check with actual retina device when available and note limitations.
- **Overlay interference**: Ensure we test mixed payload drags (text, external links) to confirm overlay only appears for files; log any regressions.

### Testing Strategy
- Manual smoke per steps above; re-run `npm run test` after QA if code changes emerge.
- Maintain `/test` automation pipeline as regression guard for JS helper suites.

### Future Considerations
- Once QA passes, plan follow-up iteration to extract `main.js` subsystems (renderer, interaction controller) into dedicated modules for maintainability.
