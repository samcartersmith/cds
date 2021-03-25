import React, { forwardRef } from 'react';

import { ForwardedRef } from '@cbhq/cds-common';

import { Box, BoxProps, BoxElement } from './Box';

export type VStackProps<As extends BoxElement> = Omit<BoxProps<As>, 'flexDirection'>;

export const VStack = forwardRef(
  <As extends BoxElement = 'div'>(
    props: VStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>
  ) => <Box {...props} ref={forwardedRef} flexDirection="column" />
);

VStack.displayName = 'VStack';
