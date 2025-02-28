import React from 'react';
import { DocsPreferredVersionContextProvider } from '@docusaurus/plugin-content-docs/client';
import { composeProviders, useColorMode } from '@docusaurus/theme-common';
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
import { defaultTheme } from '@cbhq/cds-web2/themes/defaultTheme';

const docsTheme = {
  ...defaultTheme,
  light: {
    ...defaultTheme.light,
    bg: `rgb(${defaultTheme.lightSpectrum.gray0})`,
    bgSecondary: `rgb(${defaultTheme.lightSpectrum.gray10})`,
    bgAlternate: `rgb(${defaultTheme.lightSpectrum.gray5})`,
    bgTertiary: `rgb(${defaultTheme.lightSpectrum.gray15})`,
    bgCode: `rgb(${defaultTheme.lightSpectrum.blue0})`,
  },
  dark: {
    ...defaultTheme.dark,
    bg: `rgb(${defaultTheme.darkSpectrum.gray10})`, // instead of gray0
    bgSecondary: `rgb(${defaultTheme.darkSpectrum.gray20})`, // instead of gray10
    bgAlternate: `rgb(${defaultTheme.darkSpectrum.gray5})`, // instead of gray5
    bgTertiary: `rgb(${defaultTheme.darkSpectrum.gray5})`,
    bgCode: `rgb(${defaultTheme.darkSpectrum.blue0})`,
  },
};

const CDSContainer = ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useColorMode();

  const isDarkMode = colorMode === 'dark';
  return (
    <div className={globalStyles}>
      <MediaQueryProvider>
        <ThemeProvider
          activeColorScheme={isDarkMode ? 'dark' : 'light'}
          display="contents"
          theme={docsTheme}
        >
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
]);

export default function LayoutProvider({ children }: Props): JSX.Element {
  return (
    <Provider>
      <CDSContainer>{children}</CDSContainer>
    </Provider>
  );
}
