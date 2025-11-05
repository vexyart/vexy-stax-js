# Code Style & Conventions
- General: Enforce `this_file` header (relative path) at top of every source/doc file; keep modules under ~250 lines, prefer flat structure, use constants instead of magic numbers.
- JavaScript: 4-space indent (per `.editorconfig`), ES module syntax, comprehensive JSDoc blocks with examples on exported functions, dependency injection over globals, minimal inline handlers.
- Testing: Every function must have unit coverage; add edge/error cases; integration tests ensure drag/drop→scene→export flow; record test runs in `WORK.md` and `CHANGELOG.md`.
- Documentation: Update README/PLAN/TODO/WORK/CHANGELOG consistently; avoid fluff, keep README <200 lines; follow provided templates (e.g., main_js_jsdoc_templates.md).
- Logging: Use `src/utils/logger.js` prefixed logger, avoid stray console logs; maintain memory/FPS watchdog behaviour.