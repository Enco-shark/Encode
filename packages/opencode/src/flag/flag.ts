import { Config } from "effect"

function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

function falsy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "false" || value === "0"
}

function number(key: string) {
  const value = process.env[key]
  if (!value) return undefined
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
}

const ENCODE_EXPERIMENTAL = truthy("ENCODE_EXPERIMENTAL")

// Defaults to false. When enabled, encode runs in pure-Encode mode:
//   — does NOT inherit Claude Code's settings (CLAUDE.md, ~/.claude/skills, etc.)
//   — does NOT pick up provider API keys from environment variables
//   — falls back to the Encode-auto model as the default
// Set ENCODE_MIMO_ONLY=true to disable .claude inheritance and env-based
// provider auto-detection.
const ENCODE_MIMO_ONLY = truthy("ENCODE_MIMO_ONLY")
const ENCODE_DISABLE_CLAUDE_CODE_ENV = truthy("ENCODE_DISABLE_CLAUDE_CODE")
const ENCODE_DISABLE_CLAUDE_CODE = ENCODE_MIMO_ONLY || ENCODE_DISABLE_CLAUDE_CODE_ENV

const ENCODE_DISABLE_EXTERNAL_SKILLS = truthy("ENCODE_DISABLE_EXTERNAL_SKILLS")
const ENCODE_DISABLE_CLAUDE_CODE_SKILLS =
  ENCODE_DISABLE_EXTERNAL_SKILLS || ENCODE_DISABLE_CLAUDE_CODE || truthy("ENCODE_DISABLE_CLAUDE_CODE_SKILLS")
const copy = process.env["ENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]

export const Flag = {
  OTEL_EXPORTER_OTLP_ENDPOINT: process.env["OTEL_EXPORTER_OTLP_ENDPOINT"],
  OTEL_EXPORTER_OTLP_HEADERS: process.env["OTEL_EXPORTER_OTLP_HEADERS"],

  ENCODE_AUTO_SHARE: truthy("ENCODE_AUTO_SHARE"),
  ENCODE_AUTO_HEAP_SNAPSHOT: truthy("ENCODE_AUTO_HEAP_SNAPSHOT"),
  ENCODE_GIT_BASH_PATH: process.env["ENCODE_GIT_BASH_PATH"],
  ENCODE_CONFIG: process.env["ENCODE_CONFIG"],
  ENCODE_CONFIG_CONTENT: process.env["ENCODE_CONFIG_CONTENT"],

  ENCODE_DISABLE_AUTOUPDATE: truthy("ENCODE_DISABLE_AUTOUPDATE"),

  // Defaults to true (analytics enabled). Set ENCODE_ENABLE_ANALYSIS=false
  // to opt out of POSTing model_call/tool_call/agent_request metrics.
  ENCODE_ENABLE_ANALYSIS: !falsy("ENCODE_ENABLE_ANALYSIS"),
  ENCODE_ALWAYS_NOTIFY_UPDATE: truthy("ENCODE_ALWAYS_NOTIFY_UPDATE"),
  ENCODE_DISABLE_PRUNE: truthy("ENCODE_DISABLE_PRUNE"),
  ENCODE_DISABLE_TERMINAL_TITLE: truthy("ENCODE_DISABLE_TERMINAL_TITLE"),
  ENCODE_SHOW_TTFD: truthy("ENCODE_SHOW_TTFD"),
  ENCODE_PERMISSION: process.env["ENCODE_PERMISSION"],
  ENCODE_DISABLE_DEFAULT_PLUGINS: truthy("ENCODE_DISABLE_DEFAULT_PLUGINS"),
  ENCODE_DISABLE_LSP_DOWNLOAD: truthy("ENCODE_DISABLE_LSP_DOWNLOAD"),
  ENCODE_ENABLE_EXPERIMENTAL_MODELS: truthy("ENCODE_ENABLE_EXPERIMENTAL_MODELS"),
  ENCODE_DISABLE_AUTOCOMPACT: truthy("ENCODE_DISABLE_AUTOCOMPACT"),
  ENCODE_DISABLE_MODELS_FETCH: truthy("ENCODE_DISABLE_MODELS_FETCH"),
  ENCODE_DISABLE_MOUSE: truthy("ENCODE_DISABLE_MOUSE"),
  ENCODE_OUTPUT_LENGTH_CONTINUATION_LIMIT: number("ENCODE_OUTPUT_LENGTH_CONTINUATION_LIMIT") ?? 3,
  ENCODE_INVALID_OUTPUT_CONTINUATION_LIMIT: number("ENCODE_INVALID_OUTPUT_CONTINUATION_LIMIT") ?? 2,

  // Caps applied to image attachments before a prompt is sent. Both default to
  // undefined (no limit). ENCODE_MAX_PROMPT_IMAGES bounds how many images may
  // be sent per request (oldest excess images are dropped); ENCODE_MAX_PROMPT_IMAGE_SIZE
  // bounds the decoded byte size of a single image. Values must be positive integers.
  ENCODE_MAX_PROMPT_IMAGES: number("ENCODE_MAX_PROMPT_IMAGES"),
  ENCODE_MAX_PROMPT_IMAGE_SIZE: number("ENCODE_MAX_PROMPT_IMAGE_SIZE"),
  ENCODE_MIMO_ONLY,
  ENCODE_DISABLE_PROVIDER_ENV: ENCODE_MIMO_ONLY || truthy("ENCODE_DISABLE_PROVIDER_ENV"),
  ENCODE_DISABLE_CLAUDE_CODE,
  get ENCODE_DISABLE_CLAUDE_CODE_MCP() {
    // MCP compatibility stays on in Encode-only mode so users can reuse Claude Code
    // MCP servers without inheriting prompts, skills, or provider env keys.
    return ENCODE_DISABLE_CLAUDE_CODE_ENV || truthy("ENCODE_DISABLE_CLAUDE_CODE_MCP")
  },
  ENCODE_DISABLE_CLAUDE_CODE_PROMPT: ENCODE_DISABLE_CLAUDE_CODE || truthy("ENCODE_DISABLE_CLAUDE_CODE_PROMPT"),
  // Defaults to false (enabled): markdown commands under ~/.claude/commands and
  // {project}/.claude/commands load as slash commands. Independent of the
  // Encode-only master switch. Set ENCODE_DISABLE_CLAUDE_CODE_COMMANDS=true to disable.
  ENCODE_DISABLE_CLAUDE_CODE_COMMANDS: truthy("ENCODE_DISABLE_CLAUDE_CODE_COMMANDS"),
  ENCODE_DISABLE_CLAUDE_CODE_SKILLS,
  ENCODE_DISABLE_EXTERNAL_SKILLS,
  ENCODE_DISABLE_CODEX_SKILLS: ENCODE_DISABLE_EXTERNAL_SKILLS || truthy("ENCODE_DISABLE_CODEX_SKILLS"),
  ENCODE_DISABLE_OPENCODE_SKILLS: ENCODE_DISABLE_EXTERNAL_SKILLS || truthy("ENCODE_DISABLE_OPENCODE_SKILLS"),
  ENCODE_FAKE_VCS: process.env["ENCODE_FAKE_VCS"],

  // When enabled, skips all git subprocess calls during project discovery
  // (which git, rev-parse --git-common-dir, rev-parse --show-toplevel) and
  // branch detection. The project is treated as a non-git directory rooted at
  // the working directory. Use to avoid touching git in restricted/sandboxed
  // environments or where git startup probing is undesirable.
  ENCODE_DISABLE_GIT: truthy("ENCODE_DISABLE_GIT"),
  ENCODE_SERVER_PASSWORD: process.env["ENCODE_SERVER_PASSWORD"],
  ENCODE_SERVER_USERNAME: process.env["ENCODE_SERVER_USERNAME"],
  ENCODE_ENABLE_QUESTION_TOOL: truthy("ENCODE_ENABLE_QUESTION_TOOL"),

  // Experimental
  ENCODE_EXPERIMENTAL,
  ENCODE_EXPERIMENTAL_FILEWATCHER: Config.boolean("ENCODE_EXPERIMENTAL_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  ENCODE_EXPERIMENTAL_DISABLE_FILEWATCHER: Config.boolean("ENCODE_EXPERIMENTAL_DISABLE_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  ENCODE_EXPERIMENTAL_ICON_DISCOVERY: ENCODE_EXPERIMENTAL || truthy("ENCODE_EXPERIMENTAL_ICON_DISCOVERY"),
  ENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT:
    copy === undefined ? process.platform === "win32" : truthy("ENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"),
  ENCODE_ENABLE_EXA: truthy("ENCODE_ENABLE_EXA") || ENCODE_EXPERIMENTAL || truthy("ENCODE_EXPERIMENTAL_EXA"),
  ENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS: number("ENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS"),
  ENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX: number("ENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX"),
  ENCODE_EXPERIMENTAL_OXFMT: ENCODE_EXPERIMENTAL || truthy("ENCODE_EXPERIMENTAL_OXFMT"),
  ENCODE_EXPERIMENTAL_LSP_TY: truthy("ENCODE_EXPERIMENTAL_LSP_TY"),
  ENCODE_EXPERIMENTAL_LSP_TOOL: ENCODE_EXPERIMENTAL || truthy("ENCODE_EXPERIMENTAL_LSP_TOOL"),
  ENCODE_EXPERIMENTAL_WORKFLOW_TOOL: ENCODE_EXPERIMENTAL || truthy("ENCODE_EXPERIMENTAL_WORKFLOW_TOOL"),
  ENCODE_EXPERIMENTAL_MARKDOWN: !falsy("ENCODE_EXPERIMENTAL_MARKDOWN"),
  ENCODE_MODELS_URL: process.env["ENCODE_MODELS_URL"],
  ENCODE_MODELS_PATH: process.env["ENCODE_MODELS_PATH"],
  ENCODE_DISABLE_EMBEDDED_WEB_UI: truthy("ENCODE_DISABLE_EMBEDDED_WEB_UI"),
  ENCODE_DB: process.env["ENCODE_DB"],

  // Defaults to true — all channels share a single encode.db. The per-channel
  // DB isolation (encode-{channel}.db) is unnecessary for encode since we
  // don't ship multiple release channels yet. Use ENCODE_HOME to isolate dev
  // environments instead. Set ENCODE_DISABLE_CHANNEL_DB=false to restore
  // per-channel isolation.
  ENCODE_DISABLE_CHANNEL_DB: !falsy("ENCODE_DISABLE_CHANNEL_DB"),
  ENCODE_SKIP_MIGRATIONS: truthy("ENCODE_SKIP_MIGRATIONS"),
  ENCODE_STRICT_CONFIG_DEPS: truthy("ENCODE_STRICT_CONFIG_DEPS"),

  ENCODE_WORKSPACE_ID: process.env["ENCODE_WORKSPACE_ID"],
  ENCODE_EXPERIMENTAL_HTTPAPI: truthy("ENCODE_EXPERIMENTAL_HTTPAPI"),
  ENCODE_EXPERIMENTAL_WORKSPACES: ENCODE_EXPERIMENTAL || truthy("ENCODE_EXPERIMENTAL_WORKSPACES"),

  // Evaluated at access time (not module load) because tests, the CLI, and
  // external tooling set these env vars at runtime.
  get ENCODE_DISABLE_COMPOSE_SKILLS() {
    return truthy("ENCODE_DISABLE_COMPOSE_SKILLS")
  },
  get ENCODE_DISABLE_PROJECT_CONFIG() {
    return truthy("ENCODE_DISABLE_PROJECT_CONFIG")
  },
  get ENCODE_TUI_CONFIG() {
    return process.env["ENCODE_TUI_CONFIG"]
  },
  get ENCODE_CONFIG_DIR() {
    return process.env["ENCODE_CONFIG_DIR"]
  },
  get ENCODE_HOME() {
    return process.env["ENCODE_HOME"]
  },
  get ENCODE_PURE() {
    return truthy("ENCODE_PURE")
  },
  get ENCODE_PLUGIN_META_FILE() {
    return process.env["ENCODE_PLUGIN_META_FILE"]
  },
  get ENCODE_CLIENT() {
    return process.env["ENCODE_CLIENT"] ?? "cli"
  },
}
