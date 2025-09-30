import chalk from 'chalk';
import boxen from 'boxen';
import Table from 'cli-table3';
import ora from 'ora';

/**
 * UI 组件工具类
 */
export class UI {
  constructor(options = {}) {
    this.noColor = options.noColor || false;
  }

  /**
   * 显示欢迎信息
   */
  showWelcome(version = '1.0.0') {
    const welcomeText = `
${chalk.bold.cyan('MyBatis-Plus 文档翻译工具')}

版本: ${chalk.gray(version)}
作者: MyBatis-Plus Team
`;

    console.log(
      boxen(welcomeText, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan',
        align: 'center'
      })
    );
  }

  /**
   * 显示信息框
   */
  showBox(message, options = {}) {
    const { type = 'info', title = null } = options;

    const colors = {
      success: 'green',
      error: 'red',
      warning: 'yellow',
      info: 'blue'
    };

    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    const color = colors[type] || 'blue';
    const icon = icons[type] || 'ℹ️';

    const boxOptions = {
      padding: 1,
      margin: { top: 1, bottom: 1, left: 2, right: 2 },
      borderStyle: 'round',
      borderColor: color,
      ...(title && { title: `${icon} ${title}` })
    };

    console.log(boxen(message, boxOptions));
  }

  /**
   * 显示成功消息框
   */
  showSuccess(message, title = '成功') {
    this.showBox(message, { type: 'success', title });
  }

  /**
   * 显示错误消息框
   */
  showError(message, title = '错误') {
    this.showBox(message, { type: 'error', title });
  }

  /**
   * 显示警告消息框
   */
  showWarning(message, title = '警告') {
    this.showBox(message, { type: 'warning', title });
  }

  /**
   * 显示信息消息框
   */
  showInfo(message, title = '信息') {
    this.showBox(message, { type: 'info', title });
  }

  /**
   * 创建表格
   */
  createTable(headers, options = {}) {
    const defaultOptions = {
      head: headers,
      style: {
        head: ['cyan'],
        border: ['gray']
      },
      ...options
    };

    return new Table(defaultOptions);
  }

  /**
   * 显示统计表格
   */
  showStatsTable(stats) {
    const table = this.createTable(['统计项', '数值']);

    Object.entries(stats).forEach(([key, value]) => {
      table.push([
        chalk.cyan(key),
        typeof value === 'number'
          ? chalk.bold.white(value.toString())
          : chalk.white(value.toString())
      ]);
    });

    console.log(table.toString());
  }

  /**
   * 显示文件列表表格
   */
  showFileListTable(files, languages) {
    const table = this.createTable(['文件', ...languages.map(lang => lang.toUpperCase())]);

    files.forEach(file => {
      const row = [chalk.gray(file)];
      languages.forEach(lang => {
        row.push(chalk.yellow('待翻译'));
      });
      table.push(row);
    });

    console.log(table.toString());
  }

  /**
   * 显示翻译结果表格
   */
  showResultsTable(results) {
    const table = this.createTable(['文件', '语言', '状态', '耗时']);

    results.forEach(result => {
      const statusIcon = result.success ? chalk.green('✓') : chalk.red('✗');
      const statusText = result.success ? '成功' : '失败';
      const duration = result.duration ? `${result.duration}s` : '-';

      table.push([
        chalk.gray(result.file),
        chalk.cyan(result.language.toUpperCase()),
        `${statusIcon} ${statusText}`,
        chalk.white(duration)
      ]);
    });

    console.log(table.toString());
  }

  /**
   * 显示 AI Provider 配置表格
   */
  showProviderTable(providers, currentProvider) {
    const table = this.createTable(['Provider', 'Service', 'Model', '当前']);

    Object.entries(providers).forEach(([name, config]) => {
      const isCurrent = name === currentProvider;
      const marker = isCurrent ? chalk.green('✓') : '';

      table.push([
        isCurrent ? chalk.bold.green(name) : chalk.cyan(name),
        chalk.gray(config.service),
        chalk.gray(config.model),
        marker
      ]);
    });

    console.log(table.toString());
  }

  /**
   * 创建 spinner
   */
  createSpinner(text, options = {}) {
    return ora({
      text,
      color: 'cyan',
      ...options
    });
  }

  /**
   * 显示进度信息
   */
  showProgress(current, total, message) {
    const percentage = Math.round((current / total) * 100);
    const bar = this.createProgressBar(percentage, 30);

    console.log(
      `${chalk.cyan('📊')} [${current}/${total}] ${bar} ${percentage}% ${chalk.gray(message)}`
    );
  }

  /**
   * 创建简单的进度条
   */
  createProgressBar(percentage, width = 30) {
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;

    return (
      chalk.green('█'.repeat(filled)) +
      chalk.gray('░'.repeat(empty))
    );
  }

  /**
   * 显示分隔线
   */
  showDivider(char = '─', width = 80) {
    console.log(chalk.gray(char.repeat(width)));
  }

  /**
   * 显示标题
   */
  showTitle(title, icon = '📋') {
    console.log();
    console.log(chalk.bold.cyan(`${icon} ${title}`));
    this.showDivider('═');
  }

  /**
   * 显示子标题
   */
  showSubtitle(subtitle) {
    console.log();
    console.log(chalk.bold.blue(`▶ ${subtitle}`));
    this.showDivider();
  }

  /**
   * 显示列表
   */
  showList(items, options = {}) {
    const { icon = '•', indent = 2 } = options;
    const prefix = ' '.repeat(indent);

    items.forEach(item => {
      console.log(`${prefix}${chalk.cyan(icon)} ${item}`);
    });
  }

  /**
   * 显示键值对列表
   */
  showKeyValueList(data, options = {}) {
    const { indent = 2 } = options;
    const prefix = ' '.repeat(indent);

    Object.entries(data).forEach(([key, value]) => {
      console.log(
        `${prefix}${chalk.cyan(key)}: ${chalk.white(value)}`
      );
    });
  }

  /**
   * 显示成本信息
   */
  showCostInfo(tokenUsage) {
    const { input_tokens, output_tokens, total_cost } = tokenUsage;

    const costTable = this.createTable(['类型', '数量', '成本']);

    costTable.push(
      ['输入 Token', chalk.white(input_tokens.toLocaleString()), '-'],
      ['输出 Token', chalk.white(output_tokens.toLocaleString()), '-'],
      [
        chalk.bold('总成本'),
        chalk.bold(((input_tokens + output_tokens).toLocaleString())),
        chalk.bold.green(total_cost ? `$${total_cost.toFixed(4)}` : 'N/A')
      ]
    );

    console.log(costTable.toString());
  }

  /**
   * 清屏
   */
  clear() {
    console.clear();
  }

  /**
   * 空行
   */
  newline(count = 1) {
    console.log('\n'.repeat(count - 1));
  }
}

/**
 * 创建 UI 实例
 */
let defaultUI = null;

export function createUI(options) {
  defaultUI = new UI(options);
  return defaultUI;
}

export function getUI() {
  if (!defaultUI) {
    defaultUI = new UI();
  }
  return defaultUI;
}

export default UI;