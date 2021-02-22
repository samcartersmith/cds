import { AnyObject, mapValues } from '@cbhq/cds-utils';

import { scaleConfig } from './configs/scaleConfig';
import { Icon } from './icons/Icon';
import { Palette } from './Palette';
import { Spacing } from './Spacing';
import { Spectrum } from './Spectrum/Spectrum';
import { Type } from './Type/Type';
import { TypeScript } from './Typescript';
import { generateFromTemplate } from './utils/generateFromTemplate';
import { logError } from './utils/logError';
import { docgen } from './website/docgen';
import { updateTextStylesTable } from './website/updateTextStylesTable';

async function loadTemplates(): Promise<
  Record<string, { dest: string; data: Record<string, unknown>; config?: AnyObject }[]>
> {
  const iconData = await Icon.data();
  const webIconData = await Icon.web();

  return {
    'css.ejs': [
      {
        dest: 'web/Text/textStyles.ts',
        data: Type.css,
      },
      {
        dest: 'web/styles/scale.ts',
        data: mapValues(scaleConfig, (_, scale) => {
          return {
            ...Type.scaleCss[scale],
            ...Spacing.scaleCss[scale],
          };
        }),
      },
      {
        dest: 'web/styles/spectrum.ts',
        data: Spectrum.css,
      },
      {
        dest: 'web/styles/foregroundColor.ts',
        data: Palette.cssColor,
      },
      {
        dest: 'web/styles/backgroundColor.ts',
        data: Palette.cssBackgroundColor,
      },
    ],
    'cssMap.ejs': [
      {
        dest: 'web/styles/padding.ts',
        data: Spacing.css('padding'),
      },
      {
        dest: 'web/styles/margin.ts',
        data: Spacing.css('margin'),
      },
    ],
    'objectMap.ejs': [
      {
        dest: 'mobile/styles/scale.ts',
        data: mapValues(scaleConfig, (_, scale) => {
          return {
            typography: Type.mobile[scale],
            spacing: Spacing.mobile[scale],
          };
        }),
      },
      {
        dest: 'mobile/styles/spectrum.ts',
        data: Spectrum.native,
      },
      {
        dest: 'common/palette/constants.ts',
        data: {
          defaultPalette: Palette.defaultPalette,
          paletteForegrounds: Palette.paletteForegrounds,
          paletteBackgrounds: Palette.paletteBackgrounds,
        },
      },
      {
        dest: 'web/styles/palette.ts',
        data: { palette: Palette.cssVariables },
      },
      {
        dest: 'mobile/Icon/iconGlyphMap.ts',
        data: { iconGlyphMap: iconData.glyphMap },
      },
      {
        dest: 'website/docs/components/examples/Icon/data.ts',
        data: { iconNames: webIconData.names, iconSizes: webIconData.iconSizes },
      },
      ...webIconData.svgPaths,
    ],
    'docgen.ejs': docgen,
    'typescript.ejs': [
      ...TypeScript,
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
}

(async function () {
  const templateInputs: {
    template: string;
    dest: string;
    data: Record<string, unknown>;
    config?: AnyObject;
  }[] = [];

  try {
    Palette.validate();

    await updateTextStylesTable();

    Object.entries(await loadTemplates()).forEach(([template, items]) => {
      items.map(({ dest, data, config = {} }) => {
        templateInputs.push({
          template,
          dest,
          data,
          config,
        });
      });
    });

    await Promise.all(templateInputs.map(generateFromTemplate));
  } catch (err) {
    logError(err);
  }
})();
