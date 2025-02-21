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
import { useTheme } from '../hooks/useTheme';
import { type BoxBaseProps, Box } from '../layout/Box';

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

  &:active {
    background-color: var(${interactablePressedBackground});
    > * {
      opacity: var(${interactablePressedOpacity});
    }
  }

  &:disabled,
  &[data-disabled='true'] {
    opacity: ${accessibleOpacityDisabled};
    cursor: default;
    pointer-events: none;
    touch-action: none;
    background-color: var(${interactableDisabledBackground});
  }

  &[data-block='true'] {
    display: block;
    width: 100%;
  }
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

export type InteractableBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    as: React.ElementType;
    children: NonNullable<React.ReactNode>;
    /** Apply class names to the outer container. */
    className?: string;
    focusable?: boolean;
    /** Background color of the overlay (element being interacted with). */
    background: ThemeVars.Color;
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

export type InteractableProps<AsComponent extends React.ElementType> =
  Polymorphic.InheritableElementProps<
    AsComponent,
    InteractableBaseProps & { as: AsComponent } & { ref?: Polymorphic.Ref<AsComponent> }
  >;

type InteractableComponent = (<AsComponent extends React.ElementType>(
  props: InteractableProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Interactable: InteractableComponent = forwardRef<
  React.ReactElement<InteractableBaseProps>,
  InteractableBaseProps
>(
  <AsComponent extends React.ElementType>(
    {
      as,
      background,
      block,
      borderColor = 'transparent',
      borderWidth = 100,
      className,
      disabled,
      loading,
      pressed,
      style: customStyle,
      blendStyles,
      transparentWhileInactive,
      transparentWhilePressed,
      ...props
    }: InteractableProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const theme = useTheme();

    /**
     * this variable should only be used when conditionally rendering the disabled DOM attribute
     */
    const shouldBeDisabled = loading || disabled;

    const style = useMemo(() => {
      const backgroundRgb = theme.color[background];

      return {
        [interactableBackground]: `var(--color-${background})`,
        /**
         * Apply an interactive background style. Blend the color with the background or backgroundInverse values
         */
        // Hover:
        [interactableHoveredBackground]: getBlendedColor({
          color: blendStyles?.hoveredBackground ?? backgroundRgb,
          opacity: opacityHovered[100],
          colorScheme: theme.colorScheme,
        }),
        [interactableHoveredOpacity]: opacityHovered[100],
        // Pressed:
        [interactablePressedBackground]: getBlendedColor({
          color: blendStyles?.pressedBackground ?? backgroundRgb,
          opacity: opacityPressed[100],
          colorScheme: theme.colorScheme,
        }),
        [interactablePressedOpacity]: opacityPressed[100],
        // Disabled:
        [interactableDisabledBackground]: getBlendedColor({
          color: blendStyles?.disabledBackground ?? backgroundRgb,
          opacity: opacityDisabled,
          colorScheme: theme.colorScheme,
          isDisabled: true,
        }),
        ...customStyle,
      };
    }, [customStyle, background, theme, blendStyles]);

    return (
      <Box
        ref={ref}
        aria-busy={loading}
        aria-pressed={pressed}
        as={as satisfies React.ElementType}
        background={background}
        borderColor={transparentWhileInactive ? 'transparent' : borderColor}
        borderWidth={borderWidth}
        className={cx(
          baseStyle,
          focusRingStyle,
          transparentWhileInactive && transparentWhileInactiveStyle,
          transparentWhilePressed && transparentActiveStyle,
          className,
        )}
        data-block={block || undefined}
        data-disabled={shouldBeDisabled || undefined}
        disabled={disabled}
        style={style}
        {...props}
      />
    );
  },
);
