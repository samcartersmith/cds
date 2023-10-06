import { getAppConfig } from '../config.js';
import { execute } from '../execute.js';
import { spawn } from '../spawn.js';

export const resetRemote = async ({
  owner,
  repo,
  accessToken,
}: {
  owner: string;
  repo: string;
  accessToken: string;
}) =>
  execute<string>('Git resetting remote with new access token', async () => {
    const { github } = await getAppConfig();

    return spawn(
      `git remote set-url origin https://x-access-token:${accessToken}@${github.baseUrl}/${owner}/${repo}.git`,
    );
  });
