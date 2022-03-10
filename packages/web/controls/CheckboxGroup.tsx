import React, {
  Children,
  cloneElement,
  FieldsetHTMLAttributes,
  forwardRef,
  isValidElement,
  memo,
} from 'react';
import { css } from 'linaria';
import { SharedProps } from '@cbhq/cds-common';
import type { CheckboxGroupBaseProps } from '@cbhq/cds-common/types/CheckboxGroupBaseProps';
import { isDevelopment } from '@cbhq/cds-utils';

import { FilteredHTMLAttributes } from '../types';

import { Checkbox, CheckboxProps } from './Checkbox';

const checkboxStyles = css`
  margin: 0;
  padding: 0;
  min-width: 0;
  border-width: 0;
`;

export type CheckboxGroupProps<T extends string> = {
  /** Handle change event when pressing on a checkbox option. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
} & FilteredHTMLAttributes<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> &
  CheckboxGroupBaseProps<T> &
  SharedProps;

// Follows behavior describe in https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-2/checkbox-2.html
const CheckboxGroupWithRef = forwardRef(function CheckboxGroupWithRef<T extends string>(
  {
    children,
    label,
    'aria-labelledby': ariaLabelledby,
    selectedValues,
    onChange,
    name,
    testID,
    ...restProps
  }: CheckboxGroupProps<T>,
  ref: React.ForwardedRef<HTMLFieldSetElement>,
) {
  if (isDevelopment() && !label && !ariaLabelledby) {
    // eslint-disable-next-line no-console
    console.warn('Please specify an aria label for the checkbox group.');
  }

  const checkboxIds: string[] = [];
  const optionCheckboxes = Children.map(children, (child) => {
    if (!isValidElement<CheckboxProps<T>>(child) || child.type !== Checkbox) {
      return child;
    }

    const { value } = child.props;
    if (isDevelopment() && typeof value === 'undefined') {
      // eslint-disable-next-line no-console
      console.error('Checkboxes inside CheckboxGroup should have values.');
    }
    const id = child.props.id ?? ['checkbox-group', name, value].join('-');
    checkboxIds.push(id);
    return cloneElement(child, {
      checked: (typeof value !== 'undefined' && selectedValues.has(value)) ?? child.props.checked,
      onChange,
      id,
      testID: testID ? `${testID}-${id}` : undefined,
    });
  });

  // TODO (hannah): Update default styles once Caroline has the design ready. (Add default distance between
  // checkboxes.)
  return (
    <fieldset ref={ref} className={checkboxStyles} data-testid={testID} {...restProps}>
      {label}
      {optionCheckboxes}
    </fieldset>
  );
});

export const CheckboxGroup = memo(CheckboxGroupWithRef) as typeof CheckboxGroupWithRef &
  React.MemoExoticComponent<typeof CheckboxGroupWithRef>;
