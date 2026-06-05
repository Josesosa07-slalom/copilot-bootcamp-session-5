---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: ['codebase', 'search', 'read', 'execute', 'web', 'todo']
---

# Validate Step Completion

Validate that all success criteria for a GitHub Issue step are met by checking the workspace state systematically.

## Context

This prompt automatically switches to the **code-reviewer** agent to systematically review and validate completion criteria for an issue step.

## Input Parameters

**Step Number** (REQUIRED): ${input:step-number:Enter step number (e.g., 5-0, 5-1, 5-2)}

The step number identifies which step's success criteria to validate. Format: `5-0`, `5-1`, `5-2`, etc.

## Validation Process

### Step 1: Locate the Exercise Issue

Use GitHub CLI to find the main exercise issue:
```bash
gh issue list --state open
```

Look for the issue with "Exercise:" in the title. This is documented in the Workflow Utilities section of `.github/copilot-instructions.md`.

### Step 2: Get Issue Content with All Steps

Retrieve the complete issue including all step comments:
```bash
gh issue view <issue-number> --comments
```

### Step 3: Find the Specified Step

Search through the issue content to locate:
```
# Step ${step-number}:
```

For example, if validating step `5-1`, search for:
```
# Step 5-1:
```

Extract the entire step content including:
- Step title and description
- Activity instructions
- **Success Criteria** section

### Step 4: Extract Success Criteria

Locate the "Success Criteria" section within the step. This typically appears as:

```
### Success Criteria
- [ ] Criterion 1 description
- [ ] Criterion 2 description
- [ ] Criterion 3 description
```

Extract all criteria that need to be validated.

### Step 5: Validate Each Criterion Systematically

For each success criterion:

**1. Understand the Requirement**
- What does this criterion expect?
- Which files or functionality does it relate to?
- How can it be verified?

**2. Check Workspace State**

Depending on the criterion type:

**Test-related criteria** (e.g., "All tests pass"):
```bash
# Backend tests
cd packages/backend && npm test

# Frontend tests
cd packages/frontend && npm test
```

**Code quality criteria** (e.g., "No lint errors"):
```bash
# Backend lint
cd packages/backend && npm run lint

# Frontend lint
cd packages/frontend && npm run lint
```

**Implementation criteria** (e.g., "Endpoint returns 200"):
- Check if code exists in expected files
- Verify logic is implemented correctly
- Test manually if needed

**File existence criteria** (e.g., "README.md exists"):
```bash
ls -la <expected-file-path>
cat <file-path>  # Check content
```

**3. Record Status**
- ✅ COMPLETE: Criterion is fully met
- ⚠️ PARTIAL: Criterion is partially met (explain what's missing)
- ❌ INCOMPLETE: Criterion is not met (explain what needs to be done)

### Step 6: Generate Validation Report

Create a comprehensive report:

```
# Step ${step-number} Validation Report

## Success Criteria Status

### ✅ Criterion 1: [Description]
Status: COMPLETE
Evidence: [What confirms this is complete]

### ⚠️ Criterion 2: [Description]
Status: PARTIAL
Missing: [What still needs to be done]
Action: [Specific next steps]

### ❌ Criterion 3: [Description]
Status: INCOMPLETE
Issue: [Why this is incomplete]
Action: [Specific steps to complete]

## Overall Status
- Complete: X/Y criteria
- Remaining work: [Summary of incomplete items]

## Next Steps
1. [Specific action for incomplete criterion]
2. [Next validation to run]
3. [When to run /commit-and-push]
```

### Step 7: Provide Guidance

Based on validation results:

**If ALL criteria complete** ✅:
```
Congratulations! All success criteria for Step ${step-number} are met.

Next steps:
1. Run /commit-and-push to save your work
2. Move to the next step
```

**If SOME criteria incomplete** ⚠️:
```
Progress made, but some criteria need attention.

Complete these remaining items:
- [Specific action 1]
- [Specific action 2]

Then run /validate-step again to verify.
```

**If MANY criteria incomplete** ❌:
```
Several criteria still need work.

Priority actions:
1. [Highest priority incomplete item]
2. [Next priority item]
3. [Next priority item]

Use @tdd-developer for implementation guidance.
Run /validate-step again after making progress.
```

## Validation Categories

### Tests
- Run test suites to verify pass/fail status
- Check for specific test names mentioned in criteria
- Verify test coverage for new functionality

### Code Quality
- Run linters to check for errors/warnings
- Verify code follows project patterns
- Check for proper error handling

### Implementation
- Verify endpoints/functions exist
- Check correct HTTP status codes
- Validate error responses
- Test edge cases mentioned in criteria

### Documentation
- Check README updates
- Verify code comments
- Confirm memory system updates

## Important Notes

- This prompt uses the **code-reviewer** agent for systematic validation
- Validation should be objective and evidence-based
- Provide specific, actionable guidance for incomplete items
- Reference actual test output, lint results, and code content
- Don't assume completion - verify every criterion explicitly
- Use GitHub CLI commands documented in Workflow Utilities section

## Example Usage

In Copilot Chat:
```
/validate-step step-number: 5-1
```

## Example Validation Report

```
# Step 5-1 Validation Report

## Success Criteria Status

### ✅ All backend tests pass
Status: COMPLETE
Evidence: Ran `npm test` in packages/backend - 15 tests passing

### ✅ No ESLint errors in backend code
Status: COMPLETE  
Evidence: Ran `npm run lint` - 0 errors, 0 warnings

### ⚠️ README.md documents API endpoints
Status: PARTIAL
Missing: DELETE endpoint documentation not yet added
Action: Add DELETE /api/todos/:id section to README.md

### ❌ Manual testing confirms delete functionality
Status: INCOMPLETE
Issue: Have not tested in browser yet
Action: 
1. Start app: npm start
2. Open browser to http://localhost:3000
3. Create a todo and verify delete button works
4. Check network tab for 200 response

## Overall Status
- Complete: 2/4 criteria
- Remaining work: Documentation and manual testing

## Next Steps
1. Add DELETE endpoint documentation to README.md
2. Perform manual browser testing
3. Run /validate-step step-number: 5-1 again
4. When all criteria pass, run /commit-and-push
```

## Success Indicators

Validation is thorough when:
- ✅ All criteria are checked with evidence
- ✅ Specific commands were run to verify
- ✅ Status is clear (complete/partial/incomplete)
- ✅ Actionable guidance provided for incomplete items
- ✅ User knows exactly what to do next
