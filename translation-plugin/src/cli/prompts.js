import inquirer from 'inquirer';
import chalk from 'chalk';

/**
 * 交互式提示工具类
 */
export class Prompts {
  /**
   * 确认提示
   */
  async confirm(message, defaultValue = true) {
    const { confirmed } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmed',
        message,
        default: defaultValue
      }
    ]);

    return confirmed;
  }

  /**
   * 输入提示
   */
  async input(message, options = {}) {
    const { value } = await inquirer.prompt([
      {
        type: 'input',
        name: 'value',
        message,
        ...options
      }
    ]);

    return value;
  }

  /**
   * 单选列表
   */
  async select(message, choices, options = {}) {
    const { selected } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selected',
        message,
        choices,
        ...options
      }
    ]);

    return selected;
  }

  /**
   * 多选列表
   */
  async multiSelect(message, choices, options = {}) {
    const { selected } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selected',
        message,
        choices,
        ...options
      }
    ]);

    return selected;
  }

  /**
   * 密码输入
   */
  async password(message, options = {}) {
    const { value } = await inquirer.prompt([
      {
        type: 'password',
        name: 'value',
        message,
        mask: '*',
        ...options
      }
    ]);

    return value;
  }

  /**
   * 选择 AI Provider
   */
  async selectProvider(providers, currentProvider) {
    const choices = Object.entries(providers).map(([name, config]) => ({
      name: `${name} (${config.service} - ${config.model})${name === currentProvider ? chalk.green(' ✓ 当前') : ''}`,
      value: name,
      short: name
    }));

    return await this.select('选择 AI Provider:', choices);
  }

  /**
   * 选择目标语言
   */
  async selectLanguages(availableLanguages, selectedLanguages = []) {
    const languageNames = {
      en: 'English (英语)',
      ja: 'Japanese (日语)',
      ko: 'Korean (韩语)',
      fr: 'French (法语)',
      de: 'German (德语)',
      es: 'Spanish (西班牙语)',
      pt: 'Portuguese (葡萄牙语)',
      ru: 'Russian (俄语)'
    };

    const choices = availableLanguages.map(lang => ({
      name: languageNames[lang] || lang,
      value: lang,
      checked: selectedLanguages.includes(lang)
    }));

    return await this.multiSelect(
      '选择目标语言 (空格选择, 回车确认):',
      choices,
      {
        validate: (answer) => {
          if (answer.length < 1) {
            return '至少选择一种语言';
          }
          return true;
        }
      }
    );
  }

  /**
   * 选择翻译模式
   */
  async selectTranslationMode() {
    const choices = [
      {
        name: '全量翻译 - 翻译所有文档',
        value: 'full',
        short: '全量'
      },
      {
        name: '增量翻译 - 仅翻译修改过的文档',
        value: 'incremental',
        short: '增量'
      },
      {
        name: '指定文件 - 翻译特定文件',
        value: 'specific',
        short: '指定'
      }
    ];

    return await this.select('选择翻译模式:', choices);
  }

  /**
   * 输入 API Key
   */
  async inputApiKey(providerName) {
    return await this.password(`请输入 ${providerName} 的 API Key:`, {
      validate: (value) => {
        if (!value || value.trim() === '') {
          return 'API Key 不能为空';
        }
        return true;
      }
    });
  }

  /**
   * 配置初始化向导
   */
  async configWizard(defaultConfig) {
    console.log(chalk.cyan('\n📋 配置向导\n'));

    const answers = {};

    // 选择目标语言
    answers.targetLanguages = await this.selectLanguages(
      ['en', 'ja', 'ko', 'fr', 'de', 'es', 'pt', 'ru'],
      defaultConfig.targetLanguages || ['en', 'ja']
    );

    // 选择 AI Provider
    const providerChoices = Object.keys(defaultConfig.aiProviders || {}).map(name => ({
      name: `${name} (${defaultConfig.aiProviders[name].service})`,
      value: name
    }));

    answers.defaultProvider = await this.select(
      '选择默认 AI Provider:',
      providerChoices
    );

    // 输入 API Key
    const needApiKey = await this.confirm(
      '是否要设置 API Key (也可以稍后通过环境变量设置)?'
    );

    if (needApiKey) {
      answers.apiKey = await this.inputApiKey(answers.defaultProvider);
    }

    // 并行设置
    answers.parallel = await this.confirm('是否启用并行翻译?', true);

    if (answers.parallel) {
      answers.maxConcurrency = parseInt(
        await this.input('最大并发数 (建议 2-30):', {
          default: '30',
          validate: (value) => {
            const num = parseInt(value);
            if (isNaN(num) || num < 1 || num > 100) {
              return '请输入 1-100 之间的数字';
            }
            return true;
          }
        })
      );
    }

    // 缓存设置
    answers.cache = await this.confirm('是否启用翻译缓存?', true);

    return answers;
  }

  /**
   * 翻译前确认
   */
  async confirmTranslation(fileCount, languages) {
    const totalTasks = fileCount * languages.length;
    const message = `
${chalk.cyan('📊 翻译计划')}
  文件数量: ${chalk.white(fileCount)}
  目标语言: ${chalk.white(languages.join(', '))}
  总任务数: ${chalk.white(totalTasks)}

确认开始翻译?
`;

    return await this.confirm(message, true);
  }

  /**
   * 错误处理选择
   */
  async handleError(error, context) {
    console.log(chalk.red(`\n❌ 错误: ${error.message}`));

    if (context) {
      console.log(chalk.gray(`   文件: ${context.file}`));
      console.log(chalk.gray(`   语言: ${context.language}`));
    }

    const choices = [
      { name: '继续处理下一个', value: 'continue', short: '继续' },
      { name: '重试当前任务', value: 'retry', short: '重试' },
      { name: '跳过当前任务', value: 'skip', short: '跳过' },
      { name: '中止所有任务', value: 'abort', short: '中止' }
    ];

    return await this.select('如何处理?', choices);
  }

  /**
   * 选择文件
   */
  async selectFiles(files) {
    const choices = files.map(file => ({
      name: file,
      value: file,
      checked: false
    }));

    return await this.multiSelect(
      '选择要翻译的文件 (空格选择, 回车确认):',
      choices,
      {
        validate: (answer) => {
          if (answer.length < 1) {
            return '至少选择一个文件';
          }
          return true;
        }
      }
    );
  }

  /**
   * 显示翻译摘要并确认
   */
  async showSummaryAndConfirm(summary) {
    console.log(chalk.cyan('\n📋 翻译摘要\n'));

    if (summary.files) {
      console.log(chalk.white(`  📄 文件数: ${summary.files.length}`));
    }

    if (summary.languages) {
      console.log(chalk.white(`  🌍 语言: ${summary.languages.join(', ')}`));
    }

    if (summary.provider) {
      console.log(chalk.white(`  🤖 Provider: ${summary.provider}`));
    }

    if (summary.mode) {
      console.log(chalk.white(`  📝 模式: ${summary.mode}`));
    }

    if (summary.parallel) {
      console.log(chalk.white(`  ⚡ 并行: 是 (最大 ${summary.maxConcurrency} 并发)`));
    } else {
      console.log(chalk.white(`  📝 并行: 否`));
    }

    console.log();

    return await this.confirm('确认开始翻译?', true);
  }
}

/**
 * 创建 Prompts 实例
 */
let defaultPrompts = null;

export function createPrompts() {
  defaultPrompts = new Prompts();
  return defaultPrompts;
}

export function getPrompts() {
  if (!defaultPrompts) {
    defaultPrompts = new Prompts();
  }
  return defaultPrompts;
}

export default Prompts;