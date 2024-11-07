import { mapValues } from '@cbhq/cds-utils/object';

import { avatarSizes } from './configs/avatarConfig';
import { borderRadius } from './configs/borderRadius';
import { borderWidth } from './configs/borderWidth';
import { responsiveClassName } from './configs/constants';
import { displayConfig } from './configs/displayConfig';
import { flexConfig } from './configs/flexConfig';
import { gapConfig } from './configs/gapConfig';
import { gridConfig } from './configs/gridConfig';
import { responsiveConfig } from './configs/responsiveConfig';
import { scaleConfig } from './configs/scaleConfig';
import { visibilityConfig } from './configs/visibilityConfig';
import { Spectrum } from './Spectrum/Spectrum';
import { Type } from './Type/Type';
import { buildTemplates, TemplateMap } from './utils/buildTemplates';
import { codegen } from './codegen';
import { Control } from './Control';
import { lottieFiles } from './Lottie';
import { defaultPalette, Palette } from './Palette';
import { Spacing } from './Spacing';
import { TypeScript } from './Typescript';

/** Add any configs that do not have platform specific transformations here */
const configs = {
  borderRadius,
  borderWidth,
  defaultPalette,
};

const common = {
  configs,
};

const web = {
  configs: {
    ...configs,
    palette: Palette.setCssVariables,
    font: Type.fontFaceCss,
  },
  styles: {
    backgroundColor: Palette.cssBackgroundColor,
    borderColor: Palette.cssBorderColor,
    foregroundColor: Palette.cssColor,
    grid: gridConfig.web,
    margin: Spacing.css('margin'),
    padding: Spacing.css('padding'),
    responsiveSpacing: responsiveConfig.spacingStyles,
    responsiveConfig: responsiveConfig.styles,
    responsiveClassName,
    visibility: visibilityConfig.web,
    display: displayConfig.web,
    scale: mapValues(scaleConfig, (_, scale) => {
      return {
        ...Type.scaleCss[scale],
        ...Spacing.scaleCss[scale],
        ...Control.scaleCss[scale],
      };
    }),
    spectrum: Spectrum.web,
    typography: Type.css,
    gap: gapConfig.web,
    flex: flexConfig.web,
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
        dest: 'packages/lottie-files/src/LottieSource.ts',
        data: {},
      },
      {
        dest: 'packages/common/src/types/LottieSource.ts',
        data: {},
      },
    ],
    'lottieFiles.ejs': lottieFiles,
    'fontFace.ejs': [
      {
        dest: 'packages/fonts/src/fonts.css',
        data: Type.fontFaceCss,
      },
    ],
    'objectMap.ejs': [
      {
        dest: 'packages/mobile/src/styles/scale.ts',
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
        dest: 'packages/mobile/src/styles/fallbackShimmer.ts',
        data: { fallbackShimmer: Palette.fallbackShimmer },
        config: {
          disableAsConst: true,
        },
      },
      {
        dest: 'packages/common/src/spectrum/spectrumRgbArray.ts',
        data: Spectrum.native,
      },
      {
        dest: 'packages/mobile/src/tokens.ts',
        data: {
          fontFamily: Type.fontFamilyMobileTokens,
        },
      },
      {
        dest: 'packages/common/src/palette/constants.ts',
        data: {
          ...Palette.palettes,
          paletteForegrounds: Palette.paletteForegrounds,
          paletteBackgrounds: Palette.paletteBackgrounds,
          paletteBorders: Palette.paletteBorders,
        },
      },
      {
        dest: 'packages/common/src/internal/data/avatars.ts',
        data: {
          avatarSizes,
          avatars: [
            'https://images.unsplash.com/profile-1611475141936-383e23c6cc6dimage?dpr=2&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff',
            'https://images.unsplash.com/profile-1628142977790-d9f66dcbc498image?dpr=2&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff',
          ],
        },
      },
      {
        dest: 'packages/web/src/layout/breakpoints.ts',
        data: {
          deviceBreakpoints: responsiveConfig.deviceBreakpoints,
          deviceMqs: responsiveConfig.deviceMqs,
          deviceMqRanges: responsiveConfig.deviceMqRanges,
        },
      },
    ],
    'typescript.ejs': [
      ...TypeScript,
      ...gridConfig.typescript,
      ...responsiveConfig.typescript,
      ...displayConfig.typescript,
      ...visibilityConfig.typescript,
    ],
  };

  // Palette.validate();

  await Promise.all([
    buildTemplates(templates),
    codegen('packages/common', common),
    codegen('libs/docusaurus-theme', web),
    codegen('packages/web', web),
  ]);
}

void main();
