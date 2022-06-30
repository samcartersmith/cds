import React, { memo, useMemo, useRef } from 'react';
import { NoopFn } from '@cbhq/cds-common';

import { palette } from '../tokens';
import { cx } from '../utils/linaria';

import { useTableSectionTag } from './hooks/useTable';
import { useTableRowListener } from './hooks/useTableRowListener';
import { tableRow, tableRowHover } from './styles/tableRowStyles';
import { TableRowProps, TableRowRef } from './types/tableRowTypes';
import { TableCell } from './TableCell';

export type { TableRowProps } from './types/tableRowTypes';
export const TableRow = memo(
  ({
    fullWidth,
    disableHoverIndicator,
    children,
    backgroundColor = 'background',
    color,
    testID,
    onPress,
    outerSpacing,
    innerSpacing,
    responsiveConfig,
    ...rest
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
        backgroundColor: palette[backgroundColor],
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
        {...rest}
      >
        {fullWidth ? (
          <TableCell
            direction="horizontal"
            colSpan={1000}
            outerSpacing={outerSpacing}
            innerSpacing={innerSpacing}
            responsiveConfig={responsiveConfig}
          >
            {children}
          </TableCell>
        ) : (
          children
        )}
      </tr>
    );
  },
);

TableRow.displayName = 'TableRow';
