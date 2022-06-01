import React from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { css } from 'linaria';
import { PaletteBackground, TabLabelProps } from '@cbhq/cds-common';
import {
  animateGradientScaleConfig,
  animatePaddleOpacityConfig,
  animatePaddleScaleConfig,
  paddleHidden,
  paddleVisible,
} from '@cbhq/cds-common/animation/paddle';
import { durations } from '@cbhq/cds-common/tokens/motion';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { IconButton } from '../buttons/IconButton';
import { usePalette } from '../hooks/usePalette';
import { useMotionProps } from '../motion/useMotionProps';
import { gradient } from '../styles/gradient';
import { cx } from '../utils/linaria';

import { tabLabelSpacingClassName } from './TabLabel';

export type PaddleProps = {
  direction?: 'left' | 'right';
  show: boolean;
  variant: TabLabelProps['variant'];
  background?: PaletteBackground;
  onPress: () => void;
};

const paddleClassName = css`
  display: block;
  position: absolute;
  z-index: ${zIndex.navigation + 1};
`;
const noEventsClassName = css`
  pointer-events: none;
`;
const buttonClassName = css`
  display: block;
  position: relative;
  z-index: ${zIndex.navigation};
`;
const paddleLeftClassName = css`
  left: 0;
`;
const paddleRightClassName = css`
  right: 0;
`;

export const Paddle = ({
  variant = 'primary',
  direction = 'left',
  show,
  background = 'background',
  onPress,
}: PaddleProps) => {
  const palette = usePalette();
  const className = cx(
    paddleClassName,
    variant === 'primary' && tabLabelSpacingClassName,
    direction === 'left' ? paddleLeftClassName : paddleRightClassName,
    show ? null : noEventsClassName,
  );

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
    <AnimatePresence>
      {show && (
        <span className={className} style={{ color: palette[background] }}>
          <motion.span className={buttonClassName} {...buttonMotionProps}>
            <IconButton
              name={direction === 'left' ? 'caretLeft' : 'caretRight'}
              onPress={onPress}
              variant="secondary"
            />
          </motion.span>
          <motion.span className={gradient[direction]} {...gradientMotionProps} />
        </span>
      )}
    </AnimatePresence>
  );
};

Paddle.displayName = 'Paddle';
