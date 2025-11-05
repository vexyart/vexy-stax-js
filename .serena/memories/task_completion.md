# Task Completion Checklist
- Run `npm run test:unit` (and broader suites if behaviour changes) after each significant refactor; ensure 227/227 stays green or document new counts.
- Add outcomes, test results, bundle/memory observations in `WORK.md` and summarize in `CHANGELOG.md` with concise facts.
- Keep `TODO.md` and `PLAN.md` synchronized—check off completed tasks, add new actionable items when plans evolve.
- Update documentation (README snippets, module docs) only if public behaviour changes; apply required `this_file` headers.
- Review build size (target ≤1,150 kB) and memory guard thresholds after changes.
- Avoid introducing new dependencies without recording rationale in `DEPENDENCIES.md`.