#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { TranslationPlugin } from '../translation-plugin/src/translator.js';
import { FileProcessor } from '../translation-plugin/src/file-processor.js';
import { loadConfig } from '../translation-plugin/src/config.js';

const program = new Command();

program
  .name('translate')
  .description('MyBatis-Plus 文档翻译工具')
  .version('1.0.0');

program
  .option('-l, --lang <language>', '目标语言 (en, ja)', '')
  .option('-f, --file <file>', '指定翻译文件')
  .option('-i, --incremental', '增量翻译（仅翻译修改过的文件）')
  .option('-d, --dry-run', '预览模式，不实际写入文件')
  .option('-c, --config <path>', '配置文件路径', './translation-plugin/config.json')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🚀 MyBatis-Plus 文档翻译工具启动...'));
      
      const config = await loadConfig(options.config);
      const fileProcessor = new FileProcessor(config);
      const translator = new TranslationPlugin(config);
      
      // 确定目标语言
      const targetLanguages = options.lang ? [options.lang] : config.targetLanguages;
      
      console.log(chalk.green(`📋 目标语言: ${targetLanguages.join(', ')}`));
      
      // 获取需要翻译的文件
      const filesToTranslate = await fileProcessor.getFilesToTranslate({
        specificFile: options.file,
        incremental: options.incremental
      });
      
      console.log(chalk.green(`📄 找到 ${filesToTranslate.length} 个文件需要翻译`));
      
      if (options.dryRun) {
        console.log(chalk.yellow('🔍 预览模式 - 将要翻译的文件:'));
        filesToTranslate.forEach(file => {
          console.log(chalk.gray(`  - ${file}`));
        });
        return;
      }
      
      // 执行翻译
      let successCount = 0;
      let errorCount = 0;
      
      for (const filePath of filesToTranslate) {
        for (const targetLang of targetLanguages) {
          try {
            console.log(chalk.blue(`🔄 翻译 ${filePath} -> ${targetLang}`));
            await translator.translateFile(filePath, targetLang);
            successCount++;
            console.log(chalk.green(`✅ 完成: ${filePath} -> ${targetLang}`));
          } catch (error) {
            errorCount++;
            console.error(chalk.red(`❌ 错误: ${filePath} -> ${targetLang}`));
            console.error(chalk.red(`   ${error.message}`));
          }
        }
      }
      
      console.log(chalk.blue('\n📊 翻译统计:'));
      console.log(chalk.green(`✅ 成功: ${successCount}`));
      console.log(chalk.red(`❌ 失败: ${errorCount}`));
      console.log(chalk.blue('🎉 翻译完成!'));
      
    } catch (error) {
      console.error(chalk.red('💥 翻译工具执行失败:'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program.parse();