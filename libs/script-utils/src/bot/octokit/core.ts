import type { RestEndpointMethods } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types';
import { App, Octokit } from 'octokit';

import { execute } from '../repo/execute.js';

import { closePR } from './closePR';
import { createInstallationAccessToken } from './createInstallationAccessToken';
import { type CreatePRArgs, createPR } from './createPR';
import { getOpenPRs } from './getOpenPRs';

export type RepoData = Awaited<ReturnType<RestEndpointMethods['repos']['get']>>['data'];

export type RepoInstallationData = Awaited<
  ReturnType<RestEndpointMethods['apps']['getRepoInstallation']>
>['data'];

export type OctokitConfig = {
  /* The unique ID of the GitHub App */
  appId: number;
  /* The key for the GitHub App */
  privateKey: string;
  /* The GitHub org and repo that the GitHub App is installed in, e.g. "frontend/cds" */
  repo: string;
};

export type OctokitData = {
  app: App;
  installation: Octokit;
  repoData: RepoData;
  repoInstallationData: RepoInstallationData;
};

export type OctokitBot = OctokitData & {
  closePR: (pullNumber: number) => ReturnType<typeof closePR>;
  createInstallationAccessToken: () => ReturnType<typeof createInstallationAccessToken>;
  createPR: (args: CreatePRArgs) => ReturnType<typeof createPR>;
  getOpenPRs: () => ReturnType<typeof getOpenPRs>;
};

export const initializeOctokit = async ({ appId, privateKey, repo: orgAndRepo }: OctokitConfig) => {
  // Initialize an Octokit instance for the GitHub App
  // https://github.com/octokit/app.js#constructor
  const app = new App({
    appId,
    privateKey,
    Octokit: Octokit.defaults({ baseUrl: 'https://github.cbhq.net/api/v3' }),
  });

  const [owner, repo] = orgAndRepo.split('/');

  // Initialize an Octokit instance for the GitHub App's Installation
  // Collect metadata about the GitHub App's Installation within the repo
  const repoInstallationData = await execute<RepoInstallationData>(
    'Fetching repo app installation data',
    async () => {
      if (!app) throw Error('Missing Octokit app');
      const { data } = await app.octokit.rest.apps.getRepoInstallation({ owner, repo });
      return data;
    },
  );

  const installation = await app.getInstallationOctokit(repoInstallationData.id);

  // Collect metadata about the repo the GitHub App is installed in
  const repoData = await execute<RepoData>('Fetching repo data', async () => {
    const { data } = await installation.rest.repos.get({ owner, repo });
    return data;
  });

  const octokitData: OctokitData = {
    app,
    installation,
    repoData,
    repoInstallationData,
  };

  const octokitBot: OctokitBot = {
    ...octokitData,
    closePR: async (pullNumber: number) => closePR(octokitData, pullNumber),
    createInstallationAccessToken: async () => createInstallationAccessToken(octokitData),
    createPR: async (args: CreatePRArgs) => createPR(octokitData, args),
    getOpenPRs: async () => getOpenPRs(octokitData),
  };

  return octokitBot;
};
