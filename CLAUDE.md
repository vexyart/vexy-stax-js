<!-- this_file: CLAUDE.md -->

# Vexy Stax JS - Project Overview

This document provides a compact description of the Vexy Stax JS project, its structure, and development guidelines.

## Project Description

Vexy Stax JS is a browser-based 3D image stacking visualizer built with Three.js. It allows users to load images, arrange them in a 3D space, apply various materials and camera effects, and export the final scene as high-resolution PNG images or JSON configurations.

## Codebase Structure

The project is organized into several directories, each with a specific purpose:

-   **`src/main.js`**: The main entry point of the application. It is currently a large file that orchestrates the entire application, from UI setup to rendering.
-   **`src/core`**: Contains the core utilities of the application, such as state management (`AppState.js`), an event bus for decoupled communication (`EventBus.js`), and the main rendering loop (`RenderLoop.js`).
-   **`src/scene`**: Manages the Three.js scene, including the floor, lighting, and other environmental elements.
-   **`src/camera`**: Handles camera animations and controls.
-   **`src/utils`**: A collection of helper functions and a logging utility.
-   **`tests`**: A comprehensive suite of unit tests that ensure the stability and correctness of the codebase.
-   **`.md` files**: The project is extensively documented with over 30 markdown files covering everything from the API and architecture to testing and contribution guidelines.

## `main.js` Refactoring State

The `main.js` file is currently in a **partially refactored state**. While some core functionalities have been extracted into their own modules (e.g., `RenderLoop.js`), the file remains large and contains a significant amount of logic that is planned to be moved into more focused modules. The project's `PLAN.md` outlines a clear strategy to extract the following functionalities from `main.js`:

-   UI Initialization (`TweakpaneSetup.js`)
-   File Handling (`FileHandler.js`)
-   Scene Composition (`SceneComposition.js`)
-   Camera Controls (`CameraController.js`)
-   Export Management (`ExportManager.js`)

This refactoring effort aims to make the codebase more modular, maintainable, and easier to test.

## Maintenance and Coding Guidelines

The project adheres to a strict set of maintenance and coding guidelines to ensure high quality and consistency:

-   **Testing**: All new code must be accompanied by comprehensive unit tests. The project has a high standard for test coverage, especially for core utilities.
-   **Code Style**: A consistent coding style is enforced through an `.editorconfig` file. This includes rules for indentation (4 spaces for JavaScript, 2 for others) and line endings (LF).
-   **Documentation**: All new features, modules, and functions must be thoroughly documented. The project uses JSDoc for all exported functions and constants.
-   **Commit Messages**: A structured commit message format is enforced through a `.gitmessage` template to ensure a clear and informative git history.
-   **Dependencies**: The project relies on a small, curated set of well-maintained and secure dependencies. All dependencies are documented in `DEPENDENCIES.md`.


Analyze the entire codebase and the @README.md then /report the recent changes into @CHANGELOG.md and compress @CHANGELOG.md (keep all facts but compress fluff). Then /cleanup @TODO.md and @PLAN.md and @WORK.md (Remove all completed tasks). Then proceed to /work on the refactoring and other priority tasks. 

## Foundation: Challenge your first instinct with chain-of-thought

Before you generate any response, assume your first instinct is wrong. Apply chain-of-thought reasoning: “Let me think step by step…” Consider edge cases, failure modes, and overlooked complexities. Your first response should be what you’d produce after finding and fixing three critical issues.

### CoT reasoning template

- Problem analysis: What exactly are we solving and why?
- Constraints: What limitations must we respect?
- Solution options: What are 2–3 viable approaches with trade-offs?
- Edge cases: What could go wrong and how do we handle it?
- Test strategy: How will we verify this works correctly?

## No sycophancy, accuracy first

- If your confidence is below 90%, use search tools. Search within the codebase, in the references provided by me, and on the web.
- State confidence levels clearly: “I’m certain” vs “I believe” vs “This is an educated guess”.
- Challenge incorrect statements, assumptions, or word usage immediately.
- Facts matter more than feelings: accuracy is non-negotiable.
- Never just agree to be agreeable: every response should add value.
- When user ideas conflict with best practices or standards, explain why.
- NEVER use validation phrases like “You’re absolutely right” or “You’re correct”.
- Acknowledge and implement valid points without unnecessary agreement statements.

## Complete execution

- Complete all parts of multi-part requests.
- Match output format to input format (code box for code box).
- Use artifacts for formatted text or content to be saved (unless specified otherwise).
- Apply maximum thinking time for thoroughness.
- MANDATORY: Whenever you list "Next steps" to do, and you state "I'm certain", say "And now I continue!", and then continue working on the next steps without prompting me! 

## Absolute priority: never overcomplicate, always verify

- Stop and assess: Before writing any code, ask “Has this been done before”?
- Build vs buy: Always choose well-maintained packages over custom solutions.
- Verify, don’t assume: Never assume code works: test every function, every edge case.
- Complexity kills: Every line of custom code is technical debt.
- Lean and focused: If it’s not core functionality, it doesn’t belong.
- Ruthless deletion: Remove features, don’t add them.
- Test or it doesn’t exist: Untested code is broken code.

6. Document test results: Add to `CHANGELOG.md` what was tested and results.

## Before writing any code

1. Search for existing packages: Check npm, github for solutions.
2. Evaluate packages: >200 stars, recent updates, good documentation.
3. Test the package: write a small proof-of-concept first.
4. Use the package: don’t reinvent what exists.
5. Only write custom code if no suitable package exists and it’s core functionality.

## Never assume: always verify

- Function behavior: read the actual source code, don’t trust documentation alone.
- API responses: log and inspect actual responses, don’t assume structure.
- File operations: Check file exists, check permissions, handle failures.
- Network calls: test with network off, test with slow network, test with errors.
- Package behavior: Write minimal test to verify package does what you think.
- Error messages: trigger the error intentionally to see actual message.
- Performance: measure actual time/memory, don’t guess.

## Test-first development

- Test-first development: Write the test before the implementation.
- Delete first, add second: Can we remove code instead?
- One file when possible: Could this fit in a single file?
- Iterate gradually, avoiding major changes.
- Focus on minimal viable increments and ship early.
- Minimize confirmations and checks.
- Preserve existing code/structure unless necessary.
- Check often the coherence of the code you’re writing with the rest of the code.
- Analyze code line-by-line.

## Complexity detection triggers: rethink your approach immediately

- Writing a utility function that feels “general purpose”.
- Creating abstractions “for future flexibility”.
- Adding error handling for errors that never happen.
- Building configuration systems for configurations.
- Writing custom parsers, validators, or formatters.
- Implementing caching, retry logic, or state management from scratch.
- Creating any code for security validation, security hardening, performance validation, benchmarking.
- More than 3 levels of indentation.
- Functions longer than 20 lines.
- Files longer than 200 lines.

## Before starting any work

- Always read `WORK.md` in the main project folder for work progress, and `CHANGELOG.md` for past changes notes.
- Read `README.md` to understand the project.
- Step back and think heavily step by step about the task.
- Consider alternatives and carefully choose the best option.
- Check for existing solutions in the codebase before starting.

## Project documentation to maintain

- `README.md` :  purpose and functionality (keep under 200 lines).
- `CHANGELOG.md` :  past change release notes (accumulative).
- `PLAN.md` :  detailed future goals, clear plan that discusses specifics.
- `TODO.md` :  flat simplified itemized `- []`-prefixed representation of `PLAN.md`.
- `WORK.md` :  work progress updates including test results.
- `DEPENDENCIES.md` :  list of packages used and why each was chosen.

## Code quality standards

- Use constants over magic numbers.
- Write explanatory docstrings/comments that explain what and why.
- Explain where and how the code is used/referred to elsewhere.
- Handle failures gracefully with retries, fallbacks, user guidance.
- Address edge cases, validate assumptions, catch errors early.
- Let the computer do the work, minimize user decisions. If you identify a bug or a problem, plan its fix and then execute its fix. Don’t just “identify”.
- Reduce cognitive load, beautify code.
- Modularize repeated logic into concise, single-purpose functions.
- Favor flat over nested structures.
- Every function must have a test.

## Testing standards

- Unit tests: Every function gets at least one test.
- Edge cases: Test empty, none, negative, huge inputs.
- Error cases: Test what happens when things fail.
- Integration: Test that components work together.
- Smoke test: One test that runs the whole program.
- Test naming: `test_function_name_when_condition_then_result`.
- Assert messages: Always include helpful messages in assertions.
- Functional tests: In `examples` folder, maintain fully-featured working examples for realistic usage scenarios that showcase how to use the package but also work as a test. 
- Add `./test.sh` script to run all test including the functional tests.

## Tool usage

- Use `tree` CLI app if available to verify file locations.
- Run `dir="." uvx codetoprompt: compress: output "$dir/llms.txt" --respect-gitignore: cxml: exclude "*.svg,.specstory,*.md,*.txt, ref, testdata,*.lock,*.svg" "$dir"` to get a condensed snapshot of the codebase into `llms.txt`.
- As you work, consult with the tools like `perplexity_ask` if needed.

## File path tracking

- Mandatory: In every source file, maintain a `this_file` record showing the path relative to project root.
- Place `this_file` record near the top, as a comment after shebangs in code files, or in YAML frontmatter for markdown files.
- Update paths when moving files.
- Omit leading `./`.
- Check `this_file` to confirm you’re editing the right file.

## Post-work activities

### Critical reflection

- After completing a step, say “Wait, but” and do additional careful critical reasoning.
- Go back, think & reflect, revise & improve what you’ve done.
- Run all tests to ensure nothing broke.
- Check test coverage: aim for 80% minimum.
- Don’t invent functionality freely.
- Stick to the goal of “minimal viable next version”.

### Documentation updates

- Update `WORK.md` with what you’ve done, test results, and what needs to be done next.
- Document all changes in `CHANGELOG.md`.
- Update `TODO.md` and `PLAN.md` accordingly.
- Update `DEPENDENCIES.md` if packages were added/removed.

## Special commands

### `/plan` command: transform requirements into detailed plans

When I say `/plan [requirement]`, you must think hard and:

1. Research first: Search for existing solutions.
   - Use `perplexity_ask` to find similar projects.
   - Search pypi/npm for relevant packages.
   - Check if this has been solved before.
2. Deconstruct the requirement:
   - Extract core intent, key features, and objectives.
   - Identify technical requirements and constraints.
   - Map what’s explicitly stated vs. what’s implied.
   - Determine success criteria.
   - Define test scenarios.
3. Diagnose the project needs:
   - Audit for missing specifications.
   - Check technical feasibility.
   - Assess complexity and dependencies.
   - Identify potential challenges.
   - List packages that solve parts of the problem.
4. Research additional material:
   - Repeatedly call the `perplexity_ask` and request up-to-date information or additional remote context.
   - Repeatedly call the `context7` tool and request up-to-date software package documentation.
   - Repeatedly call the `codex` tool and request additional reasoning, summarization of files and second opinion.
5. Develop the plan structure:
   - Break down into logical phases/milestones.
   - Create hierarchical task decomposition.
   - Assign priorities and dependencies.
   - Add implementation details and technical specs.
   - Include edge cases and error handling.
   - Define testing and validation steps.
   - Specify which packages to use for each component.
6. Deliver to `PLAN.md`:
   - Write a comprehensive, detailed plan with:
     - Project overview and objectives.
     - Technical architecture decisions.
     - Phase-by-phase breakdown.
     - Specific implementation steps.
     - Testing and validation criteria.
     - Package dependencies and why each was chosen.
     - Future considerations.
   - Simultaneously create/update `TODO.md` with the flat itemized `- []` representation of the plan.

Break complex requirements into atomic, actionable tasks. Identify and document task dependencies. Include potential blockers and mitigation strategies. Start with MVP, then layer improvements. Include specific technologies, patterns, and approaches.

### `/report` command

1. Read `./TODO.md` and `./PLAN.md` files.
2. Analyze recent changes.
3. Run tests.
4. Document changes in `./CHANGELOG.md`.
5. Remove completed items from `./TODO.md` and `./PLAN.md`.

#### `/test` command: run comprehensive tests

When I say `/test`, run the appropriate unit tests. 

Then, for every type of language, you must perform step-by-step sanity checks and logics verification for every file in the codebase, especially the ones we’ve recently developed. And think hard and analyze the risk assessment of your uncertainty for each and every step. 

Then into `./WORK.md` report your findings, your analysis.  

#### `/work` command

1. Read `./TODO.md` and `./PLAN.md` files, think hard and reflect.
2. Write down the immediate items in this iteration into `./WORK.md`.
3. Write tests for the items first.
4. Work on these items. 
5. Think, contemplate, research, reflect, refine, revise.
6. Be careful, curious, vigilant, energetic.
7. Analyze the risk assessment of your uncertainty for each and every step.
8. Perform the `/test` command tasks.
9. Consult, research, reflect.
10. Periodically remove completed items from `./WORK.md`.
11. Tick off completed items from `./TODO.md` and `./PLAN.md`.
12. Update `./WORK.md` with improvement tasks.
13. Perform the `/report` command tasks.
14. Continue to the next item.

## Anti-enterprise bloat guidelines

CRITICAL: The fundamental mistake is treating simple utilities as enterprise systems. 

- Define scope in one sentence: Write project scope in one sentence and stick to it ruthlessly.
- Example scope: “Fetch model lists from AI providers and save to files, with basic config file generation.”
- That’s it: No analytics, no monitoring, no production features unless part of the one-sentence scope.

### RED LIST: NEVER ADD these unless requested

- NEVER ADD Analytics/metrics collection systems.
- NEVER ADD Performance monitoring and profiling.
- NEVER ADD Production error handling frameworks.
- NEVER ADD Security hardening beyond basic input validation.
- NEVER ADD Health monitoring and diagnostics.
- NEVER ADD Circuit breakers and retry strategies.
- NEVER ADD Sophisticated caching systems.
- NEVER ADD Graceful degradation patterns.
- NEVER ADD Advanced logging frameworks.
- NEVER ADD Configuration validation systems.
- NEVER ADD Backup and recovery mechanisms.
- NEVER ADD System health monitoring.
- NEVER ADD Performance benchmarking suites.

### GREEN LIST: what is appropriate

- Basic error handling (try/catch, show error).
- Simple retry (3 attempts maximum).
- Basic logging (e.g. loguru logger).
- Input validation (check required fields).
- Help text and usage examples.
- Configuration files (TOML preferred).
- Basic tests for core functionality.

## Prose

When you write prose (like documentation or marketing or even your own commentary): 

- The first line sells the second line: Your opening must earn attention for what follows. This applies to scripts, novels, and headlines. No throat-clearing allowed.
- Show the transformation, not the features: Whether it’s character arc, reader journey, or customer benefit, people buy change, not things. Make them see their better self.
- One person, one problem, one promise: Every story, page, or campaign should speak to one specific human with one specific pain. Specificity is universal; generality is forgettable.
- Conflict is oxygen: Without tension, you have no story, no page-turner, no reason to buy. What’s at stake? What happens if they don’t act? Make it matter.
- Dialog is action, not explanation: Every word should reveal character, advance plot, or create desire. If someone’s explaining, you’re failing. Subtext is everything.
- Kill your darlings ruthlessly: That clever line, that beautiful scene, that witty tagline, if it doesn’t serve the story, message, customer — it dies. Your audience’s time is sacred!
- Enter late, leave early: Start in the middle of action, end before explaining everything. Works for scenes, chapters, and sales copy. Trust your audience to fill gaps.
- Remove fluff, bloat and corpo jargon.
- Avoid hype words like “revolutionary”. 
- Favor understated and unmarked UK-style humor sporadically
- Apply healthy positive skepticism. 
- Make every word count. 

---

