import React from 'react';

import { CardHeaderBaseProps } from '@cbhq/cds-common/types/CardBaseProps';
import { HStack, HStackProps } from '../layout/HStack';
import { TextCaption } from '../typography';
import { RemoteImage } from '../media/RemoteImage';

type CardHeaderProps = HStackProps<'div'> & CardHeaderBaseProps;

export const CardHeader: React.FC<CardHeaderProps> = ({
  avatarUrl = '',
  description,
  action,
  spacing,
}) => {
  return (
    <HStack justifyContent="space-between" alignItems="center" spacing={spacing}>
      <HStack flexGrow={1} alignItems="center" gap={2}>
        <RemoteImage source={avatarUrl} width="32px" height="32px" shape="circle" />
        <TextCaption as="p">{description}</TextCaption>
      </HStack>
      {action}
    </HStack>
  );
};
