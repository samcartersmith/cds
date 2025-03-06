import React from 'react';
import { DocsPreferredVersionContextProvider } from '@docusaurus/plugin-content-docs/client';
import { composeProviders } from '@docusaurus/theme-common';
import {
  AnnouncementBarProvider,
  ColorModeProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
  ScrollControllerProvider,
} from '@docusaurus/theme-common/internal';
import KBarProvider from '@site/src/components/kbar/KBarProvider';
import type { Props } from '@theme/Layout/Provider';
import { PortalProvider } from '@cbhq/cds-web2/overlays/PortalProvider';
import { globalStyles } from '@cbhq/cds-web2/styles/global';
import { MediaQueryProvider } from '@cbhq/cds-web2/system/MediaQueryProvider';
import { ThemeProvider } from '@cbhq/cds-web2/system/ThemeProvider';

import { UnifiedThemeProvider, useDocsTheme } from './UnifiedThemeContext';

const CDSContainer = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme, theme } = useDocsTheme();

  return (
    <div className={globalStyles}>
      <MediaQueryProvider>
        <ThemeProvider activeColorScheme={colorScheme} display="contents" theme={theme}>
          <PortalProvider>
            <KBarProvider>{children}</KBarProvider>
          </PortalProvider>
        </ThemeProvider>
      </MediaQueryProvider>
    </div>
  );
};

const Provider = composeProviders([
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  DocsPreferredVersionContextProvider,
  PluginHtmlClassNameProvider,
  NavbarProvider,
  UnifiedThemeProvider,
]);

export default function LayoutProvider({ children }: Props): JSX.Element {
  return (
    <Provider>
      <CDSContainer>{children}</CDSContainer>
    </Provider>
  );
}
