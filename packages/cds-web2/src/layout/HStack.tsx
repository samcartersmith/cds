import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { type BoxBaseProps, type BoxDefaultElement, Box } from './Box';

export type HStackBaseProps = BoxBaseProps;

export type HStackProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  HStackBaseProps
>;

type HStackComponent = (<AsComponent extends React.ElementType = BoxDefaultElement>(
  props: HStackProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const HStack: HStackComponent = forwardRef<
  React.ReactElement<HStackBaseProps>,
  HStackBaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, flexDirection = 'row', ...props }: HStackProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    return (
      <Box
        ref={ref}
        as={as satisfies React.ElementType | undefined}
        flexDirection={flexDirection}
        {...props}
      />
    );
  },
);

HStack.displayName = 'HStack';
