import React, { forwardRef } from 'react';
import { m as motion } from 'framer-motion';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
} from '@cbhq/cds-common/animation/overlay';

import { BoxElement, VStack, VStackProps } from '../../layout';
import { useMotionProps } from '../../motion/useMotionProps';
import { useThemeProviderStyles } from '../../system/useThemeProviderStyles';

export type OverlayProps = {
  onPress?: React.MouseEventHandler;
  /** Animate overlay
   * @default false
   */
  animated?: boolean;
} & VStackProps<BoxElement>;

export const OverlayContent = forwardRef<HTMLElement, OverlayProps>(
  ({ onPress, animated = false, ...props }, forwardedRef) => {
    const { style } = useThemeProviderStyles();
    const motionProps = useMotionProps({
      style,
      enterConfigs: [animateInOpacityConfig],
      exitConfigs: [animateOutOpacityConfig],
      exit: 'exit',
    });

    const content = (
      <VStack
        pin="all"
        background="backgroundOverlay"
        onClick={onPress}
        {...props}
        ref={forwardedRef}
      />
    );

    // override background overlay color for dark mode
    return animated ? (
      <motion.div {...motionProps} data-testid={`${props.testID}-motion`}>
        {content}
      </motion.div>
    ) : (
      <div style={style}>{content}</div>
    );
  },
);
