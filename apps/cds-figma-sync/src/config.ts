import { getConfigServiceValue, initializeConfigService } from './configService.js';
import { logger } from './logger.js';

export type AppConfig = {
  github: {
    /* The base URL for the GitHub instance */
    baseUrl: string;
  };
  octokit: {
    /* The ID of the GitHub App */
    appId: number;
    /* The private key for the GitHub App */
    privateKey: string;
    /* The owner of the repo that the GitHub App is installed in */
    installationOwner: string;
    /* The repo that the GitHub App is installed in */
    installationRepo: string;
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
    /* The pattern to use to locate updated project changelogs */
    changelogPath: string;
  };
};

const config: AppConfig = {
  github: {
    baseUrl: 'github.cbhq.net',
  },
  octokit: {
    appId: 82,
    privateKey: '',
    installationOwner: 'frontend',
    installationRepo: 'cds',
  },
  figma: {
    accessToken: '',
  },
  repo: {
    generatedIconsPath: 'packages/icons/src/__generated__',
    generatedIllustrationsPath: 'packages/illustrations/src/__generated__',
    changelogPath: 'packages/{project}/CHANGELOG.md',
  },
};

let initialized = false;

const initializeAppConfig = async () => {
  logger.info('Initializing app config');
  await initializeConfigService();
  const privateKey = getConfigServiceValue('PRIVATE_KEY');
  const figmaToken = getConfigServiceValue('FIGMA_TOKEN');
  let errorMessage = '';
  if (!privateKey || !figmaToken) errorMessage += 'Config Service values are missing: ';
  if (!privateKey) errorMessage += 'PRIVATE_KEY is undefined.';
  if (!figmaToken) errorMessage += 'FIGMA_TOKEN is undefined.';
  if (errorMessage) throw Error(errorMessage);
  config.octokit.privateKey = privateKey as string;
  config.figma.accessToken = figmaToken as string;
  initialized = true;
};

export const getAppConfig = async (): Promise<AppConfig> => {
  if (!initialized) await initializeAppConfig();
  return config;
};
