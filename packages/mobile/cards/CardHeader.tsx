import React, { memo } from 'react';
import { CardHeaderBaseProps } from '@cbhq/cds-common/types/CardBaseProps';

import { HStack } from '../layout/HStack';
import { RemoteImage } from '../media/RemoteImage';
import { TextLabel1, TextLegal } from '../typography';

type CardHeaderProps = CardHeaderBaseProps;

export const CardHeader: React.FC<CardHeaderProps> = memo(
  ({ avatarUrl, metaData, description, action, testID }) => {
    return (
      <HStack
        justifyContent="space-between"
        alignItems="center"
        spacingVertical={2}
        spacingHorizontal={3}
        testID={testID}
      >
        <HStack flexGrow={1} alignItems="center" gap={1}>
          {avatarUrl ? (
            <RemoteImage source={{ uri: avatarUrl }} width={32} height={32} resizeMode="center" />
          ) : null}
          {!!description && <TextLabel1>{description}</TextLabel1>}
          {!!metaData && <TextLegal>{metaData}</TextLegal>}
        </HStack>
        {action}
      </HStack>
    );
  },
);
