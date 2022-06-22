import React, { memo } from 'react';
import { m as motion } from 'framer-motion';
import type { ColorSurgeBaseProps } from '@cbhq/cds-common';
import { colorSurgeEnterConfig, colorSurgeExitConfig } from '@cbhq/cds-common/motion/hint';

import { Box } from '../layout';

import { useMotionProps } from './useMotionProps';

export type ColorSurgeTypes = ColorSurgeBaseProps;

const MotionBox = motion(Box);

export const ColorSurge = memo(function ColorSurge({ background = 'primary' }: ColorSurgeTypes) {
  const motionProps = useMotionProps({
    enterConfigs: [colorSurgeEnterConfig],
    exitConfigs: [colorSurgeExitConfig],
  });

  return (
    <MotionBox
      variants={motionProps.variants}
      animate="exit"
      initial="enter"
      background={background}
      pin="all"
    />
  );
});
