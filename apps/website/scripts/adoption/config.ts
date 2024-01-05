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
const commerceWeb = 'commerce/www';
const commerceFE = 'commerce/frontend';
const identityGit = 'identity/frontend';
const paymentsOnRampGit = 'payments/onramp-widget';
const paymentsCbPayGit = 'payments/cbpay-rn-sdk';

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

export const hiddenProjects = ['commerce-merchant-mono'];

export const config: AdoptersConfig[] = [
  {
    type: 'category',
    label: 'Consumer',
    collapsed: true,
    items: [
      {
        ...monorepoConfig,
        id: 'commerce-merchant-mono',
        label: 'Commerce Merchant',
        projectTsAliases: ['@commerce/frontend'],
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
        root: path.join(tempDir, retailMobileGit, 'libs/react-native-core'),
        github: retailMobileGit,
        id: 'react-native-core',
        label: 'React Native Core',
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
        label: 'Advanced Trade Web Package',
        type: 'doc',
      },
      {
        root: path.join(tempDir, retailWebGit, 'app'),
        github: retailWebGit,
        id: 'advanced-web',
        label: 'Advanced Trade Web Components',
        type: 'doc',
        sourceGlob: [
          'views/Advanced/**/*.(ts|tsx)',
          'views/AdvancedFeeUpgrade/**/*.(ts|tsx)',
          'views/AdvancedFees/**/*.(ts|tsx)',
          'views/AdvancedFeesV2/**/*.(ts|tsx)',
          'views/AdvancedFills/**/*.(ts|tsx)',
          'views/AdvancedMarkets/**/*.(ts|tsx)',
          'views/AdvancedOrders/**/*.(ts|tsx)',
          'views/AdvancedPortfolio/**/*.(ts|tsx)',
          'views/AdvancedPositions/**/*.(ts|tsx)',
          'views/AdvancedTrade/**/*.(ts|tsx)',
          'views/AdvancedTradeApi/**/*.(ts|tsx)',
          'views/AdvancedTradeManagement/**/*.(ts|tsx)',
          'views/AdvancedTradeSpot/**/*.(ts|tsx)',
        ],
      },
      {
        root: path.join(tempDir, retailMobileGit),
        github: retailMobileGit,
        tsconfigFileName: 'tsconfig.base.json',
        id: 'cs3-mobile',
        label: 'Subscription & Services Mobile',
        type: 'doc',
        projectTsAliases: ['@app'],
        sourceGlob: [
          'screens/AdvocacyContentHub/**/*.(ts|tsx)',
          'screens/AdvocacyTransparentScreenTakeover/**/*.(ts|tsx)',
          'screens/Borrow/**/*.(ts|tsx)',
          'screens/CbNFT/**/*.(ts|tsx)',
          'screens/CoinbaseCard/**/*.(ts|tsx)',
          'screens/DappsDefiYield/**/*.(ts|tsx)',
          'screens/Defi/**/*.(ts|tsx)',
          'screens/Dex/**/*.(ts|tsx)',
          'screens/DirectDeposit/**/*.(ts|tsx)',
          'screens/NFTs/**/*.(ts|tsx)',
          'screens/Receive/**/*.(ts|tsx)',
          'screens/Send/**/*.(ts|tsx)',
          'screens/StackingV2/**/*.(ts|tsx)',
          'screens/SubscriptionBoostedRatesScreen/**/*.(ts|tsx)',
          'screens/SubscriptionDeeplinkRouter/**/*.(ts|tsx)',
          'screens/SubscriptionEnableCryptoBackups/**/*.(ts|tsx)',
          'screens/SubscriptionManagement/**/*.(ts|tsx)',
          'screens/SubscriptionPreferences/**/*.(ts|tsx)',
          'screens/SubscriptionSignup/**/*.(ts|tsx)',
          'screens/SubscriptionStakingOptIn/**/*.(ts|tsx)',
          'screens/SubscriptionUsdcBoostedReward/**/*.(ts|tsx)',
          'screens/USDC/**/*.(ts|tsx)',
          'screens/Web3/**/*.(ts|tsx)',
          'screens/WrappedAsset/**/*.(ts|tsx)',
          'screens/Defi/**/*.(ts|tsx)',
          'screens/YieldCenter/**/*.(ts|tsx)',
          'screens/YieldMigrationNotice/**/*.(ts|tsx)',
        ],
      },
      {
        root: path.join(tempDir, retailWebGit, 'app'),
        github: retailWebGit,
        id: 'cs3-web',
        label: 'Subscription & Services Web',
        type: 'doc',
        sourceGlob: [
          'views/AssetRecovery/**/*.(ts|tsx)',
          'views/Borrow/**/*.(ts|tsx)',
          'views/CoinbaseCard/**/*.(ts|tsx)',
          'views/DappWallet/**/*.(ts|tsx)',
          'views/DirectDepost/**/*.(ts|tsx)',
          'views/NftColection/**/*.(ts|tsx)',
          'views/Subscription/**/*.(ts|tsx)',
          'views/Web3/**/*.(ts|tsx)',
          'views/YieldCenter/**/*.(ts|tsx)',
        ],
      },
      {
        root: path.join(tempDir, mauiGit, 'maui-frontend'),
        github: mauiGit,
        id: 'maui',
        label: 'Coinbase NFT',
        type: 'doc',
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
      {
        root: path.join(tempDir, walletGit, 'workspaces'),
        github: walletGit,
        id: 'wallet-dapp',
        label: 'Wallet Dapp',
        projectTsAliases: [':dapp'],
        cdsAliases: [':apps/dapp'],
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
      {
        root: path.join(tempDir, frontendWebGit, 'apps/neptune'),
        github: frontendWebGit,
        id: 'neptune',
        label: 'Neptune',
        projectTsAliases: [':neptune/app', ':neptune/feature'],
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
        root: path.join(tempDir, identityGit, 'apps/unified-login'),
        github: identityGit,
        id: 'unified-login',
        label: 'Unified Login Web',
        sourceGlob: ['apps/unified-login/**/*.(ts|tsx)'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, identityGit, 'packages/two-factor-web'),
        github: identityGit,
        id: 'two-factor-web',
        label: 'Two Factor Web',
        sourceGlob: ['packages/two-factor-web/**/*.(ts|tsx)'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, identityGit, 'packages/two-factor-mobile'),
        github: identityGit,
        id: 'two-factor-mobile',
        label: 'Two Factor Mobile',
        sourceGlob: ['packages/two-factor-mobile/**/*.(ts|tsx)'],
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
    ],
  },
  {
    type: 'category',
    label: 'Developer',
    collapsed: true,
    items: [
      {
        root: path.join(tempDir, frontendWebGit, 'apps/cloud-console'),
        github: frontendWebGit,
        id: 'cloud-console',
        label: 'Cloud Console',
        projectTsAliases: [':cloud'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, commerceWeb),
        github: commerceWeb,
        tsconfigFileName: 'tsconfig.json',
        id: 'commerce-web',
        label: 'Commerce Web',
        type: 'doc',
      },
      {
        root: path.join(tempDir, commerceFE),
        github: commerceFE,
        tsconfigFileName: 'tsconfig.json',
        id: 'commerce-frontend',
        label: 'Commerce Frontend',
        type: 'doc',
      },
      {
        root: path.join(tempDir, paymentsOnRampGit),
        github: paymentsOnRampGit,
        tsconfigFileName: 'tsconfig.json',
        id: 'payments-onramp-widget',
        label: 'Payments On Ramp Widget',
        type: 'doc',
      },
      {
        root: path.join(tempDir, paymentsCbPayGit, 'workspaces/cbpay-sdk-rn'),
        github: paymentsCbPayGit,
        tsconfigFileName: 'tsconfig.json',
        id: 'cbpay-sdk-rn',
        label: 'Payments CBPay SDK RN',
        type: 'doc',
      },
    ],
  },
  {
    type: 'category',
    label: 'Other',
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
        root: path.join(tempDir, frontendWebGit, 'apps/abor'),
        github: frontendWebGit,
        id: 'abor',
        label: 'Abor',
        projectTsAliases: [':abor'],
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
