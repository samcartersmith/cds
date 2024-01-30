import { execute } from '../repo/execute.js';
import { spawn } from '../repo/spawn.js';

export const checkoutBranch = async (branchName: string) =>
  execute(`Git checking out branch "${branchName}"`, async () => {
    return spawn(`git checkout ${branchName}`);
  });
