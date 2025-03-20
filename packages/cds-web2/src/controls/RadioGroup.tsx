import React, { forwardRef, memo, useCallback } from 'react';
import { css, cx } from '@linaria/core';
import { m as motion } from 'framer-motion';
import type { SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common2/types';
import type { ControlBaseProps } from '@cbhq/cds-common2/types/ControlBaseProps';
import type { RadioGroupBaseProps } from '@cbhq/cds-common2/types/RadioGroupBaseProps';

import { Box, Group } from '../layout';
import type { FilteredHTMLAttributes } from '../types';

import { Control, type ControlProps } from './Control';
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
} & FilteredHTMLAttributes<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'color'> &
  RadioGroupBaseProps<T> &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabelledBy'>;
