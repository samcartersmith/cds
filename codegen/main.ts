import { mapValues } from '@cbhq/cds-utils';

import { scaleConfig } from './configs/scaleConfig';
import { Palette, defaultPalette } from './Palette';
import { Spacing } from './Spacing';
import { Spectrum } from './Spectrum/Spectrum';
import { Type } from './Type/Type';
import { TypeScript } from './Typescript';
import { buildTemplates } from './utils/buildTemplates';
import { docgen } from './website/docgen';
import { updateTextStylesTable } from './website/updateTextStylesTable';

(async function () {
  const templates = {
    'lottieStyles.ejs': [
      {
        dest: 'web/animation/lottieStyles.ts',
        data: defaultPalette,
      },
    ],
    'css.ejs': [
      {
        dest: 'web/typography/textStyles.ts',
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
      {
        dest: 'web/styles/borderColor.ts',
        data: Palette.cssBorderColor,
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
        dest: 'web/styles/palette.ts',
        data: { palette: Palette.cssVariables },
      },
      {
        dest: 'common/palette/constants.ts',
        data: {
          defaultPalette: Palette.defaultPalette,
          paletteForegrounds: Palette.paletteForegrounds,
          paletteBackgrounds: Palette.paletteBackgrounds,
          paletteBorders: Palette.paletteBorders,
        },
      },
    ],
    'docgen.ejs': docgen,
    'typescript.ejs': TypeScript,
  };

  Palette.validate();
  await updateTextStylesTable();

  await buildTemplates(templates);
})();
