import React, { forwardRef, memo, useCallback } from 'react';

import { borderRadius, borderWidth } from '@cbhq/cds-common/tokens/border';
import { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';
import { RadioGroupBaseProps } from '@cbhq/cds-common/types/RadioGroupBaseProps';
import { css, cx } from 'linaria';

import { Icon } from '../icons/Icon';
import { control, palette } from '../tokens';
import { FilteredHTMLAttributes } from '../types';
import { Control, ControlProps } from './Control';

export interface RadioProps<T extends string> extends ControlBaseProps<T>, ControlProps {}

const RadioWithRef = forwardRef(function RadioWithRef<T extends string>(
  { children, ...props }: RadioProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>
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
  props: RadioProps<T> & React.RefAttributes<HTMLInputElement>
) => React.ReactElement;

export const Radio = memo(RadioWithRef) as typeof RadioWithRef &
  React.MemoExoticComponent<typeof RadioWithRef>;

export const useHandleRadioSelect = function <T extends string>(onChange?: (value: T) => void) {
  return useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      onChange?.(event.target.value as T);
    },
    [onChange]
  );
};

export interface RadioGroupProps<T extends string>
  extends FilteredHTMLAttributes<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    RadioGroupBaseProps<T> {
  /** * Field name of the multiple choice radio group. */
  name: string;
  /** id of the element that labels the radio group */
  'aria-labelledby'?: string;
  /** Handle change event when pressing on a radio option. */
  onChange?: (value: T) => void;
  /** Used to locate this element in end-to-end tests. */
  testID?: string;
}

const RadioGroupWithRef = forwardRef(function RadioGroup<T extends string>(
  { label, selectedValue, onChange, options, name, ...restProps }: RadioGroupProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const handleSelect = useHandleRadioSelect<T>(onChange);

  return (
    <div role="radiogroup" ref={ref} {...restProps}>
      {label}
      {Object.entries<string>(options).map(([value, optionLabel]) => (
        <Radio
          key={value}
          value={value}
          id={`${name}-${value}`}
          name={name}
          checked={selectedValue === value}
          onChange={handleSelect}
        >
          {optionLabel}
        </Radio>
      ))}
    </div>
  );
}) as <T extends string>(
  props: RadioGroupProps<T> & React.RefAttributes<HTMLInputElement>
) => React.ReactElement;

export const RadioGroup = memo(RadioGroupWithRef) as typeof RadioGroupWithRef &
  React.MemoExoticComponent<typeof RadioGroupWithRef>;

const FOCUS_PADDING = 4 + borderWidth.checkbox;

const radio = css`
  width: ${control.radioSize};
  appearance: radio;
  height: ${control.radioSize};
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${palette.background};
  border: ${borderWidth.checkbox}px solid ${palette.lineHeavy};
  border-radius: ${borderRadius.round}px;
  transition: border-color 150ms ease-out;
  &[data-filled='true'] {
    border-color: ${palette.primary};
  }
`;

const focusRing = css`
  position: relative;
  &::after {
    content: '';
    border: 2px solid ${palette.primary};
    border-radius: ${borderRadius.round}px;
    position: absolute;
    left: -${FOCUS_PADDING}px;
    top: -${FOCUS_PADDING}px;
    right: -${FOCUS_PADDING}px;
    bottom: -${FOCUS_PADDING}px;

    opacity: 0;
    transition: opacity 100ms ease-out;
  }

  /* for control inputs */
  .focus-visible + &::after {
    opacity: 1;
  }
`;
