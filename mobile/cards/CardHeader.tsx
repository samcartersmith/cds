import React from 'react';

import { CardHeaderBaseProps } from '@cbhq/cds-common/types/CardBaseProps';
import { HStack, HStackProps } from '../layout/HStack';
import { TextLabel1 } from '../typography';
import { RemoteImage } from '../media/RemoteImage';

type CardHeaderProps = HStackProps & CardHeaderBaseProps;

export const CardHeader: React.FC<CardHeaderProps> = ({
  avatarUrl,
  description,
  action,
  spacing,
}) => {
  return (
    <HStack justifyContent="space-between" alignItems="center" spacing={spacing}>
      <HStack flexGrow={1} alignItems="center" gap={1}>
        {avatarUrl ? (
          <RemoteImage source={{ uri: avatarUrl }} width={32} height={32} resizeMode="center" />
        ) : null}
        <TextLabel1>{description}</TextLabel1>
      </HStack>
      {action}
    </HStack>
  );
};
