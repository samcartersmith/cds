/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { forwardRef, memo } from 'react';
import { m as motion } from 'framer-motion';
import { css } from 'linaria';
import { switchPalette } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { switchTransitionConfig } from '@cbhq/cds-common/motion/switch';
import { curves, durations } from '@cbhq/cds-common/motion/tokens';
import { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';

import { Box } from '../layout/Box';
import { convertTransition } from '../motion/utils';
import { roundedFull } from '../styles/borderRadius';
import { ThemeProvider } from '../system/ThemeProvider';
import { borderRadius, borderWidth, control, palette } from '../tokens';
import { cx } from '../utils/linaria';

import { Control, ControlProps } from './Control';
import { useControlMotionProps } from './useControlMotionProps';

export type SwitchProps = Omit<ControlBaseProps<string> & ControlProps, 'value'>;

const MotionBox = motion(Box);

const SwitchWithRef = forwardRef<HTMLInputElement, SwitchProps>(function SwitchWithRef(
  { children, checked, ...props },
  ref,
) {
  // Switch thumb is a special case where it should always be white.
  const thumbColor = useSpectrumConditional({
    light: primaryForegroundThumb,
    dark: foregroundThumb,
  });

  const { outerContainerMotionProps } = useControlMotionProps({
    checked,
    initialBackground: palette.backgroundAlternate,
  });

  const switchNode = (
    <Control
      role="switch"
      type="checkbox"
      label={children}
      ref={ref}
      backgroundColor={checked ? 'primary' : 'backgroundAlternate'}
      borderRadius="roundedLarge"
      checked={checked}
      {...props}
    >
      <motion.div
        className={cx(track, focusRing)}
        data-filled={checked}
        {...outerContainerMotionProps}
      >
        <MotionBox
          dangerouslySetClassName={cx(thumb, roundedFull, thumbColor)}
          elevation={1}
          /**
           * Framer layout animation has better performance than CSS transforms
           * more about layout animation https://www.framer.com/docs/layout-animations/
           */
          layout
          transition={convertTransition(switchTransitionConfig)}
        />
      </motion.div>
    </Control>
  );

  return (
    <ThemeProvider palette={switchPalette}>
      {children ? (
        <Box
          minHeight={control.switchHeight}
          width="fit-content"
          alignItems="center"
          role="presentation"
        >
          {switchNode}
        </Box>
      ) : (
        switchNode
      )}
    </ThemeProvider>
  );
});

export const Switch = memo(SwitchWithRef);

const track = css`
  width: ${control.switchWidth};
  height: ${control.switchHeight};
  border-radius: ${borderRadius.roundedFull};
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1px;

  &[data-filled='true'] {
    justify-content: flex-end;
  }
`;

const thumb = css`
  width: ${control.switchThumbSize};
  height: ${control.switchThumbSize};
  background-color: ${palette.primaryForeground};
  border: 0.5 solid ${palette.line};
`;

const primaryForegroundThumb = css`
  background-color: ${palette.primaryForeground};
`;

const foregroundThumb = css`
  background-color: ${palette.foreground};
`;

const FOCUS_PADDING = 4;

const focusRing = css`
  &::after {
    content: '';
    border: ${borderWidth.focusRing} solid ${palette.primary};
    border-radius: ${borderRadius.roundedFull};
    position: absolute;
    left: -${FOCUS_PADDING}px;
    top: -${FOCUS_PADDING}px;
    right: -${FOCUS_PADDING}px;
    bottom: -${FOCUS_PADDING}px;

    opacity: 0;
    transition: opacity ${durations.fast1}ms cubic-bezier(${curves.enterFunctional.join(',')});
  }

  /* for control inputs */
  .focus-visible + &::after {
    opacity: 1;
  }
`;
