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
        justifyContent="space-between"
        alignItems="center"
        spacingVertical={2}
        spacingHorizontal={3}
        testID={testID}
      >
        <HStack flexGrow={1} alignItems="center" gap={1}>
          {avatarUrl ? (
            <RemoteImage source={avatarUrl} width="32px" height="32px" shape="circle" />
          ) : null}
          {!!description && <TextLabel1 as="p">{description}</TextLabel1>}
          {!!metaData && <TextLegal as="p">{metaData}</TextLegal>}
        </HStack>
        {action}
      </HStack>
    );
  },
);
