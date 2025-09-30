import { FileProcessor } from '../../core/file-processor.js';
import { getLogger } from '../logger.js';
import { getUI } from '../ui.js';

/**
 * 状态命令处理器 - 显示翻译状态
 */
export async function statusCommand(options, config) {
  const logger = getLogger();
  const ui = getUI();

  try {
    ui.showTitle('翻译状态', '📊');

    const fileProcessor = new FileProcessor(config);

    // 获取所有源文件
    const allFiles = await fileProcessor.getFilesToTranslate({
      incremental: false
    });

    logger.info(`找到 ${allFiles.length} 个源文件`);

    // 分析翻译状态
    const stats = {
      total: allFiles.length,
      byLanguage: {}
    };

    config.targetLanguages.forEach(lang => {
      stats.byLanguage[lang] = {
        translated: 0,
        outdated: 0,
        missing: 0
      };
    });

    // 检查每个文件的翻译状态
    for (const sourceFile of allFiles) {
      for (const lang of config.targetLanguages) {
        const targetFile = fileProcessor.getTargetFilePath(sourceFile, lang);

        try {
          const fs = await import('fs/promises');
          const sourceStats = await fs.stat(sourceFile);
          const targetStats = await fs.stat(targetFile);

          if (sourceStats.mtime > targetStats.mtime) {
            stats.byLanguage[lang].outdated++;
          } else {
            stats.byLanguage[lang].translated++;
          }
        } catch {
          stats.byLanguage[lang].missing++;
        }
      }
    }

    // 显示统计信息
    if (options.json) {
      console.log(JSON.stringify(stats, null, 2));
      return;
    }

    // 总体统计
    ui.showSubtitle('总体统计');
    ui.showKeyValueList({
      '源文件总数': stats.total,
      '目标语言': config.targetLanguages.join(', ')
    });

    // 按语言统计
    ui.newline();
    ui.showSubtitle('各语言翻译状态');

    const table = ui.createTable(['语言', '已翻译', '需更新', '未翻译', '完成度']);

    config.targetLanguages.forEach(lang => {
      const langStats = stats.byLanguage[lang];
      const completion = ((langStats.translated / stats.total) * 100).toFixed(1);

      table.push([
        lang.toUpperCase(),
        langStats.translated,
        langStats.outdated,
        langStats.missing,
        `${completion}%`
      ]);
    });

    console.log(table.toString());

    // 显示需要更新的文件
    if (options.verbose) {
      ui.newline();
      ui.showSubtitle('需要更新的文件');

      const needsUpdate = [];

      for (const sourceFile of allFiles) {
        for (const lang of config.targetLanguages) {
          const shouldTranslate = await fileProcessor.shouldTranslateFile(sourceFile);
          if (shouldTranslate) {
            needsUpdate.push({
              file: fileProcessor.getRelativePath(sourceFile),
              language: lang
            });
          }
        }
      }

      if (needsUpdate.length > 0) {
        const updateTable = ui.createTable(['文件', '语言']);
        needsUpdate.forEach(({ file, language }) => {
          updateTable.push([file, language.toUpperCase()]);
        });
        console.log(updateTable.toString());
      } else {
        ui.showSuccess('所有文件都是最新的!');
      }
    }

    logger.info('状态查询完成');
  } catch (error) {
    logger.error('状态命令执行失败', { message: error.message });
    ui.showError(error.message, '执行失败');
    throw error;
  }
}

export default statusCommand;