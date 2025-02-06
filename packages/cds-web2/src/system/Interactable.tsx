import React, { createElement, forwardRef, useMemo } from 'react';
import { css, cx } from '@linaria/core';
import { getBlendedBackgroundColor } from '@cbhq/cds-common2/color/getBlendedBackgroundColor';
import { type ThemeVars } from '@cbhq/cds-common2/core/theme';
import {
  accessibleOpacityDisabled,
  opacityHovered,
  opacityPressed,
} from '@cbhq/cds-common2/tokens/interactable';
import { InteractableBaseProps } from '@cbhq/cds-common2/types/InteractableBaseProps';
import { SharedAccessibilityProps } from '@cbhq/cds-common2/types/SharedAccessibilityProps';
import type { SharedProps } from '@cbhq/cds-common2/types/SharedProps';

import { useTheme } from '../hooks/useTheme';
import {
  borderColor as borderColorStyles,
  borderWidth as borderWidthStyles,
} from '../styles/styles';
import { elevation as elevationStyle } from '../styles/styles';

import {
  interactableBackground,
  interactableBorderRadius,
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

const disabledStyle = css`
  opacity: ${accessibleOpacityDisabled};
  cursor: default;
  pointer-events: none;
  touch-action: none;
  background-color: var(${interactableDisabledBackground});
`;

const disabledBorderStyle = css`
  // safari specific fix to https://bugs.webkit.org/show_bug.cgi?id=238088
  border-color: rgba(0, 0, 0, 0.005);
`;

const baseStyle = css`
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  background-color: var(${interactableBackground});
  border-radius: var(${interactableBorderRadius});

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
`;

const transparentActiveStyle = css`
  &:active {
    background-color: var(--color-transparent);
  }
`;

const blockStyle = css`
  display: block;
  width: 100%;
`;

const transparentWhileInactiveStyle = css`
  background-color: transparent;
`;

export type InteractableInheritedProps = Omit<React.AllHTMLAttributes<Element>, 'as' | 'className'>;

export type InteractableProps = {
  children: NonNullable<React.ReactNode>;
  /** Element or component to render the container as. */
  as:
    | 'a'
    | 'button'
    | 'div'
    | 'input'
    | 'label'
    | 'select'
    | 'span'
    | 'textarea'
    | React.ComponentType<React.PropsWithChildren<any>>;
  /** Apply class names to the outer container. */
  className?: string;
  focusable?: boolean;
} & InteractableBaseProps &
  InteractableInheritedProps &
  SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  >;

export const InteractableContent = forwardRef(function InteractableContent(
  {
    as: Container,
    background,
    block,
    borderColor = 'transparent',
    borderRadius = 0,
    borderWidth,
    children,
    className: customClassName,
    disabled,
    elevation,
    // TODO - why do we need basically a second disabled prop?
    loading,
    pressed,
    style: customStyle,
    testID,
    transparentWhileInactive,
    transparentWhilePressed,
    width,
    height,
    accessibilityLabel,
    accessibilityLabelledBy,
    accessibilityHint,
    ...props
  }: InteractableProps,
  ref: React.Ref<Element>,
) {
  const theme = useTheme();
  /**
   * this variable should only be used when conditionally rendering the disabled DOM attribute
   */
  const shouldBeDisabled = loading || disabled;

  const className = cx(
    baseStyle,
    focusRingStyle,
    disabled && disabledStyle,
    // TODO this is a specific case for Safari, maybe remove as it sounds like its been fixed
    disabled && borderColor === 'transparent' ? disabledBorderStyle : null,
    // use transparent override prop to set styles for border and background
    transparentWhileInactive ? borderColorStyles.transparent : borderColorStyles[borderColor],
    transparentWhileInactive && transparentWhileInactiveStyle,
    transparentWhilePressed && transparentActiveStyle,
    // TODO - this is basically the default border width
    borderColor && typeof borderWidth === 'undefined' && borderWidthStyles[100],
    borderWidth && borderWidthStyles[borderWidth],
    // TODO - could consider encouraging the use of style prop or className for setting display - the user agent styles for the element should be enough
    block && blockStyle,
    elevation && elevationStyle[elevation],
    customClassName,
  );

  const style = useMemo(
    () => ({
      // TODO it doesn't look like --interactable-background is used at all in cds-web2
      [interactableBackground]: `var(--color-${background})`,
      /**
       * Apply an interactive background style.
       * Use the corresponding state color if available;
       * if not, blend the color with the background or bgInverse values
       */
      // Hover:
      // TO DO: use 0.88 for opacity until we can get the hue value of the background color in the theme
      [interactableHoveredBackground]:
        `${background}Hover` in theme.color
          ? theme.color[`${background}Hover` as ThemeVars.Color]
          : getBlendedBackgroundColor({
              background,
              themeColor: theme.color,
              opacity: opacityHovered[100],
              colorScheme: theme.colorScheme,
            }),
      [interactableHoveredOpacity]: opacityHovered[100],
      // Pressed:
      // TO DO: use 0.82 for opacity until we can get the hue value of the background color in the theme
      [interactablePressedBackground]:
        `${background}Pressed` in theme.color
          ? theme.color[`${background}Pressed` as ThemeVars.Color]
          : getBlendedBackgroundColor({
              background,
              themeColor: theme.color,
              opacity: opacityPressed[100],
              colorScheme: theme.colorScheme,
            }),
      [interactablePressedOpacity]: opacityPressed[100],
      // Disabled:
      [interactableDisabledBackground]:
        `${background}Disabled` in theme.color
          ? theme.color[`${background}Disabled` as ThemeVars.Color]
          : getBlendedBackgroundColor({
              background,
              themeColor: theme.color,
              opacity: accessibleOpacityDisabled,
              colorScheme: theme.colorScheme,
              isDisabled: true,
            }),
      [interactableBorderRadius]: `var(--borderRadius-${borderRadius})`,
      width,
      height,
      ...customStyle,
    }),
    [customStyle, height, width, background, borderRadius, theme],
  );

  return createElement(
    Container,
    {
      // TODO - if this isn't necessary on web we can cut the pressed prop from Interactable
      'aria-pressed': pressed,
      'data-testid': testID,
      'aria-label': accessibilityLabel,
      'aria-labelledby': accessibilityLabelledBy,
      'aria-describedby': accessibilityHint,
      ...props,
      className,
      disabled: shouldBeDisabled,
      style,
      ref,
    },
    children,
  );
});

export const Interactable = forwardRef<Element, InteractableProps>(function Interactable(
  { children, ...props },
  ref,
) {
  return (
    <InteractableContent ref={ref} {...props}>
      {children}
    </InteractableContent>
  );
});
