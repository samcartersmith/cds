import { mapValues } from '@cbhq/cds-utils';

import {
  borderRadiusConfig,
  borderRadiusCss,
  borderWidthConfig,
  borderWidthCss,
} from './configs/borderConfig';
import { scaleConfig } from './configs/scaleConfig';
import { Control } from './Control';
import { lottieFiles } from './Lottie';
import { Palette, defaultPalette } from './Palette';
import { Spacing } from './Spacing';
import { Spectrum } from './Spectrum/Spectrum';
import { Type } from './Type/Type';
import { TypeScript } from './Typescript';
import { buildTemplates, TemplateMap } from './utils/buildTemplates';

async function codegen() {
  const templates: TemplateMap = {
    'lottieStyles.ejs': [
      {
        dest: 'web/animation/lottieStyles.ts',
        data: defaultPalette,
      },
    ],
    'lottieSource.ejs': [
      {
        dest: 'lottie-files/LottieSource.ts',
        data: {},
      },
      {
        dest: 'common/types/LottieSource.ts',
        data: {},
      },
    ],
    'lottieFiles.ejs': lottieFiles,
    'fontFace.ejs': [
      {
        dest: 'fonts/fonts.css',
        data: Type.fontFaceCss,
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
            ...Control.scaleCss[scale],
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
      {
        dest: 'web/styles/borderRadius.ts',
        data: borderRadiusCss,
      },
      {
        dest: 'web/styles/borderWidth.ts',
        data: borderWidthCss,
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
            name: scale,
            typography: Type.mobile[scale],
            spacing: Spacing.mobile[scale],
            control: Control.mobile[scale],
          };
        }),
      },
      {
        dest: 'mobile/styles/fallbackShimmer.ts',
        data: { fallbackShimmer: Palette.fallbackShimmer },
        config: {
          disableAsConst: true,
        },
      },
      {
        dest: 'common/spectrum/spectrumRgbArray.ts',
        data: Spectrum.native,
      },
      {
        dest: 'common/tokens/border.ts',
        data: { borderRadius: borderRadiusConfig, borderWidth: borderWidthConfig },
      },
      {
        dest: 'web/tokens.ts',
        data: {
          spacing: Spacing.cssVariables,
          palette: Palette.cssVariables,
          control: Control.cssVariables,
          fontFamily: Type.fontFamilyCssVariables,
          mediaQueries: {
            supportsHover: '@media (any-hover: hover)',
          },
        },
      },
      {
        dest: 'mobile/tokens.ts',
        data: {
          fontFamily: Type.fontFamilyMobileTokens,
        },
      },
      {
        dest: 'common/palette/constants.ts',
        data: {
          defaultPalette: Palette.defaultPalette,
          switchPalette: Palette.switchPalette,
          frontierSpectrumPalette: Palette.frontierSpectrumPalette,
          paletteForegrounds: Palette.paletteForegrounds,
          paletteBackgrounds: Palette.paletteBackgrounds,
          paletteBorders: Palette.paletteBorders,
        },
      },
    ],
    'typescript.ejs': TypeScript,
  };

  // Palette.validate();

  await buildTemplates(templates);
}

void codegen();
