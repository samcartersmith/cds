import React, { Children, memo, ReactNode } from 'react';

import { TableSectionContext } from './context/TableSectionContext';
import { TableSectionProps } from './types/tableSectionTypes';

export const TableSection = memo(
  ({ as = 'tbody', children, testID, ...rest }: TableSectionProps) => {
    const TableSectionComponent = as;

    // Provide the section type to child components (specifically TableCell) so that they can
    // be smart about how to render their content.
    return (
      // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
      <TableSectionContext.Provider value={{ type: as }}>
        <TableSectionComponent data-testid={testID} {...rest}>
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
