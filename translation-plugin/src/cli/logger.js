import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

/**
 * 日志级别
 */
export const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
  VERBOSE: 4
};

/**
 * 日志系统
 */
export class Logger {
  constructor(options = {}) {
    this.level = options.level || LOG_LEVELS.INFO;
    this.quiet = options.quiet || false;
    this.json = options.json || false;
    this.logFile = options.logFile || null;
    this.noColor = options.noColor || false;
  }

  /**
   * 设置日志级别
   */
  setLevel(level) {
    this.level = level;
  }

  /**
   * 格式化时间戳
   */
  getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * 写入日志文件
   */
  async writeToFile(message) {
    if (!this.logFile) return;

    try {
      const logDir = path.dirname(this.logFile);
      await fs.mkdir(logDir, { recursive: true });
      await fs.appendFile(
        this.logFile,
        `[${this.getTimestamp()}] ${message}\n`,
        'utf-8'
      );
    } catch (error) {
      // 静默失败,不影响主流程
    }
  }

  /**
   * 输出日志
   */
  log(level, message, data = null) {
    if (this.quiet && level !== LOG_LEVELS.ERROR) return;
    if (level > this.level) return;

    const timestamp = this.getTimestamp();

    // JSON 格式输出
    if (this.json) {
      const logData = {
        timestamp,
        level: Object.keys(LOG_LEVELS)[level],
        message,
        ...(data && { data })
      };
      console.log(JSON.stringify(logData));
      this.writeToFile(JSON.stringify(logData));
      return;
    }

    // 写入日志文件（纯文本）
    this.writeToFile(`[${Object.keys(LOG_LEVELS)[level]}] ${message}`);

    // 控制台输出（带颜色）
    if (!this.noColor) {
      switch (level) {
        case LOG_LEVELS.ERROR:
          console.error(chalk.red(`❌ ${message}`));
          if (data) console.error(chalk.gray(JSON.stringify(data, null, 2)));
          break;
        case LOG_LEVELS.WARN:
          console.warn(chalk.yellow(`⚠️  ${message}`));
          if (data) console.warn(chalk.gray(JSON.stringify(data, null, 2)));
          break;
        case LOG_LEVELS.INFO:
          console.log(chalk.blue(`ℹ️  ${message}`));
          if (data) console.log(chalk.gray(JSON.stringify(data, null, 2)));
          break;
        case LOG_LEVELS.DEBUG:
          console.log(chalk.cyan(`🔍 ${message}`));
          if (data) console.log(chalk.gray(JSON.stringify(data, null, 2)));
          break;
        case LOG_LEVELS.VERBOSE:
          console.log(chalk.gray(`📝 ${message}`));
          if (data) console.log(chalk.gray(JSON.stringify(data, null, 2)));
          break;
      }
    } else {
      // 无颜色输出
      const prefix = ['ERROR', 'WARN', 'INFO', 'DEBUG', 'VERBOSE'][level];
      console.log(`[${prefix}] ${message}`);
      if (data) console.log(JSON.stringify(data, null, 2));
    }
  }

  /**
   * 错误日志
   */
  error(message, data) {
    this.log(LOG_LEVELS.ERROR, message, data);
  }

  /**
   * 警告日志
   */
  warn(message, data) {
    this.log(LOG_LEVELS.WARN, message, data);
  }

  /**
   * 信息日志
   */
  info(message, data) {
    this.log(LOG_LEVELS.INFO, message, data);
  }

  /**
   * 调试日志
   */
  debug(message, data) {
    this.log(LOG_LEVELS.DEBUG, message, data);
  }

  /**
   * 详细日志
   */
  verbose(message, data) {
    this.log(LOG_LEVELS.VERBOSE, message, data);
  }

  /**
   * 成功消息
   */
  success(message) {
    if (this.quiet) return;
    if (this.json) {
      console.log(JSON.stringify({ status: 'success', message }));
    } else if (!this.noColor) {
      console.log(chalk.green(`✅ ${message}`));
    } else {
      console.log(`[SUCCESS] ${message}`);
    }
    this.writeToFile(`[SUCCESS] ${message}`);
  }

  /**
   * 失败消息
   */
  failure(message) {
    if (this.json) {
      console.log(JSON.stringify({ status: 'failure', message }));
    } else if (!this.noColor) {
      console.log(chalk.red(`❌ ${message}`));
    } else {
      console.log(`[FAILURE] ${message}`);
    }
    this.writeToFile(`[FAILURE] ${message}`);
  }

  /**
   * 进度消息
   */
  progress(current, total, message) {
    if (this.quiet || this.json) return;

    if (!this.noColor) {
      console.log(chalk.cyan(`📊 [${current}/${total}] ${message}`));
    } else {
      console.log(`[${current}/${total}] ${message}`);
    }
  }

  /**
   * 分隔线
   */
  divider() {
    if (this.quiet || this.json) return;
    console.log(chalk.gray('─'.repeat(80)));
  }

  /**
   * 空行
   */
  newline() {
    if (this.quiet || this.json) return;
    console.log();
  }
}

/**
 * 创建默认 logger 实例
 */
let defaultLogger = null;

export function createLogger(options) {
  defaultLogger = new Logger(options);
  return defaultLogger;
}

export function getLogger() {
  if (!defaultLogger) {
    defaultLogger = new Logger();
  }
  return defaultLogger;
}

export default Logger;