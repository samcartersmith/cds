import fs from 'node:fs';
import path from 'node:path';

type SyncIconsConfig = {
  /* The figma file id to sync icons from. */
  figmaFileId: string;
  /* The absolute path of the target changelog file. */
  changelogPath: string;
  /* The absolute path of the target manifest file. */
  manifestPath: string;
  /* The absolute path of the target svg output directory. */
  outputSvgPath: string;
  /* The absolute path of the target data output directory. */
  outputDataPath: string;
  /* The absolute path of the output font directory. */
  outputFontPath: string;
  /* The name of the output icon font. */
  outputFontName: string;
  /* The name of the output font css file. */
  outputFontCssFileName: string;
  /* Whether to force sync all icons regardless of when they were last updated. Can also be passed as an argument to the script with --sync-all. */
  syncAll: boolean;
};

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

const CDSNEXT_ROOT = path.resolve(MONOREPO_ROOT, '../cds-next');
if (!fs.existsSync(CDSNEXT_ROOT)) throw Error('CDSNEXT_ROOT does not exist');

export const config: SyncIconsConfig = {
  figmaFileId: '1J3XC4iA2xRzlnC3y0pl1N',
  changelogPath: path.resolve(CDSNEXT_ROOT, 'packages/icons/CHANGELOG.md'),
  manifestPath: path.resolve(MONOREPO_ROOT, 'libs/icon-tasks/manifest.json'),
  outputSvgPath: path.resolve(CDSNEXT_ROOT, 'packages/icons/src/svgs'),
  outputDataPath: path.resolve(CDSNEXT_ROOT, 'packages/icons/src'),
  outputFontPath: path.resolve(CDSNEXT_ROOT, 'packages/icons/src/fonts'),
  outputFontName: 'CoinbaseIcons',
  outputFontCssFileName: 'icon-font',
  syncAll: false,
};
