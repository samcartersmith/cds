import { createContext } from 'react';

import { TableCtx } from '../Table/types';

// TODO ensure this is needed outside ./Table
// If not, we don't need the context wrapper
export const TableContext = createContext<TableCtx>({
  variant: 'default',
});
