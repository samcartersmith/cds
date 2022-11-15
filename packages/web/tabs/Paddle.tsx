import React from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { css } from 'linaria';
import {
  PaletteBackground,
  SharedAccessibilityProps,
  SharedProps,
  TabLabelProps,
} from '@cbhq/cds-common';
import {
  animateGradientScaleConfig,
  animatePaddleOpacityConfig,
  animatePaddleScaleConfig,
  paddleHidden,
  paddleVisible,
} from '@cbhq/cds-common/animation/paddle';
import { durations } from '@cbhq/cds-common/motion/tokens';
import { tabsPaddleSpacing, tabsPaddleWidth } from '@cbhq/cds-common/tokens/tabs';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { IconButton } from '../buttons/IconButton';
import { usePalette } from '../hooks/usePalette';
import { useMotionProps } from '../motion/useMotionProps';
import { gradient, staticClassName as gradientStaticClassName } from '../styles/gradient';
import { spacing } from '../tokens';
import { cx } from '../utils/linaria';

import { tabLabelVerticalSpacing } from './TabLabel';

export type PaddleProps = {
  direction?: 'left' | 'right';
  show: boolean;
  variant: TabLabelProps['variant'];
  background?: PaletteBackground;
  onPress: () => void;
} & SharedProps &
  SharedAccessibilityProps;

export const paddleStaticClassName = 'cds-paddle';
const gradientClassName = css`
  &.${gradientStaticClassName} {
    &.${paddleStaticClassName} {
      width: calc(${tabsPaddleWidth}px + ${spacing[tabsPaddleSpacing]});
    }
  }
`;
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
  left: calc(${spacing[tabsPaddleSpacing]} * -1);
  padding-left: ${spacing[tabsPaddleSpacing]};
  padding-right: ${spacing[tabsPaddleSpacing]};
`;
const paddleRightClassName = css`
  right: calc(${spacing[tabsPaddleSpacing]} * -1);
  padding-left: ${spacing[tabsPaddleSpacing]};
  padding-right: ${spacing[tabsPaddleSpacing]};
`;
// TODO: come up with a better system for handling these custom px values
// Using px are flakey, but I can't think of a more deterministic way to calculate this diff
const tablabelOffset = '7px';
const paddleOffsetClassName = css`
  padding-top: calc(${spacing[tabLabelVerticalSpacing]} - ${tablabelOffset});
  padding-bottom: calc(${spacing[tabLabelVerticalSpacing]} - ${tablabelOffset});
`;

export const Paddle = ({
  direction = 'left',
  show,
  background = 'background',
  onPress,
  testID = `${paddleStaticClassName}--${direction}`,
  accessibilityLabel,
}: PaddleProps) => {
  const palette = usePalette();
  const className = cx(
    paddleClassName,
    paddleOffsetClassName,
    direction === 'left' ? paddleLeftClassName : paddleRightClassName,
    show ? null : noEventsClassName,
  );
  const paddleGradientClassName = cx(paddleStaticClassName, gradient[direction], gradientClassName);

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
        <span
          className={className}
          style={{ color: palette[background] }}
          data-testid={`${testID}--container`}
        >
          <motion.span className={buttonClassName} {...buttonMotionProps}>
            <IconButton
              name={direction === 'left' ? 'caretLeft' : 'caretRight'}
              onPress={onPress}
              variant="secondary"
              testID={testID}
              accessibilityLabel={accessibilityLabel}
            />
          </motion.span>
          <motion.span className={paddleGradientClassName} {...gradientMotionProps} />
        </span>
      )}
    </AnimatePresence>
  );
};

Paddle.displayName = 'Paddle';
