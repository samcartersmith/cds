import { execute } from '../execute.js';
import { spawn } from '../spawn.js';

export const validatePackageRelease = async () =>
  execute<string>(`Updating website changelogs and validating release`, async () => {
    return spawn('yarn release');
  });
