import React, { memo } from 'react';
import type { AnnouncementFields } from '@theme/LandingPageAnnouncementItem';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextLabel2 } from '@cbhq/cds-web/typography/TextLabel2';
import { TextTitle1 } from '@cbhq/cds-web/typography/TextTitle1';

import useGoToLinkHandler from './useGoToLinkHandler';

const LandingPageAnnouncementItem = memo(function LandingPageAnnouncementItem({
  title,
  description,
  href,
  actionLabel,
}: AnnouncementFields) {
  const handleOnPress = useGoToLinkHandler(href);
  return (
    <VStack gap={1} alignItems="flex-start" spacingVertical={6} spacingHorizontal={gutter}>
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
