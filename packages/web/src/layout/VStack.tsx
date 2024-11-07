import React, { Children, forwardRef, memo, useMemo } from 'react';
import { ForwardedRef, join, SpacingScale, StackBaseProps } from '@cbhq/cds-common';

import { gap } from '../styles/gap';
import { cx } from '../utils/linaria';

import { Box, BoxElement, BoxProps } from './Box';
import { Spacer } from './Spacer';

export type VStackProps<As extends BoxElement> = Omit<BoxProps<As>, 'flexDirection'> &
  StackBaseProps & {
    /**
     * @deprecated
     * This is an escape hatch to enable spacer for gaps.
     * Please use css gap whenever possible for better performance.
     */
    spacerGap?: SpacingScale;
  };

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
      style,
      className,
      spacingStart,
      spacerGap,
      ...props
    }: VStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) {
    const styles =
      as === 'ul' ? ({ ...a11yStyleOverrides, ...style } as React.CSSProperties) : style;

    const spacingStartValue = as === 'ul' && !spacingStart ? 0 : spacingStart;

    const content = useMemo(
      () =>
        spacerGap && !gapProp
          ? join(
              Children.toArray(children),
              <Spacer as={as === 'ul' || as === 'ol' ? 'li' : 'span'} vertical={spacerGap} />,
            )
          : children,
      [as, children, gapProp, spacerGap],
    );

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
        {content}
      </Box>
    );
  }),
);
