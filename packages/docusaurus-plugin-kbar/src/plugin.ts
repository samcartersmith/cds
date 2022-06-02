import docsPlugin from '@docusaurus/plugin-content-docs';
import { DEFAULT_OPTIONS } from '@docusaurus/plugin-content-docs/options';
import type { LoadContext, Plugin } from '@docusaurus/types';
import { DEFAULT_PLUGIN_ID } from '@docusaurus/utils';
import type { Action } from 'kbar';
import path from 'path';
import type { PluginOptions } from '@cbhq/docusaurus-plugin-kbar';

import { getKBarActions } from './utils/getKBarActions';
import { logger } from './utils/logger';

const PLUGIN_ID = '@cbhq/docusaurus-plugin-kbar';

export default async function plugin(
  context: LoadContext,
  options: PluginOptions,
): Promise<Plugin<Action[] | undefined>> {
  const pluginDir = path.join(
    context.generatedFilesDir,
    PLUGIN_ID,
    options.id ?? DEFAULT_PLUGIN_ID,
  );

  return {
    name: PLUGIN_ID,
    async loadContent() {
      const docsPluginInstance = await docsPlugin(context, {
        ...DEFAULT_OPTIONS,
        ...options.docs,
      });
      const loadedContent = await docsPluginInstance.loadContent();
      const currentVersion = loadedContent.loadedVersions[0];
      return getKBarActions(currentVersion);
    },
    getThemePath(): string {
      return path.resolve(__dirname, './theme');
    },
    getTypeScriptThemePath(): string {
      return path.resolve(__dirname, '..', 'src', 'theme');
    },
    configureWebpack() {
      return {
        resolve: {
          alias: {
            '@theme/KBarActions': path.join(pluginDir, 'actions.js'),
          },
        },
      };
    },
    async contentLoaded({ content, actions }): Promise<void> {
      await actions.createData('actions.js', `module.exports = ${JSON.stringify(content)}`);
      logger.pluginComplete();
    },
  };
}
