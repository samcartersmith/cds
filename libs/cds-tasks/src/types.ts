export type BuildPackageOptions = {
  destinationDir: string;
  distDir?: string;
  srcDir?: string;
  staticFilesToIgnore: string[];
  staticFilesToCopy?: string[];
  babelConfig: string;
  babelExtensions: string[];
  babelIgnore: string[];
  typescriptConfig: string;
  envs: Record<string, string>;
  replacePackageJson?: boolean;
};

export type BuildCssOptions = {
  fontsOutputDir: string;
  iconsOutputDir: string;
  webOutputDir: string;
  outputDir: string;
  name?: string;
};
