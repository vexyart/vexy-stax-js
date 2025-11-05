# <!-- this_file: CONTRIBUTING.md -->
# Contributing to Vexy Stax JS

Thank you for considering contributing to Vexy Stax JS! This document provides guidelines for contributing to the project.

## Code of Conduct

Be respectful, constructive, and professional in all interactions. We welcome contributions from developers of all skill levels.

## Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (see `.nvmrc` and `.node-version`)
- **npm**: v9.0.0 or higher
- **Git**: Latest stable version

### Setup Development Environment
```bash
git clone https://github.com/vexyart/vexy-stax-js.git
cd vexy-stax-js
npm install
npm run dev  # Start dev server at http://localhost:5173
```

## Development Workflow

### 1. Code Style

We use **EditorConfig** for consistent formatting. Your editor should automatically pick up settings from `.editorconfig`:
- **Indentation**: 4 spaces (default), 2 spaces for JS/JSON/YAML/CSS
- **Line endings**: LF (enforced by `.gitattributes`)
- **Encoding**: UTF-8
- **Final newline**: Always insert
- **Trailing whitespace**: Always trim

### 2. Testing Requirements

**All pull requests must pass the test suite**:

```bash
npm test              # Run all tests (unit + E2E)
npm run test:unit     # Run 218 unit tests
npm run test:coverage # Generate coverage reports
```

**Coverage Requirements**:
- **Lines**: 80% minimum
- **Functions**: 80% minimum
- **Branches**: 75% minimum

Run `npm run test:coverage:check` to verify coverage thresholds before submitting.

### 3. Writing Tests

- **Location**: `tests/*.test.js`
- **Framework**: Node.js built-in test runner
- **Every function needs a test**: Ensure new code has corresponding tests
- **Test naming**: `test_functionName_whenCondition_thenResult`
- **Example**:
  ```javascript
  test('clamp handles edge case where min === max', (t) => {
    strictEqual(clamp(5, 3, 3), 3, 'should return constant value');
  });
  ```

### 4. Commit Messages

Use clear, descriptive commit messages:

**Format**:
```
Brief summary (50 chars or less)

More detailed explanation if needed. Wrap at 72 characters.
Reference issues: #123
```

**Examples**:
- ✅ "Add JSDoc examples to helper functions"
- ✅ "Fix memory leak in texture disposal"
- ✅ "Refactor camera animation for better performance"
- ❌ "fixed stuff"
- ❌ "WIP"

### 5. Pull Request Process

1. **Fork the repository** and create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following code style and testing requirements

3. **Run all tests** and verify coverage:
   ```bash
   npm run test:unit
   npm run test:coverage:check
   npm run build  # Verify build succeeds
   ```

4. **Commit your changes** with clear commit messages

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a pull request** with:
   - Clear title describing the change
   - Detailed description of what changed and why
   - Reference any related issues (#123)
   - Screenshots/recordings for UI changes
   - Test results (e.g., "218/218 tests passing ✅")

### 6. PR Review Process

- Maintainers will review your PR within 1-2 weeks
- Address review feedback by pushing new commits to the same branch
- Once approved, maintainers will merge your PR
- Your contribution will be credited in CHANGELOG.md

## Project Structure

```
src/
├── main.js              # Entry point (3,367 lines)
├── core/                # Core utilities (AppState, EventBus, RenderLoop, constants)
├── camera/              # Camera animation
├── managers/            # Scene/Lighting/Floor managers
├── utils/               # Helpers, logger
└── styles/              # Global CSS

tests/                   # 14 test suites, 218 tests
docs/                    # Production build output (GitHub Pages)
```

## Code Quality Guidelines

### JSDoc Documentation
All public functions must have JSDoc comments with:
- Description of what the function does
- `@param` for each parameter with type and description
- `@returns` for return value with type and description
- `@throws` for any errors that might be thrown
- `@example` with practical usage examples

**Example**:
```javascript
/**
 * Clamp a number between min and max values
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 * @throws {TypeError} If inputs are not valid numbers
 * @throws {RangeError} If min > max
 * @example
 * clamp(5, 0, 10);   // 5
 * clamp(-5, 0, 10);  // 0
 * clamp(15, 0, 10);  // 10
 */
export function clamp(value, min, max) {
  // Implementation...
}
```

### Error Handling
- Use descriptive error messages with function/module context
- Use appropriate error types: `TypeError` for type violations, `RangeError` for range violations
- Include parameter values in error messages when helpful
- Example: `throw new TypeError(\`clamp: value must be a valid number, got \${typeof value}\`);`

### Constants
- Use named constants instead of magic numbers
- Export constants from `src/core/constants.js`
- Add JSDoc with type annotations
- Freeze objects to prevent mutation: `Object.freeze(CONSTANT)`

### Logging
- Use the logger utility from `src/utils/logger.js`
- Create module-specific loggers: `const log = createLogger('ModuleName')`
- Avoid direct `console.log` calls (except in tests or debug-specific RenderLoop)

## Releasing to npm (Maintainers Only)

The package is configured for npm publishing with automated quality checks.

### Pre-Publish Checklist
1. **Run all tests**: `npm run test:unit` (218 tests must pass)
2. **Check coverage**: `npm run test:coverage:check` (80/80/75% thresholds)
3. **Update version**: `npm version patch|minor|major`
4. **Update CHANGELOG.md**: Document all changes for the release
5. **Commit changes**: `git commit -am "Release vX.Y.Z"`
6. **Create git tag**: `git tag vX.Y.Z`
7. **Push with tags**: `git push origin main --tags`

### Publishing
```bash
npm publish
```

The `prepublishOnly` script automatically runs tests and build before publishing.

### Package Contents
The `.npmignore` file ensures only essential files are published:
- ✅ Included: `src/`, `docs/`, `README.md`, `LICENSE`, `CHANGELOG.md`
- ❌ Excluded: `tests/`, `coverage/`, development configs, logs

## License

By contributing to Vexy Stax JS, you agree that your contributions will be licensed under the Apache License 2.0.

All source files must include the SPDX license header:
```javascript
// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
```

## Questions?

- **Issues**: https://github.com/vexyart/vexy-stax-js/issues
- **Discussions**: Use GitHub Discussions for questions
- **Email**: adam+npm@twardoch.com

## Resources

- [README.md](README.md) - Project overview
- [API.md](API.md) - Public API reference
- [BROWSER_COMPATIBILITY.md](BROWSER_COMPATIBILITY.md) - Browser requirements
- [PERFORMANCE.md](PERFORMANCE.md) - Performance optimization guide
- [CHANGELOG.md](CHANGELOG.md) - Release history

---

**Thank you for contributing to Vexy Stax JS!** 🎉
