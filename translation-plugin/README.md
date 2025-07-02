# MyBatis-Plus 文档翻译插件

这是一个专为 MyBatis-Plus 文档项目设计的自动翻译插件，基于 AI 技术实现高质量的技术文档翻译。

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

## 安装依赖

```bash
npm install
```

## 配置

### 1. 基础配置

编辑 `translation-plugin/config.json` 文件：

```json
{
  "targetLanguages": ["en", "ja"],
  "frontmatterKeys": ["title", "description", "tagline"],
  "aiProvider": {
    "type": "openai",
    "apiKey": "your-api-key",
    "model": "gpt-4"
  }
}
```

### 2. 环境变量

你也可以通过环境变量设置 API Key：

```bash
# 统一的 API 密钥环境变量（适用于所有 AI 服务）
export API_KEY="your-api-key"
```

**注意：** 
- 环境变量的优先级低于配置文件中的 `apiKey` 设置
- 所有 AI 服务统一使用 `API_KEY` 环境变量，具体服务类型通过配置文件中的 `service` 字段指定

## 使用方法

### 基本命令

```bash
# 翻译所有文档到所有配置的语言
npm run translate

# 翻译到指定语言
npm run translate:en
npm run translate:ja

# 预览模式（不实际写入文件）
npm run translate:check

# 增量翻译（仅翻译修改过的文件）
npm run translate:incremental
```

### 高级用法

```bash
# 翻译指定文件
node scripts/translate.js --file introduce.mdx --lang en

# 使用自定义配置文件
node scripts/translate.js --config ./custom-config.json

# 组合使用
node scripts/translate.js --lang ja --incremental --dry-run
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

### AI 提供商配置 (aiProvider)

基于 [llm.js](https://llmjs.themaximalist.com/) 支持多种 AI 提供商：

#### OpenAI
```json
{
  "aiProvider": {
    "service": "openai",
    "apiKey": "your-api-key",
    "model": "gpt-4",
    "maxTokens": 4000,
    "temperature": 0.1
  }
}
```

#### Anthropic Claude
```json
{
  "aiProvider": {
    "service": "anthropic",
    "apiKey": "your-api-key",
    "model": "claude-3-sonnet-20240229",
    "maxTokens": 4000,
    "temperature": 0.1
  }
}
```

#### Google Gemini
```json
{
  "aiProvider": {
    "service": "google",
    "apiKey": "your-api-key",
    "model": "gemini-pro",
    "maxTokens": 4000,
    "temperature": 0.1
  }
}
```

#### Groq (高速推理)
```json
{
  "aiProvider": {
    "service": "groq",
    "apiKey": "your-api-key",
    "model": "llama2-70b-4096",
    "maxTokens": 4000,
    "temperature": 0.1
  }
}
```

#### 本地模型 (Ollama)
```json
{
  "aiProvider": {
    "service": "ollama",
    "model": "llama2",
    "baseURL": "http://localhost:11434",
    "maxTokens": 4000,
    "temperature": 0.1
  }
}
```

#### xAI Grok
```json
{
  "aiProvider": {
    "service": "xai",
    "apiKey": "your-api-key",
    "model": "grok-beta",
    "maxTokens": 4000,
    "temperature": 0.1
  }
}
```

#### DeepSeek
```json
{
  "aiProvider": {
    "service": "deepseek",
    "apiKey": "your-api-key",
    "model": "deepseek-chat",
    "maxTokens": 4000,
    "temperature": 0.1
  }
}
```

#### OpenRouter (推荐)
```json
{
  "aiProvider": {
    "service": "openrouter",
    "apiKey": "your-openrouter-api-key",
    "model": "anthropic/claude-3.5-sonnet",
    "baseURL": "https://openrouter.ai/api/v1",
    "maxTokens": 8000,
    "temperature": 0.1
  }
}
```

**OpenRouter 热门模型推荐：**
- `anthropic/claude-3.5-sonnet` - 最佳质量，适合技术文档
- `openai/gpt-4o` - OpenAI 最新模型
- `meta-llama/llama-3.1-70b-instruct` - 开源高质量模型
- `google/gemini-pro` - Google 模型
- `anthropic/claude-3-haiku` - 快速且经济的选择

**OpenRouter 优势：**
- 🌟 统一接口访问多种顶级模型
- 💰 透明的按使用量计费
- 🚀 无需管理多个 API 密钥
- 📊 详细的使用统计和成本跟踪
- 🔄 模型间轻松切换

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

1. **保持不变的内容**：
   - 代码块（```包围的内容）
   - 行内代码（`包围的内容）
   - MDX 导入语句
   - MDX 组件调用
   - URL 链接
   - 技术专有名词（MyBatis-Plus、Spring Boot 等）

2. **翻译的内容**：
   - 指定的 frontmatter 字段
   - 正文文本内容
   - 保持 Markdown 格式

3. **质量保证**：
   - 自动验证翻译结果格式
   - 检查代码块、链接数量一致性
   - 保持文档结构完整

## 目录结构

```
translation-plugin/
├── src/
│   ├── config.js          # 配置管理
│   ├── file-processor.js  # 文件处理器
│   ├── prompt-template.js # Prompt 模板
│   └── translator.js      # 核心翻译器
├── cache/                 # 翻译缓存（自动生成）
├── config.json           # 配置文件
└── README.md             # 说明文档
```

## 故障排除

### 常见问题

1. **API Key 错误**
   ```
   错误: OpenAI API Key 未配置
   ```
   解决：设置环境变量或在配置文件中添加 API Key

2. **文件权限错误**
   ```
   错误: 文件写入失败
   ```
   解决：检查目标目录的写入权限

3. **网络连接问题**
   ```
   错误: AI 调用失败
   ```
   解决：检查网络连接，或配置代理

### 调试模式

使用 `--dry-run` 参数进行预览：

```bash
npm run translate:check
```

这会显示将要翻译的文件列表，但不会实际执行翻译。

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 许可证

本项目采用 MIT 许可证。

## 更新日志

### v1.0.0
- 初始版本发布
- 支持 LLM API
- 基础翻译功能
- 缓存和增量翻译
- 并行处理支持