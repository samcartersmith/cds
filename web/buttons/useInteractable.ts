import { useMemo, useState } from 'react';

import { BorderRadius, PaletteBackground, PaletteBorder, usePaletteConfig } from '@cbhq/cds-common';
import { opacityHovered, opacityPressed } from '@cbhq/cds-common/tokens/interactableOpacity';
import { extractHueStep } from '@cbhq/cds-common/utils/extractHueStep';
import { cx } from 'linaria';

import * as borderColors from '../styles/borderColor';
import * as borderRadii from '../styles/borderRadius';
import { focusVisible } from '../styles/focus';
import { OnHover, OnPress } from '../types';
import { interactable, disabledState, scaledDownState } from './interactableStyles';

export interface InteractableProps<T> {
  /** Callback fired when the element is being hovered. */
  onHover?: OnHover;
  /** Callback fired after the element is pressed.  */
  onPress?: OnPress<T>;
}

export interface UseInteractableOptions<T> extends InteractableProps<T> {
  /** Background color of the overlay (element being interacted with). */
  backgroundColor: PaletteBackground;
  /** Border color of the element being interacted with. */
  borderColor: PaletteBorder;
  /** Border radius of the element being interacted with. */
  borderRadius: BorderRadius;
  /** Is the element currently disabled. */
  isDisabled?: boolean;
  /** Scale down the element when being pressed. */
  scaleOnPress?: boolean;
}

export function useInteractable<T extends HTMLElement>({
  backgroundColor,
  borderColor,
  borderRadius,
  isDisabled,
  onHover,
  onPress,
  scaleOnPress,
}: UseInteractableOptions<T>): {
  className: string;
  isHovered: boolean;
  isPressed: boolean;
  props: React.HTMLAttributes<T>;
  style: React.CSSProperties;
} {
  const paletteConfig = usePaletteConfig();
  const spectrumAlias = paletteConfig[backgroundColor];
  const spectrumStep = useMemo(() => extractHueStep(spectrumAlias) ?? 60, [spectrumAlias]);
  const [isPressed, setPressed] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const buttonProps = useMemo(
    () => ({
      onClick(event: React.MouseEvent<T>) {
        onPress?.(event);
      },
      onMouseDown() {
        setPressed(true);
      },
      onMouseUp() {
        setPressed(false);
      },
    }),
    [onPress]
  );

  const hoverProps = useMemo(
    () => ({
      onMouseEnter() {
        setHovered(true);
        onHover?.(true);
      },
      onMouseLeave() {
        setHovered(false);
        onHover?.(false);
      },
    }),
    [onHover]
  );

  const props = useMemo(
    () => ({
      ...buttonProps,
      ...hoverProps,
    }),
    [buttonProps, hoverProps]
  );

  const backgroundOpacity = useMemo(() => {
    if (isPressed) {
      return opacityPressed[spectrumStep];
    }
    if (isHovered) {
      return opacityHovered[spectrumStep];
    }
    return 1;
  }, [isHovered, isPressed, spectrumStep]);

  const underlayColor = spectrumStep > 60 ? 'background' : 'foreground';

  return {
    className: cx(
      borderColors[borderColor],
      borderRadii[borderRadius],
      interactable,
      focusVisible,
      isPressed && scaleOnPress && scaledDownState,
      isDisabled && disabledState
    ),
    isHovered,
    isPressed,
    props,
    style: {
      '--interactable-opacity': backgroundOpacity,
      '--interactable-underlay': `var(--${underlayColor})` as const,
      '--interactable-background': isDisabled
        ? `var(--${backgroundColor})`
        : `rgba(var(--${spectrumAlias}), ${backgroundOpacity})`,
    },
  };
}
