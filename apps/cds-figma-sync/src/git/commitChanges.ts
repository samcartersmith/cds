import { getConfigServiceValue } from '../configService.js';
import { execute } from '../execute.js';
import { spawn } from '../spawn.js';

export const commitChanges = async (commitMessage: string) =>
  execute<string>(`Git committing changes with message "${commitMessage}"`, async () => {
    const name = getConfigServiceValue('GIT_USER_NAME');
    const email = getConfigServiceValue('GIT_USER_EMAIL');
    return spawn(
      `git config user.name "${name}" && git config user.email "${email}" && git commit -m "${commitMessage}"`,
    );
  });
