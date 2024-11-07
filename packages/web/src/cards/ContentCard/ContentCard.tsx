import React, { forwardRef, memo } from 'react';
import { ContentCardBaseProps } from '@cbhq/cds-common';
import { contentCardMaxWidth, contentCardMinWidth } from '@cbhq/cds-common/tokens/card';

import { BoxElement, VStack, VStackProps } from '../../layout';

export type ContentCardProps = ContentCardBaseProps & VStackProps<BoxElement>;

export const ContentCard = memo(
  forwardRef(function ContentCard(
    {
      testID,
      children,
      maxWidth = contentCardMaxWidth,
      minWidth = contentCardMinWidth,
      spacingHorizontal = 3,
      spacingVertical = 2,
      ...props
    }: ContentCardProps,
    ref: React.Ref<HTMLElement>,
  ) {
    return (
      <VStack
        ref={ref}
        gap={1}
        maxWidth={maxWidth}
        minWidth={minWidth}
        spacingHorizontal={spacingHorizontal}
        spacingVertical={spacingVertical}
        testID={testID}
        {...props}
      >
        {children}
      </VStack>
    );
  }),
);
