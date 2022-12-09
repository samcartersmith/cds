import { Task } from '@cbhq/mono-tasks';

import { SyncIconsTaskOptions } from '../executors/sync-icons/sync-icons';
import { SyncIllustrationsTaskOptions } from '../executors/sync-illustrations/sync-illustrations';
import { SyncStylesTaskOptions } from '../executors/sync-styles/sync-styles';

const root = '/Users/john-doe/src/cds';

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
    manifestVersioning: true,
    darkModeManifestFile: './src/__generated__/styles/dark/manifest.json',
    lightModeManifestFile: './src/__generated__/styles/light/manifest.json',
    generatedSvgsDirectory: './src/__generated__/svgs',
    generatedSvgsJsDirectory: './src/__generated__/js',
    generatedTypesDirectory: './src/__generated__/types',
  },
  'sync-styles': {
    figmaApiFileId: 'skPXKFmI64GqqEkOaBSHcL',
    changelogFile: './CHANGELOG.md',
    manifestFile: './src/__generated__/styles/light/manifest.json',
    generatedKeyToNameMapFile: './src/__generated__/styles/light/keyToNameMap.ts',
    generatedNameToKeyMapFile: './src/__generated__/styles/light/nameToKeyMap.ts',
    generatedCssVariablesMapFile: './src/__generated__/styles/light/cssVariablesMap.ts',
    cssVariablesPrefix: 'illustration',
  },
};

type Tasks = {
  'sync-icons': Partial<SyncIconsTaskOptions>;
  'sync-illustrations': Partial<SyncIllustrationsTaskOptions>;
  'sync-styles': Partial<SyncStylesTaskOptions>;
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
