import React, { memo } from 'react';

import { TableSectionProps } from './types/tableSectionTypes';
import { TableSection } from './TableSection';

export type TableFootProps = TableSectionProps;
export const TableFoot = memo(({ className, children }: TableFootProps) => {
  return (
    <TableSection className={className} as="tfoot">
      {children}
    </TableSection>
  );
});

TableFoot.displayName = 'TableFoot';
