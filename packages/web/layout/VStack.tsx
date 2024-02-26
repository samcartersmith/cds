import React, { forwardRef, memo } from 'react';
import { ForwardedRef, StackBaseProps } from '@cbhq/cds-common';

import { gap } from '../styles/gap';
import { cx } from '../utils/linaria';

import { Box, BoxElement, BoxProps } from './Box';

export type VStackProps<As extends BoxElement> = Omit<BoxProps<As>, 'flexDirection'> &
  StackBaseProps;

const a11yStyleOverrides = {
  marginTop: 0,
  marginBottom: 0,
};

export const VStack = memo(
  forwardRef(function VStack<As extends BoxElement = 'div'>(
    { as, children, gap: gapProp, style, className, spacingStart, ...props }: VStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) {
    const styles =
      as === 'ul' ? ({ ...a11yStyleOverrides, ...style } as React.CSSProperties) : style;

    const spacingStartValue = as === 'ul' && !spacingStart ? 0 : spacingStart;

    return (
      <Box
        {...props}
        ref={forwardedRef}
        as={as}
        className={cx(gapProp ? gap[gapProp] : null, className)}
        flexDirection="column"
        spacingStart={spacingStartValue}
        style={styles}
      >
        {children}
      </Box>
    );
  }),
);
