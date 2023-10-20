import * as fs from 'fs';

import { FilesParser } from '../FilesParser';
import { JestCoverageLogger } from '../JestCoverageLogger';
import { Task } from '../TestTask';

jest.mock('fs');
jest.mock('../FilesParser');

describe('JestCoverageLogger', () => {
  let dummyTask: Task;

  beforeEach(() => {
    dummyTask = {
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

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({}));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should initialize with a valid coverage path', () => {
    const logger = new JestCoverageLogger(dummyTask);
    expect(logger.getCoverageOutPath).toBeTruthy();
  });

  it('should fetch the coverage summary JSON', () => {
    const dummyCoverageData = { 'path/to/file': { lines: { pct: 100 }, statements: { pct: 100 } } };
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(dummyCoverageData));

    const logger = new JestCoverageLogger(dummyTask);
    const coverageData = logger.getCoverageSummaryJSON();

    expect(coverageData).toEqual(dummyCoverageData);
  });

  it('should throw an error if coverage summary path does not exist', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const logger = new JestCoverageLogger(dummyTask);
    expect(() => logger.getCoverageSummaryJSON()).toThrow('Coverage Summary does not exist');
  });

  it('should throw an error if coverage summary is not in JSON format', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue('{}');

    const logger = new JestCoverageLogger(dummyTask);

    jest.spyOn(logger, 'getCoverageSummaryPath').mockReturnValue('path/to/coverage-summary.doc');

    expect(() => logger.getCoverageSummaryJSON()).toThrow('Coverage Summary is not in a json');
  });

  it('should return "unknown" if coverage summary is empty', () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({}));

    const logger = new JestCoverageLogger(dummyTask);
    const zeroCoverageFiles = logger.auditZeroJestCoverage();

    expect(zeroCoverageFiles).toBe('unknown');
  });

  it('should identify files with zero jest coverage', () => {
    const dummyCoverageData = {
      'Component1.tsx': { lines: { pct: 0 }, statements: { pct: 100 } },
      'Component2.tsx': { lines: { pct: 100 }, statements: { pct: 0 } },
      'Otherfile.tsx': { lines: { pct: 100 }, statements: { pct: 100 } },
    };
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(dummyCoverageData));

    jest.spyOn(FilesParser, 'isReactFile').mockReturnValue(true);
    jest.spyOn(FilesParser, 'fileIsComponent').mockReturnValue(true);
    const logger = new JestCoverageLogger(dummyTask);
    const zeroCoverageFiles = logger.auditZeroJestCoverage();

    expect(zeroCoverageFiles).toEqual(['Component1.tsx', 'Component2.tsx']);
  });

  it('should not identify non-component or non-react files with zero coverage', () => {
    const dummyCoverageData = {
      'Component1.tsx': { lines: { pct: 0 }, statements: { pct: 100 } },
      'Component2.jsx': { lines: { pct: 0 }, statements: { pct: 100 } },
      'Component3.jsx': { lines: { pct: 10 }, statements: { pct: 0 } },
      'Component4.jsx': { lines: { pct: 10 }, statements: { pct: 100 } },
      'NotAComponent.ts': { lines: { pct: 0 }, statements: { pct: 100 } },
      'NotReactFile.jpg': { lines: { pct: 0 }, statements: { pct: 100 } },
    };
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(dummyCoverageData));

    jest.spyOn(FilesParser, 'isReactFile').mockImplementation((filename) => {
      return filename.endsWith('.tsx') || filename.endsWith('.jsx');
    });

    jest.spyOn(FilesParser, 'fileIsComponent').mockImplementation((filename) => {
      const fileDoesNotStartWithUse = !filename.startsWith('use');
      const fileStartsWithCapitalLetter = filename[0].toUpperCase() === filename[0];
      const fileDoesNotContainProvider = !filename.match(/.*Provider.*/);
      return (
        fileDoesNotStartWithUse &&
        fileStartsWithCapitalLetter &&
        fileDoesNotContainProvider &&
        (filename.endsWith('.tsx') || filename.endsWith('.jsx'))
      );
    });

    const logger = new JestCoverageLogger(dummyTask);
    const zeroCoverageFiles = logger.auditZeroJestCoverage();

    expect(zeroCoverageFiles).toEqual(['Component1.tsx', 'Component2.jsx', 'Component3.jsx']);
  });
});
