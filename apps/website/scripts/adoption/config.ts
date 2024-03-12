import path from 'node:path';
import { getPath } from '@cbhq/script-utils';

import { ProductComponentConfig } from '../../components/AdoptionTracker/types';

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
const internationalUIGit = 'exchange/international-ui';
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
        projectGitPath: 'apps/commerce-merchant',
      },
      {
        root: path.join(tempDir, retailMobileGit),
        github: retailMobileGit,
        tsconfigFileName: 'tsconfig.base.json',
        id: 'retail-mobile',
        label: 'Retail Mobile',
        projectTsAliases: ['@app'],
        type: 'doc',
        dependencyPath: path.join(tempDir, retailMobileGit, 'src/packages/app'),
        projectGitPath: 'src/packages/app',
      },
      {
        root: path.join(tempDir, retailWebGit, 'app'),
        github: retailWebGit,
        id: 'retail-web-logged-in',
        label: 'Retail Web Logged In',
        type: 'doc',
        projectGitPath: 'app',
      },
      {
        //  note: react-native-core has * in it's package.json (https://github.cbhq.net/consumer/react-native/blob/master/libs/react-native-core/package.json)
        // we will use the app package.json

        root: path.join(tempDir, retailMobileGit, 'libs/react-native-core'),
        github: retailMobileGit,
        id: 'react-native-core',
        label: 'React Native Core',
        type: 'doc',
        dependencyPath: path.join(tempDir, retailMobileGit, 'src/packages/app'),
        projectGitPath: 'libs/react-native-core',
      },
      {
        //  note: react-native/src/packages/onboarding has * in it's package.json (https://github.cbhq.net/consumer/react-native/blob/master/src/packages/onboarding/package.json)
        // we will use the dev dependency
        root: path.join(tempDir, retailMobileGit),
        github: retailMobileGit,
        tsconfigFileName: 'tsconfig.base.json',
        id: 'umo',
        label: 'Unified Mobile Onboarding',
        projectTsAliases: ['@onboarding'],
        type: 'doc',
        dependencyPath: path.join(tempDir, retailMobileGit, 'src/packages/onboarding'),
        projectGitPath: 'src/packages/onboarding',
      },
      {
        root: path.join(tempDir, retailWebGit, 'marketing'),
        github: retailWebGit,
        id: 'retail-web-logged-out',
        label: 'Retail Web Logged Out',
        type: 'doc',
        projectGitPath: 'marketing',
      },
      {
        root: path.join(tempDir, retailWebGit, 'onboarding'),
        github: retailWebGit,
        id: 'retail-web-identity',
        label: 'Retail Onboarding',
        type: 'doc',
        sourceGlob: ['(components|steps)/**/*.(ts|tsx)'],
        projectGitPath: 'onboarding',
      },
      {
        root: path.join(tempDir, retailWebGit, 'packages/advanced-trade-web'),
        github: retailWebGit,
        id: 'advanced-trade-web',
        label: 'Advanced Trade Web Package',
        type: 'doc',
        projectGitPath: 'packages/advanced-trade-web',
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
        projectGitPath: 'app/src/views',
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
        dependencyPath: path.join(tempDir, retailMobileGit, 'src/packages/app'),
        projectGitPath: 'src/packages/app/src/screens',
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
        projectGitPath: 'app/src/views',
      },
      {
        root: path.join(tempDir, mauiGit, 'maui-frontend'),
        github: mauiGit,
        id: 'maui',
        label: 'Coinbase NFT',
        type: 'doc',
        projectGitPath: '',
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
        dependencyPath: path.join(tempDir, walletGit, 'workspaces/apps/extension'),
        projectGitPath: 'workspaces/apps/extension',
      },
      {
        root: path.join(tempDir, walletGit, 'workspaces'),
        github: walletGit,
        id: 'wallet-react-native',
        label: 'Wallet React Native',
        projectTsAliases: [':rn'],
        cdsAliases: [':rn/cds-wallet'],
        type: 'doc',
        dependencyPath: path.join(tempDir, walletGit, 'workspaces/apps/rn'),
        projectGitPath: 'workspaces/apps/rn',
      },
      {
        root: path.join(tempDir, walletGit, 'workspaces'),
        github: walletGit,
        id: 'wallet-dapp',
        label: 'Wallet Dapp',
        projectTsAliases: [':dapp'],
        cdsAliases: [':apps/dapp'],
        type: 'doc',
        dependencyPath: path.join(tempDir, walletGit, 'workspaces/apps/dapp'),
        projectGitPath: 'workspaces/apps/dapp',
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
        projectGitPath: '',
      },
      {
        ...primeWebConfig,
        id: 'prime-web',
        label: 'Prime Web',
        projectTsAliases: ['@prime-ui'],
        type: 'doc',
        dependencyPath: path.join(tempDir, primeWebGit, 'apps/prime'),
        projectGitPath: 'apps/prime',
      },
      {
        ...primeWebConfig,
        id: 'prime-admin',
        label: 'Prime Admin',
        projectTsAliases: ['@prime-admin', ':prime/admin', '@prime-ui'],
        type: 'doc',
        dependencyPath: path.join(tempDir, primeWebGit, 'apps/prime-admin'),
        projectGitPath: 'apps/prime-admin',
      },
      {
        root: path.join(tempDir, unifiedAccountsGit),
        github: unifiedAccountsGit,
        id: 'unified-business-onboarding',
        label: 'Unified Business Onboarding',
        projectTsAliases: ['@ubo'],
        type: 'doc',
        projectGitPath: '',
      },
      {
        root: path.join(tempDir, internationalUIGit, 'apps/neptune'),
        github: internationalUIGit,
        id: 'neptune',
        label: 'Neptune',
        projectTsAliases: [':neptune/app', ':neptune/feature'],
        type: 'doc',
        projectGitPath: 'apps/neptune',
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
        projectGitPath: '',
      },
      {
        root: path.join(tempDir, identityGit, 'apps/unified-login'),
        github: identityGit,
        id: 'unified-login',
        label: 'Unified Login Web',
        sourceGlob: ['apps/unified-login/**/*.(ts|tsx)'],
        type: 'doc',
        projectGitPath: 'apps/unified-login',
      },
      {
        root: path.join(tempDir, identityGit, 'packages/two-factor-web'),
        github: identityGit,
        id: 'two-factor-web',
        label: 'Two Factor Web',
        sourceGlob: ['packages/two-factor-web/**/*.(ts|tsx)'],
        type: 'doc',
        projectGitPath: 'packages/two-factor-web',
      },
      {
        root: path.join(tempDir, identityGit, 'packages/two-factor-mobile'),
        github: identityGit,
        id: 'two-factor-mobile',
        label: 'Two Factor Mobile',
        sourceGlob: ['packages/two-factor-mobile/**/*.(ts|tsx)'],
        type: 'doc',
        projectGitPath: 'packages/two-factor-mobile',
      },
      {
        root: path.join(tempDir, unifiedAccountsGit),
        github: unifiedAccountsGit,
        id: 'tax-center',
        label: 'Tax Center',
        projectTsAliases: ['@taxcenter'],
        type: 'doc',
        projectGitPath: 'src/settings/TaxCenter',
      },
      {
        root: path.join(tempDir, frontendWebGit, 'packages/cb-chat'),
        github: frontendWebGit,
        id: 'cb-chat',
        label: 'Coinbase Chat Web',
        sourceGlob: ['packages/cb-chat/**/*.(ts|tsx)'],
        type: 'doc',
        projectGitPath: 'packages/cb-chat',
      },
      {
        root: path.join(tempDir, frontendWebGit, 'packages/cb-chat-mobile'),
        github: frontendWebGit,
        id: 'cb-chat-mobile',
        label: 'Coinbase Chat Mobile',
        sourceGlob: ['packages/cb-chat-mobile/**/*.(ts|tsx)'],
        type: 'doc',
        projectGitPath: 'packages/cb-chat-mobile',
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
        projectGitPath: 'apps/cloud-console',
      },
      {
        root: path.join(tempDir, commerceFE, 'apps/commerce-merchant'),
        github: commerceFE,
        tsconfigFileName: 'tsconfig.json',
        id: 'commerce-merchant',
        label: 'Commerce Merchant',
        sourceGlob: ['apps/commerce-merchant/**/*.(ts|tsx)'],
        type: 'doc',
        projectGitPath: 'apps/commerce-merchant',
      },
      {
        root: path.join(tempDir, commerceFE, 'apps/commerce-payer'),
        github: commerceFE,
        tsconfigFileName: 'tsconfig.json',
        id: 'commerce-payer',
        label: 'Commerce Payer',
        sourceGlob: ['apps/commerce-payer/**/*.(ts|tsx)'],
        type: 'doc',
        projectGitPath: 'apps/commerce-payer',
      },
      {
        root: path.join(tempDir, commerceFE, 'apps/donations'),
        github: commerceFE,
        tsconfigFileName: 'tsconfig.json',
        id: 'commerce-donations',
        label: 'Commerce Donations',
        sourceGlob: ['apps/donations/**/*.(ts|tsx)'],
        type: 'doc',
        projectGitPath: 'apps/donations',
      },
      {
        root: path.join(tempDir, paymentsOnRampGit),
        github: paymentsOnRampGit,
        tsconfigFileName: 'tsconfig.json',
        id: 'payments-onramp-widget',
        label: 'Payments On Ramp Widget',
        type: 'doc',
        projectGitPath: '',
      },
      {
        root: path.join(tempDir, paymentsCbPayGit, 'workspaces/cbpay-sdk-rn'),
        github: paymentsCbPayGit,
        tsconfigFileName: 'tsconfig.json',
        id: 'cbpay-sdk-rn',
        label: 'Payments CBPay SDK RN',
        type: 'doc',
        projectGitPath: 'workspaces/cbpay-sdk-rn',
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
        dependencyPath: path.join(tempDir, assethubGit, 'apps/www'),
        projectGitPath: 'apps/www',
      },
      {
        ...assethubConfig,
        id: 'assethub-admin',
        label: 'AssetHub Admin',
        projectTsAliases: [':admin', ':shared'],
        type: 'doc',
        dependencyPath: path.join(tempDir, assethubGit, 'apps/admin'),
        projectGitPath: 'apps/admin',
      },
      {
        root: path.join(tempDir, frontendWebGit, 'apps/abor'),
        github: frontendWebGit,
        id: 'abor',
        label: 'Abor',
        projectTsAliases: [':abor'],
        type: 'doc',
        projectGitPath: 'apps/abor',
      },
      // Commerce Web is deprecated so moving to other.
      {
        root: path.join(tempDir, commerceWeb),
        github: commerceWeb,
        tsconfigFileName: 'tsconfig.json',
        id: 'commerce-web',
        label: 'Commerce Web',
        type: 'doc',
        projectGitPath: '',
      },
    ],
  },
];

export const productComponentConfig: ProductComponentConfig[] = [
  {
    productComponentName: 'AppSwitcher',
    owningTeam: 'Identity',
    packageImportPath: '@cbhq/app-switcher',
    doc: 'https://docs.cbhq.net/frontend/platform/identity/app-switcher/integration-guide',
    packagePath: path.join(tempDir, identityGit, 'packages/app-switcher/package.json'),
  },
  {
    productComponentName: 'NavigationBar',
    owningTeam: 'Identity',
    packageImportPath: '@cbhq/identity-navigation',
    packagePath: path.join(tempDir, identityGit, 'packages/identity-navigation/package.json'),
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
