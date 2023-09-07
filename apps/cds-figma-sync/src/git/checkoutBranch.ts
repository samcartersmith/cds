import { execute } from '../execute.js';
import { spawn } from '../spawn.js';

export const checkoutBranch = async (branchName: string) =>
  execute<string>(`Git checking out branch "${branchName}"`, async () => {
    return spawn(`git checkout ${branchName}`);
  });
