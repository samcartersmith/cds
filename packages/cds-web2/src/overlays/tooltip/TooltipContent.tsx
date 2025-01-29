import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { motion } from 'framer-motion';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  getTranslateConfigByPlacement,
} from '@cbhq/cds-common2/animation/tooltip';
import {
  tooltipMaxWidth,
  tooltipPaddingX,
  tooltipPaddingY,
} from '@cbhq/cds-common2/tokens/tooltip';
import { zIndex as zIndexTokens } from '@cbhq/cds-common2/tokens/zIndex';

import { Box } from '../../layout/Box';
import { useMotionProps } from '../../motion/useMotionProps';
import { Text } from '../../text/Text';

import { PopperTooltipProps } from './TooltipProps';

const textStyle = css`
  /**
     * Fallback for mobile safari on iOS < 15.4
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap#browser_compatibility 
     */
  @supports not (overflow-wrap: anywhere) {
    word-break: break-word;
    overflow-wrap: break-word;
  }

  /* Desktop solution */
  overflow-wrap: anywhere;
`;

export const TooltipContent = memo(
  forwardRef(
    (
      {
        content,
        elevation,
        gap,
        testID,
        zIndex,
        tooltipId,
        placement = 'top',
        invertSpectrum,
      }: PopperTooltipProps,
      ref: ForwardedRef<HTMLDivElement>,
    ) => {
      const outerStyle = useMemo(
        () => ({
          padding: `var(--space-${gap})`,
          zIndex: zIndex ?? zIndexTokens.tooltip,
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
            background={invertSpectrum ? 'backgroundInverse' : 'background'}
            borderRadius={200}
            data-testid={testID}
            elevation={elevation}
            maxWidth={tooltipMaxWidth}
            paddingX={tooltipPaddingX}
            paddingY={tooltipPaddingY}
          >
            {typeof content === 'string' ? (
              <Text
                className={textStyle}
                color={invertSpectrum ? 'textForegroundInverse' : 'textForeground'}
                font="label2"
                id={tooltipId}
              >
                {content}
              </Text>
            ) : (
              <div id={tooltipId}>{content}</div>
            )}
          </Box>
        </motion.div>
      );
    },
  ),
);
