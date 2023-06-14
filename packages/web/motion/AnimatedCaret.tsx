import React, { memo } from 'react';
import { m as motion, MotionConfig } from 'framer-motion';
import { SpacingProps } from '@cbhq/cds-common';
import { animateRotateConfig } from '@cbhq/cds-common/motion/animatedCaret';
import type { AnimatedCaretBaseProps } from '@cbhq/cds-common/types/AnimatedCaretBaseProp';

import { useTextInputFocusVariantContent } from '../controls/context';
import { Icon, IconProps } from '../icons';
import { HStack } from '../layout';

import { useMotionProps } from './useMotionProps';

export type AnimatedCaretProps = AnimatedCaretBaseProps &
  Partial<Omit<IconProps, 'name'>> &
  SpacingProps;

export const AnimatedCaret = memo(function AnimatedCaret({
  rotate,
  size = 's',
  color = 'foregroundMuted',
  testID,
  spacing,
  spacingBottom,
  spacingEnd,
  spacingHorizontal,
  spacingStart,
  spacingTop,
  spacingVertical,
  ...rest
}: AnimatedCaretProps) {
  const motionProps = useMotionProps({
    enterConfigs: [{ ...animateRotateConfig, toValue: rotate }],
    initial: false,
  });
  const spacingProps = {
    spacing,
    spacingBottom,
    spacingEnd,
    spacingHorizontal,
    spacingStart,
    spacingTop,
    spacingVertical,
  };
  const variant = useTextInputFocusVariantContent() ?? color;

  return (
    // HStack to limit rotate boundary
    <HStack {...spacingProps}>
      <MotionConfig reducedMotion="user">
        <motion.div {...motionProps} data-testid={`${testID}-motion`}>
          <Icon name="caretUp" size={size} color={variant} {...rest} />
        </motion.div>
      </MotionConfig>
    </HStack>
  );
});
