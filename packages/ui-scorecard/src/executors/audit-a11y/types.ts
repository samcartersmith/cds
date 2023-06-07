/** ********************************************** */
/* TYPES THAT ARE NOT EXPORTED
/*
/* They are not exported because it is not
/* needed by other files yet. 
/** ************************************************ */
type CoveragePercentage = {
  total: number;
  covered: number;
  skipped: number;
  pct: number;
};

/** ********************************************** */
/* TYPES THAT ARE EXPORTED
/** ************************************************ */
export type MetadataType = {
  projectName: string;
  projectPath: string;
  githubURL: string | undefined;
};

export type TestOptions = {
  affected?: boolean;
  cache?: boolean;
  debug?: boolean;
  file?: string[];
  serial?: boolean;
  includeZeroCoverageAudit?: boolean;
  getComponentsMissingA11yCoverage?: boolean;
  eventProjectName?: string;
  debugEvents?: boolean;
  sendEventsToProd?: boolean;
};

export type CoverageAreas = {
  lines: CoveragePercentage;
  functions: CoveragePercentage;
  statements: CoveragePercentage;
  branches: CoveragePercentage;
};

export type CoverageOutput = Record<string, CoverageAreas>;

export type TestDetail = Record<
  string,
  {
    status: 'passed' | 'failed';
    message: string;
  }
>;

/**
 * You can get more information about what these log represents
 * from this TDD
 * https://docs.google.com/document/d
 * 1y9T3tP-40gPqMxcQAE-Ast4M08n-sK7z2tO5BaTAHMc/
 */
export type A11yLogType = {
  /** Will log the date when the executor is ran */
  timestamp: Date;
  /**
   * Number tests that are testing a Component. Discovered that components with
   * render is likely to be a component
   * */
  totalNumberOfComponentTests: number;
  /**
   * Number of test files with toBeAccessible tests
   */
  totalNumberOfToBeAccessibleTests: number;
  /**
   * Number of test files with passing toBeAccessible tests
   */
  totalNumberOfPassingToBeAccessibleTests: number;
  /**
   * Capturing the file path for components that have test
   * but does not have toBeAccessible
   */
  testFilesWithoutToBeAccessibleTest: string[];
  /**
   * Capturing test status.
   * If it fails or fails on a warning, it will capture the failure/warning
   * message.
   * If it succeeded, it will not capture the message so we can optimize log
   * size. It will just log it as { success: boolean }
   */
  testDetails: TestDetail;
  /**
   * Metadata for a project
   */
  projectMetadata: MetadataType;
  /**
   * Files with zero jest coverage, and therefore zero a11y coverage
   * 'Unknown' indicates that no jestCoverageSummaryPath option was passed, or invalid file path.
   */
  componentsWithZeroCoverage: string[] | 'unknown';
  /**
   * Test files that have toBeAccessible test
   */
  testFilesWithToBeAccessibleTest: string[];
  /**
   * Components missing a11y coverage
   */
  componentsWithoutToBeAccessibleTest: string[];
  /**
   * Jest Coverage Summary total report for the repo this
   * executor is ran on
   */
  jestCoverage?: CoverageAreas;
  /**
   * A list of components in project
   */
  components: string[];
  /**
   * Total number of components and screens
   */
  totalNumberOfComponents: number;
  /**
   * A list of components that have tests
   */
  componentsWithTest: string[];
  /**
   * Total number of components and screens that have a matching test file
   */
  totalNumberOfComponentsWithTest: number;
  /**
   * Percentage of components and screens with passing toBeAccessible tests
   */
  a11yScore?: number;
  /**
   * Jest code coverage percentage (by line)
   */
  jestScore?: number;
  /**
   * Metric representing accessibility, based solely on the results of automated accessibility testing
   */
  automatedA11yScore: number;
};
