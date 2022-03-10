import React, { Children, forwardRef } from 'react';

import { join, StackBaseProps, ForwardedRef } from '@cbhq/cds-common';

import { Box, BoxProps, BoxElement } from './Box';
import { Spacer } from './Spacer';

export type HStackProps<As extends BoxElement> = Omit<BoxProps<As>, 'flexDirection'> &
  StackBaseProps;

export const HStack = forwardRef(
  <As extends BoxElement = 'div'>(
    { as, children, gap, ...props }: HStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) => {
    const content = gap
      ? join(
          Children.toArray(children),
          <Spacer as={as === 'ul' || as === 'ol' ? 'li' : 'span'} horizontal={gap} />,
        )
      : children;

    return (
      <Box {...props} ref={forwardedRef} as={as} flexDirection="row">
        {content}
      </Box>
    );
  },
);

HStack.displayName = 'HStack';
