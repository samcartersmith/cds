import { CellBaseProps, ListCellBaseProps } from './CellBaseProps';

export type SelectOptionBaseProps = Omit<
  CellBaseProps,
  'children' | 'offsetHorizontal' | 'reduceHorizontalSpacing'
> &
  Pick<ListCellBaseProps, 'title' | 'description' | 'multiline' | 'compact'>;
