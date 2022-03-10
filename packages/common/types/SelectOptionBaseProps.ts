import { CellBaseProps, ListCellBaseProps } from './CellBaseProps';

export type SelectOptionBaseProps = {
  /** Unique identifier for each option */
  value: string;
} & Omit<CellBaseProps, 'children' | 'offsetHorizontal' | 'reduceHorizontalSpacing' | 'selected'> &
  Pick<ListCellBaseProps, 'title' | 'description' | 'multiline' | 'compact'>;
