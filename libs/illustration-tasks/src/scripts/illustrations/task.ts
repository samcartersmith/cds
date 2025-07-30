import fs from 'node:fs';
import path from 'node:path';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

const CDSNEXT_ROOT = path.resolve(MONOREPO_ROOT, '../cds-next');
if (!fs.existsSync(CDSNEXT_ROOT)) throw Error('CDSNEXT_ROOT does not exist');

export const task = {
  options: {
    // Figma file ID to sync illustrations from via Figma API
    figmaApiFileId: 'LmkJatvMRVzNgfiIkJDb99',
    // Output path for CHANGELOG.md file in cds-next repo
    changelogFile: path.resolve(CDSNEXT_ROOT, 'packages/illustrations/CHANGELOG.md'),
    // Local manifest file to track sync state and changes between runs
    manifestFile: path.resolve(MONOREPO_ROOT, 'libs/illustration-tasks/manifest.json'),
    // Optional: Dark theme color styles manifest for generating themed SVGs
    darkModeManifestFile: 'libs/figma-styles/src/__generated__/illustration/dark/manifest.json',
    // Optional: Light theme color styles manifest for generating themed SVGs
    lightModeManifestFile: 'libs/figma-styles/src/__generated__/illustration/light/manifest.json',
    // Root directory for all generated output files (SVGs, PNGs, TypeScript, etc.)
    generatedDirectory: path.resolve(CDSNEXT_ROOT, 'packages/illustrations/src/__generated__'),
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
  projectPath: '../cds-next/packages/illustrations',
  // Project root used by getAbsolutePath for resolving relative paths starting with './'
  projectRoot: path.resolve(CDSNEXT_ROOT, 'packages/illustrations'),
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
