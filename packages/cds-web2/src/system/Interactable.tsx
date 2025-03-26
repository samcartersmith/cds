import React, { forwardRef, useMemo } from 'react';
import { css, cx } from '@linaria/core';
import { getBlendedColor } from '@cbhq/cds-common2/color/getBlendedColor';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import {
  accessibleOpacityDisabled,
  opacityDisabled,
  opacityHovered,
  opacityPressed,
} from '@cbhq/cds-common2/tokens/interactable';

import { Polymorphic } from '../core/polymorphism';
import { Theme } from '../core/theme';
import { useTheme } from '../hooks/useTheme';
import { Box, type BoxBaseProps } from '../layout/Box';

import {
  interactableBackground,
  interactableDisabledBackground,
  interactableHoveredBackground,
  interactableHoveredOpacity,
  interactablePressedBackground,
  interactablePressedOpacity,
} from './interactableCSSProperties';

const focusRingStyle = css`
  position: relative;
  /* if we use the focus ring we need to turn off the browser stylesheet outline */
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-offset: 2px;
    outline-color: var(--color-bgPrimary);
  }
`;

const baseStyle = css`
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  background-color: var(${interactableBackground});

  /* Removes weird bonus padding in Firefox */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }

  &:hover {
    background-color: var(${interactableHoveredBackground});
    > * {
      opacity: var(${interactableHoveredOpacity});
    }
  }

  &:active,
  &[aria-pressed='true'] {
    background-color: var(${interactablePressedBackground});
    > * {
      opacity: var(${interactablePressedOpacity});
    }
  }

  &:disabled,
  &[aria-disabled='true'] {
    opacity: ${accessibleOpacityDisabled};
    cursor: default;
    pointer-events: none;
    touch-action: none;
    background-color: var(${interactableDisabledBackground});
  }
`;

const blockStyle = css`
  display: block;
  width: 100%;
`;

const transparentActiveStyle = css`
  &:active {
    background-color: var(--color-transparent);
  }
`;

const transparentWhileInactiveStyle = css`
  background-color: transparent;
  &:disabled {
    background-color: transparent;
  }
`;

export const interactableDefaultElement = 'button';

export type InteractableDefaultElement = typeof interactableDefaultElement;

export type InteractableBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Apply class names to the outer container. */
    className?: string;
    focusable?: boolean;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Is the element currently disabled. */
    disabled?: boolean;
    /**
     * Is the element currenty loading.
     * When set to true, will disable element from press and keyboard events
     */
    loading?: boolean;
    /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
    pressed?: boolean;
    /**
     * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhileInactive?: boolean;
    /**
     * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhilePressed?: boolean;
    blendStyles?: {
      background?: string;
      pressedBackground?: string;
      disabledBackground?: string;
      hoveredBackground?: string;
    };
  }
>;

export type InteractableProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  InteractableBaseProps
>;

type InteractableComponent = (<AsComponent extends React.ElementType = InteractableDefaultElement>(
  props: InteractableProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const getInteractableStyles = ({
  theme,
  background = 'transparent',
  blendStyles,
}: { theme: Theme } & Pick<InteractableBaseProps, 'background' | 'blendStyles'>) => {
  const backgroundColor = blendStyles?.background ?? theme.color[background];

  return {
    [interactableBackground]: blendStyles?.background ?? `var(--color-${background})`,
    /**
     * Apply an interactive background style. Blend the color with the background or backgroundInverse values
     */
    // Hover:
    [interactableHoveredBackground]: getBlendedColor({
      color: blendStyles?.hoveredBackground ?? backgroundColor,
      opacity: opacityHovered,
      colorScheme: theme.colorScheme,
    }),
    [interactableHoveredOpacity]: opacityHovered,
    // Pressed:
    [interactablePressedBackground]: getBlendedColor({
      color: blendStyles?.pressedBackground ?? backgroundColor,
      opacity: opacityPressed,
      colorScheme: theme.colorScheme,
    }),
    [interactablePressedOpacity]: opacityPressed,
    // Disabled:
    [interactableDisabledBackground]: getBlendedColor({
      color: blendStyles?.disabledBackground ?? backgroundColor,
      opacity: opacityDisabled,
      colorScheme: theme.colorScheme,
      isDisabled: true,
    }),
  };
};

export const Interactable: InteractableComponent = forwardRef<
  React.ReactElement<InteractableBaseProps>,
  InteractableBaseProps
>(
  <AsComponent extends React.ElementType>(
    {
      as,
      background = 'transparent',
      block,
      borderColor = 'transparent',
      borderWidth = 100,
      className,
      disabled,
      loading,
      pressed,
      style,
      blendStyles,
      transparentWhileInactive,
      transparentWhilePressed,
      ...props
    }: Polymorphic.Props<AsComponent, InteractableBaseProps>,
    ref: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? interactableDefaultElement) satisfies React.ElementType;
    const theme = useTheme();

    const interactableStyle = useMemo(
      () => ({
        ...getInteractableStyles({ theme, background, blendStyles }),
        ...style,
      }),
      [style, background, theme, blendStyles],
    );

    return (
      <Box
        ref={ref}
        aria-busy={loading}
        aria-disabled={loading || disabled || undefined}
        aria-pressed={pressed}
        as={Component}
        borderColor={transparentWhileInactive ? 'transparent' : borderColor}
        borderWidth={borderWidth}
        className={cx(
          baseStyle,
          focusRingStyle,
          block && blockStyle,
          transparentWhileInactive && transparentWhileInactiveStyle,
          transparentWhilePressed && transparentActiveStyle,
          className,
        )}
        disabled={disabled}
        style={interactableStyle}
        {...props}
      />
    );
  },
);
