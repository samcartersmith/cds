import { existsSync, readFileSync } from 'fs';
import { extname } from 'path';

import { FilesParser } from './FilesParser';
import { Task, TestTask } from './TestTask';
import { CodeOwnerEntry, CoverageAreas, CoverageOutput } from './types';

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

  //  Return coverage summary filtered by paths of codeOwnerEntry
  public getFilteredCoverageSummaryJSON(
    codeOwnerEntry: CodeOwnerEntry,
  ): Record<string, CoverageAreas> {
    const coverageSummary = this.getCoverageSummaryJSON();
    const filteredCoverage: Record<string, CoverageAreas> = {};

    Object.keys(coverageSummary).forEach((key) => {
      const isPathIncluded = codeOwnerEntry.paths.some((path) => key.includes(path));
      if (isPathIncluded) {
        filteredCoverage[key] = coverageSummary[key];
      }
    });

    return filteredCoverage;
  }

  // Builds custom Coverage Summary Object
  public calculateCoverageSummary(filteredCoverage: Record<string, CoverageAreas>): CoverageOutput {
    const initialSummary: CoverageAreas = {
      lines: { total: 0, covered: 0, skipped: 0, pct: 0 },
      statements: { total: 0, covered: 0, skipped: 0, pct: 0 },
      functions: { total: 0, covered: 0, skipped: 0, pct: 0 },
      branches: { total: 0, covered: 0, skipped: 0, pct: 0 },
    };

    const finalSummary = Object.values(filteredCoverage).reduce((summary, currentFile) => {
      const updatedSummary = { ...summary };
      (Object.keys(updatedSummary) as (keyof CoverageAreas)[]).forEach((key) => {
        updatedSummary[key].total += currentFile[key].total;
        updatedSummary[key].covered += currentFile[key].covered;
        updatedSummary[key].skipped += currentFile[key].skipped;
      });
      return updatedSummary;
    }, initialSummary);

    // Recalculate the percentages
    (Object.keys(finalSummary) as (keyof CoverageAreas)[]).forEach((key) => {
      const area = finalSummary[key];
      area.pct = area.total > 0 ? (area.covered / area.total) * 100 : 0;
    });

    return { total: finalSummary };
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
