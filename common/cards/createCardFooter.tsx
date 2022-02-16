import React, { memo } from 'react';

import { gutter } from '../tokens/sizing';
import type { SpacingProps, CardBoxProps, SharedProps } from '../types';

type CreateCardFooterParams = {
  HStack: React.ComponentType<SpacingProps & SharedProps>;
};

export type CardFooterProps = CardBoxProps & {
  /** CardFooter takes one or many actions as children */
  children: React.ReactNode;
};

export function createCardFooter({ HStack }: CreateCardFooterParams) {
  const CardFooter: React.FC<CardFooterProps> = memo(function CardFooter({
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
