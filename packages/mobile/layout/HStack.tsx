import React, { Children, forwardRef, memo } from 'react';
import { View } from 'react-native';
import { ForwardedRef, join, StackBaseProps } from '@cbhq/cds-common';

import { Box, BoxProps } from './Box';
import { Spacer } from './Spacer';

export type HStackProps = Omit<BoxProps, 'flexDirection'> & StackBaseProps;

export const HStack = memo(
  forwardRef(({ children, gap, ...props }: HStackProps, forwardedRef: ForwardedRef<View>) => {
    const content = gap ? join(Children.toArray(children), <Spacer horizontal={gap} />) : children;

    return (
      <Box {...props} ref={forwardedRef} flexDirection="row">
        {content}
      </Box>
    );
  }),
);
