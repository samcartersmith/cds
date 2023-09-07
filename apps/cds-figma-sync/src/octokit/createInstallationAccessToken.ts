import type { RestEndpointMethods } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types';

import { execute } from '../execute.js';

import { getOctokitData } from './core.js';

export type InstallationAccessTokenData = Awaited<
  ReturnType<RestEndpointMethods['apps']['createInstallationAccessToken']>
>['data'];

/**
 * Creates an access token for the GitHub App's Installation within the repo.
 * This token can be used to authenticate via the GitHub and/or Git CLI.
 */
export const createInstallationAccessToken = async () =>
  execute<InstallationAccessTokenData>('Creating installation access token', async () => {
    const { installation, repoInstallationData } = await getOctokitData();
    const { data: token } = await installation.rest.apps.createInstallationAccessToken({
      installation_id: repoInstallationData.id,
    });
    return token;
  });
