import { CellBaseProps, ListCellBaseProps } from './CellBaseProps';

export type SelectOptionCellBaseProps = Omit<CellBaseProps, 'children'> &
  Pick<ListCellBaseProps, 'title' | 'description' | 'multiline' | 'compact'>;
