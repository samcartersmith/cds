import React, { memo, useMemo } from 'react';
import { cx } from 'linaria';
import { TableCell } from '../TableCell';
import { palette } from '../../tokens';

import { TableRowProps } from './types';
import { tableRow, tableRowHover } from './styles';

export const TableRow = memo(function TableRow({
  fullWidth = false,
  indicateHover = false,
  className,
  children,
  backgroundColor,
  color,
}: TableRowProps) {
  const inlineStyles = useMemo(() => {
    return {
      color: color && palette[color],
      backgroundColor: backgroundColor && palette[backgroundColor],
    };
  }, [backgroundColor, color]);

  return (
    <tr style={inlineStyles} className={cx(tableRow, indicateHover && tableRowHover, className)}>
      {fullWidth && <TableCell colSpan={1000}>{children}</TableCell>}
      {!fullWidth && <>{children}</>}
    </tr>
  );
});
