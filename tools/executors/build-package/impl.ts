import { ExecutorContext } from '@nrwl/devkit';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import execa from 'execa';

type StaticFile = {
  source: string;
  dest: string;
};

type BuildPackageOptions = {
  destinationDir: string;
  staticFiles: StaticFile[];
  babelConfig: string;
  babelExtensions: string[];
  babelIgnore: string[];
  typescriptConfig: string;
};

type PackageArgs = {
  /*
    absolute path on the filesystem of the destination directory
   */
  destinationDir: string;

  /*
  Paths of the static files that you wish to copy to the destination directory
   */
  staticFiles?: StaticFile[];
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

function getProjectPath(context: ExecutorContext): string {
  return context.workspace.projects[context.projectName as string].root;
}

async function runLocalCommand(context: ExecutorContext, bin: string, args: string[]) {
  const cwd = path.join(context.root, getProjectPath(context));
  console.log(chalk.gray(`Running \`${bin} ${args.join(' ')}\` in .${cwd}`));

  const result = await execa(bin, args, {
    cwd,
    stdio: 'inherit',
  });

  return Promise.resolve({ success: result.exitCode === 0 });
}

// babel --config-file ../../babel.build.config.js  --extensions .ts,.tsx --ignore "**/*.js","**/*.test.ts","**/*.test.tsx","dist/**" --source-maps --out-dir dist ./
async function runBabel(
  context: ExecutorContext,
  { destinationDir }: PackageArgs,
  { configFile, extensions, ignore }: BabelArgs,
) {
  const bin = 'babel';

  const args = [
    './',
    '--config-file',
    path.join(context.root, configFile),
    '--extensions',
    extensions.join(','),
    '--ignore',
    ignore.join(','),
    '--source-maps',
    '--out-dir',
    destinationDir,
  ];

  return runLocalCommand(context, bin, args);
}

// tsc --p tsconfig.build.json
async function runTsc(context: ExecutorContext, tscArgs: TscArgs) {
  const { configFile } = tscArgs;

  const bin = 'tsc';

  const args = ['--project', path.join(context.root, configFile)];

  return runLocalCommand(context, bin, args);
}

async function copyFiles(
  context: ExecutorContext,
  destinationDir: string,
  staticFiles: StaticFile[],
) {
  const promises: Promise<unknown>[] = [];

  staticFiles.forEach(({ source, dest }: StaticFile) => {
    const promise = new Promise((resolve, reject) => {
      const sourceFile = path.join(context.root, source);
      const destinationFile = path.join(destinationDir, dest);

      console.log(chalk.gray(`Copying ${sourceFile} to ${destinationFile}`));
      fs.copyFile(sourceFile, destinationFile, (err) => {
        if (err) {
          reject(err);
        }
        console.log('Copy successful!');
        resolve(null);
      });
    });

    promises.push(promise);
  });

  const values = await Promise.all(promises);
  return {
    success: values.every((val) => val === null),
  };
}

export default async function buildPackage(options: BuildPackageOptions, context: ExecutorContext) {
  const {
    destinationDir: dest,
    staticFiles,
    babelConfig,
    babelExtensions,
    babelIgnore,
    typescriptConfig,
  } = options;

  const destinationDir = path.join(context.root, dest);

  console.log(`deleting ${destinationDir}`);

  if (fs.existsSync(destinationDir)) {
    await new Promise((resolve) => {
      fs.rm(destinationDir, { recursive: true }, (err) => {
        if (err) {
          console.log(`error while trying to delete ${destinationDir}: ${err?.message}`);
          process.exit(1);
        }

        console.log(`${destinationDir} is deleted!`);
        resolve(null);
      });
    });
  }

  console.log(`creating ${destinationDir}`);
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }

  const babelArgs: BabelArgs = {
    configFile: babelConfig,
    ignore: babelIgnore,
    extensions: babelExtensions,
  };

  const packageArgs: PackageArgs = {
    destinationDir,
  };

  let { success } = await runBabel(context, packageArgs, babelArgs);

  const tscArgs: TscArgs = {
    configFile: typescriptConfig,
  };

  success = success ? (await runTsc(context, tscArgs)).success : success;

  success = success ? (await copyFiles(context, destinationDir, staticFiles)).success : success;

  return Promise.resolve({ success });
}
