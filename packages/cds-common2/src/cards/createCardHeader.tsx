import React, { memo } from 'react';

import { ThemeVars } from '../core/theme';
import { gutter } from '../tokens/sizing';
import type { AvatarBaseProps, TextBaseProps, CardBoxProps, CardHeaderProps } from '../types';

type CreateCardHeaderParams<T> = {
  HStack: React.ComponentType<React.PropsWithChildren<CardBoxProps>>;
  VStack: React.ComponentType<React.PropsWithChildren<CardBoxProps>>;
  Avatar: React.ComponentType<React.PropsWithChildren<AvatarBaseProps>>;
  TextLabel1: React.ComponentType<React.PropsWithChildren<TextBaseProps>>;
  TextLegal: React.ComponentType<
    React.PropsWithChildren<
      { color?: ThemeVars.Color } | (T extends { color?: infer Color } ? { color?: Color } : never)
    >
  >;
};

/** @deprecated do not use creator pattern in v8 */
export function createCardHeader<T>({
  Avatar,
  HStack,
  VStack,
  TextLabel1,
  TextLegal,
}: CreateCardHeaderParams<T>) {
  const CardHeader = memo(function CardHeader({
    avatar,
    metaData,
    description,
    action,
    testID,
  }: CardHeaderProps) {
    return (
      <HStack
        alignItems="center"
        justifyContent="space-between"
        paddingTop={2}
        paddingX={gutter}
        testID={testID}
      >
        <HStack alignItems="center" flexGrow={1} gap={1}>
          {avatar ? (
            <Avatar alt={description ?? avatar} shape="circle" size="xl" src={avatar} />
          ) : null}
          <VStack>
            {description ? <TextLabel1>{description}</TextLabel1> : null}
            {metaData ? <TextLegal color="fgMuted">{metaData}</TextLegal> : null}
          </VStack>
        </HStack>
        {action}
      </HStack>
    );
  });

  CardHeader.displayName = 'CardHeader';
  return CardHeader;
}
