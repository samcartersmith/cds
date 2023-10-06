import { execute } from '../execute.js';
import { spawn } from '../spawn.js';

export const checkStatus = async () =>
  execute<string>('Git checking status', async () => {
    return spawn('git status --porcelain');
  });
