import { execute } from '../execute.js';
import { spawn } from '../spawn.js';

export const addChanges = async (addPattern: string) =>
  execute<string>(`Git adding changes with pattern "${addPattern}"`, async () => {
    return spawn(`git add ${addPattern}`);
  });
