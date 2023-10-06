import { execute } from '../execute.js';
import { spawn } from '../spawn.js';

export const cleanChanges = async () =>
  execute<string>('Git cleaning and discarding changes', async () => {
    return spawn('git reset --hard && git clean -fd');
  });
