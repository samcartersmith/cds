import { A11yLintConfig } from './types';

export const a11yLintConfig: A11yLintConfig[] = [
  {
    name: 'Wallet Repo',
    repo: 'wallet/wallet-mobile',
    workspaceDir: 'workspaces',
    targetProjects: [
      { name: 'rn', repoType: 'mobile', projectPath: 'apps/rn' },
      { name: 'ext', repoType: 'web', projectPath: 'apps/extension' },
    ],
    repoType: 'complex',
    codeownersUrl: './CODEOWNERS',
  },
  {
    name: 'React Mobile',
    repo: 'consumer/react-native',
    repoType: 'mobile',
    codeownersUrl: './.github/CODEOWNERS',
  },
  {
    name: 'Retail Web',
    repo: 'frontend/coinbase-www',
    repoType: 'web',
    codeownersUrl: './.github/CODEOWNERS',
  },
];
