import React, { memo, TdHTMLAttributes } from 'react';

import { VStack } from '../alpha/VStack';
import { Icon } from '../icons';
import { Box } from '../layout';

import { TableCell } from './TableCell';

export type TableCellSortIconProps = {
  direction?: TdHTMLAttributes<HTMLTableCellElement>['aria-sort'];
};
export const TableCellSortIcon = memo(({ direction }: TableCellSortIconProps) => {
  const upColor = direction === 'ascending' ? 'primary' : 'foregroundMuted';
  const downColor = direction === 'descending' ? 'primary' : 'foregroundMuted';

  return (
    <VStack gap={0.5}>
      <Box offsetBottom={0.5}>
        <Icon
          color={upColor}
          name="sortUpCenter"
          size="xs"
          aria-hidden="true"
          testID="table-sort-icon-up"
        />
      </Box>
      <Box offsetTop={0.5}>
        <Icon
          color={downColor}
          name="sortDownCenter"
          size="xs"
          aria-hidden="true"
          testID="table-sort-icon-down"
        />
      </Box>
    </VStack>
  );
});

TableCell.displayName = 'TableCellSortIcon';
