import fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

/**
 * 加载 .env 文件
 */
function loadEnvFile() {
  try {
    // 查找项目根目录的 .env 文件
    let envPath = '.env';
    const projectRoot = process.cwd();
    
    // 如果当前目录没有 .env，尝试在项目根目录查找
    if (!existsSync(envPath)) {
      envPath = path.join(projectRoot, '.env');
    }
    
    // 如果还是找不到，尝试向上查找
    if (!existsSync(envPath)) {
      const parentDir = path.dirname(projectRoot);
      envPath = path.join(parentDir, '.env');
    }
    
    if (!existsSync(envPath)) {
      console.log('ℹ️ 未找到 .env 文件，将使用系统环境变量');
      return;
    }
    
    const envContent = readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=');
        process.env[key] = value;
      }
    }
    console.log('✅ .env 文件加载成功:', envPath);
  } catch (error) {
    console.log('ℹ️ .env 文件读取失败，将使用系统环境变量:', error.message);
  }
}

/**
 * 加载配置文件
 * @param {string} configPath 配置文件路径
 * @returns {Promise<Object>} 配置对象
 */
export async function loadConfig(configPath) {
  // 首先加载 .env 文件
  loadEnvFile();
  try {
    const configContent = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(configContent);
    
    // 验证必要的配置项
    validateConfig(config);
    
    // 处理 AI Provider 选择
    const selectedProvider = process.env.AI_PROVIDER || config.defaultProvider;
    if (config.aiProviders && selectedProvider) {
      if (!config.aiProviders[selectedProvider]) {
        throw new Error(`指定的 AI 提供商 '${selectedProvider}' 不存在于配置中`);
      }
      // 将选择的 provider 配置复制到 aiProvider（保持向后兼容）
      config.aiProvider = {
        ...config.aiProviders[selectedProvider],
        providerName: selectedProvider
      };
      console.log(`🤖 使用 AI 提供商: ${selectedProvider} (${config.aiProvider.service})`);
    }

    // 处理相对路径
    const projectRoot = process.cwd();
    config.sourceDir = path.resolve(projectRoot, config.sourceDir);

    if (config.cache?.cacheDir) {
      config.cache.cacheDir = path.resolve(projectRoot, config.cache.cacheDir);
    }

    return config;
  } catch (error) {
    throw new Error(`配置文件加载失败: ${error.message}`);
  }
}

/**
 * 验证配置文件的有效性
 * @param {Object} config 配置对象
 */
function validateConfig(config) {
  const requiredFields = ['targetLanguages', 'frontmatterKeys', 'sourceDir'];
  
  for (const field of requiredFields) {
    if (!config[field]) {
      throw new Error(`配置文件缺少必要字段: ${field}`);
    }
  }
  
  if (!Array.isArray(config.targetLanguages) || config.targetLanguages.length === 0) {
    throw new Error('targetLanguages 必须是非空数组');
  }
  
  if (!Array.isArray(config.frontmatterKeys) || config.frontmatterKeys.length === 0) {
    throw new Error('frontmatterKeys 必须是非空数组');
  }
  
  // 验证 AI 提供商配置
  if (config.aiProviders) {
    if (!config.defaultProvider) {
      throw new Error('defaultProvider 是必需的');
    }

    if (!config.aiProviders[config.defaultProvider]) {
      throw new Error(`默认提供商 ${config.defaultProvider} 不存在于 aiProviders 中`);
    }

    // 验证每个 provider 配置
    for (const [providerName, providerConfig] of Object.entries(config.aiProviders)) {
      if (!providerConfig.service) {
        throw new Error(`aiProviders.${providerName}.service 是必需的`);
      }
      if (!providerConfig.model) {
        throw new Error(`aiProviders.${providerName}.model 是必需的`);
      }
    }

    // 校验 API 密钥（环境变量）
    if (!process.env.API_KEY) {
      console.warn('⚠️ 环境变量 API_KEY 未设置，请确保在使用前设置正确的 API 密钥');
    }
  } else if (config.aiProvider) {
    // 兼容旧配置格式
    console.warn('⚠️ 检测到旧版配置格式 aiProvider，建议升级到 aiProviders 格式');
  }
}

/**
 * 获取默认配置
 * @returns {Object} 默认配置对象
 */
export function getDefaultConfig() {
  return {
    targetLanguages: ['en', 'ja'],
    frontmatterKeys: ['title', 'description', 'tagline'],
    sourceDir: 'src/content/docs',
    excludeFiles: ['404.md', 'index.mdx'],
    excludeDirs: ['en', 'ja'],
    defaultProvider: 'openai',
    aiProviders: {
      openai: {
        service: 'openai',
        model: 'gpt-4',
        maxTokens: 4000,
        temperature: 0.1,
        baseURL: 'https://api.openai.com/v1'
      },
      deepseek: {
        service: 'deepseek',
        model: 'deepseek-chat',
        maxTokens: 8192,
        temperature: 0.1,
        baseURL: 'https://api.deepseek.com'
      }
    },
    retryConfig: {
      maxRetries: 3,
      retryDelay: 1000
    },
    cache: {
      enabled: true,
      cacheDir: 'translation-plugin/cache'
    },
    parallel: {
      enabled: true,
      maxConcurrency: 3
    }
  };
}

/**
 * 合并用户配置和默认配置
 * @param {Object} userConfig 用户配置
 * @returns {Object} 合并后的配置
 */
export function mergeConfig(userConfig) {
  const defaultConfig = getDefaultConfig();
  const mergedConfig = {
    ...defaultConfig,
    ...userConfig,
    retryConfig: {
      ...defaultConfig.retryConfig,
      ...userConfig.retryConfig
    },
    cache: {
      ...defaultConfig.cache,
      ...userConfig.cache
    },
    parallel: {
      ...defaultConfig.parallel,
      ...userConfig.parallel
    }
  };

  // 合并 AI providers
  if (userConfig.aiProviders) {
    mergedConfig.aiProviders = {
      ...defaultConfig.aiProviders,
      ...userConfig.aiProviders
    };
  }

  // 兼容旧版 aiProvider 配置
  if (userConfig.aiProvider && !userConfig.aiProviders) {
    mergedConfig.aiProvider = {
      ...defaultConfig.aiProviders[defaultConfig.defaultProvider],
      ...userConfig.aiProvider
    };
  }

  return mergedConfig;
}

/**
 * 获取当前选择的 AI Provider 配置
 * @param {Object} config 完整配置对象
 * @returns {Object} 当前 provider 的配置
 */
export function getCurrentProviderConfig(config) {
  // 如果已经有处理过的 aiProvider，直接返回
  if (config.aiProvider) {
    return config.aiProvider;
  }

  // 从环境变量或默认配置获取 provider
  const selectedProvider = process.env.AI_PROVIDER || config.defaultProvider;

  if (config.aiProviders && config.aiProviders[selectedProvider]) {
    return {
      ...config.aiProviders[selectedProvider],
      providerName: selectedProvider
    };
  }

  throw new Error(`AI Provider '${selectedProvider}' 配置未找到`);
}

/**
 * 列出所有可用的 AI Provider
 * @param {Object} config 配置对象
 * @returns {Array} provider 名称列表
 */
export function listAvailableProviders(config) {
  return config.aiProviders ? Object.keys(config.aiProviders) : [];
}