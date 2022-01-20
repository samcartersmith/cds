import { InteractableTokensConfig, PaletteConfig, PaletteValue, Spectrum } from '../types';
import { blendColors } from '../color/blendColors';
import { opacityDisabled, opacityPressed } from '../tokens/interactable';
import { paletteValueToRgbaArray } from './paletteValueToRgbaArray';
import { paletteValueToHueStep } from './paletteValueToHueStep';
import { paletteValueToTupleWithCacheName } from './paletteValueToTupleWithCacheName';
import { paletteValueTupleToRgbaArray } from './paletteValueTupleToRgbaArray';

const cache: Record<string, InteractableTokensConfig> = {};

const transparentTokens = {
  disabled: { contentOpacity: 0.38, backgroundColor: 'transparent' },
  pressed: { contentOpacity: 0.82, backgroundColor: 'transparent' },
};

export function paletteValueToInteractableToken(
  { background, foreground }: PaletteConfig,
  value: PaletteValue,
  spectrum: Spectrum,
  hasFrontier?: boolean,
): InteractableTokensConfig {
  const [[overlayAlias, overlayOpacity], overlayCacheName] = paletteValueToTupleWithCacheName(
    value,
    spectrum,
    hasFrontier,
  );
  if (overlayOpacity === 0) {
    return transparentTokens;
  }

  const [backgroundTuple, backgroundCacheName] = paletteValueToTupleWithCacheName(
    background,
    spectrum,
    hasFrontier,
  );

  const [foregroundTuple, foregroundCacheName] = paletteValueToTupleWithCacheName(
    foreground,
    spectrum,
    hasFrontier,
  );

  const cacheName = `${overlayCacheName}-${backgroundCacheName}-${foregroundCacheName}`;
  if (cacheName in cache) {
    return cache[cacheName];
  }

  const hueStep = paletteValueToHueStep(value);
  const underlayAlias = hueStep > 60 ? 'background' : 'foreground';
  const backgroundRgbaArray = paletteValueTupleToRgbaArray(backgroundTuple, spectrum, hasFrontier);
  const foregroundRgbaArray =
    underlayAlias === 'background'
      ? backgroundRgbaArray
      : paletteValueTupleToRgbaArray(foregroundTuple, spectrum, hasFrontier);

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

  const tokens = {
    disabled: {
      contentOpacity: opacity.disabled,
      backgroundColor: blendColors(backgroundRgbaArray, overlayColors.disabled),
    },
    pressed: {
      contentOpacity: opacity.pressed,
      backgroundColor: blendColors(underlayColors.pressed, overlayColors.pressed),
    },
  };
  cache[cacheName] = tokens;
  return tokens;
}
