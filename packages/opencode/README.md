# Encode CLI

AI-powered coding assistant with cross-session memory, task management, and multi-provider support.

## Installation

```bash
npm install -g encode-ai-cli
```

Or use directly with npx:

```bash
npx encode-ai-cli
```

## Features

- **Cross-session Memory** - Persistent memory system using SQLite FTS5 full-text search
- **Task Management** - Tree-shaped task system (T1, T1.1, T1.2, ...) with automatic checkpoint integration
- **Subagent System** - Create subagents on demand with parallel execution and lifecycle tracking
- **Workflow Engine** - Dynamic workflow runtime with sandbox execution and persistence
- **Multiple Providers** - Support for OpenAI, Anthropic, Google, Groq, xAI, and many more LLM providers
- **Terminal UI** - Full terminal UI with themes, backgrounds, and keyboard shortcuts
- **Plugin System** - Extensible plugin architecture for custom functionality
- **MCP Support** - Model Context Protocol integration for external tools

## Quick Start

```bash
# Start Encode
encode

# Or with a specific directory
encode /path/to/project

# Run in web mode
encode serve

# Run with specific model
encode --model anthropic/claude-sonnet-4-20250514
```

## Configuration

Encode is configured via `.encode/encode.jsonc` in the project directory or `~/.config/encode/encode.jsonc` globally.

### Example Configuration

```jsonc
{
  "provider": {
    "anthropic": {
      "apiKey": "your-api-key"
    }
  },
  "model": "anthropic/claude-sonnet-4-20250514",
  "theme": "opencode"
}
```

## Commands

| Command | Description |
|---------|-------------|
| `/init` | Initialize project configuration |
| `/review` | Code review |
| `/dream` | Extract persistent knowledge to project memory |
| `/distill` | Package repeated workflows as reusable skills |
| `/goal` | Set stopping condition for autonomous work |
| `/model` | Switch AI model |
| `/theme` | Change terminal theme |
| `/session` | Manage sessions |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ENCODE_HOME` | Custom root directory (absolute path) |
| `ENCODE_CONFIG_DIR` | Custom config directory |
| `ENCODE_CONFIG` | Config file path |
| `ENCODE_DISABLE_PROJECT_CONFIG` | Disable project config |
| `ENCODE_PURE` | Run without external plugins |
| `ENCODE_DISABLE_SHARE` | Disable sharing features |

## Supported Providers

- OpenAI (GPT-4, GPT-4o, etc.)
- Anthropic (Claude 3.5, Claude 4, etc.)
- Google (Gemini Pro, Gemini Ultra, etc.)
- Groq
- xAI (Grok)
- Amazon Bedrock
- Azure OpenAI
- And many more via AI SDK

## Development

```bash
# Clone the repository
git clone https://github.com/Enco-shark/Encode.git

# Install dependencies
bun install

# Run in development mode
bun dev

# Run tests
cd packages/opencode && bun test

# Type checking
bun typecheck
```

## License

MIT

## Links

- [GitHub](https://github.com/Enco-shark/Encode)
- [Issues](https://github.com/Enco-shark/Encode/issues)
- [npm](https://www.npmjs.com/package/encode-ai-cli)
