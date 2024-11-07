import { createContext } from 'react';

import { TableCtx } from '../types/tableTypes';

const initialContext: TableCtx = {
  variant: 'default',
  compact: false,
};
export const TableContext = createContext<TableCtx>(initialContext);
