import { mapValues } from '@cds/utils';

import { scaleConfig } from './configs/scaleConfig';
import { Icon } from './Icon';
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
  Record<string, { dest: string; data: Record<string, unknown> }[]>
> {
  const iconData = await Icon.data();

  return {
    'css.ejs': [
      {
        dest: 'web/Text/textStyles.ts',
        data: Type.css,
      },
      {
        dest: 'theme/styles/scale.ts',
        data: mapValues(scaleConfig, (_, scale) => {
          return {
            ...Type.scaleCss[scale],
            ...Spacing.scaleCss[scale],
          };
        }),
      },
      {
        dest: 'theme/styles/spectrum.ts',
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
        dest: 'theme/styles/scale.native.ts',
        data: mapValues(scaleConfig, (_, scale) => {
          return {
            typography: Type.mobile[scale],
            spacing: Spacing.mobile[scale],
          };
        }),
      },
      {
        dest: 'theme/styles/spectrum.native.ts',
        data: Spectrum.native,
      },
      {
        dest: 'theme/palette/constants.ts',
        data: {
          defaultPalette: Palette.defaultPalette,
          paletteForegrounds: Palette.paletteForegrounds,
          paletteBackgrounds: Palette.paletteBackgrounds,
        },
      },
      {
        dest: 'theme/palette/palette.ts',
        data: { palette: Palette.cssVariables },
      },
      {
        dest: 'icons/native/glyphs.ts',
        data: { glyphMap: iconData.glyphMap },
      },
    ],
    'docgen.ejs': docgen,
    'typescript.ejs': [
      ...TypeScript,
      {
        dest: 'icons/types.ts',
        data: {
          types: {
            IconSize: iconData.sizes,
            IconKind: iconData.kinds,
            IconName: iconData.names,
            IconPixels: iconData.pixels,
          },
        },
      },
    ],
  };
}

(async function () {
  const templateInputs: { template: string; dest: string; data: Record<string, unknown> }[] = [];

  try {
    Palette.validate();

    await updateTextStylesTable();

    Object.entries(await loadTemplates()).forEach(([template, configs]) => {
      configs.map(({ dest, data }) => {
        templateInputs.push({
          template,
          dest,
          data,
        });
      });
    });

    await Promise.all(templateInputs.map(generateFromTemplate));
    await Icon.svgs();
  } catch (err) {
    logError(err);
  }
})();
