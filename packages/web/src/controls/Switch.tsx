import React, { forwardRef, memo } from 'react';
import { css, cx } from '@linaria/core';
import { m as motion } from 'framer-motion';
import { switchTransitionConfig } from '@cbhq/cds-common/motion/switch';

import { Box } from '../layout/Box';
import { convertTransition } from '../motion/utils';

import { Control, type ControlBaseProps } from './Control';
import { useControlMotionProps } from './useControlMotionProps';

const track = css`
  width: var(--controlSize-switchWidth);
  height: var(--controlSize-switchHeight);
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
  width: var(--controlSize-switchThumbSize);
  height: var(--controlSize-switchThumbSize);
  background-color: var(--color-bg);
  border: 0.5 solid var(--color-bgLine);

  position: absolute;
  top: 1px;
  left: 1px;
`;

const thumbBackgroundStyle = css`
  background-color: rgb(255, 255, 255);
`;

export type SwitchProps = Omit<ControlBaseProps<string>, 'value'>;

const MotionBox = motion(Box);

const thumbMotionVariants = {
  checked: {
    x: `calc(var(--controlSize-switchWidth) - var(--controlSize-switchThumbSize) - 2px)`,
  },
  unchecked: {
    x: 0,
  },
};

const SwitchWithRef = forwardRef<HTMLInputElement, SwitchProps>(function SwitchWithRef(
  { children, checked, disabled, ...props },
  ref,
) {
  const { outerContainerMotionProps } = useControlMotionProps({
    checked,
    initialBackground: 'var(--color-bgTertiary)',
  });

  const switchNode = (
    <Control
      ref={ref}
      background={checked ? 'bgPrimary' : 'bgTertiary'}
      borderRadius={400}
      checked={checked}
      disabled={disabled}
      label={children}
      role="switch"
      type="checkbox"
      {...props}
    >
      <motion.div className={cx(track)} data-filled={checked} {...outerContainerMotionProps}>
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

  return children ? (
    <Box
      alignItems="center"
      minHeight="var(--controlSize-switchHeight)"
      role="presentation"
      width="fit-content"
    >
      {switchNode}
    </Box>
  ) : (
    switchNode
  );
});

export const Switch = memo(SwitchWithRef);
