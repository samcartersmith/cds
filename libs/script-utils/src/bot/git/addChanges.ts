import { execute } from '../repo/execute.js';
import { spawn } from '../repo/spawn.js';

export const addChanges = async (addPattern: string) =>
  execute<string>(`Git adding changes with pattern "${addPattern}"`, async () => {
    return spawn(`git add ${addPattern}`);
  });
