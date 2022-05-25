import React, { memo } from 'react';
import { m as motion, MotionConfig } from 'framer-motion';
import { animateRotateConfig } from '@cbhq/cds-common/motion/animatedCaret';
import type { AnimatedCaretBaseProps } from '@cbhq/cds-common/types/AnimatedCaretBaseProp';

import { Icon } from '../icons';
import { IconProps } from '../icons/IconProps';
import { HStack } from '../layout';

import { useMotionProps } from './useMotionProps';

export type AnimatedCaretProps = AnimatedCaretBaseProps & Partial<Omit<IconProps, 'name'>>;

export const AnimatedCaret = memo(function AnimatedCaret({
  rotate,
  size = 's',
  color = 'foregroundMuted',
  testID,
  ...rest
}: AnimatedCaretProps) {
  const motionProps = useMotionProps({
    enterConfigs: [{ ...animateRotateConfig, toValue: rotate }],
    initial: false,
  });

  return (
    // HStack to limit rotate boundary
    <HStack>
      <MotionConfig reducedMotion="user">
        <motion.div {...motionProps} data-testid={`${testID}-motion`}>
          <Icon name="caretUp" size={size} color={color} {...rest} />
        </motion.div>
      </MotionConfig>
    </HStack>
  );
});
