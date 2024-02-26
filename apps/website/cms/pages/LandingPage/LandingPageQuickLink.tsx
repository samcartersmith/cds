import React, { memo } from 'react';
import { SpacingScale } from '@cbhq/cds-common';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { BoxProps } from '@cbhq/cds-web/layout';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { OnPress, Pressable } from '@cbhq/cds-web/system/Pressable';
import { TextCaption } from '@cbhq/cds-web/typography/TextCaption';
import { TextTitle2 } from '@cbhq/cds-web/typography/TextTitle2';
import useGoToLinkHandler from '@cbhq/docusaurus-theme/src/theme/useGoToLinkHandler';

export type LandingPageQuickLinkProps = {
  href?: string;
  onPress?: OnPress;
  caption?: string;
  title: string;
  gap?: SpacingScale;
} & BoxProps;

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
      noScaleOnPress
      background="background"
      onPress={onPress ?? handleOnPress}
      width="50%"
    >
      <VStack
        flexGrow={flexGrow}
        gap={gap}
        spacingHorizontal={spacingHorizontal}
        spacingVertical={spacingVertical}
        {...props}
      >
        <TextCaption as="p">{caption}</TextCaption>
        <TextTitle2 as="p"> {title}</TextTitle2>
      </VStack>
    </Pressable>
  );
});

export default LandingPageQuickLink;
