#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { TranslationPlugin } from '../src/translator.js';
import { FileProcessor } from '../src/file-processor.js';
import { loadConfig } from '../src/config.js';
import { generateTranslationPrompt, validateTranslationResult } from '../src/prompt-template.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 测试翻译插件功能
 */
class TranslationTester {
  constructor() {
    this.testResults = [];
  }

  /**
   * 运行所有测试
   */
  async runAllTests() {
    console.log('🧪 开始运行翻译插件测试...');
    
    try {
      await this.testConfigLoading();
      await this.testFileProcessor();
      await this.testPromptGeneration();
      await this.testValidation();
      await this.testMockTranslation();
      
      this.printResults();
    } catch (error) {
      console.error('❌ 测试执行失败:', error.message);
      process.exit(1);
    }
  }

  /**
   * 测试配置加载
   */
  async testConfigLoading() {
    console.log('\n📋 测试配置加载...');
    
    try {
      // 创建测试配置
      const testConfig = {
        targetLanguages: ['en', 'ja'],
        frontmatterKeys: ['title', 'description'],
        sourceDir: 'src/content/docs',
        aiProvider: {
          type: 'openai',
          model: 'gpt-4'
        }
      };
      
      const testConfigPath = path.join(__dirname, 'test-config.json');
      await fs.writeFile(testConfigPath, JSON.stringify(testConfig, null, 2));
      
      const config = await loadConfig(testConfigPath);
      
      this.assert(
        config.targetLanguages.length === 2,
        '目标语言配置加载'
      );
      
      this.assert(
        config.frontmatterKeys.includes('title'),
        'Frontmatter 键配置加载'
      );
      
      // 清理测试文件
      await fs.unlink(testConfigPath);
      
      console.log('✅ 配置加载测试通过');
    } catch (error) {
      this.fail('配置加载测试', error.message);
    }
  }

  /**
   * 测试文件处理器
   */
  async testFileProcessor() {
    console.log('\n📁 测试文件处理器...');
    
    try {
      const config = {
        sourceDir: path.join(__dirname, 'fixtures'),
        targetLanguages: ['en'],
        excludeFiles: ['exclude.md'],
        excludeDirs: ['en']
      };
      
      // 创建测试文件
      await fs.mkdir(config.sourceDir, { recursive: true });
      
      const testContent = `---
title: 测试标题
description: 测试描述
---

# 测试文档

这是一个测试文档。

\`\`\`javascript
console.log('Hello World');
\`\`\`
`;
      
      const testFile = path.join(config.sourceDir, 'test.md');
      await fs.writeFile(testFile, testContent);
      
      const processor = new FileProcessor(config);
      
      // 测试文件解析
      const parsed = await processor.parseFile(testFile);
      
      this.assert(
        parsed.frontmatter.title === '测试标题',
        '文件解析 - frontmatter'
      );
      
      this.assert(
        parsed.content.includes('# 测试文档'),
        '文件解析 - 内容'
      );
      
      // 测试文档验证
      const isValid = processor.validateDocument(parsed);
      this.assert(isValid, '文档验证');
      
      // 测试目标文件路径生成
      const targetPath = processor.getTargetFilePath(testFile, 'en');
      this.assert(
        targetPath.includes('/en/test.md'),
        '目标文件路径生成'
      );
      
      // 清理测试文件
      await fs.rm(config.sourceDir, { recursive: true, force: true });
      
      console.log('✅ 文件处理器测试通过');
    } catch (error) {
      this.fail('文件处理器测试', error.message);
    }
  }

  /**
   * 测试 Prompt 生成
   */
  async testPromptGeneration() {
    console.log('\n📝 测试 Prompt 生成...');
    
    try {
      const targetLanguage = 'en';
      const frontmatterKeys = ['title', 'description'];
      const document = '---\ntitle: 测试\n---\n\n# 内容';
      
      const prompt = generateTranslationPrompt(targetLanguage, frontmatterKeys, document);
      
      this.assert(
        prompt.includes('English'),
        'Prompt 包含目标语言'
      );
      
      this.assert(
        prompt.includes('title, description'),
        'Prompt 包含 frontmatter 键'
      );
      
      this.assert(
        prompt.includes(document),
        'Prompt 包含文档内容'
      );
      
      console.log('✅ Prompt 生成测试通过');
    } catch (error) {
      this.fail('Prompt 生成测试', error.message);
    }
  }

  /**
   * 测试翻译结果验证
   */
  async testValidation() {
    console.log('\n🔍 测试翻译结果验证...');
    
    try {
      const original = `---
title: 原标题
---

# 标题

\`\`\`javascript
console.log('test');
\`\`\`

[链接](https://example.com)`;
      
      const translated = `---
title: Original Title
---

# Title

\`\`\`javascript
console.log('test');
\`\`\`

[Link](https://example.com)`;
      
      const validation = validateTranslationResult(original, translated);
      
      this.assert(
        validation.valid,
        '有效翻译结果验证'
      );
      
      // 测试无效结果
      const invalidTranslated = `---
title: Invalid
---

# Title

\`\`\`javascript
console.log('test');
\`\`\`

[Link](https://example.com)

\`\`\`
extra code block
\`\`\``;
      
      const invalidValidation = validateTranslationResult(original, invalidTranslated);
      
      this.assert(
        !invalidValidation.valid,
        '无效翻译结果检测'
      );
      
      console.log('✅ 翻译结果验证测试通过');
    } catch (error) {
      this.fail('翻译结果验证测试', error.message);
    }
  }

  /**
   * 测试模拟翻译（不调用真实 API）
   */
  async testMockTranslation() {
    console.log('\n🤖 测试模拟翻译...');
    
    try {
      const config = {
        targetLanguages: ['en'],
        frontmatterKeys: ['title'],
        sourceDir: path.join(__dirname, 'fixtures'),
        aiProvider: {
          type: 'mock'
        },
        cache: {
          enabled: false
        }
      };
      
      // 创建模拟翻译器
      class MockTranslationPlugin extends TranslationPlugin {
        async callAI(prompt) {
          // 模拟翻译结果
          if (prompt.includes('测试标题')) {
            return `---
title: Test Title
---

# Test Document

This is a test document.`;
          }
          return prompt.replace(/测试/g, 'Test');
        }
      }
      
      const translator = new MockTranslationPlugin(config);
      
      // 创建测试文件
      await fs.mkdir(config.sourceDir, { recursive: true });
      const testFile = path.join(config.sourceDir, 'mock-test.md');
      const testContent = `---
title: 测试标题
---

# 测试文档

这是测试内容。`;
      
      await fs.writeFile(testFile, testContent);
      
      // 执行模拟翻译
      await translator.translateFile(testFile, 'en');
      
      // 检查翻译结果
      const targetFile = path.join(config.sourceDir, 'en', 'mock-test.md');
      const exists = await fs.access(targetFile).then(() => true).catch(() => false);
      
      this.assert(exists, '翻译文件生成');
      
      if (exists) {
        const translatedContent = await fs.readFile(targetFile, 'utf-8');
        this.assert(
          translatedContent.includes('Test Title'),
          '翻译内容正确性'
        );
      }
      
      // 清理测试文件
      await fs.rm(config.sourceDir, { recursive: true, force: true });
      
      console.log('✅ 模拟翻译测试通过');
    } catch (error) {
      this.fail('模拟翻译测试', error.message);
    }
  }

  /**
   * 断言函数
   */
  assert(condition, testName) {
    if (condition) {
      this.testResults.push({ name: testName, status: 'PASS' });
    } else {
      this.testResults.push({ name: testName, status: 'FAIL' });
      throw new Error(`断言失败: ${testName}`);
    }
  }

  /**
   * 测试失败
   */
  fail(testName, message) {
    this.testResults.push({ name: testName, status: 'FAIL', message });
    throw new Error(`${testName} 失败: ${message}`);
  }

  /**
   * 打印测试结果
   */
  printResults() {
    console.log('\n📊 测试结果汇总:');
    console.log('=' .repeat(50));
    
    let passCount = 0;
    let failCount = 0;
    
    this.testResults.forEach(result => {
      const status = result.status === 'PASS' ? '✅' : '❌';
      console.log(`${status} ${result.name}`);
      
      if (result.message) {
        console.log(`   ${result.message}`);
      }
      
      if (result.status === 'PASS') {
        passCount++;
      } else {
        failCount++;
      }
    });
    
    console.log('=' .repeat(50));
    console.log(`总计: ${this.testResults.length} 个测试`);
    console.log(`通过: ${passCount} 个`);
    console.log(`失败: ${failCount} 个`);
    
    if (failCount === 0) {
      console.log('\n🎉 所有测试通过！');
    } else {
      console.log('\n💥 部分测试失败，请检查代码。');
      process.exit(1);
    }
  }
}

// 运行测试
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new TranslationTester();
  tester.runAllTests();
}