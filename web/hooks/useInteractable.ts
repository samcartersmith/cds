import { useMemo } from 'react';

import {
  PaletteBackground,
  PaletteValue,
  SpectrumHueStep,
  usePaletteConfig,
} from '@cbhq/cds-common';
import { AriaButtonProps } from '@react-types/button';
import { cx } from 'linaria';
import { useButton, useHover } from 'react-aria';

import {
  interactable,
  pressedState,
  hoveredState,
  disabledState,
  scaledDownState,
} from '../styles/interactable';
import { opacityHovered, opacityPressed } from '../tokens';
import { OnHover, OnPress } from '../types';

function extractOpacityFromSpectrum(
  value: Readonly<PaletteValue>,
  alphas: Record<SpectrumHueStep, number>
): number {
  const [alias] = typeof value === 'string' ? [value] : value;
  const [, , step] = alias.match(/([a-z]+)(\d+)/) || [];
  const num = Number(step) as SpectrumHueStep;

  return alphas[num] || alphas[60];
}

export interface InteractableProps<T> {
  /** Callback fired when the element is being hovered. */
  onHover?: OnHover;
  /** Callback fired after the element is pressed.  */
  onPress?: OnPress<T>;
}

export interface UseInteractableOptions<T> extends InteractableProps<T> {
  /** Background color of the overlay (element being interacted with). */
  backgroundColor: PaletteBackground;
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

export function useInteractable<T>({
  backgroundColor,
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
  const paletteConfig = usePaletteConfig();
  const spectrumAlias = paletteConfig[backgroundColor];

  const { buttonProps, isPressed } = useButton(
    {
      ...restProps,
      elementType,
      isDisabled,
      onPress,
      type: buttonType,
    } as AriaButtonProps,
    // @ts-expect-error Allow null type
    ref
  );

  const { hoverProps, isHovered } = useHover({ isDisabled, onHoverChange: onHover });

  const props = useMemo(
    () => ({
      ...buttonProps,
      ...hoverProps,
    }),
    [buttonProps, hoverProps]
  );

  const { opacityStyle, stateClass } = useMemo(() => {
    let opacity = 1;
    let stateClass = '';

    if (isDisabled) {
      stateClass = disabledState;
    } else if (isPressed) {
      opacity = extractOpacityFromSpectrum(spectrumAlias, opacityPressed);
      stateClass = pressedState;
    } else if (isHovered) {
      opacity = extractOpacityFromSpectrum(spectrumAlias, opacityHovered);
      stateClass = hoveredState;
    }

    return { opacityStyle: { '--interactable-opacity': opacity }, stateClass };
  }, [isDisabled, isHovered, isPressed, spectrumAlias]);

  return {
    className: cx(interactable, stateClass, isPressed && scaleOnPress && scaledDownState),
    isHovered,
    isPressed,
    props,
    style: opacityStyle,
  };
}
