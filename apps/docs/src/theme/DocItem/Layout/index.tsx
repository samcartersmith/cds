import React, { useCallback, useMemo } from 'react';
import { DocFrontMatter } from '@docusaurus/plugin-content-docs';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useWindowSize } from '@docusaurus/theme-common';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
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
import { HStack, VStack } from '@cbhq/cds-web2/layout';
import { SegmentedTabs } from '@cbhq/cds-web2/tabs/SegmentedTabs';

type DocFrontMatterExtended = DocFrontMatter & {
  platform_switcher_options?: { web: boolean; native: boolean };
};

export default function DocItemLayout({ children }: Props): JSX.Element {
  const { frontMatter, toc, metadata } = useDoc();
  const typedFrontMatter = frontMatter as DocFrontMatterExtended;

  const windowSize = useWindowSize({ desktopBreakpoint: 1280 });
  const isDesktop = windowSize === 'desktop' || windowSize === 'ssr';
  const isMobile = windowSize === 'mobile';

  const shouldRenderToc = !frontMatter.hide_table_of_contents && toc.length > 0;
  const shouldRenderPlatformSwitcher =
    typedFrontMatter.platform_switcher_options?.native ||
    typedFrontMatter.platform_switcher_options?.web ||
    false;

  const supportsWeb = typedFrontMatter.platform_switcher_options?.web || false;
  const supportsNative = typedFrontMatter.platform_switcher_options?.native || false;

  const { platform, setPlatform } = usePlatformContext();

  const handlePlatformChange = useCallback(
    (tab: TabValue | null) => {
      setPlatform(tab?.id as 'web' | 'native');
    },
    [setPlatform],
  );

  const tabs = useMemo<TabValue[]>(
    () => [
      { id: 'web', label: 'Web', disabled: !typedFrontMatter.platform_switcher_options?.web },
      {
        id: 'native',
        label: 'Native',
        disabled: !typedFrontMatter.platform_switcher_options?.native,
      },
    ],
    [
      typedFrontMatter.platform_switcher_options?.native,
      typedFrontMatter.platform_switcher_options?.web,
    ],
  );

  const platformSwitcher = useMemo(() => {
    const activeTab =
      supportsWeb && supportsNative
        ? platform === 'web'
          ? tabs[0]
          : tabs[1]
        : supportsWeb
        ? tabs[0]
        : tabs[1];
    return <SegmentedTabs activeTab={activeTab} onChange={handlePlatformChange} tabs={tabs} />;
  }, [handlePlatformChange, platform, supportsNative, supportsWeb, tabs]);

  return (
    <HStack gap={5}>
      <VStack flexGrow={1}>
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
        <VStack gap={4}>
          {shouldRenderPlatformSwitcher && platformSwitcher}
          {shouldRenderToc && <DocItemTOCDesktop />}
        </VStack>
      )}
    </HStack>
  );
}
