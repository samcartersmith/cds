import { FilesParser } from './FilesParser';
import { TestRunner } from './TestRunner';
import { Task, TestTask } from './TestTask';

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
