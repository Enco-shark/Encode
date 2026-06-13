<h1 align="center">Encode</h1>

<p align="center">
  <img src="assets/readme/Encode.png" alt="Encode" width="700">
</p>

<p align="center"><strong>开源 AI 编码助手，支持跨会话记忆。</strong></p>

<p align="center">
  中文 | <a href="README.en.md">English</a>
</p>

---

Encode 是一款终端原生 AI 编码助手。它可以读写代码、运行命令、管理 Git，并使用持久化记忆系统在会话之间保持对项目的深入理解，同时不断自我改进。

Encode 支持连接任何主流 LLM 提供商 API。

---

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/your-username/Encode.git
cd Encode

# 安装依赖
bun install

# 运行 TUI
bun dev
```

首次启动会自动引导配置。支持的选项：
- **自定义提供商** — 在 TUI 中添加任何 OpenAI 兼容 API

---

## 核心功能

### 多代理模式

| 代理 | 描述 |
|--------|------|
| **build** | 默认模式，具有完整工具权限用于开发 |
| **plan** | 只读分析模式，用于代码探索和方案设计 |
| **compose** | 编排模式，用于规范驱动开发和技能驱动工作流 |

按 `Tab` 切换主代理。系统会根据需要自动创建子代理。

### 持久化记忆

基于 SQLite FTS5 全文搜索的跨会话记忆：

- **项目记忆** (`MEMORY.md`) — 持久化项目知识、规则和架构决策
- **会话检查点** (`checkpoint.md`) — 由检查点写入子代理自动维护的结构化状态快照
- **临时笔记** (`notes.md`) — 代理的临时笔记区域
- **任务进度** (`tasks/<id>/progress.md`) — 每个任务的日志

会话恢复时自动注入记忆，代理无需重新学习项目上下文。

### 智能上下文管理

- **自动检查点** — 根据模型上下文窗口决定何时保存会话状态
- **上下文重建** — 当上下文接近限制时，从最新检查点、项目记忆、任务进度和保留的近期消息重建，以便代理继续当前任务
- **预算注入** — 使用 token 预算控制进入上下文的检查点、记忆和笔记内容量，并进行重要性排序

### 任务跟踪

树形任务系统 (`T1`, `T1.1`, `T1.2`, …)，自动与检查点系统集成，任务进度在会话恢复时保留。

### 子代理系统

主代理可以按需创建子代理。子代理共享当前会话上下文，支持并行执行、生命周期跟踪、取消和后台执行。

### 目标驱动

`/goal` 命令为会话设置停止条件。当代理尝试停止时，独立评判模型会评估对话以确定条件是否真正满足 — 防止自主工作中过早"乐观停止"。使用 `/goal clear` 清除目标。

### Compose 模式与技能系统

Compose 模式为规范驱动开发提供结构化工作流。内置规划、执行、代码审查、TDD、调试、验证和合并技能 — 编排从规范到交付代码的完整生命周期。

技能以 `SKILL.md` 文件形式存储，可组合复用。内置 compose 技能包包含并行执行、规划、TDD、头脑风暴和创建新技能等子技能。

### 工作流引擎

完整的动态工作流运行时，支持沙箱执行、持久化、工作区和嵌套工作流调用。内置 `/deep-research` 工作流 — 并行展开网络搜索、抓取来源、对抗性验证声明并返回带引用的报告。

### Dream & Distill

- **`/dream`** — 扫描近期会话痕迹，将持久知识提取到项目记忆，并移除过时条目。支持自动运行（默认每 7 天），通过 `config.dream.auto` 配置
- **`/distill`** — 发现近期工作中的重复手动工作流，并将高置信度候选项打包成可重用技能、子代理或命令。支持自动运行（默认每 30 天），通过 `config.distill.auto` 配置

### 内置命令

| 命令 | 描述 |
|--------|------|
| `/init` | 初始化项目配置 |
| `/review` | 代码审查 |
| `/dream` | 提取持久知识到项目记忆 |
| `/distill` | 将重复工作流打包为可复用技能 |
| `/goal` | 设置/清除停止条件 |
| `/deep-research` | 深度研究（实验性） |

### MCP 支持

完整的 Model Context Protocol 支持，包含 OAuth 提供商集成。可从 Claude Code 的 `.claude.json` 配置文件导入 MCP 服务器。

### 插件系统

插件架构支持生命周期钩子、工作区适配器和 npm 自动安装。

### LSP 集成

内置 Language Server Protocol 支持，为 TUI 提供代码智能补全。

### 预测下一个提示（实验性）

每轮对话结束后预测用户可能的下一个提示，以内联幽灵文本显示（按 `Tab` 接受）。

### TUI 终端界面

基于 [opentui](https://github.com/sst/opentui) 框架 + SolidJS 渲染的全终端 UI，支持：

- **Home 页面**：Logo ASCII art + 动态背景 + Prompt 输入框
- **Session 页面**：消息时间线 + 侧边栏 + Prompt 输入
- **命令面板**：`/` 触发，支持模型/代理/主题/会话等操作
- **鼠标支持**：点击、滚轮、右键粘贴、选中复制
- **键盘快捷键**：`Tab` 切换代理、`Ctrl+P` 命令面板、`Escape` 中断

#### 内置背景（`/background` 切换）

| 背景 | 效果 |
|------|------|
| **┼ Grid** | 闪烁网格线（默认） |
| **𝑚 Matrix Rain** | 蓝色代码雨 |
| **≋ Waves** | 三层正弦波 |
| **••• Dots Grid** | 脉冲扩散网格点 |
| **✦ Fireflies** | 萤火虫漂浮发光 |
| **\| Rain** | 竖直雨滴下落 |
| **● Particles** | 粒子 + 连线网络 |
| **◎ Pulse Rings** | 同心圆脉冲波纹 |
| **✦ Starry** | 星空 + 流星 |

也支持自定义图片背景（PNG/JPG），通过 `/background` 导入。

#### 主题

默认使用 GitHub 主题，支持 30+ 内置主题（`/themes` 切换），包括 dark/light 模式。

---

## 配置

Encode 通过项目目录中的 `.ENCODE/ENCODE.json`（或 `ENCODE.jsonc`）进行配置。全局配置位于 `~/.config/ENCODE/ENCODE.jsonc`（macOS 为 `~/Library/Application Support/ENCODE/`）。主要选项包括：

- 提供商和模型选择
- 代理权限和自定义代理
- 检查点和记忆行为
- MCP 服务器连接
- 按键绑定和主题
- Dream/Distill 自动运行间隔
- 工作流并发与深度限制

Max Mode（并行 best-of-N 推理与评判选择）可通过配置中的 `experimental.maxMode` 启用。

---

## 开发

```bash
bun install              # 安装依赖
bun run dev              # 以开发模式运行
bun turbo typecheck      # 类型检查
```

### 项目结构

```
packages/
├── opencode/    # 核心业务逻辑 & 服务器
│   └── src/cli/cmd/tui/  # TUI 终端界面
├── app/         # Web 界面（SolidJS）
├── ui/          # 共享 UI 组件库
├── desktop/     # Electron 桌面客户端
├── sdk/         # JavaScript SDK
└── script/      # 构建脚本
```

### 编译独立可执行文件

```bash
./packages/opencode/script/build.ts --single
./packages/opencode/dist/encode-<platform>/bin/Encode
```

---

## 与 OpenCode 的关系

Encode 基于 [OpenCode](https://github.com/anomalyco/opencode) 的 fork 构建。保留了 OpenCode 的所有核心能力（多提供商、TUI、LSP、MCP、插件），并添加了持久化记忆、智能上下文管理、子代理编排、目标驱动自主循环、Compose 工作流、技能系统、工作流引擎、深度研究，以及通过 dream/distill 实现的自我改进。

---

## 许可证

源代码采用 [MIT 许可证](./LICENSE)。
