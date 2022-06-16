import React, { memo } from 'react';
import { m as motion } from 'framer-motion';
import { shakeTransitionConfig, shakeTranslateX } from '@cbhq/cds-common/motion/hint';

import { useMotionProps } from './useMotionProps';

export const Shake = memo(function Shake({ children }) {
  const motionProps = useMotionProps({
    animate: {
      x: shakeTranslateX,
    },
    transition: shakeTransitionConfig,
  });

  return <motion.div {...motionProps}>{children}</motion.div>;
});
