import React, { Children, forwardRef, memo } from 'react';
import { View } from 'react-native';

import { join, StackBaseProps, ForwardedRef } from '@cbhq/cds-common';

import { Box, BoxProps } from './Box';
import { Spacer } from './Spacer';

export type VStackProps = Omit<BoxProps, 'flexDirection'> & StackBaseProps;

export const VStack = memo(
  forwardRef(({ children, gap, ...props }: VStackProps, forwardedRef: ForwardedRef<View>) => {
    const content = gap ? join(Children.toArray(children), <Spacer vertical={gap} />) : children;

    return (
      <Box {...props} ref={forwardedRef} flexDirection="column">
        {content}
      </Box>
    );
  }),
);
