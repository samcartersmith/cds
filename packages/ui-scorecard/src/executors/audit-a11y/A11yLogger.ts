import { performance } from 'node:perf_hooks';
import { color, logDebug, logError, logSuccess } from '@cbhq/mono-tasks';

import { A11yAuditor } from './A11yAuditor';
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
  printComponentsWithTests?: boolean;
  printComponents?: boolean;
  logToConsole?: boolean;
};

export class A11yLogger extends TestTask {
  private log: A11yLogType;

  private filePaths: string[];

  private jestCoverageLogger: JestCoverageLogger;

  private a11yAuditor: A11yAuditor;

  constructor(task: Task, filePaths: string[] = []) {
    super(task);

    this.log = {
      timestamp: new Date(),
      totalNumberOfComponentTests: 0,
      totalNumberOfToBeAccessibleTests: 0,
      totalNumberOfPassingToBeAccessibleTests: 0,
      testFilesWithoutToBeAccessibleTest: [],
      testDetails: {},
      projectMetadata: {
        projectName: task.projectName,
        projectPath: task.projectPath,
        githubURL: process.env.BUILDKITE_REPO,
      },
      componentsWithZeroCoverage: 'unknown',
      testFilesWithToBeAccessibleTest: [],
      componentsWithoutToBeAccessibleTest: [],
      components: [],
      totalNumberOfComponents: 0,
      componentsWithTest: [],
      totalNumberOfComponentsWithTest: 0,
    };

    this.filePaths = filePaths;

    this.jestCoverageLogger = new JestCoverageLogger(this.getTask);

    this.a11yAuditor = new A11yAuditor(this.getTask);
  }

  get getLog(): A11yLogType {
    return this.log;
  }

  static logFunctionAndDuration(functionName: string, elapsed: number) {
    logSuccess(`Logged ${functionName} - ${color.shell(`duration: [${elapsed / 1000}s]`)}`);
  }

  public async logComponentsWithTest({
    printComponentsWithTests = false,
  }: Pick<DebugOptions, 'printComponentsWithTests'> = {}) {
    const start = performance.now();
    let componentsWithTest = [];

    if (this.log.components.length > 0) {
      componentsWithTest = await this.a11yAuditor.getComponentsWithTestList({
        components: this.log.components,
      });
    } else {
      componentsWithTest = await this.a11yAuditor.getComponentsWithTestList();
    }

    if (printComponentsWithTests) {
      console.log(componentsWithTest);
    }

    this.log.componentsWithTest = componentsWithTest;

    const elapsed = performance.now() - start;

    A11yLogger.logFunctionAndDuration('componentsWithTest', elapsed);
  }

  public async logTotalNumberOfComponentsWithTest() {
    const start = performance.now();

    if (this.log.componentsWithTest.length > 0) {
      this.log.totalNumberOfComponentsWithTest = this.log.componentsWithTest.length;
    } else {
      const componentsWithTest = await this.a11yAuditor.getComponentsWithTestList();
      this.log.totalNumberOfComponentTests = componentsWithTest.length;
    }

    const elapsed = performance.now() - start;

    A11yLogger.logFunctionAndDuration('totalNumberOfComponentsWithTest', elapsed);
  }

  public logTotalNumberOfPassingToBeAccessibleTests() {
    const start = performance.now();

    if (Object.keys(this.log.testDetails).length <= 0) {
      throw new Error(
        'Due to the how expensive it is to run jest tests, please first run logAccessibleTestsJestOutput before running logTotalNumberOfPassingToBeAccessibleTests.',
      );
    }

    this.log.totalNumberOfPassingToBeAccessibleTests =
      A11yAuditor.getTotalNumberOfPassingToBeAccessibleTests(this.log.testDetails);

    const elapsed = performance.now() - start;

    A11yLogger.logFunctionAndDuration('totalNumberOfPassingToBeAccessibleTests', elapsed);
  }

  public async logComponents({
    printComponents = false,
  }: Pick<DebugOptions, 'printComponents'> = {}) {
    const start = performance.now();

    const components = await this.a11yAuditor.getComponentsList();

    if (printComponents) {
      console.log(components);
    }

    this.log.components = components;

    const elapsed = performance.now() - start;

    A11yLogger.logFunctionAndDuration('getListOfComponents', elapsed);
  }

  public async logTotalNumberOfComponents() {
    const start = new Date().getTime();

    const components = await this.a11yAuditor.getComponentsList();
    this.log.totalNumberOfComponents = components.length;

    const elapsed = new Date().getTime() - start;

    A11yLogger.logFunctionAndDuration('totalNumberOfComponents', elapsed);
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
   * This function is responsible for running a batch of tests using the jest
   * runner. We will then parse these output and log it into testDetails of the
   * log
   */
  public async logAccessibleTestBatchJestOutput({
    filePaths,
    args,
    logToConsole = true,
  }: {
    filePaths: string[];
    args: string[];
  } & Pick<DebugOptions, 'logToConsole'>) {
    const testRunner = new TestRunner(this.getTask);

    const execResult = await testRunner.runJest([...args, '--forceExit', ...filePaths]);

    if (logToConsole) {
      console.log(execResult.stderr);
    }

    const passDelimiter = '\u001b[0m\u001b[7m\u001b[1m\u001b[32m PASS ';

    // Currently, the execResult.stderr is a really large text with all the results of the tests. We need to split them up such that each test has its own output. As long as there is a PASS, it means it is a new test.
    const stderrForEachTest = execResult.stderr.split(passDelimiter);

    // Strip out the first value in the array as that is an empty string
    stderrForEachTest.shift();

    stderrForEachTest.forEach((stderr) => {
      const projectNameDelimiter = `[37m ${this.getTask.projectName} \u001b[39m\u001b[27m\u001b[0m`;

      const stderrWithProjectNameRemoved = stderr.split(projectNameDelimiter);

      // Some tests include the project name while some don't.
      // On our repo, the project name is included. On retail, it is not
      // So we check whether the project name is there, if it is, strip it out,
      // if it isn't, we do nothing.
      // We then only obtain strings that showed up before the first next line
      const unsanitizedFilePath =
        stderrWithProjectNameRemoved[stderrWithProjectNameRemoved.length > 1 ? 1 : 0].split(
          '\n',
        )[0];

      // We need to strip away the colors (they are the unicode values which make it look pretty in the console), and the time it took to run the test if it exist.
      // original input may look something like this: \u001b[39m\u001b[22m\u001b[27m\u001b[0m \u001b[2m src/components/AccountChecklistV2/Carousel/\u001b[22m\u001b[1mCarousel.test.tsx\u001b[22m\n  \u001b\u001b[2m:15:22)\u001b
      // Converting it into ansi will turn it into something like this:
      // /components/AccountChecklistV2/Carousel/<grey><intent>Carousel.test.tsx<gray>(<red>2m:15:22</red>)
      // When turned into an ansi form, we can easily strip out any brackets like this <>, (). We also need to strip out white spaces
      // It is much easier to remove those color and non file path values when converted into the pretty form. Hence, the conversion was necessary
      const filePathBeingTested = ansiToHumanText(unsanitizedFilePath)
        .replaceAll(/<.*?>/g, '')
        .replaceAll(/\(.*?\)/g, '')
        .replaceAll(/\s/g, '');

      let status: 'passed' | 'failed' = 'passed';

      // We only consider it failing if it contains the following regex pattern  /.*pathToComponent:.*problem:.*solution:.*link:.*/}.

      // There may be times when there are other console.error errors, but are not A11y VIOLATION, therefore this check is important to capture failures that are specific to A11y
      if (stderr.match(/.*pathToComponent:.*problem:.*solution:.*link:.*/) != null) {
        status = 'failed';
      }

      this.log.testDetails[filePathBeingTested] = {
        status,
        message: passDelimiter + stderr,
      };
    });
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

    if (this.log.testFilesWithToBeAccessibleTest.length <= 0) {
      throw new Error(
        'To reduce computational time, please run A11yLogger.logTestFilesWithToBeAccessibleTest() to obtain the a list of test files with toBeAccessible before running this command',
      );
    }

    await this.logAccessibleTestBatchJestOutput({
      filePaths: this.log.testFilesWithToBeAccessibleTest,
      args,
    });
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

    const componentsWithoutTestFiles = A11yAuditor.getComponentsMissingTestFiles(
      testFiles,
      relatedFiles,
    );

    const componentsWithoutToBeAccessibleTest =
      await this.a11yAuditor.getComponentsMissingA11yCoverage({
        componentsWithoutTestFiles,
        testFilesWithToBeAccessibleTest: this.log.testFilesWithToBeAccessibleTest,
        jestArgs,
      });

    this.log.componentsWithoutToBeAccessibleTest = componentsWithoutToBeAccessibleTest;

    const elapsed = new Date().getTime() - start;

    A11yLogger.logFunctionAndDuration('componentsWithoutToBeAccessibleTest', elapsed);
  }
}
