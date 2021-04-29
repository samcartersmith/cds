import React, { Children, memo } from 'react';

import { join, StackBaseProps } from '@cbhq/cds-common';

import { Box, BoxProps } from './Box';
import { Spacer } from './Spacer';

export interface HStackProps extends Omit<BoxProps, 'flexDirection'>, StackBaseProps {}

export const HStack = memo(function HStack({ children, gap, ...props }: HStackProps) {
  const content = gap ? join(Children.toArray(children), <Spacer horizontal={gap} />) : children;

  return (
    <Box {...props} flexDirection="row">
      {content}
    </Box>
  );
});
