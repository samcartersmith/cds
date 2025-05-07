import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { SharedProps } from '@cbhq/cds-common2/types';

import { HStack, HStackProps } from '../../layout';

export type ContentCardFooterBaseProps = SharedProps & {
  children?: React.ReactNode;
};

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
