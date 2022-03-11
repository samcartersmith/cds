import chalk from 'chalk';
import fs from 'fs';
import ora from 'ora';

import { getSourcePath } from '../utils/getSourcePath';

const contributingOutputDir = '../apps/website/docs/contributing/engineering.mdx';

async function copyContributing() {
  const spinner = ora(`Starting to copy CONTRIBUTING files`).start();

  async function handleCopy() {
    const input = await getSourcePath('../CONTRIBUTING.md');
    const output = await getSourcePath(contributingOutputDir);
    try {
      await fs.promises.copyFile(input, output);
      spinner.info(chalk.green('Copied CONTRIBUTING file to website'));
    } catch (err) {
      if (err instanceof Error) {
        spinner.fail(`${chalk.redBright('error')} ${err.message}`);
      } else {
        throw err;
      }
    }
  }

  try {
    await handleCopy();
    spinner.succeed(chalk.green('Finished copying CONTRIBUTING file to website'));
  } catch (err) {
    if (err instanceof Error) {
      spinner.fail(chalk.red('Error copying CONTRIBUTING file to website', err));
    } else {
      throw err;
    }
  }
  spinner.stop();
}

void copyContributing();
