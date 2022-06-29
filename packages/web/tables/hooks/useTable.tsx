import { useContext } from 'react';

import { TableContext } from '../context/TableContext';
import { TableSectionContext } from '../context/TableSectionContext';
import { TableCellTag } from '../types/tableCellTypes';
import { TableSectionTag } from '../types/tableSectionTypes';
import { TableCellSpacing } from '../types/tableTypes';

const CELL_TAG_MAP: Record<TableSectionTag, TableCellTag> = {
  thead: 'th',
  tbody: 'td',
  tfoot: 'td',
  div: 'div',
};

export const defaultCellSpacing: TableCellSpacing = {
  outer: { spacingHorizontal: 2 },
  inner: { spacingHorizontal: 2 },
};
export const compactCellSpacing: TableCellSpacing = {
  outer: { spacingHorizontal: 2, spacingVertical: 0 },
  inner: { spacingHorizontal: 1, spacingVertical: 1 },
};

export const useTableContext = () => {
  const { as } = useContext(TableSectionContext);
  const { cellSpacing, compact } = useContext(TableContext);

  if (!as) {
    throw new Error('This component must be wrapped in a TableHeader, TableBody or TableFooter.');
  }

  return { as, cellSpacing, compact };
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
  const { cellSpacing, compact } = useTableContext();
  if (cellSpacing) return cellSpacing;
  if (compact) return compactCellSpacing;

  return defaultCellSpacing;
};
