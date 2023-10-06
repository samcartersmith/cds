import type { SpawnSyncOptionsWithStringEncoding } from 'node:child_process';
import { spawnSync } from 'node:child_process';

import { logger } from './logger.js';
import { resolveWorkingDirectoryPath } from './workingDirectory.js';

export const spawn = (
  command: string,
  options?: Omit<SpawnSyncOptionsWithStringEncoding, 'encoding'>,
) => {
  const commands = command.split(' ');
  const result = spawnSync(commands.shift() ?? '', commands, {
    encoding: 'utf-8',
    shell: true,
    cwd: resolveWorkingDirectoryPath(),
    ...options,
    env: {
      ...process.env,
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
