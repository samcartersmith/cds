import { entries } from '@cbhq/cds-utils';
import {
  InteractableTokensConfig,
  PaletteAlias,
  PartialPaletteConfig,
  PaletteValue,
  Spectrum,
} from '../types';
import { blendColors } from '../color/blendColors';
import { opacityDisabled, opacityPressed } from '../tokens/interactable';
import { paletteValueToRgbaArray } from './paletteValueToRgbaArray';
import { paletteValueToTuple } from './paletteValueToTuple';
import { paletteValueToHueStep } from './paletteValueToHueStep';

const foregroundFallback = 'gray100';
const backgroundFallback = 'gray0';

function paletteValueToInteractableToken(
  value: PaletteValue,
  spectrum: Spectrum,
  {
    background = backgroundFallback,
    foreground = foregroundFallback,
  }: { background?: PaletteValue; foreground?: PaletteValue } | undefined = {},
): InteractableTokensConfig {
  // TODO: remove when PR to add transparent has landed
  // if (value === 'transparent') {
  //   return paletteValueToInteractableToken(background ?? backgroundFallback, spectrum, {
  //     background,
  //     foreground,
  //   });
  // }
  const [overlayAlias] = paletteValueToTuple(value);
  const hueStep = paletteValueToHueStep(value);
  const underlayAlias = hueStep > 60 ? 'background' : 'foreground';
  const backgroundRgbaArray = paletteValueToRgbaArray(background, spectrum);
  const opacity = {
    disabled: opacityDisabled,
    pressed: opacityPressed[hueStep],
  };
  const overlayColors = {
    disabled: paletteValueToRgbaArray([overlayAlias, opacity.disabled], spectrum),
    pressed: paletteValueToRgbaArray([overlayAlias, opacity.pressed], spectrum),
  };

  const underlayColors = {
    disabled: backgroundRgbaArray,
    pressed:
      underlayAlias === 'background'
        ? backgroundRgbaArray
        : paletteValueToRgbaArray(foreground, spectrum),
  };

  return {
    disabled: {
      contentOpacity: opacity.disabled,
      backgroundColor: blendColors(underlayColors.disabled, overlayColors.disabled),
    },
    pressed: {
      contentOpacity: opacity.pressed,
      backgroundColor: blendColors(underlayColors.pressed, overlayColors.pressed),
    },
  };
}

export function paletteConfigToInteractableTokens(
  paletteConfig: PartialPaletteConfig,
  spectrum: Spectrum,
) {
  const config = {} as Record<PaletteAlias, InteractableTokensConfig>;
  for (const [key, value] of entries(paletteConfig)) {
    if (value) {
      config[key] = paletteValueToInteractableToken(value, spectrum, {
        background: paletteConfig.background,
        foreground: paletteConfig.foreground,
      });
    }
  }
  return config;
}
