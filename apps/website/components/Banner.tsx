import React from 'react';
import { IconName } from '@cbhq/cds-common';
import { Icon } from '@cbhq/cds-web/icons';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { TextBody, TextHeadline } from '@cbhq/cds-web/typography';

type BannerProps = {
  icon: IconName;
  title: string;
  description: string;
};

export const Banner = ({ icon, title, description }: BannerProps) => {
  return (
    <HStack background="secondary" spacing={3} gap={3} borderRadius="standard">
      <Icon name={icon} color="foreground" size="m" />
      <VStack gap={1}>
        <TextHeadline as="p">{title}</TextHeadline>
        <TextBody as="p" color="foregroundMuted">
          {description}
        </TextBody>
      </VStack>
    </HStack>
  );
};
