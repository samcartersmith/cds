import React, { memo } from 'react';

import { type PolymorphicBoxProps, Box } from './Box';

export type GridBaseProps = {
  rows?: number;
  columns?: number;
};

export type GridProps<AsComponent extends React.ElementType> = PolymorphicBoxProps<
  AsComponent,
  GridBaseProps
>;

export const Grid = memo(
  <AsComponent extends React.ElementType = 'div'>({
    display = 'grid',
    rows,
    columns,
    ...props
  }: GridProps<AsComponent>) => {
    return (
      <Box
        display={display}
        gridTemplateColumns={typeof rows !== 'undefined' ? `repeat(${columns}, 1fr)` : undefined}
        gridTemplateRows={typeof rows !== 'undefined' ? `repeat(${rows}, 1fr)` : undefined}
        {...props}
      />
    );
  },
);

Grid.displayName = 'Grid';
