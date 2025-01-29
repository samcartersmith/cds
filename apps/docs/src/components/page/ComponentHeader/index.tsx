import React, { memo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import { HStack } from '@cbhq/cds-web2/layout/HStack';
import { VStack } from '@cbhq/cds-web2/layout/VStack';
import { Link } from '@cbhq/cds-web2/text/Link';
import { Text } from '@cbhq/cds-web2/text/Text';

import styles from './styles.module.css';

type MetadataType = {
  import: string;
  source: string;
  storybook?: string;
  figma?: string;
};

type ComponentHeaderProps = {
  /** The title of the component */
  title: string;
  /** Optional description of the component */
  description?: string;
  /** Metadata for web platform */
  webMetadata?: MetadataType;
  /** Metadata for mobile platform */
  mobileMetadata?: MetadataType;
  /**
   * Banner to display at the top of the header.
   * Can be either a React node or image URL string.
   * Used for light mode and as fallback for dark mode if bannerDark is not provided.
   */
  banner: React.ReactNode;
  /**
   * Optional dark mode banner.
   * Can be either a React node or image URL string.
   * Will be shown instead of banner when in dark mode.
   */
  bannerDark?: React.ReactNode;
};

export const ComponentHeader = memo(
  ({
    title,
    description,
    webMetadata,
    mobileMetadata,
    banner,
    bannerDark,
  }: ComponentHeaderProps) => {
    const { platform } = usePlatformContext();
    const { colorMode } = useColorMode();
    const activeMetadata = platform === 'web' ? webMetadata : mobileMetadata;
    const activeBanner = colorMode === 'dark' && bannerDark ? bannerDark : banner;

    if (!activeMetadata) return null;
    return (
      <VStack background="backgroundAlternate" borderRadius={600} overflow="hidden">
        <VStack height={200} width="100%">
          {typeof activeBanner === 'string' ? (
            <img
              alt={`${title} banner`}
              src={activeBanner}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            activeBanner
          )}
        </VStack>
        <VStack gap={4} padding={4} paddingTop={3}>
          <VStack gap={3}>
            <Text font="display2">{title}</Text>
            {description && <Text font="title4">{description}</Text>}
          </VStack>
          <VStack gap={2}>
            {activeMetadata.import && (
              <HStack alignContent="center" alignItems="flex-start" gap={2}>
                <Text font="label1" width={100}>
                  Import
                </Text>
                <Text className={styles.importText} font="body">
                  {activeMetadata.import}
                </Text>
              </HStack>
            )}
            {activeMetadata.source && (
              <HStack alignContent="center" alignItems="center" gap={2}>
                <Text font="label1" width={100}>
                  Source
                </Text>
                <Text font="body">
                  <Link href={activeMetadata.source} target="_blank">
                    View source code
                  </Link>
                </Text>
              </HStack>
            )}
            {activeMetadata.storybook && (
              <HStack alignContent="center" alignItems="center" gap={2}>
                <Text font="label1" width={100}>
                  Storybook
                </Text>
                <Text font="body">
                  <Link href={activeMetadata.storybook} target="_blank">
                    View Storybook
                  </Link>
                </Text>
              </HStack>
            )}
            {activeMetadata.figma && (
              <HStack alignContent="center" alignItems="center" gap={2}>
                <Text font="label1" width={100}>
                  Figma
                </Text>
                <Text font="body">
                  <Link href={activeMetadata.figma} target="_blank">
                    View Figma
                  </Link>
                </Text>
              </HStack>
            )}
          </VStack>
        </VStack>
      </VStack>
    );
  },
);
