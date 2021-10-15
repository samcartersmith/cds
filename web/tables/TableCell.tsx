import React, { memo } from 'react';

import { cx } from 'linaria';
import { Cell, overflowClassName, truncateClassName } from '../cells/Cell';
import { VStack, HStack } from '../layout';
import { TextBody, TextLabel2, TextHeadline } from '../typography';

import { TableCellProps } from './types/tableCellTypes';
import { tableCell, tableHeaderCell, tableFooterCell } from './styles/tableCellStyles';
import { useTableCellTag, useTableSectionTag } from './hooks/useTable';

export type { TableCellProps } from './types/tableCellTypes';
export const TableCell = memo(
  ({
    alignItems,
    justifyContent,
    colSpan = 1,
    minWidth,
    className,
    color,
    start,
    end,
    onPress,
    children,
    // Only available when Children is null
    title,
    titleColor,
    subtitle,
    direction = 'vertical',
    subtitleColor = 'foregroundMuted',
    ...props
  }: TableCellProps) => {
    const tableSectionType = useTableSectionTag();
    const TableCellComponent = useTableCellTag();
    const isInBody = tableSectionType === 'tbody';
    const TextComponent = TableCellComponent === 'th' ? TextHeadline : TextBody;
    const Stack = direction === 'vertical' ? VStack : HStack;

    // Setup alignment
    const defaultAlignItems = direction === 'vertical' ? 'flex-start' : 'center';
    const smartAlignItems = alignItems ?? defaultAlignItems;
    // Setup justification
    const defaultJustifyContent = direction === 'vertical' ? 'flex-start' : 'space-between';
    const smartJustifyContent = justifyContent ?? defaultJustifyContent;
    // Setup default text colors
    const defaultTitleColor = isInBody ? 'foreground' : 'foregroundMuted';
    const smartTitleColor = titleColor ?? color ?? defaultTitleColor;

    if (process.env.NODE_ENV !== 'production') {
      if (children && (title || subtitle)) {
        throw new Error('TableCell: Cannot use `title` or `subtitle` with `children`.');
      }
    }

    const tableCellClass = cx(
      tableCell,
      tableSectionType === 'thead' && tableHeaderCell,
      tableSectionType === 'tfoot' && tableFooterCell,
      overflowClassName,
      className,
    );

    return (
      <TableCellComponent className={tableCellClass} colSpan={colSpan} width={minWidth} {...props}>
        <Cell
          onPress={onPress}
          spacing={0}
          alignItems={alignItems}
          media={start}
          accessory={end}
          reduceHorizontalSpacing
        >
          {children ? (
            <TextComponent as="div" noWrap color={color ?? 'currentColor'}>
              <Stack
                flexGrow={1}
                flexShrink={1}
                gap={0.5}
                justifyContent={smartJustifyContent}
                alignItems={smartAlignItems}
              >
                {children}
              </Stack>
            </TextComponent>
          ) : (
            <Stack
              flexGrow={1}
              flexShrink={1}
              dangerouslySetClassName={truncateClassName}
              justifyContent={smartJustifyContent}
              alignItems={smartAlignItems}
            >
              <TextComponent as="div" noWrap color={smartTitleColor}>
                {title}
              </TextComponent>
              {subtitle ? (
                <TextLabel2
                  color={subtitleColor ?? color ?? 'currentColor'}
                  as="div"
                  spacingTop={title ? 0.5 : 0}
                  overflow="truncate"
                >
                  {subtitle}
                </TextLabel2>
              ) : null}
            </Stack>
          )}
        </Cell>
      </TableCellComponent>
    );
  },
);

TableCell.displayName = 'TableCell';
