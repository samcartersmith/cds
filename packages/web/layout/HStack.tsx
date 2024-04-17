import React, { Children, forwardRef, memo, useMemo } from 'react';
import { ForwardedRef, join, SpacingScale, StackBaseProps } from '@cbhq/cds-common';

import { gap } from '../styles/gap';
import { cx } from '../utils/linaria';

import { Box, BoxElement, BoxProps } from './Box';
import { Spacer } from './Spacer';

export type HStackProps<As extends BoxElement> = Omit<BoxProps<As>, 'flexDirection'> &
  StackBaseProps & {
    /**
     * @deprecated
     * This is an escape hatch to enable spacer for gaps.
     * Please use css gap whenever possible for better performance.
     */
    spacerGap?: SpacingScale;
  };

export const HStack = memo(
  forwardRef(function HStack<As extends BoxElement = 'div'>(
    { as, children, gap: gapProp, className, spacerGap, ...props }: HStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) {
    const content = useMemo(
      () =>
        spacerGap && !gapProp
          ? join(
              Children.toArray(children),
              <Spacer as={as === 'ul' || as === 'ol' ? 'li' : 'span'} horizontal={spacerGap} />,
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
        flexDirection="row"
      >
        {content}
      </Box>
    );
  }),
);
