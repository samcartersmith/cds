import React, { memo } from 'react';
import { m as motion } from 'framer-motion';
import { SharedProps } from '@cbhq/cds-common';
import { PaletteForeground } from '@cbhq/cds-common/types/Palette';

import { usePalette } from '../hooks/usePalette';
import { useMotionProps } from '../motion/useMotionProps';

import * as styles from './styles';

export type MaterialSpinnerProp = {
  /** Size of the spinner */
  size: number;
  /** Color of the spinner */
  color: PaletteForeground;
} & SharedProps;

export const MaterialSpinner = memo(({ size, color, testID }: MaterialSpinnerProp) => {
  const palette = usePalette();

  const svgMotionProps = useMotionProps({
    animate: {
      rotate: [0, 360],
    },
    transition: { easing: 'linear', duration: 'slow4', repeat: Infinity },
  });

  const circleMotionProps = useMotionProps({
    initial: { strokeDashoffset: 0 },
    animate: {
      rotate: [0, 135, 360],
      strokeDashoffset: [180, 45, 180],
    },
    transition: {
      easing: 'global',
      duration: 'slow4',
      repeat: Infinity,
      times: [0, 0.5, 1],
    },
  });

  return (
    <motion.svg
      data-testid={testID}
      height={`${size}px`}
      stroke={palette[color]}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
      {...svgMotionProps}
    >
      <motion.circle
        cx="33"
        cy="33"
        fill="none"
        r="30"
        strokeLinecap="round"
        strokeWidth="6"
        {...circleMotionProps}
        className={styles.materialSpinner.circle}
      />
    </motion.svg>
  );
});

MaterialSpinner.displayName = 'MaterialSpinner';
