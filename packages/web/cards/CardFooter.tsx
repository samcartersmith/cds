import React, { memo } from 'react';
import { SharedProps } from '@cbhq/cds-common';

import { HStack } from '../layout/HStack';

export type CardFooterProps = {
  /** CardFooter takes one or many actions as children */
  children: React.ReactNode;
} & SharedProps;

export const CardFooter: React.FC<React.PropsWithChildren<CardFooterProps>> = memo(
  ({ children, testID }) => {
    return (
      <HStack spacingBottom={2} spacingHorizontal={3} testID={testID}>
        {children}
      </HStack>
    );
  },
);
