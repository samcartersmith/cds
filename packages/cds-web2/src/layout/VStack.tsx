import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { type BoxBaseProps, type BoxDefaultElement, Box } from './Box';

export type VStackBaseProps = BoxBaseProps;

export type VStackProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  VStackBaseProps
>;

type VStackComponent = (<AsComponent extends React.ElementType = BoxDefaultElement>(
  props: VStackProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const VStack: VStackComponent = forwardRef<
  React.ReactElement<VStackBaseProps>,
  VStackBaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, flexDirection = 'column', ...props }: VStackProps<AsComponent>,
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

VStack.displayName = 'VStack';
