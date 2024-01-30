import { execute } from '../repo/execute.js';
import { spawn } from '../repo/spawn.js';

export const resetRemote = async ({
  owner,
  repo,
  accessToken,
}: {
  owner: string;
  repo: string;
  accessToken: string;
}) =>
  execute('Git resetting remote with new access token', async () => {
    return spawn(
      `git remote set-url origin https://x-access-token:${accessToken}@github.cbhq.net/${owner}/${repo}.git`,
    );
  });
