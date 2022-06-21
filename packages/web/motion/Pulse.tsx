import React, { memo } from 'react';
import { m as motion } from 'framer-motion';
import type { PulseBaseProps } from '@cbhq/cds-common';
import { pulseTransitionConfig, pulseVariantOpacity } from '@cbhq/cds-common/motion/hint';

import { useMotionProps } from './useMotionProps';

export type PulseProps = PulseBaseProps;

export const Pulse = memo(function Pulse({ children, variant = 'moderate' }: PulseProps) {
  const motionProps = useMotionProps({
    animate: {
      opacity: [1, pulseVariantOpacity[variant], 1],
    },
    transition: { ...pulseTransitionConfig, repeat: Infinity },
  });

  return <motion.div {...motionProps}>{children}</motion.div>;
});
