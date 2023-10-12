import type { RestEndpointMethods } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types';

import { execute } from '../repo/execute.js';

import type { OctokitData } from './core.js';

export type OpenPRData = Awaited<ReturnType<RestEndpointMethods['pulls']['list']>>['data'];

/**
 * Fetches all the open PRs from the repo.
 */
export const getOpenPRs = async (octokitData: OctokitData) =>
  execute<OpenPRData>('Fetching open PRs', async () => {
    const { installation, repoData } = octokitData;
    const { data } = await installation.rest.pulls.list({
      owner: repoData.owner.login,
      repo: repoData.name,
      state: 'open',
    });
    return data;
  });
