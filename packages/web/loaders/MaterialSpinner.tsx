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
    style: {
      /**
       * FM has a bug where SVG components forced to have a transform-origin
       * Need to setup transformOrigin explicitly to get around this
       * @link https://github.com/framer/motion/issues/255
       */
      originX: 'center',
      originY: 'center',
      stroke: palette[color],
    },
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
      xmlns="http://www.w3.org/2000/svg"
      data-testid={testID}
      viewBox="0 0 66 66"
      height={`${size}px`}
      {...svgMotionProps}
    >
      <motion.circle
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
        {...circleMotionProps}
        className={styles.materialSpinner.circle}
      />
    </motion.svg>
  );
});

MaterialSpinner.displayName = 'MaterialSpinner';
