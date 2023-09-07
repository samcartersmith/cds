import { getConfigServiceValue } from './configService.js';
import { execute } from './execute.js';
import { spawn } from './spawn.js';

const spawnOptions = {
  env: {
    FIGMA_ACCESS_TOKEN: getConfigServiceValue('FIGMA_TOKEN'),
  },
};

type SyncOptions = {
  project: string;
  target: string;
  exitOnBreakingChanges?: boolean;
  generatedDirectory?: string;
};

export const sync = async ({
  project,
  target,
  exitOnBreakingChanges,
  generatedDirectory,
}: SyncOptions) => {
  const result = await execute<string>(`Running ${project}:${target} task`, async () => {
    return spawn(
      `yarn nx run ${project}:${target}${exitOnBreakingChanges ? ' --exitOnBreakingChanges' : ''}${
        generatedDirectory ? ` --generatedDirectory '${generatedDirectory}'` : ''
      }`,
      spawnOptions,
    );
  });

  // can't rely on stderr output because the sync scripts don't properly surface errors
  if (!result.includes(`Successfully ran target ${target} for project ${project}`)) {
    throw new Error(`Task ${project}:${target} failed`);
  }
};
