# 迁移指南：从 v1.x 到 v2.0

## 概述

translation-plugin v2.0 进行了全面重构，引入了专业的 CLI 库来提供更好的用户体验。本指南将帮助你从 v1.x 平滑迁移到 v2.0。

## 主要变化

### ✅ 完全向后兼容

好消息是，v2.0 **完全向后兼容** v1.x。你无需修改任何配置文件或脚本，所有现有的命令和选项都可以继续使用。

### 🆕 新增功能

1. **更美观的 UI**
   - 使用 boxen 显示欢迎界面和信息框
   - 使用 cli-table3 显示统计表格
   - 使用 listr2 显示实时任务进度

2. **新的子命令**
   - `config show` - 查看配置
   - `config init` - 配置向导
   - `config validate` - 验证配置
   - `config providers` - 查看 AI Providers
   - `status` - 查看翻译状态

3. **新的全局选项**
   - `--quiet` - 静默模式
   - `--verbose` - 详细模式
   - `--debug` - 调试模式
   - `--json` - JSON 格式输出
   - `--no-color` - 禁用颜色
   - `--log-file` - 日志文件

4. **新的翻译选项**
   - `--yes` - 跳过确认提示
   - `--continue-on-error` - 遇到错误继续
   - `--retry` - 重试次数

## 迁移步骤

### 1. 重新安装依赖

```bash
# 在项目根目录运行
npm install
```

这会安装新的 CLI 依赖：
- inquirer
- ora
- cli-progress
- listr2
- boxen
- cli-table3

### 2. 测试基本功能

```bash
# 查看帮助信息
node translation-plugin/translate.js --help

# 查看当前配置
node translation-plugin/translate.js config show

# 查看翻译状态
node translation-plugin/translate.js status
```

### 3. 更新你的脚本（可选）

如果你在 CI/CD 或自动化脚本中使用翻译工具，建议添加以下选项：

#### 用于 CI/CD 的推荐配置

```bash
# 静默模式 + 跳过确认 + JSON 输出
node translation-plugin/translate.js \
  --quiet \
  --yes \
  --json \
  --continue-on-error \
  > translation-result.json
```

#### 用于调试的推荐配置

```bash
# 详细模式 + 日志文件
node translation-plugin/translate.js \
  --verbose \
  --log-file ./logs/translation.log
```

## 行为变化

### 默认会显示确认提示

v2.0 默认会在翻译前显示摘要并要求确认：

```bash
📋 翻译摘要

  📄 文件数: 10
  🌍 语言: en, ja
  🤖 Provider: deepseek
  📝 模式: 全量
  ⚡ 并行: 是 (最大 30 并发)

确认开始翻译? (Y/n)
```

如果不想要确认提示，使用 `--yes` 或 `-y` 选项：

```bash
npm run translate -- --yes
```

### 更丰富的输出信息

v2.0 会显示：
- 欢迎界面
- 实时任务进度（使用 listr2）
- 彩色的状态图标
- 统计表格

如果想要简洁的输出，使用 `--quiet` 选项：

```bash
npm run translate -- --quiet
```

## 配置文件

配置文件 (`config.json`) 格式完全兼容，无需修改。

如果想要重新生成配置，可以使用配置向导：

```bash
node translation-plugin/translate.js config init
```

## npm scripts

现有的 npm scripts 保持不变：

```bash
npm run translate              # 仍然有效
npm run translate:en          # 仍然有效
npm run translate:incremental # 仍然有效
npm run translate:check       # 仍然有效
```

你可以向这些命令传递新的选项：

```bash
npm run translate -- --yes
npm run translate:en -- --verbose
npm run translate:check -- --json
```

## 常见问题

### Q: 我需要修改配置文件吗？

A: 不需要。配置文件格式完全兼容。

### Q: 现有的 npm scripts 还能用吗？

A: 可以。所有现有命令都保持兼容。

### Q: 如何禁用新的交互式提示？

A: 使用 `--yes` 选项跳过确认提示。

### Q: 如何获得和 v1.x 类似的简洁输出？

A: 使用 `--quiet` 选项。

### Q: 我在 CI/CD 中使用，应该用什么选项？

A: 推荐使用 `--quiet --yes --json --continue-on-error`。

### Q: 如何查看更详细的日志？

A: 使用 `--verbose` 或 `--debug` 选项，配合 `--log-file` 保存日志。

### Q: listr2 的进度显示在我的终端中显示异常

A: 尝试使用 `--quiet` 或 `--json` 选项切换到简单输出模式。

## 新功能示例

### 配置管理

```bash
# 查看配置
npm run translate -- config show

# 配置向导
npm run translate -- config init

# 验证配置
npm run translate -- config validate

# 查看 AI Providers
npm run translate -- config providers
```

### 状态查询

```bash
# 查看翻译进度
npm run translate -- status

# 查看详细状态（包含需要更新的文件）
npm run translate -- status --verbose

# JSON 格式输出
npm run translate -- status --json
```

### 错误处理

```bash
# 遇到错误继续执行
npm run translate -- --continue-on-error

# 失败时重试 3 次
npm run translate -- --retry 3
```

### 日志和调试

```bash
# 详细模式
npm run translate -- --verbose

# 调试模式
npm run translate -- --debug

# 保存日志到文件
npm run translate -- --log-file ./logs/translation.log
```

## 获取帮助

如果遇到问题：

1. 查看帮助信息：`node translation-plugin/translate.js --help`
2. 阅读 README.md 了解详细文档
3. 在 GitHub Issues 报告问题

## 总结

v2.0 是一个重大升级，但迁移过程非常简单：

1. ✅ 运行 `npm install`
2. ✅ 测试基本功能
3. ✅ 享受新的 UI 和功能

所有现有的命令和配置都继续有效，你可以按照自己的节奏逐步采用新功能。