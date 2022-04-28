/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { LoadContext, Plugin } from '@docusaurus/types';
import { DEFAULT_PLUGIN_ID } from '@docusaurus/utils';
import ejs from 'ejs';
import path from 'path';

import { DocgenParserParams, docgenRunner } from './scripts/docgenRunner';
import { DocgenWriterParams } from './scripts/docgenWriter';

const PLUGIN_ID = 'docusaurus-plugin-docgen';

export type DocgenPluginParams = Omit<DocgenParserParams, 'outputDir'> & {
  enable?: boolean;
};

export default function plugin(
  { generatedFilesDir }: LoadContext,
  { enable = true, ...options }: DocgenPluginParams,
): Plugin<DocgenWriterParams | undefined> {
  /** The directory where we want to output docgen data and components.
   * If running on website, this will be in .docusaurus/docusaurus-plugin-docgen
   */
  const outputDir = path.join(generatedFilesDir, PLUGIN_ID, options.id ?? DEFAULT_PLUGIN_ID);

  return {
    name: PLUGIN_ID,
    async loadContent() {
      if (enable) {
        return docgenRunner({ ...options, outputDir });
      }
      return undefined;
    },
    configureWebpack(webpackConfig) {
      return {
        resolve: {
          alias: {
            [options.alias]: path.join(
              // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
              // @ts-ignore This is how we are able to have consumers access the docgen data with alias of their choice
              webpackConfig.resolve.alias['@generated'],
              PLUGIN_ID,
              // id gets replaced with doc version if applicable
              options?.id ?? DEFAULT_PLUGIN_ID,
            ),
          },
        },
      };
    },
    async contentLoaded({ content, actions }): Promise<void> {
      if (content) {
        await Promise.all(
          content.files.map(async (item) => {
            const contents = await ejs.renderFile(item.template, {
              data: item.data,
              alias: options.alias,
            });
            await actions.createData(item.dest, contents);
          }),
        );
      }
    },
  };
}
