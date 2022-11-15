import execa from 'execa';
import path from 'path';

import { TestTask } from './TestTask';

/**
 * This class is responsible for parsing
 * through the project's repo, and obtaining
 * relevant files.
 */
export class FilesParser extends TestTask {
  private filePaths: string[] = [];

  /**
   * Getter and Setter functions
   */

  public set setFilePaths(paths: string[]) {
    this.filePaths = paths;
  }

  public get getFilePaths() {
    return this.filePaths;
  }

  /**
   * Get all file paths in a project.
   * Its important to note that this function
   * will ONLY obtain files inside the project which the executor is ran
   * from.
   *
   * For example, if this executor was ran in a project called mobile, it
   * will only fetch files that are in the mobile project directory
   */
  async allFilePathsInProject(): Promise<this> {
    this.filePaths = await FilesParser.listFilePathsInRepo([
      `${this.getTask.projectRoot.toString()}/*.tsx`,
    ]);
    return this;
  }

  /**
   * Note: You must first use allFilePathsInProject as your first chain
   * Otherwise this.filePaths will be an empty array thus nothing to filter.
   * This is a technique known as optional chaining
   *
   * Example Usage:
   * `
   *   const FilesParser = await allFilePathsInProject().excludeTestFiles()
   * `
   *
   * This will make it such that when you get the filePaths above
   * it will exclude all test file paths from the list of files
   *
   * @returns this
   */
  excludeTestFiles(): this {
    const filePathsWithoutTestFiles = this.filePaths.filter((file) => {
      return !file.match(/.*.test.(ts|tsx)/);
    });
    this.filePaths = filePathsWithoutTestFiles;
    return this;
  }

  /**
   * This will make it such that when you get the filePaths above
   * it will exclude all test file paths from the list of files
   *
   * Example Usage:
   * `
   *   const FilesParser = await allFilePathsInProject().filterTestFiles()
   * `
   *
   * @returns this
   */
  filterTestFiles(): this {
    const filePathsWithTestFiles = this.filePaths.filter((file) => {
      const regex = /.*.test.(ts|tsx)/;
      return file.match(regex);
    });

    this.filePaths = filePathsWithTestFiles;
    return this;
  }

  /**
   *
   * You can use chain them together.
   *
   * For example, the command below will store files that are tests and are not
   * a story in this._filePath
   *
   * Example Usage:
   * `
   *   const FilesParser = await allFilePathsInProject()
   *                              .filterTestFiles()
   *                              .excludeStories()
   * `
   *
   * @returns this
   */
  excludeStories(): this {
    const filePathsWithoutStoryFilePaths = this.filePaths.filter((file) => {
      return !file.match(/.*.stories.tsx/);
    });
    this.filePaths = filePathsWithoutStoryFilePaths;
    return this;
  }

  excludeE2E(): this {
    const filePathsWithoutE2EFilePaths = this.filePaths.filter((file) => {
      return !file.match(/.*.e2e.tsx/);
    });
    this.filePaths = filePathsWithoutE2EFilePaths;
    return this;
  }

  excludeNodeModules(): this {
    const filePathsWithoutNodeModules = this.filePaths.filter((file) => {
      return !file.match(/.*\/node_modules\/.*/);
    });
    this.filePaths = filePathsWithoutNodeModules;
    return this;
  }

  removeNonComponentFiles(): this {
    const filesThatAreComponents = this.filePaths.filter((file) => {
      const tokenizedFile = file.split('/');
      const fileName = tokenizedFile[tokenizedFile.length - 1];
      return FilesParser.fileIsComponent(fileName);
    });
    this.filePaths = filesThatAreComponents;
    return this;
  }

  /**
   * Uses the `git ls-files` command to list all the files
   * in the repository.
   *
   * Example Usage:
   * listFilesInRepo([`${task.projectRoot}/*.test.ts`, `${task.projectRoot}/*.
   * test.tsx`])
   *
   * The above command will list all files that end with .test.(tsx | ts)
   *
   * @param filters - Parameters to only return relevant files.
   * @returns
   */
  static async listFilePathsInRepo(filters: string[] = []): Promise<string[]> {
    const script = await execa('git', ['ls-files', '--', ...filters]);
    const files = script.stdout.trim().split('\n');
    return files;
  }

  /**
   * Uses the `git ls-files` command to list all test files in the
   * repository. A file is considered a test if it ends with .test.ts or
   * .test.tsx
   *
   * @returns a list of files that are considered tests in the repository.
   */
  public async listTestFilePathsInRepo() {
    const allTestFiles = await FilesParser.listFilePathsInRepo([
      `${this.getTask.projectRoot}/*.test.ts`,
      `${this.getTask.projectRoot}/*.test.tsx`,
    ]);

    return allTestFiles;
  }

  static fileIsComponent(fileName: string): boolean {
    const fileDoesNotStartWithUse = !fileName.startsWith('use');
    const fileStartsWithCapitalLetter = fileName[0].toUpperCase() === fileName[0];
    const fileDoesNotContainProvider = !fileName.match(/.*Provider.*/);
    return fileDoesNotStartWithUse && fileStartsWithCapitalLetter && fileDoesNotContainProvider;
  }

  // If a file ends with tsx or jsx, it is likely to be
  // a reactFile
  static isReactFile(fileName: string): boolean {
    return path.extname(fileName) === '.tsx' || path.extname(fileName) === '.jsx';
  }
}
