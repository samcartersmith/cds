import { execSync } from 'node:child_process';
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

const error = (message: string, ...args: unknown[]) => {
  console.error('ERROR: ', message, ...args);
  console.log('');
  process.exit(1);
};

const CDS_OSS_ROOT = path.resolve(MONOREPO_ROOT, '../temp-cds-oss');
if (!fs.existsSync(CDS_OSS_ROOT))
  error(`The "temp-cds-oss" directory does not exist at filepath: "${CDS_OSS_ROOT}"`);

const validateFreshRepo = (dirname: string) => {
  const repoName = path.basename(dirname);
  const exec = (command: string) => execSync(command, { cwd: dirname }).toString().trim();

  const gitBranch = exec('git branch --show-current');
  if (gitBranch !== 'master') error(`The "${repoName}" repo is not on the "master" branch`);
  const gitStatus = exec('git status --short');
  if (gitStatus.length > 0) error(`The "${repoName}" repo is not clean`);
  const gitDiff = exec('git diff --exit-code');
  if (gitDiff.length > 0) error(`The "${repoName}" repo has changes`);
  try {
    exec('git remote show origin');
  } catch (err) {
    error(`There was an error checking the "origin" remote for the "${repoName}" repo:`, err);
  }
  try {
    exec('git fetch origin');
  } catch (err) {
    error(`There was an error fetching the "origin" remote for the "${repoName}" repo:`, err);
  }
  const gitBranchChanges = exec('git log origin/master..master');
  if (gitBranchChanges.length > 0)
    error(
      `The "${repoName}" repo has changes on the local master branch that are not on the origin/master branch`,
    );
  const gitOriginChanges = exec('git log master..origin/master');
  if (gitOriginChanges.length > 0)
    error(
      `The "${repoName}" repo has changes on the origin/master branch that are not on the local master branch`,
    );
};

validateFreshRepo(MONOREPO_ROOT);
validateFreshRepo(CDS_OSS_ROOT);

export const config: SyncIconsConfig = {
  figmaFileId: '1J3XC4iA2xRzlnC3y0pl1N',
  changelogPath: path.resolve(CDS_OSS_ROOT, 'packages/icons/CHANGELOG.md'),
  manifestPath: path.resolve(CDS_OSS_ROOT, 'packages/icons/manifest.json'),
  outputSvgPath: path.resolve(CDS_OSS_ROOT, 'packages/icons/src/svgs'),
  outputDataPath: path.resolve(CDS_OSS_ROOT, 'packages/icons/src'),
  outputFontPath: path.resolve(CDS_OSS_ROOT, 'packages/icons/src/fonts'),
  outputFontName: 'CoinbaseIcons',
  outputFontCssFileName: 'icon-font',
  syncAll: false,
};
