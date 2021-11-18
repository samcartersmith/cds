import React, { memo } from 'react';
import { cx } from 'linaria';
import { TableContext } from './context/TableContext';
import { useTableStyles } from './hooks/useTableStyles';
import { TableProps } from './types/tableTypes';
import { table, tableFixed } from './styles/tableStyles';

export type { TableProps, TableVariant, TableLayout } from './types/tableTypes';
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
