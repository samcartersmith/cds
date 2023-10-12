import { execute } from '../repo/execute.js';
import { spawn } from '../repo/spawn.js';

export const checkoutNewBranch = async (newBranchName: string) =>
  execute<string>(`Git checking out new branch "${newBranchName}"`, async () => {
    return spawn(`git checkout -b ${newBranchName}`);
  });
