import path from 'node:path';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

export const task = {
  options: {
    figmaApiFileId: 'LmkJatvMRVzNgfiIkJDb99',
    changelogFile: './CHANGELOG.md',
    manifestFile: './src/__generated__/manifest.json',
    darkModeManifestFile: 'libs/figma-styles/src/__generated__/illustration/dark/manifest.json',
    lightModeManifestFile: 'libs/figma-styles/src/__generated__/illustration/light/manifest.json',
    generatedDirectory: './src/__generated__',
  },
  context: {
    root: MONOREPO_ROOT,
    projectName: 'illustrations',
    targetName: 'sync-illustrations',
  },
  name: 'sync-illustrations',
  projectName: 'illustrations',
  projectPath: 'packages/illustrations',
  projectRoot: path.resolve(MONOREPO_ROOT, 'packages/illustrations'),
  targetName: 'sync-illustrations',
  workspace: {
    context: {
      root: MONOREPO_ROOT,
      projectName: 'illustrations',
      targetName: 'sync-illustrations',
    },
    root: MONOREPO_ROOT,
  },
};
