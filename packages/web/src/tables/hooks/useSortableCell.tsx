import React from 'react';

import { TableCellSortIcon, TableCellSortIconProps } from '../TableCellSortIcon';

export type UseSortableCellProps<T extends string = string> = {
  sortBy: T;
  sortDirection: TableCellSortIconProps['direction'];
  onChange: (key: T) => void;
};

export const useSortableCell = <T extends string>({
  sortBy,
  sortDirection,
  onChange,
}: UseSortableCellProps<T>) => {
  return function getSortableProps(key: T) {
    const isSorted = sortBy === key;

    return {
      onPress: () => onChange(key),
      color: isSorted ? 'primary' : 'foregroundMuted',
      end: <TableCellSortIcon direction={isSorted ? sortDirection : undefined} />,
      'aria-sort': isSorted ? sortDirection : undefined,
    } as const;
  };
};
