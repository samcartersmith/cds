import execa from 'execa';
import fs from 'fs';
import path from 'path';
import ts from 'typescript';
import { ArgsList, createTask, Task } from '@cbhq/mono-tasks';

export type TestOptions = {
  affected?: boolean;
  cache?: boolean;
  debug?: boolean;
  file?: string[];
  serial?: boolean;
};

export type A11yLogType = {
  timestamp: Date;
  numberOfComponentTests: number;
  numberOfHasToBeAccessibleTests: number;
  unTestedFilePaths: string[];
  testDetails: Record<string, execa.ExecaReturnValue | { success: boolean }>;
  projectMetadata: {
    projectName: string;
    projectPath: string;
    githubURL?: string;
  };
};

/**
 * Utility hooks for AST Tree Parsing
 */

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
 * End Utility hooks for AST Tree Parsing
 */

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

async function getAffectedTests(task: Task): Promise<string[]> {
  const testFiles: string[] = [];
  const files = await task.getAffectedFiles(/\.[j|t]sx?$/);

  files.forEach((filePath) => {
    if (filePath.includes('.test.')) {
      testFiles.push(filePath);

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
          testFiles.push(candidate);

          return true;
        }

        return false;
      });
    }
  });

  return testFiles;
}

const getFiles = async (filters: string[] = []) => {
  const script = await execa('git', ['ls-files', '--', ...filters]);
  const files = script.stdout.trim().split('\n');
  return files;
};

async function logAudit({
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
    numberOfComponentTests: 0,
    numberOfHasToBeAccessibleTests: 0,
    unTestedFilePaths: [],
    testDetails: {},
    projectMetadata: {
      projectName: task.projectName,
      projectPath: task.projectPath,
      // eslint-disable-next-line no-restricted-globals
      githubURL: process.env.BUILDKITE_REPO,
    },
  };

  const unresolvedPromises = files.map(async (file) => {
    const sourceFile = program.getSourceFile(file);

    if (sourceFile === undefined) {
      throw new Error('Source file is undefined. Nothing to traverse through');
    }

    const { isComponent, hasAccessibleTest } = parseAst(sourceFile);

    if (isComponent) {
      a11yLog.numberOfComponentTests += 1;

      const accessibleTestExistAndIsComponent = hasAccessibleTest;

      if (accessibleTestExistAndIsComponent) {
        a11yLog.numberOfHasToBeAccessibleTests += 1;

        const args = [...(jestConfigs as string[]), file];

        const execResult = await execa('jest', args, {
          cwd: task.projectRoot.path(),
          env: {
            ...task.context.target?.env,
            ...task.getEnvVars(),
          },
          preferLocal: true,
        });

        await task.exec('jest', args);

        // Only add the output log if it fails or test results in console.warn,
        // otherwise, just return success.
        // Reason: output gets really long, so this will optimize space usage
        if (execResult.failed || execResult.stdout !== '') {
          a11yLog.testDetails[file] = execResult;
        } else {
          a11yLog.testDetails[file] = { success: true };
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

  if (options.affected) {
    const files = await getAffectedTests(task);

    const log = await logAudit({ files, task, jestConfigs: args });
    writeToProjectOutDir(log, task);
  } else if (options.file?.length) {
    const files = task.normalizeFileList(options.file);

    const log = await logAudit({ files, task, jestConfigs: args });
    writeToProjectOutDir(log, task);
  } else {
    const files = await getFiles([
      `${task.projectRoot}/*.test.ts`,
      `${task.projectRoot}/*.test.tsx`,
    ]);

    const log = await logAudit({ files, task, jestConfigs: args });
    writeToProjectOutDir(log, task);
  }

  return task.exec('echo', [`Finished auditing a11y log for ${task.projectName} workspace`]);
});

export default test;
