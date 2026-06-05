---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: ['codebase', 'search', 'read', 'edit', 'execute', 'web', 'todo']
---

# Execute GitHub Issue Step

Execute the instructions from a GitHub Issue step using Test-Driven Development workflow.

## Context

This prompt automatically switches to the **tdd-developer** agent to guide you through executing issue step instructions using proper TDD practices (Red-Green-Refactor cycles).

## Input Parameters

**Issue Number** (optional): ${input:issue-number:Enter issue number (leave empty to auto-detect)}

If no issue number is provided, this prompt will automatically find the main exercise issue using GitHub CLI commands documented in the project's Workflow Utilities.

## Execution Process

### Step 1: Locate the Exercise Issue

If no issue number provided:
1. Run: `gh issue list --state open`
2. Find the issue with "Exercise:" in the title
3. Use that issue number for the next steps

If issue number provided:
1. Use the provided issue number directly

### Step 2: Get Issue Content with Steps

Run the following to get the complete issue with all step comments:
```bash
gh issue view <issue-number> --comments
```

### Step 3: Parse Step Instructions

From the issue content:
1. Identify the latest/current step to execute
2. Look for sections marked with `:keyboard: Activity:`
3. Extract all activity instructions for this step
4. Note any success criteria for validation later

### Step 4: Execute Activities Systematically

For each `:keyboard: Activity:` section:

**Use TDD Workflow (Primary)**:
- If implementing new features: Write tests FIRST (Red-Green-Refactor)
- If fixing failing tests: Analyze and fix code to pass tests
- Follow testing scope: Jest (backend), React Testing Library (frontend)
- **NEVER suggest e2e frameworks** (Playwright, Cypress, Selenium)

**Execute Step-by-Step**:
1. Read and understand the activity requirement
2. Determine if it's new feature (write test first) or test fix (fix code)
3. Execute using appropriate TDD scenario
4. Verify completion (run tests, check output)
5. Move to next activity

**Testing Constraints** (from project instructions):
- Use unit tests and integration tests ONLY
- Backend: Jest + Supertest
- Frontend: React Testing Library for component behavior
- For complete UI flows: Recommend manual browser testing
- NO end-to-end frameworks or browser automation

### Step 5: Completion

After completing all activities:
1. Summarize what was accomplished
2. Show which tests now pass
3. Note any findings in `.github/memory/scratch/working-notes.md`
4. **DO NOT commit or push changes** - that's handled by `/commit-and-push`
5. Inform user to run `/validate-step` to check success criteria

## Important Notes

- This prompt uses the **tdd-developer** agent for proper TDD guidance
- Activities should be completed following Red-Green-Refactor cycles
- Tests must be written BEFORE implementation for new features
- Lint errors are NOT fixed during TDD - that's a separate workflow
- All GitHub CLI commands are documented in Workflow Utilities section of `.github/copilot-instructions.md`
- Git workflow conventions are documented in Git Workflow section of `.github/copilot-instructions.md`

## Example Usage

In Copilot Chat:
```
/execute-step
```
or
```
/execute-step issue-number: 42
```

## Success Indicators

You've successfully executed the step when:
- ✅ All `:keyboard: Activity:` sections are completed
- ✅ Tests pass for implemented features
- ✅ Code follows TDD principles (test first)
- ✅ Ready for validation via `/validate-step`
- ✅ Changes are uncommitted (ready for `/commit-and-push`)
