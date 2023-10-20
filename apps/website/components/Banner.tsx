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
    <HStack background="secondary" borderRadius="rounded" gap={3} spacing={3}>
      <Icon color="foreground" name={icon} size="m" />
      <VStack gap={1}>
        <TextHeadline as="p">{title}</TextHeadline>
        <TextBody as="p" color="foregroundMuted">
          {description}
        </TextBody>
      </VStack>
    </HStack>
  );
};
