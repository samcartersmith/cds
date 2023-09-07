import type { RestEndpointMethods } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types';

import { execute } from '../execute.js';

import { getOctokitData } from './core.js';

export type OpenPRData = Awaited<ReturnType<RestEndpointMethods['pulls']['list']>>['data'];

/**
 * Fetches all the open PRs from the repo.
 */
export const getOpenPRs = async () =>
  execute<OpenPRData>('Fetching open PRs', async () => {
    const { installation, repoData } = await getOctokitData();
    const { data } = await installation.rest.pulls.list({
      owner: repoData.owner.login,
      repo: repoData.name,
      state: 'open',
    });
    return data;
  });
