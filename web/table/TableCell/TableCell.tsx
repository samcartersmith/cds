import React, { memo } from 'react';

import { cx } from 'linaria';
import { Cell, truncateClassName, overflowClassName } from '../../cells/Cell';
import { VStack, Box } from '../../layout';
import { TextBody, TextLabel2, TextHeadline } from '../../typography';

import { TableCellProps } from './types';
import { tableCell, tableHeaderCell, tableFooterCell } from './styles';
import { useTableCellTag, useTableSectionTag } from '../hooks/useTable';

export const TableCell = memo(function TableCell({
  alignItems = 'center',
  justifyContent = 'flex-start',
  colSpan = 1,
  minWidth,
  className,
  color,
  media,
  accessory,
  onPress,
  children,
  // Only available when Children is null
  title,
  subtitle,
  description,
}: TableCellProps) {
  const tableSectionType = useTableSectionTag();
  const TableCellComponent = useTableCellTag();
  const TextComponent = TableCellComponent === 'th' ? TextHeadline : TextBody;

  if (process.env.NODE_ENV !== 'production') {
    if (children && (title || subtitle || description)) {
      throw new Error(
        'TableCell: Cannot use `title`, `subtitle` or `description` with `children`.',
      );
    }
  }

  const tableCellClass = cx(
    tableCell,
    tableSectionType === 'thead' && tableHeaderCell,
    tableSectionType === 'tfoot' && tableFooterCell,
    className,
  );

  return (
    <TableCellComponent className={tableCellClass} colSpan={colSpan} width={minWidth}>
      <Cell
        onPress={onPress}
        spacing={0}
        alignItems={alignItems}
        accessory={accessory}
        media={media}
      >
        {children ? (
          <TextComponent as="div" noWrap color={color ?? 'currentColor'}>
            <Box alignItems={alignItems} justifyContent={justifyContent} width="100%">
              {children}
            </Box>
          </TextComponent>
        ) : (
          <>
            <VStack flexGrow={1} flexShrink={1} dangerouslySetClassName={truncateClassName}>
              <TextComponent as="div" noWrap color={color ?? 'currentColor'}>
                {title}
              </TextComponent>
              {subtitle ? (
                <TextLabel2
                  as="div"
                  spacingTop={title ? 0.5 : 0}
                  spacingBottom={description ? 0.5 : 0}
                  overflow="truncate"
                >
                  {subtitle}
                </TextLabel2>
              ) : null}
            </VStack>

            {!!description && (
              <div className={overflowClassName}>
                <TextBody as="div" color="foregroundMuted">
                  {description}
                </TextBody>
              </div>
            )}
          </>
        )}
      </Cell>
    </TableCellComponent>
  );
});
