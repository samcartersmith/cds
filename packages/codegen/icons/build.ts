import { reduce } from 'lodash';

import { buildTemplates } from '../utils/buildTemplates';
import { createDescriptionGraph } from '../utils/createDescriptionGraph';

import { createIconFont } from './createIconFont';
import { iconManifest } from './iconManifest';

async function buildIcons() {
  const iconData = await createIconFont();
  const iconDescriptionGraph = createDescriptionGraph(
    reduce(
      iconManifest,
      (result, value, key) => {
        // An icon comes in this form <Type>/<IconName>_<Size>
        // we need to clean this data so we only extract the IconName
        // i.e transform navigationIcon/add_xs -> add
        // eslint-disable-next-line no-param-reassign
        result[key] = {
          ...value,
          name: value.name.split('/')[1].split('_')[0],
        };
        return result;
      },
      {} as Record<string, { name: string; description: string }>,
    ),
  );

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
  // await removeSVGs();
}

void buildIcons();
