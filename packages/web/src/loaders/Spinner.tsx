import React, { memo, useMemo } from 'react';
import { SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common';
import { PaletteForeground } from '@cbhq/cds-common/types/Palette';

import { usePalette } from '../hooks/usePalette';
import { cx } from '../utils/linaria';

import * as styles from './styles';

export type SpinnerProps = {
  /**
   * The font size of the spinner in pixels - used to calculate the width, height, and borderWidth. Width and height are 10em while borderWidth is 1.1em.
   */
  size: number;
  /**
   * Color of spinner.
   * @default foregroundMuted
   */
  color?: PaletteForeground;
  /**
   * Optional custom styles to apply to the spinner component.
   */
  style?: React.CSSProperties;
  /**
   * Optional CSS class to apply to the spinner component.
   */
  className?: string;
} & SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

export const Spinner = memo(function Spinner({
  size,
  color = 'foregroundMuted',
  testID,
  accessibilityLabel,
  style,
  className,
}: SpinnerProps) {
  const palette = usePalette();

  const spinnerStyle = useMemo(
    () => ({
      fontSize: `${size}px`,
      borderBottomColor: palette[color],
      ...style,
    }),
    [size, palette, color, style],
  );

  return (
    <>
      <div
        aria-describedby="spinnerStatus"
        className={cx(styles.spinner.base, styles.spinnerAnimation, className)}
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
