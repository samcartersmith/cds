import { execute } from '../execute.js';
import { spawn } from '../spawn.js';

export const deleteBranchesExcept = async (branchToKeep: string) =>
  execute<string>(`Git deleting all branches except "${branchToKeep}"`, async () => {
    return spawn(`git branch | grep -v "${branchToKeep}" | xargs git branch -D`);
  });
