import { ExecutorContext } from '@nrwl/devkit';
import path from 'path';
import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs';

export function getProjectPath(context: ExecutorContext): string {
  return context.workspace.projects[context.projectName as string].root;
}

export async function runLocalCommand(context: ExecutorContext, bin: string, args: string[]) {
  const cwd = path.join(context.root, getProjectPath(context));
  console.log(chalk.gray(`Running \`${bin} ${args.join(' ')}\` in .${cwd}`));

  const result = await execa(bin, args, {
    cwd,
    stdio: 'inherit',
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
