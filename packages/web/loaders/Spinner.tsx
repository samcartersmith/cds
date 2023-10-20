import React, { memo, useMemo } from 'react';
import { SharedProps } from '@cbhq/cds-common';
import { PaletteForeground } from '@cbhq/cds-common/types/Palette';

import { usePalette } from '../hooks/usePalette';
import { cx } from '../utils/linaria';

import * as styles from './styles';

export type SpinnerProps = {
  /**
   * The pixel size of the spinner. Restricting spinner
   * to have a n:n aspect ratio (square basically)
   */
  size: number;
  /**
   * Color of spinner.
   * @default foregroundMuted
   */
  color?: PaletteForeground;
} & SharedProps;

export const Spinner = memo(function Spinner({
  size,
  color = 'foregroundMuted',
  testID,
}: SpinnerProps) {
  const palette = usePalette();

  const spinnerStyle = useMemo(
    () => ({
      fontSize: `${size}px`,
      borderTopColor: palette.backgroundAlternate,
      borderRightColor: palette.backgroundAlternate,
      borderBottomColor: palette[color],
      borderLeftColor: palette.backgroundAlternate,
    }),
    [palette, size, color],
  );

  return (
    <div
      aria-busy
      aria-live="polite"
      className={cx(styles.spinner.base, styles.spinnerAnimation)}
      data-testid={testID}
      role="status"
      style={spinnerStyle}
    />
  );
});

Spinner.displayName = 'Spinner';
