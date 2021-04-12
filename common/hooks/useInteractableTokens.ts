import { useMemo } from 'react';

import { emptyObject } from '@cbhq/cds-utils';

import { usePaletteConfig } from '../palette/usePaletteConfig';
import { opacityDisabled, opacityHovered, opacityPressed } from '../tokens/interactableOpacity';
import { PaletteAlias, PaletteBackground } from '../types';
import { extractHueStep } from '../utils/extractHueStep';

export const useInteractableTokens = (
  overlayColor?: PaletteBackground
):
  | {
      disabledOpacity: number;
      underlayColor: PaletteAlias;
      pressedOpacity: typeof opacityPressed[keyof typeof opacityPressed];
      hoverOpacity: typeof opacityHovered[keyof typeof opacityPressed];
    }
  | Record<string, never> => {
  const palette = usePaletteConfig();
  const overlayColorAlias = overlayColor ? palette[overlayColor] : '';
  const hueStep = useMemo(() => overlayColorAlias && extractHueStep(overlayColorAlias), [
    overlayColorAlias,
  ]);

  if (hueStep === '') return emptyObject;

  return {
    disabledOpacity: opacityDisabled,
    underlayColor: hueStep > 60 ? 'background' : 'foreground',
    pressedOpacity: opacityPressed[hueStep],
    hoverOpacity: opacityHovered[hueStep],
  };
};
