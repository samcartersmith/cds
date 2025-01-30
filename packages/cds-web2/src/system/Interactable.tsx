import React, { createElement, forwardRef, useMemo } from 'react';
import { type LinariaClassName, css, cx } from '@linaria/core';
import { accessibleOpacityDisabled } from '@cbhq/cds-common2/tokens/interactable';
import { highHueBackgrounds } from '@cbhq/cds-common2/tokens/interactable';
import { InteractableBaseProps } from '@cbhq/cds-common2/types/InteractableBaseProps';
import { SharedAccessibilityProps } from '@cbhq/cds-common2/types/SharedAccessibilityProps';
import type { SharedProps } from '@cbhq/cds-common2/types/SharedProps';

import {
  background as backgroundStyles,
  borderColor as borderColorStyles,
  borderWidth as borderWidthStyles,
} from '../styles/styles';
import { elevation as elevationStyle } from '../styles/styles';

import { interactableBackground } from './interactableCSSProperties';

const focusRingStyle = css`
  position: relative;
  /* if we use the focus ring we need to turn off the browser stylesheet outline */
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: var(--borderWidth-200);
    outline-color: var(--color-backgroundPrimary);
    outline-offset: 2px;
  }
`;

const disabledStyle = css`
  opacity: ${accessibleOpacityDisabled};
  cursor: default;
  pointer-events: none;
  touch-action: none;
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

  /* Removes weird bonus padding in Firefox */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }
`;

const backgroundInteractiveStyle: Record<string, LinariaClassName> = {
  transparent: css`
    &:hover {
      background-color: var(--color-transparentHover);
    }
    &:active {
      background-color: var(--color-transparentPressed);
    }
    &:disabled {
      background-color: var(--color-transparentDisabled);
    }
  `,
  backgroundPrimary: css`
    &:hover {
      background-color: var(--color-backgroundPrimaryHover);
    }
    &:active {
      background-color: var(--color-backgroundPrimaryPressed);
    }
    &:disabled {
      background-color: var(--color-backgroundPrimaryDisabled);
    }
  `,
  backgroundSecondary: css`
    &:hover {
      background-color: var(--color-backgroundSecondaryHover);
    }
    &:active {
      background-color: var(--color-backgroundSecondaryPressed);
    }
    &:disabled {
      background-color: var(--color-backgroundSecondaryDisabled);
    }
  `,
  backgroundNegative: css`
    &:hover {
      background-color: var(--color-backgroundNegativeHover);
    }
    &:active {
      background-color: var(--color-backgroundNegativePressed);
    }
    &:disabled {
      background-color: var(--color-backgroundNegativeDisabled);
    }
  `,
  backgroundPositive: css`
    &:hover {
      background-color: var(--color-backgroundPositiveHover);
    }
    &:active {
      background-color: var(--color-backgroundPositivePressed);
    }
    &:disabled {
      background-color: var(--color-backgroundPositiveDisabled);
    }
  `,
  mixBackground: css`
    &:hover {
      opacity: 0.8;
    }
    @supports (background-color: color-mix(in srgb, red 50%, blue 50%)) {
      &:hover {
        opacity: 1;
        background-color: color-mix(
          in srgb,
          var(${interactableBackground}) 85%,
          var(--color-background) 15%
        );
      }
      &:active {
        background-color: color-mix(
          in srgb,
          var(${interactableBackground}) 78%,
          var(--color-background) 22%
        );
      }
    }
  `,
  mixBackgroundInverse: css`
    &:hover {
      opacity: 0.8;
    }
    @supports (background-color: color-mix(in srgb, red 50%, blue 50%)) {
      &:hover {
        background-color: color-mix(
          in srgb,
          var(${interactableBackground}) 94%,
          var(--color-backgroundInverse) 6%
        );
      }
      &:active {
        background-color: color-mix(
          in srgb,
          var(${interactableBackground}) 92%,
          var(--color-backgroundInverse) 8%
        );
      }
    }
  `,
};

const blockStyle = css`
  display: block;
  width: 100%;
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
    width,
    height,
    accessibilityLabel,
    accessibilityLabelledBy,
    accessibilityHint,
    ...props
  }: InteractableProps,
  ref: React.Ref<Element>,
) {
  /**
   * this variable should only be used when conditionally rendering the disabled DOM attribute
   */
  const shouldBeDisabled = loading || disabled;

  const className = cx(
    baseStyle,
    // TODO - why is there logic for this? Both these classNames can be merged to the root style
    disabled ? disabledStyle : focusRingStyle,
    // TODO this is a specific case for Safari, maybe remove as it sounds like its been fixed
    disabled && borderColor === 'transparent' ? disabledBorderStyle : null,
    // use transparent override prop to set styles for border and background
    // TODO - how do these only impact the inactive styles?
    transparentWhileInactive ? borderColorStyles.transparent : borderColorStyles[borderColor],
    transparentWhileInactive ? backgroundStyles.transparent : backgroundStyles[background],
    // TODO - this is basically the default border width
    borderColor && typeof borderWidth === 'undefined' && borderWidthStyles[100],
    borderWidth && borderWidthStyles[borderWidth],
    // TODO - could consider encouraging the use of style prop or className for setting display - the user agent styles for the element should be enough
    block && blockStyle,
    elevation && elevationStyle[elevation],
    /**
     * Apply an interactive background style.
     * Use the corresponding state color if available;
     * if not, blend the color with the background or backgroundInverse values
     */
    Object.hasOwn(backgroundInteractiveStyle, background)
      ? backgroundInteractiveStyle[background]
      : highHueBackgrounds.includes(background)
      ? backgroundInteractiveStyle.mixBackground
      : backgroundInteractiveStyle.mixBackgroundInverse,
    customClassName,
  );

  const style = useMemo(
    () => ({
      // TODO it doesn't look like --interactable-background is used at all in cds-web2
      [interactableBackground]: `var(--color-${background})`,
      borderRadius: `var(--borderRadius-${borderRadius})`,
      width,
      height,
      ...customStyle,
    }),
    [customStyle, height, width, background, borderRadius],
  );

  return createElement(
    Container,
    {
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
