export type TargetProject = {
  name: string;
  projectPath: string;
  repoType: 'web' | 'mobile' | 'both';
};

export type A11yLintConfig = {
  /**
   * custom commands for repo specific setup
   */
  customSetupCommands?: string[];
  /** @example Wallet Repo */
  name: string;
  /**
   * root repo for the project
   *  @example wallet/wallet-mobile
   */
  repo: string;
  /**
   * type of repo
   * @example react-native is mobile, wallet is both
   * web - for react apps (lint entire repo from root)
   * mobile - for react native (lint entire repo from root)
   * both - you want to eslint both web and mobile (lint entire repo from root)
   * complex - lint per target project
   */
  repoType: 'web' | 'mobile' | 'both' | 'complex';
  /**
   *  target projects
   *  @example app, retail, etc.
   */
  targetProjects?: TargetProject[];
  /**
   * workspace directory for monorepos with numerous projects
   *  @example workspaces
   */
  workspaceDir?: string;
};
