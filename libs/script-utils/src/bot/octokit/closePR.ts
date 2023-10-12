import type { RestEndpointMethods } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types';

import { execute } from '../repo/execute.js';

import type { OctokitData } from './core.js';

export type ClosePRData = Awaited<ReturnType<RestEndpointMethods['pulls']['update']>>['data'];

/**
 * Closes a PR in the repo.
 */
export const closePR = async (octokitData: OctokitData, pullNumber: number) =>
  execute<ClosePRData>(`Closing PR #${pullNumber}`, async () => {
    const { installation, repoData } = octokitData;
    const { data } = await installation.rest.pulls.update({
      owner: repoData.owner.login,
      repo: repoData.name,
      state: 'closed',
      pull_number: pullNumber,
    });
    return data;
  });
