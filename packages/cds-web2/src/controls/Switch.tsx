import React, { forwardRef, memo, useMemo } from 'react';
import { css, cx } from '@linaria/core';
import { motion } from 'framer-motion';
import { switchTransitionConfig } from '@cbhq/cds-common/motion/switch';
import { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';

import { type ThemeConfig } from '../core/theme';
import { Box } from '../layout/Box';
import { convertTransition } from '../motion/utils';
import { ThemeProvider, useThemeContext } from '../providers/ThemeProvider';

import { Control, ControlProps } from './Control';
import { useControlMotionProps } from './useControlMotionProps';

const track = css`
  width: var(--control-switchWidth);
  height: var(--control-switchHeight);
  border-radius: var(--borderRadius-1000);
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
  width: var(--control-switchThumbSize);
  height: var(--control-switchThumbSize);
  background-color: var(--color-background);
  border: 0.5 solid var(--color-line);

  position: absolute;
  top: 1px;
  left: 1px;
`;

const thumbBackgroundStyle = css`
  background-color: rgb(255, 255, 255);
`;

const focusRingStyle = css`
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: var(--borderWidth-200);
    outline-color: var(--color-backgroundPrimary);
    outline-offset: 2px;
  }
`;

export type SwitchProps = {
  /** The palette to override default switch control palette. */
  switchPaletteOverrides?: Partial<ThemeConfig['color']>;
} & Omit<ControlBaseProps<string> & ControlProps, 'value'>;

const MotionBox = motion(Box);

const thumbMotionVariants = {
  checked: {
    x: `calc(var(--control-switchWidth) - var(--control-switchThumbSize) - 2px)`,
  },
  unchecked: {
    x: 0,
  },
};

const SwitchWithRef = forwardRef<HTMLInputElement, SwitchProps>(function SwitchWithRef(
  { children, checked, switchPaletteOverrides, disabled, ...props },
  ref,
) {
  const theme = useThemeContext();

  const { outerContainerMotionProps } = useControlMotionProps({
    checked,
    initialBackground: 'var(--color-backgroundAlternate)',
  });

  const paletteConfig = useMemo(
    () =>
      switchPaletteOverrides
        ? { ...theme, color: { ...theme.color, ...switchPaletteOverrides } }
        : {
            ...theme,
            color: { ...theme.color, backgroundAlternate: 'rgb(var(--gray20))' },
          },
    [switchPaletteOverrides, theme],
  );

  const switchNode = (
    <Control
      ref={ref}
      background={checked ? 'backgroundPrimary' : 'backgroundAlternate'}
      borderRadius={400}
      checked={checked}
      disabled={disabled}
      label={children}
      role="switch"
      type="checkbox"
      {...props}
    >
      <motion.div
        className={cx(track, !disabled && focusRingStyle)}
        data-filled={checked}
        tabIndex={disabled ? -1 : 0}
        {...outerContainerMotionProps}
      >
        <MotionBox
          animate={checked ? 'checked' : 'unchecked'}
          borderRadius={1000}
          className={cx(thumb, thumbBackgroundStyle)}
          elevation={1}
          initial={false}
          transition={convertTransition(switchTransitionConfig)}
          variants={thumbMotionVariants}
        />
      </motion.div>
    </Control>
  );

  return (
    <ThemeProvider theme={paletteConfig}>
      {children ? (
        <Box
          alignItems="center"
          minHeight="var(--control-switchHeight)"
          role="presentation"
          width="fit-content"
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
