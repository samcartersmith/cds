import React, { useMemo, memo } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DevicePreferencesProvider } from '@cbhq/cds-mobile/system/DevicePreferencesProvider';
import { FeatureFlagProvider } from '@cbhq/cds-mobile/system/FeatureFlagProvider';
import { PortalProvider } from '@cbhq/cds-mobile/overlays/PortalProvider';
import { usePalette } from '@cbhq/cds-mobile/hooks/usePalette';
import { ThemeProvider } from '@cbhq/cds-mobile/system/ThemeProvider';
import { StatusBar } from '@cbhq/cds-mobile/system/StatusBar';

import {
  ExamplesSearchProvider,
  useExampleScreenOptions,
  routes,
} from '@cbhq/cds-mobile/examples/Examples';

// this code allows the use of toLocaleString() on Android
if (Platform.OS === 'android') {
  // eslint-disable-next-line global-require
  require('intl');
  // eslint-disable-next-line global-require
  require('intl/locale-data/jsonp/en-US');
}

const Stack = createStackNavigator();

const AppContent = memo(() => {
  const screenOptions = useExampleScreenOptions();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screenOptions.initialRouteName}
        screenOptions={screenOptions.screenOptions}
      >
        {useMemo(
          () =>
            routes.map((route) => (
              <Stack.Screen
                key={route.key}
                name={route.name}
                getComponent={route.getComponent}
                options={route.options}
              />
            )),
          [],
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

const CdsSafeAreaProvider: React.FC = memo(({ children }) => {
  const { background } = usePalette();
  const style = useMemo(() => ({ backgroundColor: background }), [background]);
  return <SafeAreaProvider style={style}>{children}</SafeAreaProvider>;
});

const App = memo(() => {
  return (
    <FeatureFlagProvider>
      <DevicePreferencesProvider>
        <ThemeProvider>
          <CdsSafeAreaProvider>
            <PortalProvider>
              <StatusBar />
              <ExamplesSearchProvider>
                <AppContent />
              </ExamplesSearchProvider>
            </PortalProvider>
          </CdsSafeAreaProvider>
        </ThemeProvider>
      </DevicePreferencesProvider>
    </FeatureFlagProvider>
  );
});

export default App;
