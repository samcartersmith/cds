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
            <RemoteImage height="32px" shape="circle" source={avatarUrl} width="32px" />
          ) : null}
          {!!description && <TextLabel1 as="p">{description}</TextLabel1>}
          {!!metaData && <TextLegal as="p">{metaData}</TextLegal>}
        </HStack>
        {action}
      </HStack>
    );
  },
);
