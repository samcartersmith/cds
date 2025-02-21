import React, { useCallback } from 'react';
import { useHistory } from '@docusaurus/router';
import { useColorMode } from '@docusaurus/theme-common';
import { Button } from '@cbhq/cds-web2/buttons';
import { Box, Divider, HStack, VStack } from '@cbhq/cds-web2/layout';
import { Text } from '@cbhq/cds-web2/typography';

export type QuickStartLinkProps = {
  title: string;
  description: string;
  link: { label: string; to: string } | { label: string; href: string };
  BannerComponentLight: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  BannerComponentDark: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const cardTitleFontConfig = { base: 'title4', desktop: 'title2' } as const;

export const QuickStartCampaignCard = ({
  title,
  description,
  link,
  BannerComponentLight,
  BannerComponentDark,
}: QuickStartLinkProps) => {
  const { colorMode } = useColorMode();
  const BannerComponent = colorMode === 'dark' ? BannerComponentDark : BannerComponentLight;
  const history = useHistory();
  const navigate = useCallback(() => {
    history.push('to' in link ? link.to : link.href);
  }, [history, link]);

  return (
    <VStack flexBasis="calc(50% - 16px)" gap={2}>
      <Divider />
      <HStack alignItems="flex-start" flexGrow={1} gap={2}>
        <VStack alignSelf="stretch" flexGrow={1} gap={1}>
          <VStack flexGrow={1} gap={{ base: 1, desktop: 1.5 }} paddingRight={2}>
            <Text
              as="h3"
              fontFamily={cardTitleFontConfig}
              fontSize={cardTitleFontConfig}
              fontWeight={cardTitleFontConfig}
              lineHeight={cardTitleFontConfig}
            >
              {title}
            </Text>
            <Text>{description}</Text>
          </VStack>
          <Button
            compact
            transparent
            alignSelf="start"
            aria-label={`Navigate to ${link.label}`}
            endIcon="forwardArrow"
            flush="start"
            onClick={navigate}
            variant="primary"
          >
            {link.label}
          </Button>
        </VStack>
        <Box flexShrink={0} height={{ base: 88, desktop: 156 }} width={{ base: 88, desktop: 156 }}>
          <BannerComponent height="100%" width="100%" />
        </Box>
      </HStack>
    </VStack>
  );
};
