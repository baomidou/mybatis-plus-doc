#!/usr/bin/env node

import { Command } from 'commander';
import { loadConfig } from './src/core/config.js';
import { createLogger, LOG_LEVELS } from './src/cli/logger.js';
import { createUI } from './src/cli/ui.js';
import { createPrompts } from './src/cli/prompts.js';
import translateCommand from './src/cli/commands/translate.js';
import configCommand from './src/cli/commands/config.js';
import statusCommand from './src/cli/commands/status.js';

const program = new Command();

// 主程序配置
program
  .name('translate')
  .description('MyBatis-Plus 文档翻译工具')
  .version('2.0.0')
  .option('-c, --config <path>', '配置文件路径', './translation-plugin/config.json')
  .option('-q, --quiet', '静默模式，只输出错误信息')
  .option('-v, --verbose', '详细模式，输出调试信息')
  .option('--debug', '调试模式，输出所有日志')
  .option('--json', '以 JSON 格式输出结果')
  .option('--no-color', '禁用颜色输出')
  .option('--log-file <path>', '日志文件路径');

// 翻译命令（默认命令）
program
  .command('translate', { isDefault: true })
  .description('翻译文档')
  .option('-l, --lang <language>', '目标语言 (en, ja, 等)')
  .option('-f, --file <file>', '指定翻译文件（相对于源目录）')
  .option('-i, --incremental', '增量翻译（仅翻译修改过的文件）')
  .option('-d, --dry-run', '预览模式，不实际写入文件')
  .option('-y, --yes', '跳过确认提示')
  .option('--continue-on-error', '遇到错误继续执行')
  .option('--retry <times>', '失败时重试次数', '0')
  .action(async (options) => {
    await runCommand(async (config, globalOptions) => {
      await translateCommand({ ...globalOptions, ...options }, config);
    });
  });

// 配置命令
program
  .command('config <action>')
  .description('管理配置 (show|init|validate|providers)')
  .action(async (action, options) => {
    await runCommand(async (config, globalOptions) => {
      await configCommand(action, { ...globalOptions, ...options }, config);
    });
  });

// 状态命令
program
  .command('status')
  .description('查看翻译状态')
  .action(async (options) => {
    await runCommand(async (config, globalOptions) => {
      await statusCommand({ ...globalOptions, ...options }, config);
    });
  });

/**
 * 运行命令的包装器
 */
async function runCommand(commandHandler) {
  const globalOptions = program.opts();

  // 初始化日志系统
  const logLevel = globalOptions.debug
    ? LOG_LEVELS.VERBOSE
    : globalOptions.verbose
    ? LOG_LEVELS.DEBUG
    : globalOptions.quiet
    ? LOG_LEVELS.ERROR
    : LOG_LEVELS.INFO;

  const logger = createLogger({
    level: logLevel,
    quiet: globalOptions.quiet,
    json: globalOptions.json,
    noColor: !globalOptions.color,
    logFile: globalOptions.logFile
  });

  // 初始化 UI 系统
  const ui = createUI({
    noColor: !globalOptions.color
  });

  // 初始化交互式提示系统
  createPrompts();

  try {
    // 加载配置
    logger.debug(`加载配置文件: ${globalOptions.config}`);
    const config = await loadConfig(globalOptions.config);
    logger.debug('配置加载成功');

    // 执行命令
    await commandHandler(config, globalOptions);

    process.exit(0);
  } catch (error) {
    logger.error('命令执行失败', {
      message: error.message,
      stack: error.stack
    });

    if (!globalOptions.json) {
      ui.showError(
        error.message,
        '执行失败'
      );
    } else {
      console.log(JSON.stringify({
        success: false,
        error: {
          message: error.message,
          stack: error.stack
        }
      }));
    }

    process.exit(1);
  }
}

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason);
  process.exit(1);
});

// 解析命令行参数
program.parse(process.argv);

// 如果没有提供任何参数，显示帮助信息
if (!process.argv.slice(2).length) {
  program.outputHelp();
}