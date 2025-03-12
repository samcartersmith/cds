import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { ForwardedRef, StackBaseProps } from '@cbhq/cds-common2';

import { Box, BoxProps } from './Box';

export type VStackProps = BoxProps & StackBaseProps;

export const VStack = memo(
  forwardRef(function VStack(
    { flexDirection = 'column', ...props }: VStackProps,
    forwardedRef: ForwardedRef<View>,
  ) {
    return <Box ref={forwardedRef} flexDirection={flexDirection} {...props} />;
  }),
);
