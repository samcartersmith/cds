import React, { memo, useMemo } from 'react';

import { SharedProps } from '@cbhq/cds-common';
import { PaletteForeground } from '@cbhq/cds-common/types/Palette';

import { usePalette } from '../hooks/usePalette';
import * as styles from './styles';

export type MaterialSpinnerProp = {
  /** Size of the spinner */
  size: number;
  /** Color of the spinner */
  color: PaletteForeground;
} & SharedProps;

export const MaterialSpinner = memo(({ size, color, testID }: MaterialSpinnerProp) => {
  const palette = usePalette();
  const svgContainerStyle = useMemo(
    () => ({
      stroke: palette[color],
    }),
    [palette, color],
  );

  return (
    <svg
      className={styles.materialSpinner.spinner}
      style={svgContainerStyle}
      role="status"
      aria-busy
      aria-live="polite"
      xmlns="http://www.w3.org/2000/svg"
      data-testid={testID}
      viewBox="0 0 66 66"
      height={`${size}px`}
    >
      <circle
        className={styles.materialSpinner.circle}
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  );
});

MaterialSpinner.displayName = 'MaterialSpinner';
