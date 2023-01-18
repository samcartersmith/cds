import { createTask } from '@cbhq/mono-tasks';
import { getAbsolutePath, tokensSortedTemplate, writePrettyFile } from '@cbhq/script-utils';

import { ColorStyle, ColorStyleManifestType } from '../../tools/ColorStyle';
import { Manifest, ManifestTaskOptions } from '../../tools/Manifest';

export type SyncStylesTaskOptions = ManifestTaskOptions & {
  /** Prefix to add to generated CSS variables */
  prefix: string;
  /** The directory to output generated files. */
  generatedDirectory: string;
};

export const syncStyles = createTask<SyncStylesTaskOptions>('sync-styles', async (task) => {
  const tokensHeader = `
    /**
     * DO NOT MODIFY
     * Generated from yarn nx run ${task.context.projectName}:${task.targetName}
    */
  `;

  const { manifest, changelog } = await Manifest.init<
    ColorStyleManifestType,
    SyncStylesTaskOptions
  >(task, {
    requestType: 'styles',
    createItem: ColorStyle.create,
  });

  const generatedDirectory = getAbsolutePath(task, task.options.generatedDirectory);

  const styles = [...manifest.items.values()];

  const colorStyleMap = {
    dest: `${generatedDirectory}/colorStyleMap.ts`,
    get content() {
      return tokensSortedTemplate`
      ${tokensHeader}

      /** style name mapped to style details */
      const colorStyleMap = ${Object.fromEntries(styles.map((item) => [item.name, item]))};

      export default colorStyleMap;
    `;
    },
  };

  await Promise.all([
    writePrettyFile(colorStyleMap.dest, colorStyleMap.content),
    manifest.generateFile(),
    changelog?.generateFile({ task, manifest }),
  ]);

  return { success: true };
});
