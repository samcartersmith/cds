/* eslint-disable no-restricted-globals */
import { memo, useEffect, useState } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider, ThemeProvider } from '@cbhq/cds-web/system';
import { RootScaleProvider } from '@cbhq/cds-web/system/RootScaleProvider';

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

const CdsProviders: React.FC = memo(({ children }) => {
  const isDarkMode = useIsDarkMode();
  return (
    <FeatureFlagProvider frontier flexGap>
      <RootScaleProvider>
        <ThemeProvider display="contents" spectrum={isDarkMode ? 'dark' : 'light'}>
          <PortalProvider>{children}</PortalProvider>
        </ThemeProvider>
      </RootScaleProvider>
    </FeatureFlagProvider>
  );
});

CdsProviders.displayName = 'CdsProviders';

export default CdsProviders;
