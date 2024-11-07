import React, { memo } from 'react';

import { TableSectionProps } from './types/tableSectionTypes';
import { TableSection } from './TableSection';

export type TableFooterProps = TableSectionProps;
export const TableFooter = memo(({ children, testID, ...rest }: TableFooterProps) => {
  return (
    <TableSection as="tfoot" data-testid={testID} {...rest}>
      {children}
    </TableSection>
  );
});

TableFooter.displayName = 'TableFooter';
