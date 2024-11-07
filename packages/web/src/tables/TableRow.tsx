import React, { memo, useMemo, useRef } from 'react';

import { useIsBrowser } from '../hooks/useIsBrowser';
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
    backgroundColor,
    color,
    testID,
    onPress,
    outerSpacing,
    innerSpacing,
    responsiveConfig,
    ...rest
  }: TableRowProps) => {
    const isBrowser = useIsBrowser();
    const tableSectionType = useTableSectionTag();
    const isCellInBody = tableSectionType === 'tbody';
    const shouldIndicateHover = isCellInBody && !disableHoverIndicator;

    // Listen for keyboard events
    const rowRef: TableRowRef = useRef(null);
    useTableRowListener(rowRef, onPress as () => void);

    const inlineStyles = useMemo(() => {
      return {
        color: color && palette[color],
        backgroundColor: backgroundColor && palette[backgroundColor],
        cursor: onPress ? 'pointer' : 'default',
      };
    }, [backgroundColor, color, onPress]);

    // @link https://nextjs.org/docs/messages/react-hydration-error
    const innerChildren = useMemo(() => (isBrowser ? children : ''), [children, isBrowser]);

    return (
      <tr
        ref={rowRef} // click/event support
        className={cx(tableRow, shouldIndicateHover && tableRowHover)}
        data-testid={testID}
        onClick={onPress}
        style={inlineStyles}
        tabIndex={onPress && 0}
        {...rest}
      >
        {fullWidth ? (
          <TableCell
            colSpan={1000}
            direction="horizontal"
            innerSpacing={innerSpacing}
            outerSpacing={outerSpacing}
            responsiveConfig={responsiveConfig}
          >
            {innerChildren}
          </TableCell>
        ) : (
          children
        )}
      </tr>
    );
  },
);

TableRow.displayName = 'TableRow';
