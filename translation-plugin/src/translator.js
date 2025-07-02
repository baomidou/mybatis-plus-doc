import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import LLM from '@themaximalist/llm.js';
import { FileProcessor } from './file-processor.js';
import { generateTranslationPrompt, generateFrontmatterTranslationPrompt, generateBodySegmentTranslationPrompt, validateTranslationResult } from './prompt-template.js';

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
    // 检查内容长度，决定是否分段翻译
    const maxLength = this.config.segmentation?.maxLength || 8000;
    
    if (content.length <= maxLength) {
      const prompt = generateTranslationPrompt(
        targetLanguage,
        this.config.frontmatterKeys,
        content
      );
      
      return await this.callAI(prompt);
    } else {
      return await this.translateContentInSegments(content, targetLanguage);
    }
  }

  /**
   * 分段翻译内容（分离 frontmatter 和正文处理）
   * @param {string} content 原始内容
   * @param {string} targetLanguage 目标语言
   * @returns {Promise<string>} 翻译后的内容
   */
  async translateContentInSegments(content, targetLanguage) {
    console.log(`📄 开始智能分段翻译...`);
    
    // 分离 frontmatter 和正文
    const { frontmatter, body } = this.separateFrontmatterAndBody(content);
    console.log(`📋 内容分析: ${frontmatter ? '包含' : '不包含'} frontmatter, 正文长度: ${body.length} 字符`);
    
    let translatedFrontmatter = '';
    let translatedBody = '';
    
    // 1. 处理 frontmatter（如果存在）
    if (frontmatter) {
      console.log(`📋 翻译 frontmatter...`);
      try {
        translatedFrontmatter = await this.translateFrontmatter(frontmatter, targetLanguage);
        console.log(`✅ frontmatter 翻译完成`);
      } catch (error) {
        console.error('❌ frontmatter 翻译失败:', error.message);
        // 如果 frontmatter 翻译失败，使用原始内容
        translatedFrontmatter = frontmatter;
      }
    }
    
    // 2. 按标题层级分段处理正文
    if (body) {
      console.log(`📝 按标题层级分段翻译正文...`);
      const bodySegments = this.splitBodyByHeadings(body);
      console.log(`📄 正文分为 ${bodySegments.length} 个标题段落`);
      
      const translatedBodySegments = [];
      
      for (let i = 0; i < bodySegments.length; i++) {
        const segment = bodySegments[i];
        const segmentLength = segment.content.length;
        const estimatedTokens = Math.ceil(segmentLength / 4);
        const titleInfo = segment.title ? `"${segment.title}" (H${segment.level})` : '无标题段落';
        
        console.log(`🔄 翻译第 ${i + 1}/${bodySegments.length} 段: ${titleInfo}`);
        console.log(`📊 段落信息: ${segmentLength} 字符, 约 ${estimatedTokens} tokens`);
        console.log(`⏱️ 预计剩余: ${bodySegments.length - i - 1} 段`);
        
        try {
          const segmentPrompt = this.generateBodySegmentPrompt(targetLanguage, segment, i, bodySegments.length);
          const translatedSegment = await this.callAI(segmentPrompt);
          translatedBodySegments.push(translatedSegment);
          
          console.log(`✅ 第 ${i + 1} 段翻译完成`);
        } catch (error) {
          console.error(`❌ 第 ${i + 1} 段翻译失败:`, error.message);
          // 如果段落翻译失败，使用原始内容
          translatedBodySegments.push(segment.content);
        }
        
        // 添加延迟避免API限制
        if (i < bodySegments.length - 1) {
          console.log(`⏸️ 等待 3 秒后继续下一段...`);
          await this.sleep(3000);
        }
      }
      
      translatedBody = translatedBodySegments.join('\n\n');
    }
    
    // 3. 合并结果
    const result = translatedFrontmatter + translatedBody;
    console.log(`🎉 智能分段翻译完成！`);
    
    return result;
  }

  /**
   * 翻译 frontmatter
   * @param {string} frontmatter frontmatter 内容
   * @param {string} targetLanguage 目标语言
   * @returns {Promise<string>} 翻译后的 frontmatter
   */
  async translateFrontmatter(frontmatter, targetLanguage) {
    const prompt = generateFrontmatterTranslationPrompt(
      targetLanguage,
      this.config.frontmatterKeys,
      frontmatter
    );
    
    return await this.callAI(prompt);
  }

  /**
   * 生成正文段落翻译提示词
   * @param {string} targetLanguage 目标语言
   * @param {Object} segment 段落对象
   * @param {number} index 段落索引
   * @param {number} total 总段落数
   * @returns {string} 提示词
   */
  generateBodySegmentPrompt(targetLanguage, segment, index, total) {
    return generateBodySegmentTranslationPrompt(
      targetLanguage,
      segment,
      index,
      total
    );
  }

  /**
   * 分离 frontmatter 和正文
   * @param {string} content 原始内容
   * @returns {Object} { frontmatter: string, body: string }
   */
  separateFrontmatterAndBody(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?/;
    const match = content.match(frontmatterRegex);
    
    if (match) {
      const frontmatter = match[0]; // 包含 --- 分隔符的完整 frontmatter
      const body = content.slice(match[0].length);
      return { frontmatter, body };
    }
    
    return { frontmatter: null, body: content };
  }
  
  /**
   * 按标题层级分割正文
   * @param {string} body 正文内容
   * @returns {Array} 段落数组，每个段落包含 title 和 content
   */
  splitBodyByHeadings(body) {
    const lines = body.split('\n');
    const segments = [];
    let currentSegment = { title: null, content: '', level: 0 };
    
    for (const line of lines) {
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      
      if (headingMatch) {
        // 如果当前段落有内容，保存它
        if (currentSegment.content.trim()) {
          segments.push({
            title: currentSegment.title,
            content: currentSegment.content.trim(),
            level: currentSegment.level
          });
        }
        
        // 开始新段落
        const level = headingMatch[1].length;
        const title = headingMatch[2];
        currentSegment = {
          title: title,
          content: line + '\n',
          level: level
        };
      } else {
        // 添加到当前段落
        currentSegment.content += line + '\n';
      }
    }
    
    // 添加最后一个段落
    if (currentSegment.content.trim()) {
      segments.push({
        title: currentSegment.title,
        content: currentSegment.content.trim(),
        level: currentSegment.level
      });
    }
    
    // 如果没有标题，将整个正文作为一个段落
    if (segments.length === 0 && body.trim()) {
      segments.push({
        title: null,
        content: body.trim(),
        level: 0
      });
    }
    
    return segments;
  }

  /**
   * 调用 AI 服务进行翻译
   * @param {string} prompt 翻译提示词
   * @returns {Promise<string>} 翻译结果
   */
  async callAI(prompt) {
    const { type, apiKey, model, baseURL, maxTokens, temperature, service } = this.config.aiProvider;
    const retryConfig = this.config.retryConfig || { maxRetries: 3, baseDelay: 1000, maxDelay: 10000 };
    
    let lastError;
    
    for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
      try {
        // 使用 llm.js 统一接口
        const options = {
          model: model || 'gpt-4',
          max_tokens: maxTokens || 4000,
          temperature: temperature || 0.1,
          extended: true // 获取详细信息包括 token 使用量
        };
        
        // 设置 API 密钥：优先使用配置文件中的 apiKey，其次使用环境变量 API_KEY
        const finalApiKey = apiKey || process.env.API_KEY;
        if (finalApiKey) {
          options.apiKey = finalApiKey;
        }
        
        // 如果指定了服务类型，添加到选项中
        if (service) {
          options.service = service;
        }
        
        // 如果指定了自定义 baseURL，添加到选项中
        if (baseURL) {
          options.baseUrl = baseURL;
        }
        
        // 通用 API 密钥检查
        if (!finalApiKey) {
          console.warn('⚠️ API 密钥未设置，请在配置文件中设置 apiKey 或在环境变量中设置 API_KEY');
        }
        
        const attemptText = attempt > 0 ? ` (重试 ${attempt}/${retryConfig.maxRetries})` : '';
        console.log(`🤖 调用 AI 服务: ${service || model || 'default'}${attemptText}`);
        console.log(`📤 发送请求 - 模型: ${options.model}, 最大Token: ${options.max_tokens}`);
        console.log(`⏳ 请求进行中，请耐心等待...`);
        
        const startTime = Date.now();
        const response = await LLM(prompt, options);
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        
        console.log(`✅ 请求完成，耗时: ${duration}秒`);
        
        // 确保返回字符串类型
        let content;
        if (response && typeof response === 'object' && response.content) {
          if (response.usage) {
            console.log(`📊 Token 使用: 输入 ${response.usage.input_tokens}, 输出 ${response.usage.output_tokens}, 成本 $${response.usage.total_cost || 'N/A'}`);
          }
          content = response.content;
        } else {
          content = response;
        }
        
        // 确保内容是字符串
        if (typeof content !== 'string') {
          content = String(content || '');
        }
        
        return content;
        
      } catch (error) {
        lastError = error;
        console.error(`❌ AI 调用失败 (尝试 ${attempt + 1}/${retryConfig.maxRetries + 1}): ${error.message}`);
        
        // 如果是最后一次尝试，直接抛出错误
        if (attempt === retryConfig.maxRetries) {
          break;
        }
        
        // 计算延迟时间（指数退避）
        const delay = Math.min(
          retryConfig.baseDelay * Math.pow(2, attempt),
          retryConfig.maxDelay
        );
        
        console.log(`⏸️ ${delay}ms 后重试...`);
        await this.sleep(delay);
      }
    }
    
    throw lastError;
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