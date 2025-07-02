# 快速开始指南

本指南将帮助你快速设置和使用 MyBatis-Plus 文档翻译插件。

## 🚀 快速设置

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 API 密钥

复制环境变量配置文件：
```bash
cp .env.example .env
```

编辑 `.env` 文件，添加你的 API 密钥：
```bash
# 统一的 API 密钥（适用于所有 AI 服务）
API_KEY=your_api_key_here
```

### 3. 配置翻译选项

编辑 `translation-plugin/config.json`：
```json
{
  "targetLanguages": ["en", "ja"],
  "frontmatterKeys": ["title", "description"],
  "sourceDir": "src/content/docs",
  "aiProvider": {
    "service": "openrouter",
    "model": "anthropic/claude-3.5-sonnet",
    "maxTokens": 4000,
    "temperature": 0.1
  }
}
```

**支持的 AI 服务**：
- `openrouter`: OpenRouter 统一接口（推荐）
- `openai`: OpenAI GPT 模型
- `anthropic`: Anthropic Claude 模型
- `google`: Google Gemini 模型
- `groq`: Groq 高速推理
- `ollama`: 本地 Ollama 模型
- `xai`: xAI Grok 模型
- `deepseek`: DeepSeek 模型

## 📝 基本使用

### 翻译所有文档

```bash
npm run translate
```

### 翻译到特定语言

```bash
# 翻译到英文
npm run translate:en

# 翻译到日文
npm run translate:ja
```

### 翻译特定文件

```bash
node scripts/translate.js --file getting-started/introduction.md --lang en
```

### 增量翻译（只翻译修改过的文件）

```bash
npm run translate:incremental
```

### 预览模式（不实际翻译，只显示会翻译哪些文件）

```bash
npm run translate:check
```

## 🔧 高级用法

### 自定义配置文件

```bash
node scripts/translate.js --config my-config.json --lang en
```

### 并行翻译控制

在配置文件中设置：

```json
{
  "parallel": {
    "enabled": true,
    "maxConcurrency": 3
  }
}
```

### 缓存管理

```bash
# 清理缓存
rm -rf translation-plugin/cache/

# 禁用缓存
# 在配置文件中设置 "cache": { "enabled": false }
```

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

## 🎯 翻译规则

插件会智能处理以下内容：

✅ **会翻译：**
- Frontmatter 中指定的键（如 title、description）
- 正文内容
- 标题和段落
- 列表项
- 表格内容

❌ **不会翻译：**
- 代码块
- 行内代码
- URL 链接
- 文件路径
- 技术专有名词（如 MyBatis-Plus、SQL 等）
- MDX 组件和导入语句

## 🐛 故障排除

### 常见问题

1. **API 密钥错误**
   ```
   错误: 401 Unauthorized
   解决: 检查 .env 文件中的 OPENAI_API_KEY 是否正确
   ```

2. **文件未找到**
   ```
   错误: 指定文件不存在
   解决: 确保文件路径相对于 sourceDir 配置
   ```

3. **翻译质量问题**
   ```
   解决: 调整 temperature 参数（推荐 0.1）或使用更好的模型（gpt-4）
   ```

### 调试模式

设置环境变量启用详细日志：

```bash
DEBUG=true VERBOSE=true npm run translate
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

## 🤝 获取帮助

如果遇到问题，可以：

1. 查看 [完整文档](README.md)
2. 运行测试确保环境正常：`node translation-plugin/test/test-translation.js`
3. 检查配置文件格式是否正确
4. 确认 API 密钥和网络连接

---

现在你已经准备好开始翻译 MyBatis-Plus 文档了！🚀