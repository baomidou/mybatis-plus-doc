import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import LLM from '@themaximalist/llm.js';
import { FileProcessor } from './file-processor.js';
import { generateTranslationPrompt, validateTranslationResult } from './prompt-template.js';

export class TranslationPlugin {
  constructor(config) {
    this.config = config;
    this.fileProcessor = new FileProcessor(config);
    this.cache = new Map();
    
    // 初始化缓存目录
    if (config.cache?.enabled) {
      this.initCache();
    }
  }

  /**
   * 初始化缓存
   */
  async initCache() {
    try {
      if (this.config.cache?.cacheDir) {
        await fs.mkdir(this.config.cache.cacheDir, { recursive: true });
      }
    } catch (error) {
      console.warn('缓存目录创建失败:', error.message);
    }
  }

  /**
   * 翻译单个文件
   * @param {string} sourceFilePath 源文件路径
   * @param {string} targetLanguage 目标语言
   */
  async translateFile(sourceFilePath, targetLanguage) {
    try {
      // 解析源文件
      const parsed = await this.fileProcessor.parseFile(sourceFilePath);
      
      // 验证文档格式
      if (!this.fileProcessor.validateDocument(parsed)) {
        throw new Error('文档格式无效或无内容需要翻译');
      }
      
      // 生成缓存键
      const cacheKey = this.generateCacheKey(parsed.originalContent, targetLanguage);
      
      // 检查缓存
      let translatedContent = await this.getFromCache(cacheKey);
      
      if (!translatedContent) {
        // 执行翻译
        translatedContent = await this.translateContent(
          parsed.originalContent,
          targetLanguage
        );
        
        // 验证翻译结果
        const validation = validateTranslationResult(parsed.originalContent, translatedContent);
        if (!validation.valid) {
          console.warn(`翻译结果验证警告: ${validation.issues.join(', ')}`);
        }
        
        // 保存到缓存
        await this.saveToCache(cacheKey, translatedContent);
      }
      
      // 解析翻译后的内容
      const translatedParsed = await this.parseTranslatedContent(translatedContent);
      
      // 生成目标文件路径
      const targetFilePath = this.fileProcessor.getTargetFilePath(sourceFilePath, targetLanguage);
      
      // 写入翻译后的文件
      await this.fileProcessor.writeTranslatedFile(
        targetFilePath,
        translatedParsed.frontmatter,
        translatedParsed.content
      );
      
      // 返回翻译结果
      return {
        sourceFilePath,
        targetFilePath,
        targetLanguage,
        translatedContent,
        frontmatter: translatedParsed.frontmatter,
        content: translatedParsed.content
      };
      
    } catch (error) {
      throw new Error(`翻译文件失败 ${sourceFilePath}: ${error.message}`);
    }
  }

  /**
   * 翻译内容
   * @param {string} content 原始内容
   * @param {string} targetLanguage 目标语言
   * @returns {Promise<string>} 翻译后的内容
   */
  async translateContent(content, targetLanguage) {
    const prompt = generateTranslationPrompt(
      targetLanguage,
      this.config.frontmatterKeys,
      content
    );
    
    return await this.callAI(prompt);
  }

  /**
   * 调用 AI 服务进行翻译
   * @param {string} prompt 翻译提示词
   * @returns {Promise<string>} 翻译结果
   */
  async callAI(prompt) {
    const { type, apiKey, model, baseURL, maxTokens, temperature, service } = this.config.aiProvider;
    
    try {
      // 使用 llm.js 统一接口
      const options = {
        model: model || 'gpt-4',
        max_tokens: maxTokens || 4000,
        temperature: temperature || 0.1,
        extended: true // 获取详细信息包括 token 使用量
      };
      
      // 如果指定了 API 密钥，添加到选项中
      if (apiKey) {
        options.apiKey = apiKey;
      }
      
      // 如果指定了服务类型，添加到选项中
      if (service) {
        options.service = service;
      }
      
      // 如果指定了自定义 baseURL，添加到选项中
      if (baseURL) {
        options.baseUrl = baseURL;
      }
      
      console.log(`🤖 调用 AI 服务: ${service || model || 'default'}`);
      
      const response = await LLM(prompt, options);
      
      // 如果是扩展响应，提取内容和使用信息
      if (response.content) {
        if (response.usage) {
          console.log(`📊 Token 使用: 输入 ${response.usage.input_tokens}, 输出 ${response.usage.output_tokens}, 成本 $${response.usage.total_cost || 'N/A'}`);
        }
        return response.content;
      }
      
      // 如果是简单字符串响应
      return response;
    } catch (error) {
      console.error(`❌ AI 调用失败: ${error.message}`);
      throw error;
    }
  }



  /**
   * 解析翻译后的内容
   * @param {string} translatedContent 翻译后的内容
   * @returns {Object} 解析结果
   */
  async parseTranslatedContent(translatedContent) {
    try {
      // 使用 gray-matter 解析
      const matter = await import('gray-matter');
      const parsed = matter.default(translatedContent);
      
      return {
        frontmatter: parsed.data,
        content: parsed.content
      };
    } catch (error) {
      throw new Error(`翻译内容解析失败: ${error.message}`);
    }
  }

  /**
   * 生成缓存键
   * @param {string} content 内容
   * @param {string} targetLanguage 目标语言
   * @returns {string} 缓存键
   */
  generateCacheKey(content, targetLanguage) {
    const hash = crypto.createHash('md5')
      .update(content + targetLanguage + JSON.stringify(this.config.frontmatterKeys))
      .digest('hex');
    return `${targetLanguage}_${hash}`;
  }

  /**
   * 从缓存获取内容
   * @param {string} cacheKey 缓存键
   * @returns {Promise<string|null>} 缓存内容
   */
  async getFromCache(cacheKey) {
    if (!this.config.cache?.enabled) {
      return null;
    }
    
    try {
      const cacheFile = path.join(this.config.cache.cacheDir, `${cacheKey}.md`);
      const content = await fs.readFile(cacheFile, 'utf-8');
      return content;
    } catch {
      return null;
    }
  }

  /**
   * 保存到缓存
   * @param {string} cacheKey 缓存键
   * @param {string} content 内容
   */
  async saveToCache(cacheKey, content) {
    if (!this.config.cache?.enabled) {
      return;
    }
    
    try {
      const cacheFile = path.join(this.config.cache.cacheDir, `${cacheKey}.md`);
      await fs.writeFile(cacheFile, content, 'utf-8');
    } catch (error) {
      console.warn('缓存保存失败:', error.message);
    }
  }

  /**
   * 睡眠函数
   * @param {number} ms 毫秒数
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 批量翻译文件
   * @param {string[]} files 文件列表
   * @param {string[]} targetLanguages 目标语言列表
   */
  async translateFiles(files, targetLanguages) {
    const { parallel } = this.config;
    
    if (parallel?.enabled) {
      return await this.translateFilesParallel(files, targetLanguages);
    } else {
      return await this.translateFilesSequential(files, targetLanguages);
    }
  }

  /**
   * 并行翻译文件
   * @param {string[]} files 文件列表
   * @param {string[]} targetLanguages 目标语言列表
   */
  async translateFilesParallel(files, targetLanguages) {
    const tasks = [];
    
    for (const file of files) {
      for (const lang of targetLanguages) {
        tasks.push(() => this.translateFile(file, lang));
      }
    }
    
    // 限制并发数
    const maxConcurrency = this.config.parallel.maxConcurrency || 3;
    const results = [];
    
    for (let i = 0; i < tasks.length; i += maxConcurrency) {
      const batch = tasks.slice(i, i + maxConcurrency);
      const batchResults = await Promise.allSettled(batch.map(task => task()));
      results.push(...batchResults);
    }
    
    return results;
  }

  /**
   * 顺序翻译文件
   * @param {string[]} files 文件列表
   * @param {string[]} targetLanguages 目标语言列表
   */
  async translateFilesSequential(files, targetLanguages) {
    const results = [];
    
    for (const file of files) {
      for (const lang of targetLanguages) {
        try {
          await this.translateFile(file, lang);
          results.push({ status: 'fulfilled', value: `${file} -> ${lang}` });
        } catch (error) {
          results.push({ status: 'rejected', reason: error });
        }
      }
    }
    
    return results;
  }
}