/**
 * 翻译 Prompt 模板管理
 */

/**
 * 语言映射表
 */
const LANGUAGE_MAP = {
  'en': 'English',
  'ja': 'Japanese (日本語)',
  'ko': 'Korean (한국어)',
  'fr': 'French (Français)',
  'de': 'German (Deutsch)',
  'es': 'Spanish (Español)',
  'pt': 'Portuguese (Português)',
  'ru': 'Russian (Русский)',
  'ar': 'Arabic (العربية)',
  'hi': 'Hindi (हिन्दी)'
};

/**
 * 获取语言的完整名称
 * @param {string} langCode 语言代码
 * @returns {string} 语言全名
 */
export function getLanguageName(langCode) {
  return LANGUAGE_MAP[langCode] || langCode;
}

/**
 * 生成翻译 Prompt
 * @param {string} targetLanguage 目标语言代码
 * @param {string[]} frontmatterKeys 需要翻译的 frontmatter 键
 * @param {string} document 待翻译的文档内容
 * @returns {string} 完整的翻译 Prompt
 */
export function generateTranslationPrompt(targetLanguage, frontmatterKeys, document) {
  const languageName = getLanguageName(targetLanguage);
  const keysString = frontmatterKeys.join(', ');
  
  return `你需要将提供的技术文档（md 或 mdx 格式）翻译为指定的目标语言。翻译时需保留技术相关专有名词、代码和 frontmatter 中的指定内容。

目标语言: ${languageName}

需要翻译的 frontmatter 键（以逗号分隔）: ${keysString}

以下是待翻译的技术文档:
${document}

翻译时请遵循以下规则和步骤:
1. 识别文档中的 frontmatter 部分（以 --- 开头和结尾的部分）。
2. 仅翻译 frontmatter 中指定键的值，其他 frontmatter 内容保持不变。
3. 识别文档中的代码块（以 \`\`\` 开头和结尾的部分）和 MDX 导入语句（如 import ... from ...），这些内容保持不变。
4. 识别技术相关专有名词（如编程语言、框架名、库名等），这些内容保持不变。特别注意以下专有名词：
   - MyBatis-Plus
   - MyBatis
   - Spring Boot
   - Maven
   - Gradle
   - Java
   - SQL
   - CRUD
   - ORM
   - JPA
   - Hibernate
   - MySQL
   - PostgreSQL
   - Oracle
   - SQLServer
   - Redis
   - MongoDB
   - Docker
   - Kubernetes
   - Git
   - GitHub
   - Gitee
5. 保持所有 URL 链接、文件路径、代码示例不变。
6. 保持 Markdown 格式标记（如 #、**、*、[]()、![](） 不变。
7. 保持 MDX 组件调用（如 <Card>、<CardGrid>、<LinkCard> 等）不变。
8. 翻译文档中的其他文本内容，确保翻译自然流畅，符合目标语言的表达习惯。

请直接输出翻译结果，不需要额外的标签包装或说明。确保输出的格式与原文档完全一致。`;
}

/**
 * 生成简化版翻译 Prompt（用于较短的内容）
 * @param {string} targetLanguage 目标语言代码
 * @param {string[]} frontmatterKeys 需要翻译的 frontmatter 键
 * @param {string} document 待翻译的文档内容
 * @returns {string} 简化的翻译 Prompt
 */
export function generateSimpleTranslationPrompt(targetLanguage, frontmatterKeys, document) {
  const languageName = getLanguageName(targetLanguage);
  const keysString = frontmatterKeys.join(', ');
  
  return `将以下技术文档翻译为${languageName}。

规则：
- 仅翻译 frontmatter 中的这些键：${keysString}
- 保持代码块、技术术语、链接、格式不变
- 保持 MyBatis-Plus、Spring Boot 等专有名词不变

文档：
${document}

直接输出翻译结果：`;
}

/**
 * 验证翻译结果的格式
 * @param {string} originalContent 原始内容
 * @param {string} translatedContent 翻译后内容
 * @returns {Object} 验证结果
 */
export function validateTranslationResult(originalContent, translatedContent) {
  const issues = [];
  
  // 检查是否有内容
  if (!translatedContent || translatedContent.trim().length === 0) {
    issues.push('翻译结果为空');
    return { valid: false, issues };
  }
  
  // 检查 frontmatter 格式
  const originalHasFrontmatter = originalContent.startsWith('---');
  const translatedHasFrontmatter = translatedContent.startsWith('---');
  
  if (originalHasFrontmatter !== translatedHasFrontmatter) {
    issues.push('frontmatter 格式不匹配');
  }
  
  // 检查代码块数量
  const originalCodeBlocks = (originalContent.match(/```/g) || []).length;
  const translatedCodeBlocks = (translatedContent.match(/```/g) || []).length;
  
  if (originalCodeBlocks !== translatedCodeBlocks) {
    issues.push(`代码块数量不匹配：原文 ${originalCodeBlocks/2} 个，译文 ${translatedCodeBlocks/2} 个`);
  }
  
  // 检查 MDX 导入语句
  const originalImports = (originalContent.match(/^import .+ from .+;$/gm) || []).length;
  const translatedImports = (translatedContent.match(/^import .+ from .+;$/gm) || []).length;
  
  if (originalImports !== translatedImports) {
    issues.push(`MDX 导入语句数量不匹配：原文 ${originalImports} 个，译文 ${translatedImports} 个`);
  }
  
  // 检查链接数量
  const originalLinks = (originalContent.match(/\[.*?\]\(.*?\)/g) || []).length;
  const translatedLinks = (translatedContent.match(/\[.*?\]\(.*?\)/g) || []).length;
  
  if (originalLinks !== translatedLinks) {
    issues.push(`链接数量不匹配：原文 ${originalLinks} 个，译文 ${translatedLinks} 个`);
  }
  
  return {
    valid: issues.length === 0,
    issues
  };
}

/**
 * 提取需要保持不变的内容模式
 * @returns {RegExp[]} 正则表达式数组
 */
export function getPreservePatterns() {
  return [
    // 代码块
    /```[\s\S]*?```/g,
    // 行内代码
    /`[^`]+`/g,
    // MDX 导入
    /^import .+ from .+;$/gm,
    // MDX 组件
    /<[A-Z][\w\s="'{}:.-]*\/?>/g,
    // URL 链接
    /https?:\/\/[^\s)]+/g,
    // 文件路径
    /[\w-]+\.[\w]+/g,
    // 技术术语（可以根据需要扩展）
    /\b(MyBatis-Plus|MyBatis|Spring Boot|Maven|Gradle|Java|SQL|CRUD|ORM|JPA|Hibernate|MySQL|PostgreSQL|Oracle|SQLServer|Redis|MongoDB|Docker|Kubernetes|Git|GitHub|Gitee)\b/g
  ];
}