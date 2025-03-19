import React, { memo, useCallback } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { DefaultBanner } from '@site/src/components/page/ComponentBanner/DefaultBanner';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import { IconButton } from '@cbhq/cds-web2/buttons/IconButton';
import { Divider } from '@cbhq/cds-web2/layout/Divider';
import { HStack } from '@cbhq/cds-web2/layout/HStack';
import { VStack } from '@cbhq/cds-web2/layout/VStack';
import { Tooltip } from '@cbhq/cds-web2/overlays/tooltip/Tooltip';
import { useToast } from '@cbhq/cds-web2/overlays/useToast';
import { Link } from '@cbhq/cds-web2/typography/Link';
import { Text } from '@cbhq/cds-web2/typography/Text';

import styles from './styles.module.css';

type MetadataType = {
  import: string;
  source: string;
  storybook?: string;
  figma?: string;
};

type RelatedComponent = {
  /** The URL that the related component links to */
  url: string;
  /** The display label for the related component */
  label: string;
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
   * Defaults to <DefaultBanner /> if not provided.
   */
  banner?: React.ReactNode;
  /**
   * Optional dark mode banner.
   * Can be either a React node or image URL string.
   * Will be shown instead of banner when in dark mode.
   */
  bannerDark?: React.ReactNode;
  /** Optional array of related components */
  relatedComponents?: RelatedComponent[];
};

type MetadataItemProps = {
  label: string;
  children: React.ReactNode;
};

const MetadataItem = ({ label, children }: MetadataItemProps) => (
  <HStack alignContent="center" alignItems="center" gap={2} textAlign="center" width="100%">
    <Text font="label1" width={100}>
      {label}
    </Text>
    {children}
  </HStack>
);

export const ComponentHeader = memo(
  ({
    title,
    description,
    webMetadata,
    mobileMetadata,
    banner = <DefaultBanner />,
    bannerDark,
    relatedComponents,
  }: ComponentHeaderProps) => {
    const { platform } = usePlatformContext();
    const { colorMode } = useColorMode();
    const toast = useToast();

    const activeMetadata = platform === 'web' ? webMetadata : mobileMetadata;
    const activeBanner = colorMode === 'dark' && bannerDark ? bannerDark : banner;

    const copyImport = useCallback(async () => {
      const importText = activeMetadata?.import;
      if (!importText) return;
      if (navigator?.clipboard) {
        try {
          await navigator.clipboard.writeText(importText);
          toast.show('Copied to clipboard');
        } catch (error) {
          toast.show('Failed to copy to clipboard', { variant: 'fgNegative' });
        }
      } else {
        toast.show('Clipboard not supported', { variant: 'fgNegative' });
      }
    }, [toast, activeMetadata]);

    if (!activeMetadata) return null;

    return (
      <VStack background="bgAlternate" borderRadius={600} overflow="hidden" width="100%">
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
        <VStack gap={4} padding={4} paddingTop={4}>
          <VStack gap={3}>
            <Text font="display2">{title}</Text>
            {description && <Text font="title4">{description}</Text>}
          </VStack>
          <VStack gap={1.5}>
            {activeMetadata.import && (
              <MetadataItem label="Import">
                <HStack
                  alignItems="center"
                  background="bg"
                  borderRadius={400}
                  paddingStart={2}
                  maxWidth="100%"
                  overflow="hidden"
                >
                  <Text className={styles.importText} font="label2" title={activeMetadata.import}>
                    {activeMetadata.import}
                  </Text>
                  <Tooltip content="Copy">
                    <IconButton
                      compact
                      transparent
                      name="copy"
                      flexShrink={0}
                      onClick={copyImport}
                      style={{ cursor: 'pointer' }}
                      variant="secondary"
                    />
                  </Tooltip>
                </HStack>
              </MetadataItem>
            )}
            <VStack gap={2}>
              {activeMetadata.source && (
                <MetadataItem label="Source">
                  <Text font="body">
                    <Link href={activeMetadata.source} target="_blank">
                      View source code
                    </Link>
                  </Text>
                </MetadataItem>
              )}
              {activeMetadata.storybook && (
                <MetadataItem label="Storybook">
                  <Text font="body">
                    <Link href={activeMetadata.storybook} target="_blank">
                      View Storybook
                    </Link>
                  </Text>
                </MetadataItem>
              )}
              {activeMetadata.figma && (
                <MetadataItem label="Figma">
                  <Text font="body">
                    <Link href={activeMetadata.figma} target="_blank">
                      View Figma
                    </Link>
                  </Text>
                </MetadataItem>
              )}
            </VStack>
          </VStack>
        </VStack>

        {relatedComponents && relatedComponents.length > 0 && (
          <>
            <Divider />
            <VStack gap={1} padding={4}>
              <Text font="label1">Related components</Text>
              <HStack
                gap={1}
                as="ul"
                padding={0}
                margin={0}
                flexWrap="wrap"
                style={{
                  listStyleType: 'none',
                }}
              >
                {relatedComponents.map((component, index) => (
                  <li key={component.url}>
                    <Text font="label2">
                      <Link href={component.url}>{component.label}</Link>
                      {index < relatedComponents.length - 1 && ', '}
                    </Text>
                  </li>
                ))}
              </HStack>
            </VStack>
          </>
        )}
      </VStack>
    );
  },
);
