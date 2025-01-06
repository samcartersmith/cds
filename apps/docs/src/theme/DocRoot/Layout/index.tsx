import React, { useState } from 'react';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import type { Props } from '@theme/DocRoot/Layout';

import styles from './styles.module.css';
import Footer from '@theme/Footer';

export default function DocRootLayout({ children }: Props): JSX.Element {
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  return (
    <div className={styles.docsWrapper}>
      <BackToTopButton />
      <div className={styles.docRoot}>
        {sidebar && (
          <DocRootLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}
        <div className={styles.docMainAndFooterWrapper}>
          <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
            {children}
          </DocRootLayoutMain>
          {/* Renders footer here to have it in the same column as the main content */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
