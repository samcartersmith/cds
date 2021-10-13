import { createContext } from 'react';

import { TableCtx } from '../types/tableTypes';

export const TableContext = createContext<TableCtx>({
  variant: 'default',
});
