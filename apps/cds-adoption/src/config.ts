import { bot } from '@cbhq/script-utils';

import { getConfigServiceValue, initializeConfigService } from './configService.js';

export type AppConfig = {
  octokit: {
    /* The ID of the GitHub App */
    appId: number;
    /* The private key for the GitHub App */
    privateKey: string;
    /* The GitHub org and repo that the GitHub App is installed in, e.g. "frontend/cds" */
    repo: string;
  };
};

const config: AppConfig = {
  octokit: {
    appId: 82,
    privateKey: '',
    repo: 'frontend/cds',
  },
};

let initialized = false;

const initializeAppConfig = async () => {
  bot.logger.info('Initializing app config');
  await initializeConfigService();
  const privateKey = getConfigServiceValue('GITHUB_PRIVATE_KEY');
  let errorMessage = '';
  if (!privateKey) errorMessage += 'Config Service values are missing: ';
  if (!privateKey) errorMessage += 'GITHUB_PRIVATE_KEY is undefined.';
  if (errorMessage) throw Error(errorMessage);
  config.octokit.privateKey = privateKey as string;
  initialized = true;
};

export const getAppConfig = async (): Promise<AppConfig> => {
  if (!initialized) await initializeAppConfig();
  return config;
};
