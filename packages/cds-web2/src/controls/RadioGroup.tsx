import React, { forwardRef, memo, useCallback } from 'react';
import type { SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common2/types';

import { type BoxBaseProps, Group } from '../layout';
import type { GroupBaseProps } from '../layout/Group';
import type { FilteredHTMLAttributes } from '../types';

import { Radio, type RadioProps } from './Radio';

export { Radio, RadioProps };

export function useHandleRadioSelect<T extends string>(onChange?: (value: T) => void) {
  return useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      onChange?.(event.target.value as T);
    },
    [onChange],
  );
}

export type RadioGroupBaseProps<T extends string> = FilteredHTMLAttributes<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'color'
> &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabelledBy'> &
  Pick<GroupBaseProps<BoxBaseProps>, 'direction' | 'gap'> & {
    /**
     * Multiple choice options for the radio group. The object key represents
     * the radio input value and the object value represents the radio option label.
     */
    options: Record<T, string | React.ReactNode>;
    /** Set a label summary for the group of radios. */
    label?: React.ReactNode;
    /** Currently selected value. */
    value?: T;
    /** Field name of the multiple choice radio group. */
    name: string;
    /** Handle change event when pressing on a radio option. */
    onChange?: (value: T) => void;
  };

export type RadioGroupProps<T extends string> = RadioGroupBaseProps<T>;

const RadioGroupWithRef = forwardRef(function RadioGroup<T extends string>(
  { label, value, onChange, options, name, testID, ...props }: RadioGroupProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const handleSelect = useHandleRadioSelect<T>(onChange);

  return (
    <Group ref={ref} role="radiogroup" testID={testID} {...props}>
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
