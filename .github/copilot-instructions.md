# TODO Application Copilot Instructions

## Project Context
- Full-stack TODO application with React frontend and Express backend.
- Focus on iterative, feedback-driven development.
- Current phase: Backend stabilization and frontend feature completion.

## Documentation References
Use the existing project documentation to ground implementation decisions and navigate the codebase:

- [Project Overview](../docs/project-overview.md) - Architecture, tech stack, and structure.
- [Testing Guidelines](../docs/testing-guidelines.md) - Test patterns and standards.
- [Workflow Patterns](../docs/workflow-patterns.md) - Development workflow guidance.

## Development Principles
- Test-Driven Development: follow the Red-Green-Refactor cycle.
- Incremental Changes: prefer small, testable modifications over broad rewrites.
- Systematic Debugging: use failing tests and reproducible errors as guides.
- Validation Before Commit: ensure all tests pass and no lint errors remain before committing.

## Testing Scope
This project uses unit tests and integration tests only.

- Backend: use Jest and Supertest for API testing.
- Frontend: use React Testing Library for component unit and integration tests.
- Use manual browser testing for full UI verification.
- Do not suggest or implement end-to-end test frameworks such as Playwright, Cypress, or Selenium.
- Do not suggest browser automation tools.
- Reason: keep the lab focused on unit and integration testing without e2e complexity.

**Testing Approach by Context**

- Backend API changes: write Jest tests first, then implement the code to satisfy them using Red-Green-Refactor.
- Frontend component features: write React Testing Library tests first for component behavior, then implement the feature using Red-Green-Refactor. Follow with manual browser testing for full UI flows.
- Treat this as true TDD: test first, then write code to make the test pass.

## Workflow Patterns
Follow these development workflows:

1. TDD Workflow: write or fix tests, run them, observe failure, implement, pass, refactor.
2. Code Quality Workflow: run lint, categorize issues, fix them systematically, then re-validate.
3. Integration Workflow: identify the issue, debug the cause, test the scenario, fix the code, then verify end-to-end behavior manually where appropriate.

## Agent Usage
Use specialized agents when their focus matches the task:

- `tdd-developer`: use for test-first implementation, failing-test analysis, and Red-Green-Refactor work.
- `code-reviewer`: use for lint remediation, code quality improvements, and review-style cleanup.

## Memory System
- Persistent Memory: This file (.github/copilot-instructions.md) contains foundational principles and workflows
- Working Memory: .github/memory/ directory contains discoveries and patterns
- During active development, take notes in .github/memory/scratch/working-notes.md (not committed)
- At end of session, summarize key findings into .github/memory/session-notes.md (committed)
- Document recurring code patterns in .github/memory/patterns-discovered.md (committed)
- Reference these files when providing context-aware suggestions

For detailed guidance on using the memory system, see [.github/memory/README.md](.github/memory/README.md)

## Workflow Utilities
GitHub CLI commands are available for workflow automation in all modes:

- List open issues: `gh issue list --state open`
- Get issue details: `gh issue view <issue-number>`
- Get issue with comments: `gh issue view <issue-number> --comments`
- The main exercise issue will have `Exercise:` in the title.
- Steps are posted as comments on the main issue.
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked.

## Git Workflow
Follow these git workflow conventions:

- Use conventional commits such as `feat:`, `fix:`, `chore:`, and `docs:`.
- Create feature branches with the format `feature/<descriptive-name>`.
- Always stage all changes before committing with `git add .`.
- Push to the correct branch with `git push origin <branch-name>`.