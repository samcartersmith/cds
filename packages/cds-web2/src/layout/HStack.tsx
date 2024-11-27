import React, { type ForwardedRef, forwardRef, memo } from 'react';

import { type PolymorphicBoxProps, Box } from './Box';

// eslint-disable-next-line @typescript-eslint/ban-types
export type HStackBaseProps = {};

export type HStackProps<AsComponent extends React.ElementType> = PolymorphicBoxProps<
  AsComponent,
  HStackBaseProps
>;

export const HStack = memo(
  forwardRef(
    <AsComponent extends React.ElementType = 'div'>(
      { flexDirection = 'row', ...props }: HStackProps<AsComponent>,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      return <Box ref={ref} flexDirection={flexDirection} {...props} />;
    },
  ),
);

HStack.displayName = 'HStack';
