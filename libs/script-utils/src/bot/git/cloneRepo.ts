import { execute } from '../repo/execute.js';
import { spawn } from '../repo/spawn.js';

export const cloneRepo = async ({
  owner,
  repo,
  accessToken,
}: {
  owner: string;
  repo: string;
  accessToken: string;
}) =>
  execute(`Git cloning repo "${owner}/${repo}"`, async () => {
    return spawn(
      `git clone https://x-access-token:${accessToken}@github.cbhq.net/${owner}/${repo}.git --progress`,
    );
  });
