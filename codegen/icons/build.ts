import { buildTemplates } from '../utils/buildTemplates';
import { createIconFont } from './createIconFont';

(async function () {
  const iconData = await createIconFont();
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
        dest: 'website/data/iconData.ts',
        data: { iconNames: iconData.names, iconSizes: iconData.sizes },
      },
      {
        dest: 'web/icons/__stories__/iconData.ts',
        data: { iconNames: iconData.names, iconSizes: iconData.sizes },
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
      {
        dest: 'common/types/IconName.ts',
        data: {
          types: {
            IconName: iconData.names,
          },
        },
      },
    ],
  };

  await buildTemplates(templates);
})();
