import React, { memo } from 'react';

import { gutter } from '../tokens/sizing';
import type { AvatarBaseProps, PaletteForeground, TextBaseProps } from '../types';
import type { CardBoxProps, CardHeaderProps } from '../types/alpha';

type CreateCardHeaderParams<T> = {
  HStack: React.ComponentType<React.PropsWithChildren<CardBoxProps>>;
  VStack: React.ComponentType<React.PropsWithChildren<CardBoxProps>>;
  Avatar: React.ComponentType<React.PropsWithChildren<AvatarBaseProps>>;
  TextLabel1: React.ComponentType<React.PropsWithChildren<TextBaseProps>>;
  TextLegal: React.ComponentType<
    React.PropsWithChildren<
      | { color?: PaletteForeground }
      | (T extends { color?: infer Color } ? { color?: Color } : never)
    >
  >;
};

export function createCardHeader<T>({
  Avatar,
  HStack,
  VStack,
  TextLabel1,
  TextLegal,
}: CreateCardHeaderParams<T>) {
  const CardHeader = memo(function CardHeader({
    avatar,
    metadata,
    author,
    action,
    testID,
  }: CardHeaderProps) {
    return (
      <HStack
        justifyContent="space-between"
        alignItems="center"
        spacingTop={2}
        spacingHorizontal={gutter}
        testID={testID}
      >
        <HStack flexGrow={1} alignItems="center" gap={1}>
          {avatar ? <Avatar alt={author ?? avatar} src={avatar} size="xl" shape="circle" /> : null}
          <VStack>
            {author ? <TextLabel1>{author}</TextLabel1> : null}
            {metadata ? <TextLegal color="foregroundMuted">{metadata}</TextLegal> : null}
          </VStack>
        </HStack>
        {action}
      </HStack>
    );
  });

  CardHeader.displayName = 'CardHeader';
  return CardHeader;
}
