import { buildTemplates } from '../utils/buildTemplates';
import { createIconFont } from './createIconFont';
import { createPaths } from './createPaths';

(async function () {
  const iconData = await createIconFont();
  const webIconData = await createPaths();
  const templates = {
    'objectMap.ejs': [
      {
        dest: 'mobile/icons/iconGlyphMap.ts',
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
      ...webIconData.svgPaths,
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
