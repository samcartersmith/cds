import React, { memo } from 'react';

import { cx } from '../utils/linaria';

import { TableContext } from './context/TableContext';
import { useTableStyles } from './hooks/useTableStyles';
import { table, tableFixed } from './styles/tableStyles';
import { TableProps } from './types/tableTypes';

export type { TableLayout, TableProps, TableVariant } from './types/tableTypes';
export const Table = memo(
  ({ children, variant, bordered, testID, tableLayout, ...rest }: TableProps) => {
    const variantStyles = useTableStyles({ variant, bordered });
    const fixed = tableLayout === 'fixed';
    const tableStyles = cx(table, fixed && tableFixed);

    return (
      <TableContext.Provider value={variant}>
        <div className={variantStyles}>
          <table className={tableStyles} data-testid={testID} {...rest}>
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  },
);

Table.displayName = 'Table';
