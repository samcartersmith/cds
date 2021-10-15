import React, { memo } from 'react';

import { TableSectionProps } from './types/tableSectionTypes';
import { TableSection } from './TableSection';

export type TableFooterProps = TableSectionProps;
export const TableFooter = memo(({ children }: TableFooterProps) => {
  return <TableSection as="tfoot">{children}</TableSection>;
});

TableFooter.displayName = 'TableFooter';
