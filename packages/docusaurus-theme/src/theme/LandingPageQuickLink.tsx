import React, { memo } from 'react';
import type { LandingPageQuickLinkProps } from '@theme/LandingPageQuickLink';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { Pressable } from '@cbhq/cds-web/system/Pressable';
import { TextCaption } from '@cbhq/cds-web/typography/TextCaption';
import { TextTitle2 } from '@cbhq/cds-web/typography/TextTitle2';

import useGoToLinkHandler from './useGoToLinkHandler';

const LandingPageQuickLink = memo(function LandingPageQuickLink({
  caption,
  title,
  href,
  gap = 2,
  spacingHorizontal = gutter,
  spacingVertical = 4,
  flexGrow = 1,
  onPress,
  ...props
}: LandingPageQuickLinkProps) {
  const handleOnPress = useGoToLinkHandler(href);
  return (
    <Pressable
      width="50%"
      backgroundColor="background"
      onPress={onPress ?? handleOnPress}
      noScaleOnPress
    >
      <VStack
        gap={gap}
        spacingHorizontal={spacingHorizontal}
        spacingVertical={spacingVertical}
        flexGrow={flexGrow}
        {...props}
      >
        <TextCaption as="p">{caption}</TextCaption>
        <TextTitle2 as="p"> {title}</TextTitle2>
      </VStack>
    </Pressable>
  );
});

export default LandingPageQuickLink;
