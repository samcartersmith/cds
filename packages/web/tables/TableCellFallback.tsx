import React, { memo, useMemo } from 'react';
import { getRectWidthVariant } from '@cbhq/cds-common/utils/getRectWidthVariant';

import { Cell } from '../cells/Cell';
import { MediaFallback } from '../cells/MediaFallback';
import { Fallback } from '../layout';

import { useTableCellSpacing, useTableCellTag, useTableContext } from './hooks/useTable';
import { tableCell } from './styles/tableCellStyles';
import type { TableCellFallbackProps } from './types/tableCellFallbackTypes';

export type { TableCellFallbackProps };

export const TableCellFallback = memo(
  ({
    title,
    start,
    end,
    subtitle,
    testID,
    as,
    outerSpacing,
    innerSpacing,
    outerPadding,
    innerPadding,
    responsiveConfig,
    disableRandomRectWidth,
    rectWidthVariant,
    ...rest
  }: TableCellFallbackProps) => {
    const TableCellComponent = useTableCellTag(as);
    // Depending on compact value
    const { compact } = useTableContext();
    const textSpacingTop = useMemo(() => (!compact && title ? 1 : 0.5), [compact, title]);
    const cellGap = useMemo(() => (compact ? 0.5 : 1), [compact]);

    // Depends on tableSpacing value
    const tableCellSpacing = useTableCellSpacing();
    const cellOuterSpacing = useMemo(
      () => (outerSpacing || outerPadding) ?? tableCellSpacing?.outer,
      [outerSpacing, outerPadding, tableCellSpacing?.outer],
    );
    const cellInnerSpacing = useMemo(
      () => (innerSpacing || innerPadding) ?? tableCellSpacing?.inner,
      [innerSpacing, innerPadding, tableCellSpacing?.inner],
    );

    return (
      <TableCellComponent className={tableCell} data-testid={testID} {...rest}>
        <Cell
          accessory={end && <MediaFallback testID="table-cell-fallback-accessory" type={end} />}
          gap={cellGap}
          innerPadding={cellInnerSpacing}
          media={start && <MediaFallback testID="table-cell-fallback-media" type={start} />}
          outerPadding={cellOuterSpacing}
          responsiveConfig={responsiveConfig}
        >
          {title && (
            <Fallback
              percentage
              disableRandomRectWidth={disableRandomRectWidth}
              height={24}
              rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
              testID="table-cell-fallback-title"
              width={45}
            />
          )}
          {subtitle && (
            <Fallback
              percentage
              disableRandomRectWidth={disableRandomRectWidth}
              height={16}
              rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
              spacingTop={textSpacingTop}
              testID="table-cell-fallback-subtitle"
              width={35}
            />
          )}
        </Cell>
      </TableCellComponent>
    );
  },
);

TableCellFallback.displayName = 'TableCellFallback';
