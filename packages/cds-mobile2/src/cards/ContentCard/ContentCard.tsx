import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { ContentCardBaseProps } from '@cbhq/cds-common2';
import { contentCardMaxWidth, contentCardMinWidth } from '@cbhq/cds-common2/tokens/card';

import { VStack, VStackProps } from '../../layout';

export type ContentCardProps = ContentCardBaseProps & VStackProps;

export const ContentCard = memo(
  forwardRef(function ContentCard(
    {
      testID,
      children,
      maxWidth = contentCardMaxWidth,
      minWidth = contentCardMinWidth,
      paddingX = 3,
      paddingY = 2,
      ...props
    }: ContentCardProps,
    ref: React.ForwardedRef<View>,
  ) {
    return (
      <VStack
        ref={ref}
        gap={1}
        maxWidth={maxWidth}
        minWidth={minWidth}
        paddingX={paddingX}
        paddingY={paddingY}
        testID={testID}
        {...props}
      >
        {children}
      </VStack>
    );
  }),
);
