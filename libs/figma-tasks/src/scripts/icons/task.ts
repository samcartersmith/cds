import path from 'node:path';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

export const task = {
  options: {
    figmaApiFileId: '1J3XC4iA2xRzlnC3y0pl1N',
    changelogFile: './CHANGELOG.md',
    manifestFile: './src/__generated__/manifest.json',
    generatedDirectory: './src/__generated__',
    generatedFontName: 'CoinbaseIcons',
    generatedFontFormats: [
      {
        generatedFontFormat: 'woff2' as const,
        generatedFontDirectory: './src/fonts/web',
        generatedCssDirectory: './src/fonts/web',
        generatedCssFileName: 'icon-font',
        hashed: true,
      },
      {
        generatedFontFormat: 'ttf' as const,
        generatedFontDirectory: './src/fonts/native',
      },
    ],
  },
  context: {
    root: MONOREPO_ROOT,
    projectName: 'icons',
    targetName: 'sync-icons',
  },
  name: 'sync-icons',
  projectName: 'icons',
  projectPath: 'packages/icons',
  projectRoot: path.resolve(MONOREPO_ROOT, 'packages/icons'),
  targetName: 'sync-icons',
  workspace: {
    context: {
      root: MONOREPO_ROOT,
      projectName: 'icons',
      targetName: 'sync-icons',
    },
    root: MONOREPO_ROOT,
  },
};
