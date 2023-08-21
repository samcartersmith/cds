import path from 'path';

import { FilesParser } from './FilesParser';
import { TestRunner } from './TestRunner';
import { Task, TestTask } from './TestTask';
import { TestDetail } from './types';

/**
 * Functions that does some operations to get information to be
 * logged to report should live in this file.
 *
 * To give you an example, getTotalNumberOfPassingToBeAccessibleTests,
 * falls in this file and not A11yLogger because it is a function to
 * get the total number of passing toBeAccessibleTests. This function does
 * not write the result to the report. It merely does the necessary work to
 * obtain the result and return the result.
 *
 * That is the ultimate difference between A11yAuditor and A11yLogger.
 * A11yLogger calls one of these functions to obtain the result and log it to
 * the report.
 */

export class A11yAuditor extends TestTask {
  private testRunner: TestRunner;

  constructor(task: Task) {
    super(task);
    this.testRunner = new TestRunner(this.getTask);
  }

  public async getComponentsMissingA11yCoverage({
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

  static getTotalNumberOfPassingToBeAccessibleTests(testDetails: TestDetail) {
    let numberOfPassingToBeAccessibleTests = 0;

    Object.entries(testDetails).forEach(([, detail]) => {
      if (detail.status === 'passed') {
        numberOfPassingToBeAccessibleTests += 1;
      }
    });

    return numberOfPassingToBeAccessibleTests;
  }

  /**
   * This comment describes the logic for figuring out whether a component has
   * a test or not
   *
   * First, obtain a list of components. Then, find **\/<component>.test.tsx
   * file in project.
   *
   * An example:
   * Say we have a component, Accordion.tsx. If **\/Accordion.test.tsx exists,
   * then a test file exist for this component.
   *
   * Assumptions:
   * If a test file isn't prefixed with its component, then this
   * logic fails. We assume this case to be rare, which is true most of the
   * time.
   *
   * @components components - list of components
   * @returns a list of components with test file. This is the test file name,
   *          not the component name. (i.e Accordion.test.tsx)
   */
  public async getComponentsWithTestList({ components }: { components?: string[] } = {}) {
    // If we already have components list in other place,
    // don't regenerate. Otherwise, generate it.
    // We add this check because we should not assume that a user needs to
    // run these operation in any particular order.
    // But, if we already have a list of components, we don't want to
    // regenerate it to speed up operation.
    const internalComponents = components ?? (await this.getComponentsList());

    const testFilesToSearch = internalComponents.map((component) => {
      const extName = path.extname(component);
      const baseName = path.basename(component, extName);
      return `${this.getTask.projectRoot}/**/${baseName}.test${extName}`;
    });

    const componentsWithTests = FilesParser.listFilePathsInRepo(testFilesToSearch);

    return componentsWithTests;
  }

  public async getComponentsList() {
    const filesParser = new FilesParser(this.getTask);
    const allFilesParser = await filesParser.allFilePathsInProject();
    const components = allFilesParser
      .excludeStories()
      .excludeTestFiles()
      .excludeE2E()
      .excludeNodeModules()
      .removeNonComponentFiles().getFilePaths;
    return components;
  }
}
