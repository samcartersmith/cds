import React, { memo } from 'react';

import { gutter } from '../tokens/sizing';
import type { CardBoxProps, CardFooterProps } from '../types';

type CreateCardFooterParams = {
  HStack: React.ComponentType<React.PropsWithChildren<CardBoxProps>>;
};

export function createCardFooter({ HStack }: CreateCardFooterParams) {
  const CardFooter: React.FC<React.PropsWithChildren<CardFooterProps>> = memo(function CardFooter({
    children,
    spacingBottom = 2,
    spacingHorizontal = gutter,
    testID,
    ...otherProps
  }) {
    return (
      <HStack
        spacingBottom={spacingBottom}
        spacingHorizontal={spacingHorizontal}
        testID={testID}
        {...otherProps}
      >
        {children}
      </HStack>
    );
  });

  CardFooter.displayName = 'CardFooter';
  return CardFooter;
}
