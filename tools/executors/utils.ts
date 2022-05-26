import { ExecutorContext } from '@nrwl/devkit';
import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs';
import { reduce } from 'lodash';
import path from 'path';

export function getProjectPath(context: ExecutorContext): string {
  return context.workspace.projects[context.projectName as string].root;
}

/**
 *
 * @param context
 * @param bin
 * @param args
 * @param envs Environment key-value pairs. Extends automatically from process.env. Set extendEnv to false if you don't want this.
 * @param cwdOverride
 * @returns
 */
export async function runLocalCommand(
  context: ExecutorContext,
  bin: string,
  args: string[] = [],
  envs = {},
  cwdOverride?: string,
) {
  const cwd = cwdOverride ?? path.join(context.root, getProjectPath(context));
  console.log(
    chalk.gray(
      `Running \`${reduce(
        envs,
        (result, value, key) => {
          return `${result}${key}="${value}" `;
        },
        '',
      )} ${bin} ${args.join(' ')}\` in .${cwd}`,
    ),
  );

  const result = await execa(bin, args, {
    cwd,
    stdio: 'inherit',
    preferLocal: true,
    env: envs,
  });

  return Promise.resolve({ success: result.exitCode === 0 });
}

// mimics unix rm function
async function rm(filePath: string, recursive?: boolean) {
  if (fs.existsSync(filePath)) {
    console.log(`deleting ${filePath}`);

    await new Promise((resolve) => {
      fs.rm(filePath, { recursive: recursive === true }, (err) => {
        if (err) {
          console.log(`error while trying to delete ${filePath}: ${err?.message}`);
          process.exit(1);
        }

        console.log(`${filePath} is deleted!`);
        resolve(null);
      });
    });
  }
}

export async function deleteFile(filePath: string) {
  return rm(filePath);
}

export async function deleteDir(dir: string) {
  return rm(dir, true);
}

export function createDir(dir: string) {
  console.log(`creating ${dir}`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getRootFilePath(context: ExecutorContext, ...parts: string[]): string {
  return path.join(context.root, ...parts);
}

export function getCachePath(context: ExecutorContext, ...parts: string[]): string {
  return getRootFilePath(context, '.nx/cache', ...parts);
}

export function getProjectCachePath(context: ExecutorContext, ...parts: string[]): string {
  return getCachePath(context, 'projects', getProjectPath(context), ...parts);
}

export async function getFileSizeInKb(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err || !Number.isFinite(stats.size)) {
        reject(new Error(`Problem obtaining file size ${filePath}`));
      } else {
        const { size } = stats;
        resolve(size / 1000);
      }
    });
  });
}
