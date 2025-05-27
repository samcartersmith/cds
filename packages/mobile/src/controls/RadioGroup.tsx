import React, { forwardRef, memo } from 'react';
import { AccessibilityProps, View } from 'react-native';
import { SharedProps } from '@cbhq/cds-common';
import { entries } from '@cbhq/cds-utils';
import { isDevelopment } from '@cbhq/cds-utils/env';

import { type BoxBaseProps, Group } from '../layout';
import type { GroupBaseProps } from '../layout/Group';

import { Radio, type RadioBaseProps, type RadioProps } from './Radio';

export { Radio, RadioBaseProps, RadioProps };

export type RadioGroupBaseProps<T extends string> = Omit<
  AccessibilityProps,
  'accessibilityLabelledBy'
> &
  SharedProps &
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
    /** Handle change event when pressing on a radio option. */
    onChange?: RadioProps<T>['onChange'];

    /** A11Y label to indicate order of radio buttons when focused on one button */
    radioAccessibilityLabel?: string;
  };

export type RadioGroupProps<T extends string> = RadioGroupBaseProps<T>;

const RadioGroupWithRef = forwardRef(function RadioGroup<T extends string>(
  {
    label,
    value,
    onChange,
    options,
    testID,
    accessibilityLabel,
    accessibilityHint,
    radioAccessibilityLabel,
    ...props
  }: RadioGroupProps<T>,
  ref: React.ForwardedRef<View>,
) {
  const accessibilityLabelValue =
    typeof label === 'string' && accessibilityLabel === undefined ? label : accessibilityLabel;

  if (
    isDevelopment() &&
    radioAccessibilityLabel &&
    (!radioAccessibilityLabel.includes('{{number}}') ||
      !radioAccessibilityLabel.includes('{{total}}'))
  ) {
    console.error(
      `radioAccessibilityLabel must include "{{number}}" and "{{total}}": ${radioAccessibilityLabel}`,
    );
  }

  return (
    <Group
      ref={ref}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabelValue}
      accessibilityRole="radiogroup"
      testID={testID}
      {...props}
    >
      {label}
      {entries<Record<T, string | React.ReactNode>>(options).map(([optionValue, option], index) => {
        const checked = value === optionValue;

        // RN doesn't natively support radio group length (e.g. "Radio button 1 of 3") being announced
        // by screen readers, so we need to manually add this information to the accessibility label.
        let accessibilityLabel: string | undefined;
        if (typeof option === 'string') {
          accessibilityLabel = `${option}. ${radioAccessibilityLabel
            ?.replace('{{number}}', (index + 1).toString())
            .replace('{{total}}', Object.keys(options).length.toString())}`;
        }

        return (
          <Radio<T>
            key={optionValue}
            accessibilityLabel={accessibilityLabel}
            checked={checked}
            onChange={onChange}
            testID={testID ? `${testID}-${optionValue}` : undefined}
            value={optionValue}
          >
            {option}
          </Radio>
        );
      })}
    </Group>
  );
  // Make forwardRef result function stay generic function type
}) as <T extends string>(
  props: RadioGroupProps<T> & { ref?: React.Ref<View> },
) => React.ReactElement;

// Make memoized function stay generic function type
export const RadioGroup = memo(RadioGroupWithRef) as typeof RadioGroupWithRef &
  React.MemoExoticComponent<typeof RadioGroupWithRef>;
