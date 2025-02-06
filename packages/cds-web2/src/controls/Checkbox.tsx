import React, { forwardRef, memo } from 'react';
import { css, cx } from '@linaria/core';
import { m as motion } from 'framer-motion';
import { curves, durations } from '@cbhq/cds-common2/motion/tokens';
import type { ControlBaseProps } from '@cbhq/cds-common2/types/ControlBaseProps';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';

import { type ControlProps, Control } from './Control';
import { useControlMotionProps } from './useControlMotionProps';

const checkboxBorderWidth = 2;

const FOCUS_PADDING = `calc(-1 * (4px + ${checkboxBorderWidth}px))`;

const focusRing = css`
  position: relative;
  &::after {
    content: '';
    border: 2px solid var(--color-bgPrimary);
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

const checkboxSize = 20; // TO DO: This should come from theme controlSize

const checkbox = css`
  width: ${checkboxSize}px;
  height: ${checkboxSize}px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: ${checkboxBorderWidth}px solid;
`;

export type CheckboxProps<T extends string> = ControlBaseProps<T> & ControlProps;

const CheckboxWithRef = forwardRef(function CheckboxWithRef<T extends string>(
  { children, indeterminate, ...props }: CheckboxProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { checked } = props;
  const { outerContainerMotionProps, innerContainerMotionProps } = useControlMotionProps({
    checked: checked || indeterminate,
  });
  const { colorScheme } = useTheme();

  return (
    <Control
      ref={ref}
      aria-label={props.accessibilityLabel}
      label={children}
      type="checkbox"
      {...props}
    >
      <motion.div
        key={colorScheme}
        className={cx(checkbox, focusRing)}
        data-filled={checked || indeterminate}
        role="presentation"
        {...outerContainerMotionProps}
      >
        <motion.div {...innerContainerMotionProps}>
          <Icon color="fgInverse" name={checked ? 'checkmark' : 'minus'} size="s" />
        </motion.div>
      </motion.div>
    </Control>
  );
}) as <T extends string>(
  props: CheckboxProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

export const Checkbox = memo(CheckboxWithRef) as typeof CheckboxWithRef &
  React.MemoExoticComponent<typeof CheckboxWithRef>;
