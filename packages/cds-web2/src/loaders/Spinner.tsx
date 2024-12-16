import React, { memo, useMemo } from 'react';
import { css, cx } from '@linaria/core';

import { type BoxProps, Box } from '../layout/Box';

// import { SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common'

export type SpinnerBaseProps = {
  /**
   * The font size of the spinner in pixels - used to calculate the width, height, and borderWidth. Width and height are 10em while borderWidth is 1.1em.
   */
  size: number;
  /**
   * Accessibility label
   * TO DO: replace with shared a11y label
   */
  accessibilityLabel?: string;
  /**
   * TO DO: add testID from shared props instead of this one
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
};

export type SpinnerProps = SpinnerBaseProps & BoxProps<'div'>;

export const baseStyle = css`
  position: relative;
  border: 1.1em solid;
  border-radius: 50%;
  width: 10em;
  height: 10em;
  // TO DO: Dark Mode color tokens need to be updated
  border-top-color: var(--color-backgroundAlternate);
  border-right-color: var(--color-backgroundAlternate);
  border-left-color: var(--color-backgroundAlternate);
  animation: spin 1000ms linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const spinnerStatusStyle = css`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Spinner = memo(
  ({ color, size, style, className, accessibilityLabel, testID, ...props }: SpinnerProps) => {
    const spinnerStyle = useMemo(
      () => ({
        fontSize: `${size}px`,
        ...style,
      }),
      [size, style],
    );
    return (
      <Box
        aria-describedby="spinnerStatus"
        className={cx(baseStyle, className)}
        color={color}
        data-testid={testID}
        role="status"
        style={spinnerStyle}
        {...props}
      >
        <div aria-live="polite" className={spinnerStatusStyle} id="spinnerStatus">
          {accessibilityLabel}
        </div>
      </Box>
    );
  },
);

Spinner.displayName = 'Spinner';
