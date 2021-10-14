import React, { memo } from 'react';

import { TableSectionProps } from './types/tableSectionTypes';
import { TableSection } from './TableSection';

export type TableBodyProps = TableSectionProps;
export const TableBody = memo(({ className, children }: TableBodyProps) => {
  return (
    <TableSection className={className} as="tbody">
      {children}
    </TableSection>
  );
});

TableBody.displayName = 'TableBody';
