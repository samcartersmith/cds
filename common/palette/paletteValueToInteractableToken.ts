import memoize from 'lodash/memoize';
import { PaletteValue, Spectrum } from '../types';
import { blendColors } from '../color/blendColors';
import { opacityDisabled, opacityPressed } from '../tokens/interactable';
import { paletteValueToHueStep } from './paletteValueToHueStep';
import { paletteValueToTuple } from './paletteValueToTuple';
import { paletteValueToRgbaArray } from './paletteValueToRgbaArray';
import { paletteValueToCacheName } from './paletteValueToCacheName';

const transparentTokens = {
  disabled: { contentOpacity: 0.38, backgroundColor: 'transparent' },
  pressed: { contentOpacity: 0.82, backgroundColor: 'transparent' },
};

export const paletteValueToInteractableToken = memoize(
  (
    { background, foreground }: { background: PaletteValue; foreground: PaletteValue },
    paletteValue: PaletteValue,
    spectrum: Spectrum,
    hasFrontier?: boolean,
  ) => {
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
  ({ background, foreground }, paletteValue, spectrum, hasFrontier) => {
    const [backgroundAlias, backgroundOpacity] = paletteValueToTuple(background);
    const [foregroundAlias, foregroundOpacity] = paletteValueToTuple(foreground);
    return `${paletteValueToCacheName(
      paletteValue,
      spectrum,
      hasFrontier,
    )}-background-${backgroundAlias}-${backgroundOpacity}-foreground-${foregroundAlias}-${foregroundOpacity}`;
  },
);
