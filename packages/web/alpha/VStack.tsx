import React, { forwardRef, memo } from 'react';
import { ForwardedRef, StackBaseProps } from '@cbhq/cds-common';

import { Box, BoxElement, BoxProps } from '../layout/Box';
import { gap } from '../styles/gap';
import { cx } from '../utils/linaria';

export type VStackProps<As extends BoxElement> = Omit<BoxProps<As>, 'flexDirection'> &
  StackBaseProps;

const a11yStyleOverrides = {
  marginTop: 0,
  marginBottom: 0,
};

export const VStack = memo(
  forwardRef(function VStack<As extends BoxElement = 'div'>(
    {
      as,
      children,
      gap: gapProp,
      dangerouslySetClassName,
      dangerouslySetStyle,
      spacingStart,
      ...props
    }: VStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) {
    const styles =
      as === 'ul'
        ? ({ ...a11yStyleOverrides, ...dangerouslySetStyle } as React.CSSProperties)
        : dangerouslySetStyle;

    const spacingStartValue = as === 'ul' && !spacingStart ? 0 : spacingStart;

    return (
      <Box
        {...props}
        ref={forwardedRef}
        as={as}
        dangerouslySetClassName={cx(gapProp ? gap[gapProp] : null, dangerouslySetClassName)}
        dangerouslySetStyle={styles}
        flexDirection="column"
        spacingStart={spacingStartValue}
      >
        {children}
      </Box>
    );
  }),
);
