import React, { memo } from 'react';

import { gutter } from '../tokens/sizing';
import type { CardBoxProps, CardFooterProps } from '../types';

type CreateCardFooterParams = {
  HStack: React.ComponentType<React.PropsWithChildren<CardBoxProps>>;
};

export function createCardFooter({ HStack }: CreateCardFooterParams) {
  const CardFooter: React.FC<React.PropsWithChildren<CardFooterProps>> = memo(function CardFooter({
    children,
    paddingBottom = 2,
    paddingX = gutter,
    testID,
    ...otherProps
  }) {
    return (
      <HStack paddingBottom={paddingBottom} paddingX={paddingX} testID={testID} {...otherProps}>
        {children}
      </HStack>
    );
  });

  CardFooter.displayName = 'CardFooter';
  return CardFooter;
}
