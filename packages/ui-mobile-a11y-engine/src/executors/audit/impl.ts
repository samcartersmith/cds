import { color, createTask } from '@cbhq/mono-tasks';

import { A11yLogger } from './A11yLogger';
import { FilesParser } from './FilesParser';
import { FileWriter } from './FileWriter';
import { Task } from './TestTask';
import { TestOptions } from './types';

async function getTestFilePathsForAudit(task: Task) {
  const filesParser = new FilesParser(task);

  const allFilesParser = await filesParser.allFilePathsInProject();
  const testFilePaths = allFilesParser.filterTestFiles().removeNonComponentFiles().getFilePaths;

  return testFilePaths;
}

async function runAudit({
  a11yLogger,
  jestArgs,
  task,
}: {
  a11yLogger: A11yLogger;
  jestArgs: string[];
  task: Task;
}) {
  console.log(color.project(`Start populating a11y log for project:${task.projectName}`));

  await a11yLogger.logComponentsMissingA11yCoverage(jestArgs);
  a11yLogger.logTotalNumberOfComponentTests();
  a11yLogger.logTotalNumberOfToBeAccessibleTests();
  a11yLogger.logTestFilesWithToBeAccessible();
  a11yLogger.logTestFilesWithoutToBeAccessible();
  a11yLogger.logCoverageSummaryTotal();

  console.log(
    color.project(`\nStart running and capturing test results for tests that have toBeAccessible`),
  );

  await a11yLogger.logAccessibleTestsJestOutput(jestArgs);
}

const audit = createTask<TestOptions>('audit', async (task, options) => {
  const args: string[] = ['--color', '--passWithNoTests'];

  if (options.cache) {
    args.unshift(
      '--cache',
      '--cacheDirectory',
      task.cache.getSharedCachePath('tools/jestTransforms').toString(),
    );
  }

  if (options.debug) {
    args.unshift('--debug', '--detectOpenHandles', '--logHeapUsage');
  }

  if (options.serial) {
    args.unshift('--maxWorkers', '1', '--runInBand');
  }

  // Automatically detect a config in the project, otherwise use the preset
  const projectConfig = task.projectRoot.append('jest.config.js');

  if (projectConfig.exists()) {
    args.unshift('--config', './jest.config.js');
  } else {
    args.unshift('--preset', '@cbhq/jest-preset-mobile');
  }

  const fileWriter = new FileWriter(task);
  const testFilePaths = await getTestFilePathsForAudit(task);

  const a11yLogger = new A11yLogger(task, testFilePaths);

  await runAudit({
    a11yLogger,
    jestArgs: args,
    task,
  });

  if (options.includeZeroCoverageAudit) {
    a11yLogger.logComponentsWithZeroCoverage();
  }

  fileWriter.writeA11yLogToOutDir({ log: a11yLogger.getLog });

  return task.exec('echo', [`Finished auditing a11y log for ${task.projectName} workspace`]);
});

export default audit;
