# Encode

AI-powered coding assistant with cross-session memory.

## Installation

```bash
npm install -g encode-ai
```

Or use directly with npx:

```bash
npx encode-ai
```

## Features

- **Cross-session Memory** - Persistent memory system using SQLite FTS5 full-text search
- **Task Management** - Tree-shaped task system (T1, T1.1, T1.2, ...) with automatic checkpoint integration
- **Subagent System** - Create subagents on demand with parallel execution and lifecycle tracking
- **Workflow Engine** - Dynamic workflow runtime with sandbox execution and persistence
- **Multiple Providers** - Support for OpenAI, Anthropic, Google, and many more LLM providers
- **Terminal UI** - Full terminal UI with themes, backgrounds, and keyboard shortcuts

## Quick Start

```bash
# Start Encode
encode

# Or with a specific directory
encode /path/to/project
```

## Configuration

Encode is configured via `.encode/encode.jsonc` in the project directory or `~/.config/encode/encode.jsonc` globally.

## Commands

| Command | Description |
|---------|-------------|
| `/init` | Initialize project configuration |
| `/review` | Code review |
| `/dream` | Extract persistent knowledge to project memory |
| `/distill` | Package repeated workflows as reusable skills |
| `/goal` | Set stopping condition for autonomous work |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ENCODE_HOME` | Custom root directory (absolute path) |
| `ENCODE_CONFIG_DIR` | Custom config directory |
| `ENCODE_CONFIG` | Config file path |
| `ENCODE_DISABLE_PROJECT_CONFIG` | Disable project config |

## License

MIT

## Links

- [GitHub](https://github.com/Enco-shark/Encode)
- [Issues](https://github.com/Enco-shark/Encode/issues)
