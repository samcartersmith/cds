import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import { m as motion } from 'framer-motion';
import {
  animateInOpacityConfig,
  animateInYConfig,
  animateOutOpacityConfig,
  animateOutYConfig,
} from '@cbhq/cds-common/animation/tooltip';
import { maxWidth, spacingHorizontal, spacingVertical } from '@cbhq/cds-common/tokens/tooltip';
import { zIndex as cdsZIndex } from '@cbhq/cds-common/tokens/zIndex';

import { Box } from '../../layout/Box';
import { useMotionProps } from '../../motion/useMotionProps';
import { spacing } from '../../tokens';
import { TextLabel2 } from '../../typography';

import { PopperTooltipProps } from './TooltipProps';

export const tooltipId = 'tooltipId';

export const TooltipContent = forwardRef(
  ({ content, gap, testID, zIndex }: PopperTooltipProps, ref: ForwardedRef<HTMLDivElement>) => {
    const outerStyle = useMemo(
      () => ({
        padding: spacing[gap],
        zIndex: zIndex ?? cdsZIndex.overlays.tooltip,
      }),
      [gap, zIndex],
    );

    const motionProps = useMotionProps({
      style: outerStyle,
      enterConfigs: [animateInOpacityConfig, animateInYConfig],
      exitConfigs: [animateOutOpacityConfig, animateOutYConfig],
      exit: 'exit',
    });

    return (
      <motion.div {...motionProps} data-testid={`${testID}-motion`}>
        <Box
          ref={ref}
          spacingHorizontal={spacingHorizontal}
          spacingVertical={spacingVertical}
          background="background"
          borderRadius="tooltipV2"
          maxWidth={maxWidth}
          testID={testID}
        >
          {typeof content === 'string' ? (
            <TextLabel2 as="p" overflow="break" id={tooltipId} accessibilityLabel={content}>
              {content}
            </TextLabel2>
          ) : (
            <div id={tooltipId}>{content}</div>
          )}
        </Box>
      </motion.div>
    );
  },
);
