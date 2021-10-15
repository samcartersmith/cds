import React, { memo } from 'react';

import { TableSectionProps } from './types/tableSectionTypes';
import { TableSection } from './TableSection';

export type TableHeadProps = TableSectionProps;
export const TableHead = memo(({ children }: TableHeadProps) => {
  return <TableSection as="thead">{children}</TableSection>;
});

TableHead.displayName = 'TableHead';
