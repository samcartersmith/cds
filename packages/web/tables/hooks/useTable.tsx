import { useContext } from 'react';

import { TableContext } from '../context/TableContext';
import { TableSectionContext } from '../context/TableSectionContext';
import { TableCellTag } from '../types/tableCellTypes';
import { TableSectionTag } from '../types/tableSectionTypes';

const CELL_TAG_MAP: Record<TableSectionTag, TableCellTag> = {
  thead: 'th',
  tbody: 'td',
  tfoot: 'td',
  div: 'div',
};

const useTableContext = () => {
  const { as } = useContext(TableSectionContext);
  const { cellSpacing } = useContext(TableContext);

  if (!as) {
    throw new Error('This component must be wrapped in a TableHeader, TableBody or TableFooter.');
  }

  return { as, cellSpacing };
};

export const useTableCellTag = () => {
  const { as = 'div' } = useTableContext();

  return CELL_TAG_MAP[as];
};

export const useTableSectionTag = () => {
  const { as = 'div' } = useTableContext();

  return as;
};

export const useTableCellSpacing = () => {
  const { cellSpacing } = useTableContext();

  return cellSpacing;
};
