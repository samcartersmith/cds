import { createContext } from 'react';

import { TableCellSpacing, TableCtx } from '../types/tableTypes';

export const defaultCellSpacing: TableCellSpacing = {
  outer: { spacingHorizontal: 2 },
  inner: { spacingHorizontal: 2 },
};
const initialContext = {
  variant: 'default',
  cellSpacing: defaultCellSpacing,
} as const;
export const TableContext = createContext<TableCtx>(initialContext);
