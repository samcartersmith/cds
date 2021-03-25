import React, { forwardRef } from 'react';

import { ForwardedRef } from '@cbhq/cds-common';

import { Box, BoxProps, BoxElement } from './Box';

export type HStackProps<As extends BoxElement> = Omit<BoxProps<As>, 'flexDirection'>;

export const HStack = forwardRef(
  <As extends BoxElement = 'div'>(
    props: HStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>
  ) => <Box {...props} ref={forwardedRef} flexDirection="row" />
);

HStack.displayName = 'HStack';
