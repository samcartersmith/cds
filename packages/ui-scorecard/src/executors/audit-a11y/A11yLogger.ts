import { performance } from 'perf_hooks';
import { color, logDebug, logError, logSuccess } from '@cbhq/mono-tasks';

import { A11yAuditor } from './A11yAuditor';
import { ASTParser } from './ASTParser';
import { leadingWordsToRemove } from './constants';
import { FilesParser } from './FilesParser';
import { ansiToHumanText } from './FormatUtils';
import { JestCoverageLogger } from './JestCoverageLogger';
import { TestRunner } from './TestRunner';
import { Task, TestTask } from './TestTask';
import type { A11yLogType, CodeOwnerEntry, CoverageAreas, PlatformType } from './types';

/**
 * Use these option to enable verbose console logging
 * to help you debug the program
 */
type DebugOptions = {
  printComponentTestFiles?: boolean;
  printTestFilesWithToBeAccessible?: boolean;
  printTestFilesWithoutToBeAccessibleTest?: boolean;
  printComponentsWithTests?: boolean;
  printComponents?: boolean;
  logToConsole?: boolean;
};

/**
 * This file is responsible for calling the right operation from A11yAuditor
 * and writing that result to the log.
 */

export class A11yLogger extends TestTask {
  public codeOwnerEntry?: CodeOwnerEntry;

  private log: A11yLogType;

  private filePaths: string[];

  private jestCoverageLogger: JestCoverageLogger;

  private a11yAuditor: A11yAuditor;

  private platform: PlatformType;

  constructor(
    task: Task,
    platform: PlatformType,
    filePaths: string[] = [],
    codeOwnerEntry?: CodeOwnerEntry,
  ) {
    super(task);

    this.log = {
      timestamp: new Date(),
      totalNumberOfComponentTests: 0,
      totalNumberAccessibleTests: 0,
      totalNumberOfPassingAccessibleTests: 0,

      testFilesWithoutToBeAccessibleTest: [],
      testFilesWithoutToHaveNoViolationsTest: [],
      testFilesWithToBeAccessibleTest: [],
      testFilesWithToHaveNoViolations: [],
      testDetails: {},
      projectMetadata: {
        projectName: task.projectName,
        projectPath: task.projectPath,
        githubURL: process.env.BUILDKITE_REPO,
      },
      componentsWithZeroCoverage: 'unknown',
      componentsWithoutToBeAccessibleTest: [],
      components: [],
      totalNumberOfComponents: 0,
      componentsWithTest: [],
      totalNumberOfComponentsWithTest: 0,
      automatedA11yScore: 0,
      // track if functions have been called
      functionsCalled: {
        logTestFilesWithoutToBeAccessible: false,
        logTestFilesWithToBeAccessible: false,
        logAccessibleTestsJestOutput: false,
        logTestFilesWithToHaveNoViolations: false,
        logTestFilesWithoutToHaveNoViolations: false,
      },
      platform,
    };

    this.platform = platform;

    this.filePaths = filePaths;

    this.codeOwnerEntry = codeOwnerEntry;

    this.jestCoverageLogger = new JestCoverageLogger(this.getTask);

    this.a11yAuditor = new A11yAuditor(this.getTask);
  }

  get getCodeOwnerEntry(): CodeOwnerEntry | undefined {
    return this.codeOwnerEntry;
  }

  get getCodeOwner(): string {
    return this.codeOwnerEntry?.codeOwner ?? '';
  }

  get getFilePaths(): string[] {
    return this.filePaths;
  }

  get getLog(): A11yLogType {
    return this.log;
  }

  get getFunctionsCalled(): A11yLogType['functionsCalled'] {
    return this.log.functionsCalled;
  }

  static logFunctionAndDuration(functionName: string, elapsed: number) {
    logSuccess(`Logged ${functionName} - ${color.shell(`duration: [${elapsed / 1000}s]`)}`);
  }

  logFunctionCall(functionName: keyof A11yLogType['functionsCalled']) {
    this.log.functionsCalled[functionName] = true;
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

    componentsWithTest = this.filterAllComponentsByPath(componentsWithTest);

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
      this.log.totalNumberOfComponentsWithTest = componentsWithTest.length;
    }

    const elapsed = performance.now() - start;

    A11yLogger.logFunctionAndDuration('totalNumberOfComponentsWithTest', elapsed);
  }

  public logTotalNumberOfPassingAccessibleTests(skipAccessibleTest = true) {
    const start = performance.now();

    if (!this.getFunctionsCalled.logAccessibleTestsJestOutput && !skipAccessibleTest) {
      throw new Error(
        'Due to the how expensive it is to run jest tests, please first run logAccessibleTestsJestOutput before running logTotalNumberOfPassingAccessibleTests.',
      );
    }

    if (
      !this.getFunctionsCalled.logTestFilesWithoutToBeAccessible &&
      skipAccessibleTest &&
      !this.getFunctionsCalled.logTestFilesWithoutToHaveNoViolations
    ) {
      throw new Error(
        'To reduce computational time, please run A11yLogger.logTestFilesWithToBeAccessible() or logTestFilesWithToHaveNoViolations() to obtain the a list of test files with toBeAccessible / toHaveNoViolations before running this command',
      );
    }

    this.log.totalNumberOfPassingAccessibleTests = skipAccessibleTest
      ? this.log.testFilesWithToBeAccessibleTest.length ||
        this.log.testFilesWithToHaveNoViolations.length
      : A11yAuditor.getTotalNumberOfPassingAccessibleTests(this.log.testDetails);

    const elapsed = performance.now() - start;

    A11yLogger.logFunctionAndDuration('totalNumberOfPassingAccessibleTests', elapsed);
  }

  public async logComponents({
    printComponents = false,
  }: Pick<DebugOptions, 'printComponents'> = {}) {
    const start = performance.now();
    let components = await this.a11yAuditor.getComponentsList();

    components = this.filterAllComponentsByPath(components);

    if (printComponents) {
      console.log(components);
    }

    this.log.components = components;

    const elapsed = performance.now() - start;

    A11yLogger.logFunctionAndDuration('getListOfComponents', elapsed);
  }

  /**
   * Filters the provided components array to only include components whose path matches the configured code owner paths.
   *
   * @param components - The array of component strings to filter
   * @param codeOwnerEntry - The code owner entry to filter by
   * @returns The filtered array of component strings
   */
  private static filterComponentsByPath(
    components: string[],
    codeOwnerEntry: CodeOwnerEntry,
  ): string[] {
    const { paths: pathsToFilterBy } = codeOwnerEntry;

    // Remove leading slash from paths and specific leading words if present
    // The reason is because for some repo configurations, the component paths don't have the workspace folder
    const alteredPathsToFilterBy: string[] = pathsToFilterBy.map((path) => {
      let normalizedPath = path.startsWith('/') ? path.substring(1) : path;

      // Remove specified leading words from path
      leadingWordsToRemove.forEach((word) => {
        if (normalizedPath.startsWith(`${word}/`)) {
          normalizedPath = normalizedPath.substring(word.length + 1);
        }
      });
      return normalizedPath;
    });

    if (pathsToFilterBy && alteredPathsToFilterBy.length > 0) {
      const newComponent = components.filter((component) => {
        return alteredPathsToFilterBy.some((path) => component.includes(path));
      });
      return newComponent;
    }
    return components;
  }

  public async logTotalNumberOfComponents() {
    const start = new Date().getTime();
    let components = await this.a11yAuditor.getComponentsList();

    components = this.filterAllComponentsByPath(components);

    this.log.totalNumberOfComponents = components.length;

    const elapsed = new Date().getTime() - start;

    A11yLogger.logFunctionAndDuration('totalNumberOfComponents', elapsed);
  }

  private filterAllComponentsByPath(components: string[]) {
    const { codeOwnerEntry } = this;
    if (codeOwnerEntry) {
      return A11yLogger.filterComponentsByPath(components, codeOwnerEntry);
    }
    return components;
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

  public logTotalNumberOfAccessibleTests() {
    const start = new Date().getTime();

    const astParser = new ASTParser(this.filePaths);

    this.filePaths.forEach((filePath) => {
      // Heuristically speaking. If the AST contains a
      // render Identifier, it is very likely that it is a Component
      // because Hooks will use renderHook instead
      if (astParser.hasToBeAccessible(filePath) || astParser.hasToHaveNoViolations(filePath)) {
        this.log.totalNumberAccessibleTests += 1;
      }
    });

    const elapsed = new Date().getTime() - start;

    A11yLogger.logFunctionAndDuration('totalNumberOfAccessibleTests', elapsed);
  }

  public logTestFilesWithToHaveNoViolations({
    printTestFilesWithToBeAccessible,
  }: Pick<DebugOptions, 'printTestFilesWithToBeAccessible'> = {}) {
    const start = new Date().getTime();

    const astParser = new ASTParser(this.filePaths);

    this.filePaths.forEach((filePath) => {
      // Heuristically speaking. If the AST contains a
      // render Identifier, it is very likely that it is a Component
      // because Hooks will use renderHook instead
      if (astParser.hasToHaveNoViolations(filePath)) {
        this.log.testFilesWithToHaveNoViolations.push(filePath);

        if (printTestFilesWithToBeAccessible) {
          logDebug(`${filePath} is a test file that contains  toHaveNoViolations test matcher`);
        }
      }
    });

    const elapsed = new Date().getTime() - start;

    A11yLogger.logFunctionAndDuration('testFilesWithToHaveNoViolations', elapsed);
    this.logFunctionCall('logTestFilesWithToHaveNoViolations');
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
    this.logFunctionCall('logTestFilesWithToBeAccessible');
  }

  public logTestFilesWithoutToHaveNoViolations({
    printTestFilesWithoutToBeAccessibleTest = false,
  }: Pick<DebugOptions, 'printTestFilesWithoutToBeAccessibleTest'> = {}) {
    const start = new Date().getTime();

    const astParser = new ASTParser(this.filePaths);

    this.filePaths.forEach((filePath) => {
      // Heuristically speaking. If the AST contains a
      // render Identifier, it is very likely that it is a Component
      // because Hooks will use renderHook instead
      if (!astParser.hasToHaveNoViolations(filePath)) {
        this.log.testFilesWithoutToHaveNoViolationsTest.push(filePath);

        if (printTestFilesWithoutToBeAccessibleTest) {
          logDebug(
            `${filePath} is a test file that does not contain toHaveNoViolations test matcher`,
          );
        }
      }
    });

    const elapsed = new Date().getTime() - start;

    A11yLogger.logFunctionAndDuration('testFilesWithoutToHaveNoViolationsTest', elapsed);
    this.logFunctionCall('logTestFilesWithoutToHaveNoViolations');
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
    this.logFunctionCall('logTestFilesWithoutToBeAccessible');
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

    if (
      !this.getFunctionsCalled.logTestFilesWithToBeAccessible &&
      !this.getFunctionsCalled.logTestFilesWithoutToHaveNoViolations
    ) {
      throw new Error(
        'To reduce computational time, please run A11yLogger.logTestFilesWithToBeAccessible() to obtain the a list of test files with toBeAccessible before running this command',
      );
    }

    await this.logAccessibleTestBatchJestOutput({
      filePaths: this.log.testFilesWithToBeAccessibleTest,
      args,
    });
    this.logFunctionCall('logAccessibleTestsJestOutput');
  }

  // Coverage Summary Total for full repo wide level
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

  // Create filtered Coverage Summary Total and log
  public logFilteredCoverageSummaryTotal(codeOwnerEntry?: CodeOwnerEntry) {
    const start = new Date().getTime();
    const initialSummary: CoverageAreas = {
      lines: { total: 0, covered: 0, skipped: 0, pct: 0 },
      statements: { total: 0, covered: 0, skipped: 0, pct: 0 },
      functions: { total: 0, covered: 0, skipped: 0, pct: 0 },
      branches: { total: 0, covered: 0, skipped: 0, pct: 0 },
    };

    if (codeOwnerEntry) {
      const filteredCoverageSummaryJSON =
        this.jestCoverageLogger.getFilteredCoverageSummaryJSON(codeOwnerEntry);

      if (Object.keys(filteredCoverageSummaryJSON).length > 0) {
        const filteredJestCoverageObject = this.jestCoverageLogger.calculateCoverageSummary(
          filteredCoverageSummaryJSON,
        );
        this.log.filteredJestCoverage = filteredJestCoverageObject.total;
      } else {
        logError('Filtered Coverage summary is empty. Nothing to log to jestCoverageSummary');
      }
    } else {
      this.log.filteredJestCoverage = initialSummary;
    }
    const elapsed = new Date().getTime() - start;

    A11yLogger.logFunctionAndDuration('filteredCoverageSummaryTotal', elapsed);
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

  private async logA11yScore() {
    if (this.log.totalNumberOfComponentsWithTest === 0) {
      await this.logTotalNumberOfComponentsWithTest();
    }

    if (this.log.totalNumberOfPassingAccessibleTests === 0) {
      this.logTotalNumberOfPassingAccessibleTests();
    }

    let a11yScore =
      this.log.totalNumberOfPassingAccessibleTests / this.log.totalNumberOfComponentsWithTest;

    if (Number.isNaN(a11yScore) || a11yScore === Infinity) {
      a11yScore = 0;
    } else {
      // multiplying by 100 and rounding to two decimal places
      a11yScore = Math.round(a11yScore * 10000) / 100;
    }

    this.log.a11yScore = a11yScore;

    return a11yScore;
  }

  // Repo wide jestScore
  private logJestScore() {
    if (this.log.jestCoverage === undefined) {
      this.logCoverageSummaryTotal();
    }

    this.log.jestScore = this.log.jestCoverage ? this.log.jestCoverage.lines.pct : 0;

    return this.log.jestScore;
  }

  // Filtered jestScore if codeOwnerEntry is provided
  private logFilteredJestScore(codeOwnerEntry?: CodeOwnerEntry) {
    if (codeOwnerEntry) {
      if (this.log.filteredJestCoverage === undefined) {
        this.logFilteredCoverageSummaryTotal(codeOwnerEntry);
      }

      this.log.filteredJestScore = this.log.filteredJestCoverage
        ? parseFloat(this.log.filteredJestCoverage.lines.pct.toFixed(2))
        : 0;
    } else {
      this.log.filteredJestScore = 0;
    }

    return this.log.filteredJestScore;
  }

  //  Calculate automated a11y score
  public async logAutomatedA11yScore(codeOwnerEntry?: CodeOwnerEntry) {
    const a11yScore = this.log.a11yScore ?? (await this.logA11yScore());
    let jestScore = 0;

    // Handle jest logging
    if (codeOwnerEntry) {
      jestScore = this.log.filteredJestScore ?? this.logFilteredJestScore(codeOwnerEntry);
      await this.logJestScore();
    } else {
      jestScore = this.log.jestScore ?? this.logJestScore();
      await this.logFilteredJestScore();
    }

    // automatedA11yScore = (a11yScore/100) * jestScore where a11yScore is 0-100.
    const automatedA11yScore = (a11yScore / 100) * jestScore;

    // rounding to one decimal place
    this.log.automatedA11yScore = Math.round(automatedA11yScore * 10) / 10;

    return this.log.automatedA11yScore;
  }

  // Adds code owner and code owner entry to log
  public async logCodeOwner() {
    this.log.codeOwner = this.getCodeOwner;
    this.log.codeOwnerEntry = this.getCodeOwnerEntry;
    return this.getCodeOwner;
  }
}
