import fs from 'node:fs';
import path from 'node:path';
import { createTask } from '@cbhq/mono-tasks';
import {
  existsOrCreateDir,
  getAbsolutePath,
  pascalCase,
  tokensSortedTemplate,
  tokensTemplate,
  typescriptTypesTemplate,
  writePrettyFile,
} from '@cbhq/script-utils';

import { createDescriptionGraph } from '../../helpers/createDescriptionGraph';
import { generateFont } from '../../helpers/font/generateFont';
import { getFontProcessor } from '../../helpers/font/getFontProcessor';
import { oldManifest } from '../../helpers/font/oldManifest';
import { FontConfig } from '../../helpers/font/types';
import { getOutputDirectories } from '../../helpers/getOutputDirectories';
import { getRelativePathForImport } from '../../helpers/getRelativePathForImport';
import { getSvgMarkup } from '../../helpers/image/getSvgMarkup';
import { ComponentSet } from '../../tools/ComponentSet';
import { ComponentSetChild } from '../../tools/ComponentSetChild';
import { Manifest, ManifestShape, ManifestTaskOptions } from '../../tools/Manifest';

type IconComponentSetChildShape = {
  metadata: { unicode: string };
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
  /** File to output generated glyphMap to */
  generatedGlyphMapFile?: string;
} & ManifestTaskOptions;

/**
 * If componentSet.type is 'ui' and icon is size 12, result will be `ui-close-12`
 * If componentSet.type is 'nav' and icon is size 12, result will be `nav-home-12-active`
 */
function getSvgName({ componentSet, props }: IconComponentSetChild) {
  /** UI icons do not have active prop */
  if (props.active === undefined) {
    return `${componentSet.type}-${componentSet.name}-${props.size}`;
  }
  /** Nav icons have active prop */
  const activeLabel = props.active ? 'active' : 'inactive';
  return `${componentSet.type}-${componentSet.name}-${activeLabel}-${props.size}`;
}

export const syncIcons = createTask<SyncIconsTaskOptions>('sync-icons', async (task) => {
  const codegenHeader = `
    /**
     * DO NOT MODIFY
     * Generated from yarn nx run ${task.context.projectName}:${task.targetName}
    */
  `;

  const { manifest, changelog } = await Manifest.init<IconsManifestShape, SyncIconsTaskOptions>(
    task,
    {
      requestType: 'component_sets',
      createItem: ComponentSet.create,
    },
  );

  /**
   * The font generator needs a map of filePath -> IconComponentSetChild.
   * When the font generator is run it will loop through all svgs and only has access
   * to the svg file name which we can then use to associate the svg with the IconComponentSetChild.
   * If the IconComponentSetChild has a unicode in it's metadata property, then that unicode
   * will be assigned on subsequent font generations. This is important so that we maintain
   * backwards compatability and avoid having glyphs re-assigned to different unicodes
   * based on alphabetical sorting.
   */
  const svgFileMap = new Map<string, IconComponentSetChild>();

  const generatedDirectory = getAbsolutePath(task, task.options.generatedDirectory);
  const iconEntries = manifest.itemEntries;

  function generateSvg(svgDir: string) {
    return async (item: IconComponentSetChild) => {
      const imageName = getSvgName(item);
      const svgFilePath = path.join(svgDir, `${imageName}.svg`);

      svgFileMap.set(svgFilePath, item);

      const version = {
        previous: item.version ?? -1,
        get next() {
          return this.previous + 1;
        },
      };

      const svgContent = getSvgMarkup(item.node);
      await fs.promises.writeFile(svgFilePath, svgContent);

      const unicode =
        item.metadata?.unicode ??
        // TODO: remove oldManifest fallback after we remove old manifest.json in codegen
        oldManifest.unicodeMap[imageName as keyof typeof oldManifest.unicodeMap];
      item.setMetadata({ unicode });

      item.componentSet.addToOutputs({ svgLight: svgFilePath });
      item.setVersion(version.next);
      return item;
    };
  }

  await Promise.all(
    iconEntries.map(async ([iconType, iconComponentSets]) => {
      const groupType = `${iconType}Icon`; // Prepend Icon to iconType to be more explicit
      const groupTypeInPascalCase = pascalCase(groupType); // convert uiIcon to UiIcon and navIcon to NavIcon
      const { dataDir, svgDir, typescriptDir } = getOutputDirectories({
        type: iconType,
        generatedDirectory,
      });

      await existsOrCreateDir(svgDir); // we don't use writePrettyFile, which does this automatically, for generating .svg assets

      const componentSetChildren = await Promise.all(
        iconComponentSets.flatMap((componentSet) =>
          componentSet.components.map(generateSvg(svgDir)),
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

      const websiteSheetData = {
        dest: `${dataDir}/names.ts`,
        get content() {
          const destDir = path.dirname(this.dest);
          const relativeTypes = getRelativePathForImport(destDir, typescriptData.dest);

          return tokensSortedTemplate`
            ${codegenHeader}
          
            import type { ${typescriptData.exportName} } from '${relativeTypes}';

            /** 
             * An array of all ${groupTypeInPascalCase} icons.
             * This is being used to display a sheet of all ${groupTypeInPascalCase} illustration on the CDS website.
             */
            const names: ${typescriptData.exportName}[] = ${componentSetChildren.map(getSvgName)};

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
        writePrettyFile(websiteSheetData.dest, websiteSheetData.content),
        writePrettyFile(websiteSearchData.dest, websiteSearchData.content),
        writePrettyFile(typescriptData.dest, typescriptData.content),
      ]);
    }),
  );

  const fontProcessor = getFontProcessor({
    // TODO: remove oldManifest fallback after we remove old manifest.json in codegen
    lastUnicode: manifest.metadata?.lastUnicode ?? oldManifest.lastUnicode,
    /** Update the lastUnicode value in icon's manifest.json on each increment */
    onUnicodeUpdate: (unicode) => manifest.setMetadata({ lastUnicode: unicode }),
    svgFileMap,
  });

  /**
   * This must be run before we update manifest with manifest.generateFile since it will
   * update the lastUnicode once finished processing
   */
  await generateFont({
    task,
    sourceSvgsGlob: `${generatedDirectory}/**/svg/*.svg`,
    generatedFontName: task.options.generatedFontName,
    generatedFontFormats: task.options.generatedFontFormats,
    generatedGlyphMapFile: task.options.generatedGlyphMapFile,
    processor: fontProcessor,
  });

  await Promise.all([
    manifest.generateFile(),
    changelog?.generateFile({ task, manifest, groupByType: true }),
  ]);

  // if (icons.warnings) {
  //   console.error(icons.warnings);
  //   return { success: false };
  // }

  return { success: true };
});
