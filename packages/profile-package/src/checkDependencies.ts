/* eslint-disable no-console, no-await-in-loop */
import chalk from 'chalk';
import depcheck from 'depcheck';
import { globSync } from 'glob';
import fs from 'node:fs';
import path from 'node:path';

import { createLogger } from './createLogger';

export type PackageJson = {
  name?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

type CustomDepcheckResult = Omit<depcheck.Results, 'dependencies' | 'devDependencies'> & {
  packageFilepath: string;
  unusedDependencies: string[];
  unusedDevDependencies: string[];
};
export type PackageDepcheckResults = Record<string, CustomDepcheckResult>;

export type CheckDependenciesOptions = {
  /**
   * Root filepath of your yarn monorepo.
   * @default process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT ?? process.cwd()
   */
  root?: string;
  /** Glob paths to check with depcheck.
   * @default [ `${root}/packages/*` ]
   */
  filepaths?: string[];
  /**
   * Diff the current depcheck results against the baseline file.
   * @default process.env.DEPCHECK_DIFF === 'true'
   */
  diff?: boolean;
  /**
   * Generates a baseline file with the depcheck results. The baseline file is used to diff against. The baseline file will never be generated during a diff.
   * @default process.env.DEPCHECK_BASELINE === 'true'
   */
  baseline?: boolean;
  /**
   * Directory filepath to put the generated baseline file in.
   * @default root
   */
  baselineFilepath?: string;
  /**
   * Filename of the generated baseline file.
   * @default 'depcheck-results.md'
   */
  baselineFilename?: string;
  /**
   * Write the depcheck results to a json file.
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
   * @default 'depcheck-results.json'
   */
  jsonFilename?: string;
  /**
   * Maximum number of files to show in the results.
   * @default 10
   */
  maxNumberOfFiles?: number;
  /**
   * Throw an error if depcheck finds invalid files.
   * @default false
   */
  errorOnInvalidFiles?: boolean;
  /**
   * Throw an error if depcheck finds invalid directories.
   * @default false
   */
  errorOnInvalidDirs?: boolean;
  /** Glob paths to ignore checking with depcheck.
   * @default []
   */
  ignoreFilepaths?: string[];
  /** Depcheck's ignorePatterns argument. See the depcheck docs for info about ignoring files and deps https://www.npmjs.com/package/depcheck */
  ignorePatterns?: string[];
  /** Depcheck's ignoreMatches argument. See the depcheck docs for info about ignoring files and deps https://www.npmjs.com/package/depcheck */
  ignoreMatches?: string[];
  /**
   * Suppress console logging. Errors and warnings will still be shown. This option is ignored when diffing.
   * @default false
   */
  silent?: boolean;
};

const s = (spaces: number) => ' '.repeat(spaces);

export const checkDependencies = async ({
  root = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT ?? process.cwd(),
  filepaths = [`${root}/packages/*`],
  diff = process.env.DEPCHECK_DIFF === 'true',
  baseline = process.env.DEPCHECK_BASELINE === 'true',
  baselineFilepath = root,
  baselineFilename = 'depcheck-results.md',
  json = false,
  jsonFilepath = root,
  jsonFilename = 'depcheck-results.json',
  maxNumberOfFiles = 10,
  errorOnInvalidFiles = false,
  errorOnInvalidDirs = false,
  ignoreFilepaths = [],
  ignorePatterns = [],
  ignoreMatches = [],
  silent = false,
}: CheckDependenciesOptions = {}) => {
  if (process.env.PROJECT_CWD === undefined)
    console.warn(
      chalk.yellow(
        'process.env.PROJECT_CWD and process.env.NX_MONOREPO_ROOT are not set, falling back to process.cwd(). Run this script with `yarn node` to set PROJECT_CWD automatically.',
      ),
    );

  const writeBaselineFile = !diff && baseline;
  const resultsFilepath = path.resolve(baselineFilepath, baselineFilename);
  const jsonResultsFilepath = path.resolve(jsonFilepath, jsonFilename);
  const rootPackageJsonFilepath = path.resolve(root, 'package.json');

  if (diff && !fs.existsSync(resultsFilepath)) {
    const error = `No depcheck baseline results "${baselineFilename}" file found at path "${resultsFilepath}"`;
    console.error(chalk.red(error));
    throw Error(error);
  }

  if (!fs.existsSync(rootPackageJsonFilepath)) {
    const error = `No root package.json file found at path "${rootPackageJsonFilepath}"`;
    console.error(chalk.red(error));
    throw Error(error);
  }

  if (diff && baseline)
    console.warn(
      chalk.yellow('Cannot create a baseline file when diffing. Ignoring "baseline" option.'),
    );

  const rootPackageJsonContent = fs.readFileSync(rootPackageJsonFilepath, 'utf8');
  const rootPackageJson = JSON.parse(rootPackageJsonContent) as PackageJson;
  const packageFilepaths = globSync(filepaths, { ignore: ignoreFilepaths });

  const { log, logTitle, logDiff } = createLogger({ silent, diff });

  logTitle(chalk.cyan(`🦍 Depcheck results:\n`));

  // Prepare the new results for diffing and json reports
  let diffText = '';
  const results: PackageDepcheckResults = {};

  // Run depcheck on each package and evaluate the result
  for (const packageFilepath of packageFilepaths) {
    const packageName = path.basename(packageFilepath);
    const result = await depcheck(packageFilepath, { ignorePatterns, ignoreMatches });

    results[packageName] = {
      packageFilepath,
      unusedDependencies: result.dependencies,
      unusedDevDependencies: result.devDependencies,
      missing: result.missing,
      using: result.using,
      invalidFiles: result.invalidFiles,
      invalidDirs: result.invalidDirs,
    };

    // Handle invalid files
    if (Object.values(results[packageName].invalidFiles).length > 0) {
      let error = `Invalid files in package "${packageName}":\n`;
      const entries = Object.entries(results[packageName].invalidFiles);
      const originalLength = entries.length;
      if (originalLength > maxNumberOfFiles) entries.length = maxNumberOfFiles;
      error += entries.map(([key, val]) => `${key} @ ${val}`).join('\n');
      console.error(chalk.red(error));
      if (errorOnInvalidFiles) throw Error(error);
    }

    // Handle invalid directories
    if (Object.values(results[packageName].invalidDirs).length > 0) {
      let error = `Invalid directories in package "${packageName}":\n`;
      error += results[packageName].invalidDirs.toString();
      const entries = Object.entries(results[packageName].invalidDirs);
      const originalLength = entries.length;
      if (originalLength > maxNumberOfFiles) entries.length = maxNumberOfFiles;
      error += entries.map(([key, val]) => `${key} @ ${val}`).join('\n');
      console.error(chalk.red(error));
      if (errorOnInvalidDirs) throw Error(error);
    }

    const packageNameText = `\n📌${s(1)}${packageName}\n`;
    diffText += packageNameText;
    log(chalk.cyan(packageNameText));

    // Handle unused dependencies
    if (result.dependencies.length > 0) {
      const unusedDepsList = result.dependencies.join(`\n${s(4)}`);
      const count = result.dependencies.length;
      let unusedDepsText = `\n${s(2)}Unused dependencies (${count}):\n`;
      unusedDepsText += `\n${s(4)}${unusedDepsList}\n`;
      diffText += unusedDepsText;
      log(chalk.yellow(unusedDepsText));
    }

    // Handle unused devDependencies
    if (result.devDependencies.length > 0) {
      const unusedDevDepsList = result.devDependencies.join(`\n${s(4)}`);
      const count = result.devDependencies.length;
      let unusedDevDepsText = `\n${s(2)}Unused devDependencies (${count}):\n`;
      unusedDevDepsText += `\n${s(4)}${unusedDevDepsList}\n`;
      diffText += unusedDevDepsText;
      log(chalk.yellow(unusedDevDepsText));
    }

    const missingDependencyEntries = Object.entries(result.missing);

    // Handle missing dependencies
    if (missingDependencyEntries.length > 0) {
      const count = missingDependencyEntries.length;
      const missingDepsTitle = `\n${s(2)}Missing dependencies (${count}):\n`;
      diffText += missingDepsTitle;
      log(chalk.red(missingDepsTitle));

      for (const [missingDependencyName, usedInFilepaths] of missingDependencyEntries) {
        const rootDep = rootPackageJson?.dependencies?.[missingDependencyName];
        const rootDevDep = rootPackageJson?.devDependencies?.[missingDependencyName];
        const dependencyNameText = `\n${s(4)}${missingDependencyName}\n`;
        diffText += dependencyNameText;
        log(chalk.red(dependencyNameText));
        if (rootDep) {
          const text = `${s(6)}In root package.json dependencies at version ${rootDep}\n`;
          diffText += text;
          log(chalk.yellow(text));
        }
        if (rootDevDep) {
          const text = `${s(6)}In root package.json devDependencies at version ${rootDevDep}\n`;
          diffText += text;
          log(chalk.yellow(text));
        }

        const originalLength = usedInFilepaths.length;
        if (originalLength > maxNumberOfFiles) usedInFilepaths.length = maxNumberOfFiles;

        const usedInFilepathsText = usedInFilepaths
          .map((filepath) => path.relative(root, filepath))
          .join(`\n${s(8)}`);

        let usedInText = `${s(6)}Used in ${originalLength} files:`;
        usedInText += `\n${s(8)}${usedInFilepathsText}\n`;
        if (originalLength > maxNumberOfFiles)
          usedInText += `${s(8)}... and ${originalLength - maxNumberOfFiles} more\n`;
        diffText += usedInText;
        log(chalk.yellow(usedInText));
      }
    }
  }

  // Always log the diff if we're diffing, regardless of silent mode
  if (diff) {
    const baselineResults = fs.readFileSync(resultsFilepath, 'utf-8');
    logDiff(baselineResults, diffText);
  }

  if (json) {
    if (fs.existsSync(jsonResultsFilepath)) fs.rmSync(jsonResultsFilepath);
    fs.writeFileSync(jsonResultsFilepath, JSON.stringify(results, null, 2));
    log(chalk.green(`\n📝 Wrote depcheck json results to ${jsonResultsFilepath}`));
  }

  if (writeBaselineFile) {
    if (fs.existsSync(resultsFilepath)) fs.rmSync(resultsFilepath);
    fs.writeFileSync(resultsFilepath, diffText);
    log(chalk.green(`\n📝 Wrote depcheck baseline results to ${resultsFilepath}`));
  }

  console.log('\n');
};
