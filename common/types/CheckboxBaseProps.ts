import type { TextBaseProps } from './TextBaseProps';

export interface CheckboxBaseProps<T extends string>
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'disabled' | 'name' | 'required' | 'readOnly'
  > {
  /** Label for the checkbox option. */
  children?: TextBaseProps['children'];
  /** Value of the option. */
  value?: T;
  /** A mixed state of checked and unchecked group of checkboxes. */
  indeterminate?: boolean;
}
