import execa from 'execa';
import path from 'path';

import { FilesParser } from '../FilesParser';
import { Task } from '../TestTask';

jest.mock('execa');
jest.mock('path');

type ExtendedExecaReturnValue = execa.ExecaReturnValue<Buffer> & {
  command?: string;
  escapedCommand?: string;
  exitCode?: number;
  isCanceled?: boolean;
  timedOut?: boolean;
};

describe('FilesParser', () => {
  let filesParser: FilesParser;
  let mockTask: Task;

  beforeEach(() => {
    mockTask = {
      projectRoot: {
        toString: jest.fn().mockReturnValue('/project-root'),
      },
    } as unknown as Task;

    filesParser = new FilesParser(mockTask);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should list all file paths in a project', async () => {
    const mockStdout = Buffer.from('/project-root/file1.tsx\n/project-root/file2.tsx');

    const mockExecaReturnValue: ExtendedExecaReturnValue = {
      stdout: mockStdout,
      stderr: Buffer.from(''),
      failed: false,
      killed: false,
      command: '',
      escapedCommand: '',
      exitCode: 0,
      isCanceled: false,
      timedOut: false,
    };

    (execa as jest.MockedFunction<typeof execa>).mockResolvedValueOnce(mockExecaReturnValue);

    await filesParser.allFilePathsInProject();

    expect(filesParser.getFilePaths).toEqual([
      '/project-root/file1.tsx',
      '/project-root/file2.tsx',
    ]);
  });

  it('should exclude test files', () => {
    filesParser.setFilePaths = [
      '/project-root/file1.tsx',
      '/project-root/file2.test.tsx',
      '/project-root/file3.tsx',
    ];

    filesParser.excludeTestFiles();

    expect(filesParser.getFilePaths).toEqual([
      '/project-root/file1.tsx',
      '/project-root/file3.tsx',
    ]);
  });

  it('should determine if file is a React file', () => {
    (path.extname as jest.MockedFunction<typeof path.extname>).mockImplementation((fileName) => {
      if (fileName.endsWith('.tsx')) {
        return '.tsx';
      }
      if (fileName.endsWith('.ts')) {
        return '.ts';
      }
      return path.extname(fileName);
    });

    expect(FilesParser.isReactFile('file1.tsx')).toBe(true);
    expect(FilesParser.isReactFile('file2.ts')).toBe(false);
  });

  it('should filter test files', () => {
    filesParser.setFilePaths = [
      '/project-root/file1.tsx',
      '/project-root/file2.test.tsx',
      '/project-root/file3.test.ts',
    ];

    filesParser.filterTestFiles();

    expect(filesParser.getFilePaths).toEqual([
      '/project-root/file2.test.tsx',
      '/project-root/file3.test.ts',
    ]);
  });

  it('should exclude story files', () => {
    filesParser.setFilePaths = [
      '/project-root/file1.tsx',
      '/project-root/file2__stories__.tsx',
      '/project-root/file3.tsx',
    ];

    filesParser.excludeStories();

    expect(filesParser.getFilePaths).toEqual([
      '/project-root/file1.tsx',
      '/project-root/file3.tsx',
    ]);
  });

  it('should exclude e2e files', () => {
    filesParser.setFilePaths = [
      '/project-root/file1.tsx',
      '/project-root/file2.e2e.tsx',
      '/project-root/file3.tsx',
    ];

    filesParser.excludeE2E();

    expect(filesParser.getFilePaths).toEqual([
      '/project-root/file1.tsx',
      '/project-root/file3.tsx',
    ]);
  });

  it('should exclude files in node_modules directory', () => {
    filesParser.setFilePaths = [
      '/project-root/file1.tsx',
      '/project-root/node_modules/file2.tsx',
      '/project-root/file3.tsx',
    ];

    filesParser.excludeNodeModules();

    expect(filesParser.getFilePaths).toEqual([
      '/project-root/file1.tsx',
      '/project-root/file3.tsx',
    ]);
  });

  it('should only retain component files', () => {
    filesParser.setFilePaths = [
      '/project-root/useHook.ts',
      '/project-root/Component.tsx',
      '/project-root/providerComponent.tsx',
    ];

    (path.extname as jest.MockedFunction<typeof path.extname>).mockImplementation((fileName) => {
      if (fileName.endsWith('.tsx')) {
        return '.tsx';
      }
      if (fileName.endsWith('.ts')) {
        return '.ts';
      }
      return path.extname(fileName);
    });

    filesParser.removeNonComponentFiles();

    expect(filesParser.getFilePaths).toEqual(['/project-root/Component.tsx']);
  });

  it('should list all test file paths in repo', async () => {
    const mockStdout = Buffer.from('/project-root/file1.test.tsx\n/project-root/file2.test.tsx');

    const mockExecaReturnValue: ExtendedExecaReturnValue = {
      stdout: mockStdout,
      stderr: Buffer.from(''),
      failed: false,
      killed: false,
      command: '',
      escapedCommand: '',
      exitCode: 0,
      isCanceled: false,
      timedOut: false,
    };

    (execa as jest.MockedFunction<typeof execa>).mockResolvedValueOnce(mockExecaReturnValue);

    const testFiles = await filesParser.listTestFilePathsInRepo();

    expect(testFiles).toEqual(['/project-root/file1.test.tsx', '/project-root/file2.test.tsx']);
  });
});
