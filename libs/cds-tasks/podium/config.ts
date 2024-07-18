import { PodiumConfig, PodiumLibraryConfig } from './types';

const walletLibraries: PodiumLibraryConfig[] = [
  {
    name: 'CDS Wallet Mobile',
    packageName: 'cds-wallet',
    directory: 'workspaces/apps/rn/src/cds-wallet/components',
  },
  {
    name: 'CDS Wallet Extension',
    directory: 'workspaces/libs/wallet-cds-extension/components',
    packageName: 'wallet-cds-extension',
  },
  {
    name: 'CDS Wallet Web',
    directory: 'workspaces/libs/wallet-cds-web/components',
    packageName: 'wallet-cds-web',
  },
];

const retailMobileLibraries: PodiumLibraryConfig[] = [
  {
    name: 'React Native Core',
    packageName: 'designSystem',
    // they nest componenents in multiple directories, not just components
    directory: 'libs/react-native-core',
  },
  {
    name: 'Retail Mobile App',
    packageName: 'components',
    directory: 'src/packages/app/src/components',
  },
  {
    name: 'Retail Mobile Onboarding',
    packageName: 'components',
    directory: 'src/packages/onboarding/src/components',
  },
];

const retailWebLibraries: PodiumLibraryConfig[] = [
  {
    name: 'Cb Components',
    packageName: '@cb/components',
    directory: 'packages/components/src/components',
  },
  {
    name: 'Advanced Trade Web',
    packageName: '@cbhq/advanced-trade-web',
    directory: 'packages/advanced-trade-web/src/components',
  },
  {
    name: 'Retail Web App',
    packageName: 'components',
    directory: 'app/src/components',
  },
  {
    name: 'Retail Web Onboarding',
    packageName: 'components',
    directory: 'marketing/src/components',
  },
];

// institutional/frontend

const primeMobileLibraries: PodiumLibraryConfig[] = [
  {
    name: 'Prime Mobile App',
    packageName: 'components',
    directory: 'src/components',
  },
];

const primeWebLibraries: PodiumLibraryConfig[] = [
  {
    name: 'Prime Components',
    packageName: '@cbhq/prime-components',
    directory: 'packages/prime-components/src/web',
  },
  {
    name: 'Prime Admin',
    packageName: 'components',
    directory: 'apps/prime-admin/src/components',
  },
  {
    name: 'Prime Web App',
    packageName: 'components',
    directory: 'apps/prime/src/components',
  },
];

export const podiumConfigs: PodiumConfig[] = [
  {
    repo: 'wallet/wallet-mobile',
    libraries: walletLibraries,
    callSites: [
      'workspaces/apps/dapp/src',
      'workspaces/apps/extension/src',
      'workspaces/apps/rn/src',
      'workspaces/apps/messaging/src',
      'workspaces/apps/scw/src',
    ],
  },
  {
    repo: 'consumer/react-native',
    libraries: retailMobileLibraries,
    callSites: ['src/packages/onboarding/src', 'src/packages/app/src'],
  },
  {
    repo: 'frontend/coinbase-www',
    libraries: retailWebLibraries,
    callSites: ['app/src', 'marketing/src'],
  },
  {
    repo: 'prime/mobile',
    libraries: primeMobileLibraries,
    callSites: ['src'],
  },
  {
    repo: 'institutional/frontend',
    libraries: primeWebLibraries,
    callSites: ['apps/prime-admin/src', 'apps/prime/src'],
  },
];
