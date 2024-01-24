import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { m as motion } from 'framer-motion';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  getTranslateConfigByPlacement,
} from '@cbhq/cds-common/animation/tooltip';
import { maxWidth, spacingHorizontal, spacingVertical } from '@cbhq/cds-common/tokens/tooltip';
import { zIndex as cdsZIndex } from '@cbhq/cds-common/tokens/zIndex';

import { Box } from '../../layout/Box';
import { useMotionProps } from '../../motion/useMotionProps';
import { spacing } from '../../tokens';
import { TextLabel2 } from '../../typography/TextLabel2';

import { PopperTooltipProps } from './TooltipProps';

export const TooltipContent = memo(
  forwardRef(
    (
      { content, gap, testID, zIndex, tooltipId, placement = 'top' }: PopperTooltipProps,
      ref: ForwardedRef<HTMLDivElement>,
    ) => {
      const outerStyle = useMemo(
        () => ({
          padding: spacing[gap],
          zIndex: zIndex ?? cdsZIndex.overlays.tooltip,
        }),
        [gap, zIndex],
      );

      const motionProps = useMotionProps({
        style: outerStyle,
        enterConfigs: [animateInOpacityConfig, getTranslateConfigByPlacement({ placement })],
        exitConfigs: [
          animateOutOpacityConfig,
          getTranslateConfigByPlacement({ placement, isExiting: true }),
        ],
        exit: 'exit',
      });

      return (
        <motion.div {...motionProps} data-testid={`${testID}-motion`}>
          <Box
            ref={ref}
            background="background"
            borderRadius="rounded"
            maxWidth={maxWidth}
            spacingHorizontal={spacingHorizontal}
            spacingVertical={spacingVertical}
            testID={testID}
          >
            {typeof content === 'string' ? (
              <TextLabel2 accessibilityLabel={content} as="p" id={tooltipId} overflow="break">
                {content}
              </TextLabel2>
            ) : (
              <div id={tooltipId}>{content}</div>
            )}
          </Box>
        </motion.div>
      );
    },
  ),
);
