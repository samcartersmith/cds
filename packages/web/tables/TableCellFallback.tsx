import React, { memo, useMemo } from 'react';

import { Cell } from '../cells/Cell';
import { MediaFallback } from '../cells/MediaFallback';
import { Fallback } from '../layout';

import { useTableCellSpacing, useTableCellTag, useTableContext } from './hooks/useTable';
import { tableCell } from './styles/tableCellStyles';
import type { TableCellFallbackProps } from './types/tableCellFallbackTypes';

export type { TableCellFallbackProps };

export const TableCellFallback = memo(
  ({ title, start, end, subtitle, testID, ...rest }: TableCellFallbackProps) => {
    const TableCellComponent = useTableCellTag();
    // Depending on compact value
    const { compact } = useTableContext();
    const textSpacingTop = useMemo(() => (!compact && title ? 1 : 0.5), [compact, title]);
    const cellGap = useMemo(() => (compact ? 0.5 : 1), [compact]);

    // Depends on tableSpacing value
    const tableCellSpacing = useTableCellSpacing();

    return (
      <TableCellComponent data-testid={testID} className={tableCell} {...rest}>
        <Cell
          gap={cellGap}
          reduceHorizontalSpacing
          accessory={end && <MediaFallback type={end} />}
          media={start && <MediaFallback type={start} />}
          outerSpacing={tableCellSpacing.outer}
          innerSpacing={tableCellSpacing.inner}
        >
          {title && <Fallback height={24} width={45} percentage />}
          {subtitle && <Fallback height={16} width={35} spacingTop={textSpacingTop} percentage />}
        </Cell>
      </TableCellComponent>
    );
  },
);

TableCellFallback.displayName = 'TableCellFallback';
