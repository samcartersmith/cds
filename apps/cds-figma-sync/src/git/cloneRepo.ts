import { getAppConfig } from '../config.js';
import { execute } from '../execute.js';
import { spawn } from '../spawn.js';

export const cloneRepo = async ({
  owner,
  repo,
  accessToken,
}: {
  owner: string;
  repo: string;
  accessToken: string;
}) =>
  execute<string>(`Git cloning repo "${owner}/${repo}"`, async () => {
    const { github } = await getAppConfig();
    return spawn(
      `git clone https://x-access-token:${accessToken}@${github.baseUrl}/${owner}/${repo}.git --progress`,
    );
  });
