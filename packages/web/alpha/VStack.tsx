import React, { forwardRef, memo } from 'react';
import { ForwardedRef, StackBaseProps } from '@cbhq/cds-common';

import { Box, BoxElement, BoxProps } from '../layout/Box';
import { gap } from '../styles/gap';
import { cx } from '../utils/linaria';

export type VStackProps<As extends BoxElement> = Omit<BoxProps<As>, 'flexDirection'> &
  StackBaseProps;

export const VStack = memo(
  forwardRef(function VStack<As extends BoxElement = 'div'>(
    { as, children, gap: gapProp, dangerouslySetClassName, ...props }: VStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) {
    return (
      <Box
        {...props}
        ref={forwardedRef}
        flexDirection="column"
        dangerouslySetClassName={cx(gapProp ? gap[gapProp] : null, dangerouslySetClassName)}
      >
        {children}
      </Box>
    );
  }),
);
