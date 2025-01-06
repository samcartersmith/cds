import React, { memo } from 'react';
import { CardHeaderProps as CardHeaderBaseProps } from '@cbhq/cds-common2/types';

import { HStack } from '../layout/HStack';
import { RemoteImage } from '../media/RemoteImage';
import { TextLabel1, TextLegal } from '../typography';

export type CardHeaderProps = CardHeaderBaseProps;

export const CardHeader = memo(
  ({ avatar, metaData, description, action, testID }: CardHeaderProps) => {
    return (
      <HStack
        alignItems="center"
        justifyContent="space-between"
        paddingX={3}
        paddingY={2}
        testID={testID}
      >
        <HStack alignItems="center" flexGrow={1} gap={1}>
          {avatar ? (
            <RemoteImage height={32} resizeMode="center" source={{ uri: avatar }} width={32} />
          ) : null}
          {!!description && <TextLabel1>{description}</TextLabel1>}
          {!!metaData && <TextLegal>{metaData}</TextLegal>}
        </HStack>
        {action}
      </HStack>
    );
  },
);
