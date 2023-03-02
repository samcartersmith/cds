import { existsSync, readFileSync } from 'fs';
import { extname } from 'path';

import { FilesParser } from './FilesParser';
import { Task, TestTask } from './TestTask';
import { CoverageOutput } from './types';

/**
 * As the name suggests, this generates a jest coverage
 * for the project, and logs the result to the report
 */
export class JestCoverageLogger extends TestTask {
  private coverageOutPath: string;

  constructor(task: Task) {
    super(task);
    const coveragePath = this.getTask.cache.getOutputPath('coverage');

    if (!coveragePath.exists) {
      throw new Error(`${coveragePath.toString()} does not exist`);
    }

    this.coverageOutPath = coveragePath.toString();
  }

  public get getCoverageOutPath(): string {
    return this.coverageOutPath;
  }

  public getCoverageSummaryPath() {
    return `${this.coverageOutPath}/coverage-summary.json`;
  }

  public getCoverageSummaryJSON() {
    const coveragePath = this.getCoverageSummaryPath();

    if (!existsSync(coveragePath)) {
      throw new Error(`Coverage Summary does not exist at ${coveragePath}`);
    }
    if (extname(coveragePath) !== '.json') {
      throw new Error('Coverage Summary is not in a json');
    }

    const rawData = readFileSync(coveragePath, 'utf-8');

    const coverageSummaryJSON = JSON.parse(rawData) as CoverageOutput;
    return coverageSummaryJSON;
  }

  /**
   * Calculates which components in jest coverage report have 0 percent ("pct") coverage
   * @param log
   * @param coverageSummaryFileLocation
   * @returns array of file paths, or 'unknown'
   */
  public auditZeroJestCoverage(): string[] | 'unknown' {
    const coverageSummaryData = this.getCoverageSummaryJSON();
    const filesWithZeroCoverage: string[] = [];

    if (Object.keys(coverageSummaryData).length === 0) {
      return 'unknown';
    }

    Object.keys(coverageSummaryData).forEach((fileName) => {
      const isReactFile = FilesParser.isReactFile(fileName);
      const isComponent = FilesParser.fileIsComponent(fileName);

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
}
