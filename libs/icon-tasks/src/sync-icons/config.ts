import fs from 'node:fs';
import path from 'node:path';

type SyncIconsConfig = {
  /* The figma file id to sync icons from. */
  figmaFileId: string;
  /* The absolute path of the current repo root, where the sync script is run from. */
  currentRepoRoot: string;
  /* The absolute path of the target repo root, where icons will be output. */
  targetRepoRoot: string;
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

const CDS_OSS_ROOT = path.resolve(MONOREPO_ROOT, '../temp-oss-cds');
if (!fs.existsSync(CDS_OSS_ROOT))
  throw Error(`The "temp-oss-cds" directory does not exist at filepath: "${CDS_OSS_ROOT}"`);

export const config: SyncIconsConfig = {
  figmaFileId: '1J3XC4iA2xRzlnC3y0pl1N',
  currentRepoRoot: MONOREPO_ROOT,
  targetRepoRoot: CDS_OSS_ROOT,
  changelogPath: path.resolve(CDS_OSS_ROOT, 'packages/icons/CHANGELOG.md'),
  manifestPath: path.resolve(CDS_OSS_ROOT, 'packages/icons/manifest.json'),
  outputSvgPath: path.resolve(CDS_OSS_ROOT, 'packages/icons/src/svgs'),
  outputDataPath: path.resolve(CDS_OSS_ROOT, 'packages/icons/src'),
  outputFontPath: path.resolve(CDS_OSS_ROOT, 'packages/icons/src/fonts'),
  outputFontName: 'CoinbaseIcons',
  outputFontCssFileName: 'icon-font',
  syncAll: false,
};
