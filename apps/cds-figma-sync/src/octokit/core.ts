import type { RestEndpointMethods } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types';
import { App, Octokit } from 'octokit';

import { getAppConfig } from '../config.js';
import { execute } from '../execute.js';

export type RepoData = Awaited<ReturnType<RestEndpointMethods['repos']['get']>>['data'];

export type RepoInstallationData = Awaited<
  ReturnType<RestEndpointMethods['apps']['getRepoInstallation']>
>['data'];

type OctokitData = {
  app?: App;
  installation?: Octokit;
  repoData?: RepoData;
  repoInstallationData?: RepoInstallationData;
};

const octokitData: OctokitData = {};

let initialized = false;

/**
 * Creates the Octokit instances for the GitHub App and its Installation.
 */
export const initializeOctokitData = async () => {
  const { github, octokit } = await getAppConfig();

  // Initialize an Octokit for the GitHub App if we don't have one
  if (!octokitData.app) {
    // https://github.com/octokit/app.js#constructor
    octokitData.app = new App({
      appId: octokit.appId,
      privateKey: octokit.privateKey,
      Octokit: Octokit.defaults({
        baseUrl: `https://${github.baseUrl}/api/v3`,
      }),
    });
  }

  // Initialize an Octokit for the GitHub App's Installation if we don't have one
  if (!octokitData.installation) {
    // Collect metadata about the GitHub App's Installation within the repo
    octokitData.repoInstallationData = await execute<RepoInstallationData>(
      'Fetching repo app installation data',
      async () => {
        if (!octokitData.app)
          throw Error('Attempted to create installation Octokit without app Octokit');
        const { data } = await octokitData.app.octokit.rest.apps.getRepoInstallation({
          owner: octokit.installationOwner,
          repo: octokit.installationRepo,
        });
        return data;
      },
    );

    octokitData.installation = await octokitData.app.getInstallationOctokit(
      octokitData.repoInstallationData.id,
    );

    // Collect metadata about the repo the GitHub App is installed in
    octokitData.repoData = await execute<RepoData>('Fetching repo data', async () => {
      if (!octokitData.installation) throw Error('Missing Octokit installation');
      const { data } = await octokitData.installation.rest.repos.get({
        owner: octokit.installationOwner,
        repo: octokit.installationRepo,
      });
      return data;
    });
  }

  initialized = true;
};

/**
 * Always use this function to get the Octokit data to ensure it's initialized.
 * Reads from the config.ts file to initialize the Octokit instances.
 */
export const getOctokitData = async () => {
  if (!initialized || !octokitData.app) await initializeOctokitData();
  return octokitData as Required<typeof octokitData>;
};
