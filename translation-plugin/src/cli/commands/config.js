import fs from 'fs/promises';
import path from 'path';
import { getLogger } from '../logger.js';
import { getUI } from '../ui.js';
import { getPrompts } from '../prompts.js';

/**
 * 配置命令处理器
 */
export async function configCommand(action, options, config) {
  const logger = getLogger();
  const ui = getUI();
  const prompts = getPrompts();

  switch (action) {
    case 'show':
      await showConfig(config, options);
      break;

    case 'init':
      await initConfig(options);
      break;

    case 'validate':
      await validateConfig(config, options);
      break;

    case 'providers':
      await listProviders(config, options);
      break;

    default:
      ui.showError(`未知的配置命令: ${action}`);
      break;
  }
}

/**
 * 显示当前配置
 */
async function showConfig(config, options) {
  const ui = getUI();

  if (options.json) {
    console.log(JSON.stringify(config, null, 2));
    return;
  }

  ui.showTitle('当前配置', '⚙️');

  // 基础配置
  ui.showSubtitle('基础配置');
  ui.showKeyValueList({
    '源目录': config.sourceDir,
    '目标语言': config.targetLanguages.join(', '),
    'Frontmatter 键': config.frontmatterKeys.join(', ')
  });

  // AI Provider 配置
  if (config.aiProviders) {
    ui.newline();
    ui.showSubtitle('AI Provider 配置');
    ui.showProviderTable(config.aiProviders, config.defaultProvider);
  }

  // 并行配置
  ui.newline();
  ui.showSubtitle('并行配置');
  ui.showKeyValueList({
    '启用并行': config.parallel?.enabled ? '是' : '否',
    '最大并发数': config.parallel?.maxConcurrency || 'N/A',
    '段落并行': config.parallel?.segmentParallel ? '是' : '否'
  });

  // 缓存配置
  ui.newline();
  ui.showSubtitle('缓存配置');
  ui.showKeyValueList({
    '启用缓存': config.cache?.enabled ? '是' : '否',
    '缓存目录': config.cache?.cacheDir || 'N/A'
  });

  // 分段配置
  ui.newline();
  ui.showSubtitle('分段配置');
  ui.showKeyValueList({
    '启用分段': config.segmentation?.enabled ? '是' : '否',
    '最大长度': config.segmentation?.maxLength || 'N/A',
    '最大标题级别': config.segmentation?.maxHeadingLevel || 'N/A'
  });
}

/**
 * 初始化配置（向导模式）
 */
async function initConfig(options) {
  const ui = getUI();
  const prompts = getPrompts();
  const logger = getLogger();

  ui.showTitle('配置初始化向导', '🔧');

  try {
    // 加载默认配置
    const configPath = options.config || './translation-plugin/config.json';
    let existingConfig = {};

    try {
      const configContent = await fs.readFile(configPath, 'utf-8');
      existingConfig = JSON.parse(configContent);
      ui.showInfo('已加载现有配置文件');
    } catch {
      ui.showInfo('将创建新的配置文件');
    }

    // 运行配置向导
    const answers = await prompts.configWizard(existingConfig);

    // 合并配置
    const newConfig = {
      ...existingConfig,
      targetLanguages: answers.targetLanguages,
      defaultProvider: answers.defaultProvider,
      parallel: {
        ...existingConfig.parallel,
        enabled: answers.parallel,
        ...(answers.maxConcurrency && { maxConcurrency: answers.maxConcurrency })
      },
      cache: {
        ...existingConfig.cache,
        enabled: answers.cache
      }
    };

    // 保存配置
    const configDir = path.dirname(configPath);
    await fs.mkdir(configDir, { recursive: true });
    await fs.writeFile(configPath, JSON.stringify(newConfig, null, 2), 'utf-8');

    ui.showSuccess(`配置已保存到: ${configPath}`);

    // 如果设置了 API Key，提示设置环境变量
    if (answers.apiKey) {
      ui.showInfo(
        `请将以下内容添加到 .env 文件:\n\nAPI_KEY=${answers.apiKey}\nAI_PROVIDER=${answers.defaultProvider}`,
        'API Key 设置'
      );
    }

    logger.info('配置初始化完成');
  } catch (error) {
    logger.error('配置初始化失败', { message: error.message });
    ui.showError(error.message, '初始化失败');
    throw error;
  }
}

/**
 * 验证配置
 */
async function validateConfig(config, options) {
  const ui = getUI();
  const logger = getLogger();

  ui.showTitle('配置验证', '✓');

  const issues = [];

  // 验证必需字段
  if (!config.targetLanguages || config.targetLanguages.length === 0) {
    issues.push('targetLanguages 未配置或为空');
  }

  if (!config.frontmatterKeys || config.frontmatterKeys.length === 0) {
    issues.push('frontmatterKeys 未配置或为空');
  }

  if (!config.sourceDir) {
    issues.push('sourceDir 未配置');
  }

  // 验证 AI Provider
  if (!config.aiProviders) {
    issues.push('aiProviders 未配置');
  } else {
    if (!config.defaultProvider) {
      issues.push('defaultProvider 未配置');
    } else if (!config.aiProviders[config.defaultProvider]) {
      issues.push(`默认 Provider "${config.defaultProvider}" 不存在`);
    }
  }

  // 验证 API Key
  if (!process.env.API_KEY && !config.aiProvider?.apiKey) {
    issues.push('API_KEY 环境变量未设置');
  }

  // 验证源目录
  try {
    await fs.access(config.sourceDir);
  } catch {
    issues.push(`源目录不存在: ${config.sourceDir}`);
  }

  // 显示结果
  if (issues.length === 0) {
    ui.showSuccess('配置验证通过!');
    logger.info('配置验证通过');
  } else {
    ui.showWarning(`发现 ${issues.length} 个问题:`, '配置问题');
    ui.showList(issues, { icon: '×' });
    logger.warn('配置验证失败', { issues });

    if (!options.json) {
      process.exit(1);
    }
  }

  if (options.json) {
    console.log(JSON.stringify({
      valid: issues.length === 0,
      issues
    }, null, 2));
  }
}

/**
 * 列出可用的 AI Providers
 */
async function listProviders(config, options) {
  const ui = getUI();

  if (options.json) {
    console.log(JSON.stringify({
      defaultProvider: config.defaultProvider,
      providers: config.aiProviders
    }, null, 2));
    return;
  }

  ui.showTitle('可用的 AI Providers', '🤖');

  if (!config.aiProviders) {
    ui.showWarning('没有配置 AI Provider');
    return;
  }

  ui.showProviderTable(config.aiProviders, config.defaultProvider);

  ui.newline();
  ui.showInfo(
    `当前使用: ${config.defaultProvider}\n设置环境变量 AI_PROVIDER 可以切换 Provider`,
    '提示'
  );
}

export default configCommand;