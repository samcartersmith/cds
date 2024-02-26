import React, { Fragment, memo, ReactNode, useEffect, useState } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import DocgenProjectProvider from '@theme/DocgenProjectProvider';
import KBarProvider from '@theme/KBarProvider';
import useDocgenPluginData from '@theme/useDocgenPluginData';
import OriginalLayoutProviders from '@theme-init/LayoutProviders';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider, ThemeProvider } from '@cbhq/cds-web/system';
import { RootScaleProvider } from '@cbhq/cds-web/system/RootScaleProvider';

type ProviderProps = {
  children?: ReactNode;
};

// Guarantee that we are synced with light/dark mode changes were are triggerd on data-theme attribute of page
function useIsDarkMode() {
  const isBrowser = useIsBrowser();
  const [isDarkTheme, setIsDarkTheme] = useState(() =>
    isBrowser ? document.documentElement.getAttribute('data-theme') === 'dark' : false,
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkTheme(document.documentElement.getAttribute('data-theme') === 'dark');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return isDarkTheme;
}

const CdsProviders = memo(function CdsProviders({ children }: ProviderProps) {
  const { enabled } = useDocgenPluginData();
  const isDarkMode = useIsDarkMode();
  const DocgenProvider = enabled ? DocgenProjectProvider : Fragment;
  return (
    <FeatureFlagProvider flexGap>
      <RootScaleProvider>
        <ThemeProvider display="contents" spectrum={isDarkMode ? 'dark' : 'light'}>
          <PortalProvider>
            <DocgenProvider>
              <KBarProvider>{children}</KBarProvider>
            </DocgenProvider>
          </PortalProvider>
        </ThemeProvider>
      </RootScaleProvider>
    </FeatureFlagProvider>
  );
});

const LayoutProviders = memo(function LayoutProviders({ children }: ProviderProps) {
  return (
    <OriginalLayoutProviders>
      <CdsProviders>{children}</CdsProviders>
    </OriginalLayoutProviders>
  );
});

export default LayoutProviders;
