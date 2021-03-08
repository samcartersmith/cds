import React, { forwardRef } from 'react';

import { ForwardedRef } from '@cbhq/cds-common';

import { Box, BoxProps, BoxElement } from './Box';

export const VStack = forwardRef(
  <As extends BoxElement = 'div'>(props: BoxProps<As>, forwardedRef: ForwardedRef<HTMLElement>) => (
    <Box {...props} ref={forwardedRef} flexDirection="column" />
  )
);

VStack.displayName = 'VStack';

export type { BoxProps as VStackProps };
