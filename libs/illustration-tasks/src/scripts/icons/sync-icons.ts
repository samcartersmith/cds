const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

process.env.DOTENV_CONFIG_PATH = path.resolve(MONOREPO_ROOT, '.env');

import 'dotenv/config';

import camelCase from 'lodash/camelCase';
import fs from 'node:fs';
import path from 'node:path';
import type { SyncedLibrary } from '@cbhq/figma-api';
import {
  getAbsolutePath,
  pascalCase,
  tokensTemplate,
  typescriptTypesTemplate,
  writePrettyFile,
} from '@cbhq/script-utils';

import { createDescriptionGraph } from '../../helpers/createDescriptionGraph';
import { generateFont } from '../../helpers/font/generateFont';
import { getFontProcessor } from '../../helpers/font/getFontProcessor';
import type { FontConfig } from '../../helpers/font/types';
import { getOutputDirectories } from '../../helpers/getOutputDirectories';
import { getRelativePathForImport } from '../../helpers/getRelativePathForImport';
import { createSvgContent } from '../../helpers/image/createSvgContent';
import { getIdMappedSvg } from '../../helpers/image/getIdMappedSvg';
import { sortByCreatedAt } from '../../helpers/sortByCreatedAt';
import type { CodegenItemConfig } from '../../helpers/types';
import type { ComponentSetManifest } from '../../tools/ComponentSet';
import { ComponentSet } from '../../tools/ComponentSet';
import { ComponentSetChild } from '../../tools/ComponentSetChild';
import { Manifest, ManifestShape, ManifestTaskOptions } from '../../tools/Manifest';

import svgoConfig from './svgoConfig';
import { task } from './task';

type IconComponentSetChildShape = {
  metadata: { unicode: number };
  props: { active?: boolean; size: number };
};

export type IconComponentSet = ComponentSet<IconComponentSetChildShape>;
export type IconComponentSetChild = ComponentSetChild<IconComponentSetChildShape>;
export type IconManifestMetadata = {
  lastUnicode: number;
};

export type IconsManifestShape = ManifestShape<IconComponentSet, IconManifestMetadata>;

export type SyncIconsTaskOptions = {
  /** The directory to output generated types. */
  generatedDirectory: string;
  /** The font family name to use in generated fonts. */
  generatedFontName: string;
  /** Formats of font files to generate. */
  generatedFontFormats: FontConfig[];
} & ManifestTaskOptions;

function getOutputKey(item: IconComponentSetChild) {
  const propsSuffix = ComponentSetChild.propsObjectToKebabCaseString(item.props);
  const kebabCaseKey = `svg-${propsSuffix}`;
  return camelCase(kebabCaseKey);
}

/**
 * Note: updateCoinbaseIconsFile is a script that updates Icon fonts (CoinbaseIcons) on CDS mobile playground.
 * This is necessary to keep the CDS mobile playground Icon fonts up to date with our CDS Icons package.
 * We copy the packages/icons/src/fonts/native/CoinbaseIcons.ttf file and Replace apps/mobile-app/assets/fonts/CoinbaseIcons.ttf
 */

const updateCoinbaseIconsFile = () => {
  try {
    console.info('Updating apps/mobile-app/assets/fonts/CoinbaseIcons.ttf...');

    const sourcePath = path.resolve(
      MONOREPO_ROOT,
      'packages/icons/src/fonts/native/CoinbaseIcons.ttf',
    );
    const destinationPath = path.resolve(
      MONOREPO_ROOT,
      'apps/mobile-app/assets/fonts/CoinbaseIcons.ttf',
    );

    const destinationPath2 = path.resolve(
      MONOREPO_ROOT,
      'apps/mobile-app/assets/fonts/CoinbaseIcons.ttf',
    );

    fs.copyFileSync(sourcePath, destinationPath);
    fs.copyFileSync(sourcePath, destinationPath2);
    console.info('CoinbaseIcons.ttf file successfully updated!');
  } catch (err) {
    throw new Error(`Error updating CoinbaseIcons.ttf file in mobile-app/assets/fonts/: ${err}`);
  }
};

async function getHashSourceItem(id: string, syncedLibrary: SyncedLibrary) {
  return getIdMappedSvg(id, syncedLibrary, svgoConfig);
}

async function createItem(manifest: ComponentSetManifest) {
  return ComponentSet.create(manifest, getHashSourceItem);
}

export const main = async () => {
  const codegenHeader = `
    /**
     * DO NOT MODIFY
     * Generated from yarn nx run illustration-tasks:${task.targetName}
    */
  `;

  const { manifest, changelog } = await Manifest.init<IconsManifestShape, SyncIconsTaskOptions>(
    task as any,
    {
      imageFormats: ['svg'],
      requestType: 'component_sets',
      createItem,
    },
  );

  /**
   * The font generator needs a map of filePath -> IconComponentSetChild.
   * When the font generator is run it will loop through all svgs and only has access
   * to the svg file name which we can then use to associate the svg with the IconComponentSetChild.
   * If the IconComponentSetChild has a unicode in its metadata property, then that unicode
   * will be assigned on subsequent font generations. This is important so that we maintain
   * backwards compatability and avoid having glyphs re-assigned to different unicodes
   * based on alphabetical sorting.
   */
  const svgFileMap = new Map<string, IconComponentSetChild>();
  const generatedDirectory = getAbsolutePath(
    {
      projectRoot: task.projectRoot as any,
      workspace: task.workspace as any,
    },
    task.options.generatedDirectory,
  );
  const iconEntries = manifest.groupedItems;

  function generateSvg(componentSet: IconComponentSet) {
    return async (item: IconComponentSetChild) => {
      const { svgDir } = getOutputDirectories({ type: componentSet.type, generatedDirectory });
      const componentSetChild = ComponentSetChild.normalize(componentSet, item);
      const imageName = ComponentSetChild.getSvgName(componentSetChild);
      const outputKey = getOutputKey(componentSetChild);
      const svgFilePath = path.join(svgDir, `${imageName}.svg`);

      svgFileMap.set(svgFilePath, componentSetChild);

      if (componentSet.hasVisualChange) {
        // empty out existing outputs
        componentSet.addToOutputs({});

        await createSvgContent({
          svg: item.hashSource,
          imageName,
          svgDir,
        });

        componentSet.addToOutputs({ [outputKey]: svgFilePath });
      }

      return componentSetChild;
    };
  }

  const internalTypescriptItems: CodegenItemConfig[] = [];

  await Promise.all(
    iconEntries.map(async ([iconType, iconComponentSets]) => {
      const groupType = `${iconType}Icon`; // Prepend Icon to iconType to be more explicit
      const groupTypeInPascalCase = pascalCase(groupType); // convert uiIcon to UiIcon and navIcon to NavIcon
      const { dataDir, typescriptDir } = getOutputDirectories({
        type: iconType,
        generatedDirectory,
      });

      const componentSetChildren = await Promise.all(
        iconComponentSets.flatMap((componentSet) =>
          componentSet.components.map(generateSvg(componentSet)),
        ),
      );

      const typescriptData = {
        exportName: `${groupTypeInPascalCase}Name`, // UiIconName, NavIconName
        get dest() {
          return `${typescriptDir}/${this.exportName}.ts`;
        },
        get content() {
          return typescriptTypesTemplate`
            ${codegenHeader}
          
            export type ${this.exportName} = ${iconComponentSets.map((item) => item.name)};
          `;
        },
      };

      const internalTypescriptData = {
        exportName: `${groupTypeInPascalCase}NameInternal`, // UiIconName, NavIconName
        get dest() {
          return `${typescriptDir}/${this.exportName}.ts`;
        },
        get content() {
          return typescriptTypesTemplate`
            ${codegenHeader}
          
            export type ${this.exportName} = ${componentSetChildren.map(
            ComponentSetChild.getSvgName,
          )};
          `;
        },
      };

      internalTypescriptItems.push(internalTypescriptData);

      const namesData = {
        dest: `${dataDir}/names.ts`,
        get content() {
          const destDir = path.dirname(this.dest);
          const relativeTypes = getRelativePathForImport(destDir, typescriptData.dest);

          return tokensTemplate`
            ${codegenHeader}
          
            import type { ${typescriptData.exportName} } from '${relativeTypes}';

            /** 
             * An array of all ${groupTypeInPascalCase} icons.
             * this file is used to populate ${groupTypeInPascalCase} stories in percy, so the sort order based on createdAt is important.
             */
            const names: ${typescriptData.exportName}[] = ${iconComponentSets
            .sort(sortByCreatedAt)
            .map((item) => item.name)};

            export default names;
          `;
        },
      };

      const descriptionMapData = {
        dest: `${dataDir}/descriptionMap.ts`,
        get content() {
          return tokensTemplate`
            ${codegenHeader}
              
            /** 
             * Mapping of descriptions to associated icons.
             * This is being used on the search portion of the ${groupTypeInPascalCase} page on the CDS website.
             * The search query filters the shown icons based on matches with name or description. 
             */ 
            const descriptionMap: Record<string, string[]> = ${createDescriptionGraph(
              iconComponentSets,
            )};

            export default descriptionMap;
          `;
        },
      };

      await Promise.all([
        writePrettyFile(namesData.dest, namesData.content),
        writePrettyFile(descriptionMapData.dest, descriptionMapData.content),
        writePrettyFile(typescriptData.dest, typescriptData.content),
        writePrettyFile(internalTypescriptData.dest, internalTypescriptData.content),
      ]);
    }),
  );

  const fontProcessor = getFontProcessor({
    manifest,
    svgFileMap,
  });

  /**
   * This must be run before we update manifest with manifest.generateFile since it will
   * update the lastUnicode once finished processing
   */
  await generateFont({
    task: task as any,
    sourceSvgsGlob: `${generatedDirectory}/**/svg/*.svg`,
    generatedFontName: task.options.generatedFontName,
    generatedFontFormats: task.options.generatedFontFormats,
    generatedGlyphMapFile: `${generatedDirectory}/glyphMap.ts`,
    glyphMapTypes: internalTypescriptItems,
    codegenHeader,
    processor: fontProcessor,
  });

  // Update CDS Mobile Playground with new Coinbase Icons ttf file.
  updateCoinbaseIconsFile();

  await Promise.all([
    manifest.generateFile(task as any),
    changelog?.generateFile({ task: task as any, manifest, groupByType: true }),
  ]);

  // if (icons.warnings) {
  //   console.error(icons.warnings);
  //   return { success: false };
  // }

  return { success: true };
};

main();
