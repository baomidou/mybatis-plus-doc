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

## 更新日志

### v1.1.0
- ✨ 新增多 AI Provider 支持
- ✨ 支持通过环境变量切换 Provider
- ✨ 改进配置验证和错误提示
- ✨ 统一 README 文档

### v1.0.0
- 初始版本发布
- 支持 LLM API
- 基础翻译功能
- 缓存和增量翻译
- 并行处理支持