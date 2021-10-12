import { useContext } from 'react';
import { TableSectionContext } from '../context/TableSectionContext';
import { TableSectionTag } from '../TableSection/types';
import { TableCellTag } from '../TableCell/types';

const CELL_TAG_MAP: Record<TableSectionTag, TableCellTag> = {
  thead: 'th',
  tbody: 'td',
  tfoot: 'td',
  div: 'div',
};

const useTableContext = () => {
  const { type } = useContext(TableSectionContext);

  if (!type) {
    throw new Error('This component must be wrapped in a TableHead, TableBody or TableFoot.');
  }

  return { type };
};

export const useTableCellTag = () => {
  const { type = 'div' } = useTableContext();

  return CELL_TAG_MAP[type];
};

export const useTableSectionTag = () => {
  const { type = 'div' } = useTableContext();

  return type;
};
