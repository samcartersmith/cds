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
  interactableBorderColor,
  interactableDisabledBackground,
  interactableDisabledBorderColor,
  interactableHoveredBackground,
  interactableHoveredBorderColor,
  interactableHoveredOpacity,
  interactablePressedBackground,
  interactablePressedBorderColor,
  interactablePressedOpacity,
} from './interactableCSSProperties';

const baseStyle = css`
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  background-color: var(${interactableBackground});
  border-color: var(${interactableBorderColor});

  /* Removes weird bonus padding in Firefox */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }

  &:hover {
    background-color: var(${interactableHoveredBackground});
    border-color: var(${interactableHoveredBorderColor});
    > * {
      opacity: var(${interactableHoveredOpacity});
    }
  }

  &:active {
    background-color: var(${interactablePressedBackground});
    border-color: var(${interactablePressedBorderColor});
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
    border-color: var(${interactableDisabledBorderColor});
  }

  /* Disable default focus ring before adding custom focus ring styles */
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

const blockStyle = css`
  display: block;
  width: 100%;
`;

const transparentActiveStyle = css`
  &:active {
    background-color: var(--color-transparent);
    border-color: var(--color-transparent);
  }
`;

const transparentWhileInactiveStyle = css`
  background-color: var(--color-transparent);
  border-color: var(--color-transparent);
  &:disabled,
  &[aria-disabled='true'] {
    background-color: var(--color-transparent);
    border-color: var(--color-transparent);
  }
`;

export const interactableDefaultElement = 'button';

export type InteractableDefaultElement = typeof interactableDefaultElement;

export type InteractableBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Apply class names to the outer container. */
    className?: string;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Border color of the element. */
    borderColor?: ThemeVars.Color;
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
    /** TO DO: Document blendStyles */
    blendStyles?: {
      background?: string;
      pressedBackground?: string;
      disabledBackground?: string;
      hoveredBackground?: string;
      borderColor?: string;
      pressedBorderColor?: string;
      disabledBorderColor?: string;
      hoveredBorderColor?: string;
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
  borderColor = background,
  blendStyles,
}: { theme: Theme } & Pick<
  InteractableBaseProps,
  'background' | 'blendStyles' | 'borderColor'
>) => {
  const backgroundColor = blendStyles?.background ?? theme.color[background];
  const borderColorValue = blendStyles?.borderColor ?? theme.color[borderColor];

  return {
    [interactableBackground]: blendStyles?.background ?? `var(--color-${background})`,
    [interactableBorderColor]: blendStyles?.borderColor ?? `var(--color-${borderColor})`,
    /**
     * Apply an interactive background style. Blend the color with the background or backgroundInverse values
     */
    // Hover:
    [interactableHoveredBackground]: getBlendedColor({
      color: blendStyles?.hoveredBackground ?? backgroundColor,
      opacity: opacityHovered,
      colorScheme: theme.activeColorScheme,
    }),
    [interactableHoveredBorderColor]: getBlendedColor({
      color: blendStyles?.hoveredBorderColor ?? borderColorValue,
      opacity: opacityHovered,
      colorScheme: theme.activeColorScheme,
    }),
    [interactableHoveredOpacity]: opacityHovered,
    // Pressed:
    [interactablePressedBackground]: getBlendedColor({
      color: blendStyles?.pressedBackground ?? backgroundColor,
      opacity: opacityPressed,
      colorScheme: theme.activeColorScheme,
    }),
    [interactablePressedBorderColor]: getBlendedColor({
      color: blendStyles?.pressedBorderColor ?? borderColorValue,
      opacity: opacityPressed,
      colorScheme: theme.activeColorScheme,
    }),
    [interactablePressedOpacity]: opacityPressed,
    // Disabled:
    [interactableDisabledBackground]: getBlendedColor({
      color: blendStyles?.disabledBackground ?? backgroundColor,
      opacity: opacityDisabled,
      colorScheme: theme.activeColorScheme,
      isDisabled: true,
    }),
    [interactableDisabledBorderColor]: getBlendedColor({
      color: blendStyles?.disabledBorderColor ?? borderColorValue,
      opacity: opacityDisabled,
      colorScheme: theme.activeColorScheme,
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
      borderColor = background,
      borderWidth = 100,
      block,
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
        ...getInteractableStyles({
          theme,
          background,
          blendStyles,
          borderColor,
        }),
        ...style,
      }),
      [style, background, theme, blendStyles, borderColor],
    );

    return (
      <Box
        ref={ref}
        aria-busy={loading}
        aria-disabled={loading || disabled || undefined}
        aria-pressed={pressed}
        as={Component}
        borderWidth={borderWidth}
        className={cx(
          baseStyle,
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
