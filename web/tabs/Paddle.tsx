import { css } from 'linaria';
import React, { useRef } from 'react';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { TabLabelProps } from '@cbhq/cds-common';
import { cx } from '../utils/linaria';
import { Box } from '../layout/Box';
import { palette } from '../tokens';
import { IconButton } from '../buttons/IconButton';
import { useAnimatePaddleVisibility } from './hooks/useAnimatePaddleVisibility';
import { tabLabelSpacingClassName } from './TabLabel';

export type PaddleProps = {
  direction?: 'left' | 'right';
  show: boolean;
  variant: TabLabelProps['variant'];
  onPress: () => void;
};

const paddleClassName = css`
  position: relative;
  z-index: ${zIndex.navigation};
  &::before {
    content: '';
    position: absolute;
    pointer-events: none;
    z-index: ${zIndex.interactable};
    top: 0;
    width: 80px;
    height: 100%;
  }
  > * {
    z-index: ${zIndex.navigation};
  }
`;
const noEventsClassName = css`
  pointer-events: none;
`;
const paddleLeftClassName = css`
  position: fixed;
  &::before {
    background: linear-gradient(to left, ${palette.transparent} 0%, ${palette.background} 50%);
    left: 0px;
  }
`;
const paddleRightClassName = css`
  position: sticky;
  right: 0;
  &::before {
    background: linear-gradient(to right, ${palette.transparent} 0%, ${palette.background} 50%);
    right: 0px;
  }
`;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Paddle = ({ variant = 'primary', direction = 'left', show, onPress }: PaddleProps) => {
  const ref = useRef<HTMLElement>(null);
  const className = cx(
    paddleClassName,
    variant === 'primary' && tabLabelSpacingClassName,
    direction === 'left' ? paddleLeftClassName : paddleRightClassName,
    show ? null : noEventsClassName,
  );
  useAnimatePaddleVisibility({ ref, show });

  return (
    <Box dangerouslySetClassName={className} ref={ref}>
      <IconButton
        name={direction === 'left' ? 'caretLeft' : 'caretRight'}
        onPress={onPress}
        variant="secondary"
      />
    </Box>
  );
};

Paddle.displayName = 'Paddle';
