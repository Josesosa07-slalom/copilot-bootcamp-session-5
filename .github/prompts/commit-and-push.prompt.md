---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['read', 'execute', 'todo']
---

# Commit and Push Changes

Analyze changes in the workspace, generate a conventional commit message, and push to a feature branch.

## Context

This prompt helps you commit and push your changes following the project's Git workflow conventions. It works with any agent context and does NOT switch agents.

## Input Parameters

**Branch Name** (REQUIRED): ${input:branch-name:Enter feature branch name (e.g., feature/implement-delete-endpoint)}

The branch name is required. If you don't provide it, you'll be prompted to enter one.

## Execution Process

### Step 1: Verify Branch Name

Ensure the user has provided a branch name. If not:
1. Ask the user for the branch name
2. Recommend format: `feature/<descriptive-name>`
3. Example: `feature/add-validation`, `feature/fix-toggle-bug`

### Step 2: Analyze Changes

Run the following to see what has changed:
```bash
git status
git diff
```

Review:
- Which files were modified/added/deleted?
- What functionality was implemented?
- What tests were written or fixed?
- What refactoring was done?

### Step 3: Generate Conventional Commit Message

Based on the changes, generate a commit message following **conventional commit format** (documented in Git Workflow section of `.github/copilot-instructions.md`):

**Format**: `<type>: <description>`

**Types**:
- `feat:` - New feature or functionality
- `fix:` - Bug fix or test fix
- `chore:` - Maintenance (dependency updates, config changes)
- `docs:` - Documentation changes
- `refactor:` - Code refactoring without behavior change
- `test:` - Adding or updating tests

**Examples**:
- `feat: implement DELETE /api/todos/:id endpoint`
- `fix: correct toggle function to handle both states`
- `chore: set up memory system and TDD agent`
- `test: add validation tests for POST endpoint`

**Guidelines**:
- Keep description concise but descriptive
- Start with lowercase after the colon
- No period at the end
- Focus on WHAT changed, not HOW

### Step 4: Branch Management

Check if the branch exists:
```bash
git branch --list ${branch-name}
```

**If branch does NOT exist**:
```bash
git checkout -b ${branch-name}
```

**If branch exists**:
```bash
git checkout ${branch-name}
```

**NEVER commit to main** - Always use the user-provided feature branch.

### Step 5: Stage All Changes

Stage all changes in the workspace:
```bash
git add .
```

Verify what will be committed:
```bash
git status
```

### Step 6: Commit with Generated Message

Commit using the generated conventional commit message:
```bash
git commit -m "<generated-message>"
```

### Step 7: Push to Remote Branch

Push the changes to the specified branch:
```bash
git push origin ${branch-name}
```

If this is the first push for a new branch, Git will set up tracking automatically.

### Step 8: Confirmation

After successful push:
1. Confirm the commit and push completed
2. Show the commit message used
3. Show the branch name pushed to
4. Provide next steps (e.g., create PR if ready)

## Important Constraints

**Branch Safety**:
- ❌ NEVER commit directly to `main`
- ❌ NEVER commit to any branch other than the user-provided branch
- ✅ ALWAYS use the exact branch name provided by the user
- ✅ Create the branch if it doesn't exist
- ✅ Switch to existing branch if it exists

**Commit Scope**:
- Commit ALL staged changes (use `git add .`)
- Generate ONE commit message covering all changes
- Follow conventional commit format strictly
- Keep message concise and descriptive

## Git Workflow Reference

This prompt follows the Git Workflow conventions documented in `.github/copilot-instructions.md`:
- Conventional commit formats (`feat:`, `fix:`, `chore:`, `docs:`)
- Feature branch naming: `feature/<descriptive-name>`
- Always stage all changes: `git add .`
- Push to correct branch: `git push origin <branch-name>`

## Example Usage

In Copilot Chat:
```
/commit-and-push branch-name: feature/implement-delete
```

## Example Flow

```bash
# User runs: /commit-and-push branch-name: feature/add-validation

# Step 1: Analyze changes
$ git diff
# Shows validation logic added to POST endpoint

# Step 2: Generate message
# "feat: add request validation for POST /api/todos endpoint"

# Step 3: Create/switch to branch
$ git checkout -b feature/add-validation

# Step 4: Stage changes
$ git add .

# Step 5: Commit
$ git commit -m "feat: add request validation for POST /api/todos endpoint"

# Step 6: Push
$ git push origin feature/add-validation

# Confirmation: 
# ✅ Committed and pushed to feature/add-validation
# Message: "feat: add request validation for POST /api/todos endpoint"
```

## Success Indicators

You've successfully completed when:
- ✅ Changes are analyzed and understood
- ✅ Conventional commit message is generated
- ✅ Correct feature branch is created/used
- ✅ All changes are staged and committed
- ✅ Changes are pushed to remote branch
- ✅ User receives confirmation with details
