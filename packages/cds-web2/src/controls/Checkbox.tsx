import React, { forwardRef, memo } from 'react';
import { css, cx } from '@linaria/core';
import { m as motion } from 'framer-motion';
import type { ControlBaseProps } from '@cbhq/cds-common2/types/ControlBaseProps';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';

import { Control, type ControlProps } from './Control';
import { useControlMotionProps } from './useControlMotionProps';

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

const checkboxSize = 20; // TO DO: This should come from theme controlSize

const checkbox = css`
  width: ${checkboxSize}px;
  height: ${checkboxSize}px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-style: solid;
  border-width: var(--borderWidth-100);
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
        className={cx(checkbox, focusRingStyle)}
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
