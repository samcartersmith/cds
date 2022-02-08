import { argv } from 'yargs';
import path from 'path';
import type { AdoptersConfig } from './types';
import { flattenConfig } from './utils/flattenConfig';
import { formatSidebar } from './utils/formatSidebar';

const { tempDir } = argv as Record<string, string>;

const monorepoGit = 'mono/repo';
const retailMobileGit = 'consumer/react-native';
const retailWebGit = 'frontend/coinbase-www';
const walletGit = 'wallet/wallet-mobile';
const unifiedAccountsGit = 'frontend/unified-identity-accounts';
const mauiGit = 'frontend/maui';
const primeMobileGit = 'prime/mobile';

const monorepoConfig = {
  root: path.join(tempDir, monorepoGit),
  github: monorepoGit,
  tsconfigFileName: 'tsconfig.options.json',
};

export const config: AdoptersConfig[] = [
  {
    type: 'category',
    label: 'Ecosystem',
    collapsed: true,
    items: [
      {
        ...monorepoConfig,
        id: 'assethub-web',
        label: 'AssetHub Issuer',
        projectTsAliases: ['@assethub/www', '@assethub/shared/components'],
        type: 'doc',
      },
      {
        ...monorepoConfig,
        id: 'assethub-admin',
        label: 'AssetHub Admin',
        projectTsAliases: ['@assethub/admin', '@assethub/shared/components'],
        type: 'doc',
      },
      {
        ...monorepoConfig,
        id: 'commerce',
        label: 'Commerce',
        projectTsAliases: ['@commerce/frontend'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, mauiGit, 'maui-frontend'),
        github: mauiGit,
        id: 'maui',
        label: 'Maui',
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
        ...monorepoConfig,
        id: 'prime-web',
        label: 'Prime Web',
        projectTsAliases: ['@cbhq/prime-ui', '@cbhq/insto-ui-web'],
        type: 'doc',
      },
      {
        ...monorepoConfig,
        id: 'prime-admin',
        label: 'Prime Admin',
        projectTsAliases: ['@prime-admin', '@cbhq/prime-ui', '@cbhq/insto-ui-web'],
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
        root: path.join(tempDir, retailMobileGit),
        github: retailMobileGit,
        id: 'umo',
        label: 'Unified Mobile Onboarding',
        projectTsAliases: ['@onboarding'],
        cdsAliases: ['interactables/IconButton', '@components/interactables/Button'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, retailWebGit, 'packages/uwo'),
        github: retailWebGit,
        id: 'uwo',
        label: 'Unified Web Onboarding',
        projectTsAliases: ['@uwo'],
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
        ...monorepoConfig,
        id: 'unified-login',
        label: 'Unified Login Web',
        projectTsAliases: ['@trust_and_safety'],
        type: 'doc',
      },
      {
        ...monorepoConfig,
        id: 'two-factor-web',
        label: 'Two Factor Web',
        projectTsAliases: ['@cbhq/two-factor-web'],
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
    ],
  },
  {
    type: 'category',
    label: 'Retail',
    collapsed: true,
    items: [
      {
        root: path.join(tempDir, retailMobileGit),
        github: retailMobileGit,
        id: 'retail-mobile',
        label: 'Retail Mobile',
        projectTsAliases: ['@app'],
        cdsAliases: ['interactables/IconButton', '@components/interactables/Button'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, retailMobileGit),
        github: retailMobileGit,
        id: 'retail-mobile-design-system',
        label: 'Retail Mobile Design System',
        projectTsAliases: ['@designSystem'],
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
        root: path.join(tempDir, retailWebGit, 'shared'),
        github: retailWebGit,
        id: 'retail-web-shared',
        label: 'Retail Web Shared',
        type: 'doc',
      },
      {
        root: path.join(tempDir, walletGit, 'workspaces/apps/extension'),
        github: walletGit,
        id: 'wallet-extension',
        label: 'Wallet Chrome Extension',
        ignoreDirs: ['src/debug/**'],
        type: 'doc',
      },
      {
        root: path.join(tempDir, walletGit, 'workspaces/apps/rn'),
        github: walletGit,
        id: 'wallet-react-native',
        label: 'Wallet React Native',
        ignoreDirs: [''],
        type: 'doc',
      },
    ],
  },
  {
    type: 'category',
    label: 'Growth',
    collapsed: true,
    items: [
      {
        root: path.join(tempDir, retailWebGit, 'marketing'),
        github: retailWebGit,
        id: 'retail-web-logged-out',
        label: 'Retail Web Logged Out',
        type: 'doc',
      },
    ],
  },
];

export const adopters = flattenConfig(config);
export const adoptersSidebar = formatSidebar(config);
export const adoptersWithPillar = adopters.map((item) => ({
  id: item.id,
  pillar: item.pillar,
}));
