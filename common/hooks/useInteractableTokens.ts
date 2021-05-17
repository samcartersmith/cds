import { useMemo } from 'react';

import { usePaletteConfig } from '../palette/usePaletteConfig';
import { opacityDisabled, opacityHovered, opacityPressed } from '../tokens/interactable';
import { PaletteAlias, PaletteBackground } from '../types';
import { extractHueStep } from '../utils/color';

export const useInteractableTokens = (
  overlayColor?: PaletteBackground | 'transparent'
): {
  disabledOpacity: number;
  underlayColor: PaletteAlias;
  pressedOpacity: typeof opacityPressed[keyof typeof opacityPressed];
  hoverOpacity: typeof opacityHovered[keyof typeof opacityPressed];
} => {
  const palette = usePaletteConfig();
  const overlayColorAlias =
    overlayColor && overlayColor !== 'transparent' ? palette[overlayColor] : '';
  const hueStep = useMemo(() => (overlayColorAlias ? extractHueStep(overlayColorAlias) : 60), [
    overlayColorAlias,
  ]);

  return {
    disabledOpacity: opacityDisabled,
    underlayColor: hueStep > 60 ? 'background' : 'foreground',
    pressedOpacity: opacityPressed[hueStep],
    hoverOpacity: opacityHovered[hueStep],
  };
};
