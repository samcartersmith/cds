import { BoxBaseProps } from './BoxBaseProps';
import { GroupBaseProps } from './GroupBaseProps';

export type RadioGroupBaseProps<T extends string> = {
  /**
   * Multiple choice options for the radio group. The object key represents
   * the radio input value and the object value represents the radio option label.
   */
  options: Record<T, string>;
  /** Set a label summary for the group of radios. */
  label?: React.ReactNode;
  /** Currently selected value. */
  selectedValue?: T;
} & Pick<GroupBaseProps<BoxBaseProps>, 'direction' | 'gap'>;
