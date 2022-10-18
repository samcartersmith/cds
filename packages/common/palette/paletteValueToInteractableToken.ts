import { blendColors } from '../color/blendColors';
import { accessibleOpacityDisabled, opacityHovered, opacityPressed } from '../tokens/interactable';
import { PaletteConfig, PaletteValue, Spectrum } from '../types';
import { memoize } from '../utils/memoize';

import { paletteValueToCacheName } from './paletteValueToCacheName';
import { paletteValueToHueStep } from './paletteValueToHueStep';
import { paletteValueToRgbaArray } from './paletteValueToRgbaArray';
import { paletteValueToTuple } from './paletteValueToTuple';

const mobileTransparentTokens = {
  disabled: { contentOpacity: accessibleOpacityDisabled, backgroundColor: 'transparent' },
  hovered: undefined,
  pressed: { contentOpacity: opacityPressed[100], backgroundColor: 'transparent' },
};

const webTransparentTokens = {
  ...mobileTransparentTokens,
  hovered: { contentOpacity: opacityHovered[100], backgroundColor: 'transparent' },
};

type PaletteValueToInteractableTokenParams = {
  paletteValue: PaletteValue;
  options: {
    paletteConfig: PaletteConfig;
    spectrum: Spectrum;
    hasFrontier?: boolean;
    isWeb?: boolean;
  };
};

function getCacheKey({
  paletteValue,
  options: { paletteConfig, spectrum, hasFrontier, isWeb },
}: PaletteValueToInteractableTokenParams) {
  const { background, foreground } = paletteConfig;
  const [backgroundAlias, backgroundOpacity] = paletteValueToTuple(background);
  const [foregroundAlias, foregroundOpacity] = paletteValueToTuple(foreground);
  return `${paletteValueToCacheName(
    paletteValue,
    spectrum,
    hasFrontier,
  )}-background-${backgroundAlias}-${backgroundOpacity}-foreground-${foregroundAlias}-${foregroundOpacity}-isWeb-${isWeb}`;
}

export const paletteValueToInteractableToken = memoize(
  ({
    paletteValue,
    options: { paletteConfig, spectrum, hasFrontier, isWeb },
  }: PaletteValueToInteractableTokenParams) => {
    const { background, foreground } = paletteConfig;
    const [overlayAlias, overlayOpacity] = paletteValueToTuple(paletteValue);

    // For interables with opacity zero we do not need to do any underlay/overlay blending.
    if (overlayOpacity === 0) {
      return isWeb ? webTransparentTokens : mobileTransparentTokens;
    }

    const hueStep = paletteValueToHueStep(paletteValue);
    const underlayAlias = hueStep > 60 ? 'background' : 'foreground';

    const backgroundRgbaArray = paletteValueToRgbaArray(background, spectrum, hasFrontier);
    const foregroundRgbaArray =
      underlayAlias === 'background'
        ? backgroundRgbaArray
        : paletteValueToRgbaArray(foreground, spectrum, hasFrontier);

    const opacity = {
      disabled: accessibleOpacityDisabled,
      pressed: opacityPressed[hueStep],
      hovered: opacityHovered[hueStep],
    };

    const overlay = {
      disabled: paletteValueToRgbaArray([overlayAlias, accessibleOpacityDisabled], spectrum),
      pressed: paletteValueToRgbaArray([overlayAlias, opacity.pressed], spectrum),
      hovered: paletteValueToRgbaArray([overlayAlias, opacity.hovered], spectrum),
    };

    const underlay = {
      disabled: backgroundRgbaArray,
      pressed: foregroundRgbaArray,
      hovered: foregroundRgbaArray,
    };

    return {
      disabled: {
        contentOpacity: opacity.disabled,
        backgroundColor: blendColors({
          underlayColor: underlay.disabled,
          overlayColor: overlay.disabled,
        }),
      },
      pressed: {
        contentOpacity: opacity.pressed,
        backgroundColor: blendColors({
          underlayColor: underlay.pressed,
          overlayColor: overlay.pressed,
        }),
      },
      hovered: isWeb
        ? {
            contentOpacity: opacity.hovered,
            backgroundColor: blendColors({
              underlayColor: underlay.hovered,
              overlayColor: overlay.hovered,
            }),
          }
        : undefined,
    };
  },
  getCacheKey,
);
