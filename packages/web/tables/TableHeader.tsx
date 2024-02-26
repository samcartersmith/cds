import React, { memo } from 'react';

import { cx } from '../utils/linaria';

import { tableHeaderStaticClassName, tableStickyClassName } from './styles/tableStyles';
import { TableSectionProps } from './types/tableSectionTypes';
import { TableSection } from './TableSection';

export type TableHeaderProps = TableSectionProps & {
  /**
   * Use to make a header stick to the top of the table when scrolled
   * This will require setting a height or maxHeight on the Table or its parent
   * @default false
   */
  sticky?: boolean;
};

export const TableHeader = memo(({ children, sticky, testID, ...rest }: TableHeaderProps) => {
  return (
    <TableSection
      as="thead"
      className={cx(tableHeaderStaticClassName, sticky && tableStickyClassName)}
      data-testid={testID}
      {...rest}
    >
      {children}
    </TableSection>
  );
});

TableHeader.displayName = 'TableHeader';
