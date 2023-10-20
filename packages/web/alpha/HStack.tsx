import React, { forwardRef, memo } from 'react';
import { ForwardedRef, StackBaseProps } from '@cbhq/cds-common';

import { Box, BoxElement, BoxProps } from '../layout/Box';
import { gap } from '../styles/gap';
import { cx } from '../utils/linaria';

export type HStackProps<As extends BoxElement> = Omit<BoxProps<As>, 'flexDirection'> &
  StackBaseProps;

export const HStack = memo(
  forwardRef(function HStack<As extends BoxElement = 'div'>(
    { children, gap: gapProp, dangerouslySetClassName, ...props }: HStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) {
    return (
      <Box
        {...props}
        ref={forwardedRef}
        dangerouslySetClassName={cx(gapProp ? gap[gapProp] : null, dangerouslySetClassName)}
        flexDirection="row"
      >
        {children}
      </Box>
    );
  }),
);
