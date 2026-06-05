# Patterns Discovered

## Purpose
This file documents recurring code patterns, solutions, and architectural decisions discovered during development. These patterns help maintain consistency and provide AI assistants with project-specific context.

**Update this file**: When you discover a reusable pattern or solve a problem that might recur

**Commit this file**: Yes - this is accumulated project knowledge

---

## Pattern Template

Use this template when documenting a new pattern:

```markdown
## Pattern: [Pattern Name]

**Context**: [Where/when this pattern applies]

**Problem**: [What problem does this solve?]

**Solution**: [How to implement this pattern]

**Example**:
\`\`\`javascript
// Code example demonstrating the pattern
\`\`\`

**Related Files**: [Files where this pattern is used]

**Notes**: [Additional considerations or gotchas]
```

---

## Discovered Patterns

### Pattern: Service Array Initialization

**Context**: Backend service state management, particularly in Express API routes where data is stored in-memory

**Problem**: Initializing service state with `null` causes errors when array methods (`.find()`, `.filter()`, `.map()`) are called before data is added. This led to runtime errors and failing tests.

**Solution**: Always initialize collection state as empty arrays `[]` instead of `null`. This ensures array methods can be called safely even when no data exists yet.

**Example**:
```javascript
// ❌ DON'T: Initialize as null
let todos = null;

// ✅ DO: Initialize as empty array
let todos = [];

// This allows safe usage of array methods immediately
const todo = todos.find(t => t.id === id); // Works even when empty
const completed = todos.filter(t => t.completed); // No error
```

**Related Files**:
- `packages/backend/src/app.js` - Todo service state

**Notes**: 
- Applies to any in-memory collection state
- Prevents `Cannot read property 'find' of null` errors
- Makes code more defensive and test-friendly
- Consider this pattern for any array-based state management

---

## Pattern Categories

As you discover more patterns, organize them into categories:

### State Management
- Service Array Initialization (documented above)

### API Design
- (Future patterns related to Express routes, middleware, validation)

### Testing
- (Future patterns related to Jest, React Testing Library)

### Frontend Components
- (Future patterns related to React component structure)

### Error Handling
- (Future patterns related to error responses, validation)

---

## Notes

- Document patterns as you discover them, not preemptively
- Include real code examples from the project
- Focus on solutions to actual problems encountered
- Reference specific files where patterns are implemented
- Update patterns if better approaches are discovered
- Remove patterns that become obsolete
