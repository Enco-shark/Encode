# Encode Agent Guide

## Quick Reference

- **Default branch**: `dev` (not `main`)
- **Runtime**: Bun 1.3.14 + Turbo monorepo
- **Type checking**: `bun typecheck` (runs `bun turbo typecheck`)
- **Linting**: `bun lint` (uses oxlint)
- **Testing**: Run from package dirs only (e.g., `cd packages/opencode && bun test`)

## Project Structure

```
packages/
├── opencode/    # Core business logic & server (main entry: src/index.ts)
│   └── src/cli/cmd/tui/  # TUI terminal interface (opentui + SolidJS)
├── app/         # Web interface (SolidJS + Vite)
├── desktop/     # Electron desktop client (Tauri)
├── sdk/         # JavaScript SDK
├── ui/          # Shared UI component library
├── plugin/      # Plugin system
└── script/      # Build scripts
```

## Development Commands

```bash
# Install dependencies
bun install

# Run TUI (development mode)
bun dev

# Run against specific directory
bun dev <directory>

# Type checking (always from package dir)
bun typecheck

# Linting
bun lint

# Run tests (from package dir only)
cd packages/opencode && bun test --timeout 30000

# Regenerate JavaScript SDK
./packages/sdk/js/script/build.ts

# Database migrations (from packages/opencode)
bun run db generate --name <slug>
```

## Important Guards

- **Tests cannot run from repo root** (guard: `do-not-run-tests-from-root`)
- **Always run `bun typecheck` from package directories** (e.g., `packages/opencode`), never `tsc` directly
- **Pre-push hook** validates Bun version and runs typecheck

## Code Style

### General Principles

- Use Bun APIs when possible (e.g., `Bun.file()`)
- Avoid `any` type
- Prefer `const` over `let`; use ternaries or early returns instead of reassignment
- Avoid `else` statements; prefer early returns
- Prefer functional array methods (flatMap, filter, map) over for loops
- Keep things in one function unless composable or reusable
- Reduce variable count by inlining when a value is only used once

### Destructuring

Avoid unnecessary destructuring. Use dot notation to preserve context:

```ts
// Good
obj.a
obj.b

// Bad
const { a, b } = obj
```

### Schema Definitions (Drizzle)

Use snake_case for field names so column names don't need to be redefined as strings:

```ts
// Good
const table = sqliteTable("session", {
  id: text().primaryKey(),
  project_id: text().notNull(),
  created_at: integer().notNull(),
})

// Bad
const table = sqliteTable("session", {
  id: text("id").primaryKey(),
  projectID: text("project_id").notNull(),
  createdAt: integer("created_at").notNull(),
})
```

## Testing

- Avoid mocks as much as possible
- Test actual implementation, do not duplicate logic into tests
- Use `testEffect(...)` for Effect-based tests
- Use `it.live(...)` for tests depending on real time, filesystem, git, etc.
- Use `it.effect(...)` for tests with TestClock and TestConsole

### Test Fixtures

```typescript
import { tmpdir } from "./fixture/fixture"

test("example", async () => {
  await using tmp = await tmpdir({ git: true })
  // tmp.path is the temp directory path
  // automatically cleaned up when test ends
})
```

## Architecture Notes

### Entry Points

- **CLI**: `packages/opencode/src/index.ts` (yargs-based CLI)
- **Server**: `packages/opencode/src/server/server.ts` (Hono framework)
- **TUI**: `packages/opencode/src/cli/cmd/tui/app.tsx` (opentui + SolidJS)

### Key Technologies

- **Effect**: Used extensively for service composition and error handling
- **Drizzle ORM**: SQLite database with schema in `src/**/*.sql.ts`
- **Hono**: HTTP server framework
- **SolidJS**: UI framework for TUI and web app
- **opentui**: Terminal UI framework

### Module Pattern

Use flat top-level exports with self-reexport (not `export namespace`):

```ts
// src/foo/foo.ts
export interface Interface { ... }
export class Service extends Context.Service<Service, Interface>()("@opencode/Foo") {}
export const layer = Layer.effect(Service, ...)

export * as Foo from "./foo"
```

## Environment Variables

- `ENCODE_HOME`: Custom home directory for development
- `ENCODE_PURE`: Run without external plugins
- `ENCODE_DISABLE_SHARE`: Disable sharing features

## Common Pitfalls

1. **Running tests from root**: Always cd to package directory first
2. **Using `tsc` directly**: Use `bun typecheck` instead
3. **Forgetting Bun version**: Pre-push hook validates Bun version matches package.json
4. **Using `export namespace`**: Use flat exports with self-reexport pattern
5. **Running `bun dev` without args**: Defaults to running in packages/opencode directory

## References

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Detailed contribution guidelines
- [packages/opencode/AGENTS.md](./packages/opencode/AGENTS.md) - Effect patterns and database guide
- [packages/opencode/test/AGENTS.md](./packages/opencode/test/AGENTS.md) - Testing patterns and fixtures
