import React, { memo, useMemo } from 'react';
import { cx } from 'linaria';
import { TableCell } from './TableCell';
import { palette } from '../tokens';

import { TableRowProps } from './types/tableRowTypes';
import { tableRow, tableRowHover } from './styles/tableRowStyles';

export type { TableRowProps } from './types/tableRowTypes';
export const TableRow = memo(
  ({ fullWidth, indicateHover, className, children, backgroundColor, color }: TableRowProps) => {
    const inlineStyles = useMemo(() => {
      return {
        color: color && palette[color],
        backgroundColor: backgroundColor && palette[backgroundColor],
      };
    }, [backgroundColor, color]);

    return (
      <tr style={inlineStyles} className={cx(tableRow, indicateHover && tableRowHover, className)}>
        {fullWidth && (
          <TableCell direction="horizontal" colSpan={1000}>
            {children}
          </TableCell>
        )}
        {!fullWidth && <>{children}</>}
      </tr>
    );
  },
);

TableRow.displayName = 'TableRow';
