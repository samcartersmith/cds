/* eslint-disable global-require */
import React, { memo, StrictMode, useCallback, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import type { ColorScheme } from '@cbhq/cds-common2/core/theme';
import { useTheme } from '@cbhq/cds-mobile2/hooks/useTheme';
import { PortalProvider } from '@cbhq/cds-mobile2/overlays/PortalProvider';
import { StatusBar } from '@cbhq/cds-mobile2/system/StatusBar';
import { ThemeProvider } from '@cbhq/cds-mobile2/system/ThemeProvider';
import { defaultTheme } from '@cbhq/cds-mobile2/themes/defaultTheme';
import { Playground } from '@cbhq/ui-mobile-playground2';

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
  const theme = useTheme();
  const style = useMemo(
    () => ({ backgroundColor: theme.color.background }),
    [theme.color.background],
  );
  return <SafeAreaProvider style={style}>{children}</SafeAreaProvider>;
});

const LocalStrictMode = ({ children }: { children: React.ReactNode }) => {
  const strict = process.env.CI !== 'true';
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return strict ? <StrictMode>{children}</StrictMode> : <>{children}</>;
};

const App = memo(() => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

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
    <LocalStrictMode>
      <ThemeProvider activeColorScheme={colorScheme} theme={defaultTheme}>
        <CdsSafeAreaProvider>
          <PortalProvider>
            <StatusBar hidden={!__DEV__} />
            <NavigationContainer linking={linking} onReady={handleOnReady}>
              <Playground routes={codegenRoutes} setColorScheme={setColorScheme} />
            </NavigationContainer>
          </PortalProvider>
        </CdsSafeAreaProvider>
      </ThemeProvider>
    </LocalStrictMode>
  );
});

export default App;
