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
  figma: {
    /* The personal access token for the Figma API */
    accessToken: string;
  };
  repo: {
    /* The directory where the icons sync script outputs files and assets */
    generatedIconsPath: string;
    /* The directory where the illustrations sync script outputs files and assets */
    generatedIllustrationsPath: string;
    /* The path to the icons changelog file */
    iconsChangelogPath: string;
    /* The path to the illustrations changelog file */
    illustrationsChangelogPath: string;
  };
};

const config: AppConfig = {
  octokit: {
    appId: 82,
    privateKey: '',
    repo: 'frontend/cds',
  },
  figma: {
    accessToken: '',
  },
  repo: {
    generatedIconsPath: 'packages/icons/src/__generated__',
    generatedIllustrationsPath: 'packages/illustrations/src/__generated__',
    iconsChangelogPath: 'packages/icons/CHANGELOG.md',
    illustrationsChangelogPath: 'packages/illustrations/CHANGELOG.md',
  },
};

let initialized = false;

const initializeAppConfig = async () => {
  bot.logger.info('Initializing app config');
  await initializeConfigService();
  const privateKey = getConfigServiceValue('GITHUB_PRIVATE_KEY');
  const figmaToken = getConfigServiceValue('FIGMA_ACCESS_TOKEN');
  let errorMessage = '';
  if (!privateKey || !figmaToken) errorMessage += 'Config Service values are missing: ';
  if (!privateKey) errorMessage += 'GITHUB_PRIVATE_KEY is undefined.';
  if (!figmaToken) errorMessage += 'FIGMA_ACCESS_TOKEN is undefined.';
  if (errorMessage) throw Error(errorMessage);
  config.octokit.privateKey = privateKey as string;
  config.figma.accessToken = figmaToken as string;
  initialized = true;
};

export const getAppConfig = async (): Promise<AppConfig> => {
  if (!initialized) await initializeAppConfig();
  return config;
};
