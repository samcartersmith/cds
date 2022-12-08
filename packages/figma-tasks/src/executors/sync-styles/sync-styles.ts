import { createTask } from '@cbhq/mono-tasks';
import { fileGenerator, tokensTemplate } from '@cbhq/script-utils';

import { syncStyles as syncStylesFn } from '../../helpers/syncStyles';

export type SyncStylesTaskOptions = {
  /** The file ID to use when making requests to Figma API  */
  figmaApiFileId: string;
  /** The manifest.json file to read and write updates to. */
  manifestFile: string;
  /** The CHANGELOG.md file to read and write overview of changes to. */
  changelogFile?: string;
  /** Prefix to add to generated CSS variables */
  generatedCssVariablesPrefix?: string;
  /** The file to output the generated cssVariablesMap file */
  generatedCssVariablesLookupFile?: string;
  /** The file to output the generated keyToNameMap to */
  generatedKeyToNameLookupFile?: string;
  /** The file to output the generated keyToNameMap to */
  generatedKeyToValueLookupFile?: string;
  /** The file to output the generate nameToKeyMap */
  generatedNameToKeyLookupFile?: string;
  /** The directory to output generated types. */
  generatedTypesDirectory?: string;
};

export const syncStyles = createTask<SyncStylesTaskOptions>('sync-styles', async (task) => {
  const generatedPromises: Promise<void>[] = [];
  const { changelog, manifest } = await syncStylesFn(task);
  const styles = [...manifest.items.values()];
  const generateFile = fileGenerator(task);

  if (task.options.generatedCssVariablesLookupFile) {
    const content = tokensTemplate`
      /** style name (as css var) mapped to style value */
      export const cssVariablesMap = ${Object.fromEntries(
        [...styles.values()].map((style) => [style.cssVarSetter, style.fill]),
      )}
    `;
    const promise = generateFile(task.options.generatedCssVariablesLookupFile, content);
    generatedPromises.push(promise);
  }

  if (task.options.generatedKeyToNameLookupFile) {
    const content = tokensTemplate`
      /** style key mapped to style name */
      export const keyToNameMap: Record<string, string> = ${Object.fromEntries(
        styles.map((item) => [item.key, item.name]),
      )} as const;
    `;
    const promise = generateFile(task.options.generatedKeyToNameLookupFile, content);
    generatedPromises.push(promise);
  }

  if (task.options.generatedKeyToValueLookupFile) {
    const content = tokensTemplate`
      /** style key mapped to style value */
      export const keyToValueMap: Record<string, string> = ${Object.fromEntries(
        styles.map((style) => [style.key, style.fill]),
      )} as const;
    `;
    const promise = generateFile(task.options.generatedKeyToValueLookupFile, content);
    generatedPromises.push(promise);
  }

  if (task.options.generatedNameToKeyLookupFile) {
    const content = tokensTemplate`
      /** style name mapped to style key */
      export const keyToNameMap: Record<string, string> = ${Object.fromEntries(
        styles.map((item) => [item.name, item.key]),
      )} as const;
    `;
    const promise = generateFile(task.options.generatedNameToKeyLookupFile, content);
    generatedPromises.push(promise);
  }

  await Promise.all([
    ...generatedPromises,
    manifest.generateFile(),
    changelog?.generateFile({ task, manifest }),
  ]);

  return { success: true };
});
