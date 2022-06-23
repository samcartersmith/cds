/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { memo, useMemo } from 'react';

import { cx } from '../utils/linaria';

import { defaultCellSpacing, TableContext } from './context/TableContext';
import { useTableStyles } from './hooks/useTableStyles';
import { table, tableFixed } from './styles/tableStyles';
import { TableProps } from './types/tableTypes';

export type { TableLayout, TableProps, TableVariant } from './types/tableTypes';
export const Table = memo(
  ({
    children,
    variant = 'default',
    bordered,
    cellSpacing = defaultCellSpacing,
    testID,
    tableLayout,
    ...rest
  }: TableProps) => {
    const variantStyles = useTableStyles({ variant, bordered });
    const value = useMemo(() => ({ variant, cellSpacing }), [variant, cellSpacing]);
    const fixed = tableLayout === 'fixed';
    const tableStyles = cx(table, fixed && tableFixed);

    return (
      <TableContext.Provider value={value}>
        <div className={variantStyles}>
          <table className={tableStyles} data-testid={testID} {...rest} tabIndex={0}>
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  },
);

Table.displayName = 'Table';
