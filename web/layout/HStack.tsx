import { forwardRef } from 'react';

import { ForwardedRef } from '@cbhq/cds-common';

import { Box, BoxProps, BoxElement } from './Box';

export const HStack = forwardRef(
  <As extends BoxElement = 'div'>(props: BoxProps<As>, forwardedRef: ForwardedRef<HTMLElement>) => (
    <Box {...props} ref={forwardedRef} flexDirection="row" />
  )
);

HStack.displayName = 'HStack';

export type { BoxProps as HStackProps };
