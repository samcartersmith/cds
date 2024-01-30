import { execute } from './execute.js';
import { spawn } from './spawn.js';

export const yarnInstall = async () =>
  execute('Install dependencies with yarn', async () => {
    return spawn('yarn install --immutable', undefined, { skipInfoLog: true, throwOnStderr: true });
  });
