import { execute } from '../repo/execute.js';
import { spawn } from '../repo/spawn.js';

export const deleteBranchesExcept = async (branchToKeep: string) =>
  execute(`Git deleting all branches except "${branchToKeep}"`, async () => {
    return spawn(`git branch | grep -v "${branchToKeep}" | xargs git branch -D`);
  });
