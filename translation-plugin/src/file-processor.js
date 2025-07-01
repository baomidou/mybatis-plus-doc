import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';

export class FileProcessor {
  constructor(config) {
    this.config = config;
  }

  /**
   * 获取需要翻译的文件列表
   * @param {Object} options 选项
   * @param {string} options.specificFile 指定文件
   * @param {boolean} options.incremental 是否增量翻译
   * @returns {Promise<string[]>} 文件路径数组
   */
  async getFilesToTranslate(options = {}) {
    const { specificFile, incremental } = options;
    
    if (specificFile) {
      const fullPath = path.resolve(this.config.sourceDir, specificFile);
      const exists = await this.fileExists(fullPath);
      if (!exists) {
        throw new Error(`指定文件不存在: ${specificFile}`);
      }
      return [fullPath];
    }
    
    // 扫描所有 .md 和 .mdx 文件
    const pattern = path.join(this.config.sourceDir, '**/*.{md,mdx}');
    const allFiles = await glob(pattern, {
      ignore: this.getIgnorePatterns()
    });
    
    if (incremental) {
      return await this.filterIncrementalFiles(allFiles);
    }
    
    return allFiles;
  }

  /**
   * 获取忽略模式
   * @returns {string[]} 忽略模式数组
   */
  getIgnorePatterns() {
    const patterns = [];
    
    // 忽略指定目录
    const excludeDirs = this.config.excludeDirs || [];
    excludeDirs.forEach(dir => {
      patterns.push(path.join(this.config.sourceDir, dir, '**/*'));
    });
    
    // 忽略指定文件
    const excludeFiles = this.config.excludeFiles || [];
    excludeFiles.forEach(file => {
      patterns.push(path.join(this.config.sourceDir, file));
      patterns.push(path.join(this.config.sourceDir, '**', file));
    });
    
    return patterns;
  }

  /**
   * 过滤增量文件（基于修改时间）
   * @param {string[]} files 文件列表
   * @returns {Promise<string[]>} 需要翻译的文件
   */
  async filterIncrementalFiles(files) {
    const incrementalFiles = [];
    
    for (const file of files) {
      const shouldTranslate = await this.shouldTranslateFile(file);
      if (shouldTranslate) {
        incrementalFiles.push(file);
      }
    }
    
    return incrementalFiles;
  }

  /**
   * 判断文件是否需要翻译
   * @param {string} sourceFile 源文件路径
   * @returns {Promise<boolean>} 是否需要翻译
   */
  async shouldTranslateFile(sourceFile) {
    try {
      const sourceStats = await fs.stat(sourceFile);
      
      // 检查所有目标语言的翻译文件
      const targetLanguages = this.config.targetLanguages || [];
      for (const lang of targetLanguages) {
        const targetFile = this.getTargetFilePath(sourceFile, lang);
        
        try {
          const targetStats = await fs.stat(targetFile);
          // 如果源文件比目标文件新，需要重新翻译
          if (sourceStats.mtime > targetStats.mtime) {
            return true;
          }
        } catch (error) {
          // 目标文件不存在，需要翻译
          return true;
        }
      }
      
      return false;
    } catch (error) {
      // 源文件不存在或其他错误
      return false;
    }
  }

  /**
   * 获取目标文件路径
   * @param {string} sourceFile 源文件路径
   * @param {string} targetLang 目标语言
   * @returns {string} 目标文件路径
   */
  getTargetFilePath(sourceFile, targetLang) {
    const relativePath = path.relative(this.config.sourceDir, sourceFile);
    return path.join(this.config.sourceDir, targetLang, relativePath);
  }

  /**
   * 解析文档文件
   * @param {string} filePath 文件路径
   * @returns {Promise<Object>} 解析结果
   */
  async parseFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const parsed = matter(content);
      
      return {
        frontmatter: parsed.data,
        content: parsed.content,
        originalContent: content
      };
    } catch (error) {
      throw new Error(`文件解析失败 ${filePath}: ${error.message}`);
    }
  }

  /**
   * 写入翻译后的文件
   * @param {string} targetPath 目标文件路径
   * @param {Object} frontmatter 前置元数据
   * @param {string} content 内容
   */
  async writeTranslatedFile(targetPath, frontmatter, content) {
    try {
      // 确保目标目录存在
      const targetDir = path.dirname(targetPath);
      await fs.mkdir(targetDir, { recursive: true });
      
      // 生成完整的文件内容
      const fullContent = matter.stringify(content, frontmatter);
      
      // 写入文件
      await fs.writeFile(targetPath, fullContent, 'utf-8');
    } catch (error) {
      throw new Error(`文件写入失败 ${targetPath}: ${error.message}`);
    }
  }

  /**
   * 检查文件是否存在
   * @param {string} filePath 文件路径
   * @returns {Promise<boolean>} 文件是否存在
   */
  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 获取文件的相对路径（用于显示）
   * @param {string} filePath 文件路径
   * @returns {string} 相对路径
   */
  getRelativePath(filePath) {
    return path.relative(this.config.sourceDir, filePath);
  }

  /**
   * 验证文档格式
   * @param {Object} parsed 解析后的文档
   * @returns {boolean} 是否有效
   */
  validateDocument(parsed) {
    // 检查是否有需要翻译的 frontmatter 键
    const frontmatterKeys = this.config.frontmatterKeys || [];
    const hasTranslatableKeys = frontmatterKeys.some(
      key => parsed.frontmatter[key]
    );
    
    // 检查是否有内容需要翻译
    const hasContent = parsed.content && parsed.content.trim().length > 0;
    
    return hasTranslatableKeys || hasContent;
  }
}