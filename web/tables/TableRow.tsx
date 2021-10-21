import React, { useRef, memo, useMemo } from 'react';
import { cx } from 'linaria';
import { NoopFn } from '@cbhq/cds-common';
import { useTableSectionTag } from './hooks/useTable';
import { useTableRowListener } from './hooks/useTableRowListener';
import { TableCell } from './TableCell';
import { palette } from '../tokens';

import { TableRowProps, TableRowRef } from './types/tableRowTypes';
import { tableRow, tableRowHover } from './styles/tableRowStyles';

export type { TableRowProps } from './types/tableRowTypes';
export const TableRow = memo(
  ({
    fullWidth,
    disableHoverIndicator,
    children,
    backgroundColor,
    color,
    testID,
    onPress,
  }: TableRowProps) => {
    const tableSectionType = useTableSectionTag();
    const isCellInBody = tableSectionType === 'tbody';
    const shouldIndicateHover = isCellInBody && !disableHoverIndicator;

    // Listen for keyboard events
    const rowRef: TableRowRef = useRef(null);
    useTableRowListener(rowRef, onPress as NoopFn);

    const inlineStyles = useMemo(() => {
      return {
        color: color && palette[color],
        backgroundColor: backgroundColor && palette[backgroundColor],
        cursor: onPress ? 'pointer' : 'default',
      };
    }, [backgroundColor, color, onPress]);

    return (
      <tr
        style={inlineStyles}
        className={cx(tableRow, shouldIndicateHover && tableRowHover)}
        data-testid={testID}
        // click/event support
        ref={rowRef}
        onClick={onPress}
        tabIndex={onPress && 0}
      >
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
