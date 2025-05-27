import React, { memo, useCallback } from 'react';
import DocusaurusLink from '@docusaurus/Link';
import { DefaultBanner } from '@site/src/components/page/ComponentBanner/DefaultBanner';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import { IconButton } from '@cbhq/cds-web/buttons/IconButton';
import { Grid } from '@cbhq/cds-web/layout';
import { Divider } from '@cbhq/cds-web/layout/Divider';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { Tooltip } from '@cbhq/cds-web/overlays/tooltip/Tooltip';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { Link } from '@cbhq/cds-web/typography/Link';
import { Text } from '@cbhq/cds-web/typography/Text';

import { useDocsTheme } from '../../../theme/Layout/Provider/UnifiedThemeContext';

import styles from './styles.module.css';

type RelatedComponent = {
  /** The URL that the related component links to */
  url: string;
  /** The display label for the related component */
  label: string;
};

type Dependency = {
  /** The name of the dependency package */
  name: string;
  /** Optional version requirement */
  version?: string;
  /** Optional URL to the package */
  url?: string;
};

type MetadataType = {
  import: string;
  source: string;
  storybook?: string;
  figma?: string;
  description?: string;
  relatedComponents?: RelatedComponent[];
  /** Dependencies required by this component */
  dependencies?: Dependency[];
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
};

type MetadataItemProps = {
  label: string;
  children: React.ReactNode;
};

const MetadataItem = ({ label, children }: MetadataItemProps) => (
  <>
    <Text font="label1">{label}</Text>
    {children}
  </>
);

export const ComponentHeader = memo(
  ({
    title,
    webMetadata,
    mobileMetadata,
    banner = <DefaultBanner />,
    bannerDark,
  }: ComponentHeaderProps) => {
    const { platform } = usePlatformContext();
    const { colorScheme } = useDocsTheme();
    const toast = useToast();

    const activeMetadata = platform === 'web' ? webMetadata : mobileMetadata;
    const activeBanner = colorScheme === 'dark' && bannerDark ? bannerDark : banner;

    const copyImport = useCallback(async () => {
      const importText = activeMetadata?.import;
      if (!importText) return;
      if (navigator?.clipboard) {
        try {
          await navigator.clipboard.writeText(importText);
          toast.show('Copied to clipboard');
        } catch (error) {
          console.error(error);
          toast.show('Failed to copy to clipboard', { variant: 'fgNegative' });
        }
      } else {
        toast.show('Clipboard not supported', { variant: 'fgNegative' });
      }
    }, [toast, activeMetadata]);

    const {
      import: importText,
      source,
      storybook,
      figma,
      description,
      relatedComponents,
      dependencies,
    } = activeMetadata || {};

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
          {activeMetadata && (
            <Grid
              alignItems="center"
              columnGap={2}
              columns={2}
              gridTemplateColumns="100px 1fr"
              rowGap={1.5}
            >
              {importText && (
                <MetadataItem label="Import">
                  <HStack
                    alignItems="center"
                    background="bg"
                    borderRadius={200}
                    overflow="hidden"
                    paddingStart={1.5}
                    paddingY={0}
                  >
                    <Text className={styles.importText} flexGrow={1} font="body" minWidth={0}>
                      {importText}
                    </Text>
                    <Tooltip content="Copy">
                      <IconButton
                        compact
                        transparent
                        accessibilityLabel="Copy import statement"
                        name="copy"
                        onClick={copyImport}
                        style={{ cursor: 'pointer' }}
                        variant="secondary"
                      />
                    </Tooltip>
                  </HStack>
                </MetadataItem>
              )}
              {source && (
                <MetadataItem label="Source">
                  <Text font="body">
                    <Link as={DocusaurusLink} target="_blank" to={source}>
                      View source code
                    </Link>
                  </Text>
                </MetadataItem>
              )}
              {storybook && (
                <MetadataItem label="Storybook">
                  <Text font="body">
                    <Link as={DocusaurusLink} target="_blank" to={storybook}>
                      View Storybook
                    </Link>
                  </Text>
                </MetadataItem>
              )}
              {figma && (
                <MetadataItem label="Figma">
                  <Text font="body">
                    <Link as={DocusaurusLink} target="_blank" to={figma}>
                      View Figma
                    </Link>
                  </Text>
                </MetadataItem>
              )}
            </Grid>
          )}
        </VStack>

        {dependencies && dependencies.length > 0 && (
          <>
            <Divider />
            <VStack gap={1} padding={4}>
              <Text font="label1">Dependencies</Text>
              <HStack
                as="ul"
                flexWrap="wrap"
                gap={1}
                margin={0}
                padding={0}
                style={{
                  listStyleType: 'none',
                }}
              >
                {dependencies.map((dependency, index) => (
                  <li key={dependency.name}>
                    <Text font="label2">
                      {dependency.url ? (
                        <Link as={DocusaurusLink} target="_blank" to={dependency.url}>
                          {dependency.name}
                        </Link>
                      ) : (
                        dependency.name
                      )}
                      {dependency.version && <span>{`@${dependency.version}`}</span>}
                      {index < dependencies.length - 1 && ', '}
                    </Text>
                  </li>
                ))}
              </HStack>
            </VStack>
          </>
        )}

        {relatedComponents && relatedComponents.length > 0 && (
          <>
            <Divider />
            <VStack gap={1} padding={4}>
              <Text font="label1">Related components</Text>
              <HStack
                as="ul"
                flexWrap="wrap"
                gap={1}
                margin={0}
                padding={0}
                style={{
                  listStyleType: 'none',
                }}
              >
                {relatedComponents.map((component, index) => (
                  <li key={component.url}>
                    <Text font="label2">
                      <Link as={DocusaurusLink} to={component.url}>
                        {component.label}
                      </Link>
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
