import React, { useCallback, useMemo } from 'react';
import { DocFrontMatter } from '@docusaurus/plugin-content-docs';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useWindowSize } from '@docusaurus/theme-common';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import { usePropsTOC } from '@site/src/utils/toc/PropsTOCManager';
import { useTOC } from '@site/src/utils/toc/TOCManager';
import ContentVisibility from '@theme/ContentVisibility';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import DocItemContent from '@theme/DocItem/Content';
import DocItemFooter from '@theme/DocItem/Footer';
import type { Props } from '@theme/DocItem/Layout';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocVersionBanner from '@theme/DocVersionBanner';
import Footer from '@theme/Footer';
import { TabValue } from '@cbhq/cds-common2/tabs/useTabs';
import { VStack } from '@cbhq/cds-web2/layout';
import { SegmentedTabs } from '@cbhq/cds-web2/tabs/SegmentedTabs';
import { Text } from '@cbhq/cds-web2/typography/Text';

type DocFrontMatterExtended = DocFrontMatter & {
  platform_switcher_options?: { web: boolean; mobile: boolean };
};

export default function DocItemLayout({ children }: Props): JSX.Element {
  const { frontMatter, toc, metadata } = useDoc();
  const { items: propsTocItems = [] } = usePropsTOC();
  const { items: tocItems = [] } = useTOC();
  const updatedTocItems = useMemo(
    () => [...toc, ...tocItems, ...propsTocItems],
    [toc, tocItems, propsTocItems],
  );
  const typedFrontMatter = frontMatter as DocFrontMatterExtended;

  const windowSize = useWindowSize({ desktopBreakpoint: 1280 });
  const isDesktop = windowSize === 'desktop' || windowSize === 'ssr';
  const isMobile = windowSize === 'mobile';

  const shouldRenderToc = !frontMatter.hide_table_of_contents && updatedTocItems.length > 0;
  const shouldRenderPlatformSwitcher =
    typedFrontMatter.platform_switcher_options?.mobile ||
    typedFrontMatter.platform_switcher_options?.web ||
    false;

  const contentMaxWidth = useMemo(
    () => ({
      desktop:
        (shouldRenderPlatformSwitcher || shouldRenderToc) && isDesktop
          ? `calc(100% - var(--table-of-content-width) - 2.5rem)`
          : '100%',
      base: '100%',
    }),
    [isDesktop, shouldRenderPlatformSwitcher, shouldRenderToc],
  );

  const supportsWeb = typedFrontMatter.platform_switcher_options?.web || false;
  const supportsMobile = typedFrontMatter.platform_switcher_options?.mobile || false;

  const { platform, setPlatform } = usePlatformContext();

  const handlePlatformChange = useCallback(
    (tab: TabValue | null) => {
      setPlatform(tab?.id as 'web' | 'mobile');
    },
    [setPlatform],
  );

  const tabs = useMemo<TabValue[]>(
    () => [
      { id: 'web', label: 'Web', disabled: !typedFrontMatter.platform_switcher_options?.web },
      {
        id: 'mobile',
        label: 'Mobile',
        disabled: !typedFrontMatter.platform_switcher_options?.mobile,
      },
    ],
    [
      typedFrontMatter.platform_switcher_options?.mobile,
      typedFrontMatter.platform_switcher_options?.web,
    ],
  );

  const platformSwitcher = useMemo(() => {
    const activeTab =
      supportsWeb && supportsMobile
        ? platform === 'web'
          ? tabs[0]
          : tabs[1]
        : supportsWeb
        ? tabs[0]
        : tabs[1];
    return <SegmentedTabs activeTab={activeTab} onChange={handlePlatformChange} tabs={tabs} />;
  }, [handlePlatformChange, platform, supportsMobile, supportsWeb, tabs]);

  return (
    <>
      <VStack maxWidth={contentMaxWidth}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <VStack>
          <VStack gap={10}>
            <VStack as="article" gap={3}>
              <DocBreadcrumbs />
              <DocVersionBadge />
              {isMobile && shouldRenderPlatformSwitcher && platformSwitcher}
              <DocItemContent>{children}</DocItemContent>
              <DocItemFooter />
            </VStack>
            <Footer />
          </VStack>
          <DocItemPaginator />
        </VStack>
      </VStack>
      {isDesktop && (shouldRenderPlatformSwitcher || shouldRenderToc) && (
        <VStack
          flexBasis="var(--table-of-content-width)"
          flexGrow={0}
          flexShrink={0}
          gap={4}
          maxHeight="calc(100vh - var(--ifm-navbar-height) - 3rem)"
          position="sticky"
          top="calc(var(--ifm-navbar-height) + 1.5rem)"
        >
          {shouldRenderPlatformSwitcher && platformSwitcher}
          <VStack gap={2} overflow="auto">
            {shouldRenderToc && (
              <Text font="headline" paddingX={0.5}>
                On This Page
              </Text>
            )}
            {shouldRenderToc && <DocItemTOCDesktop />}
          </VStack>
        </VStack>
      )}
    </>
  );
}
