import docsPlugin from '@docusaurus/plugin-content-docs';
import { DEFAULT_OPTIONS } from '@docusaurus/plugin-content-docs/options';
import type { LoadContext, Plugin } from '@docusaurus/types';

import { getKBarActions } from './utils/getKBarActions';
import { logger } from './utils/logger';
import type { PluginData, PluginOptions } from './types';

const PLUGIN_ID = '@cbhq/docusaurus-plugin-kbar';

export default async function plugin(
  context: LoadContext,
  { docs, actions: customConfigActions = [] }: PluginOptions,
): Promise<Plugin<PluginData>> {
  return {
    name: PLUGIN_ID,
    async loadContent() {
      const docsPluginInstance = await docsPlugin(context, {
        ...DEFAULT_OPTIONS,
        ...docs,
      });
      const loadedContent = await docsPluginInstance.loadContent();
      const currentVersion = loadedContent.loadedVersions[0];
      return { actions: getKBarActions(currentVersion) };
    },
    async contentLoaded({ content, actions }): Promise<void> {
      const pluginData = { actions: [...content.actions, ...customConfigActions] };
      actions.setGlobalData(pluginData);
      logger.pluginComplete();
    },
  };
}
