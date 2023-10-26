import { execute } from './execute.js';
import { spawn } from './spawn.js';

export const validatePackageRelease = async () =>
  execute<string>(`Updating website changelogs and validating release`, async () => {
    const validateResult = spawn('yarn release');
    const isFailedValidation = validateResult.includes('Changelog not generated');

    if (isFailedValidation)
      throw new Error('Failed to validate release: required changelogs were not updated');

    return validateResult;
  });
