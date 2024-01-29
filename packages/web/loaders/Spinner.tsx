import React, { memo, useMemo } from 'react';
import { SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common';
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
} & SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

export const Spinner = memo(function Spinner({
  size,
  color = 'foregroundMuted',
  testID,
  accessibilityLabel,
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
    <>
      <div
        aria-describedby="spinnerStatus"
        className={cx(styles.spinner.base, styles.spinnerAnimation)}
        data-testid={testID}
        role="status"
        style={spinnerStyle}
      />
      <div aria-live="polite" className={styles.spinnerStatus} id="spinnerStatus">
        {accessibilityLabel}
      </div>
    </>
  );
});

Spinner.displayName = 'Spinner';
