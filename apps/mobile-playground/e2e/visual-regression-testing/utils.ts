/* eslint-disable no-console */
import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export function runCmd(cmd: string) {
  try {
    console.log(chalk.gray('runCmd:\n', cmd));
    const output = execSync(cmd, { encoding: 'utf-8' }); // the default is 'buffer'
    console.log(chalk.gray('Output was:\n', output));
  } catch (err) {
    console.log(chalk.red(`Error was:\n${err}`));
  }
}

export function ensureDirExists(dirPath: string) {
  const dir = path.dirname(dirPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function removeAllFilesFromDir(dirPath: string) {
  runCmd(`rm -rf ${dirPath}`);
}
