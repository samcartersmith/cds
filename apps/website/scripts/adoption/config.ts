import path from 'node:path';
import { getPath } from '@cbhq/script-utils';

import { flattenConfig } from './utils/flattenConfig';
import { formatSidebar } from './utils/formatSidebar';
import type { AdoptersConfig, FeaturedComponentsConfig } from './types';

export const tempDir = getPath(`apps/website/.docusaurus/@cbhq/adoption`);
/**
 * The consumer facing url is based on folder structure and we don't want
 * to have to require the consumer facing URL to contain some variation of generated in the url
 * since this is an implementation detail.
 */
export const adoptionDocsDir = getPath(`apps/website/docs/adoption-tracker`);
export const generatedDataDir = getPath(`apps/website/data/__generated__/adoption`);
export const generatedStaticDataDir = {
  relativePath: `static/data/__generated__/adoption`,
  get absolutePath() {
    return getPath(`apps/website/${this.relativePath}`);
  },
};

const frontendWebGit = 'frontend/web';
const assethubGit = 'c3/assethub-frontend';
const monorepoGit = 'mono/repo';
const retailMobileGit = 'consumer/react-native';
const retailWebGit = 'frontend/coinbase-www';
const walletGit = 'wallet/wallet-mobile';
const unifiedAccountsGit = 'frontend/unified-identity-accounts';
const mauiGit = 'frontend/maui';
const primeMobileGit = 'prime/mobile';
const primeWebGit = 'institutional/frontend';
const commercePayerGit = 'commerce/www';

const assethubConfig = {
  root: path.join(tempDir, assethubGit),
  github: assethubGit,
  tsconfigFileName: 'tsconfig.base.json',
};

const monorepoConfig = {
  root: path.join(tempDir, monorepoGit),
  github: monorepoGit,
  tsconfigFileName: 'tsconfig.options.json',
};

const primeWebConfig = {
  root: path.join(tempDir, primeWebGit),
  github: primeWebGit,
  tsconfigFileName: 'tsconfig.base.json',
};

export const hiddenProjects = ['commerce-merchant', 'commerce-payer'];

export const config: AdoptersConfig[] = [
  {
    type: 'category',
    label: 'Ecosystem',
    collapsed: true,
    items: [
      {
        ...assethubConfig,
        id: 'assethub-web',
        label: 'AssetHub Issuer',
        projectTsAliases: [':www', ':shared'],
        type: 'doc',
      },
      {
        ...assethubConfig,
        id: 'assethub-admin',
        label: 'AssetHub Admin',
        projectTsAliases: [':admin', ':shared'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, mauiGit, 'maui-frontend'),
        github: mauiGit,
        id: 'maui',
        label: 'NFT',
        type: 'doc',
      },
      {
        root: path.join(tempDir, retailMobileGit),
        github: retailMobileGit,
        tsconfigFileName: 'tsconfig.base.json',
        id: 'yield-mobile',
        label: 'Yield Mobile',
        type: 'doc',
        projectTsAliases: ['@app'],
        sourceGlob: ['screens/YieldCenter/**/*.(ts|tsx)', 'screens/DefiBoost/**/*.(ts|tsx)'],
      },
      {
        root: path.join(tempDir, retailWebGit, 'app'),
        github: retailWebGit,
        id: 'yield-web',
        label: 'Yield Web',
        type: 'doc',
        sourceGlob: ['views/YieldCenter/**/*.(ts|tsx)'],
      },
      {
        root: path.join(tempDir, walletGit, 'workspaces'),
        github: walletGit,
        id: 'wallet-extension',
        label: 'Wallet Chrome Extension',
        /**
         * https://github.cbhq.net/wallet/wallet-mobile/blob/master/workspaces/tsconfig.base.json#L24
         * tsconfig alias :extension has path for code to parse
         * which should point to
         * https://github.cbhq.net/wallet/wallet-mobile/tree/master/workspaces/apps/extension/src
         */
        projectTsAliases: [':extension'],
        /**
         * ignoreDirs should be relative to project path above so this should ignore this directory
         * https://github.cbhq.net/wallet/wallet-mobile/tree/master/workspaces/apps/extension/src/debug
         */
        ignoreDirs: ['debug/**'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, walletGit, 'workspaces'),
        github: walletGit,
        id: 'wallet-react-native',
        label: 'Wallet React Native',
        projectTsAliases: [':rn'],
        cdsAliases: [':rn/cds-wallet'],
        type: 'doc',
      },
    ],
  },
  {
    type: 'category',
    label: 'Institutional',
    collapsed: true,
    items: [
      {
        root: path.join(tempDir, primeMobileGit),
        github: primeMobileGit,
        id: 'prime-mobile',
        label: 'Prime Mobile',
        projectTsAliases: ['@prime-mobile'],
        type: 'doc',
      },
      {
        ...primeWebConfig,
        id: 'prime-web',
        label: 'Prime Web',
        projectTsAliases: ['@prime-ui'],
        type: 'doc',
      },
      {
        ...primeWebConfig,
        id: 'prime-admin',
        label: 'Prime Admin',
        projectTsAliases: ['@prime-admin', ':prime/admin', '@prime-ui'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, unifiedAccountsGit),
        github: unifiedAccountsGit,
        id: 'unified-business-onboarding',
        label: 'Unified Business Onboarding',
        projectTsAliases: ['@ubo'],
        type: 'doc',
      },
    ],
  },
  {
    type: 'category',
    label: 'Platform',
    collapsed: true,
    items: [
      {
        root: path.join(tempDir, unifiedAccountsGit),
        github: unifiedAccountsGit,
        id: 'unified-accounts',
        label: 'Unified Accounts',
        projectTsAliases: ['@acc'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, frontendWebGit, 'apps/unified-login'),
        github: frontendWebGit,
        id: 'unified-login',
        label: 'Unified Login Web',
        sourceGlob: ['apps/unified-login/**/*.(ts|tsx)'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, frontendWebGit, 'packages/two-factor-web'),
        github: frontendWebGit,
        id: 'two-factor-web',
        label: 'Two Factor Web',
        sourceGlob: ['packages/two-factor-web/**/*.(ts|tsx)'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, frontendWebGit, 'packages/two-factor-mobile-internal'),
        github: frontendWebGit,
        id: 'two-factor-mobile',
        label: 'Two Factor Mobile',
        sourceGlob: ['packages/two-factor-mobile-internal/**/*.(ts|tsx)'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, unifiedAccountsGit),
        github: unifiedAccountsGit,
        id: 'tax-center',
        label: 'Tax Center',
        projectTsAliases: ['@taxcenter'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, frontendWebGit, 'apps/cloud-console'),
        github: frontendWebGit,
        id: 'cloud-console',
        label: 'Cloud Console',
        projectTsAliases: [':cloud'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, frontendWebGit, 'packages/cb-chat'),
        github: frontendWebGit,
        id: 'cb-chat',
        label: 'Coinbase Chat Web',
        sourceGlob: ['packages/cb-chat/**/*.(ts|tsx)'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, frontendWebGit, 'packages/cb-chat-mobile'),
        github: frontendWebGit,
        id: 'cb-chat-mobile',
        label: 'Coinbase Chat Mobile',
        sourceGlob: ['packages/cb-chat-mobile/**/*.(ts|tsx)'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, frontendWebGit, 'apps/neptune'),
        github: frontendWebGit,
        id: 'neptune',
        label: 'Neptune',
        projectTsAliases: [':neptune/app', ':neptune/feature'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, frontendWebGit, 'apps/abor'),
        github: frontendWebGit,
        id: 'abor',
        label: 'Abor',
        projectTsAliases: [':abor'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, frontendWebGit, 'apps/stand-with-crypto'),
        github: frontendWebGit,
        id: 'stand-with-crypto',
        label: 'Stand With Crypto',
        projectTsAliases: [':stand-with-crypto'],
        type: 'doc',
      },
    ],
  },
  {
    type: 'category',
    label: 'Retail',
    collapsed: true,
    items: [
      {
        ...monorepoConfig,
        id: 'commerce-merchant',
        label: 'Commerce Merchant',
        projectTsAliases: ['@commerce/frontend'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, commercePayerGit),
        github: commercePayerGit,
        tsconfigFileName: 'tsconfig.json',
        id: 'commerce-payer',
        label: 'Commerce Payer',
        type: 'doc',
      },
      {
        root: path.join(tempDir, retailMobileGit),
        github: retailMobileGit,
        tsconfigFileName: 'tsconfig.base.json',
        id: 'retail-mobile',
        label: 'Retail Mobile',
        projectTsAliases: ['@app'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, retailWebGit, 'app'),
        github: retailWebGit,
        id: 'retail-web-logged-in',
        label: 'Retail Web Logged In',
        type: 'doc',
      },
      {
        root: path.join(tempDir, retailMobileGit),
        github: retailMobileGit,
        tsconfigFileName: 'tsconfig.base.json',
        id: 'umo',
        label: 'Unified Mobile Onboarding',
        projectTsAliases: ['@onboarding'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, retailWebGit, 'marketing'),
        github: retailWebGit,
        id: 'retail-web-logged-out',
        label: 'Retail Web Logged Out',
        type: 'doc',
      },
      {
        root: path.join(tempDir, retailWebGit, 'onboarding'),
        github: retailWebGit,
        id: 'retail-web-identity',
        label: 'Retail Onboarding',
        type: 'doc',
        sourceGlob: ['(components|steps)/**/*.(ts|tsx)'],
      },
      {
        root: path.join(tempDir, retailWebGit, 'packages/advanced-trade-web'),
        github: retailWebGit,
        id: 'advanced-trade-web',
        label: 'Advanced Trade Web',
        type: 'doc',
      },
    ],
  },
];

/** Used for AST parser */
export const adopters = flattenConfig(config);

/** Required for website sidebar. */
export const adoptersSidebar = formatSidebar(config, hiddenProjects);

/** Required to associate adopters with their stats.json file for Adoption Overview page. */
export const adoptersWithPillar = adopters
  .filter((item) => !hiddenProjects.includes(item.id))
  .map((item) => ({
    id: item.id,
    pillar: item.pillar,
  }));

/** Allows us to access these metrics without publishing them. */
export const hiddenAdoptersWithPillar = adopters
  .filter((item) => hiddenProjects.includes(item.id))
  .map((item) => ({
    id: item.id,
    pillar: item.pillar,
  }));

/** Adds an `isFeatured` flag to metadata of listed components */
export const featuredComponentsConfig: FeaturedComponentsConfig = {
  cds: [],
  presentational: [],
  other: [],
};
