import React, { memo, useMemo } from 'react';
import { m as motion } from 'framer-motion';
import { SharedProps } from '@cbhq/cds-common';
import { PaletteForeground } from '@cbhq/cds-common/types/Palette';

import { usePalette } from '../hooks/usePalette';
import { useMotionProps } from '../motion/useMotionProps';

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
  const motionProps = useMotionProps({
    animate: { rotate: [0, 360] },
    transition: { repeat: Infinity, easing: 'linear', duration: 'slow4' },
  });

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
    <motion.div
      data-testid={testID}
      role="status"
      aria-busy
      aria-live="polite"
      style={spinnerStyle}
      className={styles.spinner.base}
      {...motionProps}
    />
  );
});

Spinner.displayName = 'Spinner';
