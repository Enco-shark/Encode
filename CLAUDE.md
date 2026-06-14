# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Encode is an open-source, terminal-native AI coding assistant written in TypeScript. It runs on Bun and is organized as a Bun workspace monorepo orchestrated by Turborepo.

## Commands

```bash
bun install                    # Install dependencies
bun dev                        # Run TUI in dev mode (defaults to packages/opencode)
bun dev <directory>            # Run TUI against a specific directory
bun dev serve                  # Start headless API server (port 4096)
bun dev web                    # Start server + web interface
bun dev:desktop                # Run Electron desktop app
bun dev:web                    # Run web app
bun lint                       # Lint with oxlint
bun typecheck                  # Type-check all packages via turbo
```

### Testing

Tests **cannot** be run from the repo root — always `cd` to the package directory first:

```bash
cd packages/opencode && bun test --timeout 30000
cd packages/app && bun test --preload ./happydom.ts ./src
cd packages/app && bun test:e2e           # Playwright E2E
```

### Database Migrations

```bash
cd packages/opencode && bun run db generate --name <slug>
```

## Architecture

### Monorepo Layout

| Package | Purpose |
|---|---|
| `packages/opencode` | Core: CLI, server, TUI, agent, session, tools, memory, providers |
| `packages/app` | Web interface (SolidJS + Vite + Tailwind) |
| `packages/desktop` | Electron desktop app |
| `packages/ui` | Shared UI component library (SolidJS) |
| `packages/sdk/js` | JavaScript SDK (`@encode-ai/sdk`) |
| `packages/plugin` | Plugin system API (`@encode-ai/plugin`) |
| `packages/shared` | Shared utilities |

### Entry Points

- **CLI**: `packages/opencode/src/index.ts` (yargs)
- **Server**: `packages/opencode/src/server/server.ts` (Hono)
- **TUI**: `packages/opencode/src/cli/cmd/tui/app.tsx` (opentui + SolidJS)
- **Web app**: `packages/app/src/`
- **Desktop**: `packages/desktop/src/main/index.ts` (Electron)

### Key Technologies

- **Effect** (v4 beta) — service composition, dependency injection, error handling, async control flow
- **Drizzle ORM** — SQLite database; schemas live in `src/**/*.sql.ts`
- **SolidJS** — UI framework for TUI, web app, and shared UI components
- **opentui** — terminal UI framework
- **Hono** — HTTP server framework
- **Bun** — JavaScript runtime and test runner

## Code Style

- Use Bun APIs (e.g., `Bun.file()`) when possible
- Avoid `any`; prefer precise types
- Prefer `const` over `let`; use ternaries or early returns instead of reassignment
- Avoid `else` statements; prefer early returns
- Prefer functional array methods (flatMap, filter, map) over for loops
- Avoid unnecessary destructuring — use dot notation to preserve context (`obj.a` not `const { a } = obj`)
- Keep logic in one function unless breaking it out adds clear reuse
- Inline values only used once to reduce variable count
- No semicolons; 120 char print width (Prettier)

### Module Pattern

Use flat top-level exports with self-reexport, **never** `export namespace`:

```ts
// src/foo/foo.ts
export interface Interface { ... }
export class Service extends Context.Service<Service, Interface>()("@opencode/Foo") {}
export const layer = Layer.effect(Service, ...)

export * as Foo from "./foo"
```

For `index.ts` files, use `"."` as the reexport source: `export * as Foo from "."`

Multi-sibling directories (e.g., `src/session/`) should not have barrel `index.ts` files — import specific siblings directly.

### Drizzle Schema

Use snake_case field names so column names don't need string redefinition:

```ts
// Good
const table = sqliteTable("session", {
  id: text().primaryKey(),
  project_id: text().notNull(),
})

// Bad
const table = sqliteTable("session", {
  id: text("id").primaryKey(),
  projectID: text("project_id").notNull(),
})
```

## Effect Patterns

- Use `Effect.gen(function* () { ... })` for composition
- Use `Effect.fn("Domain.method")` for named/traced effects; `Effect.fnUntraced` for internal helpers
- `Effect.fn` / `Effect.fnUntraced` accept pipeable operators as extra args — avoid unnecessary outer `.pipe()`
- Prefer `yield* new MyError(...)` over `yield* Effect.fail(new MyError(...))` in `Effect.gen`
- `Effect.fork` and `Effect.forkDaemon` do not exist in v4 — use `Effect.forkIn(scope)`
- Use `makeRuntime` (from `src/effect/run-service.ts`) for all services
- Use `InstanceState` (from `src/effect/instance-state.ts`) for per-directory/per-project state with per-instance cleanup
- Prefer Effect services over raw platform APIs: `FileSystem`, `ChildProcessSpawner`, `HttpClient`, `Path`, `Config`, `Clock`
- Use `Effect.cached` when multiple concurrent callers should share a single in-flight computation
- Use `Instance.bind(fn)` for native addon callbacks that need AsyncLocalStorage context

## Testing

- Tests use Bun's built-in test runner (`bun:test`)
- Avoid mocks; test actual implementation
- Use `testEffect(Layer)` from `test/lib/effect.ts` for Effect-based tests
- Use `it.live(...)` for tests depending on real time, filesystem, git, etc.
- Use `it.effect(...)` for tests with TestClock and TestConsole
- Use `tmpdir({ git: true })` fixture for temporary directories with auto-cleanup via `await using`
- Use `provideTmpdirInstance(...)` to bind a temp dir as the active Effect instance

## Environment Variables

- `ENCODE_HOME` — custom home directory for development
- `ENCODE_PURE` — run without external plugins
- `ENCODE_DISABLE_SHARE` — disable sharing features

## Git

- **Default branch**: `dev` (not `main`)
- **Pre-push hook**: validates Bun version and runs `bun typecheck`
- **PR titles**: follow conventional commit format (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`)
