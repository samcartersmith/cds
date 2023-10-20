import React, { memo } from 'react';
import { CardHeaderBaseProps } from '@cbhq/cds-common/types/CardBaseProps';

import { HStack } from '../layout/HStack';
import { RemoteImage } from '../media/RemoteImage';
import { TextLabel1, TextLegal } from '../typography';

type CardHeaderProps = CardHeaderBaseProps;

export const CardHeader = memo(
  ({ avatarUrl, metaData, description, action, testID }: CardHeaderProps) => {
    return (
      <HStack
        alignItems="center"
        justifyContent="space-between"
        spacingHorizontal={3}
        spacingVertical={2}
        testID={testID}
      >
        <HStack alignItems="center" flexGrow={1} gap={1}>
          {avatarUrl ? (
            <RemoteImage height={32} resizeMode="center" source={{ uri: avatarUrl }} width={32} />
          ) : null}
          {!!description && <TextLabel1>{description}</TextLabel1>}
          {!!metaData && <TextLegal>{metaData}</TextLegal>}
        </HStack>
        {action}
      </HStack>
    );
  },
);
