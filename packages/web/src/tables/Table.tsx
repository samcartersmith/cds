import React, { forwardRef, memo, useMemo } from 'react';

import { cx } from '../utils/linaria';

import { TableContext } from './context/TableContext';
import { useTableStyles } from './hooks/useTableStyles';
import { table, tableFixed } from './styles/tableStyles';
import { TableProps } from './types/tableTypes';

const TableWithRef = forwardRef<HTMLTableElement, TableProps>(function TableWithRef(
  {
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
    className,
    ...rest
  },
  ref,
) {
  const variantStyles = useTableStyles({ variant, bordered });
  const value = useMemo(() => ({ variant, cellSpacing, compact }), [variant, cellSpacing, compact]);
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
          ref={ref}
          aria-label={accessibilityLabel}
          aria-labelledby={accessibilityLabelledBy}
          className={cx(tableStyles, className)}
          data-testid={testID}
          {...rest}
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
});

export const Table = memo(TableWithRef);

Table.displayName = 'Table';

export type { TableLayout, TableProps, TableVariant } from './types/tableTypes';
