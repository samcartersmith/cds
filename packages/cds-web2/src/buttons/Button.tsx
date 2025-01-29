import React, { forwardRef, memo, useMemo } from 'react';
import { type LinariaClassName, css, cx } from '@linaria/core';
import { IconName } from '@cbhq/cds-common2/types/IconName';

import { Icon } from '../icons/Icon';
import { type BoxProps, Box } from '../layout/Box';
import { Spinner } from '../loaders/Spinner';
import { Text } from '../text/Text';

export const spinnerHeight = 2.5;

export type ButtonBaseProps = {
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the background and border as transparent until interacted with. */
  transparent?: boolean;
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: 'primary' | 'secondary' | 'positive' | 'negative';
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Children to render within the button. */
  children: NonNullable<React.ReactNode>;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /**
   * Set the end node
   */
  end?: React.ReactNode;
  /** Icon to render at the end of the button. */
  endIcon?: IconName;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /**
   * Set the start node
   */
  start?: React.ReactNode;
  /** Icon to render at the start of the button. */
  startIcon?: IconName;
  /** Don't scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   * @default 1
   */
  numberOfLines?: number;
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
};

export type ButtonProps = ButtonBaseProps & BoxProps<'button'>;

const baseStyle = css`
  min-height: 56px;
  min-width: 100px;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
  color: var(--color-textForegroundInverse);
  border-color: transparent;
  border-radius: 56px;
  text-decoration: none;
  display: inline-flex;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin: 0;
  position: relative;
  white-space: nowrap;
  appearance: none;
  outline: 0;
  overflow: visible;
  text-transform: none;
  cursor: pointer;
  user-select: none;

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

const variantStyles: {
  [key in NonNullable<ButtonBaseProps['variant']>]: LinariaClassName;
} = {
  primary: css`
    background-color: var(--color-backgroundPrimary);

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
      opacity: 1;
    }
  `,
  secondary: css`
    background-color: var(--color-backgroundSecondary);
    color: var(--color-textForeground);

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
      opacity: 1;
    }
  `,
  positive: css`
    background-color: var(--color-backgroundPositive);

    &:hover {
      background-color: var(--color-backgroundPositiveHover);
      opacity: 0.92;
    }

    &:active {
      background-color: var(--color-backgroundPositivePressed);
      opacity: 0.86;
    }

    &:disabled {
      background-color: var(--color-backgroundPositiveDisabled);
      opacity: 1;
    }
  `,
  negative: css`
    background-color: var(--color-backgroundNegative);

    &:hover {
      background-color: var(--color-backgroundNegativeHover);
      opacity: 0.92;
    }

    &:active {
      background-color: var(--color-backgroundNegativePressed);
      opacity: 0.86;
    }

    &:disabled {
      background-color: var(--color-backgroundNegativeDisabled);
      opacity: 1;
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
  [key in NonNullable<ButtonBaseProps['variant']>]: LinariaClassName;
} = {
  primary: css`
    color: var(--color-textPrimary);
  `,
  secondary: css`
    color: var(--color-textForeground);
  `,
  positive: css`
    color: var(--color-textPositive);
  `,
  negative: css`
    color: var(--color-textNegative);
  `,
};

const blockStyle = css`
  display: flex;
  width: 100%;
  max-width: 100%;
  white-space: normal;
`;
const compactStyle = css`
  min-width: auto;
  padding-left: var(--space-2);
  padding-right: var(--space-2);
  min-height: 40px;
  border-radius: 40px;
`;
const spinnerContainerStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const startNodeStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: flex-start;
  margin-right: var(--space-1);
`;
const endNodeStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: flex-end;
  margin-left: var(--space-1);
`;
const iconStyle = css`
  justify-content: space-between;
`;
const unsetNoWrapStyle = css`
  white-space: unset;
`;
const hiddenStyle = css`
  visibility: hidden;
`;
const middleNodeStyle = css`
  position: relative;
`;
const pressScaleStyle = css`
  /* Prevents layout shift - https://web.dev/cls/#animations-and-transitions */
  transform: scale(1);

  &:active {
    transform: scale(0.98);
  }
`;

const loadingBaseStyle = css`
  cursor: default;
  pointer-events: none;
  touch-action: none;
`;
const loadingVariantStyle: {
  [key in NonNullable<ButtonBaseProps['variant']>]: LinariaClassName;
} = {
  primary: css`
    background-color: var(--color-backgroundPrimaryPressed);
  `,
  secondary: css`
    background-color: var(--color-backgroundSecondaryPressed);
  `,
  positive: css`
    background-color: var(--color-backgroundPositivePressed);
  `,
  negative: css`
    background-color: var(--color-backgroundNegativePressed);
  `,
};

const flushSpaceStyle = css`
  min-width: unset;
  padding-left: var(--space-2);
  padding-right: var(--space-2);
`;
const flushStartStyle = css`
  margin-left: calc(var(--space-2) * -1);

  &:dir(rtl) {
    margin-right: calc(var(--space-2) * -1);
  }
`;
const flushEndStyle = css`
  margin-right: calc(var(--space-2) * -1);

  &:dir(rtl) {
    margin-left: calc(var(--space-2) * -1);
  }
`;

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
export const Button = memo(
  forwardRef(function Button(
    {
      variant = 'primary',
      transparent,
      disabled,
      block,
      compact,
      children,
      numberOfLines,
      startIcon,
      endIcon,
      start,
      end,
      loading,
      accessibilityLabel,
      testID,
      noScaleOnPress,
      flush,
      type = 'button',
      ...props
    }: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) {
    const hasIcon = Boolean(startIcon ?? endIcon);
    const iconSize = compact ? 's' : 'm';
    const color = 'currentColor';

    const spinnerStyle = useMemo(() => {
      return {
        width: '24px',
        height: '24px',
        border: '2px solid',
        borderTopColor: 'var(--color-transparent)',
        borderRightColor: 'var(--color-transparent)',
        borderLeftColor: 'var(--color-transparent)',
      };
    }, []);

    return (
      <Box
        ref={ref}
        aria-busy={loading}
        aria-label={accessibilityLabel ?? (loading ? 'Loading' : undefined)}
        as="button"
        className={cx(
          baseStyle,
          focusRingStyle,
          variantStyles[variant],
          !noScaleOnPress && pressScaleStyle,
          transparent && transparentBaseStyle,
          transparent && transparentVariantStyle[variant],
          compact && compactStyle,
          flush && flushSpaceStyle,
          flush === 'start' && flushStartStyle,
          flush === 'end' && flushEndStyle,
          numberOfLines && unsetNoWrapStyle,
          hasIcon && iconStyle,
          block && blockStyle,
          loading && loadingBaseStyle,
          loading && loadingVariantStyle[variant],
        )}
        data-testid={testID}
        disabled={disabled}
        type={type}
        {...props}
      >
        {start ? (
          <span className={startNodeStyle}>{start}</span>
        ) : startIcon ? (
          <span className={startNodeStyle}>
            <Icon color={color} name={startIcon} size={iconSize} />
          </span>
        ) : null}

        <span className={middleNodeStyle}>
          {loading && (
            <span className={spinnerContainerStyle}>
              <Spinner color={color} size={spinnerHeight} style={spinnerStyle} />
            </span>
          )}
          <Text color={color} font="headline" numberOfLines={numberOfLines}>
            <span className={cx(loading && hiddenStyle)}>{children}</span>
          </Text>
        </span>

        {end ? (
          <span className={endNodeStyle}>{end}</span>
        ) : endIcon ? (
          <span className={endNodeStyle}>
            <Icon color={color} name={endIcon} size={iconSize} />
          </span>
        ) : null}
      </Box>
    );
  }),
);
