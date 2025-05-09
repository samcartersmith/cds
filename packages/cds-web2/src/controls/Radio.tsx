import React, { forwardRef, memo } from 'react';
import { css, cx } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { Box } from '../layout';

import { Control, type ControlBaseProps } from './Control';
import { useControlMotionProps } from './useControlMotionProps';

const dotSvg = (
  <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
    <rect height="19" rx="9.5" stroke="currentColor" width="19" x="0.5" y="0.5" />
    <path
      d="M9.98877 16.9952C13.8548 16.9952 16.9888 13.8612 16.9888 9.99518C16.9888 6.12918 13.8548 2.99518 9.98877 2.99518C6.12278 2.99518 2.98877 6.12918 2.98877 9.99518C2.98877 13.8612 6.12278 16.9952 9.98877 16.9952Z"
      fill="currentColor"
    />
  </svg>
);

const focusRingStyle = css`
  position: relative;
  /* if we use the focus ring we need to turn off the browser stylesheet outline */
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: 2px;
  }
`;

const radioSize = 20; // TO DO: This should come from theme controlSize

const baseStyle = css`
  width: ${radioSize}px;
  appearance: radio;
  height: ${radioSize}px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-bg);
  border-style: solid;
  border-width: var(--borderWidth-100);
  border-radius: var(--borderRadius-1000);
`;

export type RadioProps<T extends string> = ControlBaseProps<T>;

const RadioWithRef = forwardRef(function RadioWithRef<T extends string>(
  { children, ...props }: RadioProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { checked = false } = props;
  const { outerContainerMotionProps, innerContainerMotionProps } = useControlMotionProps({
    checked,
    shouldAnimateBackground: false,
  });

  return (
    <Control ref={ref} background="bg" borderRadius={1000} label={children} type="radio" {...props}>
      <motion.div
        className={cx(baseStyle, focusRingStyle)}
        data-filled={checked}
        role="presentation"
        {...outerContainerMotionProps}
      >
        <motion.div {...innerContainerMotionProps}>
          {checked && (
            <Box alignItems="center" color="fgPrimary" justifyContent="center">
              {dotSvg}
            </Box>
          )}
        </motion.div>
      </motion.div>
    </Control>
  );
}) as <T extends string>(
  props: RadioProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

export const Radio = memo(RadioWithRef) as typeof RadioWithRef &
  React.MemoExoticComponent<typeof RadioWithRef>;
