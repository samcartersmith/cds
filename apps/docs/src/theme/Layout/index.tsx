import React from 'react';
import ErrorBoundary, { FallbackParams } from '@docusaurus/ErrorBoundary';
import { PageMetadata, SkipToContentFallbackId, ThemeClassNames } from '@docusaurus/theme-common';
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal';
import { cx } from '@linaria/core';
import AnnouncementBar from '@theme/AnnouncementBar';
import ErrorPageContent from '@theme/ErrorPageContent';
import type { Props } from '@theme/Layout';
import LayoutProvider from '@theme/Layout/Provider';
import Navbar from '@theme/Navbar';
import SkipToContent from '@theme/SkipToContent';

import styles from './styles.module.css';

const fallbackFunction = (params: FallbackParams) => <ErrorPageContent {...params} />;

export default function Layout(props: Props): JSX.Element {
  const {
    children,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
  } = props;

  useKeyboardNavigation();

  return (
    <LayoutProvider>
      <PageMetadata description={description} title={title} />

      <SkipToContent />

      <AnnouncementBar />

      <Navbar />

      <div
        className={cx(ThemeClassNames.wrapper.main, styles.mainWrapper, wrapperClassName)}
        id={SkipToContentFallbackId}
      >
        <ErrorBoundary fallback={fallbackFunction}>{children}</ErrorBoundary>
      </div>
    </LayoutProvider>
  );
}
