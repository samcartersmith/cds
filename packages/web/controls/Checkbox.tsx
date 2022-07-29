/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { forwardRef, memo } from 'react';
import { css } from 'linaria';
import { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';

import { Icon } from '../icons/Icon';
import { borderWidth, control, palette } from '../tokens';
import { cx } from '../utils/linaria';

import { Control, ControlProps } from './Control';

export type CheckboxProps<T extends string> = ControlBaseProps<T> & ControlProps;

const CheckboxWithRef = forwardRef(function CheckboxWithRef<T extends string>(
  { children, ...props }: CheckboxProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { checked } = props;
  return (
    <Control
      type="checkbox"
      label={children}
      aria-label={props.accessibilityLabel}
      ref={ref}
      {...props}
    >
      <div role="presentation" className={cx(checkbox, focusRing)} data-filled={checked}>
        {checked && <Icon name="checkmark" size="s" color="primaryForeground" />}
      </div>
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

  background-color: ${palette.background};
  border: ${borderWidth.checkbox} solid ${palette.lineHeavy};
  transition: border-color 150ms ease-out;

  &[data-filled='true'] {
    background-color: ${palette.primary};
    border-color: ${palette.primary};
  }
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
    transition: opacity 100ms ease-out;
  }

  /* for control inputs */
  .focus-visible + &::after {
    opacity: 1;
  }
`;
