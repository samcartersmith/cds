import React, { memo } from 'react';

import { TableSectionProps } from './types/tableSectionTypes';
import { TableSection } from './TableSection';

export type TableFooterProps = TableSectionProps;
export const TableFooter = memo(({ children, testID }: TableFooterProps) => {
  return (
    <TableSection as="tfoot" data-testid={testID}>
      {children}
    </TableSection>
  );
});

TableFooter.displayName = 'TableFooter';
