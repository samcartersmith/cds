import { CellBaseProps, ListCellBaseProps } from './CellBaseProps';

export type SelectOptionBaseProps = Omit<CellBaseProps, 'children'> &
  Pick<ListCellBaseProps, 'title' | 'description' | 'multiline' | 'compact'>;
