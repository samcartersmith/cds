import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { ContentCardFooterBaseProps } from '@cbhq/cds-common2';

import { HStack, HStackProps } from '../../layout';

export type ContentCardFooterProps = ContentCardFooterBaseProps & HStackProps;

export const ContentCardFooter = memo(
  forwardRef(
    ({ testID, children, ...props }: ContentCardFooterProps, ref: React.ForwardedRef<View>) => (
      <HStack ref={ref} justifyContent="space-between" testID={testID} {...props}>
        {children}
      </HStack>
    ),
  ),
);
