import {
  BorderRadius,
  PaletteBackground,
  PaletteBorder,
  SpectrumAlias,
  usePaletteConfig,
} from '@cbhq/cds-common';
import { useInteractableTokens } from '@cbhq/cds-common/hooks/useInteractableTokens';
import { cx } from 'linaria';

import * as borderColors from '../styles/borderColor';
import * as borderRadii from '../styles/borderRadius';
import { focusVisible } from '../styles/focus';
import { palette } from '../tokens';
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
  const spectrumAlias = paletteConfig[backgroundColor] as SpectrumAlias;
  const { underlayColor, pressedOpacity, hoverOpacity } = useInteractableTokens(backgroundColor);

  return {
    className: cx(
      borderColors[borderColor],
      borderRadii[borderRadius],
      interactable,
      !disabled && focusVisible,
      !noScaleOnPress && scaledDownState,
      disabled && disabledState
    ),
    style: {
      '--interactable-opacity-hovered': hoverOpacity,
      '--interactable-opacity-pressed': pressedOpacity,
      '--interactable-overlay': `var(--${spectrumAlias})` as const,
      '--interactable-underlay': palette[underlayColor],
    },
  };
}
