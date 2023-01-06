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
import { getOutputDirectories } from '../../helpers/getOutputDirectories';
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
    const illustrationEntries = manifest.itemEntries;

    function generateImageFormatsForItem(type: string) {
      return async (item: Component) => {
        const { svgDir, svgJsDir, pngDir } = getOutputDirectories({ type, generatedDirectory });
        let imageOutputs: Record<string, string> = {};
        const imageName = item.name;

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
      illustrationEntries.map(async ([illustrationType, illustrationsForType]) => {
        const pascalCaseIllustrationType = pascalCase(illustrationType); // convert heroSquare to HeroSquare
        const { dataDir, svgJsDir } = getOutputDirectories({
          type: illustrationType,
          generatedDirectory,
        });

        const illustrations = await Promise.all(
          illustrationsForType.map(generateImageFormatsForItem(illustrationType)),
        );

        const typescriptData = {
          exportName: `${pascalCaseIllustrationType}Name`, // HeroSquareName, SpotSquareName, etc
          get dest() {
            return `${generatedDirectory}/${illustrationType}/types/${this.exportName}.ts`;
          },
          get content() {
            return typescriptTypesTemplate`
              ${codegenHeader}
            
              export type ${this.exportName} = ${illustrationsForType.map((item) => item.name)};
            `;
          },
        };

        const websiteSheetData = {
          dest: `${dataDir}/names.ts`,
          get content() {
            return tokensSortedTemplate`
              ${codegenHeader}
            
              /** 
                * An array of all ${pascalCaseIllustrationType} illustrations.
                * This is being used to display a sheet of all ${pascalCaseIllustrationType} illustration on the CDS website.
                */
              const names = ${illustrations.map((item) => item.name)} as const;

              export default names;
            `;
          },
        };

        const websiteSearchData = {
          dest: `${dataDir}/descriptionMap.ts`,
          get content() {
            return tokensTemplate`
                ${codegenHeader}
                
                /** 
                  * Mapping of descriptions to associated illustrations.
                  * This is being used on the search portion of the ${pascalCaseIllustrationType} page on the CDS website.
                  * The search query filters the shown illustrations based on matches with name or description. 
                  */ 
                const descriptionMap: Record<string, string[]> = ${createDescriptionGraph(
                  illustrations,
                )};

                export default descriptionMap;
              `;
          },
        };

        const versionMapData = {
          dest: `${dataDir}/versionMap.ts`,
          get content() {
            const sortedItemsForVersion = Object.fromEntries(
              illustrations.sort(sortByLastUpdated).map((item) => [item.name, item.version]),
            );

            return tokensTemplate`
              ${codegenHeader}

                /** 
                 * Currently used on web for interpolating the URL to CDN hosted asset using the name and version number.
                 *
                 * For example, given the following ${pascalCaseIllustrationType} versionMap, '{ someIllustration: 2 }', and 
                 * JSX such as '<${pascalCaseIllustrationType} name="someIllustration />' will result in an image with the following URL:
                 * 
                 * 'https://static-assets.coinbase.com/design-system/illustrations/${illustrationType}/light/someIllustration-2.svg
                 * 
                 * In addition, this file is used to populate ${pascalCaseIllustrationType} stories in percy, so the sort order based on last updated is important.
                 */
                const versionMap = ${sortedItemsForVersion};

                export default versionMap;
            `;
          },
        };

        const jsData = {
          dest: `${svgJsDir}/index.ts`,
          get content() {
            const destDir = path.dirname(this.dest);

            const contentAsString = illustrations
              .sort((prev, next) => sortByAlphabet(prev.name, next.name))
              .reduce((prev, next) => {
                if (!next.outputs.svgJsLight) {
                  throw new Error(`Unable to find svgJsLight file path for ${next.name}`);
                }

                if (!next.outputs.svgJsDark) {
                  throw new Error(`Unable to find svgJsDark file path for ${next.name}`);
                }

                const relativeLight = getRelativePathForImport(destDir, next.outputs.svgJsLight);
                const relativeDark = getRelativePathForImport(destDir, next.outputs.svgJsDark);

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
              
              const svgJs = {
                ${contentAsString}
              } as Record<${typescriptData.exportName}, { light: () => string; dark: () => string }>;

              export default svgJs;
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
