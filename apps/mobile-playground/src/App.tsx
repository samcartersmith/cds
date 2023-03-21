/* eslint-disable global-require */

import React, { memo, useMemo } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { routes as codegenRoutes } from '@cbhq/cds-mobile/examples/newRoutes';
import { usePalette } from '@cbhq/cds-mobile/hooks/usePalette';
import { PortalProvider } from '@cbhq/cds-mobile/overlays/PortalProvider';
import { DevicePreferencesProvider } from '@cbhq/cds-mobile/system/DevicePreferencesProvider';
import { FeatureFlagProvider } from '@cbhq/cds-mobile/system/FeatureFlagProvider';
import { StatusBar } from '@cbhq/cds-mobile/system/StatusBar';
import { ThemeProvider } from '@cbhq/cds-mobile/system/ThemeProvider';
import { Playground } from '@cbhq/ui-mobile-playground';

// this code allows the use of toLocaleString() on Android
if (Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/en-US');
}

const CdsSafeAreaProvider: React.FC<React.PropsWithChildren<unknown>> = memo(({ children }) => {
  const { background } = usePalette();
  const style = useMemo(() => ({ backgroundColor: background }), [background]);
  return <SafeAreaProvider style={style}>{children}</SafeAreaProvider>;
});

const App = memo(() => {
  return (
    <FeatureFlagProvider>
      <DevicePreferencesProvider>
        <ThemeProvider name="playground-root">
          <CdsSafeAreaProvider>
            <PortalProvider>
              <StatusBar />
              <NavigationContainer>
                <Playground routes={codegenRoutes} />
              </NavigationContainer>
            </PortalProvider>
          </CdsSafeAreaProvider>
        </ThemeProvider>
      </DevicePreferencesProvider>
    </FeatureFlagProvider>
  );
});

export default App;
