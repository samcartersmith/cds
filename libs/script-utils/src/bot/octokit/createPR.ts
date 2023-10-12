import type { RestEndpointMethods } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types';

import { execute } from '../repo/execute.js';

import type { OctokitData } from './core.js';

export type CreatePRData = Awaited<ReturnType<RestEndpointMethods['pulls']['create']>>['data'];

export type CreatePRArgs = {
  title: string;
  body: string;
  head: string;
};

/**
 * Creates a PR in the repo from the head branch to the master branch.
 */
export const createPR = async (octokitData: OctokitData, args: CreatePRArgs) =>
  execute<CreatePRData>('Creating PR', async () => {
    const { installation, repoData } = octokitData;
    const { data } = await installation.rest.pulls.create({
      owner: repoData.owner.login,
      repo: repoData.name,
      base: 'master',
      ...args,
    });
    return data;
  });
