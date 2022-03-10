import { useMemo } from 'react';

import { paletteValueToHueStep } from '../palette/paletteValueToHueStep';
import { usePaletteConfig } from '../palette/usePaletteConfig';
import { opacityDisabled, opacityHovered, opacityPressed } from '../tokens/interactable';
import { PaletteAlias } from '../types';

// TODO: Deprecate this in favor of paletteConfigToInteractableTokens which
// is used at the theme level.
export const useInteractableTokens = (
  overlayColor?: PaletteAlias,
): {
  disabledOpacity: number;
  underlayColor: PaletteAlias;
  pressedOpacity: typeof opacityPressed[keyof typeof opacityPressed];
  hoverOpacity: typeof opacityHovered[keyof typeof opacityPressed];
} => {
  const palette = usePaletteConfig();
  const overlayColorAlias = overlayColor ? palette[overlayColor] : '';
  const hueStep = useMemo(
    () => (overlayColorAlias ? paletteValueToHueStep(overlayColorAlias) : 60),
    [overlayColorAlias],
  );

  return {
    disabledOpacity: opacityDisabled,
    underlayColor: hueStep > 60 ? 'background' : 'foreground',
    pressedOpacity: opacityPressed[hueStep],
    hoverOpacity: opacityHovered[hueStep],
  };
};
