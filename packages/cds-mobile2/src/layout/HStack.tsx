import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { ForwardedRef, StackBaseProps } from '@cbhq/cds-common2';

import { type BoxProps, Box } from './Box';

export type HStackProps = BoxProps & StackBaseProps;

export const HStack = memo(
  forwardRef(function HStack(
    { flexDirection = 'row', ...props }: HStackProps,
    forwardedRef: ForwardedRef<View>,
  ) {
    return <Box ref={forwardedRef} flexDirection={flexDirection} {...props} />;
  }),
);
