import React from 'react';
import type { Props } from '@theme/Navbar/MobileSidebar/Layout';
import { VStack } from '@cbhq/cds-web2/layout';

export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  secondaryMenu,
}: Props): JSX.Element {
  return (
    <VStack
      aria-label="Navigation menu"
      aria-modal="true"
      className="navbar-sidebar"
      id="mobile-sidebar"
      role="dialog"
    >
      {header}
      <VStack gap={2} paddingBottom={3} paddingTop={1}>
        {primaryMenu}
        {secondaryMenu}
      </VStack>
    </VStack>
  );
}
