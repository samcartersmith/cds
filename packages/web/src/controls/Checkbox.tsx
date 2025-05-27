import React, { forwardRef, memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';

import { Control, type ControlBaseProps } from './Control';
import { useControlMotionProps } from './useControlMotionProps';

const checkboxStyle = css`
  position: relative;
  width: var(--controlSize-checkboxSize);
  height: var(--controlSize-checkboxSize);
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-style: solid;
  border-width: var(--borderWidth-100);

  /* Disable default focus ring before adding custom focus ring styles */
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

export type CheckboxProps<T extends string> = ControlBaseProps<T>;

const CheckboxWithRef = forwardRef(function CheckboxWithRef<T extends string>(
  { children, checked, indeterminate, ...props }: CheckboxProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const filled = checked || indeterminate;
  const theme = useTheme();
  const checkboxSize = theme.controlSize.checkboxSize;
  const iconPadding = checkboxSize / 5;
  const iconSize = checkboxSize - iconPadding;

  const { outerContainerMotionProps, innerContainerMotionProps } = useControlMotionProps({
    checked: filled,
  });

  const iconStyle = useMemo(
    () => ({
      icon: {
        width: iconSize,
        height: iconSize,
        fontSize: iconSize,
        opacity: filled ? 1 : 0,
      } as const,
    }),
    [iconSize, filled],
  );

  return (
    <Control
      ref={ref}
      aria-label={props.accessibilityLabel}
      checked={checked}
      label={children}
      type="checkbox"
      {...props}
    >
      <motion.div
        key={theme.activeColorScheme}
        className={checkboxStyle}
        data-filled={filled}
        role="presentation"
        {...outerContainerMotionProps}
      >
        <motion.div {...innerContainerMotionProps}>
          <Icon
            color="fgInverse"
            name={checked ? 'checkmark' : 'minus'}
            size="s"
            styles={iconStyle}
          />
        </motion.div>
      </motion.div>
    </Control>
  );
}) as <T extends string>(
  props: CheckboxProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

export const Checkbox = memo(CheckboxWithRef) as typeof CheckboxWithRef &
  React.MemoExoticComponent<typeof CheckboxWithRef>;
