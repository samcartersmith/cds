import { ExecutorContext } from '@nrwl/devkit';
import chalk from 'chalk';
import glob from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';

import { BuildPackageOptions } from '../../types';
import { compressCssFiles, createDir, deleteDir, runLocalCommand } from '../utils';

type PackageArgs = {
  /*
    absolute path on the filesystem of the destination directory
   */
  destinationDir: string;
  /*
    Directory to parse src files. Relative to destinationDir.
    This should match the tsconfig.build's rootDir.
    @default './'
   */
  srcDir: string;
  /*
    Directory to output transpiled src files. Relative to destinationDir.
    Should match tsconfig.build's outDir when joined with destinationDir.
    @default './'
   */
  distDir?: string;
  /*
  Paths of the static files that you wish to add to the destination directory.
  Useful if you are using an src and dist folder structure and you need to copy package.json and md files.
   */
  staticFilesToCopy?: string[];
  /*
  Paths of the static files that you wish to remove from the destination directory
   */
  staticFilesToIgnore?: string[];
};

type BabelArgs = {
  /*
  absolute path to babel.config.js
   */
  configFile: string;

  /*
    extensions of files to parse with babel
   */
  extensions: string[];

  /**
   * globs to ignore
   */
  ignore: string[];
};

type TscArgs = {
  /*
  absolute path to the tsconfig.json
   */
  configFile: string;
};

type PackageJson = {
  version: string;
  name: string;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  'react-native': string;
};

// babel --config-file ../../babel.config.js  --extensions .ts,.tsx --ignore "**/*.js","**/*.test.ts","**/*.test.tsx","dist/**" --source-maps --out-dir dist ./
async function runBabel(
  context: ExecutorContext,
  { destinationDir, srcDir }: PackageArgs,
  { configFile, extensions, ignore }: BabelArgs,
  envs: Record<string, string>,
) {
  const bin = 'babel';

  const args = [
    srcDir,
    '--config-file',
    path.join(context.root, configFile),
    '--extensions',
    extensions.join(','),
    '--ignore',
    [...ignore, 'node_modules'].join(','),
    // '--source-maps',
    '--out-dir',
    destinationDir,
    '--copy-files',
    '--no-copy-ignored',
  ];

  return runLocalCommand(context, bin, args, envs);
}

// tsc --p tsconfig.build.json
async function runTsc(context: ExecutorContext, tscArgs: TscArgs, envs: Record<string, string>) {
  const { configFile } = tscArgs;

  const bin = 'tsc';

  const args = ['--build', path.join(context.root, configFile)];

  return runLocalCommand(context, bin, args, envs);
}

async function removeIgnoredFiles(
  context: ExecutorContext,
  destinationDir: string,
  staticFilesToIgnore: string[],
) {
  const promises: Promise<unknown>[] = [];

  staticFilesToIgnore.forEach((file: string) => {
    const filePath = path.resolve(destinationDir, file);

    const promise = new Promise((resolve, reject) => {
      console.log(chalk.gray(`Deleting ${filePath}`));
      fs.rm(filePath, { recursive: true }, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`Delete successful ${filePath}`);
          resolve(null);
        }
      });
    });

    promises.push(promise);
  });

  const values = await Promise.all(promises);
  return {
    success: values.every((val) => val === null),
  };
}

async function copyFiles({
  destinationDir,
  staticFilesToCopy,
  projectDir,
}: {
  destinationDir: string;
  staticFilesToCopy: string[];
  projectDir: string;
}) {
  return Promise.all(
    staticFilesToCopy.map(async (item) => {
      const fromPath = path.join(projectDir, item);
      const toPath = path.join(destinationDir, item);
      return fs.promises.copyFile(fromPath, toPath);
    }),
  )
    .then(() => ({ sucess: true }))
    .catch(() => ({ success: false }));
}

// packages with versions to replace in the output
const packageVersionReplacePathMap: Record<string, string> = {
  '@cbhq/d3': 'packages/d3',
  '@cbhq/cds-common': 'packages/common',
  '@cbhq/cds-fonts': 'packages/fonts',
  '@cbhq/cds-lottie-files': 'packages/lottie-files',
  '@cbhq/cds-mobile': 'packages/mobile',
  '@cbhq/cds-utils': 'packages/utils',
  '@cbhq/cds-web': 'packages/web',
  '@cbhq/cds-illustrations': 'packages/illustrations',
  '@cbhq/cds-icons': 'packages/icons',
};

async function getPackageVersion(pkgJsonPath: string) {
  const pkgJson = JSON.parse(await fs.promises.readFile(pkgJsonPath, 'utf8')) as PackageJson;
  return pkgJson.version;
}

function replaceDeps(context: ExecutorContext, pkgJson: PackageJson, deps: Record<string, string>) {
  const promises: Promise<void>[] = [];
  for (const dep of Object.keys(deps || {})) {
    if (packageVersionReplacePathMap[dep]) {
      promises.push(
        getPackageVersion(
          path.join(context.root, packageVersionReplacePathMap[dep], 'package.json'),
        ).then((version: string) => {
          // eslint-disable-next-line no-param-reassign
          deps[dep] = `^${version}`;
        }),
      );
    }
  }

  return promises;
}

function deletePackages(packagesToDelete: string[], deps?: Record<string, string>) {
  if (deps === undefined) return;

  for (const pkg of packagesToDelete) {
    if (pkg in deps) {
      // eslint-disable-next-line no-param-reassign
      delete deps[pkg];
    }
  }
}

function deleteFields(pkgJson: PackageJson, fields: (keyof PackageJson)[]) {
  for (const field of fields) {
    // eslint-disable-next-line no-param-reassign
    delete pkgJson[field];
  }
}

async function replacePackageVersions(context: ExecutorContext, destinationDir: string) {
  const pkgJsonPath = path.join(destinationDir, 'package.json');
  const pkgJson = JSON.parse(await fs.promises.readFile(pkgJsonPath, 'utf8')) as PackageJson;

  const promises: Promise<void>[] = [
    ...replaceDeps(context, pkgJson, pkgJson.dependencies ?? {}),
    ...replaceDeps(context, pkgJson, pkgJson.peerDependencies ?? {}),
  ];

  await Promise.all(promises);

  deletePackages(['@cbhq/cds-web-utils'], pkgJson.dependencies);
  deleteFields(pkgJson, ['react-native']);

  if (pkgJson.devDependencies) {
    delete pkgJson.devDependencies;
  }

  await fs.promises.writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
}

export default async function buildPackage(
  options: BuildPackageOptions,
  context: ExecutorContext,
  ignoreTsc?: boolean,
) {
  const {
    destinationDir: dest,
    srcDir = '.',
    distDir = '.',
    staticFilesToIgnore = [],
    staticFilesToCopy = [],
    babelConfig,
    babelExtensions,
    babelIgnore = [],
    typescriptConfig,
    envs,
    replacePackageJson = true,
  } = options;

  const destinationDir = path.join(context.root, dest);
  const dist = path.join(destinationDir, distDir);
  const projectDir = path.dirname(path.join(context.root, typescriptConfig));

  await deleteDir(dist);
  createDir(dist);

  const babelArgs: BabelArgs = {
    configFile: babelConfig,
    ignore: babelIgnore,
    extensions: babelExtensions,
  };

  const packageArgs: PackageArgs = {
    destinationDir: dist,
    srcDir,
  };

  let { success } = await runBabel(context, packageArgs, babelArgs, envs);

  const tscArgs: TscArgs = {
    configFile: typescriptConfig,
  };

  if (!ignoreTsc) {
    success = success ? (await runTsc(context, tscArgs, envs)).success : success;
  }

  success = success
    ? (await removeIgnoredFiles(context, destinationDir, staticFilesToIgnore)).success
    : success;

  await copyFiles({ destinationDir, projectDir, staticFilesToCopy });

  if (replacePackageJson) {
    await replacePackageVersions(context, destinationDir);
  }

  // compress css
  // Extract CSS from web package first
  const cssFiles = new Set(
    await glob(`${dist}/**/*.css`, {
      absolute: true,
      onlyFiles: true,
    }),
  );

  console.log('Compressing css files: ', cssFiles.size);

  success = success ? (await compressCssFiles(context, Array.from(cssFiles))) && true : success;

  return Promise.resolve({ success });
}
