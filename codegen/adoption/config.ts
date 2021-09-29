import { argv } from 'yargs';
import path from 'path';
import type { ProjectParserConfig } from './parsers/ProjectParser';

const { tempDir } = argv as Record<string, string>;

const monorepoGit = 'mono/repo';
const retailMobileGit = 'consumer/react-native';
const retailWebGit = 'frontend/coinbase-www';
const walletGit = 'wallet/wallet-mobile';
const unifiedAccountsGit = 'frontend/unified-identity-accounts';

const monorepoConfig = {
  root: path.join(tempDir, monorepoGit),
  github: monorepoGit,
  tsconfigFileName: 'tsconfig.options.json',
};

export const adopters: ProjectParserConfig[] = [
  {
    ...monorepoConfig,
    id: 'assethub-web',
    label: 'AssetHub Web',
    projectTsAliases: ['@assethub/www', '@assethub/shared/components'],
  },
  {
    ...monorepoConfig,
    id: 'assethub-admin',
    label: 'AssetHub Admin',
    projectTsAliases: ['@assethub/admin', '@assethub/shared/components'],
  },
  {
    ...monorepoConfig,
    id: 'growth-cms-consensus',
    label: 'Growth CMS Consensus App',
    projectTsAliases: ['@growth/cms-consensus-app'],
  },
  {
    ...monorepoConfig,
    id: 'growth-email-templating-app',
    label: 'Growth Email Templating App',
    projectTsAliases: ['@growth/email-templating-app'],
  },
  {
    ...monorepoConfig,
    id: 'commerce',
    label: 'Commerce',
    projectTsAliases: ['@commerce/frontend'],
  },
  {
    ...monorepoConfig,
    id: 'prime-mobile',
    label: 'Prime Mobile',
    projectTsAliases: ['@prime-mobile'],
  },
  {
    ...monorepoConfig,
    id: 'prime-web',
    label: 'Prime Web',
    projectTsAliases: ['@cbhq/prime-ui', '@cbhq/insto-ui-web'],
  },
  {
    ...monorepoConfig,
    id: 'unified-login',
    label: 'Unified Login',
    projectTsAliases: ['@trust_and_safety'],
  },
  {
    root: path.join(tempDir, unifiedAccountsGit),
    github: unifiedAccountsGit,
    id: 'unified-accounts',
    label: 'Unified Accounts',
    projectTsAliases: ['@ubo'],
  },
  {
    root: path.join(tempDir, retailWebGit, 'packages/uwo'),
    github: retailWebGit,
    id: 'uwo',
    label: 'Unified Web Onboarding',
    projectTsAliases: ['@uwo'],
  },
  {
    root: path.join(tempDir, retailMobileGit),
    github: retailMobileGit,
    id: 'umo',
    label: 'Unified Mobile Onboarding',
    projectTsAliases: ['@onboarding'],
    cdsAliases: ['interactables/IconButton', '@components/interactables/Button'],
  },
  {
    ...monorepoConfig,
    id: 'two-factor-web',
    label: 'Two Factor Web',
    projectTsAliases: ['@cbhq/two-factor-web'],
  },
  {
    root: path.join(tempDir, retailMobileGit),
    github: retailMobileGit,
    id: 'retail-mobile',
    label: 'Retail Mobile',
    projectTsAliases: ['@app'],
    cdsAliases: ['interactables/IconButton', '@components/interactables/Button'],
  },
  {
    root: path.join(tempDir, retailMobileGit),
    github: retailMobileGit,
    id: 'retail-mobile-design-system',
    label: 'Retail Mobile Design System',
    projectTsAliases: ['@designSystem'],
  },
  {
    root: path.join(tempDir, retailWebGit, 'app'),
    github: retailWebGit,
    id: 'retail-web-logged-in',
    label: 'Retail Web Logged In',
  },
  {
    root: path.join(tempDir, retailWebGit, 'marketing'),
    github: retailWebGit,
    id: 'retail-web-logged-out',
    label: 'Retail Web Logged Out',
  },
  {
    root: path.join(tempDir, retailWebGit, 'shared'),
    github: retailWebGit,
    id: 'retail-web-shared',
    label: 'Retail Web Shared',
  },
  {
    root: path.join(tempDir, walletGit, 'apps/wallet-extension'),
    github: walletGit,
    id: 'wallet-extension',
    label: 'Wallet Chrome Extension',
    ignoreDirs: ['src/debug/**'],
  },
];
