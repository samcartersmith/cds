import { createTask } from '@cbhq/mono-tasks';
import { getAbsolutePath } from '@cbhq/script-utils';

import { generateTypes } from '../../helpers/generateTypes';
import { GenerateSvgsTaskOptions, svgsGenerator } from '../../helpers/svgsGenerator';
import { syncComponents } from '../../helpers/syncComponents';
import { Component } from '../../tools/Component';

export type SyncIllustrationsTaskOptions = {
  /** The file ID to use when making requests to Figma API  */
  figmaApiFileId: string;
  /** The manifest.json file to get information about previous syncs and to update after new syncs. */
  manifestFile: string;
  /** If the manifest.json file should track versions for any updates. */
  manifestVersioning?: boolean;
  /** The CHANGELOG.md file to document changes to. */
  changelogFile?: string;
  /** The manifest.json file which contains light color styles */
  lightModeManifestFile?: string;
  /** The manifest.json file which contains dark color styles */
  darkModeManifestFile?: string;
  /** The directory to output generated types. */
  generatedTypesDirectory?: string;
} & GenerateSvgsTaskOptions;

function formatTypeValue(component: Component) {
  return component.name;
}

export const syncIllustrations = createTask<SyncIllustrationsTaskOptions>(
  'sync-illustrations',
  async (task) => {
    const generatedPromises: Promise<void>[] = [];

    const data = await syncComponents(task, {
      executor: 'sync-illustrations',
      downloadSvgs: true,
    });

    const { changelog, manifest, colorStyles, remoteSvgs } = data;

    const components = [...manifest.items.values()];

    const generateSvgs = svgsGenerator({
      colorStyles,
      task,
      remoteSvgs,
    });

    await generateSvgs(components);

    // if (illustrations.warnings) {
    //   console.error(illustrations.warnings);
    //   return { success: false };
    // }

    if (task.options.generatedTypesDirectory) {
      const outputDir = getAbsolutePath(task, task.options.generatedTypesDirectory);
      const generateTypesPromise = generateTypes(components, { outputDir, formatTypeValue });
      generatedPromises.push(generateTypesPromise);
    }

    await Promise.all([
      ...generatedPromises,
      manifest.generateFile(),
      changelog?.generateFile({ task, manifest, groupByType: true }),
      // generateLookupMap()
      // illustrations.removeDeletions(task),
    ]);

    await manifest.deleteStaleFiles();

    return { success: true };
  },
);
