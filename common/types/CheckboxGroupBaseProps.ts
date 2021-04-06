export type CheckboxGroupBaseProps<T extends string | number> = {
  /** Checkbox elements that are part of the checkbox group. */
  children: React.ReactElement | React.ReactElement[];
  /** Set a label summary for the group of checkboxes. */
  label?: React.ReactNode;
  /** Checkbox element that controls all the checkboxes in the group.  */
  groupCheckbox?: React.ReactElement;
  /** If a groupCheckbox is present, this represents the checked state of the group checkbox. */
  isAllSelected?: boolean | 'mixed';
  /** Checkbox options that are checked. */
  selectedValues: Set<T>;
};
