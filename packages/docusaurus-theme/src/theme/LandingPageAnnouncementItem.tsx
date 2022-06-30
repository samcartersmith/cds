import React, { memo } from 'react';
import type { LandingPageAnnouncementItemProps } from '@theme/LandingPageAnnouncementItem';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextLabel2 } from '@cbhq/cds-web/typography/TextLabel2';
import { TextTitle1 } from '@cbhq/cds-web/typography/TextTitle1';

import useGoToLinkHandler from './useGoToLinkHandler';

const LandingPageAnnouncementItem = memo(function LandingPageAnnouncementItem({
  title,
  description,
  actionUrl,
  actionLabel,
}: LandingPageAnnouncementItemProps) {
  const handleOnPress = useGoToLinkHandler(actionUrl);
  return (
    <VStack gap={1} alignItems="flex-start">
      <TextTitle1 as="h2">{title}</TextTitle1>
      <TextLabel2 as="p">{description}</TextLabel2>
      {actionLabel ? (
        <Button compact transparent flush="start" endIcon="forwardArrow" onPress={handleOnPress}>
          {actionLabel}
        </Button>
      ) : null}
    </VStack>
  );
});

export default LandingPageAnnouncementItem;
