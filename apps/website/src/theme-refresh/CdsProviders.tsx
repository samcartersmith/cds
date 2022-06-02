import { memo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider, ThemeProvider } from '@cbhq/cds-web/system';
import { RootScaleProvider } from '@cbhq/cds-web/system/RootScaleProvider';

const CdsProviders: React.FC = memo(({ children }) => {
  const { colorMode } = useColorMode();
  return (
    <FeatureFlagProvider frontier flexGap>
      <RootScaleProvider>
        <ThemeProvider display="contents" spectrum={colorMode}>
          <PortalProvider>{children}</PortalProvider>
        </ThemeProvider>
      </RootScaleProvider>
    </FeatureFlagProvider>
  );
});

CdsProviders.displayName = 'CdsProviders';

export default CdsProviders;
