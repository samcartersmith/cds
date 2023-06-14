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
        as={as}
        ref={forwardedRef}
        flexDirection="column"
        spacingStart={spacingStartValue}
        dangerouslySetStyle={styles}
        dangerouslySetClassName={cx(gapProp ? gap[gapProp] : null, dangerouslySetClassName)}
      >
        {children}
      </Box>
    );
  }),
);
