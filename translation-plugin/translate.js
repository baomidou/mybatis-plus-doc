#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { TranslationPlugin } from './src/translator.js';
import { FileProcessor } from './src/file-processor.js';
import { loadConfig } from './src/config.js';

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
      
      // 创建所有翻译任务
      const translationTasks = [];
      for (const filePath of filesToTranslate) {
        for (const targetLang of targetLanguages) {
          translationTasks.push({ filePath, targetLang });
        }
      }
      
      console.log(chalk.green(`📋 总共 ${translationTasks.length} 个翻译任务`));
      
      // 根据配置决定是否并行执行
      const { parallel } = config;
      if (parallel?.enabled && translationTasks.length > 1) {
        const maxConcurrency = parallel.maxConcurrency || 3;
        console.log(chalk.blue(`🚀 启用并行翻译模式，最大并发数: ${maxConcurrency}`));
        
        // 分批并行处理
        for (let i = 0; i < translationTasks.length; i += maxConcurrency) {
          const batch = translationTasks.slice(i, i + maxConcurrency);
          console.log(chalk.cyan(`📦 处理批次 ${Math.floor(i / maxConcurrency) + 1}/${Math.ceil(translationTasks.length / maxConcurrency)} (${batch.length} 个任务)`));
          
          const batchPromises = batch.map(async ({ filePath, targetLang }) => {
            try {
              console.log(chalk.blue(`🔄 翻译 ${filePath} -> ${targetLang}`));
              await translator.translateFile(filePath, targetLang);
              console.log(chalk.green(`✅ 完成: ${filePath} -> ${targetLang}`));
              return { success: true, filePath, targetLang };
            } catch (error) {
              console.error(chalk.red(`❌ 错误: ${filePath} -> ${targetLang}`));
              console.error(chalk.red(`   ${error.message}`));
              return { success: false, filePath, targetLang, error };
            }
          });
          
          const batchResults = await Promise.allSettled(batchPromises);
          
          // 统计批次结果
          batchResults.forEach(result => {
            if (result.status === 'fulfilled') {
              if (result.value.success) {
                successCount++;
              } else {
                errorCount++;
              }
            } else {
              errorCount++;
            }
          });
          
          // 批次间延迟
          if (i + maxConcurrency < translationTasks.length) {
            console.log(chalk.gray(`⏳ 批次间延迟 1 秒...`));
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      } else {
        console.log(chalk.blue(`📝 使用顺序翻译模式`));
        
        // 顺序执行
        for (const { filePath, targetLang } of translationTasks) {
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