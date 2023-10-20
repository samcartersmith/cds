import { mkdirSync, writeFileSync } from 'fs';

import { FileWriter } from '../FileWriter';
import { Task } from '../TestTask';

jest.mock('fs');

describe('FileWriter', () => {
  let task: Task;

  beforeEach(() => {
    task = {
      projectName: 'test-project',
      projectRoot: {
        append: jest.fn(),
        exists: jest.fn(() => true),
      },
      cache: {
        getSharedCachePath: jest.fn(),
        getOutputPath: jest.fn(() => ({
          exists: jest.fn(() => true),
          toString: jest.fn(() => 'mocked/path/to/coverage'),
        })),
      },
      exec: jest.fn(),
    } as unknown as Task;
  });

  it('should set the default outDirectory on instantiation', () => {
    const fileWriter = new FileWriter(task);
    expect(fileWriter.getOutDirectory).toContain('__generated__');
  });

  it('should set outDirectory with an absolute path', () => {
    const fileWriter = new FileWriter(task);
    const newPath = '/absolute/path';
    fileWriter.setOutDirectory = newPath;
    expect(fileWriter.getOutDirectory).toEqual(newPath);
  });

  it('should throw an error when setting outDirectory with a relative path', () => {
    const fileWriter = new FileWriter(task);
    expect(() => {
      fileWriter.setOutDirectory = './relative/path';
    }).toThrow('The outDirectory must be an absolute path');
  });

  it('should write the accessibility log to the output directory', () => {
    const fileWriter = new FileWriter(task);
    const mockLog = {
      timestamp: new Date(),
      totalNumberOfComponentTests: 5,
      totalNumberOfToBeAccessibleTests: 4,
      totalNumberOfPassingToBeAccessibleTests: 3,
      testFilesWithoutToBeAccessibleTest: ['path1', 'path2'],
      testDetails: {},
      projectMetadata: {
        projectName: 'test',
        projectPath: './path',
        githubURL: 'http://github.com',
      },
      componentsWithZeroCoverage: ['comp1'],
      testFilesWithToBeAccessibleTest: ['path3'],
      componentsWithoutToBeAccessibleTest: ['comp2'],
      components: ['comp1', 'comp2'],
      totalNumberOfComponents: 2,
      componentsWithTest: ['comp1'],
      totalNumberOfComponentsWithTest: 1,
      automatedA11yScore: 90,
      functionsCalled: {
        logTestFilesWithoutToBeAccessible: true,
        logAccessibleTestsJestOutput: true,
        logTestFilesWithToBeAccessible: true,
      },
    };

    fileWriter.writeA11yLogToOutDir({ log: mockLog });

    expect(mkdirSync).toHaveBeenCalled();

    expect(writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('a11y-mobile-log'),
      JSON.stringify(mockLog),
    );
  });
});
