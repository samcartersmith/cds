import React, { forwardRef, memo, useCallback, useRef, useState } from 'react';
import { type LinariaClassName, css, cx } from '@linaria/core';
import { IconName } from '@cbhq/cds-common2/types/IconName';

import type { Polymorphic } from '../core/polymorphism';
import { Icon } from '../icons/Icon';
import { type BoxBaseProps, Box } from '../layout/Box';
import { isNativeClick } from '../system/reakit-utils';

const iconButtonDefaultElement = 'button';

export type IconButtonDefaultElement = typeof iconButtonDefaultElement;

export type IconButtonVariant = 'primary' | 'secondary' | 'foregroundMuted';

export type IconButtonBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Reduce the inner padding within the button itself. */
    compact?: boolean;
    /** Name of the icon, as defined in Figma. */
    name: IconName;
    /**
     * Toggle design and visual variants.
     * @default primary
     */
    variant?: IconButtonVariant;
    /** Ensure the button aligns flush on the left or right.
     * This prop will translate the entire button left/right,
     * so take care to ensure it is not overflowing awkwardly
     */
    flush?: 'start' | 'end';
    /** Mark the button as loading and display a spinner. */
    loading?: boolean;
    /** Mark the button as disabled. */
    disabled?: boolean;
    /** Mark the background and border as transparent until interacted with. */
    transparent?: boolean;
    /**
     * On web, maps to `aria-label` and defines a string value that labels an interactive element.
     * On mobile, VoiceOver will read this string when a user selects the associated element.
     * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
     * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
     */
    accessibilityLabel?: string;
    /**
     * Used to locate this element in unit and end-to-end tests.
     * Under the hood, testID translates to data-testid on Web. On Mobile, testID
     * stays the same - testID
     */
    testID?: string;
  }
>;

export type IconButtonProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  IconButtonBaseProps
>;

type IconButtonComponent = (<AsComponent extends React.ElementType = IconButtonDefaultElement>(
  props: IconButtonProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

const baseStyle = css`
  min-height: 56px;
  width: 56px;
  border-radius: 56px;
  color: var(--color-textForeground);
  border-color: transparent;
  display: inline-flex;
  text-align: center;
  align-items: center;
  justify-content: center;
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

  &:disabled {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
    touch-action: none;
  }
`;
const compactStyle = css`
  min-height: 40px;
  width: 40px;
  border-radius: 40px;
`;
const variantStyles: {
  [key in NonNullable<IconButtonBaseProps['variant']>]: LinariaClassName;
} = {
  primary: css`
    background-color: var(--color-backgroundPrimary);
    color: var(--color-textForegroundInverse);
    &:hover {
      background-color: var(--color-backgroundPrimaryHover);
      opacity: 0.92;
    }

    &:active {
      background-color: var(--color-backgroundPrimaryPressed);
      opacity: 0.86;
    }

    &:disabled {
      background-color: var(--color-backgroundPrimaryDisabled);
      opacity: 0.5;
    }
  `,
  secondary: css`
    background-color: var(--color-backgroundSecondary);

    &:hover {
      background-color: var(--color-backgroundSecondaryHover);
      opacity: 0.92;
    }

    &:active {
      background-color: var(--color-backgroundSecondaryPressed);
      opacity: 0.86;
    }

    &:disabled {
      background-color: var(--color-backgroundSecondaryDisabled);
      opacity: 0.5;
    }
  `,
  foregroundMuted: css`
    background-color: var(--color-backgroundSecondary);
    color: var(--color-textForegroundMuted);

    &:hover {
      background-color: var(--color-backgroundSecondaryHover);
      opacity: 0.92;
    }

    &:active {
      background-color: var(--color-backgroundSecondaryPressed);
      opacity: 0.86;
    }

    &:disabled {
      background-color: var(--color-backgroundSecondaryDisabled);
      opacity: 0.5;
    }
  `,
};

const transparentBaseStyle = css`
  background-color: var(--color-transparent);

  &:hover {
    background-color: var(--color-transparentHover);
  }

  &:active {
    background-color: var(--color-transparentPressed);
  }

  &:disabled {
    background-color: var(--color-transparentDisabled);
  }
`;

const transparentVariantStyle: {
  [key in NonNullable<IconButtonBaseProps['variant']>]: LinariaClassName;
} = {
  primary: css`
    color: var(--color-textPrimary);
  `,
  secondary: css`
    color: var(--color-textForeground);
  `,
  foregroundMuted: css`
    color: var(--color-textForegroundMuted);
  `,
};

const loadingBaseStyle = css`
  cursor: default;
  pointer-events: none;
  touch-action: none;
`;

const loadingVariantStyle: {
  [key in NonNullable<IconButtonBaseProps['variant']>]: LinariaClassName;
} = {
  primary: css`
    background-color: var(--color-backgroundPrimaryPressed);
  `,
  secondary: css`
    background-color: var(--color-backgroundSecondaryPressed);
  `,
  foregroundMuted: css`
    background-color: var(--color-backgroundSecondaryPressed);
  `,
};

const focusRingStyle = css`
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

export const IconButton: IconButtonComponent = memo(
  forwardRef<React.ReactElement<IconButtonBaseProps>, IconButtonBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        testID,
        compact = true,
        name,
        disabled,
        transparent,
        variant = 'secondary',
        style,
        loading,
        onKeyDown,
        onKeyUp,
        flush,
        ...props
      }: IconButtonProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? iconButtonDefaultElement) satisfies React.ElementType;
      const iconSize = compact ? 's' : 'm';
      const color = 'currentColor';

      const [active, setActive] = useState(false);
      const isActiveRef = useRef(false);

      const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLElement>) => {
          onKeyDown?.(event);

          if (
            event.defaultPrevented ||
            disabled ||
            event.metaKey ||
            event.target !== event.currentTarget
          )
            return;

          const isEnter = event.key === 'Enter';
          const isSpace = event.key === ' ';

          if (isEnter || isSpace) {
            if (isNativeClick(event)) return;
            event.preventDefault();
            // Trigger click on Enter
            if (isEnter) event.currentTarget.click();
            // Set active state on Space down
            else if (isSpace && !isActiveRef.current) {
              isActiveRef.current = true;
              setActive(true);
            }
          }
        },
        [disabled, onKeyDown],
      );

      const handleKeyUp = useCallback(
        (event: React.KeyboardEvent<HTMLElement>) => {
          onKeyUp?.(event);

          if (event.defaultPrevented || disabled || event.metaKey) return;

          // Trigger click on Space up
          if (isActiveRef.current && event.key === ' ') {
            isActiveRef.current = false;
            setActive(false);
            event.currentTarget.click();
          }
        },
        [disabled, onKeyUp],
      );

      return (
        <Box
          ref={ref}
          as={Component}
          className={cx(
            baseStyle,
            focusRingStyle,
            variantStyles[variant],
            transparent && transparentBaseStyle,
            transparent && transparentVariantStyle[variant],
            compact && compactStyle,
            loading && loadingBaseStyle,
            loading && loadingVariantStyle[variant],
          )}
          data-active={active || undefined}
          data-testid={testID}
          disabled={disabled || loading}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          style={style}
          type="button"
          {...props}
        >
          <Icon color={color} name={name} size={iconSize} />
        </Box>
      );
    },
  ),
);

IconButton.displayName = 'IconButton';
