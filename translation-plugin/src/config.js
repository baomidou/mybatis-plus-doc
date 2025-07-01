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
  if (config.aiProvider) {
    // 兼容旧的 type 字段，自动转换为 service
    if (config.aiProvider.type && !config.aiProvider.service) {
      config.aiProvider.service = config.aiProvider.type;
      delete config.aiProvider.type;
    }
    
    if (!config.aiProvider.service) {
      throw new Error('aiProvider.service 是必需的');
    }
    
    // 从环境变量加载 API 密钥（如果配置中未指定）
    if (!config.aiProvider.apiKey) {
      const service = config.aiProvider.service.toLowerCase();
      const envKeyMap = {
        'openai': 'OPENAI_API_KEY',
        'anthropic': 'ANTHROPIC_API_KEY',
        'google': 'GOOGLE_API_KEY',
        'groq': 'GROQ_API_KEY',
        'xai': 'XAI_API_KEY',
        'deepseek': 'DEEPSEEK_API_KEY'
      };
      
      const envKey = envKeyMap[service];
      if (envKey && process.env[envKey]) {
        config.aiProvider.apiKey = process.env[envKey];
      } else {
        console.warn(`警告: ${service} API Key 未配置，请设置环境变量 ${envKey} 或在配置文件中设置`);
      }
    }
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
    aiProvider: {
      service: 'openai',
      model: 'gpt-4',
      maxTokens: 4000,
      temperature: 0.1
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
  return {
    ...defaultConfig,
    ...userConfig,
    aiProvider: {
      ...defaultConfig.aiProvider,
      ...userConfig.aiProvider
    },
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
}