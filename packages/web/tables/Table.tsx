/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { memo, useMemo } from 'react';

import { cx } from '../utils/linaria';

import { TableContext } from './context/TableContext';
import { useTableStyles } from './hooks/useTableStyles';
import { table, tableFixed } from './styles/tableStyles';
import { TableProps } from './types/tableTypes';

export type { TableLayout, TableProps, TableVariant } from './types/tableTypes';
export const Table = memo(
  ({
    children,
    variant = 'default',
    bordered,
    cellSpacing,
    testID,
    tableLayout,
    compact,
    maxHeight,
    height,
    accessibilityLabelledBy,
    accessibilityLabel,
    ...rest
  }: TableProps) => {
    const variantStyles = useTableStyles({ variant, bordered });
    const value = useMemo(
      () => ({ variant, cellSpacing, compact }),
      [variant, cellSpacing, compact],
    );
    const fixed = tableLayout === 'fixed';
    const tableStyles = cx(table, fixed && tableFixed);
    const containerStyles = useMemo(
      () => ({
        height,
        maxHeight,
      }),
      [height, maxHeight],
    );

    return (
      <TableContext.Provider value={value}>
        <div className={variantStyles} style={containerStyles}>
          <table
            className={tableStyles}
            aria-labelledby={accessibilityLabelledBy}
            aria-label={accessibilityLabel}
            data-testid={testID}
            {...rest}
            tabIndex={0}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  },
);

Table.displayName = 'Table';
