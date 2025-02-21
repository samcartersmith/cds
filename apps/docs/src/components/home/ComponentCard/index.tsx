import React from 'react';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import { HStack, VStack } from '@cbhq/cds-web2/layout';
import { Text } from '@cbhq/cds-web2/typography';

import styles from './styles.module.css';

const componentNameFontConfig = { base: 'title4', desktop: 'title2' } as const;
const componentCountFontConfig = { base: 'headline', desktop: 'title3' } as const;

export type ComponentCardProps = {
  name: string;
  count: number;
  bannerLightSrc: string;
  bannerLightOverlaySrc: string;
  bannerDarkSrc: string;
  bannerDarkOverlaySrc: string;
  to: string;
};

export const ComponentCard = ({
  name,
  count,
  bannerDarkSrc,
  bannerLightSrc,
  bannerDarkOverlaySrc,
  bannerLightOverlaySrc,
  to,
}: ComponentCardProps) => {
  const { colorMode } = useColorMode();
  const bannerSrc = colorMode === 'dark' ? bannerDarkSrc : bannerLightSrc;
  const bannerOverlaySrc = colorMode === 'dark' ? bannerDarkOverlaySrc : bannerLightOverlaySrc;
  return (
    <VStack
      alignItems="stretch"
      as={Link}
      background="bgSecondary"
      borderRadius={400}
      className={styles.cardWrapper}
      flexBasis="calc(50% - 16px)"
      overflow="hidden"
      role="button"
      textDecoration="none"
      to={to}
    >
      {/* use background image here to stack images without using absolute position */}
      <div className={styles.cardBannerArt} style={{ backgroundImage: `url(${bannerSrc})` }}>
        <img alt="" className={styles.cardBannerArtOverlay} src={bannerOverlaySrc} />
      </div>
      <HStack alignItems="start" flexGrow={0} justifyContent="space-between" padding={3}>
        <Text
          as="h3"
          className={styles.componentName}
          color="fg"
          fontFamily={componentNameFontConfig}
          fontSize={componentNameFontConfig}
          fontWeight={componentNameFontConfig}
          lineHeight={componentNameFontConfig}
        >
          {name}
        </Text>
        <Text
          background="bgAlternate"
          borderRadius={100}
          color="fgMuted"
          fontFamily={componentCountFontConfig}
          fontSize={componentCountFontConfig}
          fontWeight={componentCountFontConfig}
          lineHeight={componentCountFontConfig}
          paddingX={0.5}
          paddingY={0.25}
        >
          {count}
        </Text>
      </HStack>
    </VStack>
  );
};
