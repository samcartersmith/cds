import { getConfigServiceValue } from '../configService.js';
import { execute } from '../execute.js';
import { spawn } from '../spawn.js';

export const commitChanges = async (commitMessage: string) =>
  execute<string>(`Git committing changes with message "${commitMessage}"`, async () => {
    return spawn(
      `git config user.name "${getConfigServiceValue(
        'GIT_USER_NAME',
      )}" && git config user.email "${getConfigServiceValue(
        'GIT_USER_EMAIL',
      )}" && git commit -m "${commitMessage}"`,
    );
  });
