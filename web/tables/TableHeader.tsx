import React, { memo } from 'react';

import { TableSectionProps } from './types/tableSectionTypes';
import { TableSection } from './TableSection';

export type TableHeaderProps = TableSectionProps;
export const TableHeader = memo(({ children, testID, ...rest }: TableHeaderProps) => {
  return (
    <TableSection as="thead" data-testid={testID} {...rest}>
      {children}
    </TableSection>
  );
});

TableHeader.displayName = 'TableHeader';
