import React from 'react';
import { css, cx } from '@linaria/core';
import { m as motion } from 'framer-motion';
import {
  animateGradientScaleConfig,
  animatePaddleOpacityConfig,
  animatePaddleScaleConfig,
  paddleHidden,
  paddleVisible,
} from '@cbhq/cds-common/animation/paddle';
import type { ThemeVars } from '@cbhq/cds-common/core/theme';
import { durations } from '@cbhq/cds-common/motion/tokens';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import type { SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common/types';

import { NewAnimatePresence } from '../animation/NewAnimatePresence';
import { IconButton } from '../buttons/IconButton';
import { Box } from '../layout/Box';
import { useMotionProps } from '../motion/useMotionProps';
import type { TabLabelBaseProps } from '../tabs/TabLabel';

export const paddleWidth = 80;

const gradientStyles = css`
  display: block;
  position: absolute;
  pointer-events: none;
  z-index: ${zIndex.interactable};
  top: 0;
  width: calc(${paddleWidth}px + var(--space-2));
  height: 100%;
`;

const gradientLeftStyles = css`
  background: linear-gradient(to right, currentColor 50%, var(--color-transparent) 100%);
  left: 0px;
  transform-origin: left;
`;

const gradientRightStyles = css`
  background: linear-gradient(to left, currentColor 50%, var(--color-transparent) 100%);
  right: 0px;
  transform-origin: right;
`;

export type PaddleProps = {
  direction?: 'left' | 'right';
  show: boolean;
  variant: TabLabelBaseProps['variant'];
  background?: ThemeVars.Color;
  onClick: () => void;
  /**
   * Web only. Styling for the paddle icon button. Mobile does not have paddles.
   */
  paddleStyle?: React.CSSProperties;
} & SharedProps &
  SharedAccessibilityProps;

const tabLabelOffset = '7px';

const paddleStyles = css`
  display: block;
  position: absolute;
  z-index: ${zIndex.navigation + 1};
  padding-top: calc(var(--space-2) - ${tabLabelOffset});
  padding-bottom: calc(var(--space-2) - ${tabLabelOffset});
`;

const buttonStyles = css`
  display: block;
  position: relative;
  z-index: ${zIndex.navigation};
`;
const paddleLeftStyles = css`
  left: calc(var(--space-2) * -1);
  padding-left: var(--space-2);
  padding-right: var(--space-2);
`;
const paddleRightStyles = css`
  right: calc(var(--space-2) * -1);
  padding-left: var(--space-2);
  padding-right: var(--space-2);
`;

/**
 * Paddles are left/right IconButtons, rendered by TabNavigation to visually indicate the presence of tabs that are out of sight due to content overflow.
 */
export const Paddle = ({
  direction = 'left',
  show,
  background = 'bg',
  onClick,
  testID = `cds-paddle--${direction}`,
  accessibilityLabel,
  paddleStyle,
}: PaddleProps) => {
  const buttonMotionProps = useMotionProps({
    enterConfigs: [
      { ...animatePaddleOpacityConfig, toValue: paddleVisible },
      { ...animatePaddleScaleConfig, toValue: paddleVisible, delay: durations.fast1 },
    ],
    exitConfigs: [
      { ...animatePaddleOpacityConfig, toValue: paddleHidden },
      { ...animatePaddleScaleConfig, toValue: paddleHidden },
    ],
    exit: 'exit',
  });

  const gradientMotionProps = useMotionProps({
    enterConfigs: [{ ...animateGradientScaleConfig, toValue: 1 }],
    exitConfigs: [{ ...animateGradientScaleConfig, toValue: 0 }],
    exit: 'exit',
  });

  return (
    <NewAnimatePresence>
      {show && (
        <Box
          as="span"
          className={cx(paddleStyles, direction === 'left' ? paddleLeftStyles : paddleRightStyles)}
          color={background}
          data-testid={`${testID}--container`}
        >
          <motion.span className={buttonStyles} {...buttonMotionProps}>
            <IconButton
              accessibilityLabel={accessibilityLabel}
              name={direction === 'left' ? 'caretLeft' : 'caretRight'}
              onClick={onClick}
              style={paddleStyle}
              testID={testID}
              variant="secondary"
            />
          </motion.span>
          <motion.span
            className={cx(
              gradientStyles,
              direction === 'left' ? gradientLeftStyles : gradientRightStyles,
            )}
            {...gradientMotionProps}
          />
        </Box>
      )}
    </NewAnimatePresence>
  );
};

Paddle.displayName = 'Paddle';
