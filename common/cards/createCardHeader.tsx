import React, { memo } from 'react';

import { gutter } from '../tokens/sizing';
import type {
  FlexStyles,
  SharedProps,
  AvatarBaseProps,
  SpacingProps,
  StackBaseProps,
  TextBaseProps,
  PaletteForeground,
} from '../types';

export type CardHeaderProps = {
  /** Image url for Avatar */
  avatarUrl?: string;
  /** Meta Data Text to be displayed in TextLegal */
  metaData?: string;
  /** Text to be displayed in TextCaption */
  description?: string;
  /** IconButton ReactNode */
  action?: React.ReactNode;
} & SharedProps;

type CreateCardHeaderParams<T> = {
  HStack: React.ComponentType<SpacingProps & FlexStyles & StackBaseProps & SharedProps>;
  VStack: React.ComponentType<SpacingProps & FlexStyles & StackBaseProps & SharedProps>;
  Avatar: React.ComponentType<AvatarBaseProps>;
  TextLabel1: React.ComponentType<TextBaseProps>;
  TextLegal: React.ComponentType<
    { color?: PaletteForeground } | (T extends { color?: infer Color } ? { color?: Color } : never)
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
    avatarUrl,
    metaData,
    description,
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
          {avatarUrl ? (
            <Avatar alt={description ?? avatarUrl} src={avatarUrl} size="xl" shape="circle" />
          ) : null}
          <VStack>
            {!!description && <TextLabel1>{description}</TextLabel1>}
            {!!metaData && <TextLegal color="foregroundMuted">{metaData}</TextLegal>}
          </VStack>
        </HStack>
        {action}
      </HStack>
    );
  });

  CardHeader.displayName = 'CardHeader';
  return CardHeader;
}
