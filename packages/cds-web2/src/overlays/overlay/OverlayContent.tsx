import React, { forwardRef } from 'react';
import { m as motion } from 'framer-motion';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
} from '@cbhq/cds-common2/animation/overlay';
import type { SharedProps } from '@cbhq/cds-common2/types/SharedProps';

import { VStack, VStackProps } from '../../layout/VStack';
import { useMotionProps } from '../../motion/useMotionProps';

export type OverlayProps = {
  onPress?: React.MouseEventHandler;
  /** Animate overlay
   * @default false
   */
  animated?: boolean;
} & VStackProps<'div'> &
  SharedProps;

export const OverlayContent = forwardRef<HTMLDivElement, OverlayProps>(
  ({ onPress, animated = false, ...props }, forwardedRef) => {
    const motionProps = useMotionProps({
      enterConfigs: [animateInOpacityConfig],
      exitConfigs: [animateOutOpacityConfig],
      exit: 'exit',
    });

    const content = (
      <VStack
        background="bgOverlay"
        bottom={0}
        left={0}
        onClick={onPress}
        position="absolute"
        right={0}
        top={0}
        {...props}
        ref={forwardedRef}
      />
    );

    return animated ? (
      <motion.div {...motionProps} data-testid={`${props.testID}-motion`}>
        {content}
      </motion.div>
    ) : (
      content
    );
  },
);

OverlayContent.displayName = 'OverlayContent';
