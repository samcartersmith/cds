import { useContext } from 'react';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';

import { TableContext } from '../context/TableContext';
import { TableSectionContext } from '../context/TableSectionContext';
import { TableCellProps, TableCellTag } from '../types/tableCellTypes';
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
export const defaultDenseCellSpacing: TableCellSpacing = {
  outer: { spacingVertical: 0.5 },
  inner: { spacingVertical: 0.5 },
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

export const useTableCellTag = (asProp?: TableCellProps['as']) => {
  const { as = 'div' } = useTableContext();

  if (asProp) return asProp;

  return CELL_TAG_MAP[as];
};

export const useTableSectionTag = () => {
  const { as = 'div' } = useTableContext();

  return as;
};

export const useTableCellSpacing = () => {
  const { cellSpacing, compact } = useTableContext();
  const defaultCellSpacingWithScale = useScaleConditional({
    dense: defaultDenseCellSpacing,
    normal: defaultCellSpacing,
  });

  if (cellSpacing) return cellSpacing;
  if (compact) return compactCellSpacing;

  return defaultCellSpacingWithScale;
};
