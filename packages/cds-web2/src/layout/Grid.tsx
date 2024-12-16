import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { type BoxBaseProps, type BoxDefaultElement, Box } from './Box';

export type GridBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    rows?: number;
    columns?: number;
  }
>;

export type GridProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  GridBaseProps
>;

type GridComponent = (<AsComponent extends React.ElementType = BoxDefaultElement>(
  props: GridProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Grid: GridComponent = forwardRef<React.ReactElement<GridBaseProps>, GridBaseProps>(
  <AsComponent extends React.ElementType>(
    { as, rows, columns, display = 'grid', ...props }: GridProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    return (
      <Box
        ref={ref}
        as={as satisfies React.ElementType | undefined}
        display={display}
        gridTemplateColumns={typeof rows !== 'undefined' ? `repeat(${columns}, 1fr)` : undefined}
        gridTemplateRows={typeof rows !== 'undefined' ? `repeat(${rows}, 1fr)` : undefined}
        {...props}
      />
    );
  },
);

Grid.displayName = 'Grid';
