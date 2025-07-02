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
 * 生成 frontmatter 翻译的 Prompt
 * @param {string} targetLanguage 目标语言代码
 * @param {string[]} frontmatterKeys 需要翻译的 frontmatter 键
 * @param {string} frontmatter frontmatter 内容
 * @returns {string} 生成的 Prompt
 */
export function generateFrontmatterTranslationPrompt(targetLanguage, frontmatterKeys, frontmatter) {
  const languageName = getLanguageName(targetLanguage);
  const keysString = frontmatterKeys.join(', ');
  
  return `请翻译以下 YAML frontmatter 中的指定字段到${languageName}。

翻译规则：
1. 只翻译这些字段：${keysString}
2. 保持 YAML 格式不变
3. 保持其他字段不变
4. 保持 --- 分隔符
5. 直接返回完整的 frontmatter，不要添加任何解释

需要翻译的 frontmatter：

${frontmatter}

请直接输出翻译结果，不需要额外的标签包装或说明。确保输出的格式与原文档完全一致。`;
}

/**
 * 生成正文段落翻译的 Prompt
 * @param {string} targetLanguage 目标语言代码
 * @param {Object} segment 段落对象 { title, content, level }
 * @param {number} segmentIndex 当前段落索引
 * @param {number} totalSegments 总段落数
 * @returns {string} 生成的 Prompt
 */
export function generateBodySegmentTranslationPrompt(targetLanguage, segment, segmentIndex, totalSegments) {
  const languageName = getLanguageName(targetLanguage);
  const titleInfo = segment.title ? `标题：${segment.title}` : '无标题段落';
  
  return `请将以下 Markdown 段落翻译成${languageName}。

翻译规则：
1. 保持 Markdown 格式不变（包括标题层级 #、##、### 等）
2. 识别文档中的代码块（以 \`\`\` 开头和结尾的部分）和 MDX 导入语句（如 import ... from ...），这些内容保持不变。
3. 识别技术相关专有名词（如编程语言、框架名、库名等），这些内容保持不变。特别注意以下专有名词：
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
4. 保持所有 URL 链接、文件路径、代码示例不变。
5. 保持 Markdown 格式标记（如 #、**、*、[]()、![](） 不变。
6. 保持 MDX 组件调用（如 <Card>、<CardGrid>、<LinkCard> 等）不变。
7. 翻译文档中的其他文本内容，确保翻译自然流畅，符合目标语言的表达习惯。

当前段落 ${segmentIndex + 1}/${totalSegments}（${titleInfo}）：

${segment.content}

请直接输出翻译结果，不需要额外的标签包装或说明。确保输出的格式与原文档完全一致。`;
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