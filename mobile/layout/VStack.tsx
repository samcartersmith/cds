import React, { Children, memo } from 'react';

import { join, StackBaseProps } from '@cbhq/cds-common';

import { Box, BoxProps } from './Box';
import { Spacer } from './Spacer';

export interface VStackProps extends Omit<BoxProps, 'flexDirection'>, StackBaseProps {}

export const VStack = memo(function VStack({ children, gap, ...props }: VStackProps) {
  const content = gap ? join(Children.toArray(children), <Spacer vertical={gap} />) : children;

  return (
    <Box {...props} flexDirection="column">
      {content}
    </Box>
  );
});
