import type { RestEndpointMethods } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types';

import { execute } from '../execute.js';

import { getOctokitData } from './core.js';

export type CreatePRData = Awaited<ReturnType<RestEndpointMethods['pulls']['create']>>['data'];

/**
 * Creates a PR in the repo from the head branch to the master branch.
 */
export const createPR = async (args: { title: string; body: string; head: string }) =>
  execute<CreatePRData>('Creating PR', async () => {
    const { installation, repoData } = await getOctokitData();
    const { data } = await installation.rest.pulls.create({
      owner: repoData.owner.login,
      repo: repoData.name,
      base: 'master',
      ...args,
    });
    return data;
  });
