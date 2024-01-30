import { execute } from '../repo/execute.js';
import { spawn } from '../repo/spawn.js';

export const cleanChanges = async () =>
  execute('Git cleaning and discarding changes', async () => {
    return spawn('git reset --hard && git clean -fd');
  });
