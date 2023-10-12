import { execute } from '../repo/execute.js';
import { spawn } from '../repo/spawn.js';

export const checkStatus = async () =>
  execute<string>('Git checking status', async () => {
    return spawn('git status --porcelain');
  });
