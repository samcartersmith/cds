import React, { memo } from 'react';
import { gutter } from '@cbhq/cds-common2/tokens/sizing';
import type { CardFooterProps } from '@cbhq/cds-common2/types';

import { HStack } from '../layout/HStack';

export const CardFooter: React.FC<React.PropsWithChildren<CardFooterProps>> = memo(
  function CardFooter({ children, paddingBottom = 2, paddingX = gutter, testID, ...otherProps }) {
    return (
      <HStack paddingBottom={paddingBottom} paddingX={paddingX} testID={testID} {...otherProps}>
        {children}
      </HStack>
    );
  },
);
