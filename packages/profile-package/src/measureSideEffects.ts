/* eslint-disable no-console */
import chalk from 'chalk';
import { globSync } from 'glob';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import { type PackageJson } from './checkDependencies';
import { createLogger } from './createLogger';
import { dirname } from './dirname';

// We isolate our built packages in a temporary node_modules directory so we can measure the effect of our changes
const tempNodeModulesFilepath = path.resolve(dirname, 'node_modules');

// Delete temp node_modules on exit to prevent any accidental misuse
const cleanup = () => {
  if (fs.existsSync(tempNodeModulesFilepath))
    fs.rmSync(tempNodeModulesFilepath, { recursive: true });
};

process.on('exit', (message) => {
  console.log(message);
  cleanup();
});

process.on('uncaughtException', (error) => {
  console.log(error);
  cleanup();
  throw error;
});

const copyToTempNodeModules = (packagePath: string) => {
  const packageJsonFilepath = path.resolve(packagePath, 'package.json');
  if (!fs.existsSync(packageJsonFilepath)) {
    const error = `No package.json found at path "${packageJsonFilepath}"`;
    console.error(chalk.red(error));
    throw Error(error);
  }
  const packageJsonContent = fs.readFileSync(packageJsonFilepath, 'utf-8');
  const packageJson = JSON.parse(packageJsonContent) as PackageJson;
  const packageName = packageJson.name;
  if (!packageName) {
    const error = `No name found in package.json at path "${packageJsonFilepath}"`;
    console.error(chalk.red(error));
    throw Error(error);
  }
  const tempModulePath = path.resolve(tempNodeModulesFilepath, packageName);
  try {
    fs.cpSync(packagePath, tempModulePath, { recursive: true });
  } catch (error) {
    console.error(chalk.red(error));
    throw error;
  }
};

const removeCssImports = (jsFilePath: string) => {
  const contents = fs.readFileSync(jsFilePath, 'utf-8');
  const newContents = contents.replaceAll(/^(require|import)\(["'].*\.css["']\);$/gm, '');
  fs.writeFileSync(jsFilePath, newContents);
};

const median = (numbers: number[]) => {
  const sorted = [...numbers].sort((a, b) => a - b);
  const half = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[half] : (sorted[half - 1] + sorted[half]) / 2;
};

const profileTemplate = (jsFilepath: string, type: 'esm' | 'cjs') => `
const before = Date.now();
${
  type === 'esm'
    ? `import * as importedModule from '${jsFilepath}';`
    : `const importedModule = require('${jsFilepath}');`
}
const after = Date.now();
const elapsed = after - before;
console.log(elapsed);
`;

export type Measurement = {
  filepath: string;
  moduleFilepath: string;
  relativeFilepath: string;
  timeInMs: number | null;
};

export type MeasurementResults = Record<string, Measurement[]>;

export type MeasureSideEffectsOptions = {
  /**
   * Root filepath of your yarn monorepo.
   * @default process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT ?? process.cwd()
   */
  root?: string;
  /** Glob paths of your packages to measure.
   * @default [ `${root}/packages/*` ]
   */
  filepaths?: string[];
  /**
   * Diff the current measurement results with a baseline file.
   * @default process.env.SIDEEFFECT_DIFF === 'true'
   */
  diff?: boolean;
  /**
   * Generates a baseline file with the measurement results. The baseline file is used to diff against. The baseline file will never be generated during a diff.
   * @default process.env.SIDEEFFECT_BASELINE === 'true'
   */
  baseline?: boolean;
  /**
   * Directory filepath to put the generated results file in.
   * @default root
   */
  baselineFilepath?: string;
  /**
   * Filename of the generated results file.
   * @default 'sideeffect-results.md'
   */
  baselineFilename?: string;
  /**
   * Write the measurement results to a json file.
   * @default false
   */
  json?: boolean;
  /**
   * Directory filepath to put the generated json file in.
   * @default root
   */
  jsonFilepath?: string;
  /**
   * Filename of the generated json file.
   * @default 'sideeffect-results.json'
   */
  jsonFilename?: string;
  /**
   * Number of times to sample the runtime cost of each import. The median of the samples is used as the final result.
   * @default 5
   */
  numberOfSamples?: number;
  /** Glob paths to ignore measuring.
   * @default ['**\/__tests__\/**', '**\/__mocks__\/**', '**\/__stories__\/**', '**\/*.config.*', '**\/*.test.*', '**\/*.test.*', '**\/*.stories.*']
   */
  ignoreFilepaths?: string[];
  /**
   * Suppress console logging. Errors and warnings will still be shown. This option is ignored when diffing.
   * @default false
   */
  silent?: boolean;
};

export const measureSideEffects = async ({
  root = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT ?? process.cwd(),
  filepaths = [`${root}/packages/*`],
  diff = process.env.SIDEEFFECT_DIFF === 'true',
  baseline = process.env.SIDEEFFECT_BASELINE === 'true',
  baselineFilepath = root,
  baselineFilename = 'sideeffect-results.md',
  json = false,
  jsonFilepath = root,
  jsonFilename = 'sideeffect-results.json',
  numberOfSamples = 5,
  ignoreFilepaths = [
    '**/__tests__/**',
    '**/__mocks__/**',
    '**/__stories__/**',
    '**/*.config.*',
    '**/*.test.*',
    '**/*.test.*',
    '**/*.stories.*',
  ],
  silent = false,
}: MeasureSideEffectsOptions = {}) => {
  if (process.env.PROJECT_CWD === undefined)
    console.warn(
      chalk.yellow(
        'process.env.PROJECT_CWD and process.env.NX_MONOREPO_ROOT are not set, falling back to process.cwd(). Run this script with `yarn node` to set PROJECT_CWD automatically.',
      ),
    );

  const writeBaselineFile = !diff && baseline;
  const resultsFilepath = path.resolve(baselineFilepath, baselineFilename);
  const jsonResultsFilepath = path.resolve(jsonFilepath, jsonFilename);

  if (diff && !fs.existsSync(resultsFilepath)) {
    const error = `No side effect stats baseline results "${baselineFilename}" file found at path "${resultsFilepath}"`;
    console.error(chalk.red(error));
    throw Error(error);
  }

  if (diff && baseline)
    console.warn(
      chalk.yellow('Cannot create a baseline file when diffing. Ignoring "baseline" option.'),
    );

  cleanup();
  fs.mkdirSync(tempNodeModulesFilepath);
  // Always ignore the profile-package package, so we don't try to copy the package into itself during testing
  const packageFilepaths = globSync(filepaths, { ignore: ['**/profile-package/**'] });
  packageFilepaths.forEach(copyToTempNodeModules);
  const jsFilepaths = globSync(`${tempNodeModulesFilepath}/**/*.js`, { ignore: ignoreFilepaths });
  jsFilepaths.forEach(removeCssImports);

  const { log, logTitle, logDiff } = createLogger({ silent, diff });

  logTitle(chalk.cyan(`🐝 Export runtime costs:\n`));

  // Prepare the new results for diffing and json reports
  let diffText = '';
  const results: MeasurementResults = {};

  // Evaluate import runtime costs (e.g. the duration of any side effects)
  for (const jsFilepath of jsFilepaths) {
    const relativeModuleFilepath = path.relative(tempNodeModulesFilepath, jsFilepath);
    const packagePathParts = relativeModuleFilepath.split('/');
    const packageDepth = relativeModuleFilepath.startsWith('@') ? 2 : 1;
    const packageName = packagePathParts.slice(0, packageDepth).join('/');
    const relativeFilepath = relativeModuleFilepath.replace(packageName, '');
    const fileContents = fs.readFileSync(jsFilepath, 'utf-8');
    const isESM = fileContents.includes('export ');
    const isCJS = fileContents.includes('module.exports ');
    const packageNameText = `\n📌 ${packageName}\n`;

    if (!results[packageName]) {
      results[packageName] = [];
      diffText += packageNameText;
      log(chalk.cyan(packageNameText));
    }

    const result: Measurement = {
      filepath: jsFilepath,
      moduleFilepath: relativeModuleFilepath,
      relativeFilepath,
      timeInMs: null,
    };

    const relativeFilepathTitle = `${result.relativeFilepath} `.padEnd(90, '.');

    // if (!isESM && !isCJS) {
    //   const resultText = `${relativeFilepathTitle} null`;
    //   diffText += resultText;
    //   results[packageName].push(result);
    //   // eslint-disable-next-line no-continue
    //   continue;
    // }

    // Switch note between CJS and ESM as necessary
    const inputType = `--input-type=${isESM ? 'module' : 'commonjs'}`;
    const forkFileContents = profileTemplate(jsFilepath, isESM ? 'esm' : 'cjs');
    const script = forkFileContents.split('\n').join('');

    const timesInMs: number[] = [];

    // Measure the runtime cost of importing the module
    for (let i = 0; i < numberOfSamples; i++) {
      const result = spawnSync(`node ${inputType} --eval "${script}"`, { shell: true });
      const timeInMs = parseInt(result.stdout.toString());
      timesInMs.push(timeInMs);
    }

    const medianElapsedTime = Math.floor(median(timesInMs));
    result.timeInMs = medianElapsedTime;
    results[packageName].push(result);
    const resultText = `  ${relativeFilepathTitle} ${
      medianElapsedTime ? `${medianElapsedTime} ms` : 'null'
    }`;
    diffText += resultText;
    log(resultText);
  }

  // Always log the diff if we're diffing, regardless of silent mode
  if (diff) {
    const baselineResults = fs.readFileSync(resultsFilepath, 'utf-8');
    logDiff(baselineResults, diffText);
  }

  if (json) {
    if (fs.existsSync(jsonResultsFilepath)) fs.rmSync(jsonResultsFilepath);
    fs.writeFileSync(jsonResultsFilepath, JSON.stringify(results, null, 2));
    log(chalk.green(`\n📝 Wrote measurement json results to ${jsonResultsFilepath}`));
  }

  if (writeBaselineFile) {
    if (fs.existsSync(resultsFilepath)) fs.rmSync(resultsFilepath);
    fs.writeFileSync(resultsFilepath, diffText);
    log(chalk.green(`\n📝 Wrote measurement baseline results to ${resultsFilepath}`));
  }

  console.log('\n');

  cleanup();
};
