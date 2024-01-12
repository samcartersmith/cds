import type { RestEndpointMethods } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types';

import { execute } from '../repo/execute.js';

import type { OctokitData } from './core.js';

const CHANGE_MANAGEMENT_STATUS = `
**[Change management](https://confluence.coinbase-corp.com/display/SEC/PCI+Change+Management+for+Engineers)**

type=routine
risk=low
impact=sev5

automerge=false
`;

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
    const { body, ...restArgs } = args;
    const { data } = await installation.rest.pulls.create({
      owner: repoData.owner.login,
      repo: repoData.name,
      base: 'master',
      body: `${body}\n${CHANGE_MANAGEMENT_STATUS}`,
      ...restArgs,
    });
    return data;
  });
