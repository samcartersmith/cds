import { color, logDebug, logError, logSuccess } from '@cbhq/mono-tasks';

import { ASTParser } from './ASTParser';
import { FilesParser } from './FilesParser';
import { ansiToHumanText } from './FormatUtils';
import { JestCoverageLogger } from './JestCoverageLogger';
import { TestRunner } from './TestRunner';
import { Task, TestTask } from './TestTask';
import { A11yLogType } from './types';

type DebugOptions = {
  printComponentTestFiles?: boolean;
  printTestFilesWithToBeAccessible?: boolean;
  printTestFilesWithoutToBeAccessibleTest?: boolean;
  logToConsole?: boolean;
};

export class A11yLogger extends TestTask {
  private log: A11yLogType;

  private filePaths: string[];

  private jestCoverageLogger: JestCoverageLogger;

  private testRunner: TestRunner;

  constructor(task: Task, filePaths: string[] = []) {
    super(task);

    this.log = {
      timestamp: new Date(),
      totalNumberOfComponentTests: 0,
      totalNumberOfToBeAccessibleTests: 0,
      testFilesWithoutToBeAccessibleTest: [],
      testDetails: {},
      projectMetadata: {
        projectName: task.projectName,
        projectPath: task.projectPath,
        // this disable is necessary for accessible repo variable in buildkite execution
        // eslint-disable-next-line no-restricted-globals
        githubURL: process.env.BUILDKITE_REPO,
      },
      componentsWithZeroCoverage: 'unknown',
      testFilesWithToBeAccessibleTest: [],
      componentsWithoutToBeAccessibleTest: [],
    };

    this.filePaths = filePaths;

    this.jestCoverageLogger = new JestCoverageLogger(this.getTask);

    this.testRunner = new TestRunner(this.getTask);
  }

  get getLog(): A11yLogType {
    return this.log;
  }

  static logFunctionAndDuration(functionName: string, elapsed: number) {
    logSuccess(`Logged ${functionName} - ${color.shell(`duration: [${elapsed / 1000}s]`)}`);
  }

  public logTotalNumberOfComponentTests({
    printComponentTestFiles = false,
  }: Pick<DebugOptions, 'printComponentTestFiles'> = {}) {
    const start = new Date().getTime();

    const astParser = new ASTParser(this.filePaths);

    this.filePaths.forEach((filePath) => {
      // Heuristically speaking. If the AST contains a
      // render Identifier, it is very likely that it is a Component
      // because Hooks will use renderHook instead
      if (astParser.hasRenderIdentifier(filePath)) {
        this.log.totalNumberOfComponentTests += 1;

        if (printComponentTestFiles) {
          logDebug(`${filePath} is a test file for a component`);
        }
      }
    });

    const elapsed = new Date().getTime() - start;

    A11yLogger.logFunctionAndDuration('totalNumberOfComponentTests', elapsed);
  }

  public logTotalNumberOfToBeAccessibleTests() {
    const start = new Date().getTime();

    const astParser = new ASTParser(this.filePaths);

    this.filePaths.forEach((filePath) => {
      // Heuristically speaking. If the AST contains a
      // render Identifier, it is very likely that it is a Component
      // because Hooks will use renderHook instead
      if (astParser.hasToBeAccessible(filePath)) {
        this.log.totalNumberOfToBeAccessibleTests += 1;
      }
    });

    const elapsed = new Date().getTime() - start;

    A11yLogger.logFunctionAndDuration('totalNumberOfToBeAccessibleTests', elapsed);
  }

  public logTestFilesWithToBeAccessible({
    printTestFilesWithToBeAccessible,
  }: Pick<DebugOptions, 'printTestFilesWithToBeAccessible'> = {}) {
    const start = new Date().getTime();

    const astParser = new ASTParser(this.filePaths);

    this.filePaths.forEach((filePath) => {
      // Heuristically speaking. If the AST contains a
      // render Identifier, it is very likely that it is a Component
      // because Hooks will use renderHook instead
      if (astParser.hasToBeAccessible(filePath)) {
        this.log.testFilesWithToBeAccessibleTest.push(filePath);

        if (printTestFilesWithToBeAccessible) {
          logDebug(`${filePath} is a test file that contains  toBeAccessible test matcher`);
        }
      }
    });

    const elapsed = new Date().getTime() - start;

    A11yLogger.logFunctionAndDuration('testFilesWithToBeAccessibleTest', elapsed);
  }

  public logTestFilesWithoutToBeAccessible({
    printTestFilesWithoutToBeAccessibleTest = false,
  }: Pick<DebugOptions, 'printTestFilesWithoutToBeAccessibleTest'> = {}) {
    const start = new Date().getTime();

    const astParser = new ASTParser(this.filePaths);

    this.filePaths.forEach((filePath) => {
      // Heuristically speaking. If the AST contains a
      // render Identifier, it is very likely that it is a Component
      // because Hooks will use renderHook instead
      if (!astParser.hasToBeAccessible(filePath)) {
        this.log.testFilesWithoutToBeAccessibleTest.push(filePath);

        if (printTestFilesWithoutToBeAccessibleTest) {
          logDebug(`${filePath} is a test file that does not contain toBeAccessible test matcher`);
        }
      }
    });

    const elapsed = new Date().getTime() - start;

    A11yLogger.logFunctionAndDuration('testFilesWithoutToBeAccessibleTest', elapsed);
  }

  /**
   * This is one of the few exceptions where we will do
   * two things in a function. Its much less readable, but
   * this is for performance reason. This way, we don't have to
   * run the test two times.
   * @param param0
   */
  public async logAccessibleTestJestOutput({
    filePath,
    args,
    logToConsole = true,
  }: {
    filePath: string;
    args: string[];
  } & Pick<DebugOptions, 'logToConsole'>) {
    const testRunner = new TestRunner(this.getTask);

    if (!this.log.testFilesWithToBeAccessibleTest.includes(filePath)) {
      logDebug(
        `Skipping, test does not have a11y coverage or is not testing a component: ${color.file(
          filePath,
        )}`,
      );
      return;
    }

    const execResult = await testRunner.runJest([...args, '--forceExit', filePath]);

    if (logToConsole) {
      console.log(execResult.stdout);
      console.log(execResult.stderr);
    }

    // When a jest test has a warning, it will output
    // the result to stderr, and stdout will be empty.
    // Its a bit of a weird design
    // To make it more readable, I created a function here
    // to state what this means
    const testTriggeredWarning = execResult.stdout !== '';

    // Only add the output log if it fails or test results in console.warn,
    // otherwise, just return success.
    // Reason: output gets really long, so this will optimize space usage
    if (execResult.failed || testTriggeredWarning) {
      execResult.stdout = ansiToHumanText(execResult.stdout);
      execResult.stderr = ansiToHumanText(execResult.stderr);

      this.log.testDetails[filePath] = execResult;
    } else {
      this.log.testDetails[filePath] = { success: true };
    }
  }

  // There is subtle different between this function, and
  // logAccessibleTestJestOutput.
  // This logs jestOutput for all filePaths
  // logAccessibleTestJestOutput will only log for one filePath
  public async logAccessibleTestsJestOutput(args: string[]) {
    /**
     * Running jest on files that have toBeAccessible tests. If printed, it
     * means it was skipped. It could be because it does not have toBeAccessible
     */
    await Promise.all(
      this.filePaths.map(async (filePath) =>
        this.logAccessibleTestJestOutput({
          filePath,
          args,
        }),
      ),
    );
  }

  public logCoverageSummaryTotal() {
    const start = new Date().getTime();

    const coverageSummaryJSON = this.jestCoverageLogger.getCoverageSummaryJSON();

    if (Object.keys(coverageSummaryJSON).length > 0) {
      this.log.jestCoverage = coverageSummaryJSON.total;
    } else {
      logError('Coverage summary is empty. Nothing to log to jestCoverageSymmary');
    }

    const elapsed = new Date().getTime() - start;

    A11yLogger.logFunctionAndDuration('coverageSummaryTotal', elapsed);
  }

  public logComponentsWithZeroCoverage() {
    const start = new Date().getTime();

    this.log.componentsWithZeroCoverage = this.jestCoverageLogger.auditZeroJestCoverage();

    const elapsed = new Date().getTime() - start;

    A11yLogger.logFunctionAndDuration('componentsWithZeroCoverage', elapsed);
  }

  static getComponentsMissingTestFiles(testFiles: string[], relatedFiles: string[]): string[] {
    const difference = relatedFiles.filter((cmptFile) => {
      const baseFileName = cmptFile.split('/')[cmptFile.split('/').length - 1];
      const componentNameWithoutSuffix = baseFileName.split('.')[0];
      const indexOfTestFile = testFiles.findIndex((file) =>
        file.includes(`${componentNameWithoutSuffix}.test.tsx`),
      );

      return indexOfTestFile === -1;
    });

    return difference;
  }

  public async auditComponentsMissingA11yCoverage({
    componentsWithoutTestFiles,
    testFilesWithToBeAccessibleTest,
    jestArgs,
  }: {
    componentsWithoutTestFiles: string[];
    testFilesWithToBeAccessibleTest: string[]; // files from log that have a11y coverage via tests
    jestArgs: string[];
  }): Promise<string[]> {
    const componentsWithoutToBeAccessibleTest: string[] = [];

    await Promise.all(
      componentsWithoutTestFiles.map(async (missingFileName: string) => {
        // this is necessary to get the relative path name to correctly execute jest command on file path
        const removePackageName = missingFileName.split(`${this.getTask.projectPath}/`)[1];
        const args = [
          ...jestArgs,
          '--findRelatedTests', // shows tests that cover component coverage
          '--listTests', // this gives the list of tests that would be run without actually running them
          '--color=false',
          'silent=false',
          removePackageName,
        ];

        // call jest --findRelatedFiles --listTests <missingTestFile component>
        const execResult = await this.testRunner.runJest(args);

        // Break down jest output into array
        const arrayOfRelatedTestFiles = execResult.stdout.split(/\r?\n/);

        // Iterate over related tests and see if they have accessibility coverage
        // if tests have coverage (valid index),  missingTestFile has a11y coverage.
        // if tests do not have coverage (index is -1), then assume missingTestFile has no a11y coverage
        const isCovered = arrayOfRelatedTestFiles.filter((relatedTest) => {
          const indexOfAccessibilityTest = testFilesWithToBeAccessibleTest.findIndex(
            (accessibilityTestFilePath) => relatedTest.includes(accessibilityTestFilePath),
          );

          return indexOfAccessibilityTest > -1;
        });

        // No coverage for this component, either directly or from other related components
        if (isCovered.length === 0) {
          componentsWithoutToBeAccessibleTest.push(missingFileName);
        }
      }),
    );

    return componentsWithoutToBeAccessibleTest;
  }

  public async logComponentsMissingA11yCoverage(jestArgs: string[]) {
    const start = new Date().getTime();

    const filesParser = new FilesParser(this.getTask);

    // Obtain component files
    const filesParserForRelatedFiles = await filesParser.allFilePathsInProject();
    const relatedFiles = filesParserForRelatedFiles
      .excludeTestFiles()
      .excludeStories()
      .excludeE2E()
      .excludeNodeModules().getFilePaths;

    // Obtain test files
    const filesParserForTestFiles = await filesParser.allFilePathsInProject();
    const testFiles = filesParserForTestFiles
      .filterTestFiles()
      .removeNonComponentFiles().getFilePaths;

    const componentsWithoutTestFiles = A11yLogger.getComponentsMissingTestFiles(
      testFiles,
      relatedFiles,
    );

    const componentsWithoutToBeAccessibleTest = await this.auditComponentsMissingA11yCoverage({
      componentsWithoutTestFiles,
      testFilesWithToBeAccessibleTest: this.log.testFilesWithToBeAccessibleTest,
      jestArgs,
    });

    this.log.componentsWithoutToBeAccessibleTest = componentsWithoutToBeAccessibleTest;

    const elapsed = new Date().getTime() - start;

    A11yLogger.logFunctionAndDuration('componentsWithoutToBeAccessibleTest', elapsed);
  }
}
