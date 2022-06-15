import React, { memo } from 'react';
import { m as motion } from 'framer-motion';
import type { ColorSurgeBaseProps } from '@cbhq/cds-common';
import { colorSurgeEnterConfig, colorSurgeExitConfig } from '@cbhq/cds-common/motion/hint';

import { Box } from '../layout';

import { useMotionProps } from './useMotionProps';

export type ColorSurgeTypes = ColorSurgeBaseProps;

const MotionBox = motion(Box);

/**
 * TODO: move the howto to doc site once component is public
 *
 * How to use: Place the component inside the container that you want to have color surge.
 * Check HintMotion.stories.tsx for example
 *
 * A few gotchas:
 * - Make sure the component is placed before other Interactables to avoid overlapping
 * - You may need to add overflow:hidden to the parent container if it has border radius
 * - You may need to add position:relative or position:absolute to the parent container
 */
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
