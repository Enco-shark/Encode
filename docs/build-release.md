# 构建与发布

本项目在内部 GitLab 开发，推送到 GitHub (`https://github.com/encode/encode`) 时代码经过裁剪，因此**构建和发布在本地完成**，不使用 GitHub Actions CI 构建。

---

## GitHub 保留内容

```
.github/
├── actions/
│   └── setup-bun/action.yml          # bun 安装（typecheck 用）
├── workflows/
│   └── typecheck.yml                  # PR 门控：类型检查
├── ISSUE_TEMPLATE/                    # Issue 模板
└── pull_request_template.md           # PR 模板
```

已删除：publish/test workflow、setup-git-committer、github bot、CODEOWNERS、TEAM_MEMBERS 等。

---

## 本地发布流程

### 前置条件

| 环境变量 | 用途 | 获取方式 |
|----------|------|----------|
| `NPM_TOKEN` | npm publish (`@encode-ai` scope) | npmjs.com → Access Tokens → Granular Token |
| `GH_TOKEN` | GitHub Release 创建/上传 | `gh auth token` 或 GitHub PAT（repo scope） |
| `GH_REPO` | 目标 GitHub 仓库 | `encode/encode` |

可选：
| 环境变量 | 用途 | 默认行为 |
|----------|------|----------|
| `OPENCODE_VERSION` | 覆盖版本号 | 读取 `packages/opencode/package.json` |
| `OPENCODE_BUMP` | 自动递增 (major/minor/patch) | 不 bump，原样使用 |
| `OPENCODE_RELEASE` | 创建 GitHub Release | 由 `script/version.ts` 自动设置 |
| `OPENCODE_CHANNEL` | 发布 channel (latest/beta/...) | 从 git branch 推断，detached HEAD 默认 latest |

### 一键发布

```bash
GH_REPO=encode/encode \
NPM_TOKEN=npm_xxxxx \
GH_TOKEN=$(gh auth token) \
  ./script/release.ts
```

这会依次执行：
1. **version** — 计算版本号，创建 draft GitHub Release
2. **build** — 编译全平台 CLI 二进制，上传到 draft Release
3. **publish npm** — 发布 `@encode-ai/cli` + 平台包 + SDK + plugin 到 npm
4. **finalize release** — 将 GitHub Release 从 draft 改为 published

### 分步执行

如果只需要其中部分步骤：

```bash
# 仅构建（不发布）
OPENCODE_VERSION=1.2.3 ./packages/opencode/script/build.ts

# 仅 npm publish（需要先构建）
NPM_TOKEN=npm_xxxxx OPENCODE_VERSION=1.2.3 ./script/publish.ts

# 仅创建 GitHub Release（不含 npm）
GH_TOKEN=$(gh auth token) GH_REPO=encode/encode ./script/version.ts
# 然后手动上传二进制:
gh release upload v1.2.3 packages/opencode/dist/*.zip packages/opencode/dist/*.tar.gz --repo encode/encode
gh release edit v1.2.3 --draft=false --repo encode/encode
```

---

## 版本号逻辑

`packages/script/src/index.ts` 中 VERSION 的决策：

| 优先级 | 条件 | 结果 |
|--------|------|------|
| 1 | `OPENCODE_VERSION` 有值 | 直接使用 |
| 2 | preview channel（非 latest） | `0.0.0-{channel}-{timestamp}` |
| 3 | `OPENCODE_BUMP` 有值 | 从 package.json 读取并 bump |
| 4 | 无 bump | 原样使用 package.json 版本 |

---

## 首次发布

1. 确认 npmjs.org 上 `@encode-ai` org 存在
2. 创建 Granular Access Token（Packages: Read and write, scope: `@encode-ai`）
3. 确认 `gh auth status` 有 `encode/encode` 的 repo 权限
4. 设定 package.json 版本为 `0.1.0`
5. 运行 `./script/release.ts`

---

## npm 包结构

| 包名 | 内容 |
|------|------|
| `@encode-ai/cli` | Wrapper 包（bin shim + postinstall） |
| `encode-darwin-arm64` | macOS ARM 二进制 |
| `encode-darwin-x64` | macOS x64 二进制 |
| `encode-linux-arm64` | Linux ARM 二进制 |
| `encode-linux-x64` | Linux x64 二进制 |
| `encode-win32-arm64` | Windows ARM 二进制 |
| `encode-win32-x64` | Windows x64 二进制 |
