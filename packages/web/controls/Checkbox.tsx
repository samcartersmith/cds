/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { forwardRef, memo } from 'react';
import { m as motion } from 'framer-motion';
import { css } from 'linaria';
import { useSpectrum } from '@cbhq/cds-common';
import { curves, durations } from '@cbhq/cds-common/motion/tokens';
import { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';

import { Icon } from '../icons/Icon';
import { borderWidth, control, palette } from '../tokens';
import { cx } from '../utils/linaria';

import { Control, ControlProps } from './Control';
import { useControlMotionProps } from './useControlMotionProps';

export type CheckboxProps<T extends string> = ControlBaseProps<T> & ControlProps;

const CheckboxWithRef = forwardRef(function CheckboxWithRef<T extends string>(
  { children, indeterminate, ...props }: CheckboxProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { checked } = props;
  const { outerContainerMotionProps, innerContainerMotionProps } = useControlMotionProps({
    checked: checked || indeterminate,
  });
  const theme = useSpectrum();

  return (
    <Control
      ref={ref}
      aria-label={props.accessibilityLabel}
      label={children}
      type="checkbox"
      {...props}
    >
      <motion.div
        key={theme}
        className={cx(checkbox, focusRing)}
        data-filled={checked || indeterminate}
        role="presentation"
        {...outerContainerMotionProps}
      >
        <motion.div {...innerContainerMotionProps}>
          <Icon color="primaryForeground" name={checked ? 'checkmark' : 'minus'} size="s" />
        </motion.div>
      </motion.div>
    </Control>
  );
}) as <T extends string>(
  props: CheckboxProps<T> & React.RefAttributes<HTMLInputElement>,
) => React.ReactElement;

export const Checkbox = memo(CheckboxWithRef) as typeof CheckboxWithRef &
  React.MemoExoticComponent<typeof CheckboxWithRef>;

const FOCUS_PADDING = `calc(-1 * (4px + ${borderWidth.checkbox}))`;

const checkbox = css`
  width: ${control.checkboxSize};
  height: ${control.checkboxSize};
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: ${borderWidth.checkbox} solid;
`;

const focusRing = css`
  position: relative;
  &::after {
    content: '';
    border: 2px solid ${palette.primary};
    border-radius: 4px;
    position: absolute;
    left: ${FOCUS_PADDING};
    top: ${FOCUS_PADDING};
    right: ${FOCUS_PADDING};
    bottom: ${FOCUS_PADDING};

    opacity: 0;
    transition: opacity ${durations.fast1}ms cubic-bezier(${curves.enterFunctional.join(',')});
  }

  /* for control inputs */
  .focus-visible + &::after {
    opacity: 1;
  }
`;
