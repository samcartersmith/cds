import React, { Children, memo, useMemo } from 'react';
import type { SharedProps } from '@cbhq/cds-common2';

import { type TableSectionContextValue, TableSectionContext } from './context/TableSectionContext';

export type TableSectionTag = 'thead' | 'tbody' | 'tfoot' | 'div';

export type TableSectionProps = SharedProps & {
  children?: React.ReactNode;
  /**
   * Internal only
   * @default undefined
   */
  as?: TableSectionTag;
  className?: string;
};

export const TableSection = memo(
  ({ as = 'tbody', children, testID, className, ...rest }: TableSectionProps) => {
    const value: TableSectionContextValue = useMemo(() => ({ as }), [as]);
    const TableSectionComponent = as;

    // Provide the section type to child components (specifically TableCell) so that they can
    // be smart about how to render their content.
    return (
      <TableSectionContext.Provider value={value}>
        <TableSectionComponent className={className} data-testid={testID} {...rest}>
          {Children.map(children, (child: React.ReactNode) => {
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
