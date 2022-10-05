/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { forwardRef, memo, useCallback } from 'react';
import { css } from 'linaria';
import { SharedProps } from '@cbhq/cds-common';
import { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';
import { RadioGroupBaseProps } from '@cbhq/cds-common/types/RadioGroupBaseProps';

import { Icon } from '../icons/Icon';
import { Group } from '../layout';
import { borderRadius, borderWidth, control, palette } from '../tokens';
import { FilteredHTMLAttributes } from '../types';
import { cx } from '../utils/linaria';

import { Control, ControlProps } from './Control';

export type RadioProps<T extends string> = ControlBaseProps<T> & ControlProps;

const RadioWithRef = forwardRef(function RadioWithRef<T extends string>(
  { children, ...props }: RadioProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { checked = false } = props;
  return (
    <Control
      type="radio"
      label={children}
      ref={ref}
      backgroundColor="background"
      borderRadius="round"
      {...props}
    >
      <div role="presentation" className={cx(radio, focusRing)} data-filled={checked}>
        {checked && <Icon name="dot" size="s" color="primary" />}
      </div>
    </Control>
  );
}) as <T extends string>(
  props: RadioProps<T> & React.RefAttributes<HTMLInputElement>,
) => React.ReactElement;

export const Radio = memo(RadioWithRef) as typeof RadioWithRef &
  React.MemoExoticComponent<typeof RadioWithRef>;

export function useHandleRadioSelect<T extends string>(onChange?: (value: T) => void) {
  return useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      onChange?.(event.target.value as T);
    },
    [onChange],
  );
}

export type RadioGroupProps<T extends string> = {
  /** * Field name of the multiple choice radio group. */
  name: string;
  /** id of the element that labels the radio group */
  'aria-labelledby'?: string;
  /** Handle change event when pressing on a radio option. */
  onChange?: (value: T) => void;
} & FilteredHTMLAttributes<React.HTMLAttributes<HTMLDivElement>, 'onChange'> &
  RadioGroupBaseProps<T> &
  SharedProps;

const RadioGroupWithRef = forwardRef(function RadioGroup<T extends string>(
  { label, selectedValue, onChange, options, name, testID, ...restProps }: RadioGroupProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const handleSelect = useHandleRadioSelect<T>(onChange);

  return (
    <Group role="radiogroup" ref={ref} testID={testID} {...restProps}>
      {label}
      {Object.entries<string>(options).map(([value, optionLabel]) => (
        <Radio
          key={value}
          value={value}
          id={`${name}-${value}`}
          name={name}
          checked={selectedValue === value}
          onChange={handleSelect}
          testID={testID ? `${testID}-${value}` : undefined}
        >
          {optionLabel}
        </Radio>
      ))}
    </Group>
  );
}) as <T extends string>(
  props: RadioGroupProps<T> & React.RefAttributes<HTMLInputElement>,
) => React.ReactElement;

export const RadioGroup = memo(RadioGroupWithRef) as typeof RadioGroupWithRef &
  React.MemoExoticComponent<typeof RadioGroupWithRef>;

const FOCUS_PADDING = `calc(-1 * (4px + ${borderWidth.checkbox}))`;

const radio = css`
  width: ${control.radioSize};
  appearance: radio;
  height: ${control.radioSize};
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${palette.background};
  border: ${borderWidth.checkbox} solid ${palette.lineHeavy};
  border-radius: ${borderRadius.round};
  transition: border-color 150ms ease-out;
  &[data-filled='true'] {
    border-color: ${palette.primary};
  }
`;

const focusRing = css`
  position: relative;
  &::after {
    content: '';
    border: ${borderWidth.focusRing} solid ${palette.primary};
    border-radius: ${borderRadius.round};
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
