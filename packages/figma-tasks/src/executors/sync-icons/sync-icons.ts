import { createTask } from '@cbhq/mono-tasks';
import { existsOrCreateDir, getAbsolutePath } from '@cbhq/script-utils';

import { generateFont } from '../../helpers/font/generateFont';
import { getFontProcessor } from '../../helpers/font/getFontProcessor';
import { FontConfig, FontManifestShape } from '../../helpers/font/types';
import { generateTypes } from '../../helpers/generateTypes';
import { GenerateSvgsTaskOptions, svgsGenerator } from '../../helpers/svgsGenerator';
import { syncComponentSets } from '../../helpers/syncComponentSets';
import { ComponentSet } from '../../tools/ComponentSet';
import { ComponentSetChild } from '../../tools/ComponentSetChild';

type IconComponentSetChildShape = {
  metadata: { unicode: string };
  props: { active?: boolean; size: number };
};

export type IconComponentSet = ComponentSet<IconComponentSetChildShape>;
export type IconComponentSetChild = ComponentSetChild<IconComponentSetChildShape>;
export type IconsManifestShape = FontManifestShape<IconComponentSet>;

export type SyncIconsTaskOptions = {
  /** The file ID to use when making requests to Figma API  */
  figmaApiFileId: string;
  /** The manifest.json file to get information about previous syncs and to update after new syncs. */
  manifestFile: string;
  /** The CHANGELOG.md file to document changes to. */
  changelogFile?: string;
  /** The directory to output generated types. */
  generatedTypesDirectory?: string;
  /** The font family name to use in generated fonts. */
  generatedFontName: string;
  /** Formats of font files to generate. */
  generatedFontFormats: FontConfig[];
  /** File to output generated glyphMap to */
  generatedGlyphMapFile?: string;
} & GenerateSvgsTaskOptions;

function getName(componentSet: ComponentSet) {
  return componentSet.name;
}

/** Convert to use the PascalCase typescript declaration format */
function formatTypeName(type: string) {
  if (type === 'ui') {
    return 'IconName';
  }
  if (type === 'nav') {
    return 'NavigationIconName';
  }
  return type;
}

const syncIconComponentSets = syncComponentSets<IconsManifestShape>;
const iconsSvgGenerator = svgsGenerator<IconComponentSetChild & { name: string }>;

export const syncIcons = createTask<SyncIconsTaskOptions>('sync-icons', async (task) => {
  const { changelog, manifest, colorStyles, remoteSvgs } = await syncIconComponentSets(task, {
    downloadSvgs: false,
  });

  const generateSvgs = iconsSvgGenerator({
    colorStyles,
    task,
    remoteSvgs,
  });

  const generatedPromises: Promise<void>[] = [];

  const componentSets = [...manifest.items.values()];

  const componentSetItems = componentSets.flatMap((componentSet) => {
    return componentSet.components;
  });

  const svgs = await generateSvgs(componentSetItems);

  if (task.options.generatedFontName && task.options.generatedFontFormats) {
    const fontProcessor = getFontProcessor({ manifest, svgs });
    await generateFont({
      task,
      sourceSvgsDirectory: task.options.generatedSvgsDirectory,
      generatedFontName: task.options.generatedFontName,
      generatedFontFormats: task.options.generatedFontFormats,
      generatedGlyphMapFile: task.options.generatedGlyphMapFile,
      processor: fontProcessor,
    });
  }

  if (task.options.generatedTypesDirectory) {
    const outputDir = getAbsolutePath(task, task.options.generatedTypesDirectory);
    await existsOrCreateDir(outputDir);
    const typesPromise = generateTypes(componentSets, {
      formatTypeName,
      formatTypeValue: getName,
      outputDir,
    });
    generatedPromises.push(typesPromise);
  }

  await Promise.all([
    ...generatedPromises,
    manifest.generateFile(),
    changelog?.generateFile({ task, manifest, groupByType: true }),
  ]);

  // if (icons.warnings) {
  //   console.error(icons.warnings);
  //   return { success: false };
  // }

  return { success: true };
});
