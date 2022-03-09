import { css } from 'linaria';
import React, { useRef } from 'react';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { TabLabelProps, PaletteBackground } from '@cbhq/cds-common';
import { cx } from '../utils/linaria';
import { IconButton } from '../buttons/IconButton';
import { usePaddleVisibilityEffect } from './hooks/usePaddleVisibilityEffect';
import { tabLabelSpacingClassName } from './TabLabel';
import { gradient } from '../styles/gradient';
import { usePalette } from '../hooks/usePalette';

export type PaddleProps = {
  direction?: 'left' | 'right';
  show: boolean;
  variant: TabLabelProps['variant'];
  background?: PaletteBackground;
  onPress: () => void;
};

const paddleClassName = css`
  display: block;
  position: relative;
  z-index: ${zIndex.navigation + 1};
`;
const noEventsClassName = css`
  pointer-events: none;
`;
const buttonClassName = css`
  display: block;
  opacity: 0;
  transform: scale(0);
  position: relative;
  z-index: ${zIndex.navigation};
`;
const paddleLeftClassName = css`
  position: fixed;
`;
const paddleRightClassName = css`
  position: sticky;
  right: 0;
`;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Paddle = ({
  variant = 'primary',
  direction = 'left',
  show,
  background = 'background',
  onPress,
}: PaddleProps) => {
  const palette = usePalette();
  const ref = useRef<HTMLButtonElement>(null);
  const gradientRef = useRef<HTMLElement>(null);
  const className = cx(
    paddleClassName,
    variant === 'primary' && tabLabelSpacingClassName,
    direction === 'left' ? paddleLeftClassName : paddleRightClassName,
    show ? null : noEventsClassName,
  );
  usePaddleVisibilityEffect({ ref, gradientRef, show });

  return (
    <span className={className} style={{ color: palette[background] }}>
      <span className={buttonClassName} ref={ref}>
        <IconButton
          name={direction === 'left' ? 'caretLeft' : 'caretRight'}
          onPress={onPress}
          variant="secondary"
        />
      </span>
      <span className={cx(gradient[direction], show ? 'show' : 'hide')} ref={gradientRef} />
    </span>
  );
};

Paddle.displayName = 'Paddle';
