import React, { memo } from 'react';

import { Cell } from '../cells/Cell';
import { MediaFallback } from '../cells/MediaFallback';
import { Fallback } from '../layout';

import { useTableCellTag } from './hooks/useTable';
import { tableCell } from './styles/tableCellStyles';
import type { TableCellFallbackProps } from './types/tableCellFallbackTypes';

export type { TableCellFallbackProps };

export const TableCellFallback = memo(
  ({ title, start, end, subtitle, testID, ...rest }: TableCellFallbackProps) => {
    const TableCellComponent = useTableCellTag();
    return (
      <TableCellComponent data-testid={testID} className={tableCell} {...rest}>
        <Cell
          reduceHorizontalSpacing
          accessory={end && <MediaFallback type={end} />}
          media={start && <MediaFallback type={start} />}
        >
          {title && <Fallback height={24} width={45} percentage />}
          {subtitle && <Fallback height={16} width={35} spacingTop={1} percentage />}
        </Cell>
      </TableCellComponent>
    );
  },
);

TableCellFallback.displayName = 'TableCellFallback';
