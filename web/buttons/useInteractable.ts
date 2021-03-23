import { useMemo, useRef } from 'react';

import { BorderRadius, PaletteBackground, PaletteBorder, usePaletteConfig } from '@cbhq/cds-common';
import { useMergeRefs } from '@cbhq/cds-common/hooks/useMergeRefs';
import { opacityHovered, opacityPressed } from '@cbhq/cds-common/tokens/interactableOpacity';
import { extractHueStep } from '@cbhq/cds-common/utils/extractHueStep';
import { AriaButtonProps } from '@react-types/button';
import { cx } from 'linaria';
import { useButton, useHover } from 'react-aria';

import { useFocusStyles } from '../hooks/useFocusStyles';
import * as borderColors from '../styles/borderColor';
import * as borderRadii from '../styles/borderRadius';
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
  /** When a `button`, the type of button. */
  buttonType?: string;
  /** Type of element being rendered. */
  elementType: 'a' | 'button';
  /** Is the element currently disabled. */
  isDisabled?: boolean;
  /** Reference to underlying element. */
  ref?: React.Ref<T>;
  /** Scale down the element when being pressed. */
  scaleOnPress?: boolean;
}

export function useInteractable<T extends HTMLElement>({
  backgroundColor,
  borderColor,
  borderRadius,
  buttonType,
  elementType,
  isDisabled,
  onHover,
  onPress,
  ref,
  scaleOnPress,
  ...restProps
}: UseInteractableOptions<T>): {
  className: string;
  isHovered: boolean;
  isPressed: boolean;
  props: React.HTMLAttributes<T>;
  style: React.CSSProperties;
} {
  const internalRef = useRef<T>();
  const mergedRef = useMergeRefs(internalRef, ref);
  const paletteConfig = usePaletteConfig();
  const spectrumAlias = paletteConfig[backgroundColor];
  const spectrumStep = useMemo(() => extractHueStep(spectrumAlias) ?? 60, [spectrumAlias]);
  const focusStyles = useFocusStyles();

  const { buttonProps, isPressed } = useButton(
    {
      ...restProps,
      elementType,
      isDisabled,
      onPress,
      type: buttonType,
    } as AriaButtonProps,
    // @ts-expect-error Allow null type
    mergedRef
  );

  const { hoverProps, isHovered } = useHover({ isDisabled, onHoverChange: onHover });

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
      focusStyles,
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
