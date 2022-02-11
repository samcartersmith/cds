import { buildTemplates } from '../utils/buildTemplates';

import { createDescriptionGraph } from './createDescriptionGraph';
import { createIconFont, removeSVGs } from './createIconFont';

async function buildIcons() {
  const iconData = await createIconFont();
  const iconDescriptionGraph = createDescriptionGraph();

  const templates = {
    'objectMap.ejs': [
      // We ship web and mobile iconGlyphMap's separately to guarantee
      // the font and glyphmap are always in sync. Once all consumers are in
      // the monorepo we could move this to common
      {
        dest: 'mobile/icons/iconGlyphMap.ts',
        data: { iconGlyphMap: iconData.glyphMap },
      },
      {
        dest: 'web/icons/iconGlyphMap.ts',
        data: { iconGlyphMap: iconData.glyphMap },
      },
      {
        dest: 'common/internal/data/iconDescriptionGraph.ts',
        data: { iconDescriptionGraph },
        types: {
          iconDescriptionGraph: 'Record<string, string[]>',
        },
        config: {
          disableAsConst: true,
        },
      },
    ],
    'typescript.ejs': [
      {
        dest: 'common/types/IconSize.ts',
        data: {
          types: {
            IconSize: iconData.sizes,
            IconPixelSize: iconData.pixels,
          },
        },
      },
    ],
  };

  await buildTemplates(templates);
  await removeSVGs();
}

void buildIcons();
