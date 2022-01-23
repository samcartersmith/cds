export type CheckboxGroupBaseProps<T extends string | number> = {
  /** Checkbox elements that are part of the checkbox group. */
  children: React.ReactElement[];
  /** Set a label summary for the group of checkboxes. */
  label?: React.ReactNode;
  /** Checkbox options that are checked. */
  selectedValues: Set<T>;
};
