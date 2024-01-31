/* eslint-disable global-require */

import React, { memo, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import { usePalette } from '@cbhq/cds-mobile/hooks/usePalette';
import { PortalProvider } from '@cbhq/cds-mobile/overlays/PortalProvider';
import { DevicePreferencesProvider } from '@cbhq/cds-mobile/system/DevicePreferencesProvider';
import { FeatureFlagProvider } from '@cbhq/cds-mobile/system/FeatureFlagProvider';
import { StatusBar } from '@cbhq/cds-mobile/system/StatusBar';
import { ThemeProvider } from '@cbhq/cds-mobile/system/ThemeProvider';
import { Playground } from '@cbhq/ui-mobile-playground';

import { useFonts } from './hooks/useFonts';
import { routes as codegenRoutes } from './routes';

const linking = {
  prefixes: [Linking.createURL('/')],
};

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
  const [fontsLoaded] = useFonts();

  const handleOnReady = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <FeatureFlagProvider frontier>
      <DevicePreferencesProvider>
        <ThemeProvider name="playground-root">
          <CdsSafeAreaProvider>
            <PortalProvider>
              <StatusBar />
              <NavigationContainer linking={linking} onReady={handleOnReady}>
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
