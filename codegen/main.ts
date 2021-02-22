import { mapValues } from '@cbhq/cds-utils';

import { scaleConfig } from './configs/scaleConfig';
import { Palette } from './Palette';
import { Spacing } from './Spacing';
import { Spectrum } from './Spectrum/Spectrum';
import { Type } from './Type/Type';
import { TypeScript } from './Typescript';
import { buildTemplates } from './utils/buildTemplates';
import { docgen } from './website/docgen';
import { updateTextStylesTable } from './website/updateTextStylesTable';

(async function () {
  const templates = {
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
    ],
    'docgen.ejs': docgen,
    'typescript.ejs': TypeScript,
  };

  Palette.validate();
  await updateTextStylesTable();

  await buildTemplates(templates);
})();
