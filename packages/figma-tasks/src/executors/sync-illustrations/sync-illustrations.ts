import groupBy from 'lodash/groupBy';
import path from 'node:path';
import { createTask } from '@cbhq/mono-tasks';
import {
  getAbsolutePath,
  pascalCase,
  sortByAlphabet,
  tokensSortedTemplate,
  tokensTemplate,
  typescriptTypesTemplate,
  writePrettyFile,
} from '@cbhq/script-utils';

import { createDescriptionGraph } from '../../helpers/createDescriptionGraph';
import { getRelativePathForImport } from '../../helpers/getRelativePathForImport';
import { createPngContent } from '../../helpers/image/createPngContent';
import { createSvgContent } from '../../helpers/image/createSvgContent';
import { Component } from '../../tools/Component';
import { Manifest, ManifestShape, ManifestTaskOptions } from '../../tools/Manifest';

export type SyncIllustrationsTaskOptions = {
  /** The directory to output generated files. */
  generatedDirectory: string;
} & ManifestTaskOptions;

export type IllustrationsManifestShape = ManifestShape<Component>;

function sortByLastUpdated(prev: Component, next: Component) {
  const prevDate = new Date(prev.lastUpdated).valueOf();
  const nextDate = new Date(next.lastUpdated).valueOf();

  return prevDate - nextDate;
}

export const syncIllustrations = createTask<SyncIllustrationsTaskOptions>(
  'sync-illustrations',
  async (task) => {
    const codegenHeader = `
      /**
       * DO NOT MODIFY
       * Generated from yarn nx run ${task.context.projectName}:${task.targetName}
      */
    `;

    const { manifest, changelog, colorStyles } = await Manifest.init<
      IllustrationsManifestShape,
      SyncIllustrationsTaskOptions
    >(task, {
      imageFormats: ['svg'],
      requestType: 'components',
      createItem: Component.create,
    });

    const generatedDirectory = getAbsolutePath(task, task.options.generatedDirectory);

    const components = [...manifest.items.values()];
    const groupedByType = groupBy(components, 'type');
    const groupTypes = Object.entries(groupedByType);

    function generateImageFormatsForItem(type: string) {
      return async (item: Component) => {
        let imageOutputs: Record<string, string> = {};
        const imageName = item.name;
        const svgDir = `${generatedDirectory}/${type}/svg`;
        const pngDir = `${generatedDirectory}/${type}/png`;
        const svgJsDir = `${generatedDirectory}/${type}/js`;

        const version = {
          previous: item.version ?? -1,
          get next() {
            return this.previous + 1;
          },
        };

        const figmaUrl = manifest.syncedLibrary.imageUrls.svg[item.id];
        const { svgContent, outputs: svgOutputs } = await createSvgContent({
          imageName,
          version,
          svgDir,
          svgJsDir,
          figmaUrl,
          colorStyles,
        });

        imageOutputs = { ...imageOutputs, ...svgOutputs };

        if (pngDir) {
          const { outputs: pngOutputs } = await createPngContent({
            imageName,
            version,
            pngDir,
            svgContent,
          });
          imageOutputs = { ...imageOutputs, ...pngOutputs };
        }

        item.addToOutputs(imageOutputs);
        item.setVersion(version.next);
        return item;
      };
    }

    await Promise.all(
      groupTypes.map(async ([groupType, itemsInGroup]) => {
        const groupTypeInPascalCase = pascalCase(groupType); // convert heroSquare to HeroSquare

        const dataDir = `${generatedDirectory}/${groupType}/data`;

        const illustrations = await Promise.all(
          itemsInGroup.map(generateImageFormatsForItem(groupType)),
        );

        const typescriptData = {
          exportName: `${groupTypeInPascalCase}Name`, // HeroSquareName, SpotSquareName, etc
          get dest() {
            return `${generatedDirectory}/${groupType}/types/${this.exportName}.ts`;
          },
          get content() {
            return typescriptTypesTemplate`
              ${codegenHeader}
            
              export type ${this.exportName} = ${itemsInGroup.map((item) => item.name)};
            `;
          },
        };

        const websiteSheetData = {
          exportName: `${groupType}Names`, // heroSquareNames, spotSquareNames, etc
          get dest() {
            return `${dataDir}/${this.exportName}.ts`;
          },
          get content() {
            return tokensSortedTemplate`
              ${codegenHeader}
            
              /** 
                * An array of all ${groupTypeInPascalCase} illustrations.
                * This is being used to display a sheet of all ${groupTypeInPascalCase} illustration on the CDS website.
                */
              export const ${this.exportName} = ${illustrations.map((item) => item.name)} as const;
            `;
          },
        };

        const websiteSearchData = {
          exportName: `${groupType}DescriptionsMap`, // heroSquareDescriptionMap, spotSquareDescriptionMap, etc
          get dest() {
            return `${dataDir}/${this.exportName}.ts`;
          },
          get content() {
            const { name: exportName } = path.parse(this.dest);
            return tokensTemplate`
                ${codegenHeader}
                
                /** 
                  * Mapping of descriptions to associated illustrations.
                  * This is being used on the search portion of the ${groupTypeInPascalCase} page on the CDS website.
                  * The search query filters the shown illustrations based on matches with name or description. 
                  */ 
                export const ${exportName}: Record<string, string[]> = ${createDescriptionGraph(
              illustrations,
            )};
              `;
          },
        };

        const versionMapData = {
          dest: path.join(dataDir, `${groupType}VersionMap.ts`), // heroSquareVersionMap, spotSquareVersionMap, etc
          get content() {
            const { name: exportName } = path.parse(this.dest);
            const sortedItemsForVersion = Object.fromEntries(
              illustrations.sort(sortByLastUpdated).map((item) => [item.name, item.version]),
            );

            return tokensTemplate`
              ${codegenHeader}

                /** 
                 * Currently used on web for interpolating the URL to CDN hosted asset using the name and version number.
                 *
                 * For example, given the following ${exportName}, 'export const ${exportName} = { someIllustration: 2 }', and 
                 * JSX such as '<${groupTypeInPascalCase} name="someIllustration />' will result in an image with the following URL:
                 * 
                 * 'https://static-assets.coinbase.com/design-system/illustrations/${groupType}/light/someIllustration-2.svg
                 * 
                 * In addition, this file is used to populate ${groupTypeInPascalCase} stories in percy, so the sort order based on last updated is important.
                 */
                export const ${exportName} = ${sortedItemsForVersion};
            `;
          },
        };

        const jsData = {
          dest: `${generatedDirectory}/${groupType}/js/index.ts`,
          get content() {
            const destDir = path.dirname(this.dest);

            const contentAsString = illustrations
              .sort((prev, next) => sortByAlphabet(prev.name, next.name))
              .reduce((prev, next) => {
                if (!next.outputs.jsLight) {
                  throw new Error(`Unable to find jsLight file path for ${next.name}`);
                }

                if (!next.outputs.jsDark) {
                  throw new Error(`Unable to find jsDark file path for ${next.name}`);
                }

                const relativeLight = getRelativePathForImport(destDir, next.outputs.jsLight);
                const relativeDark = getRelativePathForImport(destDir, next.outputs.jsDark);

                const newContent = `
                    '${next.name}': {
                      light: () => require('./${relativeLight}').content,
                      dark: () => require('./${relativeDark}').content,
                    },
                  `.trimStart();
                return `${prev}${newContent}`;
              }, '');

            const relativeTypes = getRelativePathForImport(destDir, typescriptData.dest);

            return tokensTemplate`
              /* eslint-disable global-require */
              /* eslint-disable @typescript-eslint/no-unsafe-return */

              import type { ${typescriptData.exportName} } from '${relativeTypes}';
              
              ${codegenHeader}
              
              export default {
                ${contentAsString}
              } as Record<${typescriptData.exportName}, { light: () => string; dark: () => string }>;
            `;
          },
        };

        await Promise.all([
          writePrettyFile(typescriptData.dest, typescriptData.content),
          writePrettyFile(websiteSheetData.dest, websiteSheetData.content),
          writePrettyFile(websiteSearchData.dest, websiteSearchData.content),
          writePrettyFile(versionMapData.dest, versionMapData.content),
          writePrettyFile(jsData.dest, jsData.content),
        ]);
      }),
    );

    await Promise.all([
      manifest.generateFile(),
      changelog?.generateFile({ task, manifest, groupByType: true }),
    ]);

    return { success: true };
  },
);
