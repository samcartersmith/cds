import React, { Children, forwardRef, memo } from 'react';
import { ForwardedRef, join, StackBaseProps } from '@cbhq/cds-common';

import { HStack as NewHStack } from '../alpha/HStack';
import { useFeatureFlag } from '../system/useFeatureFlag';

import { Box, BoxElement, BoxProps } from './Box';
import { Spacer } from './Spacer';

export type HStackProps<As extends BoxElement> = Omit<BoxProps<As>, 'flexDirection'> &
  StackBaseProps;

export const OldHStack = memo(
  forwardRef(function OldHStack<As extends BoxElement = 'div'>(
    { as, children, gap, ...props }: HStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) {
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
  }),
);

/**
 * Please help us test the new simplified HStack which replaces extra DOM nodes when the 'gap' property is present,
 * for the new ['gap'](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) CSS property.
 * To use the new HStack you can do one of the following:
 *
 * - **Option 1** - Add the `flexGap` feature flag to your root [FeatureFlagProvider](https://cds.cbhq.net/components/feature-flag-provider).
 * - **Option 2** - Import the new HStack directly from "@cbhq/cds-web/alpha/HStack".
 */
export const HStack = memo(
  forwardRef(function HStack<As extends BoxElement = 'div'>(
    props: HStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) {
    const hasFlexGap = useFeatureFlag('flexGap');
    const Component = hasFlexGap ? NewHStack : OldHStack;
    return <Component {...props} ref={forwardedRef} />;
  }),
);
