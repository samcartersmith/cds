import { ExecutorContext } from '@nrwl/devkit';
import path from 'path';
import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs';
import { reduce } from 'lodash';

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
export async function runLocalCommand(context: ExecutorContext, bin: string, args: string[] = [], envs = {}, cwdOverride?: string) {
  const cwd = cwdOverride ?? path.join(context.root, getProjectPath(context));
  console.log(chalk.gray(`Running \`${reduce(
    envs, 
    function(result, value, key) {
      return result + `${key}="${value}" `; 
    },
    ""
  )} ${bin} ${args.join(' ')}\` in .${cwd}`));

  const result = await execa(bin, args, {
    cwd,
    stdio: 'inherit',
    preferLocal: true,
    env: envs, 
  });

  return Promise.resolve({ success: result.exitCode === 0 });
}

export async function deleteDir(path: string) {
  if (fs.existsSync(path)) {
    console.log(`deleting ${path}`);

    await new Promise((resolve) => {
      fs.rm(path, { recursive: true }, (err) => {
        if (err) {
          console.log(`error while trying to delete ${path}: ${err?.message}`);
          process.exit(1);
        }

        console.log(`${path} is deleted!`);
        resolve(null);
      });
    });
  }
}

export function createDir(path: string) {
  console.log(`creating ${path}`);
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
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
