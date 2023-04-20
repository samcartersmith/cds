import React, { Children, forwardRef, memo } from 'react';
import { ForwardedRef, join, StackBaseProps } from '@cbhq/cds-common';

import { VStack as NewVStack } from '../alpha/VStack';
import { useFeatureFlag } from '../system/useFeatureFlag';

import { Box, BoxElement, BoxProps } from './Box';
import { Spacer } from './Spacer';

export type VStackProps<As extends BoxElement> = Omit<BoxProps<As>, 'flexDirection'> &
  StackBaseProps;

const OldVStack = memo(
  forwardRef(function OldVStack<As extends BoxElement = 'div'>(
    { as, children, gap, ...props }: VStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) {
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
  }),
);

/**
 * Please help us test the new simplified VStack which replaces extra DOM nodes when the 'gap' property is present,
 * for the new ['gap'](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) CSS property.
 * To use the new VStack you can do one of the following:
 *
 * - **Option 1** - Add the `flexGap` feature flag to your root [FeatureFlagProvider](https://cds.cbhq.net/components/feature-flag-provider).
 * - **Option 2** - Import the new VStack directly from "@cbhq/cds-web/alpha/VStack".
 */
export const VStack = memo(
  forwardRef(function VStack<As extends BoxElement = 'div'>(
    props: VStackProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) {
    const hasFlexGap = useFeatureFlag('flexGap');
    const Component = hasFlexGap ? NewVStack : OldVStack;
    return <Component {...props} ref={forwardedRef} />;
  }),
);
