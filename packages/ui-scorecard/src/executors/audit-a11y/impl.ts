import {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
  init,
  logEvent,
  PlatformName,
} from '@cbhq/client-analytics';
import { color, createTask, logError, logVerbose } from '@cbhq/mono-tasks';

import { A11yLogger } from './A11yLogger';
import { FilesParser } from './FilesParser';
import { FileWriter } from './FileWriter';
import { Task } from './TestTask';
import { A11yLogType, TestOptions } from './types';

/**
 * This is main file. This is what the executor will run
 * when you run ```yarn nx run <project-name>:audit-a11y```
 */

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

  // await a11yLogger.logComponentsMissingA11yCoverage(jestArgs);
  a11yLogger.logTotalNumberOfComponentTests();
  a11yLogger.logTotalNumberOfToBeAccessibleTests();
  a11yLogger.logTestFilesWithToBeAccessible();
  a11yLogger.logTestFilesWithoutToBeAccessible();
  a11yLogger.logCoverageSummaryTotal();

  await a11yLogger.logComponents();
  await a11yLogger.logTotalNumberOfComponents();

  await a11yLogger.logComponentsWithTest();
  await a11yLogger.logTotalNumberOfComponentsWithTest();

  console.log(
    color.project(`\nStart running and capturing test results for tests that have toBeAccessible`),
  );

  await a11yLogger.logAccessibleTestsJestOutput(jestArgs);

  a11yLogger.logTotalNumberOfPassingToBeAccessibleTests();

  await a11yLogger.logAutomatedA11yScore();
}

async function sleep(ms: number): Promise<void> {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendScores(options: TestOptions, { automatedA11yScore }: A11yLogType) {
  init({
    // client-analytics batches events, we want to send them as fast as possible
    // https://frontend.cbhq.net/analytics/quick-start#sdk-configs
    batchEventsPeriod: 0,
    isProd: options.sendEventsToProd,
    platform: PlatformName.ios,
    projectName: options.eventProjectName,
    showDebugLogging: options.debugEvents,
    onError: (error) => logError(String(error)),
    version: '1.0.0',
  });

  logVerbose({
    event: {
      eventName: 'accessibility_score',
      projectName: options.eventProjectName,
      action: ActionType.measurement,
      componentType: ComponentType.unknown,
      automatedA11yScore,
    },
  });

  logEvent(
    'accessibility_score',
    {
      action: ActionType.measurement,
      componentType: ComponentType.unknown,
      automatedA11yScore,
    },
    AnalyticsEventImportance.high,
  );

  // delay that gives enough time to send event
  await sleep(1000);
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

  if (options.eventProjectName) {
    await sendScores(options, a11yLogger.getLog);
  }

  fileWriter.writeA11yLogToOutDir({ log: a11yLogger.getLog });

  return task.exec('echo', [`Finished auditing a11y log for ${task.projectName} workspace`]);
});

export default audit;
