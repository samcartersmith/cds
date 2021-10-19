/* eslint-disable @typescript-eslint/no-use-before-define */
import { useMemo } from 'react';

import { blendColors } from '@cbhq/cds-common/color/blendColors';
import { paletteValueToHueStep } from '@cbhq/cds-common/palette/paletteValueToHueStep';
import { paletteValueToTuple } from '@cbhq/cds-common/palette/paletteValueToTuple';
import { usePaletteConfig } from '@cbhq/cds-common/palette/usePaletteConfig';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';
import { opacityDisabled, opacityPressed } from '@cbhq/cds-common/tokens/interactable';
import { PaletteAlias, PaletteValue, SpectrumAlias, SpectrumHueStep } from '@cbhq/cds-common/types';

import { usePalette } from './usePalette';
import { paletteValueToRgbaArray } from '../utils/palette';

export type InteractableState = 'pressed' | 'disabled';
export type OverlayOpacities = Record<InteractableState, number>;
export type UseInteractableTokensParams = {
  overlayColor?: PaletteAlias;
  pressed?: boolean;
  disabled?: boolean;
};

const fallbackPaletteValue: PaletteValue = ['gray100', 0];

export const useInteractableTokens = ({ overlayColor, ...states }: UseInteractableTokensParams) => {
  const palette = usePalette();
  const originalOverlayColor = overlayColor ? palette[overlayColor] : 'transparent';
  const overlayPaletteValue = useOverlayPaletteValue(overlayColor); // guarantees tuple is returned. [blue60, 1]
  const [overlaySpectrumAlias] = overlayPaletteValue; // blue60 from [blue60, 1]
  const overlayHueStep = useOverlayHueStep(overlayPaletteValue); // 60 from blue 60
  const overlayOpacities = useOverlayOpacities(overlayHueStep); // object map of pressed and disabled opacities. These vary based on hue step.
  const interactableState = useInteractableState(states); // enum string - 'pressed', 'disabled' or undefined
  const contentOpacity = useContentOpacity(overlayOpacities, interactableState); // Opacity for children of Interactable component. Usually match overlay opacity, except if disabled.
  const blendedColors = useBlendedColors(overlayOpacities, overlayHueStep, overlaySpectrumAlias); // object map of pressed and disabled background colors
  const backgroundColor = useMemo(() => {
    if (originalOverlayColor === 'transparent') {
      return 'transparent';
    }
    return interactableState ? blendedColors[interactableState] : originalOverlayColor;
  }, [blendedColors, interactableState, originalOverlayColor]);

  return useMemo(() => {
    return {
      contentOpacity,
      backgroundColor,
    };
  }, [backgroundColor, contentOpacity]);
};

const useOverlayPaletteValue = (overlayColor: PaletteAlias | undefined) => {
  const paletteConfig = usePaletteConfig();
  return useMemo(() => {
    const value = overlayColor ? paletteConfig[overlayColor] : fallbackPaletteValue;
    return paletteValueToTuple(value);
  }, [overlayColor, paletteConfig]);
};

const useOverlayHueStep = (paletteValue: PaletteValue) => {
  return useMemo(() => paletteValueToHueStep(paletteValue), [paletteValue]);
};

const useInteractableState = ({ disabled, pressed }: UseInteractableTokensParams) => {
  return useMemo(() => {
    if (disabled) return 'disabled';
    if (pressed) return 'pressed';
    return undefined;
  }, [disabled, pressed]);
};

const useOverlayOpacities = (hueStep: SpectrumHueStep) => {
  return useMemo(
    () => ({
      disabled: opacityDisabled,
      pressed: opacityPressed[hueStep],
    }),
    [hueStep],
  );
};

const useContentOpacity = (
  overlayOpacities: OverlayOpacities,
  interactableState?: InteractableState,
) => {
  return useMemo(() => {
    if (!interactableState) return 1;
    if (interactableState === 'disabled') return opacityDisabled;
    return overlayOpacities[interactableState];
  }, [overlayOpacities, interactableState]);
};

const useBlendedColors = (
  overlayOpacities: OverlayOpacities,
  overlayHueStep: SpectrumHueStep,
  overlaySpectrumAlias: SpectrumAlias,
) => {
  const overlayColors = useOverlayColors(overlayOpacities, overlaySpectrumAlias);
  const underlayColors = useUnderlayColors(overlayHueStep > 60 ? 'background' : 'foreground');
  return useMemo(() => {
    return {
      disabled: blendColors(underlayColors.disabled, overlayColors.disabled),
      pressed: blendColors(underlayColors.pressed, overlayColors.pressed),
    };
  }, [overlayColors, underlayColors]);
};

const useOverlayColors = (
  overlayOpacities: OverlayOpacities,
  overlaySpectrumAlias: SpectrumAlias,
) => {
  const spectrum = useSpectrum();
  return useMemo(() => {
    const { disabled, pressed } = overlayOpacities;
    return {
      disabled: paletteValueToRgbaArray([overlaySpectrumAlias, disabled], spectrum),
      pressed: paletteValueToRgbaArray([overlaySpectrumAlias, pressed], spectrum),
    };
  }, [overlayOpacities, overlaySpectrumAlias, spectrum]);
};

const useUnderlayColors = (underlayPaletteAlias: PaletteAlias) => {
  const spectrum = useSpectrum();
  const { background, foreground } = usePaletteConfig();
  return useMemo(() => {
    const backgroundRgbaArray = paletteValueToRgbaArray(background, spectrum);
    const pressedColor =
      underlayPaletteAlias === 'background'
        ? backgroundRgbaArray
        : paletteValueToRgbaArray(foreground, spectrum);
    return {
      disabled: backgroundRgbaArray,
      pressed: pressedColor,
    };
  }, [background, foreground, spectrum, underlayPaletteAlias]);
};
