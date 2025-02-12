import React, { Children, cloneElement, forwardRef, isValidElement, memo } from 'react';
import { View, ViewProps } from 'react-native';
import { SharedProps } from '@cbhq/cds-common2';
import type { CheckboxGroupBaseProps } from '@cbhq/cds-common2/types/CheckboxGroupBaseProps';
import { isDevelopment } from '@cbhq/cds-utils';

import { CheckboxProps } from './Checkbox';

export type CheckboxGroupProps<T extends string> = Omit<ViewProps, 'children'> &
  CheckboxGroupBaseProps<T> &
  SharedProps & {
    /** Handle change events when user tap on the checkboxes */
    onChange?: (value?: T) => void;
  };

// Follows behavior describe in https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-2/checkbox-2.html
const CheckboxGroupWithRef = forwardRef(function CheckboxGroupWithRef<T extends string>(
  {
    children,
    label,
    accessibilityLabel,
    onChange,
    selectedValues,
    testID,
    ...restProps
  }: CheckboxGroupProps<T>,
  ref: React.ForwardedRef<View>,
) {
  if (isDevelopment() && !label && !accessibilityLabel) {
    // eslint-disable-next-line no-console
    console.warn('Please specify an accessibility label for the checkbox group.');
  }

  const optionCheckboxes = Children.map(children, (child, index) => {
    if (!isValidElement<CheckboxProps<T>>(child)) {
      return child;
    }

    const { value } = child.props;
    if (isDevelopment() && typeof value === 'undefined') {
      // eslint-disable-next-line no-console
      console.error('Checkboxes inside CheckboxGroup should have values.');
    }
    return cloneElement(child, {
      checked: (typeof value !== 'undefined' && selectedValues.has(value)) ?? child.props.checked,
      onChange,
      testID: testID ? `${testID}-${child.props.value ?? index}` : undefined,
    });
  });

  // TODO (hannah): Update default styles once Caroline has the design ready. (Add default distance between
  // checkboxes.)
  return (
    <View ref={ref} accessibilityRole="combobox" testID={testID} {...restProps}>
      {label}
      {optionCheckboxes}
    </View>
  );
  // Make forwardRef result function stay generic function type
}) as <T extends string>(
  props: CheckboxGroupProps<T> & { ref?: React.Ref<View> },
) => React.ReactElement;

// Make memoized function stay generic function type
export const CheckboxGroup = memo(CheckboxGroupWithRef) as typeof CheckboxGroupWithRef &
  React.MemoExoticComponent<typeof CheckboxGroupWithRef>;
