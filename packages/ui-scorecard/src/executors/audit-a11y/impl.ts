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

/**
 * Gets the Code Owner mappings for a target path by filtering the code owners file
 * @param targetPath string - Filter for code owners
 * @param codeOwnerFilePath? string - Path to code owners file
 * @returns Filtered CodeOwnerObject
 */
async function getCodeOwnerMapping(targetPath: string, codeOwnerFilePath?: string) {
  const defaultCodeOwnerFilePath = '.github/CODEOWNERS';

  const filteredCodeOwners = await FilesParser.readAndFilterCodeOwnersFile(
    codeOwnerFilePath || defaultCodeOwnerFilePath,
    targetPath,
  );

  return filteredCodeOwners;
}

async function getTestFilePathsForAudit(filesParser: FilesParser, pathsToGetTestsFor?: string[]) {
  // Note: We need to get all the file paths in the project.
  // Otherwise this.filePaths will be an empty array thus nothing to filter.
  let allFilesParser: FilesParser = await filesParser.allFilePathsInProject();

  if (pathsToGetTestsFor) {
    allFilesParser = await filesParser.filterByProvidedPaths(pathsToGetTestsFor);
  }
  const testFilePaths = allFilesParser.filterTestFiles().removeNonComponentFiles().getFilePaths;
  return testFilePaths;
}

async function runAudit({
  a11yLogger,
  jestArgs,
  task,
  skipAccessibleTest = true,
}: {
  a11yLogger: A11yLogger;
  jestArgs: string[];
  task: Task;
  skipAccessibleTest?: boolean;
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

  /**
   * Skip running a11y tests because the a11y engine depends on jest coverage, we first run the unit tests.
   * we can safely assume those tests passed before hitting this point.
   */
  if (!skipAccessibleTest) {
    await a11yLogger.logAccessibleTestsJestOutput(jestArgs);
  }

  a11yLogger.logTotalNumberOfPassingToBeAccessibleTests(skipAccessibleTest);

  await a11yLogger.logCodeOwner();
  await a11yLogger.logAutomatedA11yScore();
}

async function sleep(ms: number): Promise<void> {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function initializeAnalytics(options: TestOptions) {
  init({
    // client-analytics batches events, we batch events every 5 seconds
    // https://frontend.cbhq.net/analytics/quick-start#sdk-configs
    // Max period in milliseconds to wait for next batch
    batchEventsPeriod: 5000,
    isProd: options.sendEventsToProd,
    platform: PlatformName.ios,
    projectName: options.eventProjectName,
    showDebugLogging: options.debugEvents,
    onError: (error) => logError(String(error)),
    version: '1.0.0',
  });
}

async function sendScores(
  options: TestOptions,
  {
    automatedA11yScore,
    a11yScore,
    jestScore,
    totalNumberOfComponentsWithTest,
    totalNumberOfPassingToBeAccessibleTests,
    codeOwner,
  }: A11yLogType,
) {
  logVerbose({
    event: {
      eventName: 'accessibility_score',
      projectName: options.eventProjectName,
      action: ActionType.measurement,
      componentType: ComponentType.unknown,
      automatedA11yScore,
      a11yScore,
      jestScore,
      totalNumberOfComponentsWithTest,
      totalNumberOfPassingToBeAccessibleTests,
      codeOwner,
    },
  });

  logEvent(
    'accessibility_score',
    {
      action: ActionType.measurement,
      componentType: ComponentType.unknown,
      automatedA11yScore,
      a11yScore: a11yScore ?? null,
      jestScore: jestScore ?? null,
      totalNumberOfComponentsWithTest,
      totalNumberOfPassingToBeAccessibleTests,
      codeOwner: codeOwner ?? null,
    },
    AnalyticsEventImportance.high,
  );

  // delay that gives enough time to send event
  await sleep(1000);
}

function constructJestArgs(options: TestOptions, task: Task): string[] {
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

  return args;
}

function handleJestConfig(args: string[], task: Task): void {
  const projectConfig = task.projectRoot.append('jest.config.js');

  if (projectConfig.exists()) {
    args.unshift('--config', './jest.config.js');
  } else {
    args.unshift('--preset', '@cbhq/jest-preset-mobile');
  }
}

async function processLoggingAndScoring(
  options: TestOptions,
  a11yLogger: A11yLogger,
  fileWriter: FileWriter,
) {
  if (options.eventProjectName) {
    await sendScores(options, a11yLogger.getLog);
  }

  fileWriter.writeA11yLogToOutDir({ log: a11yLogger.getLog });
}

async function processAudit(
  a11yLogger: A11yLogger,
  options: TestOptions,
  args: string[],
  task: Task,
) {
  await runAudit({
    a11yLogger,
    jestArgs: args,
    task,
    skipAccessibleTest: options.skipAccessibleTest,
  });

  if (options.includeZeroCoverageAudit) {
    a11yLogger.logComponentsWithZeroCoverage();
  }
}

async function processWithTargetPath(
  options: TestOptions,
  task: Task,
  args: string[],
  fileWriter: FileWriter,
  filesParser: FilesParser,
  targetPath: string,
  codeOwnerFilePath?: string,
) {
  const filteredCodeOwnersObject = await getCodeOwnerMapping(targetPath, codeOwnerFilePath);
  if (filteredCodeOwnersObject?.codeOwners) {
    await Promise.all(
      filteredCodeOwnersObject.codeOwners.map(async (codeOwnerObjEntry) => {
        const testFilePaths = await getTestFilePathsForAudit(filesParser, codeOwnerObjEntry.paths);
        const a11yLogger = new A11yLogger(task, testFilePaths, codeOwnerObjEntry);
        await processAudit(a11yLogger, options, args, task);
        await processLoggingAndScoring(options, a11yLogger, fileWriter);
      }),
    );
  }
}

async function processWithoutTargetPath(
  options: TestOptions,
  task: Task,
  args: string[],
  fileWriter: FileWriter,
  filesParser: FilesParser,
) {
  const testFilePaths = await getTestFilePathsForAudit(filesParser);
  const a11yLogger = new A11yLogger(task, testFilePaths);
  await processAudit(a11yLogger, options, args, task);
  await processLoggingAndScoring(options, a11yLogger, fileWriter);
}

const audit = createTask<TestOptions>('audit', async (task, options) => {
  try {
    // Initialize configurations and utilities
    const args = constructJestArgs(options, task);
    handleJestConfig(args, task);
    await initializeAnalytics(options);

    const { targetPath, codeOwnerFilePath } = options;
    const fileWriter = new FileWriter(task);
    const filesParser = new FilesParser(task);

    // Audit based on targetPath or general audit
    if (targetPath) {
      await processWithTargetPath(
        options,
        task,
        args,
        fileWriter,
        filesParser,
        targetPath,
        codeOwnerFilePath,
      );
    } else {
      await processWithoutTargetPath(options, task, args, fileWriter, filesParser);
    }
  } catch (error) {
    logError(color.failure(error));
  }

  return task.exec('echo', [`Finished auditing a11y log for ${task.projectName}`]);
});

export default audit;
