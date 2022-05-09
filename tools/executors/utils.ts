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

export async function deleteDir(dir: string) {
  if (fs.existsSync(dir)) {
    console.log(`deleting ${dir}`);

    await new Promise((resolve) => {
      fs.rm(dir, { recursive: true }, (err) => {
        if (err) {
          console.log(`error while trying to delete ${dir}: ${err?.message}`);
          process.exit(1);
        }

        console.log(`${dir} is deleted!`);
        resolve(null);
      });
    });
  }
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
