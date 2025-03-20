import React, { memo } from 'react';
import { gutter } from '@cbhq/cds-common2/tokens/sizing';
import type { CardFooterProps as CommonCardFooterProps } from '@cbhq/cds-common2/types';

import { HStack } from '../layout/HStack';

export type CardFooterProps = CommonCardFooterProps;

export const CardFooter = memo(function CardFooter({
  children,
  paddingBottom = 2,
  paddingX = gutter,
  testID,
  ...otherProps
}: CardFooterProps) {
  return (
    <HStack paddingBottom={paddingBottom} paddingX={paddingX} testID={testID} {...otherProps}>
      {children}
    </HStack>
  );
});
