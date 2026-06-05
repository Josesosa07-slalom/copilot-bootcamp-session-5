# Development Memory System

## Purpose

This memory system tracks patterns, decisions, and lessons learned during development. It serves as a persistent knowledge base that helps AI assistants provide better context-aware suggestions and helps developers understand project history.

## Memory Types

### Persistent Memory
**Location**: `.github/copilot-instructions.md`

Contains foundational principles, coding standards, and workflows that rarely change. This is your "long-term memory" - the core knowledge that guides all development work.

**Use for**:
- Project architecture decisions
- Testing standards
- Code style guidelines
- Workflow definitions

### Working Memory
**Location**: `.github/memory/` directory

Contains discoveries, patterns, and session notes that evolve as you work. This is your "working memory" - active learning and pattern recognition.

**Components**:
1. **session-notes.md** - Historical record of completed sessions (committed to git)
2. **patterns-discovered.md** - Accumulated code patterns and solutions (committed to git)
3. **scratch/working-notes.md** - Active session notes (NOT committed, ephemeral)

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md             # Historical session summaries (committed)
├── patterns-discovered.md       # Accumulated patterns (committed)
└── scratch/
    ├── .gitignore              # Ignores all scratch files
    └── working-notes.md        # Active session notes (not committed)
```

## When to Use Each File

### During Active Development (TDD, Linting, Debugging)

**Use `scratch/working-notes.md`** for:
- Current task context and approach
- Real-time findings as you debug
- Quick decisions you're making
- Temporary notes and observations
- Questions to investigate
- Blockers you encounter

**Workflow**:
1. Start session → Open `scratch/working-notes.md`
2. Document approach and findings as you work
3. Keep notes messy and informal - they're temporary
4. Use as a scratchpad for AI context

### At End of Session

**Update `session-notes.md`** with:
1. Review your `scratch/working-notes.md`
2. Extract key accomplishments and decisions
3. Add a new session entry with date
4. Commit this permanent record

**Update `patterns-discovered.md`** when you:
1. Discover a recurring solution pattern
2. Learn something about the codebase structure
3. Find a better way to solve a common problem
4. Commit the pattern for future reference

### During Future Work

**AI assistants will**:
1. Read `patterns-discovered.md` to understand project patterns
2. Reference `session-notes.md` for historical context
3. Use these to provide consistent, project-aware suggestions

**You will**:
1. Refer to patterns when facing similar problems
2. Review session notes to recall previous decisions
3. Maintain consistency across development sessions

## File Purposes Explained

### session-notes.md (Committed)
**Purpose**: Historical record of completed sessions

Think of this as your project diary. After each development session, write a brief summary of what you accomplished, what you learned, and any important decisions made.

**When to update**:
- ✅ End of development session
- ✅ After completing a feature or major fix
- ✅ When you discover something important

**What to include**:
- Date and session name
- What was accomplished
- Key findings and decisions
- Outcomes and next steps

**Example**:
```markdown
### Session: Backend API Stabilization (2026-06-05)
Accomplished: Fixed 5 failing backend tests
Key Finding: Array initialization should use [] not null
Outcome: All backend tests passing
```

### patterns-discovered.md (Committed)
**Purpose**: Accumulated code patterns and solutions

Document recurring patterns, solutions, and architectural decisions. This becomes your project's pattern library.

**When to update**:
- ✅ You solve a problem that might recur
- ✅ You establish a consistent way to do something
- ✅ You learn how a complex part of the codebase works

**What to include**:
- Pattern name and context
- Problem it solves
- Solution and example code
- Related files

**Example**:
```markdown
## Pattern: Service Array Initialization
Context: Backend service state management
Problem: Null vs empty array caused test failures
Solution: Always initialize arrays as []
```

### scratch/working-notes.md (NOT Committed)
**Purpose**: Active session working memory

Your real-time scratchpad during development. Keep it messy, informal, and task-focused. This file is intentionally NOT committed to git.

**When to use**:
- ✅ Starting a new task or debugging session
- ✅ While running TDD cycles
- ✅ During active debugging
- ✅ When fixing lint errors
- ✅ Exploring implementation approaches

**What to include**:
- Current task description
- Approach you're taking
- Findings as you discover them
- Decisions you're making in real-time
- Temporary notes and questions
- Blockers and next steps

**Workflow**:
1. Open file at start of session
2. Update as you work (no need to be formal)
3. Provide context to AI by referencing your notes
4. At end of session, extract key findings to session-notes.md
5. Clear or reset for next session

## How AI Reads and Applies Patterns

### During Your Session

When you provide context to an AI assistant:

```
You: "I'm implementing a new feature. Check my working-notes.md for context."
AI: [Reads scratch/working-notes.md, understands current task and approach]

You: "How should I initialize this service state?"
AI: [Checks patterns-discovered.md, finds array initialization pattern]
    "Based on the project pattern, initialize as an empty array []"
```

### Pattern Recognition

AI assistants can:
1. **Read discovered patterns** to maintain consistency
2. **Reference session history** to avoid repeating mistakes
3. **Suggest solutions** based on what worked before
4. **Maintain project conventions** automatically

### Example AI Workflow

```
Developer: "I need to add validation to the POST endpoint"

AI thinks:
1. Reads patterns-discovered.md → Finds validation pattern used elsewhere
2. Reads session-notes.md → Sees recent validation work and decisions
3. Reads scratch/working-notes.md → Understands current task context

AI suggests: "Based on the validation pattern in patterns-discovered.md,
here's a consistent implementation..."
```

## Best Practices

### DO ✅
- Keep scratch notes informal and task-focused
- Update session-notes.md at end of each session
- Document patterns when you solve something notable
- Reference memory files when asking AI for help
- Commit session-notes.md and patterns-discovered.md regularly

### DON'T ❌
- Don't commit scratch/working-notes.md (it's gitignored)
- Don't let session-notes.md become too verbose
- Don't document every tiny detail
- Don't skip updating memory after important discoveries
- Don't duplicate information between files

## Integration with TDD Workflow

### Red Phase (Test Failing)
Document in `scratch/working-notes.md`:
```markdown
## Current Task
Fix failing test: "should validate required fields"

## Approach
- Review test expectations
- Implement validation logic
- Follow patterns from patterns-discovered.md
```

### Green Phase (Test Passing)
Update `scratch/working-notes.md`:
```markdown
## Key Findings
- Validation needs to check both undefined and empty string
- Express-validator pattern works well here
```

### Refactor Phase
If you discover a reusable pattern, add to `patterns-discovered.md`:
```markdown
## Pattern: Request Validation
Context: Express API endpoints
Problem: Consistent validation across routes
Solution: Use express-validator middleware
```

## Integration with Debugging Workflow

### While Debugging
In `scratch/working-notes.md`:
```markdown
## Current Task
Debug: Toggle function not working

## Findings
- Function always sets completed = true
- Root cause: missing negation operator
- Bug on line 45: todo.completed = true
- Fix: todo.completed = !todo.completed

## Decision Made
Add test to prevent regression
```

### After Resolution
If the bug reveals a pattern, add to `patterns-discovered.md`:
```markdown
## Pattern: State Toggle Implementation
Context: Todo state management
Problem: Toggle functions need to handle both directions
Solution: Always use negation operator: !currentState
Example: todo.completed = !todo.completed
```

## Summary

The memory system creates a feedback loop:

1. **Work** → Document in `scratch/working-notes.md`
2. **Learn** → Extract patterns to `patterns-discovered.md`
3. **Record** → Summarize session in `session-notes.md`
4. **Apply** → AI references these in future work

This creates a continuously improving development experience where every session builds on previous knowledge.
