import React, { Children, memo, ReactNode, useMemo } from 'react';

import { TableSectionContext } from './context/TableSectionContext';
import { TableSectionCtx, TableSectionProps } from './types/tableSectionTypes';

export const TableSection = memo(
  ({ as = 'tbody', children, testID, dangerouslySetClassName, ...rest }: TableSectionProps) => {
    const value: TableSectionCtx = useMemo(() => ({ as }), [as]);
    const TableSectionComponent = as;

    // Provide the section type to child components (specifically TableCell) so that they can
    // be smart about how to render their content.
    return (
      <TableSectionContext.Provider value={value}>
        <TableSectionComponent className={dangerouslySetClassName} data-testid={testID} {...rest}>
          {Children.map(children, (child: ReactNode) => {
            // extra whitespace in table sections causes DOM validation errors
            // so we need to filter out empty children
            return child ?? null;
          })}
        </TableSectionComponent>
      </TableSectionContext.Provider>
    );
  },
);

TableSection.displayName = 'TableSection';
