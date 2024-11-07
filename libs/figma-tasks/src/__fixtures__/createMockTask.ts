import { Task } from '@cbhq/mono-tasks';

import { SyncIconsTaskOptions } from '../executors/sync-icons/sync-icons';
import { SyncIllustrationsTaskOptions } from '../executors/sync-illustrations/sync-illustrations';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

const root = MONOREPO_ROOT;

export const mockTaskOptions = {
  'sync-icons': {
    figmaApiFileId: 'tuc9LpASTO9mBrbg1tAdAl',
    changelogFile: './CHANGELOG.md',
    manifestFile: './__generated__/manifest.json',
    generatedSvgsDirectory: './__generated__/svg',
    generatedTypesDirectory: './__generated__/types',
    generatedIconFont: {
      fontName: 'CoinbaseIcons',
      formats: [
        {
          format: 'woff2' as const,
          outputDir: 'packages/icons/__generated__/font',
          hashed: true,
          css: {
            basename: 'icon-font',
            outputDir: 'packages/icons/__generated__/font',
          },
        },
        {
          format: 'ttf' as const,
          outputDir: 'packages/icons/__generated__/font',
        },
      ],
    },
  },
  'sync-illustrations': {
    figmaApiFileId: 'LmkJatvMRVzNgfiIkJDb99',
    changelogFile: './CHANGELOG.md',
    manifestFile: './src/__generated__/manifest.json',
    darkModeManifestFile: './src/__generated__/styles/dark/manifest.json',
    lightModeManifestFile: './src/__generated__/styles/light/manifest.json',
    generatedSvgsDirectory: './src/__generated__/svgs',
    generatedSvgsJsDirectory: './src/__generated__/js',
    generatedTypesDirectory: './src/__generated__/types',
  },
};

type Tasks = {
  'sync-icons': Partial<SyncIconsTaskOptions>;
  'sync-illustrations': Partial<SyncIllustrationsTaskOptions>;
};

type CreateMockTaskParams<TaskName extends keyof Tasks> = {
  targetName: TaskName;
  projectName?: string;
  options?: Tasks[TaskName];
};

export function createMockTask<TaskName extends keyof Tasks>({
  targetName,
  options: optionsOverrides,
}: CreateMockTaskParams<TaskName>) {
  const options = { ...mockTaskOptions[targetName], ...optionsOverrides };
  const projectName = targetName.replace('sync-', '');

  const mockContext = {
    root,
    projectName: targetName.replace('sync-', ''),
    targetName,
    target: {
      executor: `@cbhq/figma-tasks:${targetName}`,
      options,
    },
    workspace: {
      projects: {
        [projectName]: {
          root: `packages/${projectName}`,
        },
      },
      version: 2,
    },
    cwd: root,
    isVerbose: true,
  };

  return new Task('mock-task', options, mockContext);
}
