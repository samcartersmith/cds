import React, { memo } from 'react';
import { css, cx } from '@linaria/core';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { TableSection, type TableSectionProps } from './TableSection';

export type TableHeaderProps = TableSectionProps & {
  /**
   * Use to make a header stick to the top of the table when scrolled
   * This will require setting a height or maxHeight on the Table or its parent
   * @default false
   */
  sticky?: boolean;
};

export const tableHeaderStaticClassName = 'cds-table-header';

const tableStickyStyle = css`
  position: sticky;
  top: 0;
  z-index: ${zIndex.interactable};
`;

export const TableHeader = memo(({ children, sticky, testID, ...props }: TableHeaderProps) => {
  return (
    <TableSection
      as="thead"
      className={cx(tableHeaderStaticClassName, sticky && tableStickyStyle)}
      data-testid={testID}
      {...props}
    >
      {children}
    </TableSection>
  );
});

TableHeader.displayName = 'TableHeader';
