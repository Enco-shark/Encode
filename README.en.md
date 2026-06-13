<h1 align="center">Encode</h1>

<p align="center">
  <img src="assets/readme/Encode.png" alt="Encode" width="700">
</p>

<p align="center"><strong>An open-source AI coding agent with cross-session memory.</strong></p>

<p align="center">
  <a href="README.md">中文</a> | English
</p>

---

Encode is a terminal-native AI coding assistant. It can read and write code, run commands, manage Git, and use a persistent memory system to keep a deep understanding of your project across sessions while continuously improving itself.

Encode supports connecting to any mainstream LLM provider API.

---

## Quick Start

```bash
# One-line install
curl -fsSL https://encode.ai/install | bash

# Or install via npm
npm install -g @encode-ai/cli
```

The first launch guides you through configuration automatically. Supported options:
- **Custom Provider** — add any OpenAI-compatible API in the TUI

---

## Core Features

### Multiple Agents

| Agent | Description |
|--------|------|
| **build** | Default. Full tool permissions for development |
| **plan** | Read-only analysis mode for code exploration and solution design |
| **compose** | Orchestration mode for specs-driven development and skill-driven workflows |

Press `Tab` to switch between primary agents. Subagents are created by the system as needed.

### Persistent Memory

Cross-session memory powered by SQLite FTS5 full-text search:

- **Project memory** (`MEMORY.md`) — persistent project knowledge, rules, and architecture decisions
- **Session checkpoint** (`checkpoint.md`) — structured state snapshots maintained automatically by the checkpoint-writer subagent
- **Scratch notes** (`notes.md`) — temporary note area for agents
- **Task progress** (`tasks/<id>/progress.md`) — per-task logs

Memory is injected automatically when a session resumes, so the agent does not need to relearn project context.

### Intelligent Context Management

- **Automatic checkpoints** — decides when to save session state based on the model context window
- **Context reconstruction** — when context approaches the limit, rebuilds it from the latest checkpoint, project memory, task progress, and retained recent messages so the agent can continue the current task
- **Budgeted injection** — uses a token budget to control how much checkpoint, memory, and notes content enters context, with importance ranking

### Task Tracking

A tree-shaped task system (`T1`, `T1.1`, `T1.2`, …) that integrates automatically with the checkpoint system, so task progress is preserved when sessions resume.

### Subagent System

The primary agent can create subagents on demand. Subagents share the current session context and can work in parallel, with lifecycle tracking, cancellation, and background execution.

### Goal / Stop Condition

The `/goal` command sets a stopping condition for a session. When the agent tries to stop, an independent judge model evaluates the conversation to decide whether the condition is truly satisfied — preventing premature "optimistic stops" during autonomous work. Use `/goal clear` to remove the goal.

### Compose Mode & Skills System

Compose mode provides a structured workflow for specs-driven development. It includes built-in skills for planning, execution, code review, TDD, debugging, verification, and merging — orchestrating the full lifecycle from spec to shipped code.

Skills are stored as `SKILL.md` files and are composable and reusable. The built-in compose skill bundle includes sub-skills for parallel execution, planning, TDD, brainstorming, and creating new skills.

### Workflow Engine

A full dynamic workflow runtime with sandboxed execution, persistence, workspace support, and nested workflow calls. Includes a built-in `/deep-research` workflow — fans out web searches, fetches sources, adversarially verifies claims, and returns a cited report.

### Dream & Distill

- **`/dream`** — scans recent session traces, extracts persistent knowledge into project memory, and removes outdated entries. Supports automatic execution (default every 7 days), configurable via `config.dream.auto`
- **`/distill`** — discovers repeated manual workflows in recent work and packages high-confidence candidates into reusable skills, subagents, or commands. Supports automatic execution (default every 30 days), configurable via `config.distill.auto`

### Built-in Commands

| Command | Description |
|--------|------|
| `/init` | Initialize project configuration |
| `/review` | Code review |
| `/dream` | Extract persistent knowledge into project memory |
| `/distill` | Package repeated workflows into reusable skills |
| `/goal` | Set / clear stop condition |
| `/deep-research` | Deep research (experimental) |

### MCP Support

Full Model Context Protocol support with OAuth provider integration. Can import MCP servers from Claude Code's `.claude.json` config files.

### Plugin System

Plugin architecture with lifecycle hooks, workspace adaptors, and auto-installation from npm.

### LSP Integration

Built-in Language Server Protocol support for code intelligence within the TUI.

### Predict Next Prompt (Experimental)

Predicts the user's likely next prompt after each turn and shows it as inline ghost text (press `Tab` to accept).

### TUI Terminal Interface

A full terminal UI built with [opentui](https://github.com/sst/opentui) and SolidJS:

- **Home page**: Logo ASCII art + dynamic backgrounds + Prompt input
- **Session page**: Message timeline + Sidebar + Prompt input
- **Command palette**: Triggered with `/`, supports model/agent/theme/session operations
- **Mouse support**: Click, scroll wheel, right-click paste, select-to-copy
- **Keyboard shortcuts**: `Tab` switch agent, `Ctrl+P` command palette, `Escape` interrupt

#### Built-in Backgrounds (switch with `/background`)

| Background | Effect |
|------|------|
| **┼ Grid** | Shimmering grid lines (default) |
| **𝑚 Matrix Rain** | Blue code rain |
| **≋ Waves** | Three-layer sine waves |
| **••• Dots Grid** | Pulsing dot grid |
| **✦ Fireflies** | Floating glowing fireflies |
| **\| Rain** | Vertical rain drops |
| **● Particles** | Particles with connection lines |
| **◎ Pulse Rings** | Concentric pulse rings |
| **✦ Starry** | Starfield + meteors |

Also supports custom image backgrounds (PNG/JPG), imported via `/background`.

#### Themes

Default theme is GitHub. Supports 30+ built-in themes (`/themes` to switch), including dark/light modes.

---

## Configuration

Encode is configured via `.ENCODE/ENCODE.json` (or `ENCODE.jsonc`) in the project directory. Global config lives at `~/.config/ENCODE/ENCODE.jsonc` (`~/Library/Application Support/ENCODE/` on macOS). Key options include:

- Provider and model selection
- Agent permissions and custom agents
- Checkpoint and memory behavior
- MCP server connections
- Keybindings and theme
- Dream/Distill auto-run intervals
- Workflow concurrency and depth limits

Max Mode (parallel best-of-N reasoning with judge selection) can be enabled via `experimental.maxMode` in the config.

---

## Development

```bash
bun install              # Install dependencies
bun run dev              # Run in development mode
bun turbo typecheck      # Type check
```

---

## Relationship to OpenCode

Encode is built as a fork of [OpenCode](https://github.com/anomalyco/opencode). It keeps all core OpenCode capabilities (multiple providers, TUI, LSP, MCP, plugins) and adds persistent memory, intelligent context management, subagent orchestration, goal-driven autonomous loops, compose workflows, a skills system, a workflow engine, deep research, and self-improvement via dream/distill.

---

## License

Source code is licensed under the [MIT License](./LICENSE).
