import { useMemo } from 'react';

import {
  BorderRadius,
  PaletteBackground,
  PaletteBorder,
  PaletteValue,
  SpectrumHueStep,
  usePaletteConfig,
} from '@cbhq/cds-common';
import { opacityHovered, opacityPressed } from '@cbhq/cds-common/tokens/interactableOpacity';
import { AriaButtonProps } from '@react-types/button';
import { cx } from 'linaria';
import { useButton, useHover } from 'react-aria';

import * as borderColors from '../styles/borderColor';
import * as borderRadii from '../styles/borderRadius';
import { OnHover, OnPress } from '../types';
import { interactable, disabledState, scaledDownState } from './interactableStyles';

function extractHueStep(
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

export function useInteractable<T>({
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

  const backgroundOpacity = useMemo(() => {
    if (isPressed) {
      return extractHueStep(spectrumAlias, opacityPressed);
    }
    if (isHovered) {
      return extractHueStep(spectrumAlias, opacityHovered);
    }
    return 1;
  }, [isHovered, isPressed, spectrumAlias]);

  const underlayColor = backgroundOpacity > 60 ? 'background' : 'foreground';

  return {
    className: cx(
      borderColors[borderColor],
      borderRadii[borderRadius],
      interactable,
      isPressed && scaleOnPress && scaledDownState,
      isDisabled && disabledState
    ),
    isHovered,
    isPressed,
    props,
    style: {
      '--interactable-underlay': `var(--${underlayColor})` as const,
      '--interactable-background': isDisabled
        ? `var(--${backgroundColor})`
        : `rgba(var(--${spectrumAlias}), ${backgroundOpacity})`,
    },
  };
}
