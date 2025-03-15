import React, { forwardRef, memo, useCallback } from 'react';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';
import { SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common';
import { curves, durations } from '@cbhq/cds-common/motion/tokens';
import { ControlBaseProps } from '@cbhq/cds-common/types/ControlBaseProps';
import { RadioGroupBaseProps } from '@cbhq/cds-common/types/RadioGroupBaseProps';

import { Icon } from '../icons/Icon';
import { Group } from '../layout';
import { borderRadius, borderWidth, control, palette } from '../tokens';
import { FilteredHTMLAttributes } from '../types';
import { cx } from '../utils/linaria';

import { Control, ControlProps } from './Control';
import { useControlMotionProps } from './useControlMotionProps';

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
    <Control
      ref={ref}
      background="background"
      borderRadius="roundedFull"
      label={children}
      type="radio"
      {...props}
    >
      <motion.div
        className={cx(radio, focusRing)}
        data-filled={checked}
        role="presentation"
        {...outerContainerMotionProps}
      >
        <motion.div {...innerContainerMotionProps}>
          {checked && <Icon color="primary" name="dot" size="s" />}
        </motion.div>
      </motion.div>
    </Control>
  );
}) as <T extends string>(
  props: RadioProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

const Radio = memo(RadioWithRef) as typeof RadioWithRef &
  React.MemoExoticComponent<typeof RadioWithRef>;

function useHandleRadioSelect<T extends string>(onChange?: (value: T) => void) {
  return useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      onChange?.(event.target.value as T);
    },
    [onChange],
  );
}

const RadioGroupWithRef = forwardRef(function RadioGroup<T extends string>(
  { label, value, onChange, options, name, testID, ...restProps }: RadioGroupProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const handleSelect = useHandleRadioSelect<T>(onChange);

  return (
    <Group ref={ref} role="radiogroup" testID={testID} {...restProps}>
      {label}
      {Object.entries<string | React.ReactNode>(options).map(([optionValue, option]) => (
        <Radio
          key={optionValue}
          checked={value === optionValue}
          id={`${name}-${optionValue}`}
          name={name}
          onChange={handleSelect}
          testID={testID ? `${testID}-${optionValue}` : undefined}
          value={optionValue}
        >
          {option}
        </Radio>
      ))}
    </Group>
  );
}) as <T extends string>(
  props: RadioGroupProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

export const RadioGroup = memo(RadioGroupWithRef) as typeof RadioGroupWithRef &
  React.MemoExoticComponent<typeof RadioGroupWithRef>;

export { Radio, useHandleRadioSelect };

export type RadioProps<T extends string> = ControlBaseProps<T> & ControlProps;
export type RadioGroupProps<T extends string> = {
  /** Field name of the multiple choice radio group. */
  name: string;
  /**
   * @deprecated This prop will be replaced in v6.0.0 with accessibilityLabelledBy.
   * id of the element that labels the radio group
   */
  'aria-labelledby'?: string;
  /** Handle change event when pressing on a radio option. */
  onChange?: (value: T) => void;
} & FilteredHTMLAttributes<React.HTMLAttributes<HTMLDivElement>, 'onChange'> &
  RadioGroupBaseProps<T> &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabelledBy'>;

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
  border: ${borderWidth.checkbox} solid;
  border-radius: ${borderRadius.roundedFull};
`;

const focusRing = css`
  position: relative;
  &::after {
    content: '';
    border: ${borderWidth.focusRing} solid ${palette.primary};
    border-radius: ${borderRadius.roundedFull};
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
