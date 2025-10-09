import fs from 'node:fs';
import path from 'node:path';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

const CDS_OSS_REPO_NAME = 'temp-oss-cds';
const CDS_OSS_ROOT = path.resolve(MONOREPO_ROOT, `../${CDS_OSS_REPO_NAME}`);
if (!fs.existsSync(CDS_OSS_ROOT))
  throw Error(`The "${CDS_OSS_REPO_NAME}" directory does not exist at filepath: "${CDS_OSS_ROOT}"`);

export const task = {
  // The absolute path of the current repo root, where the sync script is run from.
  currentRepoRoot: MONOREPO_ROOT,
  // The absolute path of the target repo root, where illustrations will be output.
  targetRepoRoot: CDS_OSS_ROOT,
  options: {
    // Figma file ID to sync illustrations from via Figma API
    figmaApiFileId: 'LmkJatvMRVzNgfiIkJDb99',
    // Output path for CHANGELOG.md file
    changelogFile: path.resolve(CDS_OSS_ROOT, 'packages/illustrations/CHANGELOG.md'),
    // Local manifest file to track sync state and changes between runs
    manifestFile: path.resolve(CDS_OSS_ROOT, 'packages/illustrations/manifest.json'),
    // Optional: Dark theme color styles manifest for generating themed SVGs
    darkModeManifestFile: 'libs/figma-styles/src/__generated__/illustration/dark/manifest.json',
    // Optional: Light theme color styles manifest for generating themed SVGs
    lightModeManifestFile: 'libs/figma-styles/src/__generated__/illustration/light/manifest.json',
    // Root directory for all generated output files (SVGs, PNGs, TypeScript, etc.)
    generatedDirectory: path.resolve(CDS_OSS_ROOT, 'packages/illustrations/src/__generated__'),
  },
  context: {
    // Unused - no code references this property
    root: MONOREPO_ROOT,
    // Unused - duplicates top-level projectName
    projectName: 'illustrations',
    // Used in manifest JSON output as 'executor' field (duplicates top-level targetName)
    targetName: 'sync-illustrations',
  },
  // Task name - not directly used in code execution
  name: 'sync-illustrations',
  // Project name used in changelog generation for nx command references
  projectName: 'illustrations',
  // Project path - metadata only, not used in actual code execution
  projectPath: `../${CDS_OSS_REPO_NAME}/packages/illustrations`,
  // Project root used by getAbsolutePath for resolving relative paths starting with './'
  projectRoot: path.resolve(CDS_OSS_ROOT, 'packages/illustrations'),
  // Target name used in generated file headers and changelog command references
  targetName: 'sync-illustrations',
  workspace: {
    context: {
      // Unused - no code references this nested context
      root: MONOREPO_ROOT,
      projectName: 'illustrations',
      targetName: 'sync-illustrations',
    },
    // Workspace root used by getAbsolutePath for resolving absolute paths (when not starting with './')
    root: MONOREPO_ROOT,
  },
};
