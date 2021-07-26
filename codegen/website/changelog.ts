import chalk from 'chalk';
import fs from 'fs';
import ora from 'ora';
import { getSourcePath } from '../utils/getSourcePath';

type CdsPackage = typeof cdsPackages[number];
const cdsPackages = ['common', 'fonts', 'lottie-files', 'mobile', 'utils', 'web'] as const;
const changelogOutputDir = 'website/docs/changelog';

(async function copyChangelogs() {
  const spinner = ora(`Starting to copy CHANGELOG files`).start();
  async function handleCopy(name: CdsPackage) {
    const input = await getSourcePath(`${name}/CHANGELOG.md`);
    const output = await getSourcePath(`${changelogOutputDir}/${name}.mdx`);
    try {
      await fs.promises.copyFile(input, output);
      spinner.info(chalk.green(`Copied ${name} CHANGELOG`));
    } catch (err) {
      spinner.fail(`${chalk.redBright('error')} ${err.message}`);
    }
  }

  try {
    await Promise.all(cdsPackages.map(handleCopy));
    spinner.succeed(chalk.green('Finished copying CHANGELOG files'));
  } catch (err) {
    spinner.fail(chalk.red('Error copying CHANGELOG', err));
  }
  spinner.stop();
})();
