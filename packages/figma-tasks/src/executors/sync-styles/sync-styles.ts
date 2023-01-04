import path from 'node:path';
import { createTask } from '@cbhq/mono-tasks';
import { getAbsolutePath, tokensTemplate, writePrettyFile } from '@cbhq/script-utils';

import { ColorStyle, ColorStyleManifestType } from '../../tools/ColorStyle';
import { Manifest, ManifestTaskOptions } from '../../tools/Manifest';

export type SyncStylesTaskOptions = ManifestTaskOptions & {
  /** Prefix to add to generated CSS variables */
  generatedCssVariablesPrefix?: string;
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

  const cssVariablesMap = {
    dest: `${generatedDirectory}/cssVariablesMap.ts`,
    get content() {
      const { name: exportName } = path.parse(this.dest);
      return tokensTemplate`
      ${tokensHeader}

      /** style name (as css var) mapped to style value */
      export const ${exportName} = ${Object.fromEntries(
        styles.map((style) => [style.cssVarSetter, style.fill]),
      )}
    `;
    },
  };

  const keyToNameMap = {
    dest: `${generatedDirectory}/keyToNameMap.ts`,
    get content() {
      const { name: exportName } = path.parse(this.dest);
      return tokensTemplate`
      ${tokensHeader}

      /** style key mapped to style name */
      export const ${exportName}: Record<string, string> = ${Object.fromEntries(
        styles.map((item) => [item.key, item.name]),
      )} as const;
    `;
    },
  };

  const keyToValueMap = {
    dest: `${generatedDirectory}/keyToValueMap.ts`,
    get content() {
      const { name: exportName } = path.parse(this.dest);
      return tokensTemplate`
      ${tokensHeader}

      /** style key mapped to style value */
      export const ${exportName}: Record<string, string> = ${Object.fromEntries(
        styles.map((style) => [style.key, style.fill]),
      )} as const;
    `;
    },
  };

  const nameToKeyMap = {
    dest: `${generatedDirectory}/nameToKeyMap.ts`,
    get content() {
      const { name: exportName } = path.parse(this.dest);
      return tokensTemplate`
      ${tokensHeader}

      /** style name mapped to style key */
      export const ${exportName}: Record<string, string> = ${Object.fromEntries(
        styles.map((item) => [item.name, item.key]),
      )} as const;
    `;
    },
  };

  await Promise.all([
    writePrettyFile(cssVariablesMap.dest, cssVariablesMap.content),
    writePrettyFile(keyToNameMap.dest, keyToNameMap.content),
    writePrettyFile(keyToValueMap.dest, keyToValueMap.content),
    writePrettyFile(nameToKeyMap.dest, nameToKeyMap.content),
  ]);

  await Promise.all([manifest.generateFile(), changelog?.generateFile({ task, manifest })]);

  return { success: true };
});
