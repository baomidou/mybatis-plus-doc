# MyBatis-Plus 文档翻译插件

这是一个专为 MyBatis-Plus 文档项目设计的自动翻译插件，基于 AI 技术实现高质量的技术文档翻译。

## ✨ v2.0 重大更新

全新重构，引入专业 CLI 库，提供更优雅的用户体验：

- 🎨 **现代化 CLI 界面**: 使用 `listr2` 提供实时任务进度展示
- 🖥️ **交互式操作**: 使用 `inquirer` 实现配置向导和确认提示
- 📊 **美化输出**: 使用 `boxen` 和 `cli-table3` 提供清晰的信息展示
- 🔧 **子命令支持**: `translate`, `config`, `status` 等独立命令
- 📝 **丰富的日志系统**: 支持多级别日志和日志文件输出
- ⚙️ **全局选项**: `--verbose`, `--quiet`, `--json`, `--no-color` 等

## 功能特性

- 🌍 **多语言支持**: 支持英语、日语、韩语等多种目标语言
- 🤖 **多 AI 提供商**: 基于 llm.js 支持 OpenAI、Claude、Google Gemini、Groq、Ollama、xAI、DeepSeek 等
- 📝 **智能翻译**: 保持 Markdown 格式和代码块不变
- 🔄 **增量翻译**: 只翻译修改过的文件，提高效率
- 💾 **缓存机制**: 避免重复翻译，节省 API 调用
- ⚡ **并行处理**: 支持多文件并行翻译
- 🎯 **精确控制**: 可配置翻译的 frontmatter 字段
- 📊 **进度显示**: 实时显示翻译进度和统计信息
- 💰 **成本跟踪**: 实时显示 Token 使用量和成本信息

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

在项目根目录的 `.env` 文件中设置：

```bash
# 选择 AI Provider（可选，默认使用 deepseek）
AI_PROVIDER=deepseek  # 可选值: deepseek, openai, claude, gemini

# 设置 API Key（必需）
API_KEY=your_api_key_here
```

或者在终端中临时设置：

```bash
# 使用 DeepSeek
export AI_PROVIDER=deepseek
export API_KEY=your_deepseek_api_key

# 使用 OpenAI
export AI_PROVIDER=openai
export API_KEY=your_openai_api_key

# 使用 Claude
export AI_PROVIDER=claude
export API_KEY=your_anthropic_api_key

# 使用 Gemini
export AI_PROVIDER=gemini
export API_KEY=your_google_api_key
```

### 3. 开始翻译

```bash
# 翻译所有文档到所有配置的语言
npm run translate

# 翻译到指定语言
npm run translate:en
npm run translate:ja

# 增量翻译（只翻译修改过的文件）
npm run translate:incremental

# 预览模式（不实际翻译，只显示会翻译哪些文件）
npm run translate:check
```

## 📖 命令参考

### 翻译命令 (translate)

```bash
# 基本用法
node translation-plugin/translate.js [options]

# 全局选项
--config <path>      # 配置文件路径（默认: ./translation-plugin/config.json）
--quiet, -q          # 静默模式，只输出错误信息
--verbose, -v        # 详细模式，输出调试信息
--debug              # 调试模式，输出所有日志
--json               # 以 JSON 格式输出结果
--no-color           # 禁用颜色输出
--log-file <path>    # 日志文件路径

# 翻译选项
--lang, -l <lang>         # 指定目标语言
--file, -f <file>         # 指定翻译文件
--incremental, -i         # 增量翻译
--dry-run, -d             # 预览模式
--yes, -y                 # 跳过确认提示
--continue-on-error       # 遇到错误继续执行
--retry <times>           # 失败时重试次数
```

**示例**:

```bash
# 翻译所有文件到所有语言（带确认提示）
npm run translate

# 静默模式翻译到英语
npm run translate -- --lang en --quiet

# 翻译指定文件并跳过确认
npm run translate -- --file introduce.mdx --yes

# 增量翻译（仅修改过的文件）
npm run translate -- --incremental

# 预览模式（不实际翻译）
npm run translate -- --dry-run

# 详细模式 + 日志文件
npm run translate -- --verbose --log-file ./logs/translate.log

# JSON 格式输出（适合脚本集成）
npm run translate -- --json > result.json

# 遇到错误继续执行，最多重试 3 次
npm run translate -- --continue-on-error --retry 3
```

### 配置命令 (config)

```bash
# 显示当前配置
node translation-plugin/translate.js config show

# 配置初始化向导
node translation-plugin/translate.js config init

# 验证配置
node translation-plugin/translate.js config validate

# 列出所有 AI Providers
node translation-plugin/translate.js config providers
```

**示例**:

```bash
# 显示配置（表格格式）
npm run translate -- config show

# 显示配置（JSON 格式）
npm run translate -- config show --json

# 运行配置向导
npm run translate -- config init

# 验证配置是否正确
npm run translate -- config validate

# 查看可用的 AI Providers
npm run translate -- config providers
```

### 状态命令 (status)

```bash
# 查看翻译状态
node translation-plugin/translate.js status

# 详细模式（显示需要更新的文件）
node translation-plugin/translate.js status --verbose
```

**示例**:

```bash
# 查看各语言翻译进度
npm run translate -- status

# 查看详细状态（包含需要更新的文件列表）
npm run translate -- status --verbose

# JSON 格式输出状态
npm run translate -- status --json
```

### npm scripts 快捷命令

项目已配置以下 npm scripts:

```bash
# 翻译命令
npm run translate                  # 翻译所有文档
npm run translate:en              # 翻译到英语
npm run translate:ja              # 翻译到日语
npm run translate:check           # 预览模式
npm run translate:incremental     # 增量翻译
npm run translate:file            # 翻译指定文件
npm run translate:en:file         # 翻译指定文件到英语
npm run translate:ja:file         # 翻译指定文件到日语
```

## 多 AI Provider 支持

插件现在支持多个 AI 提供商配置，通过环境变量轻松切换：

### 支持的 AI Providers

- **deepseek**: DeepSeek API (默认)
- **openai**: OpenAI GPT-4
- **claude**: Anthropic Claude 3 Haiku
- **gemini**: Google Gemini Pro

### 配置结构

```json
{
  "defaultProvider": "deepseek",
  "aiProviders": {
    "deepseek": {
      "service": "deepseek",
      "model": "deepseek-chat",
      "maxTokens": 8192,
      "temperature": 0.1,
      "baseURL": "https://api.deepseek.com"
    },
    "openai": {
      "service": "openai",
      "model": "gpt-4",
      "maxTokens": 4096,
      "temperature": 0.1,
      "baseURL": "https://api.openai.com/v1"
    },
    "claude": {
      "service": "anthropic",
      "model": "claude-3-haiku-20240307",
      "maxTokens": 4096,
      "temperature": 0.1,
      "baseURL": "https://api.anthropic.com"
    },
    "gemini": {
      "service": "google",
      "model": "gemini-pro",
      "maxTokens": 4096,
      "temperature": 0.1,
      "baseURL": "https://generativelanguage.googleapis.com/v1beta"
    }
  }
}
```

### 优势

1. **灵活切换**: 通过环境变量快速切换 AI 提供商
2. **安全性**: API 密钥通过环境变量管理，不会提交到代码库
3. **扩展性**: 轻松添加新的 AI 提供商
4. **向后兼容**: 支持旧版配置格式
5. **统一接口**: 使用 llm.js 提供统一的 API 接口

## 使用方法

### 基本命令

```bash
# 翻译所有文档到所有配置的语言
npm run translate

# 翻译到指定语言
npm run translate:en
npm run translate:ja

# 翻译指定文件到所有配置的语言
npm run translate:file introduce.mdx

# 翻译指定文件到指定语言
npm run translate:en:file introduce.mdx
npm run translate:ja:file introduce.mdx

# 预览模式（不实际写入文件）
npm run translate:check

# 增量翻译（仅翻译修改过的文件）
npm run translate:incremental
```

### 高级用法

```bash
# 翻译指定文件到指定语言
node translation-plugin/translate.js --file introduce.mdx --lang en

# 翻译指定文件到所有配置的语言
node translation-plugin/translate.js --file getting-started/install.mdx

# 使用自定义配置文件
node translation-plugin/translate.js --config ./custom-config.json

# 组合使用：翻译指定文件到指定语言（预览模式）
node translation-plugin/translate.js --file introduce.mdx --lang ja --dry-run

# 组合使用：增量翻译到指定语言
node translation-plugin/translate.js --lang ja --incremental --dry-run
```

## 配置选项详解

### 目标语言 (targetLanguages)

支持的语言代码：
- `en`: English
- `ja`: Japanese (日本語)
- `ko`: Korean (한국어)
- `fr`: French (Français)
- `de`: German (Deutsch)
- `es`: Spanish (Español)
- `pt`: Portuguese (Português)
- `ru`: Russian (Русский)

### Frontmatter 键 (frontmatterKeys)

指定需要翻译的 frontmatter 字段：
```json
{
  "frontmatterKeys": ["title", "description", "tagline"]
}
```

### 文件和目录排除配置

#### 排除文件 (excludeFiles)

指定不需要翻译的文件：
```json
{
  "excludeFiles": [
    "404.md",           // 排除所有目录下的 404.md 文件
    "index.mdx",        // 排除所有目录下的 index.mdx 文件
    "getting-started/index.mdx"  // 仅排除 getting-started 目录下的 index.mdx
  ]
}
```

**配置说明：**
- **文件名匹配**：如果配置项只包含文件名（如 `"index.mdx"`），会排除所有目录下的同名文件
- **相对路径匹配**：如果配置项包含路径分隔符（如 `"getting-started/index.mdx"`），会进行精确的相对路径匹配
- 相对路径基于 `sourceDir` 配置的源目录

#### 排除目录 (excludeDirs)

指定不需要翻译的目录：
```json
{
  "excludeDirs": [
    "en",              // 排除英文翻译目录
    "ja",              // 排除日文翻译目录
    "temp",            // 排除临时目录
    "drafts"           // 排除草稿目录
  ]
}
```

**配置说明：**
- 排除的目录及其所有子目录和文件都不会被翻译
- 通常用于排除已翻译的目标语言目录，避免重复翻译

### 添加新的 Provider

在 `config.json` 的 `aiProviders` 对象中添加新配置：

```json
{
  "aiProviders": {
    "your_provider": {
      "service": "service_name",
      "model": "model_name",
      "maxTokens": 4096,
      "temperature": 0.1,
      "baseURL": "https://api.example.com"
    }
  }
}
```

### 缓存配置 (cache)

```json
{
  "cache": {
    "enabled": true,
    "cacheDir": "translation-plugin/cache"
  }
}
```

### 并行处理配置 (parallel)

```json
{
  "parallel": {
    "enabled": true,
    "maxConcurrency": 3,
    "segmentParallel": false
  }
}
```

**配置说明：**
- `enabled`: 是否启用并行处理（文件级别）
- `maxConcurrency`: 最大并发数，建议 2-5
- `segmentParallel`: 是否对同一文档的段落使用并行翻译
  - `true`: 段落并行翻译，速度更快但可能影响上下文连贯性
  - `false`: 段落顺序翻译，保持上下文连贯性（推荐）

### 分段配置 (segmentation)

```json
{
  "segmentation": {
    "maxLength": 8000,
    "enabled": true,
    "maxHeadingLevel": 3
  }
}
```

**配置说明：**
- `maxLength`: 单段最大长度，超过此长度会触发分段翻译
- `enabled`: 是否启用智能分段翻译
- `maxHeadingLevel`: 分段的最大标题级别
  - `1`: 只按 H1 (`#`) 分段
  - `2`: 按 H1-H2 (`#`, `##`) 分段
  - `3`: 按 H1-H3 (`#`, `##`, `###`) 分段（推荐）
  - `4-6`: 按更细粒度分段（可能导致段落过多）

### 重试配置 (retryConfig)

```json
{
  "retryConfig": {
    "maxRetries": 3,
    "retryDelay": 1000
  }
}
```

## 翻译规则

插件会自动遵循以下翻译规则：

### ✅ 会翻译的内容

- 指定的 frontmatter 字段（如 title、description）
- 正文内容
- 标题和段落
- 列表项
- 表格内容

### ❌ 不会翻译的内容

- 代码块（```包围的内容）
- 行内代码（`包围的内容）
- MDX 导入语句
- MDX 组件调用
- URL 链接
- 技术专有名词（MyBatis-Plus、Spring Boot 等）

### 质量保证

- 自动验证翻译结果格式
- 检查代码块、链接数量一致性
- 保持文档结构完整

## 📁 输出结构

翻译后的文件将按以下结构组织：

```
src/content/docs/
├── getting-started/
│   └── introduction.md          # 原始中文文档
├── en/                          # 英文翻译
│   └── getting-started/
│       └── introduction.md
└── ja/                          # 日文翻译
    └── getting-started/
        └── introduction.md
```

## 📊 监控翻译进度

运行翻译时，你会看到详细的进度信息：

```
🌍 开始翻译文档...
📁 扫描文件: src/content/docs
🎯 目标语言: en, ja
📄 找到 15 个文件需要翻译

[1/15] 翻译: getting-started/introduction.md → en ✅
[2/15] 翻译: getting-started/introduction.md → ja ✅
...

🎉 翻译完成！
📊 统计信息:
   - 总文件数: 15
   - 成功翻译: 30 (15 × 2 语言)
   - 失败: 0
   - 耗时: 2分30秒
```

## 📁 项目结构

```
translation-plugin/
├── src/
│   ├── core/                      # 核心业务逻辑（v2.0 重构）
│   │   ├── config.js              # 配置管理
│   │   ├── file-processor.js      # 文件处理器
│   │   ├── translator.js          # 核心翻译器
│   │   └── prompt-template.js     # Prompt 模板
│   └── cli/                       # CLI 层（v2.0 新增）
│       ├── commands/              # 命令处理器
│       │   ├── translate.js       # 翻译命令
│       │   ├── config.js          # 配置命令
│       │   └── status.js          # 状态命令
│       ├── logger.js              # 日志系统
│       ├── ui.js                  # UI 组件
│       └── prompts.js             # 交互式提示
├── test/                          # 测试文件
│   └── test-translation.js
├── cache/                         # 翻译缓存（自动生成）
├── translate.js                   # CLI 入口
├── config.json                    # 配置文件
├── README.md                      # 说明文档
└── MIGRATION.md                   # 迁移指南
```

### 架构说明

**分层设计** (v2.0 重构):

采用清晰的分层架构，将核心业务逻辑与 CLI 表现层分离：

**core/** - 核心业务逻辑层
- 独立于 CLI，可在其他项目中复用
- 包含：配置管理、文件处理、翻译逻辑、Prompt 生成
- 无外部 UI 依赖，纯业务逻辑

**cli/** - 命令行界面层
- 依赖 core 层提供的业务能力
- 包含：命令处理、日志系统、UI 组件、交互提示
- 负责用户交互和结果展示

**优势**：
- ✅ 职责清晰：业务逻辑与展现分离
- ✅ 易于维护：模块边界明确
- ✅ 可复用性强：core 层可独立使用
- ✅ 易于测试：各层可单独测试
- ✅ 扩展性好：添加新功能更简单

## 🎨 UI 特性

### 欢迎界面

运行翻译工具时会显示美观的欢迎界面：

```
╭────────────────────────────────────────╮
│                                        │
│   MyBatis-Plus 文档翻译工具            │
│                                        │
│   版本: 2.0.0                          │
│   作者: MyBatis-Plus Team              │
│                                        │
╰────────────────────────────────────────╯
```

### 实时任务进度

使用 listr2 显示实时任务进度：

```
✔ introduce.mdx → EN [completed]
⠹ getting-started/install.mdx → EN [running]
◻ getting-started/install.mdx → JA [pending]
```

### 统计表格

完成后显示详细的统计表格：

```
┌───────────┬─────────┐
│ 统计项    │ 数值    │
├───────────┼─────────┤
│ 总任务数  │ 30      │
│ 成功      │ 28      │
│ 失败      │ 2       │
│ 总耗时    │ 125.6秒 │
└───────────┴─────────┘
```

## 故障排除

### 常见问题

1. **API Key 错误**
   ```
   错误: 401 Unauthorized
   解决: 检查 .env 文件中的 API_KEY 是否正确
   ```

2. **文件权限错误**
   ```
   错误: 文件写入失败
   解决: 检查目标目录的写入权限
   ```

3. **网络连接问题**
   ```
   错误: AI 调用失败
   解决: 检查网络连接，或配置代理
   ```

4. **Provider 配置错误**
   ```
   错误: AI Provider 'xxx' 配置未找到
   解决: 检查 AI_PROVIDER 环境变量和 config.json 中的 aiProviders 配置
   ```

### 调试模式

使用 `--dry-run` 参数进行预览：

```bash
npm run translate:check
```

这会显示将要翻译的文件列表，但不会实际执行翻译。

设置环境变量启用详细日志：

```bash
DEBUG=true VERBOSE=true npm run translate
```

## 注意事项

- `API_KEY` 环境变量是必需的，确保为选择的 Provider 设置正确的密钥
- 不同 Provider 的 API 密钥格式可能不同，请参考对应服务的文档
- 某些 Provider 可能需要额外的配置（如区域、版本等），可在配置中添加相应参数

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 许可证

本项目采用 MIT 许可证。

## 📝 更新日志

### v2.0.0 (2025-01-XX)

**重大更新 - CLI 重构**

- 🎨 **全新 CLI 界面**: 引入专业 CLI 库 (listr2, inquirer, boxen, cli-table3)
- 📊 **实时进度展示**: 使用 listr2 提供任务列表和实时状态更新
- 🖥️ **交互式操作**: 配置向导、确认提示、错误处理交互
- 🔧 **子命令支持**: `translate`, `config`, `status` 独立命令
- 📝 **日志系统**: 多级别日志 (ERROR, WARN, INFO, DEBUG, VERBOSE) 和日志文件支持
- ⚙️ **全局选项**: `--quiet`, `--verbose`, `--debug`, `--json`, `--no-color`, `--log-file`
- 📋 **美化输出**: 表格、进度条、彩色输出、信息框
- 🛠️ **增强功能**:
  - 翻译前确认提示
  - 错误后继续/重试选项
  - JSON 格式输出支持
  - 翻译状态查询
  - 配置验证和管理

**新增依赖**:
- `inquirer@^9.0.0` - 交互式提示
- `ora@^8.0.0` - Spinner 动画
- `cli-progress@^3.12.0` - 进度条
- `listr2@^8.0.0` - 任务列表
- `boxen@^7.1.0` - 信息框
- `cli-table3@^0.6.0` - 表格

### v1.1.0 (2024-XX-XX)
- ✨ 新增多 AI Provider 支持
- ✨ 支持通过环境变量切换 Provider
- ✨ 改进配置验证和错误提示
- ✨ 统一 README 文档

### v1.0.0 (2024-XX-XX)
- 初始版本发布
- 支持 LLM API
- 基础翻译功能
- 缓存和增量翻译
- 并行处理支持

## 🔄 从 v1.x 迁移到 v2.0

v2.0 完全向后兼容，无需修改配置文件或使用方式。主要变化：

1. **命令行参数**: 新增全局选项和更多翻译选项
2. **输出格式**: 更美观的界面，支持 `--json` 格式输出
3. **新增命令**: `config` 和 `status` 子命令
4. **交互式操作**: 默认会显示确认提示，使用 `-y` 跳过

**推荐更新**:

```bash
# 重新安装依赖
npm install

# 查看新功能
node translation-plugin/translate.js --help
node translation-plugin/translate.js config --help
node translation-plugin/translate.js status --help
```