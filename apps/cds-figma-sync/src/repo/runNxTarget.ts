import { getConfigServiceValue } from '../configService.js';
import { execute } from '../execute.js';
import { spawn } from '../spawn.js';

type NxTargetOptions = {
  exitOnBreakingChanges?: boolean;
  generatedDirectory?: string;
};

export const runNxTarget = async (
  nxTarget: string,
  { exitOnBreakingChanges, generatedDirectory }: NxTargetOptions = {},
) =>
  execute<string>(`Running Nx target ${nxTarget}`, async () => {
    const [projectName, targetName] = nxTarget.split(':');
    const exitOnBreakingChangesFlag = exitOnBreakingChanges ? ' --exitOnBreakingChanges' : '';
    const generatedDirectoryFlag = generatedDirectory
      ? ` --generatedDirectory '${generatedDirectory}'`
      : '';

    const nxTargetResult = spawn(
      `yarn nx run ${nxTarget}${exitOnBreakingChangesFlag}${generatedDirectoryFlag}`,
      { env: { FIGMA_ACCESS_TOKEN: getConfigServiceValue('FIGMA_TOKEN') } },
    );

    // eslint-disable-next-line no-control-regex
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
