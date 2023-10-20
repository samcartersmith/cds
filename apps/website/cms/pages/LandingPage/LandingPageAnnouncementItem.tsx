import React, { memo } from 'react';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextLabel2 } from '@cbhq/cds-web/typography/TextLabel2';
import { TextTitle1 } from '@cbhq/cds-web/typography/TextTitle1';
import useGoToLinkHandler from '@cbhq/docusaurus-theme/src/theme/useGoToLinkHandler';

export type AnnouncementFields = {
  title: string;
  description: string;
  actionLabel?: string;
  actionUrl?: string;
};

export type LandingPageAnnouncementItemProps = AnnouncementFields;

const LandingPageAnnouncementItem = memo(function LandingPageAnnouncementItem({
  title,
  description,
  actionUrl,
  actionLabel,
}: LandingPageAnnouncementItemProps) {
  const handleOnPress = useGoToLinkHandler(actionUrl);
  return (
    <VStack alignItems="flex-start" gap={1}>
      <TextTitle1 as="h2">{title}</TextTitle1>
      <TextLabel2 as="p">{description}</TextLabel2>
      {actionLabel ? (
        <Button compact transparent endIcon="forwardArrow" flush="start" onPress={handleOnPress}>
          {actionLabel}
        </Button>
      ) : null}
    </VStack>
  );
});

export default LandingPageAnnouncementItem;
