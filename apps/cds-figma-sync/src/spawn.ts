import type { SpawnSyncOptionsWithStringEncoding } from 'node:child_process';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { logger } from './logger.js';

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let workingDirectory = __dirname;

export const deleteWorkingDirectoryContents = () => {
  logger.info('Resetting working directory');
  if (existsSync(workingDirectory)) rmSync(workingDirectory, { recursive: true });
  mkdirSync(workingDirectory);
};

export const setWorkingDirectory = (directory: string) => {
  workingDirectory = path.resolve(__dirname, directory);
};

export const spawn = (
  command: string,
  options?: Omit<SpawnSyncOptionsWithStringEncoding, 'encoding'>,
) => {
  const commands = command.split(' ');
  const result = spawnSync(commands.shift() ?? '', commands, {
    encoding: 'utf-8',
    shell: true,
    cwd: workingDirectory,
    ...options,
    env: {
      PATH: process.env.PATH,
      ...options?.env,
    },
    // stdio: 'inherit',
  });
  if (result.stderr) logger.warn(result.stderr);
  if (result.error) logger.error(result.error);
  if (result.stdout) logger.info(result.stdout);
  if (result.error) throw result.error;
  return result.stdout;
};
