import React, { forwardRef, memo } from 'react';
import { ForwardedRef, StackBaseProps } from '@cbhq/cds-common';

import { gap } from '../styles/gap';
import { cx } from '../utils/linaria';

import { Box, BoxElement, BoxProps } from './Box';

export type HStackProps<As extends BoxElement> = Omit<BoxProps<As>, 'flexDirection'> &
  StackBaseProps;

export const HStack = memo(
  forwardRef(function HStack<As extends BoxElement = 'div'>(
    { children, gap: gapProp, className, ...props }: HStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) {
    return (
      <Box
        {...props}
        ref={forwardedRef}
        className={cx(gapProp ? gap[gapProp] : null, className)}
        flexDirection="row"
      >
        {children}
      </Box>
    );
  }),
);
