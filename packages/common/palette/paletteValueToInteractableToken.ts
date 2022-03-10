import { blendColors } from '../color/blendColors';
import { opacityDisabled, opacityPressed } from '../tokens/interactable';
import { PaletteConfig, PaletteValue, Spectrum } from '../types';
import { memoize } from '../utils/memoize';

import { paletteValueToCacheName } from './paletteValueToCacheName';
import { paletteValueToHueStep } from './paletteValueToHueStep';
import { paletteValueToRgbaArray } from './paletteValueToRgbaArray';
import { paletteValueToTuple } from './paletteValueToTuple';

const transparentTokens = {
  disabled: { contentOpacity: 0.38, backgroundColor: 'transparent' },
  pressed: { contentOpacity: 0.82, backgroundColor: 'transparent' },
};

type PaletteValueToInteractableTokenParams = {
  paletteConfig: PaletteConfig;
  paletteValue: PaletteValue;
  spectrum: Spectrum;
  hasFrontier?: boolean;
};

function getCacheKey({
  paletteConfig,
  paletteValue,
  spectrum,
  hasFrontier,
}: PaletteValueToInteractableTokenParams) {
  const { background, foreground } = paletteConfig;
  const [backgroundAlias, backgroundOpacity] = paletteValueToTuple(background);
  const [foregroundAlias, foregroundOpacity] = paletteValueToTuple(foreground);
  return `${paletteValueToCacheName(
    paletteValue,
    spectrum,
    hasFrontier,
  )}-background-${backgroundAlias}-${backgroundOpacity}-foreground-${foregroundAlias}-${foregroundOpacity}`;
}

export const paletteValueToInteractableToken = memoize(
  ({
    paletteConfig,
    paletteValue,
    spectrum,
    hasFrontier,
  }: PaletteValueToInteractableTokenParams) => {
    const { background, foreground } = paletteConfig;
    const [overlayAlias, overlayOpacity] = paletteValueToTuple(paletteValue);
    if (overlayOpacity === 0) {
      return transparentTokens;
    }
    const hueStep = paletteValueToHueStep(paletteValue);
    const underlayAlias = hueStep > 60 ? 'background' : 'foreground';
    const backgroundRgbaArray = paletteValueToRgbaArray(background, spectrum, hasFrontier);
    const foregroundRgbaArray =
      underlayAlias === 'background'
        ? backgroundRgbaArray
        : paletteValueToRgbaArray(foreground, spectrum, hasFrontier);

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
      pressed: foregroundRgbaArray,
    };

    return {
      disabled: {
        contentOpacity: opacity.disabled,
        backgroundColor: blendColors(backgroundRgbaArray, overlayColors.disabled),
      },
      pressed: {
        contentOpacity: opacity.pressed,
        backgroundColor: blendColors(underlayColors.pressed, overlayColors.pressed),
      },
    };
  },
  getCacheKey,
);
