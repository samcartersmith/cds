import React, { Children, forwardRef, memo } from 'react';
import { View } from 'react-native';
import { ForwardedRef, join, StackBaseProps } from '@cbhq/cds-common2';

import { type BoxProps, Box } from './Box';
import { Spacer } from './Spacer';

export type HStackProps = Omit<BoxProps, 'flexDirection'> & StackBaseProps;

export const HStack = memo(
  forwardRef(function HStack(
    { children, gap, ...props }: HStackProps,
    forwardedRef: ForwardedRef<View>,
  ) {
    const content = gap ? join(Children.toArray(children), <Spacer horizontal={gap} />) : children;

    return (
      <Box {...props} ref={forwardedRef} flexDirection="row">
        {content}
      </Box>
    );
  }),
);
