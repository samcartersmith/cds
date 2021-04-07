import React, {
  Children,
  cloneElement,
  isValidElement,
  forwardRef,
  memo,
  FieldsetHTMLAttributes,
} from 'react';

import type { CheckboxGroupBaseProps } from '@cbhq/cds-common/types/CheckboxGroupBaseProps';
import { isDevelopment } from '@cbhq/cds-utils';

import { FilteredHTMLAttributes } from '../types';
import { Checkbox, CheckboxProps } from './Checkbox';

export interface CheckboxGroupProps<T extends string>
  extends FilteredHTMLAttributes<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'>,
    CheckboxGroupBaseProps<T> {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

// Follows behavior describe in https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-2/checkbox-2.html
const CheckboxGroupWithRef = forwardRef(function CheckboxGroupWithRef<T extends string>(
  {
    children,
    label,
    'aria-labelledby': ariaLabelledby,
    groupCheckbox,
    isAllSelected,
    selectedValues,
    onChange,
    name,
    ...restProps
  }: CheckboxGroupProps<T>,
  ref: React.ForwardedRef<HTMLFieldSetElement>
) {
  if (isDevelopment() && !label && !ariaLabelledby) {
    console.warn('Please specify an aria label for the checkbox group.');
  }

  const checkboxIds: string[] = [];
  const optionCheckboxes = Children.map(children, child => {
    if (!isValidElement<CheckboxProps<T>>(child) || child.type !== Checkbox) {
      return child;
    }

    const { value } = child.props;
    if (isDevelopment() && typeof value === 'undefined') {
      console.error('Checkboxes inside CheckboxGroup should have values.');
    }
    const id = child.props.id || ['checkbox-group', name, value].join('-');
    checkboxIds.push(id);
    return cloneElement(child, {
      checked: (typeof value !== 'undefined' && selectedValues.has(value)) ?? child.props.checked,
      onChange,
      id,
    });
  });

  const groupCheckboxNode =
    groupCheckbox &&
    groupCheckbox.type === Checkbox &&
    cloneElement(groupCheckbox, {
      checked:
        isAllSelected !== undefined && isAllSelected !== 'mixed'
          ? isAllSelected
          : groupCheckbox.props.checked,
      indeterminate: isAllSelected === 'mixed' || groupCheckbox.props.indeterminate,
      onChange,
      'aria-controls': checkboxIds.join(' '),
    });

  // TODO (hannah): Update default styles once Caroline has the design ready. (Add default distance between
  // checkboxes.)
  return (
    <fieldset ref={ref} {...restProps}>
      {label}
      {groupCheckboxNode}
      {optionCheckboxes}
    </fieldset>
  );
});

export const CheckboxGroup = memo(CheckboxGroupWithRef) as typeof CheckboxGroupWithRef &
  React.MemoExoticComponent<typeof CheckboxGroupWithRef>;
