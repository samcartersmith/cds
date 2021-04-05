import React, { useMemo, memo } from 'react';

import { PaletteForeground } from '@cbhq/cds-common/types/Palette';

import { usePalette } from '../hooks/usePalette';
import * as styles from './styles';

export interface SpinnerProps {
  /**
   * The pixel size of the spinner. Restricting spinner
   * to have a n:n aspect ratio (square basically)
   */
  size: number;
  /**
   * Color of spinner
   */
  color: PaletteForeground;
  /**
   * Testing purposes.
   * @internal
   **/
  testID?: string;
}

export const Spinner = memo(function Spinner({ size, color, testID }: SpinnerProps) {
  const palette = usePalette();

  const spinnerStyle = useMemo(
    () => ({
      fontSize: `${size}px`,
      borderTopColor: palette.backgroundAlternate,
      borderRightColor: palette.backgroundAlternate,
      borderBottomColor: palette[color],
      borderLeftColor: palette.backgroundAlternate,
    }),
    [palette, size, color]
  );

  return (
    <div
      data-testid={testID}
      role="status"
      aria-busy={true}
      aria-live="polite"
      style={spinnerStyle}
      className={styles.spinner.base}
    ></div>
  );
});

Spinner.displayName = 'Spinner';
