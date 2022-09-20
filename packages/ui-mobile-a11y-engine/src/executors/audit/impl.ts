import execa from 'execa';
import fs from 'fs';
import path from 'path';
import ts from 'typescript';
import { ArgsList, createTask, Task } from '@cbhq/mono-tasks';

type TestOptions = {
  affected?: boolean;
  cache?: boolean;
  debug?: boolean;
  file?: string[];
  serial?: boolean;
  jestCoverageSummaryPath?: string;
  auditComponentsMissingA11yCoverage?: boolean;
};

type CoveragePercentage = {
  total: number;
  covered: number;
  skipped: number;
  pct: number;
};

type CoverageAreas = {
  lines: CoveragePercentage;
  functions: CoveragePercentage;
  statements: CoveragePercentage;
  branches: CoveragePercentage;
};

type CoverageOutput = Record<string, CoverageAreas>;

/**
 * You can get more information about what these a11yLog represents
 * from this TDD
 * https://docs.google.com/document/d
 * 1y9T3tP-40gPqMxcQAE-Ast4M08n-sK7z2tO5BaTAHMc/
 */
type A11yLogType = {
  /** Will log the date when the executor is ran */
  timestamp: Date;
  /**
   * Number of components that have test. Discovered that components with
   * render is likely to be a component
   * */
  totalNumberOfComponentWithTests: number;
  /**
   * Number of tests that have toBeAccessible jest test
   */
  totalNumberOfHasToBeAccessibleTests: number;
  /**
   * Capturing the file path for components that have test
   * but does not have toBeAccessible
   */
  unTestedFilePaths: string[];
  /**
   * Capturing tests that fail and the warning message that it generates
   */
  testDetails: Record<string, execa.ExecaReturnValue | { success: boolean }>;
  /**
   * Metadata for a project
   */
  projectMetadata: {
    projectName: string;
    projectPath: string;
    githubURL?: string;
  };
  /**
   * Files with zero jest coverage, and therefore zero a11y coverage
   * 'Unknown' indicates that no jestCoverageSummaryPath option was passed, or invalid file path.
   */
  componentsWithZeroCoverage: string[] | 'unknown';
  /**
   * Test files that provide a11y coverage
   */
  testsWithA11yCoverage: string[];
  /**
   * Components missing a11y coverage
   */
  componentsMissingA11yCoverage: string[];
};

function parseAst(sourceFile: ts.SourceFile) {
  const data = {
    isComponent: false,
    hasAccessibleTest: false,
  };
  function visit(node: ts.Node) {
    const nodeText = node.getText(sourceFile);

    if (ts.isIdentifier(node)) {
      if (nodeText === 'render') {
        data.isComponent = true;
      }
      if (nodeText === 'toBeAccessible') {
        data.hasAccessibleTest = true;
      }
    } else {
      ts.forEachChild(node, visit);
    }
  }
  ts.forEachChild(sourceFile, visit);
  return data;
}

/**
 * This will write the a11yLog.json to an out directory
 * relative to the project. i.e if executor is ran in package/mobile
 * workspace. It will write to package/mobile/out/a11yLog.json
 * @param content
 * @param task
 */
const writeToProjectOutDir = (content: A11yLogType, task: Task) => {
  const jsonifyContent = JSON.stringify(content);

  const logRootPath = `${task.projectRoot}/ui-mobile_a11y_engine_out`;
  if (!fs.existsSync(logRootPath)) fs.mkdirSync(logRootPath);

  fs.writeFileSync(`${logRootPath}/a11yLog-${content.timestamp}.json`, jsonifyContent);
};

/**
 * Reads file passed and returns JSON object or empty object if invalid file.
 * @param fileLocation
 * @returns CoverageOutput JSON data or empty object
 */
const getCoverageSummaryJSONData = (fileLocation: string): CoverageOutput => {
  if (path.extname(fileLocation) !== '.json' || !fs.existsSync(fileLocation)) {
    return {};
  }

  const rawData = fs.readFileSync(fileLocation, 'utf-8');
  return JSON.parse(rawData);
};

async function getAffectedFiles(task: Task, forTestingFiles: boolean): Promise<string[]> {
  const collectedFiles: string[] = [];
  const files = await task.getAffectedFiles(/\.[j|t]sx?$/);

  if (forTestingFiles) {
    files.forEach((filePath) => {
      if (filePath.includes('.test.')) {
        collectedFiles.push(filePath);

        // We have a source file, check if theres a sibling test file
      } else {
        const ext = path.extname(filePath);
        const testFile = filePath.replace(ext, `.test${ext}`);
        const testFileName = path.basename(testFile);
        const candidates = [
          // src/foo.test.ts
          testFile,
          // src/__tests__/foo.test.ts
          testFile.replace(testFileName, `__tests__/${testFileName}`),
          // tests/foo.test.ts
          testFile.replace('src/', 'tests/'),
          // __tests__/foo.test.ts
          testFile.replace('src/', '__tests__/'),
        ];

        candidates.some((candidate) => {
          if (task.projectRoot.append(candidate).exists()) {
            collectedFiles.push(candidate);

            return true;
          }

          return false;
        });
      }
    });
  } else {
    files.forEach((filePath) => {
      if (
        !filePath.includes('.test.') &&
        !filePath.includes('.stores.') &&
        !filePath.includes('.e2e.')
      ) {
        collectedFiles.push(filePath);
      }
    });
  }

  return collectedFiles;
}

const getFiles = async (filters: string[] = []) => {
  const script = await execa('git', ['ls-files', '--', ...filters]);
  const files = script.stdout.trim().split('\n');
  return files;
};

/**
 * Calculates which components in jest coverage report have 0 percent ("pct") coverage
 * @param log
 * @param coverageSummaryFileLocation
 * @returns array of file paths, or 'unknown'
 */
function auditZeroJestCoverage(coverageSummaryFileLocation: string): string[] | 'unknown' {
  const filesWithZeroCoverage: string[] = [];
  const coverageSummaryData = getCoverageSummaryJSONData(coverageSummaryFileLocation);

  if (Object.keys(coverageSummaryData).length === 0) {
    return 'unknown';
  }

  Object.keys(coverageSummaryData).forEach((fileName) => {
    const isReactFile = fileName.split('.')[1] === 'tsx' || fileName.split('.')[1] === 'jsx'; // component suffix for react compilers
    const baseFileName = fileName.split('/')[fileName.split('/').length - 1]; // get file name
    const isComponent =
      baseFileName[0].toUpperCase() === baseFileName[0] && !baseFileName.includes('Provider'); // components are capitalized by principle, exclude Provider files from coverage

    if (
      isReactFile &&
      isComponent &&
      (coverageSummaryData[fileName].lines.pct === 0 ||
        coverageSummaryData[fileName].statements.pct === 0)
    ) {
      filesWithZeroCoverage.push(fileName);
    }
  });

  return filesWithZeroCoverage;
}

/**
 * Gets the files that the audit should be run against, varies on options 'affected' and 'file'
 *
 * @param task
 * @param options
 * @param forTesting // determines if it should get test files, or component files
 * @returns
 */
async function getFilesForAudit(
  task: Task,
  options: TestOptions,
  forTesting: boolean,
): Promise<string[]> {
  if (options.affected) {
    // forTesting toggles based on getter
    return getAffectedFiles(task, forTesting);
  }
  if (options.file?.length) {
    return task.normalizeFileList(options.file);
  }

  return forTesting
    ? getFiles([`${task.projectRoot}/*.test.ts`, `${task.projectRoot}/*.test.tsx`])
    : getFiles([
        `${task.projectRoot}/*.tsx`,
        `:!:${task.projectRoot}/*.test.tsx`, // excludes test.tsx
        `:!:${task.projectRoot}/*.test.ts`, // excludes test.ts
        `:!:${task.projectRoot}/*.stories.tsx`, // excludes stories
        `:!:${task.projectRoot}/*.e2e.tsx`, // excludes e2e
        `:!:${task.projectRoot}/node_modules/*`, // excludes node_modules
      ]);
}

function getComponentsMissingTestFiles(testFiles: string[], relatedFiles: string[]): string[] {
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

async function auditComponentsMissingA11yCoverage({
  componentsWithoutTestFiles,
  testsWithA11yCoverage,
  jestConfigs,
  task,
}: {
  componentsWithoutTestFiles: string[];
  testsWithA11yCoverage: string[]; // files from log that have a11y coverage via tests
  jestConfigs: ArgsList;
  task: Task;
}): Promise<string[]> {
  const componentsMissingA11yCoverage: string[] = [];

  await Promise.all(
    componentsWithoutTestFiles.map(async (missingFileName: string) => {
      const args = [
        ...(jestConfigs as string[]),
        '--findRelatedTests', // shows tests that cover component coverage
        '--listTests', // this gives the list of tests that would be run without actually running them
        '--color=false',
        'silent=false',
        missingFileName,
      ];

      // call jest --findRelatedFiles --listTests <missingTestFile component>
      const execResult = await execa('jest', args, {
        cwd: task.projectRoot.path(),
        env: {
          ...task.context.target?.env,
          ...task.getEnvVars(),
        },
        preferLocal: true,
      });

      // Break down jest output into array
      const arrayOfRelatedTestFiles = execResult.stdout.split(/\r?\n/);

      // Iterate over related tests and see if they have accessibility coverage
      // if tests have coverage (valid index),  missingTestFile has a11y coverage.
      // if tests do not have coverage (index is -1), then assume missingTestFile has no a11y coverage
      const isCovered = arrayOfRelatedTestFiles.filter((relatedTest) => {
        const indexOfAccessibilityTest = testsWithA11yCoverage.findIndex(
          (accessibilityTestFilePath) => relatedTest.includes(accessibilityTestFilePath),
        );

        return indexOfAccessibilityTest > -1;
      });

      // No coverage for this component, either directly or from other related components
      if (isCovered.length === 0) {
        componentsMissingA11yCoverage.push(missingFileName);
      }
    }),
  );

  return componentsMissingA11yCoverage;
}

async function auditA11yCoverage({
  files,
  task,
  jestConfigs,
}: {
  files: string[];
  task: Task;
  jestConfigs: ArgsList;
}): Promise<A11yLogType> {
  const program = ts.createProgram(files, { allowJs: false });

  const a11yLog: A11yLogType = {
    timestamp: new Date(),
    totalNumberOfComponentWithTests: 0,
    totalNumberOfHasToBeAccessibleTests: 0,
    unTestedFilePaths: [],
    testDetails: {},
    projectMetadata: {
      projectName: task.projectName,
      projectPath: task.projectPath,
      // eslint-disable-next-line no-restricted-globals
      githubURL: process.env.BUILDKITE_REPO,
    },
    componentsWithZeroCoverage: [],
    testsWithA11yCoverage: [],
    componentsMissingA11yCoverage: [],
  };

  const unresolvedPromises = files.map(async (file) => {
    const sourceFile = program.getSourceFile(file);

    if (sourceFile === undefined) {
      throw new Error('Source file is undefined. Nothing to traverse through');
    }

    const { isComponent, hasAccessibleTest } = parseAst(sourceFile);

    if (isComponent) {
      a11yLog.totalNumberOfComponentWithTests += 1;

      if (hasAccessibleTest) {
        a11yLog.totalNumberOfHasToBeAccessibleTests += 1;

        const args = [...(jestConfigs as string[]), file];

        const execResult = await execa('jest', args, {
          cwd: task.projectRoot.path(),
          env: {
            ...task.context.target?.env,
            ...task.getEnvVars(),
          },
          preferLocal: true,
        });

        // eslint-disable-next-line no-console
        console.log(execResult.stderr);
        // eslint-disable-next-line no-console
        console.log(execResult.stdout);

        // Only add the output log if it fails or test results in console.warn,
        // otherwise, just return success.
        // Reason: output gets really long, so this will optimize space usage
        if (execResult.failed || execResult.stdout !== '') {
          a11yLog.testDetails[file] = execResult;
        } else {
          a11yLog.testDetails[file] = { success: true };
          a11yLog.testsWithA11yCoverage.push(file);
        }
      } else {
        a11yLog.unTestedFilePaths.push(file);
      }
    }
  });

  await Promise.all(unresolvedPromises);

  return a11yLog;
}

const test = createTask<TestOptions>('test', async (task, options) => {
  const args: ArgsList = ['--color', '--passWithNoTests'];

  if (options.cache) {
    args.unshift(
      '--cache',
      '--cacheDirectory',
      task.cache.getSharedCachePath('tools/jestTransforms'),
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

  const testFiles = await getFilesForAudit(task, options, true);

  const log = await auditA11yCoverage({ files: testFiles, task, jestConfigs: args });

  if (options.jestCoverageSummaryPath) {
    log.componentsWithZeroCoverage = auditZeroJestCoverage(options.jestCoverageSummaryPath);
  }

  if (options.auditComponentsMissingA11yCoverage) {
    const relatedFiles = await getFilesForAudit(task, options, false);
    const componentsWithoutTestFiles = getComponentsMissingTestFiles(testFiles, relatedFiles);
    const { testsWithA11yCoverage } = log;

    const componentsMissingA11yCoverage = await auditComponentsMissingA11yCoverage({
      componentsWithoutTestFiles,
      testsWithA11yCoverage,
      jestConfigs: args,
      task,
    });

    log.componentsMissingA11yCoverage = componentsMissingA11yCoverage;
  }

  writeToProjectOutDir(log, task);
  return task.exec('echo', [`Finished auditing a11y log for ${task.projectName} workspace`]);
});

export default test;
