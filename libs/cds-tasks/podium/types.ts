export type PodiumLibraryConfig = {
  /** @example CDS Wallet Mobile */
  name: string;
  /**
   * directory where the components are located
   * @example workspaces/apps/rn/src/cds-wallet/components
   */
  directory: string;
  /**
   * @example cds-wallet
   * if it's an internal directory, provide directory relative to app root
   */
  packageName: string;
};

export type PodiumConfig = {
  /**
   * root repo for the project
   *  @example wallet/wallet-mobile
   */
  repo: string;
  libraries: PodiumLibraryConfig[];
  /** app directories relative to repo route */
  callSites: string[];
};

export type ComponentMetadata = {
  name: string;
  // where it's declared
  path: string;
  // paths to all call sites grouuped by app
  callSites: Record<string, string[]>;
  // callSite count grouped by app
  callSiteCount: Record<string, number>;
};
