import { execute } from './execute.js';
import { type SpawnOptions, spawn } from './spawn.js';

export const runNxTarget = async (nxTarget: string, options?: SpawnOptions) =>
  execute<string>(`Running Nx target ${nxTarget}`, async () => {
    const [projectName, targetName] = nxTarget.split(':');

    const nxTargetResult = spawn(`yarn nx run ${nxTarget}`, options);

    // eslint-disable-next-line
    const resultWithoutANSICodes = nxTargetResult.replace(/\x1B\[\d+m/g, '');

    // can't rely on stderr output because the sync scripts don't properly surface errors
    const isFailedRun = !resultWithoutANSICodes.includes(
      `Successfully ran target ${targetName} for project ${projectName}`,
    );

    if (isFailedRun) {
      throw new Error(`Failed to run Nx target ${nxTarget}`);
    }

    return nxTargetResult;
  });
