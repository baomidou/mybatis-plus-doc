import { Listr } from 'listr2';
import { TranslationPlugin } from '../../core/translator.js';
import { FileProcessor } from '../../core/file-processor.js';
import { getLogger } from '../logger.js';
import { getUI } from '../ui.js';
import { getPrompts } from '../prompts.js';

/**
 * 翻译命令处理器
 */
export async function translateCommand(options, config) {
  const logger = getLogger();
  const ui = getUI();
  const prompts = getPrompts();

  try {
    // 显示欢迎信息
    if (!options.quiet && !options.json) {
      ui.showWelcome('2.0.0');
    }

    // 初始化翻译器和文件处理器
    const fileProcessor = new FileProcessor(config);
    const translator = new TranslationPlugin(config);

    // 确定目标语言
    const targetLanguages = options.lang ? [options.lang] : config.targetLanguages;

    logger.info(`目标语言: ${targetLanguages.join(', ')}`);

    // 获取需要翻译的文件
    const filesToTranslate = await fileProcessor.getFilesToTranslate({
      specificFile: options.file,
      incremental: options.incremental
    });

    logger.info(`找到 ${filesToTranslate.length} 个文件需要翻译`);

    if (filesToTranslate.length === 0) {
      ui.showInfo('没有找到需要翻译的文件');
      return;
    }

    // 预览模式
    if (options.dryRun) {
      ui.showTitle('预览模式 - 待翻译文件');
      ui.showFileListTable(
        filesToTranslate.map(f => fileProcessor.getRelativePath(f)),
        targetLanguages
      );
      return;
    }

    // 显示翻译摘要并确认（非强制模式）
    if (!options.yes && !options.quiet) {
      const confirmed = await prompts.showSummaryAndConfirm({
        files: filesToTranslate,
        languages: targetLanguages,
        provider: config.aiProvider?.providerName || 'default',
        mode: options.incremental ? '增量' : '全量',
        parallel: config.parallel?.enabled,
        maxConcurrency: config.parallel?.maxConcurrency
      });

      if (!confirmed) {
        logger.info('用户取消翻译');
        return;
      }
    }

    // 创建翻译任务
    const translationTasks = [];
    for (const filePath of filesToTranslate) {
      for (const targetLang of targetLanguages) {
        translationTasks.push({ filePath, targetLang });
      }
    }

    logger.info(`总共 ${translationTasks.length} 个翻译任务`);

    // 统计数据
    const stats = {
      total: translationTasks.length,
      success: 0,
      failed: 0,
      skipped: 0,
      startTime: Date.now(),
      results: []
    };

    // 根据配置决定是否并行执行
    const { parallel } = config;
    if (parallel?.enabled && translationTasks.length > 1) {
      await translateWithListr(translationTasks, translator, fileProcessor, parallel, stats, options);
    } else {
      await translateSequential(translationTasks, translator, fileProcessor, stats, options);
    }

    // 显示结果
    stats.endTime = Date.now();
    stats.duration = ((stats.endTime - stats.startTime) / 1000).toFixed(2);

    showResults(stats, options);

  } catch (error) {
    logger.error('翻译命令执行失败', { message: error.message, stack: error.stack });
    ui.showError(error.message, '翻译失败');
    throw error;
  }
}

/**
 * 使用 Listr2 并行翻译
 */
async function translateWithListr(tasks, translator, fileProcessor, parallelConfig, stats, options) {
  const logger = getLogger();
  const maxConcurrency = parallelConfig.maxConcurrency || 3;

  logger.info(`启用并行翻译模式，最大并发数: ${maxConcurrency}`);

  // 创建 Listr 任务列表
  const listr = new Listr(
    tasks.map(({ filePath, targetLang }) => ({
      title: `${fileProcessor.getRelativePath(filePath)} → ${targetLang.toUpperCase()}`,
      task: async (ctx, task) => {
        const startTime = Date.now();

        try {
          await translator.translateFile(filePath, targetLang);

          const duration = ((Date.now() - startTime) / 1000).toFixed(2);

          stats.success++;
          stats.results.push({
            file: fileProcessor.getRelativePath(filePath),
            language: targetLang,
            success: true,
            duration
          });

          task.title = `${fileProcessor.getRelativePath(filePath)} → ${targetLang.toUpperCase()} ✓ (${duration}s)`;
        } catch (error) {
          stats.failed++;
          stats.results.push({
            file: fileProcessor.getRelativePath(filePath),
            language: targetLang,
            success: false,
            error: error.message
          });

          throw new Error(`翻译失败: ${error.message}`);
        }
      },
      retry: options.retry || 0
    })),
    {
      concurrent: maxConcurrency,
      exitOnError: !options.continueOnError,
      rendererOptions: {
        collapse: false,
        showTimer: true,
        showSubtasks: true
      },
      // 静默模式或 JSON 模式使用简单渲染器
      renderer: options.quiet || options.json ? 'silent' : 'default'
    }
  );

  try {
    await listr.run();
  } catch (error) {
    logger.error('部分翻译任务失败', { message: error.message });
  }
}

/**
 * 顺序翻译
 */
async function translateSequential(tasks, translator, fileProcessor, stats, options) {
  const logger = getLogger();
  const ui = getUI();

  logger.info('使用顺序翻译模式');

  for (let i = 0; i < tasks.length; i++) {
    const { filePath, targetLang } = tasks[i];
    const relativePath = fileProcessor.getRelativePath(filePath);

    if (!options.quiet && !options.json) {
      ui.showProgress(i + 1, tasks.length, `${relativePath} → ${targetLang}`);
    }

    const startTime = Date.now();

    try {
      await translator.translateFile(filePath, targetLang);

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);

      stats.success++;
      stats.results.push({
        file: relativePath,
        language: targetLang,
        success: true,
        duration
      });

      logger.info(`✓ ${relativePath} → ${targetLang} (${duration}s)`);
    } catch (error) {
      stats.failed++;
      stats.results.push({
        file: relativePath,
        language: targetLang,
        success: false,
        error: error.message
      });

      logger.error(`✗ ${relativePath} → ${targetLang}: ${error.message}`);

      if (!options.continueOnError) {
        throw error;
      }
    }
  }
}

/**
 * 显示翻译结果
 */
function showResults(stats, options) {
  const logger = getLogger();
  const ui = getUI();

  // JSON 格式输出
  if (options.json) {
    console.log(JSON.stringify({
      success: stats.failed === 0,
      stats: {
        total: stats.total,
        success: stats.success,
        failed: stats.failed,
        duration: stats.duration
      },
      results: stats.results
    }, null, 2));
    return;
  }

  // 普通格式输出
  if (!options.quiet) {
    ui.newline();
    ui.showTitle('翻译完成', '🎉');

    // 显示统计信息
    ui.showStatsTable({
      '总任务数': stats.total,
      '成功': stats.success,
      '失败': stats.failed,
      '总耗时': `${stats.duration}秒`
    });

    // 显示详细结果
    if (stats.results.length > 0) {
      ui.newline();
      ui.showSubtitle('详细结果');
      ui.showResultsTable(stats.results);
    }

    // 显示成功或失败消息
    if (stats.failed === 0) {
      ui.showSuccess(`所有 ${stats.total} 个任务成功完成!`);
    } else {
      ui.showWarning(
        `${stats.success} 个任务成功, ${stats.failed} 个任务失败`,
        '部分失败'
      );
    }
  }

  // 日志记录
  logger.info('翻译完成', {
    total: stats.total,
    success: stats.success,
    failed: stats.failed,
    duration: stats.duration
  });
}

export default translateCommand;