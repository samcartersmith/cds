const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

process.env.DOTENV_CONFIG_PATH = path.resolve(MONOREPO_ROOT, '.env');

import 'dotenv/config';

import { execSync } from 'node:child_process';
import path from 'node:path';
import {
  getAbsolutePath,
  pascalCase,
  sortByAlphabet,
  tokensSortedTemplate,
  tokensTemplate,
  typescriptTypesTemplate,
  writePrettyFile,
} from '@cbhq/script-utils';

import { commitAndPushChanges, prepareTargetRepo, validateFreshRepo } from '../../git';
import { createDescriptionGraph } from '../../helpers/createDescriptionGraph';
import type { SyncedLibrary } from '../../helpers/fetchIllustrationLibrary';
import { getOutputDirectories } from '../../helpers/getOutputDirectories';
import { getRelativePathForImport } from '../../helpers/getRelativePathForImport';
import { createPngContent } from '../../helpers/image/createPngContent';
import { createSvgContent } from '../../helpers/image/createSvgContent';
import { getIdMappedSvg } from '../../helpers/image/getIdMappedSvg';
import { sortByCreatedAt } from '../../helpers/sortByCreatedAt';
import { Component } from '../../tools/Component';
import { Manifest, ManifestShape, ManifestTaskOptions } from '../../tools/Manifest';

import svgoConfig from './svgoConfig';
import { task } from './task';

export type SyncIllustrationsTaskOptions = {
  /** The directory to output generated files. */
  generatedDirectory: string;
} & ManifestTaskOptions;

export type IllustrationsManifestShape = ManifestShape<Component>;

async function getHashSourceMap(id: string, syncedLibrary: SyncedLibrary) {
  return getIdMappedSvg(id, syncedLibrary, svgoConfig);
}

async function createItem(manifest: Manifest<ManifestShape<Component>>) {
  return Component.create(manifest, getHashSourceMap);
}

export const main = async () => {
  const codegenHeader = `
      /**
       * DO NOT MODIFY
       * Generated from yarn nx run illustration-tasks:${task.targetName}
      */
    `;

  console.log('Validating current and target repos...');
  validateFreshRepo(task.currentRepoRoot);
  validateFreshRepo(task.targetRepoRoot);

  console.log('Preparing target repo branch...');
  const newBranchName = prepareTargetRepo(task.targetRepoRoot);

  process.on('exit', (code) => {
    if (code === 0) return;
    // Clean up the working branch if the illustrations sync fails
    console.log('Illustrations sync failed, deleting working branch...');
    execSync(`git checkout master && git branch -D ${newBranchName}`, {
      cwd: task.targetRepoRoot,
    });
  });

  const { manifest, changelog, colorStyles } = await Manifest.init<
    IllustrationsManifestShape,
    SyncIllustrationsTaskOptions
  >(task as any, {
    createItem,
    versioned: true,
  });

  const generatedDirectory = getAbsolutePath(
    {
      projectRoot: task.projectRoot as any,
      workspace: task.workspace as any,
    },
    task.options.generatedDirectory,
  );

  const illustrationEntries = manifest.groupedItems;

  const invalidItems: Record<
    string,
    {
      name: string;
      figmaUrl: string;
    }[]
  > = {};

  function generateImageFormatsForItem(type: string) {
    return async (item: Component) => {
      if (!item.hasVisualChange) {
        return item;
      }

      // empty out existing outputs
      item.addToOutputs({});

      const { svgDir, svgJsDir, pngDir } = getOutputDirectories({ type, generatedDirectory });
      let imageOutputs: Record<string, string> = {};
      const imageName = `${item.name}-${item.version}`;

      const figmaUrl = manifest.syncedLibrary.imageUrls.svg[item.id];
      const { svgContent, outputs: svgOutputs } = await createSvgContent({
        svg: item.hashSource,
        imageName,
        svgDir,
        svgJsDir,
        colorStyles,
      });

      imageOutputs = { ...imageOutputs, ...svgOutputs };

      const { outputs: pngOutputs } = await createPngContent({
        imageName,
        pngDir,
        svgContent,
      });

      imageOutputs = { ...imageOutputs, ...pngOutputs };

      item.addToOutputs(imageOutputs);

      if (!svgContent.light) {
        if (!invalidItems[type]) {
          invalidItems[type] = [];
        }

        invalidItems[type].push({
          name: item.name,
          figmaUrl,
        });
      }

      return item;
    };
  }

  await Promise.all(
    illustrationEntries.map(async ([illustrationType, illustrationsForType]) => {
      const pascalCaseIllustrationType = pascalCase(illustrationType); // convert heroSquare to HeroSquare
      const { dataDir, typescriptDir } = getOutputDirectories({
        type: illustrationType,
        generatedDirectory,
      });

      const illustrations = await Promise.all(
        illustrationsForType.map(generateImageFormatsForItem(illustrationType)),
      );

      if (invalidItems[illustrationType]?.length) {
        console.log(`
  /* -------------------------------------------------------------------------- */
  /*                         ${illustrationType.toUpperCase()} INVALID ITEMS    */
  /* -------------------------------------------------------------------------- */
  `);
        console.table(invalidItems[illustrationType]);
      }

      const typescriptData = {
        exportName: `${pascalCaseIllustrationType}Name`, // HeroSquareName, SpotSquareName, etc
        get dest() {
          return `${typescriptDir}/${this.exportName}.ts`;
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
          const destDir = path.dirname(this.dest);
          const relativeTypes = getRelativePathForImport(destDir, typescriptData.dest);

          return tokensSortedTemplate`
              ${codegenHeader}
              
              import type { ${typescriptData.exportName} } from '${relativeTypes}';
              
              /** 
                * An array of all ${pascalCaseIllustrationType} illustrations.
                * This is being used to display a sheet of all ${pascalCaseIllustrationType} illustration on the CDS website.
                */
              const names: ${typescriptData.exportName}[] = ${illustrations.map(
            (item) => item.name,
          )};

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
          const destDir = path.dirname(this.dest);
          const relativeTypes = getRelativePathForImport(destDir, typescriptData.dest);

          const sortedItemsForVersion = Object.fromEntries(
            illustrations.sort(sortByCreatedAt).map((item) => [item.name, item.version]),
          );

          return tokensTemplate`
              ${codegenHeader}

              import type { ${typescriptData.exportName} } from '${relativeTypes}';

              /** 
               * Currently used on web for interpolating the URL to CDN hosted asset using the name and version number.
               *
               * For example, given the following ${pascalCaseIllustrationType} versionMap, '{ someIllustration: 2 }', and 
               * JSX such as '<${pascalCaseIllustrationType} name="someIllustration />' will result in an image with the following URL:
               * 
               * 'https://static-assets.coinbase.com/design-system/illustrations/${illustrationType}/light/someIllustration-2.svg
               * 
               * In addition, this file is used to populate ${pascalCaseIllustrationType} stories in percy, so the sort order based on createdAt is important.
               */
              const versionMap: Record<${typescriptData.exportName}, number> = ${sortedItemsForVersion};

              export default versionMap;
            `;
        },
      };

      const jsData = {
        dest: `${dataDir}/svgJsMap.ts`,
        get content() {
          const destDir = path.dirname(this.dest);
          const relativeTypes = getRelativePathForImport(destDir, typescriptData.dest);

          const contentAsString = illustrations
            .sort((prev, next) => sortByAlphabet(prev.name, next.name))
            .reduce((acc, item) => {
              if (!item.outputs.svgJsLight) {
                throw new Error(`Unable to find svgJsLight file path for ${item.name}`);
              }

              if (!item.outputs.svgJsDark) {
                throw new Error(`Unable to find svgJsDark file path for ${item.name}`);
              }

              const absoluteLight = path.isAbsolute(item.outputs.svgJsLight)
                ? item.outputs.svgJsLight
                : path.normalize(`${manifest.generatedDirectory}/${item.outputs.svgJsLight}`);

              const absoluteDark = path.isAbsolute(item.outputs.svgJsDark)
                ? item.outputs.svgJsDark
                : path.normalize(`${manifest.generatedDirectory}/${item.outputs.svgJsDark}`);

              const relativeLight = getRelativePathForImport(destDir, absoluteLight);
              const relativeDark = getRelativePathForImport(destDir, absoluteDark);

              const newContent = `
                    '${item.name}': {
                      light: () => require('${relativeLight}.js').content,
                      dark: () => require('${relativeDark}.js').content,
                    },
                  `.trimStart();
              return `${acc}${newContent}`;
            }, '');

          return tokensTemplate`
              import type { ${typescriptData.exportName} } from '${relativeTypes}';
              
              ${codegenHeader}
              
              const svgJsMap = {
                ${contentAsString}
              } as Record<${typescriptData.exportName}, { light: () => string; dark: () => string }>;

              export default svgJsMap;
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
    manifest.generateFile(task as any),
    changelog?.generateFile({ task: task as any, manifest, groupByType: true }),
  ]);

  return { success: true };
};

main();

process.on('exit', (code) => {
  if (code !== 0)
    return console.log('\n❌ Error: Something went wrong with the illustrations sync');
  console.log('\n✅ Success: Illustrations sync completed successfully!');
  console.log('\nCommitting and pushing changes...\n');
  commitAndPushChanges(task.targetRepoRoot);
});
