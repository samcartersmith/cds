import '@cbhq/cds-fonts/fonts.css';
import '@cbhq/cds-icons/fonts/web/icon-font.css';

import React, { useCallback } from 'react';
import ErrorBoundary, { FallbackParams } from '@docusaurus/ErrorBoundary';
import { PageMetadata, SkipToContentFallbackId, ThemeClassNames } from '@docusaurus/theme-common';
import { useColorMode } from '@docusaurus/theme-common';
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal';
import { cx } from '@linaria/core';
import AnnouncementBar from '@theme/AnnouncementBar';
import ErrorPageContent from '@theme/ErrorPageContent';
import type { Props } from '@theme/Layout';
import LayoutProvider from '@theme/Layout/Provider';
import Navbar from '@theme/Navbar';
import SkipToContent from '@theme/SkipToContent';
import { PortalProvider } from '@cbhq/cds-web2/overlays/PortalProvider';
import { globalStyles } from '@cbhq/cds-web2/styles/global';
import { MediaQueryProvider } from '@cbhq/cds-web2/system/MediaQueryProvider';
import { ThemeProvider } from '@cbhq/cds-web2/system/ThemeProvider';
import { defaultTheme } from '@cbhq/cds-web2/themes/defaultTheme';

import styles from './styles.module.css';

const CDSContainer = ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useColorMode();

  const isDarkMode = colorMode === 'dark';
  return (
    <div className={globalStyles}>
      <MediaQueryProvider>
        <ThemeProvider
          activeColorScheme={isDarkMode ? 'dark' : 'light'}
          display="contents"
          theme={defaultTheme}
        >
          <PortalProvider>{children}</PortalProvider>
        </ThemeProvider>
      </MediaQueryProvider>
    </div>
  );
};

export default function Layout(props: Props): JSX.Element {
  const {
    children,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
  } = props;

  useKeyboardNavigation();

  const fallback = useCallback((params: FallbackParams) => <ErrorPageContent {...params} />, []);

  return (
    <LayoutProvider>
      <CDSContainer>
        <PageMetadata description={description} title={title} />

        <SkipToContent />

        <AnnouncementBar />

        <Navbar />

        <div
          className={cx(ThemeClassNames.wrapper.main, styles.mainWrapper, wrapperClassName)}
          id={SkipToContentFallbackId}
        >
          <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>
        </div>
      </CDSContainer>
    </LayoutProvider>
  );
}
