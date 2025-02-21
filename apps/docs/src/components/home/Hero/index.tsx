import React, { useCallback } from 'react';
import { useHistory } from '@docusaurus/router';
import { useColorMode } from '@docusaurus/theme-common';
import BannerArt from '@site/static/img/heroBanners/banner_art.svg';
import BannerArtDark from '@site/static/img/heroBanners/banner_art_dark.svg';
import { Button } from '@cbhq/cds-web2/buttons';
import { Box, VStack } from '@cbhq/cds-web2/layout';
import { Text } from '@cbhq/cds-web2/typography';

import styles from './styles.module.css';

const bannerTitleFontConfig = { base: 'title2', desktop: 'display2' } as const;

export const Hero = () => {
  const { colorMode } = useColorMode();
  const BannerArtComponent = colorMode === 'dark' ? BannerArtDark : BannerArt;
  const history = useHistory();
  const navigateToGettingStarted = useCallback(() => {
    history.push('/getting-started/introduction');
  }, [history]);

  return (
    <Box
      as="header"
      background="bgAlternate"
      borderRadius={600}
      className={styles.heroContainer}
      flexDirection={{ base: 'row', phone: 'column' }}
      gap={{ phone: 0, base: 2 }}
      height={{ phone: 'auto', tablet: 338, desktop: 451 }}
      overflow="hidden"
    >
      <VStack
        alignItems="flex-start"
        gap={{ phone: 2, base: 4 }}
        justifyContent="space-between"
        padding={4}
      >
        <VStack gap={{ phone: 2, base: 3 }}>
          <Text
            as="h1"
            className={styles.heroTitle}
            fontFamily={bannerTitleFontConfig}
            fontSize={bannerTitleFontConfig}
            fontWeight={bannerTitleFontConfig}
            lineHeight={bannerTitleFontConfig}
            style={{ marginBottom: 0 }}
          >
            Coinbase Design System
          </Text>
          <Text className={styles.heroDescription} color="fgMuted" numberOfLines={4}>
            A global crypto design system backed by open-source code. Design and build for a
            decentralized future.
          </Text>
        </VStack>
        <Button
          compact
          aria-label="Get started with our documentation"
          endIcon="forwardArrow"
          onClick={navigateToGettingStarted}
        >
          Get started
        </Button>
      </VStack>
      <Box alignItems="stretch" flexShrink={0}>
        <BannerArtComponent height="100%" width="100%" />
      </Box>
    </Box>
  );
};
