import type { TextBaseProps } from './TextBaseProps';

export interface ControlBaseProps<T extends string> {
  /** Label for the control option. */
  children?: TextBaseProps['children'];
  /** Set the control to selected/on. */
  checked?: boolean;
  /** Disable user interaction. */
  disabled?: boolean;
  /** Set the control to ready-only. Similar effect as disabled. */
  readOnly?: boolean;
  /** Value of the option. Useful for multiple choice. */
  value?: T;
  /** Used to locate this element in end-to-end tests. */
  testID?: string;
}
