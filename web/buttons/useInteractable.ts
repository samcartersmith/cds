import { useMemo } from 'react';

import { BorderRadius, PaletteBackground, PaletteBorder, usePaletteConfig } from '@cbhq/cds-common';
import { opacityHovered, opacityPressed } from '@cbhq/cds-common/tokens/interactableOpacity';
import { extractHueStep } from '@cbhq/cds-common/utils/extractHueStep';
import { cx } from 'linaria';

import * as borderColors from '../styles/borderColor';
import * as borderRadii from '../styles/borderRadius';
import { focusVisible } from '../styles/focus';
import { OnPress } from '../types';
import { interactable, disabledState, scaledDownState } from './interactableStyles';

export interface InteractableProps<T> {
  /** Callback fired after the element is pressed.  */
  onPress?: OnPress<T>;
}

export interface UseInteractableOptions {
  /** Background color of the overlay (element being interacted with). */
  backgroundColor: PaletteBackground;
  /** Border color of the element being interacted with. */
  borderColor: PaletteBorder;
  /** Border radius of the element being interacted with. */
  borderRadius: BorderRadius;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /** Dont scale down the element when being pressed. */
  noScaleOnPress?: boolean;
}

export function useInteractable({
  backgroundColor,
  borderColor,
  borderRadius,
  disabled,
  noScaleOnPress,
}: UseInteractableOptions): {
  className: string;
  style: React.CSSProperties;
} {
  const paletteConfig = usePaletteConfig();
  const spectrumAlias = paletteConfig[backgroundColor];
  const spectrumStep = useMemo(() => extractHueStep(spectrumAlias) ?? 60, [spectrumAlias]);
  const underlayColor = spectrumStep > 60 ? 'background' : 'foreground';

  return {
    className: cx(
      borderColors[borderColor],
      borderRadii[borderRadius],
      interactable,
      focusVisible,
      !noScaleOnPress && scaledDownState,
      disabled && disabledState
    ),
    style: {
      '--interactable-opacity-hovered': opacityHovered[spectrumStep],
      '--interactable-opacity-pressed': opacityPressed[spectrumStep],
      '--interactable-overlay': `var(--${spectrumAlias})`,
      '--interactable-underlay': `var(--${underlayColor})` as const,
    },
  };
}
