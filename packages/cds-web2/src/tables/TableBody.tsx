import React, { memo } from 'react';

import { type TableSectionProps, TableSection } from './TableSection';

export type TableBodyProps = TableSectionProps;

export const TableBody = memo(({ children, testID, ...rest }: TableBodyProps) => {
  return (
    <TableSection as="tbody" testID={testID} {...rest}>
      {children}
    </TableSection>
  );
});

TableBody.displayName = 'TableBody';
