import { mapValues } from '@cbhq/cds-utils/object';

import {
  borderRadiusConfig,
  borderRadiusCss,
  borderWidthConfig,
  borderWidthCss,
} from './configs/borderConfig';
import { gridConfig } from './configs/gridConfig';
import { scaleConfig } from './configs/scaleConfig';
import { Spectrum } from './Spectrum/Spectrum';
import { Type } from './Type/Type';
import { buildTemplates, TemplateMap } from './utils/buildTemplates';
import { codegen } from './codegen';
import { Control } from './Control';
import { lottieFiles } from './Lottie';
import { defaultPalette, Palette } from './Palette';
import { Spacing } from './Spacing';
import { TypeScript } from './Typescript';

const web = {
  motion: {
    defaultPalette,
  },
  styles: {
    backgroundColor: Palette.cssBackgroundColor,
    borderColor: Palette.cssBorderColor,
    borderRadius: borderRadiusCss,
    borderWidth: borderWidthCss,
    foregroundColor: Palette.cssColor,
    grid: gridConfig.web,
    margin: Spacing.css('margin'),
    padding: Spacing.css('padding'),
    scale: mapValues(scaleConfig, (_, scale) => {
      return {
        ...Type.scaleCss[scale],
        ...Spacing.scaleCss[scale],
        ...Control.scaleCss[scale],
      };
    }),
    spectrum: Spectrum.web,
    typography: Type.css,
  },
  tokens: {
    spacing: Spacing.cssVariables,
    palette: Palette.cssVariables,
    control: Control.cssVariables,
    fontFamily: Type.fontFamilyCssVariables,
    mediaQueries: {
      supportsHover: '@media (any-hover: hover)',
    },
  },
};

async function main() {
  const templates: TemplateMap = {
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
        dest: 'mobile/tokens.ts',
        data: {
          fontFamily: Type.fontFamilyMobileTokens,
        },
      },
      {
        dest: 'common/palette/constants.ts',
        data: {
          ...Palette.palettes,
          paletteForegrounds: Palette.paletteForegrounds,
          paletteBackgrounds: Palette.paletteBackgrounds,
          paletteBorders: Palette.paletteBorders,
        },
      },
    ],
    'typescript.ejs': [...TypeScript, ...gridConfig.typescript],
  };

  // Palette.validate();

  await Promise.all([buildTemplates(templates), codegen('packages/web', web)]);
}

void main();
