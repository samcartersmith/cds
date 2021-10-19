import React from 'react';

import { CardHeaderBaseProps } from '@cbhq/cds-common/types/CardBaseProps';
import { HStack, HStackProps } from '../layout/HStack';
import { TextLabel1, TextLegal } from '../typography';
import { RemoteImage } from '../media/RemoteImage';

type CardHeaderProps = HStackProps<'div'> & CardHeaderBaseProps;

export const CardHeader: React.FC<CardHeaderProps> = ({
  avatarUrl,
  metaData,
  description,
  action,
}) => {
  return (
    <HStack justifyContent="space-between" alignItems="center" spacing={2}>
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
};
