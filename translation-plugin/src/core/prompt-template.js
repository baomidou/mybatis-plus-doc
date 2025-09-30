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

  // Use English prompts for better translation quality
  const basePrompt = `You are an expert technical documentation translator specializing in ${languageName} localization. Your task is to translate this MyBatis-Plus documentation while maintaining its technical accuracy and making it feel natural to ${languageName} speakers.

TARGET LANGUAGE: ${languageName}
FRONTMATTER KEYS TO TRANSLATE: ${keysString}

DOCUMENT TO TRANSLATE:
${document}

TRANSLATION GUIDELINES:

## Structure & Format Preservation
- Preserve all frontmatter structure (--- delimiters)
- Only translate the specified frontmatter keys: ${keysString}
- Keep all code blocks (\`\`\` fenced) exactly as they are
- Preserve all MDX import statements (import ... from ...)
- Maintain all Markdown formatting (#, **, *, [](), ![]())
- Keep all MDX component calls unchanged (<Card>, <CardGrid>, <LinkCard>, etc.)
- Preserve all URLs, file paths, and code examples

## Technical Terms & Proper Nouns
Keep these technical terms unchanged:
MyBatis-Plus, MyBatis, Spring Boot, Maven, Gradle, Java, SQL, CRUD, ORM, JPA, Hibernate, MySQL, PostgreSQL, Oracle, SQLServer, Redis, MongoDB, Docker, Kubernetes, Git, GitHub, Gitee

## Translation Approach
${getLanguageSpecificGuidelines(targetLanguage)}

## Quality Standards
- Write for developers who are native ${languageName} speakers
- Use standard ${languageName} terminology for technical concepts
- Maintain consistent tone throughout the document
- Ensure the text flows naturally and doesn't feel like a direct translation
- Adapt examples and explanations to ${languageName} conventions where appropriate

OUTPUT FORMAT:
Return only the translated document. Do not add explanatory text, headers, or any wrapper content. The output must maintain identical formatting to the source.`;

  return basePrompt;
}

/**
 * 获取特定语言的翻译指导
 * @param {string} targetLanguage 目标语言代码
 * @returns {string} 语言特定的翻译指导
 */
function getLanguageSpecificGuidelines(targetLanguage) {
  switch (targetLanguage) {
    case 'en':
      return `- Write in clear, concise English suitable for technical documentation
- Use active voice where possible
- Follow standard English technical writing conventions
- Use "you" to address the reader directly
- Prefer shorter sentences for better readability
- Use standard American English spelling and grammar`;

    case 'ja':
      return `- Use appropriate levels of formality (敬語) for technical documentation
- Maintain consistent terminology throughout
- Use katakana appropriately for foreign technical terms
- Follow Japanese technical writing conventions
- Use です/ます調 for consistency`;

    case 'ko':
      return `- Use appropriate honorific levels for technical documentation
- Maintain consistent technical terminology
- Follow Korean technical writing conventions
- Use 합니다체 for formal documentation`;

    case 'fr':
      return `- Use formal French appropriate for technical documentation
- Follow French typography rules (spaces before colons, semicolons, etc.)
- Use vous form consistently
- Maintain gender agreement in technical terms where applicable`;

    case 'de':
      return `- Use formal German (Sie form) consistently
- Follow German capitalization rules for nouns
- Use appropriate compound words for technical concepts
- Maintain formal tone throughout`;

    case 'es':
      return `- Use formal Spanish appropriate for technical documentation
- Use usted form consistently
- Follow Spanish punctuation and grammar rules
- Maintain consistent technical terminology`;

    case 'pt':
      return `- Use formal Portuguese appropriate for technical documentation
- Use você form consistently
- Follow Portuguese grammar and punctuation rules
- Maintain consistent technical terminology`;

    case 'ru':
      return `- Use formal Russian appropriate for technical documentation
- Maintain proper case usage and grammar
- Use consistent technical terminology
- Follow Russian typography conventions`;

    case 'ar':
      return `- Use formal Arabic appropriate for technical documentation
- Maintain proper Arabic grammar and syntax
- Use consistent technical terminology
- Follow Arabic typography and writing conventions`;

    case 'hi':
      return `- Use formal Hindi appropriate for technical documentation
- Maintain proper Devanagari script usage
- Use consistent technical terminology
- Balance between Hindi terms and accepted English technical terms`;

    default:
      return `- Write in clear, natural ${getLanguageName(targetLanguage)}
- Follow standard conventions for technical documentation in this language
- Maintain consistent terminology throughout
- Ensure the text feels native, not translated`;
  }
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

  return `Translate the specified YAML frontmatter fields to natural ${languageName} for technical documentation.

TRANSLATION TARGETS: Only translate these fields: ${keysString}
TARGET LANGUAGE: ${languageName}

REQUIREMENTS:
- Translate only the specified fields: ${keysString}
- Keep all other fields exactly as they are
- Maintain YAML format and structure
- Preserve --- delimiters
- Write translations suitable for ${languageName}-speaking developers
- Use natural, professional language appropriate for technical documentation

${getLanguageSpecificGuidelines(targetLanguage)}

FRONTMATTER TO TRANSLATE:

${frontmatter}

Return only the complete translated frontmatter with no additional explanatory text or wrapper content.`;
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
  const titleInfo = segment.title ? `Section: ${segment.title}` : 'Untitled section';

  return `Translate this Markdown documentation segment to natural ${languageName} for technical documentation.

TARGET LANGUAGE: ${languageName}
CURRENT PROGRESS: Segment ${segmentIndex + 1}/${totalSegments} (${titleInfo})

PRESERVATION REQUIREMENTS:
- Keep all Markdown formatting exactly as is (#, ##, ###, **, *, [](), ![]())
- Preserve all code blocks (\`\`\` fenced) unchanged
- Keep all MDX import statements (import ... from ...) unchanged
- Maintain all MDX component calls (<Card>, <CardGrid>, <LinkCard>, etc.)
- Preserve all URLs, file paths, and code examples
- Keep these technical terms unchanged: MyBatis-Plus, MyBatis, Spring Boot, Maven, Gradle, Java, SQL, CRUD, ORM, JPA, Hibernate, MySQL, PostgreSQL, Oracle, SQLServer, Redis, MongoDB, Docker, Kubernetes, Git, GitHub, Gitee

TRANSLATION APPROACH:
${getLanguageSpecificGuidelines(targetLanguage)}

QUALITY EXPECTATIONS:
- Write for ${languageName}-speaking developers
- Create natural, flowing text that doesn't feel translated
- Use appropriate technical terminology for the ${languageName} audience
- Maintain the same level of formality and technical depth
- Ensure consistency with standard ${languageName} technical documentation

CONTENT TO TRANSLATE:

${segment.content}

Return only the translated content with identical formatting. Do not add any explanatory text or wrapper content.`;
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