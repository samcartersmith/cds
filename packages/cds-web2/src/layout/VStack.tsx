import React, { type ForwardedRef, forwardRef, memo } from 'react';

import { type PolymorphicBoxProps, Box } from './Box';

// eslint-disable-next-line @typescript-eslint/ban-types
export type VStackBaseProps = {};

export type VStackProps<AsComponent extends React.ElementType> = PolymorphicBoxProps<
  AsComponent,
  VStackBaseProps
>;

export const VStack = memo(
  forwardRef(
    <AsComponent extends React.ElementType = 'div'>(
      { flexDirection = 'column', ...props }: VStackProps<AsComponent>,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      return <Box ref={ref} flexDirection={flexDirection} {...props} />;
    },
  ),
);

VStack.displayName = 'VStack';
