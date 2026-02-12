export type ActionInputs = {
  projectName: string;
  tsconfigPath: string;
  packageJsonPath: string;
};

export type ActionOutputs = {
  componentCount: number;
  testCoverage: number;
  storyCoverage: number;
};

export type ComponentStats = {
  name: string;
  filePath: string;
  importPath: string;
  timesUsed: number;
  version: string;
};

export type ComponentImportStat = {
  name: string;
  alias?: string;
  importPath: string;
  version: string;
};

export type IllustrationStats = {
  componentType: string;
  illustrationName: string;
  timesUsed: number;
  importPath: string;
  version: string;
};
