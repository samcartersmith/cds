import React, { Children, ReactNode } from 'react';
import { TableSectionContext } from '../context/TableSectionContext';

import { TableSectionProps, TableSectionInternalProps } from './types';

const TableSection = ({ as = 'tbody', className, children }: TableSectionInternalProps) => {
  const TableSectionComponent = as;

  // Provide the section type to child components (specifically TableCell) so that they can
  // be smart about how to render their content.
  return (
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    <TableSectionContext.Provider value={{ type: as }}>
      <TableSectionComponent className={className}>
        {Children.map(children, (child: ReactNode) => {
          // extra whitespace in table sections causes DOM validation errors
          // so we need to filter out empty children
          return child ?? null;
        })}
      </TableSectionComponent>
    </TableSectionContext.Provider>
  );
};

export const TableBody = ({ className, children }: TableSectionProps) => {
  return (
    <TableSection className={className} as="tbody">
      {children}
    </TableSection>
  );
};

export const TableFoot = ({ className, children }: TableSectionProps) => {
  return (
    <TableSection className={className} as="tfoot">
      {children}
    </TableSection>
  );
};

export const TableHead = ({ className, children }: TableSectionProps) => {
  return (
    <TableSection className={className} as="thead">
      {children}
    </TableSection>
  );
};
