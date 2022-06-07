import React, { Fragment, memo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import DocgenProjectProvider from '@theme/DocgenProjectProvider';
import KBarProvider from '@theme/KBarProvider';
import useDocgenPluginData from '@theme/useDocgenPluginData';
import OriginalLayoutProviders from '@theme-init/LayoutProviders';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider, ThemeProvider } from '@cbhq/cds-web/system';
import { RootScaleProvider } from '@cbhq/cds-web/system/RootScaleProvider';

const CdsProviders = memo(function CdsProviders({ children }) {
  const { enabled } = useDocgenPluginData();
  const { colorMode } = useColorMode();
  const DocgenProvider = enabled ? DocgenProjectProvider : Fragment;
  return (
    <FeatureFlagProvider frontier flexGap>
      <RootScaleProvider>
        <ThemeProvider display="contents" spectrum={colorMode}>
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

const LayoutProviders = memo(function LayoutProviders({ children }) {
  return (
    <OriginalLayoutProviders>
      <CdsProviders>{children}</CdsProviders>
    </OriginalLayoutProviders>
  );
});

export default LayoutProviders;
