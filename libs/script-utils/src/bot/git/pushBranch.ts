import { execute } from '../repo/execute.js';
import { spawn } from '../repo/spawn.js';

export const pushBranch = async (branchName: string) =>
  execute(`Git pushing branch to origin "${branchName}"`, async () => {
    return spawn(`git push origin ${branchName}`);
  });
