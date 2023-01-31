import type { LoadContext, Plugin } from '@docusaurus/types';
import { DEFAULT_PLUGIN_ID } from '@docusaurus/utils';
import path from 'path';

import { docgenRunner } from './scripts/docgenRunner';
import { docgenWriter } from './scripts/docgenWriter';
import { getMinutesBetweenDates } from './utils/getMinutesBetweenDates';
import { logger } from './utils/logger';
import type { PluginContent, PluginOptions } from './types';

const PLUGIN_ID = '@cbhq/docusaurus-plugin-docgen';

/**
 * Persist build state as a global, since the plugin is re-evaluated every hot reload.
 * Because of this, we can't use state in the plugin or module scope.
 */
declare module global {
  // eslint-disable-next-line import/no-mutable-exports
  export let docgenBuild: {
    lastRun: Date | undefined;
    isRunning: boolean;
    count: number;
  };
}

if (!global.docgenBuild) {
  global.docgenBuild = { lastRun: undefined, isRunning: false, count: 0 };
}

export default function plugin(
  { generatedFilesDir }: LoadContext,
  { enabled = true, watchInterval = 5, ...options }: PluginOptions,
): Plugin<PluginContent | undefined> {
  /**
   * The directory where we want to output docgen data and components.
   * If running on website, this will be in .docusaurus/docusaurus-plugin-docgen/default
   */
  const pluginDir = path.join(generatedFilesDir, PLUGIN_ID, options.id ?? DEFAULT_PLUGIN_ID);

  return {
    name: PLUGIN_ID,
    async loadContent() {
      if (enabled) {
        logger.init();

        const { isRunning, lastRun } = global.docgenBuild;
        const isFirstRun = lastRun === undefined;
        const lastUpdate = getMinutesBetweenDates(lastRun, new Date());

        if (!isFirstRun) logger.lastUpdate(lastUpdate);

        const shouldUpdate = !isRunning && (isFirstRun || lastUpdate >= watchInterval);
        logger.initStatus(shouldUpdate);

        if (shouldUpdate) {
          return docgenRunner({ ...options, pluginDir });
        }
      } else {
        logger.enabledOff();
      }
      return undefined;
    },
    configureWebpack(_webpackConfig, _isServer, _utils, content) {
      let metadataAliases = {};
      let apiAliases = {};
      let changelogAliases = {};
      if (content) {
        /**
         * If changelog is false but app references those files via webpack alias,
         * then we need to create webpack aliases to point to a placeholder mdx file so website will still run properly.
         */
        changelogAliases = Object.fromEntries(
          content.parsedDocs.map((item) => [
            path.join(':docgen', path.relative(pluginDir, item.cacheDirectory), 'changelog.mdx'),
            options.changelog
              ? path.join(item.cacheDirectory, 'changelog.mdx')
              : path.join(pluginDir, '_placeholders', 'changelog.mdx'),
          ]),
        );

        apiAliases = Object.fromEntries(
          content.parsedDocs.map((item) => [
            path.join(':docgen', path.relative(pluginDir, item.cacheDirectory), 'api.mdx'),
            path.join(item.cacheDirectory, 'api.mdx'),
          ]),
        );

        metadataAliases = Object.fromEntries(
          content.projects.map((item) => [
            path.join(':docgen', path.relative(pluginDir, item.cacheDirectory), 'metadata'),
            path.join(item.cacheDirectory, 'metadata.js'),
          ]),
        );
      }

      const aliases = {
        ...apiAliases,
        ...changelogAliases,
        ...metadataAliases,
        [`:docgen/_types/sharedTypeAliases`]: path.join(pluginDir, '_types/sharedTypeAliases'),
        [`:docgen/_types/sharedParentTypes`]: path.join(pluginDir, '_types/sharedParentTypes'),
      };

      return {
        resolve: {
          alias: aliases,
        },
      };
    },
    async contentLoaded({ content, actions }): Promise<void> {
      if (content) {
        const { projects, filesToWrite } = content;
        await docgenWriter(filesToWrite);
        actions.setGlobalData({ enabled: true, projects });
        logger.pluginComplete();

        global.docgenBuild = {
          count: (global.docgenBuild.count += 1),
          lastRun: new Date(),
          isRunning: false,
        };
      } else {
        actions.setGlobalData({ enabled: false, projects: [] });
      }
    },
  };
}
