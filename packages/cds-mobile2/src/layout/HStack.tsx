import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { StackBaseProps } from '@cbhq/cds-common2';

import { Box, type BoxProps } from './Box';

export type HStackProps = BoxProps & StackBaseProps;

export const HStack = memo(
  forwardRef(function HStack(
    { flexDirection = 'row', ...props }: HStackProps,
    forwardedRef: React.ForwardedRef<View>,
  ) {
    return <Box ref={forwardedRef} flexDirection={flexDirection} {...props} />;
  }),
);
