import { execute } from '../repo/execute.js';
import { spawn } from '../repo/spawn.js';

export const pullBranch = async (branchName: string) =>
  execute<string>(`Git pulling branch from origin "${branchName}"`, async () => {
    return spawn(`git pull origin ${branchName}`);
  });
