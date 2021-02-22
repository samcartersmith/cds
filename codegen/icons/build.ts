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
        dest: 'website/docs/components/examples/Icon/data.ts',
        data: { iconNames: webIconData.names, iconSizes: webIconData.iconSizes },
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
            IconName: webIconData.names,
          },
        },
      },
    ],
  };

  await buildTemplates(templates);
})();
