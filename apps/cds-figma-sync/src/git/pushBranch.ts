import { execute } from '../execute.js';
import { spawn } from '../spawn.js';

export const pushBranch = async (branchName: string) =>
  execute<string>(`Git pushing branch to origin "${branchName}"`, async () => {
    return spawn(`git push origin ${branchName}`);
  });
