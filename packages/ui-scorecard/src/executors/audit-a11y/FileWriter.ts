import { mkdirSync, writeFileSync } from 'fs';
import { isAbsolute } from 'path';

import { JestCoverageLogger } from './JestCoverageLogger';
import { Task, TestTask } from './TestTask';
import { A11yLogType } from './types';

/**
 * FileWriter is a class which writes log data to
 * the filesystem
 */
export class FileWriter extends TestTask {
  private outDirectory = '';

  constructor(task: Task) {
    super(task);
    const jestCoverageLogger = new JestCoverageLogger(task);

    // By default, the outDirectory is the directory where coverage is
    // However, you can use setOutDirectory to change the output location
    // if you wish
    this.outDirectory = `${jestCoverageLogger.getCoverageOutPath}/__generated__/`;
  }

  public get getOutDirectory(): string {
    return this.outDirectory;
  }

  public set setOutDirectory(outDirectory: string) {
    if (isAbsolute(outDirectory)) {
      this.outDirectory = outDirectory;
    } else {
      throw new Error('The outDirectory must be an absolute path');
    }
  }

  public writeA11yLogToOutDir({
    log,
    fileNamePrefix = 'a11y-mobile-log',
  }: {
    log: A11yLogType;
    fileNamePrefix?: string;
  }) {
    const jsonifyA11yLog = JSON.stringify(log);

    // We already check in the construct whether the coverage exist or not
    // thus we can safely create a recursive directory here
    mkdirSync(this.outDirectory, { recursive: true });
    writeFileSync(`${this.outDirectory}/${fileNamePrefix}-${log.timestamp}.json`, jsonifyA11yLog);
  }
}
