import React, { Children, forwardRef } from 'react';

import { join, StackBaseProps, ForwardedRef } from '@cbhq/cds-common';

import { Box, BoxProps, BoxElement } from './Box';
import { Spacer } from './Spacer';

export interface VStackProps<As extends BoxElement>
  extends Omit<BoxProps<As>, 'flexDirection'>,
    StackBaseProps {}

export const VStack = forwardRef(
  <As extends BoxElement = 'div'>(
    { as, children, gap, ...props }: VStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) => {
    const content = gap
      ? join(
          Children.toArray(children),
          <Spacer as={as === 'ul' || as === 'ol' ? 'li' : 'span'} vertical={gap} />,
        )
      : children;

    return (
      <Box {...props} ref={forwardedRef} as={as} flexDirection="column">
        {content}
      </Box>
    );
  },
);

VStack.displayName = 'VStack';
