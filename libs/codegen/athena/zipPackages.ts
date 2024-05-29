import chalk from 'chalk';
import { globSync } from 'glob';
import child_process from 'node:child_process';
import fs from 'node:fs';
import { PackageJson } from 'type-fest';

import { getSourcePath } from '../utils/getSourcePath';

const packageJson = fs.readFileSync(getSourcePath('packages/web/package.json'), 'utf8');
const { version } = JSON.parse(packageJson) as PackageJson;

// get version number from web package
const tempFilepath = getSourcePath(`cds-archive-${version}.txt`);
const zipFilename = `cds-archive-${version}.zip`;

const pathsToZip = [
  'packages/common/**',
  'packages/icons/**',
  'packages/illustrations/**',
  'packages/lottie-files/**',
  'packages/mobile/**',
  'packages/mobile-visualization/**',
  'packages/utils/**',
  'packages/web/**',
  'packages/web-visualization/**',
];

const pathsToExclude = ['.docusaurus/**', 'node_modules/**', '**/CHANGELOG.md'];

const filepaths = globSync(pathsToZip, {
  ignore: pathsToExclude,
  cwd: getSourcePath(''),
  absolute: true,
});

fs.writeFileSync(tempFilepath, filepaths.join('\n'));

try {
  child_process.execSync(`zip ${zipFilename} -@ < ${tempFilepath}`, {
    cwd: getSourcePath(''),
    stdio: 'inherit',
  });

  console.log(chalk.green(`Created new CDS project archive at: ${zipFilename}`));
} catch (error) {
  console.error(error);
}

fs.rmSync(tempFilepath);
