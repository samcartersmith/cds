import { A11yAuditor } from '../A11yAuditor';
import { FilesParser } from '../FilesParser';
import { TestRunner } from '../TestRunner';
import { Task } from '../TestTask';
import { TestDetail } from '../types';

jest.mock('../TestRunner');
jest.mock('../FilesParser');

describe('A11yAuditor', () => {
  let auditor: A11yAuditor;
  const mockTask = {
    projectRoot: {
      toString: jest.fn().mockReturnValue('/project-root'),
    },
  } as unknown as Task;

  beforeEach(() => {
    auditor = new A11yAuditor(mockTask);
  });

  describe('getComponentsMissingA11yCoverage', () => {
    it('should return components without accessibility test coverage', async () => {
      (TestRunner.prototype.runJest as jest.Mock).mockResolvedValue({
        stdout: '\nrelatedTestFile\nunrelatedTestFile\n',
      });
      const result = await auditor.getComponentsMissingA11yCoverage({
        componentsWithoutTestFiles: ['Accordion.tsx'],
        testFilesWithToBeAccessibleTest: ['Button.tsx'],
        jestArgs: [],
      });
      expect(result).toEqual(['Accordion.tsx']);
    });
  });

  describe('getComponentsMissingTestFiles', () => {
    it('should return components without test files', () => {
      const testFiles = ['Accordion.test.tsx'];
      const relatedFiles = ['Accordion.tsx', 'Button.tsx'];
      const result = A11yAuditor.getComponentsMissingTestFiles(testFiles, relatedFiles);
      expect(result).toEqual(['Button.tsx']);
    });
  });

  describe('getTotalNumberOfPassingAccessibleTests', () => {
    it('should return the number of passing accessibility tests', () => {
      const testDetails: TestDetail = {
        test1: { status: 'passed', message: 'Test passed successfully' },
        test2: { status: 'failed', message: 'Test failed due to XYZ' },
      };
      const result = A11yAuditor.getTotalNumberOfPassingAccessibleTests(testDetails);
      expect(result).toBe(1);
    });
  });

  describe('getComponentsWithTestList', () => {
    it('should return a list of components with test files', async () => {
      (FilesParser.listFilePathsInRepo as jest.Mock).mockReturnValue(['Accordion.test.tsx']);
      const result = await auditor.getComponentsWithTestList({ components: ['Accordion.tsx'] });
      expect(result).toEqual(['Accordion.test.tsx']);
    });
  });

  describe('getComponentsList', () => {
    it('should return a list of components', async () => {
      const mockFilesParserInstance: Partial<FilesParser> = {
        setFilePaths: [],
        allFilePathsInProject: jest.fn().mockResolvedValue({
          excludeStories: jest.fn().mockReturnThis(),
          excludeTestFiles: jest.fn().mockReturnThis(),
          excludeE2E: jest.fn().mockReturnThis(),
          excludeNodeModules: jest.fn().mockReturnThis(),
          removeNonComponentFiles: jest.fn().mockReturnThis(),
          getFilePaths: ['Accordion.tsx', 'Button.tsx'],
        }),
      };

      (FilesParser as jest.MockedClass<typeof FilesParser>).mockImplementation(
        () => mockFilesParserInstance as FilesParser,
      );

      const result = await auditor.getComponentsList();
      expect(result).toEqual(['Accordion.tsx', 'Button.tsx']);
    });
  });
});
