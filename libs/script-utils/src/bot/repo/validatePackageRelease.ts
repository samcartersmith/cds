import { execute } from './execute.js';
import { spawn } from './spawn.js';

export const validatePackageRelease = async () =>
  execute(`Updating website changelogs and validating release`, async () => {
    const validateResult = spawn('yarn release');
    const isFailedValidation = validateResult.stdout.includes('Changelog not generated');

    if (isFailedValidation)
      throw new Error('Failed to validate release: required changelogs were not updated');

    return validateResult;
  });
